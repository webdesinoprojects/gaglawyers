# Quick Reference: Changes for Vercel Deployment

## What Was Changed

### Backend

1. **CORS Configuration** (`server.js`)
   - Now reads allowed origin from `SITE_URL` environment variable
   - Required for frontend to communicate with backend in production

2. **Created `vercel.json`**
   - Tells Vercel how to deploy the Node.js API
   - Routes all requests through `server.js`

3. **Updated `.env.example`**
   - Added production configuration examples
   - Includes MongoDB Atlas connection string format

### Frontend

1. **Created API Configuration** (`src/config/api.js`)
   - Centralized API URL management
   - Reads from `VITE_API_URL` environment variable
   - Falls back to localhost for development

2. **Updated All Files**
   - Replaced `http://localhost:5000` with `API_BASE_URL`
   - 20+ files updated across pages and components

3. **Created Environment Files**
   - `.env.example` - Template for environment variables
   - `.env.local` - Local development configuration
   - `.gitignore` - Updated to exclude .env files

## Environment Variables You Need to Set

### Backend (Vercel Dashboard)

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://gaglawyers-admin:FsU6gQnNLbNkSWW5@cluster0.bbzseyk.mongodb.net/gaglawyers?retryWrites=true&w=majority
JWT_SECRET=gaglawyers_jwt_secret_key_2026_production
JWT_EXPIRE=30d
SITE_URL=https://your-frontend.vercel.app
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

### Frontend (Vercel Dashboard)

```env
VITE_API_URL=https://your-backend.vercel.app
```

## Deployment Steps (Quick)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy Backend**
   - Import GitHub repo to Vercel
   - Select `backend` folder as root
   - Add all environment variables above
   - Deploy

3. **Deploy Frontend**
   - Import same GitHub repo to Vercel
   - Select `frontend` folder as root
   - Add `VITE_API_URL` with backend URL
   - Deploy

4. **Update Backend SITE_URL**
   - Set to frontend URL
   - Redeploy backend

## Important Notes

1. **MongoDB:** Your database is already on Atlas (cluster0.bbzseyk.mongodb.net) - you can use the same connection string for production

2. **Cloudinary:** Already configured and working - no changes needed

3. **Images:** All images upload to Cloudinary automatically - perfect for Vercel's read-only filesystem

4. **CORS:** Backend will only accept requests from the URL in `SITE_URL` - make sure it matches your frontend URL exactly (no trailing slash)

5. **Environment Variables:** Must be set in Vercel dashboard, not just in .env files

## Testing Locally

Before deploying, test that everything still works locally:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` and verify:
- Pages load
- API calls work
- Images can be uploaded (if logged in as admin)

## Files to Commit

Make sure these files are in your Git repository:

**Backend:**
- `vercel.json` ✓
- `server.js` (updated) ✓
- `.env.example` (updated) ✓
- `.gitignore` (make sure .env is excluded) ✓

**Frontend:**
- `src/config/api.js` ✓
- `.env.example` ✓
- `.gitignore` (updated) ✓
- All updated page/component files ✓

**DO NOT commit:**
- `.env` files (backend or frontend)
- `node_modules/`
- `dist/` or build folders

## Summary

Your codebase is now Vercel-ready with:
- ✅ Cloudinary integration for images
- ✅ Dynamic API URL configuration
- ✅ CORS properly configured
- ✅ Vercel deployment configuration
- ✅ MongoDB Atlas compatible
- ✅ Environment variable setup
- ✅ No local file storage dependencies

Follow the deployment steps in `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.
