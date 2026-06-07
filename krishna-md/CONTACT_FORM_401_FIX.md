# Contact Form 401 Unauthorized - Fix Guide

## Problem
Contact form submissions are being saved to the database, but the admin panel shows "Failed to load submissions: HTTP 401: Unauthorized" when trying to view them.

## Root Cause
The authentication token stored in your browser's localStorage is either:
- Expired
- Invalid
- From an old session

## Solution: Re-login to Get Fresh Token

### Step 1: Clear Old Session
1. Open browser DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "Local Storage" → `http://localhost:5173`
4. Delete these keys:
   - `adminToken`
   - `adminUser`
5. Close DevTools

### Step 2: Login Again
1. Go to: `http://localhost:5173/admin/login`
2. Enter your admin credentials:
   - Email: `admin@gaglawyers.com` (or your admin email)
   - Password: Your admin password
3. Click "Sign In"

### Step 3: Verify It Works
1. After successful login, go to: `http://localhost:5173/admin/contacts`
2. You should now see all contact form submissions
3. The 401 error should be gone

## Why This Happens
- JWT tokens have an expiration time
- When you make changes to the backend auth system, old tokens become invalid
- The frontend automatically detects 401 errors and redirects to login

## Verification Checklist
✅ Backend is running on port 5000
✅ MongoDB is connected
✅ Contact form submissions are being saved (you confirmed this)
✅ Auth middleware is working correctly
✅ Routes are protected with `protect` and `adminOnly`

The only issue is the token - a fresh login will fix it!

## Technical Details (For Reference)

### Backend Auth Flow
```javascript
// Route protection in backend/routes/contactRoutes.js
router.get('/', protect, adminOnly, getAllContactInquiries);
```

### Frontend Token Usage
```javascript
// Token is sent in Authorization header
const token = localStorage.getItem('adminToken');
headers: { 
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Auth Middleware Checks
1. Verifies Bearer token exists
2. Decodes JWT token
3. Finds user in database
4. Checks if user is active
5. Checks if user has admin role

All these checks are working - you just need a fresh token!
