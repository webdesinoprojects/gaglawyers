# Vercel Deployment Guide for GAG Lawyers

Complete step-by-step guide to deploy your GAG Lawyers website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas account for production database
- Cloudinary account with credentials configured

## Part 1: Push Your Code to GitHub

### 1. Initialize Git Repository (if not done)

```bash
cd c:\Users\Krishna\OneDrive\Desktop\gaglawyers
git init
git add .
git commit -m "Initial commit: GAG Lawyers website with Cloudinary integration"
```

### 2. Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository named `gaglawyers`
2. Don't initialize with README (you already have one)
3. Copy the remote URL

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/gaglawyers.git
git branch -M main
git push -u origin main
```

## Part 2: Deploy Backend to Vercel

### 1. Import Backend Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the **backend** folder as the root directory

### 2. Configure Backend Build Settings

**Root Directory:** `backend`
**Framework Preset:** Other
**Build Command:** (leave empty)
**Output Directory:** (leave empty)
**Install Command:** `npm install`

### 3. Add Backend Environment Variables

In the Vercel project settings → Environment Variables, add these:

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas (IMPORTANT: Use production database)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gaglawyers?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_strong_jwt_secret_production_key_here
JWT_EXPIRE=30d

# Frontend URL (UPDATE after frontend is deployed)
SITE_URL=https://your-frontend-domain.vercel.app

# Admin Credentials
ADMIN_EMAIL=admin@gaglawyers.com
ADMIN_PASSWORD=your_secure_admin_password

# Cloudinary (COPY from your local .env)
CLOUDINARY_CLOUD_NAME=dmp2lsw2b
CLOUDINARY_API_KEY=163896546675399
CLOUDINARY_API_SECRET=StRY8vXKLhrSZYJ1-CcT4-e70SQ

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=contact@gaglawyers.com
```

### 4. Deploy Backend

Click "Deploy" and wait for the build to complete.

**Your backend URL will be:** `https://gaglawyers-backend.vercel.app` (or similar)

## Part 3: Deploy Frontend to Vercel

### 1. Import Frontend Project

1. Click "Add New" → "Project" again
2. Import the same GitHub repository
3. Select the **frontend** folder as the root directory

### 2. Configure Frontend Build Settings

**Root Directory:** `frontend`
**Framework Preset:** Vite
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

**IMPORTANT:** A `vercel.json` file has been created in the frontend folder to handle client-side routing. This ensures all routes work correctly with React Router.

### 3. Add Frontend Environment Variables

In the Vercel project settings → Environment Variables, add:

```env
VITE_API_URL=https://your-backend-domain.vercel.app
```

**IMPORTANT:** Replace `your-backend-domain.vercel.app` with your actual backend URL from Part 2, Step 4.

### 4. Deploy Frontend

Click "Deploy" and wait for the build to complete.

**Your frontend URL will be:** `https://gaglawyers.vercel.app` (or similar)

## Part 4: Update Backend SITE_URL

After frontend deployment:

1. Go to backend project in Vercel dashboard
2. Settings → Environment Variables
3. Update `SITE_URL` to your frontend URL: `https://gaglawyers.vercel.app`
4. Redeploy the backend (Deployments → click the three dots → Redeploy)

This is crucial for CORS to work properly.

## Part 5: Set Up MongoDB Atlas (Production Database)

### 1. Create MongoDB Atlas Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a free cluster (M0 Sandbox)
4. Choose your region (preferably closest to your users)

### 2. Configure Database Access

1. Database Access → Add New Database User
2. Choose "Password" authentication
3. Create username and strong password
4. Save credentials securely
5. Set user privileges to "Read and write to any database"

### 3. Configure Network Access

1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel since IPs are dynamic
   - MongoDB Atlas still requires authentication
3. Confirm

### 4. Get Connection String

1. Databases → Connect → Connect your application
2. Copy the connection string
3. Replace `<password>` with your database user password
4. Replace `<dbname>` with `gaglawyers`
5. Add to Vercel backend environment variables as `MONGO_URI`

### 5. Seed Production Database

After backend is deployed with MongoDB Atlas:

```bash
# Update your local .env to use production MongoDB temporarily
# Then run:
cd backend
npm run seed

# Revert .env back to local MongoDB after seeding
```

Or use MongoDB Compass to connect and manage data visually.

## Part 6: Configure Custom Domain (Optional)

### For Frontend

1. Vercel Dashboard → Your Frontend Project → Settings → Domains
2. Add your domain (e.g., `gaglawyers.com`)
3. Follow Vercel's DNS configuration instructions
4. Update `SITE_URL` in backend environment variables

### For Backend

1. Vercel Dashboard → Your Backend Project → Settings → Domains
2. Add subdomain (e.g., `api.gaglawyers.com`)
3. Update `VITE_API_URL` in frontend environment variables
4. Redeploy frontend

## Environment Variables Summary

### Backend (.env for production)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/gaglawyers?retryWrites=true&w=majority
JWT_SECRET=your_strong_production_secret
JWT_EXPIRE=30d
SITE_URL=https://gaglawyers.vercel.app

ADMIN_EMAIL=admin@gaglawyers.com
ADMIN_PASSWORD=secure_production_password

CLOUDINARY_CLOUD_NAME=dmp2lsw2b
CLOUDINARY_API_KEY=163896546675399
CLOUDINARY_API_SECRET=StRY8vXKLhrSZYJ1-CcT4-e70SQ

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=contact@gaglawyers.com
```

### Frontend (.env for production)

```env
VITE_API_URL=https://gaglawyers-backend.vercel.app
```

## Changes Made for Vercel Deployment

### Backend Changes

1. **Created `vercel.json`**
   - Configures Vercel to treat the app as a Node.js serverless function
   - Routes all requests to `server.js`

2. **Updated CORS Configuration**
   - Now reads `SITE_URL` from environment variable
   - Enables credentials for authentication
   - Allows only specified origin (frontend URL)

3. **Removed Local Upload System**
   - All images now go to Cloudinary
   - No local file storage needed (Vercel has read-only filesystem)

### Frontend Changes

1. **Created `src/config/api.js`**
   - Centralized API URL configuration
   - Reads from `VITE_API_URL` environment variable
   - Falls back to localhost for development

2. **Updated All API Calls**
   - Replaced hardcoded `http://localhost:5000` URLs
   - Now uses `API_BASE_URL` from config
   - Works in both development and production

3. **Created `.env.local` and `.env.example`**
   - Provides environment variable templates
   - Documents what needs to be set

## Testing Deployment

### 1. Test Backend API

Visit: `https://your-backend-url.vercel.app`

Expected response:
```json
{
  "message": "GAG Lawyers API is running"
}
```

Test endpoints:
- `GET /api/services` - Should return services
- `GET /api/team` - Should return team members
- `POST /api/contact` - Should accept contact form

### 2. Test Frontend

Visit: `https://your-frontend-url.vercel.app`

Check:
- [ ] All pages load correctly
- [ ] Images display (if you've uploaded any to Cloudinary)
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin panel can upload images to Cloudinary
- [ ] Dynamic content loads from API

## Troubleshooting

### Issue: CORS Errors

**Solution:**
1. Verify `SITE_URL` in backend matches frontend URL exactly
2. Check that frontend URL doesn't have trailing slash
3. Redeploy backend after updating `SITE_URL`

### Issue: MongoDB Connection Failed

**Solution:**
1. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
2. Check username and password in connection string
3. Ensure database name is correct
4. Test connection string locally first

### Issue: Environment Variables Not Working

**Solution:**
1. Verify variables are set in Vercel dashboard (not just .env file)
2. Variables must be added before deployment
3. Redeploy after adding/changing variables
4. For frontend, variables must start with `VITE_`

### Issue: Images Not Uploading

**Solution:**
1. Verify Cloudinary credentials are correct
2. Check that admin authentication is working
3. Test Cloudinary upload endpoint directly
4. Check browser console for errors

### Issue: Build Failing

**Backend:**
- Check that all dependencies are in `package.json`
- Verify `vercel.json` syntax is correct
- Check Vercel build logs for specific errors

**Frontend:**
- Ensure `VITE_API_URL` is set in environment variables
- Check for ESLint errors (fix with `npm run lint`)
- Verify all imports are correct

## Post-Deployment Checklist

- [ ] Backend API responds correctly
- [ ] Frontend loads and displays properly
- [ ] MongoDB connection is working
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Image upload to Cloudinary works
- [ ] CORS is configured correctly
- [ ] All environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active (automatic with Vercel)
- [ ] Test on mobile devices
- [ ] Run database seed script for initial data

## Important Security Notes

1. **Never commit `.env` files to Git** - They contain sensitive credentials
2. **Use strong JWT_SECRET** in production (64+ characters recommended)
3. **Change ADMIN_PASSWORD** from default before production
4. **Use Gmail App Password** not your actual Gmail password
5. **Keep Cloudinary credentials secure** - Don't share publicly

## Continuous Deployment

After initial setup, Vercel automatically deploys:
- **Main branch** → Production deployment
- **Pull requests** → Preview deployments

Any push to your GitHub repository will trigger automatic redeployment.

## Monitoring

### Vercel Dashboard

- View deployment logs
- Monitor function execution
- Check bandwidth usage
- View analytics

### MongoDB Atlas

- Monitor database connections
- View query performance
- Set up alerts
- Backup configuration

## Cost Considerations

### Vercel Free Tier Includes:

- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100 GB bandwidth/month
- Serverless function execution

### MongoDB Atlas Free Tier:

- 512 MB storage
- Shared CPU
- Suitable for testing and small production sites

### Cloudinary Free Tier:

- 25 GB storage
- 25 GB bandwidth/month
- 10,000 transformations/month

## Rollback Process

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click three dots → "Promote to Production"
4. Instant rollback with zero downtime

## Need Help?

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas Support:** [mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas/)
- **Cloudinary Documentation:** [cloudinary.com/documentation](https://cloudinary.com/documentation)

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build frontend locally (test before deploy)
cd frontend
npm run build
npm run preview

# Test backend locally
cd backend
npm start

# Seed database
cd backend
npm run seed
```

## Summary of Files Changed

### Backend
- `server.js` - Updated CORS configuration
- `vercel.json` - Created for Vercel deployment
- `.env.example` - Added production guidance

### Frontend
- `src/config/api.js` - Created API configuration
- `.env.example` - Created with production guidance
- `.env.local` - Created for local development
- All pages and components - Updated to use API_BASE_URL

### What You DON'T Need to Change

- No code changes required
- No database schema changes needed
- Models are already Vercel-ready (no file storage)
- All images use Cloudinary (Vercel-compatible)

## Your Current Configuration

Based on your `.env` file:

**Cloudinary Credentials (Already configured):**
- Cloud Name: `dmp2lsw2b`
- API Key: `163896546675399`
- API Secret: `StRY8vXKLhrSZYJ1-CcT4-e70SQ`

**MongoDB (Need to migrate to Atlas for production):**
- Current: MongoDB Atlas (cluster0.bbzseyk.mongodb.net)
- This is already production-ready! Just use the same URI in Vercel

**You're ready to deploy!** Your MongoDB is already on Atlas, and Cloudinary is configured.

## Step-by-Step Deployment (Simplified)

Since your MongoDB is already on Atlas:

### Backend Deployment

1. Push code to GitHub
2. Import to Vercel (select `backend` folder)
3. Add environment variables (copy from your current `.env`)
4. Set `SITE_URL` to `http://localhost:5173` initially
5. Deploy
6. Note the backend URL (e.g., `https://gaglawyers-backend.vercel.app`)

### Frontend Deployment

1. Import same repo to Vercel again (select `frontend` folder)
2. Add environment variable: `VITE_API_URL=https://your-backend-url.vercel.app`
3. Deploy
4. Note the frontend URL (e.g., `https://gaglawyers.vercel.app`)

### Final Configuration

1. Update backend `SITE_URL` to your frontend URL
2. Redeploy backend
3. Test the website

**Done!** Your website is live on Vercel with Cloudinary image uploads.
