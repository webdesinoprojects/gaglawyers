# Backend 500 Error Diagnosis & Fix Guide

## The Problem
Your backend is returning 500 errors because it's either:
1. Not connecting to MongoDB
2. Missing environment variables
3. The admin user hasn't been created yet

## Step 1: Check Backend Health

After Vercel redeploys (in ~2 minutes), visit these URLs in your browser:

1. **Health Check**: `https://gaglawyers-backend.vercel.app/api/health`
   - Should show MongoDB connection status
   - Should show which environment variables are set

2. **Database Test**: `https://gaglawyers-backend.vercel.app/api/test-db`
   - Should show if admin user exists
   - Will tell you if you need to run the seed script

## Step 2: Verify Environment Variables in Vercel

Go to your backend project on Vercel: https://vercel.com/dashboard

1. Click on your `gaglawyers-backend` project
2. Go to **Settings** → **Environment Variables**
3. Make sure these are set:

```
MONGO_URI = mongodb+srv://your-connection-string
JWT_SECRET = your-secret-key-here
SITE_URL = https://gaglawyers.vercel.app
CLOUDINARY_CLOUD_NAME = your-cloudinary-name
CLOUDINARY_API_KEY = your-cloudinary-key
CLOUDINARY_API_SECRET = your-cloudinary-secret
NODE_ENV = production
```

If any are missing, add them and **REDEPLOY** from the Deployments tab.

## Step 3: Check MongoDB Atlas

Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas

1. Check that your cluster is running
2. Go to **Network Access** → Make sure `0.0.0.0/0` is allowed (or Vercel's IP ranges)
3. Go to **Database Access** → Verify your database user exists and has read/write permissions

## Step 4: Create Admin User (If Missing)

If the `/api/test-db` endpoint shows no admin user:

1. Go to Vercel Dashboard → Your backend project
2. Click **Deployments** → Click the latest deployment
3. Click **Functions** → Find and click `api/index.js`
4. Click **Function Logs** tab
5. Look for MongoDB connection errors

OR run the seed script locally:

```bash
cd backend
node scripts/seed.js
```

This will create the default admin user:
- Email: `admin@gaglawyers.com`
- Password: `admin123`

## Step 5: Common Issues

### Issue: "MongoServerError: Authentication failed"
- Your `MONGO_URI` password is wrong or needs URL encoding
- Check if password has special characters like `@`, `#`, `%` - they need to be URL encoded

### Issue: "MongooseServerSelectionError: Could not connect to any servers"
- MongoDB Atlas Network Access doesn't allow Vercel
- Add `0.0.0.0/0` to Network Access in Atlas

### Issue: "JsonWebTokenError: secret or public key must be provided"
- `JWT_SECRET` is not set in Vercel environment variables

## Step 6: Redeploy After Fixes

After making any environment variable changes:

1. Go to Vercel Dashboard → Backend project
2. Click **Deployments** tab
3. Click the 3 dots `...` next to the latest deployment
4. Click **Redeploy**

---

## Quick Diagnostic Commands

After the backend redeploys, check:

```bash
# 1. Health check
curl https://gaglawyers-backend.vercel.app/api/health

# 2. Database test
curl https://gaglawyers-backend.vercel.app/api/test-db

# 3. Test login (replace with your admin credentials)
curl -X POST https://gaglawyers-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gaglawyers.com", "password": "admin123"}'
```

If these work, your backend is healthy and the login should work!
