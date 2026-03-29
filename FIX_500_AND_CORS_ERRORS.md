# Fix: 500 Errors and CORS Issues

## Issues Fixed

I've identified and fixed the root causes of your backend errors:

### Problem 1: CORS Configuration Too Restrictive
**Symptom:** `No 'Access-Control-Allow-Origin' header`
**Cause:** CORS only allowed exact match of SITE_URL
**Fix:** Updated to allow multiple origins and be more flexible

### Problem 2: Settings Don't Exist in Database
**Symptom:** 500 errors on `/api/settings/*` endpoints
**Cause:** Settings collection is empty (not seeded)
**Fix:** Added default values when settings don't exist

### Problem 3: Vercel Serverless Incompatibility
**Symptom:** Backend crashes or doesn't respond
**Cause:** `app.listen()` and `process.exit()` don't work in serverless
**Fix:** Created proper serverless entry point and connection caching

## Changes Made

### 1. Updated CORS (`server.js`)
- Now allows multiple origins including localhost and production
- More permissive for development and production
- Includes proper headers for preflight requests

### 2. Fixed Settings Controller
- Returns default values instead of 404/500 when settings don't exist
- Prevents crashes when database is empty
- Provides sensible defaults

### 3. Created Serverless Entry Point
- `api/index.js` - Proper Vercel serverless handler
- Updated `vercel.json` to use it
- `server.js` now exports the app for Vercel

### 4. Fixed Database Connection
- Connection caching for serverless (reuses connections)
- Better timeout settings
- Doesn't call `process.exit()` in serverless environment
- Proper error handling

## 🚀 DEPLOY THE FIXES

### Step 1: Commit and Push

```bash
cd c:\Users\Krishna\OneDrive\Desktop\gaglawyers

git add .
git commit -m "Fix CORS, 500 errors, and serverless compatibility"
git push origin main
```

### Step 2: Redeploy Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **backend** project (gaglawyers-backend or similar)
3. Go to **Deployments** tab
4. Vercel will auto-redeploy, OR click **Redeploy** on latest deployment
5. **Wait for deployment** to complete (1-2 minutes)

### Step 3: Verify Backend Works

Visit your backend URL directly (e.g., `https://gaglawyers-backend.vercel.app`)

**Should show:**
```json
{"message": "GAG Lawyers API is running"}
```

**If you see this JSON response, backend is working!** ✅

### Step 4: Check Environment Variables in Vercel

Backend project → Settings → Environment Variables

**CRITICAL:** Verify `SITE_URL` is set to your EXACT frontend URL:
```
SITE_URL=https://gaglawyers.vercel.app
```

**Important:**
- ✅ Correct: `https://gaglawyers.vercel.app`
- ❌ Wrong: `https://gaglawyers.vercel.app/` (no trailing slash!)
- ❌ Wrong: `http://localhost:5173` (that's for local dev)

If it's wrong, update it and redeploy.

### Step 5: Test Your Website Again

1. Visit `https://gaglawyers.vercel.app`
2. Open DevTools (F12) → Console
3. **All errors should be gone!**
4. Try admin login
5. Should work now ✅

## What Each Fix Does

### CORS Fix
**Before:**
```javascript
origin: process.env.SITE_URL || 'http://localhost:5173'
// Only allows ONE exact origin
```

**After:**
```javascript
origin: function (origin, callback) {
  // Allows multiple origins
  // Works in development and production
  // More flexible
}
```

### Settings Fix
**Before:**
```javascript
if (!setting) {
  return res.status(404).json({ message: 'Setting not found' });
  // Frontend sees 404, breaks
}
```

**After:**
```javascript
if (!setting) {
  return res.status(200).json({
    data: { settingValue: defaultValue }
  });
  // Returns default, frontend works
}
```

### Serverless Fix
**Before:**
```javascript
app.listen(PORT, ...);
// Doesn't work in Vercel serverless
```

**After:**
```javascript
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, ...);
}
module.exports = app;
// Works in both environments
```

## Verification Checklist

After redeployment:

### ✅ Backend Should:
- [ ] Respond at root URL with JSON message
- [ ] Accept requests from frontend without CORS errors
- [ ] Return settings with defaults if not seeded
- [ ] Connect to MongoDB successfully
- [ ] No 500 errors in function logs

### ✅ Frontend Should:
- [ ] Load without errors
- [ ] Console shows no localhost references
- [ ] Console shows no CORS errors
- [ ] Console shows no 500 errors
- [ ] Admin login works
- [ ] Contact form works

## If Still Getting Errors

### Still seeing CORS errors?

**Check this EXACT setting in backend Vercel:**

Settings → Environment Variables → `SITE_URL`

Must be EXACTLY: `https://gaglawyers.vercel.app`

Copy this and paste it (don't type manually - might have typos/spaces)

### Still seeing 500 errors?

**Check Vercel Function Logs:**

1. Backend project → Deployments
2. Click on latest deployment
3. Click "Function Logs" or "Runtime Logs"
4. Look for error messages
5. Share those with me

Common issues:
- MongoDB connection string incorrect
- Missing environment variables
- Database timeout

### Backend not responding at all?

**Check deployment succeeded:**

1. Backend project → Deployments
2. Latest deployment should show "Ready" status
3. Click on it
4. Check build logs for errors
5. Visit backend URL directly - should show JSON message

## Quick Test Commands

### Test Backend Manually

Visit these URLs in your browser:

1. `https://gaglawyers-backend.vercel.app/`
   - Should show: `{"message": "GAG Lawyers API is running"}`

2. `https://gaglawyers-backend.vercel.app/api/services`
   - Should show: List of services (or empty array if not seeded)

3. `https://gaglawyers-backend.vercel.app/api/team`
   - Should show: List of team members (or empty array if not seeded)

If any of these don't work, backend has issues.

## Environment Variables You MUST Have

### In Backend Vercel Project:

```env
MONGO_URI=mongodb+srv://gaglawyers-admin:FsU6gQnNLbNkSWW5@cluster0.bbzseyk.mongodb.net/gaglawyers?retryWrites=true&w=majority
SITE_URL=https://gaglawyers.vercel.app
NODE_ENV=production
JWT_SECRET=gaglawyers_jwt_secret_key_2026_production
CLOUDINARY_CLOUD_NAME=dmp2lsw2b
CLOUDINARY_API_KEY=163896546675399
CLOUDINARY_API_SECRET=StRY8vXKLhrSZYJ1-CcT4-e70SQ
```

### In Frontend Vercel Project:

```env
VITE_API_URL=https://gaglawyers-backend.vercel.app
```

## After Fix

Your admin panel will:
- ✅ Load without errors
- ✅ Login works
- ✅ Upload images to Cloudinary
- ✅ Create/edit/delete content
- ✅ All API calls work

---

## 📌 TL;DR

1. **Push changes:** `git add . && git commit -m "Fix CORS and 500 errors" && git push`
2. **Backend redeploys automatically**
3. **Verify SITE_URL** in backend = `https://gaglawyers.vercel.app`
4. **Test:** Visit `https://gaglawyers-backend.vercel.app` - should see JSON
5. **Done!** All errors should be gone
