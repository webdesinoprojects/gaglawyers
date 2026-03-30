# ✅ Startup Checklist

## Before You Start

- [ ] MongoDB Atlas connection string in `backend/.env`
- [ ] Cloudinary credentials in `backend/.env`
- [ ] Dependencies installed (`npm install` in both folders)

## Every Time You Work on the Project

### 1. Start Backend Server ⚡

```bash
cd backend
npm run dev
```

**Wait for:**
```
✓ MongoDB Connected
✓ Server running on port 5000
```

**Status:** [ ] Backend Running

---

### 2. Start Frontend Server 🎨

```bash
cd frontend
npm run dev
```

**Wait for:**
```
✓ Local: http://localhost:5173/
```

**Status:** [ ] Frontend Running

---

### 3. Verify Backend Connection 🔍

Open browser: http://localhost:5000/api/health

**Expected:**
```json
{"success": true, "message": "API is running"}
```

**Status:** [ ] Backend Responding

---

### 4. Access Admin Panel 🔐

Open browser: http://localhost:5173/admin/login

**Credentials:**
- Email: `admin@gaglawyers.com`
- Password: `admin123`

**Status:** [ ] Logged In

---

## One-Time Setup (If Not Done)

### Fix Admin User (For Image Uploads)

```bash
cd backend
npm run fix-admin
```

**Status:** [ ] Admin User Fixed

---

### Add Testimonials

```bash
cd backend
npm run add-testimonials
```

**Status:** [ ] Testimonials Added

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `ERR_CONNECTION_REFUSED` | Backend not running → `cd backend && npm run dev` |
| `401 Unauthorized` on upload | Run `npm run fix-admin` then re-login |
| Port 5000 in use | Kill process: `netstat -ano \| findstr :5000` |
| MongoDB connection failed | Check `backend/.env` has correct URI |
| Reviews not showing | Run `npm run add-testimonials` |

---

## Current Status Check

Run these commands to verify everything:

```bash
# Check backend
curl http://localhost:5000/api/health

# Check if admin user is active
cd backend && npm run inspect

# Check reviews in database
cd backend && node -e "require('./config/db')().then(() => require('./models/Review').countDocuments().then(c => console.log('Reviews:', c)))"
```

---

## Development Workflow

1. **Morning:** Start both servers (backend + frontend)
2. **Work:** Make changes (servers auto-reload)
3. **Evening:** Stop servers (Ctrl+C in both terminals)

**Remember:** Both servers must run simultaneously!

---

## Visual Status Indicator

```
┌─────────────────────────────────────┐
│  GAG Lawyers Development Status     │
├─────────────────────────────────────┤
│  [ ] Backend (Port 5000)            │
│  [ ] Frontend (Port 5173)           │
│  [ ] MongoDB Connected              │
│  [ ] Admin User Active              │
│  [ ] Testimonials Loaded            │
└─────────────────────────────────────┘
```

Check all boxes before starting development!
