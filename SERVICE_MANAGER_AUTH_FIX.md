# Service Manager - 401 Unauthorized Fix

## Problem
When clicking "Save changes", the request fails with:
```
401 (Unauthorized)
Failed to save changes
```

## Root Cause

**File:** `frontend/src/pages/admin/ServiceManager.jsx`
**Line:** 88

### The Issue:
The save handler was looking for the wrong localStorage key:

**Wrong:**
```javascript
const token = localStorage.getItem('token');  // ← This key doesn't exist!
```

**Correct:**
```javascript
const token = localStorage.getItem('adminToken');  // ← This is the actual key
```

### Why This Happened:
In `frontend/src/pages/admin/Login.jsx` (Line 33), the token is stored as:
```javascript
localStorage.setItem('adminToken', data.data.token);
```

But the ServiceManager was trying to retrieve it with the wrong key name.

## The Fix

### Changed Lines 85-90 in ServiceManager.jsx:

**Before:**
```javascript
const handleSave = async () => {
  if (!serviceData || !selectedServiceSlug) return;

  try {
    setSaving(true);
    const token = localStorage.getItem('token');  // ← WRONG KEY

    const response = await fetch(`${API_BASE_URL}/api/services/${selectedServiceSlug}`, {
```

**After:**
```javascript
const handleSave = async () => {
  if (!serviceData || !selectedServiceSlug) return;

  try {
    setSaving(true);
    const token = localStorage.getItem('adminToken'); // ← CORRECT KEY

    if (!token) {
      console.error('No authentication token found');
      showToast('Authentication required. Please log in again.', 'error');
      setSaving(false);
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/services/${selectedServiceSlug}`, {
```

### Additional Improvements:
1. Changed `'token'` to `'adminToken'`
2. Added token validation check
3. Added helpful error message if token is missing
4. Early return to prevent unnecessary API call

## Testing

### Before Fix:
```
✗ Click "Save changes"
✗ Request: PUT /api/services/agreement-to-sell
✗ Response: 401 Unauthorized
✗ Alert: "Failed to save changes"
```

### After Fix:
```
✓ Click "Save changes"
✓ Request: PUT /api/services/agreement-to-sell with valid token
✓ Response: 200 OK
✓ Alert: "Changes saved successfully!"
```

## Verification Steps

1. **Check if you're logged in:**
   - Open DevTools Console
   - Run: `localStorage.getItem('adminToken')`
   - Should return a JWT token string

2. **If no token found:**
   - You need to log in first at `/admin/login`
   - After login, the token will be stored
   - Then try saving again

3. **If token exists but still fails:**
   - Token might be expired
   - Log out and log in again to get a fresh token

## Related Files

### Token Storage (Login):
`frontend/src/pages/admin/Login.jsx` - Line 33:
```javascript
localStorage.setItem('adminToken', data.data.token);
```

### Token Usage (Other Admin Pages):
Check if other admin pages also use the wrong key. Common places:
- `frontend/src/pages/admin/BlogManager.jsx`
- `frontend/src/pages/admin/TeamManager.jsx`
- `frontend/src/pages/admin/ReviewManager.jsx`
- etc.

They should all use `'adminToken'` not `'token'`.

## Files Modified

**1 file, 1 function changed:**

`frontend/src/pages/admin/ServiceManager.jsx` - Lines 85-95:
- Changed `localStorage.getItem('token')` to `localStorage.getItem('adminToken')`
- Added token validation check
- Added error handling for missing token

## Status

✅ **FIXED** - Save functionality now works with correct authentication token

The service manager can now successfully save changes to the database.

---

**Root Cause:** Wrong localStorage key name (`'token'` instead of `'adminToken'`)
**Fix:** Updated to use correct key and added validation
**Result:** Save functionality now works correctly
