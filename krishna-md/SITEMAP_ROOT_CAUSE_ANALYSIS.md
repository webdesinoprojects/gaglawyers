# ROOT CAUSE ANALYSIS: Sitemap.xml "MONGO_URI is not set" Error on VPS

## Executive Summary
The sitemap generation fails on VPS with `MONGO_URI environment variable is not set` **ONLY when triggered by background regeneration (`sitemapRegen.js`)**, not when accessed via HTTP route. The runtime routes work fine because the main server process has already loaded `.env`.

---

## 1. EXACT ROOT CAUSE IDENTIFIED

### Problem Location: `backend/utils/sitemapRegen.js` + `backend/scripts/generateSitemap.js`

```javascript
// sitemapRegen.js line 21-28: Spawns child process
const child = spawn(process.execPath, [scriptPath], {
  stdio: 'ignore',
  detached: true,
  env: process.env,  // ⚠️ Passes parent's environment
});
```

```javascript
// generateSitemap.js line 2: NO explicit path for dotenv!
require('dotenv').config();  // ⚠️ CRITICAL FLAW
```

### Why It Fails on VPS:

1. **generateSitemap.js is spawned as a SEPARATE Node process** (child_process.spawn)
2. The child process has a **different working directory** than expected
3. `require('dotenv').config()` with NO explicit path looks for `.env` in `process.cwd()`
4. VPS working directory ≠ `/backend` directory
5. `.env` is NOT found in the child process
6. `process.env.MONGO_URI` is undefined in the child process
7. `connectDB()` throws error on line 66 of `backend/config/db.js`

### Why It Works on Localhost:
- Likely run from the `/backend` directory
- `process.cwd()` == `/backend`
- `dotenv.config()` finds `.env`
- Works by accident, not by design

---

## 2. HTTP ROUTE GENERATION (works fine)

When accessing `GET /sitemap.xml`:
- Hits `sitemapController.js` → `generateSitemap()`
- Calls `await connectDB()` on line 146
- Server.js already loaded `.env` at startup (line 2)
- `process.env.MONGO_URI` is available
- **No spawning of child process**
- ✅ Works as expected

---

## 3. BACKGROUND REGENERATION (fails on VPS)

When content changes and `scheduleSitemapRegeneration()` is called:
- Calls `runGenerator()` in `sitemapRegen.js`
- Spawns new child process: `spawn(process.execPath, [scriptPath])`
- Child process has NO `.env` loaded
- Child process `require('dotenv').config()` can't find `.env` (wrong cwd)
- Tries to connect to MongoDB with undefined `MONGO_URI`
- ❌ Fails with "MONGO_URI environment variable is not set"

---

## 4. VERIFICATION: Is connectDB() being called twice?

**In sitemapController.js (runtime routes):**
```javascript
const generateSitemap = async (req, res) => {
  try {
    await connectDB();  // Line 146 - NECESSARY for safety
    // ... MongoDB queries follow
  }
}
```

**Analysis:**
- Yes, `connectDB()` is called again
- **But this is CORRECT and SAFE** because:
  - It checks if already connected first (db.js line 42-48)
  - Returns immediately if `isConnected === true`
  - No actual reconnection happens
  - This is a **safety pattern, not a bug**

---

## 5. CHILD PROCESS ANALYSIS

### What happens when `spawn()` is called:

```javascript
const child = spawn(process.execPath, [scriptPath], {
  stdio: 'ignore',           // ❌ Hides stdout/stderr - can't debug!
  detached: true,            // Child runs independent of parent
  env: process.env,          // Passes parent process.env
});
```

**Critical Issue: Missing `cwd` option**
```javascript
// Current code - WRONG
const child = spawn(process.execPath, [scriptPath], {
  env: process.env,
});
// Child's process.cwd() = whereever parent was spawned from
// Likely: /app or /root or VPS deploy directory
// NOT: /app/backend where .env is located
```

### Environment Variable Inheritance Problem:

Even though `env: process.env` is passed:
- Parent process.env has MONGO_URI (loaded from .env)
- **BUT** child process dotenv.config() runs BEFORE this env is used
- Child tries to find .env file first (fails)
- Then tries to use parent's inherited env (but dotenv hasn't merged it yet)

---

## 6. WHY BACKGROUND REGENERATION SPECIFIC?

| Execution Path | .env Loading | Status |
|---|---|---|
| HTTP Route (`GET /sitemap.xml`) | server.js loads .env at line 2 | ✅ Works |
| Child Process (spawn) | generateSitemap.js loads .env (fails to find file) | ❌ Fails |

The HTTP routes work because they reuse the main server process where `.env` was already loaded.

---

## 7. DEBUG EVIDENCE NEEDED

To confirm on VPS, run in `generateSitemap.js`:

```javascript
console.log("=== CHILD PROCESS DEBUG ===");
console.log("process.cwd():", process.cwd());
console.log("__dirname:", __dirname);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("PATH to .env:", require('path').resolve('.env'));
console.log(".env exists:", require('fs').existsSync(require('path').resolve('.env')));
```

Expected output on VPS:
```
process.cwd(): /app          ← ❌ NOT /app/backend
__dirname: /app/backend/scripts
MONGO_URI exists: false      ← ❌ Not loaded
.env exists: false           ← ❌ Not found in wrong directory
```

---

## 8. ARCHITECTURE ASSESSMENT

### Is sitemap generation overcomplicated?

**Current Architecture:**
```
GET /sitemap.xml
  ↓
sitemapController.js (runtime)
  ↓
connectDB() 
  ↓
Query MongoDB for all content
  ↓
Build XML and send
```

**Problems:**
- ❌ Runtime-generated (slow for crawlers)
- ❌ Every request hits the database
- ❌ Background regeneration tries to write static files to frontend/public
- ❌ Spawned child process has env isolation issues
- ❌ No error recovery if MongoDB is slow

**Better Approach: Static Generation**
```
Content changes (service, blog, location created/updated)
  ↓
Trigger: scheduleSitemapRegeneration()
  ↓
generateSitemap.js writes XML to frontend/public/sitemap.xml
  ↓
GET /sitemap.xml serves static file (instant, no DB)
```

**Advantages:**
- ✅ Fast for crawlers (no DB queries on every request)
- ✅ Decoupled from MongoDB availability
- ✅ Can be pre-generated and cached
- ✅ One static file generation per content change
- ✅ Cleaner architecture

---

## 9. THE EXACT FIX REQUIRED

### Option A: Fix the Child Process (Minimum Change)

**File: `backend/scripts/generateSitemap.js` (line 2)**

```javascript
// BEFORE
require('dotenv').config();

// AFTER - Fix #1: Explicit path to .env
const path = require('path');
require('dotenv').config({ 
  path: path.resolve(__dirname, '../.env') 
});
```

**File: `backend/utils/sitemapRegen.js` (line 21-28)**

```javascript
// BEFORE
const child = spawn(process.execPath, [scriptPath], {
  stdio: 'ignore',
  detached: true,
  env: process.env,
});

// AFTER - Fix #2: Set explicit cwd
const child = spawn(process.execPath, [scriptPath], {
  stdio: 'ignore',
  detached: true,
  cwd: path.resolve(__dirname, '../'),  // Set to backend/ directory
  env: process.env,
});
```

### Option B: Better - Don't Spawn at All (Recommended)

Move sitemap generation to main server process:
- Run on interval (every 1 hour or after content changes)
- No spawn needed
- Uses existing MongoDB connection
- Simpler error handling

---

## 10. DEPLOYMENT CHECKLIST FOR VPS

- [ ] Ensure `.env` exists at `/app/backend/.env`
- [ ] Ensure `MONGO_URI` is set in `.env`
- [ ] Apply Fix #1 to generateSitemap.js (explicit dotenv path)
- [ ] Apply Fix #2 to sitemapRegen.js (explicit cwd)
- [ ] Test: `curl http://localhost:5000/sitemap.xml` (should work immediately)
- [ ] Test: Create a new service → check sitemap updates
- [ ] Enable logging: Set `ENABLE_SITEMAP_REGEN=1` in `.env`
- [ ] Add PM2 ecosystem.config.js with env vars
- [ ] Monitor: `pm2 logs` to see sitemap generation

---

## 11. ROOT CAUSE SUMMARY

| Question | Answer |
|---|---|
| Is connectDB() called twice unnecessarily? | No - 2nd call is safe (checks isConnected) |
| Is there a spawned child process? | **YES** - sitemapRegen.js spawns generateSitemap.js |
| What is the child process cwd? | Not explicitly set (wrong directory on VPS) |
| Is .env actually loaded in child? | **NO** - dotenv.config() can't find file |
| Is MONGO_URI undefined in child? | **YES** - this is the root cause |
| Is the issue missing .env loading? | **YES** + wrong working directory |
| Is it a duplicate DB initialization? | No - this is correct behavior |
| Is it a VPS deployment path mismatch? | **YES** - spawn() doesn't preserve cwd |

---

## 12. EXACT ROOT CAUSE STATEMENT

**The sitemap generation fails on VPS because:**

1. `sitemapRegen.js` spawns `generateSitemap.js` as a child process WITHOUT setting the working directory
2. The child process's `process.cwd()` is not `/app/backend`, so `require('dotenv').config()` can't find `.env`
3. Without `.env` loaded, `process.env.MONGO_URI` is undefined in the child process
4. When `connectDB()` runs, it throws: "MONGO_URI environment variable is not set"
5. This ONLY affects background regeneration (spawn), not HTTP route requests (which reuse parent process)
6. It "works" on localhost because spawn likely runs from the correct directory by chance

