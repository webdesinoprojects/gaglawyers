# 🚀 How to Start the Application

## The Main Issue

You're seeing `ERR_CONNECTION_REFUSED` because **the backend server is not running**. Both frontend and backend need to be running simultaneously.

## Quick Start (2 Terminals Required)

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] starting `node server.js`
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

**⚠️ Keep this terminal running!** Don't close it.

### Terminal 2: Start Frontend Server

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**⚠️ Keep this terminal running too!**

## Verify Both Servers Are Running

### Check Backend (Port 5000)
Open browser and go to:
```
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running"
}
```

### Check Frontend (Port 5173)
Open browser and go to:
```
http://localhost:5173
```

You should see the GAG Lawyers homepage.

## Common Issues & Solutions

### Issue 1: "Port 5000 already in use"

**Solution A - Kill the process:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Alternative: Use different port
# Edit backend/.env and add:
PORT=5001
```

**Solution B - Use different port:**
```bash
# Edit backend/.env
PORT=5001

# Then update frontend/src/config/api.js
const API_BASE_URL = 'http://localhost:5001';
```

### Issue 2: "Port 5173 already in use"

```bash
# Kill the Vite process and restart
# Or Vite will automatically suggest another port (5174)
```

### Issue 3: "MongoDB connection failed"

Check your `backend/.env` file has correct MongoDB URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gaglawyers
```

### Issue 4: Backend starts but crashes immediately

Check for:
1. Missing dependencies: `cd backend && npm install`
2. Syntax errors in recent code changes
3. MongoDB connection string in `.env`

### Issue 5: "Cannot GET /api/reviews" (404)

This means backend is running but routes aren't registered. Check:
```bash
# In backend/server.js, verify this line exists:
app.use('/api/reviews', require('./routes/reviewRoutes'));
```

## Full Startup Checklist

Before starting servers, verify:

- [ ] MongoDB Atlas is accessible (check connection string)
- [ ] `backend/.env` file exists with all required variables
- [ ] `frontend/.env.local` exists with API URL
- [ ] Dependencies installed:
  ```bash
  cd backend && npm install
  cd ../frontend && npm install
  ```
- [ ] No other processes using ports 5000 or 5173

## Environment Files

### backend/.env
```env
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your-secret-key-here

# Admin Credentials
ADMIN_EMAIL=admin@gaglawyers.com
ADMIN_PASSWORD=admin123

# Cloudinary
CLOUDINARY_CLOUD_NAME=dmp2lsw2b
CLOUDINARY_API_KEY=163896546675399
CLOUDINARY_API_SECRET=StRY8vXKLhrSZYJ1-CcT4-e70SQ

# Server
PORT=5000
NODE_ENV=development
```

### frontend/.env.local
```env
VITE_API_URL=http://localhost:5000
```

## After Servers Are Running

1. **Fix admin user** (if not done already):
   ```bash
   # In a NEW terminal (keep servers running)
   cd backend
   npm run fix-admin
   ```

2. **Add testimonials** (if not done already):
   ```bash
   cd backend
   npm run add-testimonials
   ```

3. **Access admin panel**:
   - URL: http://localhost:5173/admin/login
   - Email: admin@gaglawyers.com
   - Password: admin123

4. **Test image upload**:
   - Go to: http://localhost:5173/admin/reviews
   - Click "Add Review"
   - Try uploading a client photo
   - Should work now ✅

## Development Workflow

### Daily Startup
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### Making Changes
- Backend changes: Server auto-restarts (nodemon)
- Frontend changes: Page auto-reloads (Vite HMR)
- No need to restart servers for code changes

### Stopping Servers
Press `Ctrl + C` in each terminal to stop the servers.

## Production Deployment

For Vercel deployment, see:
- `VERCEL_DEPLOYMENT_GUIDE.md`
- `DEPLOYMENT_QUICK_REFERENCE.md`

## Troubleshooting Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check MongoDB connection
cd backend && node -e "require('./config/db')().then(() => console.log('✓ Connected'))"

# View all running Node processes
# Windows
tasklist | findstr node

# Check what's using port 5000
netstat -ano | findstr :5000

# Reinstall dependencies (if issues persist)
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

## Quick Reference

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Backend API | 5000 | http://localhost:5000 | REST API |
| Frontend | 5173 | http://localhost:5173 | React App |
| Admin Panel | 5173 | http://localhost:5173/admin | CMS |
| MongoDB | 27017 | Atlas Cloud | Database |

---

**Status**: Both servers must be running for the application to work
**Next**: After starting servers, run `npm run fix-admin` and `npm run add-testimonials`
