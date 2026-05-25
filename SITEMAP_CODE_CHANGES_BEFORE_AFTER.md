# EXACT CODE CHANGES - BEFORE & AFTER

## File 1: backend/server.js

### BEFORE
```javascript
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
```

### AFTER
```javascript
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ===== DEBUG: Server startup =====
console.log('[server] Startup');
console.log('[server] cwd:', process.cwd());
console.log('[server] __dirname:', __dirname);
console.log('[server] .env path:', path.join(__dirname, '.env'));
console.log('[server] NODE_ENV:', process.env.NODE_ENV);
console.log('[server] MONGO_URI available:', !!process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
```

**Changes:** Added debug logging to track .env loading at startup

---

## File 2: backend/config/db.js

### BEFORE
```javascript
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set. Check your .env file on the server.');
  }
```

### AFTER
```javascript
  if (!process.env.MONGO_URI) {
    console.error('[db] ❌ MONGO_URI not found!');
    console.error('[db] cwd:', process.cwd());
    console.error('[db] __dirname:', __dirname);
    console.error('[db] process.pid:', process.pid);
    console.error('[db] Available env keys:', Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('DB')));
    throw new Error('MONGO_URI environment variable is not set. Check your .env file on the server.');
  }
```

**Changes:** Added diagnostic logging when MONGO_URI is missing (shows which process and cwd)

---

## File 3: backend/scripts/generateSitemap.js

### BEFORE
```javascript
/* eslint-disable no-console */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { SitemapStream, streamToPromise } = require('sitemap');
```

### AFTER
```javascript
/* eslint-disable no-console */
const path = require('path');

// ===== CRITICAL FIX #1: Explicit .env path for child process =====
require('dotenv').config({ 
  path: path.resolve(__dirname, '../.env') 
});

// ===== DEBUG LOGS =====
console.log('[sitemap-gen] Child process startup');
console.log('[sitemap-gen] cwd:', process.cwd());
console.log('[sitemap-gen] __dirname:', __dirname);
console.log('[sitemap-gen] .env path:', path.resolve(__dirname, '../.env'));
console.log('[sitemap-gen] .env exists:', require('fs').existsSync(path.resolve(__dirname, '../.env')));
console.log('[sitemap-gen] NODE_ENV:', process.env.NODE_ENV);
console.log('[sitemap-gen] MONGO_URI loaded:', !!process.env.MONGO_URI);

const fs = require('fs');
const zlib = require('zlib');
const { SitemapStream, streamToPromise } = require('sitemap');
```

**Changes:** 
1. **CRITICAL**: Added explicit path to .env (fixes child process loading)
2. Added debug logging to verify .env found and MONGO_URI loaded

---

## File 4: backend/utils/sitemapRegen.js

### BEFORE
```javascript
/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');

let timer = null;
let running = false;
let pending = false;

function isEnabled() {
  const raw = String(process.env.ENABLE_SITEMAP_REGEN || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

function runGenerator() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;

  const scriptPath = path.resolve(__dirname, '../scripts/generateSitemap.js');
  const child = spawn(process.execPath, [scriptPath], {
    stdio: 'ignore',
    detached: true,
    env: process.env,
  });

  child.unref();

  child.on('exit', (code) => {
    running = false;
    if (pending) {
      pending = false;
      scheduleSitemapRegeneration('pending');
    }
    if (code !== 0) {
      console.error(`[sitemap] generator exited with code ${code}`);
    }
  });
}

function scheduleSitemapRegeneration(reason = 'content-change', debounceMs = 5000) {
  if (!isEnabled()) return;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    console.log(`[sitemap] regenerating (${reason})`);
    runGenerator();
  }, debounceMs);
}

module.exports = {
  scheduleSitemapRegeneration,
};
```

### AFTER
```javascript
/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');

let timer = null;
let running = false;
let pending = false;

function isEnabled() {
  const raw = String(process.env.ENABLE_SITEMAP_REGEN || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

function runGenerator() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;

  const scriptPath = path.resolve(__dirname, '../scripts/generateSitemap.js');
  
  // ===== CRITICAL FIX #2: Set explicit cwd for child process =====
  const backendDir = path.resolve(__dirname, '../');
  
  console.log('[sitemap-regen] Spawning sitemap generator');
  console.log('[sitemap-regen] Parent cwd:', process.cwd());
  console.log('[sitemap-regen] Setting child cwd:', backendDir);
  console.log('[sitemap-regen] Script path:', scriptPath);
  
  const child = spawn(process.execPath, [scriptPath], {
    stdio: ['ignore', 'inherit', 'inherit'],  // Changed to 'inherit' to see child output
    detached: true,
    cwd: backendDir,  // ✅ Set working directory to backend/
    env: process.env,
  });

  child.unref();

  child.on('exit', (code) => {
    running = false;
    if (pending) {
      pending = false;
      scheduleSitemapRegeneration('pending');
    }
    if (code !== 0) {
      console.error(`[sitemap-regen] generator exited with code ${code}`);
    } else {
      console.log('[sitemap-regen] generator completed successfully');
    }
  });

  child.on('error', (err) => {
    running = false;
    console.error('[sitemap-regen] generator error:', err);
  });
}

function scheduleSitemapRegeneration(reason = 'content-change', debounceMs = 5000) {
  if (!isEnabled()) return;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    console.log(`[sitemap-regen] regenerating (${reason})`);
    runGenerator();
  }, debounceMs);
}

module.exports = {
  scheduleSitemapRegeneration,
};
```

**Changes:**
1. **CRITICAL**: Added `cwd: backendDir` to spawn() options (fixes child working directory)
2. Changed `stdio: 'ignore'` to `stdio: ['ignore', 'inherit', 'inherit']` (shows child output for debugging)
3. Added pre-spawn debug logging to show parent cwd and child cwd
4. Added `.on('error')` handler for better error reporting
5. Added success message on exit code 0

---

## File 5: backend/controllers/sitemapController.js

### BEFORE (generateSitemap function)
```javascript
const generateSitemap = async (req, res) => {
  try {
    await connectDB();
    const baseUrl = getBaseUrl(req);
    
    // Count total location pages...
```

### AFTER (generateSitemap function)
```javascript
const generateSitemap = async (req, res) => {
  try {
    // ===== DEBUG: Runtime route execution =====
    console.log('[sitemap-route] GET /sitemap.xml');
    console.log('[sitemap-route] process.cwd():', process.cwd());
    console.log('[sitemap-route] process.pid:', process.pid);
    console.log('[sitemap-route] MONGO_URI available:', !!process.env.MONGO_URI);
    
    await connectDB();
    const baseUrl = getBaseUrl(req);
    
    // Count total location pages...
```

**Changes:** Added debug logging to HTTP route to track MONGO_URI availability in runtime execution

---

### BEFORE (generateNamedSitemap function)
```javascript
const generateNamedSitemap = async (req, res) => {
  try {
    await connectDB();
    const name = String(req.params.name || '').toLowerCase();
    let entries = [];
```

### AFTER (generateNamedSitemap function)
```javascript
const generateNamedSitemap = async (req, res) => {
  try {
    // ===== DEBUG: Runtime route execution =====
    console.log('[sitemap-route] GET /:name.xml', { name: req.params.name });
    console.log('[sitemap-route] process.cwd():', process.cwd());
    console.log('[sitemap-route] process.pid:', process.pid);
    console.log('[sitemap-route] MONGO_URI available:', !!process.env.MONGO_URI);
    
    await connectDB();
    const name = String(req.params.name || '').toLowerCase();
    let entries = [];
```

**Changes:** Added debug logging to named sitemap routes

---

## SUMMARY OF CHANGES

| File | Type | Impact | Critical? |
|---|---|---|---|
| generateSitemap.js | Fix | Explicit dotenv path | ✅ YES |
| sitemapRegen.js | Fix | Explicit spawn cwd | ✅ YES |
| db.js | Diagnostic | Better error info | ⚠️ Debugging only |
| server.js | Diagnostic | Startup tracking | ⚠️ Debugging only |
| sitemapController.js | Diagnostic | Route tracking | ⚠️ Debugging only |

---

## DEPLOYMENT VERIFICATION

After applying these changes:

```bash
# Start server
npm start

# Expected output:
# [server] Startup
# [server] cwd: /app/backend
# [server] MONGO_URI available: true

# Test HTTP route
curl http://localhost:5000/sitemap.xml

# Expected output:
# [sitemap-route] GET /sitemap.xml
# [sitemap-route] MONGO_URI available: true
# <?xml version="1.0"...

# Test background regeneration
# Create a new service via API...
# Expected output:
# [sitemap-regen] Spawning sitemap generator
# [sitemap-regen] Setting child cwd: /app/backend
# [sitemap-gen] Child process startup
# [sitemap-gen] cwd: /app/backend
# [sitemap-gen] MONGO_URI loaded: true
```

---

## IF YOU STILL SEE ERRORS

Check the output for these specific lines:

1. **[server] MONGO_URI available: true** ← Should see at startup
2. **[sitemap-route] MONGO_URI available: true** ← Should see on HTTP request
3. **[sitemap-gen] MONGO_URI loaded: true** ← Should see on background regen

If any show `false`, you know exactly which execution path has the problem.

