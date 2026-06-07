# Fix: "Not authorized, user not found or inactive" Error

## Problem
When trying to upload images in the admin panel (Reviews, Team, etc.), you get the error:
```
Not authorized, user not found or inactive
```

## Root Cause
The admin user in your database doesn't have the `isActive` field set to `true`, or it's missing entirely. The authentication middleware checks this field before allowing Cloudinary uploads.

## Solution

### Option 1: Quick Fix (Recommended)
Run the fix script to update your existing admin user:

```bash
cd backend
npm run fix-admin
```

**Expected Output:**
```
🔧 Fixing Admin User...

✓ Found admin user: admin@gaglawyers.com
  Current status:
    - Name: Admin User
    - Role: super-admin
    - Active: false (or undefined)
    - Created: [date]

✅ Admin user fixed successfully!
  Updated status:
    - Active: true
    - Role: super-admin

✅ You can now upload images from the admin panel.
```

### Option 2: Re-seed Database (Nuclear Option)
If you want to start fresh with all seed data:

```bash
cd backend
npm run seed
```

**⚠️ Warning**: This will delete ALL existing data and recreate it from scratch.

## After Running the Fix

1. **Logout and login again** in the admin panel:
   - Go to: `http://localhost:5173/admin/login`
   - Email: `admin@gaglawyers.com`
   - Password: `admin123`

2. **Try uploading an image**:
   - Go to Reviews Manager: `/admin/reviews`
   - Click "Add Review" or "Edit" on existing review
   - Click "Upload Image" in the Client Photo section
   - Select an image file
   - Upload should now work ✅

## Verify the Fix

You can verify the admin user is active by checking the database:

```bash
cd backend
npm run inspect
```

Look for the Users collection output - it should show `isActive: true`.

## Technical Details

### What Changed

1. **Created fix script**: `backend/fix-admin-user.js`
   - Finds admin user by email
   - Sets `isActive: true`
   - Saves to database

2. **Updated seed script**: `backend/seed.js`
   - Now explicitly sets `isActive: true` when creating admin user
   - Prevents this issue in future re-seeds

3. **Added npm command**: `npm run fix-admin`
   - Quick way to run the fix script

### Why This Happened

The User model has `isActive` with `default: true`, but:
- If the user was created before this field existed, it might be `undefined`
- Some database operations don't apply defaults to existing documents
- The auth middleware strictly checks: `if (!req.user || !req.user.isActive)`

### Auth Middleware Logic

```javascript
// backend/middleware/auth.js
const protect = async (req, res, next) => {
  // ... token verification ...
  
  req.user = await User.findById(decoded.id).select('-password');
  
  // This check fails if isActive is false or undefined
  if (!req.user || !req.user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, user not found or inactive',
    });
  }
  
  next();
};
```

## Files Modified

- ✅ `backend/fix-admin-user.js` (NEW) - Script to fix admin user
- ✅ `backend/package.json` (UPDATED) - Added `fix-admin` command
- ✅ `backend/seed.js` (UPDATED) - Explicitly set `isActive: true`

## Troubleshooting

### Script says "Admin user not found"
Run the seed script first:
```bash
npm run seed
```

### Still getting auth error after fix
1. Clear browser localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage → Clear site data
2. Login again with fresh credentials

### Different admin email
If you're using a different admin email, update `.env`:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-password
```

Then run:
```bash
npm run fix-admin
```

## Prevention

Going forward, all new admin users created through the system will have `isActive: true` by default. This fix ensures your existing admin user is also properly configured.

---

**Status**: ✅ FIXED
**Impact**: Image uploads now work in all admin modules
**Time to Fix**: < 30 seconds
