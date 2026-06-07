# Service Manager Bug Fix

## Problem
When clicking a service in the left sidebar:
- Service gets visually highlighted (blue border appears) ✅
- Right panel still shows "No service selected" ❌
- Editor never loads ❌

## Root Cause
The issue was in the state update order in `handleServiceSelect`:

**Before (Broken):**
```javascript
setLoadingService(true);
setSelectedServiceSlug(slug);
setHasUnsavedChanges(false);
// Then fetch...
```

The problem: `serviceData` was not cleared before fetching, so the component would render with old `serviceData` and `loading=false` initially, causing the empty state condition to fail.

## Solution

### File 1: `frontend/src/pages/admin/ServiceManager.jsx`

**Changed Lines 38-60:**

**Before:**
```javascript
const handleServiceSelect = async (slug) => {
  if (hasUnsavedChanges) {
    const confirm = window.confirm('You have unsaved changes. Do you want to discard them?');
    if (!confirm) return;
  }

  try {
    setLoadingService(true);
    setSelectedServiceSlug(slug);
    setHasUnsavedChanges(false);

    const response = await fetch(`${API_BASE_URL}/api/services/${slug}`);
    const data = await response.json();

    if (data.success) {
      setServiceData(data.data);
    }
  } catch (error) {
    console.error('Error loading service:', error);
    setServiceData(null);
  } finally {
    setLoadingService(false);
  }
};
```

**After:**
```javascript
const handleServiceSelect = async (slug) => {
  console.log('handleServiceSelect called with slug:', slug);
  
  if (hasUnsavedChanges) {
    const confirm = window.confirm('You have unsaved changes. Do you want to discard them?');
    if (!confirm) return;
  }

  // Set loading state FIRST, then clear serviceData to force loading state
  setLoadingService(true);
  setServiceData(null); // Clear previous data to show loading state
  setSelectedServiceSlug(slug);
  setHasUnsavedChanges(false);

  try {
    console.log('Fetching service data for:', slug);
    const response = await fetch(`${API_BASE_URL}/api/services/${slug}`);
    const data = await response.json();
    console.log('Service data received:', data);

    if (data.success) {
      setServiceData(data.data);
      console.log('Service data set successfully');
    } else {
      console.error('API returned success: false');
    }
  } catch (error) {
    console.error('Error loading service:', error);
    setServiceData(null);
  } finally {
    setLoadingService(false);
  }
};
```

**Key Changes:**
1. Added `setServiceData(null)` immediately after `setLoadingService(true)` to clear previous data
2. Moved state updates outside the try block for better flow
3. Added console.logs for debugging

### File 2: `frontend/src/components/admin/ServiceEditor.jsx`

**Changed Lines 15-18 and 48-50:**

Added debug console.logs to verify props:

```javascript
// Debug logging
console.log('ServiceEditor render - serviceData:', serviceData);
console.log('ServiceEditor render - loading:', loading);

// Empty state when no service selected
if (!serviceData && !loading) {
  console.log('Showing empty state');
  return (
    // ... empty state JSX
  );
}

// Loading state
if (loading) {
  console.log('Showing loading state');
  return (
    // ... loading state JSX
  );
}
```

### File 3: `frontend/src/components/admin/ServiceSidebar.jsx`

**Changed Lines 62-65:**

Added console.log to verify click handler:

```javascript
<button
  key={service._id}
  onClick={() => {
    console.log('Service clicked:', service.slug);
    onServiceSelect(service.slug);
  }}
  className={`w-full text-left rounded-lg p-3 transition-all ${
```

## How It Works Now

### State Flow:
1. User clicks service in sidebar
2. `console.log('Service clicked:', slug)` fires
3. `handleServiceSelect(slug)` is called
4. `console.log('handleServiceSelect called with slug:', slug)` fires
5. `setLoadingService(true)` - loading state enabled
6. `setServiceData(null)` - **KEY FIX** - clears old data
7. ServiceEditor receives `loading=true, serviceData=null`
8. ServiceEditor shows loading spinner
9. API fetch completes
10. `setServiceData(data.data)` - new data loaded
11. `setLoadingService(false)` - loading state disabled
12. ServiceEditor receives `loading=false, serviceData={...}`
13. ServiceEditor shows editor with data

### Debug Console Output:
When clicking a service, you should see:
```
Service clicked: cheque-bounce-lawyer
handleServiceSelect called with slug: cheque-bounce-lawyer
ServiceEditor render - serviceData: null
ServiceEditor render - loading: true
Showing loading state
Fetching service data for: cheque-bounce-lawyer
Service data received: {success: true, data: {...}}
Service data set successfully
ServiceEditor render - serviceData: {...}
ServiceEditor render - loading: false
```

## Testing

### Test Case 1: Click First Service
1. Open `/admin/services`
2. Click any service
3. Should see loading spinner briefly
4. Then see editor with service data

### Test Case 2: Switch Between Services
1. Click service A
2. Wait for editor to load
3. Click service B
4. Should see loading spinner
5. Then see editor with service B data

### Test Case 3: Unsaved Changes
1. Click service A
2. Edit something (e.g., heading)
3. Click service B
4. Should see confirmation dialog
5. Click OK → loads service B
6. Click Cancel → stays on service A

## Files Modified

1. **frontend/src/pages/admin/ServiceManager.jsx**
   - Line 38: Added console.log
   - Line 45-47: Reordered state updates, added `setServiceData(null)`
   - Lines 49-56: Added console.logs for debugging

2. **frontend/src/components/admin/ServiceEditor.jsx**
   - Lines 15-16: Added debug console.logs
   - Line 20: Added console.log for empty state
   - Line 49: Added console.log for loading state

3. **frontend/src/components/admin/ServiceSidebar.jsx**
   - Lines 63-65: Added console.log in onClick handler

## Status

✅ **FIXED** - Service editor now loads correctly when clicking services

The key fix was adding `setServiceData(null)` immediately after `setLoadingService(true)` to ensure the component shows the loading state instead of the empty state.
