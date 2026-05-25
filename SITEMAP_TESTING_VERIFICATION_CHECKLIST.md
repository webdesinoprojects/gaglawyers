# SITEMAP FIX - VERIFICATION & TESTING CHECKLIST

## PRE-DEPLOYMENT CHECKLIST (Local Development)

### 1. Verify Code Changes Applied
- [ ] `backend/scripts/generateSitemap.js` line 3-7 has explicit dotenv path
- [ ] `backend/utils/sitemapRegen.js` line 31 has `cwd: backendDir,`
- [ ] All 5 files have debug logging statements
- [ ] No syntax errors: `npm run lint` or `node -c file.js`

### 2. Test Local Environment
```bash
cd backend

# Test server startup
npm start

# Expected in terminal:
# [server] Startup
# [server] cwd: /path/to/gaglawyers/backend
# [server] MONGO_URI available: true
```

### 3. Test HTTP Route (Keep Server Running)
```bash
# In another terminal
curl -i http://localhost:5000/sitemap.xml

# Expected response:
# HTTP/1.1 200 OK
# Content-Type: application/xml
# [sitemap-route] GET /sitemap.xml
# [sitemap-route] MONGO_URI available: true
# <?xml version="1.0" encoding="UTF-8"?>
```

### 4. Test Background Regeneration
```bash
# In another terminal, enable sitemap regen
export ENABLE_SITEMAP_REGEN=1

# Create a new service via API (will trigger background regen)
curl -X POST http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Service","slug":"test-service"}'

# Watch server terminal for:
# [sitemap-regen] Spawning sitemap generator
# [sitemap-regen] Parent cwd: /path/to/gaglawyers/backend
# [sitemap-regen] Setting child cwd: /path/to/gaglawyers/backend
# [sitemap-regen] Script path: /path/to/gaglawyers/backend/scripts/generateSitemap.js
# 
# [sitemap-gen] Child process startup
# [sitemap-gen] cwd: /path/to/gaglawyers/backend
# [sitemap-gen] .env exists: true
# [sitemap-gen] MONGO_URI loaded: true
# [sitemap-gen] services: 157
# [sitemap-gen] locations: 1501
# ...
# [sitemap-gen] Sitemap files written successfully
```

### 5. Verify Static Files Created
```bash
ls -lh frontend/public/sitemap*

# Expected output:
# -rw-r--r--  sitemap.xml
# -rw-r--r--  sitemap.xml.gz
# -rw-r--r--  pages-sitemap.xml
# -rw-r--r--  pages-sitemap.xml.gz
# -rw-r--r--  services.xml
# -rw-r--r--  services.xml.gz
# -rw-r--r--  blogs.xml
# -rw-r--r--  blogs.xml.gz
# -rw-r--r--  locations-1.xml
# -rw-r--r--  locations-1.xml.gz
```

### 6. Verify Static Sitemap Content
```bash
# Check main sitemap
head -20 frontend/public/sitemap.xml

# Expected (index of other sitemaps):
# <?xml version="1.0" encoding="UTF-8"?>
# <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
#   <sitemap>
#     <loc>https://gaglawyers.com/pages-sitemap.xml</loc>
#     <lastmod>2026-05-01T00:00:00.000Z</lastmod>
#   </sitemap>
#   ...
```

---

## VPS DEPLOYMENT CHECKLIST

### 1. Pre-Deployment Verification
- [ ] All code changes applied to VPS backend (git pull or manual)
- [ ] Backend `.env` exists at `/app/backend/.env`
- [ ] Backend `.env` contains valid `MONGO_URI` entry
- [ ] Backend `.env` contains `ENABLE_SITEMAP_REGEN=1` (or empty, default false)

```bash
# SSH to VPS
ssh root@your-vps-ip

# Verify .env exists and has MONGO_URI
grep MONGO_URI /app/backend/.env
# Should output: MONGO_URI=mongodb+srv://...

# Verify .env has ENABLE_SITEMAP_REGEN
grep ENABLE_SITEMAP_REGEN /app/backend/.env || echo "Not set (OK, defaults to false)"
```

### 2. Server Restart & Startup Verification
```bash
# Stop existing process
pm2 stop gaglawyers-backend
pm2 delete gaglawyers-backend

# Start with fresh logs
pm2 start backend/server.js --name gaglawyers-backend --env production

# Watch for startup logs
pm2 logs gaglawyers-backend

# Expected output (first 30 seconds):
# [server] Startup
# [server] cwd: /app/backend
# [server] __dirname: /app/backend
# [server] NODE_ENV: production
# [server] MONGO_URI available: true
# ✅ If you see this, basic setup is correct
```

### 3. HTTP Route Test
```bash
# Test HTTP route
curl -i https://your-domain.com/sitemap.xml

# Expected response:
# HTTP/2 200
# content-type: application/xml; charset=utf-8
# cache-control: public, max-age=3600
# <?xml version="1.0" encoding="UTF-8"?>
# <sitemapindex xmlns...

# Check server logs for route execution
pm2 logs gaglawyers-backend | grep sitemap-route

# Expected output:
# [sitemap-route] GET /sitemap.xml
# [sitemap-route] process.pid: 12345
# [sitemap-route] MONGO_URI available: true
```

### 4. Static Files Verification
```bash
# SSH to VPS
ssh root@your-vps-ip

# Check static files exist
ls -lh /app/frontend/public/sitemap*

# Expected: Multiple files exist with recent timestamps
# If MISSING: Regeneration hasn't run yet

# Check file sizes (should be non-empty)
wc -l /app/frontend/public/sitemap.xml
# Should be > 50 lines
```

### 5. Background Regeneration Test (Optional - if enabled)
```bash
# Only if ENABLE_SITEMAP_REGEN=1

# Trigger regeneration via admin API
curl -X POST https://your-domain.com/api/services \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Service for Sitemap",
    "slug":"test-service-sitemap-regen",
    "description":"Test"
  }'

# Watch logs for child process
pm2 logs gaglawyers-backend | tail -50

# Expected output (may take 5-30 seconds):
# [sitemap-regen] Spawning sitemap generator
# [sitemap-regen] Parent cwd: /app/backend
# [sitemap-regen] Setting child cwd: /app/backend
# [sitemap-gen] Child process startup
# [sitemap-gen] cwd: /app/backend
# [sitemap-gen] __dirname: /app/backend/scripts
# [sitemap-gen] .env path: /app/backend/.env
# [sitemap-gen] .env exists: true
# [sitemap-gen] MONGO_URI loaded: true
# ...
# [sitemap-regen] generator completed successfully
```

### 6. Search Engine Verification
```bash
# Test that sitemap is publicly accessible
curl -I https://your-domain.com/sitemap.xml
# Status: 200

# Check robots.txt references it
curl https://your-domain.com/robots.txt | grep sitemap
# Should show: Sitemap: https://your-domain.com/sitemap.xml

# Can submit to Google Search Console:
# https://search.google.com/search-console
# -> Sitemaps section -> Add new sitemap
# -> https://your-domain.com/sitemap.xml
```

---

## ERROR DIAGNOSIS QUICK REFERENCE

### Symptom: HTTP route works, but background regen fails

**Logs show:**
```
[sitemap-gen] MONGO_URI loaded: false
```

**Diagnosis:** Fix #2 not applied (explicit cwd)
**Solution:** Ensure sitemapRegen.js has `cwd: backendDir,` on spawn line

---

### Symptom: Both HTTP route and background regen fail

**Logs show:**
```
[server] MONGO_URI available: false
```

**Diagnosis:** .env not found or server startup incomplete
**Solution:** 
1. Verify `/app/backend/.env` exists: `cat /app/backend/.env | grep MONGO_URI`
2. Check permissions: `ls -la /app/backend/.env`
3. Wait 5 seconds for server logs to show (might be buffered)

---

### Symptom: HTTP route works, background regen never starts

**Logs show:**
```
No [sitemap-regen] logs at all
```

**Diagnosis:** 
- ENABLE_SITEMAP_REGEN not set to 1, OR
- Content change not triggering scheduleSitemapRegeneration(), OR
- Child process exiting silently

**Solution:**
1. Check: `grep ENABLE_SITEMAP_REGEN /app/backend/.env`
2. Enable: Add `ENABLE_SITEMAP_REGEN=1` to .env and restart
3. Monitor: `pm2 logs gaglawyers-backend | grep sitemap-regen`
4. Trigger: Create a new service via API

---

### Symptom: Child process spawns but exits with code != 0

**Logs show:**
```
[sitemap-regen] generator exited with code 1
```

**Diagnosis:** Something failed in generateSitemap.js
**Solution:**
1. Change stdio to see child output: `stdio: ['ignore', 'inherit', 'inherit']` (already done)
2. Re-check generateSitemap.js has explicit dotenv path
3. Check MongoDB connection string is valid
4. Look at full error in logs: `pm2 logs gaglawyers-backend | grep -A 20 "exited with code"`

---

### Symptom: "Cannot find module" errors

**Logs show:**
```
Error: Cannot find module '../.env'
or
Error: Cannot find module '../config/db'
```

**Diagnosis:** Child process cwd is wrong
**Solution:**
1. Verify `cwd: backendDir,` in sitemapRegen.js spawn options
2. Check path.resolve(__dirname, '../') resolves to `/app/backend`
3. Verify script is at `/app/backend/scripts/generateSitemap.js`

---

### Symptom: Sitemap XML exists but routes return 404

**Response:**
```
HTTP/1.1 404 Not Found
```

**Diagnosis:** 
- seoRoutes.js not registered, OR
- Routes are under `/api/` instead of `/`

**Solution:**
Check server.js line 78:
```javascript
app.use('/', seoRoutes);  // ✅ Should be at root
```

---

## PERFORMANCE VALIDATION

### Before Fixes (Broken on VPS)
```
GET /sitemap.xml → 500 Error: MONGO_URI is not set
Background regen → Never completes
Search engines → Can't access sitemap
```

### After Fixes
```
GET /sitemap.xml (runtime) → 200 OK in 3-5 seconds
GET /sitemap.xml (cached) → 200 OK in <1ms
Background regen → Completes in 5-30 seconds
Search engines → Fast access to up-to-date sitemap
Database queries → 10 per day instead of 10,000+
```

---

## ROLLBACK PROCEDURE (if needed)

If something goes wrong and you need to revert:

```bash
# Revert to previous version
git checkout HEAD~1 backend/server.js backend/config/db.js
git checkout HEAD~1 backend/scripts/generateSitemap.js backend/utils/sitemapRegen.js
git checkout HEAD~1 backend/controllers/sitemapController.js

# Restart server
pm2 restart gaglawyers-backend

# Verify it's back to previous state
pm2 logs gaglawyers-backend | head -20
```

---

## SUCCESS CRITERIA

All of the following must be true:

- ✅ Server starts without errors
- ✅ [server] logs show MONGO_URI available: true
- ✅ GET /sitemap.xml returns 200 status
- ✅ Sitemap XML is valid (opens in browser)
- ✅ Static sitemap files exist in frontend/public/
- ✅ (Optional) Background regen triggers and completes
- ✅ (Optional) Search engines can crawl sitemap
- ✅ No error logs with "MONGO_URI is not set"

---

## SUPPORT REFERENCE

If issues persist after following this checklist:

1. **Collect logs:**
   ```bash
   pm2 logs gaglawyers-backend > /tmp/sitemap-debug.log 2>&1
   cat /tmp/sitemap-debug.log
   ```

2. **Check disk space:**
   ```bash
   df -h /app
   ```

3. **Verify MongoDB connection:**
   ```bash
   # Test MONGO_URI from .env
   mongosh "mongodb+srv://username:password@cluster..."
   ```

4. **Check Node.js version:**
   ```bash
   node --version
   # Should be >= 14.0
   ```

5. **Verify file permissions:**
   ```bash
   ls -la /app/backend/.env
   ls -la /app/backend/scripts/
   ls -la /app/frontend/public/
   ```

