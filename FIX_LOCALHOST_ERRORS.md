# Fix: Frontend Trying to Connect to Localhost

## Good News!

Your frontend deployed successfully! The 404 error is gone ✅

## Current Problem

Your console shows:
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'https://gaglawyers.vercel.app'
has been blocked by CORS policy
```

**Translation:** Your deployed frontend is trying to call `localhost:5000` (your local computer's backend), which obviously doesn't exist in production.

## Why This Happens

Check your `frontend/src/config/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Since `VITE_API_URL` is not set in Vercel, it's using the fallback: `localhost:5000`

## 🎯 THE FIX (2 Steps)

### Step 1: Deploy Your Backend First

If you haven't deployed the backend yet:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import: `webdesinoprojects/gaglawyers` (same repository)
4. **CRITICAL:** Set **Root Directory** to `backend`
5. Set **Framework Preset** to **Other**
6. **Add ALL Environment Variables** (from your backend `.env` file):

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://gaglawyers-admin:FsU6gQnNLbNkSWW5@cluster0.bbzseyk.mongodb.net/gaglawyers?retryWrites=true&w=majority
JWT_SECRET=gaglawyers_jwt_secret_key_2026_production
JWT_EXPIRE=30d
SITE_URL=https://gaglawyers.vercel.app
ADMIN_EMAIL=admin@gaglawyers.com
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=dmp2lsw2b
CLOUDINARY_API_KEY=163896546675399
CLOUDINARY_API_SECRET=StRY8vXKLhrSZYJ1-CcT4-e70SQ
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=contact@gaglawyers.com
```

7. Click **Deploy**
8. **Wait for deployment to complete**
9. **Note your backend URL** (e.g., `https://gaglawyers-backend.vercel.app` or similar)

### Step 2: Add Backend URL to Frontend

1. Go to your **frontend** project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Click **Add Variable**
4. **Name:** `VITE_API_URL`
5. **Value:** `https://your-backend-url.vercel.app` (from Step 1, item 9)
6. **Select:** Production, Preview, and Development (check all three)
7. Click **Save**
8. **Go to Deployments tab**
9. Click **Redeploy** on the latest deployment

### Step 3: Wait for Redeployment

- This will take 20-40 seconds
- Vercel will rebuild with the new environment variable
- The API calls will now go to your production backend

## Verification

After redeployment:

### ✅ Console Should Show:
- No localhost errors
- No CORS errors (if SITE_URL is set correctly in backend)
- API calls going to your backend URL

### ✅ Test These:
1. Visit `https://gaglawyers.vercel.app`
2. Open DevTools (F12) → Network tab
3. Try to use the contact form or navigate
4. Should see requests to `https://your-backend-url.vercel.app/api/...`

## Common Issues

### Issue 1: Still Seeing localhost Errors

**Problem:** Environment variable not set or frontend not redeployed
**Fix:**
1. Verify `VITE_API_URL` exists in Settings → Environment Variables
2. Verify it's enabled for "Production"
3. Redeploy again
4. Hard refresh browser (Ctrl + Shift + R)

### Issue 2: CORS Errors to Production Backend

**Problem:** Backend `SITE_URL` doesn't match frontend URL
**Fix:**
1. Backend project → Settings → Environment Variables
2. Set `SITE_URL=https://gaglawyers.vercel.app` (exact URL, no trailing slash)
3. Redeploy backend

### Issue 3: Backend Not Deployed

**Problem:** You only deployed frontend
**Fix:** Follow Step 1 above to deploy backend

## Quick Debug

### Check What URL Frontend Is Using

1. Visit your site: `https://gaglawyers.vercel.app`
2. Open DevTools Console (F12)
3. Type: `console.log(import.meta.env.VITE_API_URL)`
4. Press Enter

**Should show:** Your backend URL (e.g., `https://gaglawyers-backend.vercel.app`)
**If shows:** `undefined` or `localhost:5000` → Environment variable not set correctly

## Visual Guide

### Current State (Broken):
```
Frontend (Production): https://gaglawyers.vercel.app
    ↓ (trying to call)
Backend (Local): http://localhost:5000 ← Doesn't exist in production!
    ↓
Result: CORS error + Failed to fetch ❌
```

### Correct State (Fixed):
```
Frontend (Production): https://gaglawyers.vercel.app
    ↓ (calling)
Backend (Production): https://gaglawyers-backend.vercel.app
    ↓
Result: Everything works ✅
```

## Two Vercel Projects Needed

You should have:

**Project 1: gaglawyers** (Frontend)
- Root Directory: `frontend`
- Environment Variable: `VITE_API_URL` = backend URL
- URL: `https://gaglawyers.vercel.app`

**Project 2: gaglawyers-backend** (Backend API)
- Root Directory: `backend`
- Environment Variables: All backend env vars including `SITE_URL`
- URL: `https://gaglawyers-backend.vercel.app`

## After Both Are Deployed

Your website will work fully:
- ✅ Frontend loads
- ✅ API calls work
- ✅ Contact form submits
- ✅ Admin panel works
- ✅ Image uploads work (Cloudinary)

## Environment Variables Checklist

### Frontend Vercel Project:
- [ ] `VITE_API_URL` = `https://your-backend.vercel.app`

### Backend Vercel Project:
- [ ] `NODE_ENV` = `production`
- [ ] `MONGO_URI` = Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` = Your JWT secret
- [ ] `JWT_EXPIRE` = `30d`
- [ ] `SITE_URL` = `https://gaglawyers.vercel.app`
- [ ] `CLOUDINARY_CLOUD_NAME` = `dmp2lsw2b`
- [ ] `CLOUDINARY_API_KEY` = `163896546675399`
- [ ] `CLOUDINARY_API_SECRET` = `StRY8vXKLhrSZYJ1-CcT4-e70SQ`
- [ ] All other email settings

## TL;DR

**Problem:** Frontend using localhost URL
**Fix:** 
1. Deploy backend to Vercel
2. Add `VITE_API_URL=<backend-url>` to frontend environment variables
3. Redeploy frontend
4. Done!
