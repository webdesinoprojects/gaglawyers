# ⚠️ IMMEDIATE ACTION REQUIRED

## Your Backend Server Is Not Running!

The error `ERR_CONNECTION_REFUSED` means your backend server at `http://localhost:5000` is **NOT running**.

## Fix It Now (30 seconds)

### Step 1: Open a Terminal
Open a new terminal/command prompt window.

### Step 2: Start Backend Server
```bash
cd backend
npm run dev
```

**Wait for this message:**
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

### Step 3: Keep It Running
**DO NOT CLOSE THIS TERMINAL!** The backend must stay running.

### Step 4: Verify It's Working
Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{"success": true, "message": "API is running"}
```

## If Backend Won't Start

### Error: "Cannot find module"
```bash
cd backend
npm install
npm run dev
```

### Error: "Port 5000 already in use"
```bash
# Windows - Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Then try again
npm run dev
```

### Error: "MongoDB connection failed"
Check `backend/.env` has your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://your-connection-string
```

## After Backend Starts

1. **Keep the backend terminal running**
2. **Refresh your admin panel** (http://localhost:5173/admin/reviews)
3. **The errors should disappear**

## Then Fix the Auth Issue

Once backend is running, fix the admin user:

```bash
# Open ANOTHER terminal (keep backend running)
cd backend
npm run fix-admin
```

Then logout and login again in the admin panel.

## Summary

You need **2 terminals running simultaneously**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Keep running ✓
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Keep running ✓
```

Both must be running for the application to work!

---

**Current Problem**: Backend not running → `ERR_CONNECTION_REFUSED`
**Solution**: Start backend with `npm run dev`
**Time to Fix**: 30 seconds
