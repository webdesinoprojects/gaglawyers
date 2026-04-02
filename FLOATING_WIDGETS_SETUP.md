# Floating Widgets Setup Guide

## 🚀 Quick Fix - Run This Script

The floating widgets need the `phoneNumber` setting in the database. Run this script to add it:

```bash
cd backend
node add-phone-setting.js
```

This will:
- ✅ Add `phoneNumber` setting if missing
- ✅ Add `email` setting if missing
- ✅ Add `address` setting if missing
- ✅ Display all current settings

## 📋 What Was Fixed

### 1. Missing Database Settings
**Problem**: The `phoneNumber` setting wasn't in the database, causing the phone widget to not appear.

**Solution**: 
- Added `phoneNumber`, `email`, and `address` to seed.js
- Created `add-phone-setting.js` script to add missing settings
- Updated settingsController.js with default values

### 2. Admin Panel Visibility
**Problem**: Widgets were showing in admin panel.

**Solution**: Added route detection to hide widgets when path starts with `/admin`

### 3. Widget Positioning
**Problem**: All widgets were stacked in bottom-right corner.

**Solution**: Spread widgets across the page:
- WhatsApp → Bottom Right (green, 64px)
- Phone → Bottom Left (navy, 64px)
- Chat → Top Right (gold, 56px)

## 🎯 How It Works

### Widget Display Logic
```javascript
// FloatingWidgets.jsx
const isAdminPanel = location.pathname.startsWith('/admin');

// Don't render if:
// 1. In admin panel
// 2. WhatsApp disabled AND no phone number
if (isAdminPanel || (!settings.whatsappEnabled && !settings.phoneNumber)) {
  return null;
}
```

### Settings Fetch
```javascript
// Fetches from API
fetch(`${API_BASE_URL}/api/settings/whatsappEnabled`)
fetch(`${API_BASE_URL}/api/settings/whatsappNumber`)
fetch(`${API_BASE_URL}/api/settings/phoneNumber`)
```

### Backend Default Values
If settings don't exist in database, controller returns defaults:
```javascript
{
  whatsappEnabled: true,
  whatsappNumber: '+919876543210',
  phoneNumber: '+919876543210',
  email: 'contact@gaglawyers.com',
  address: '123 Lawyers Colony, Connaught Place, New Delhi - 110001'
}
```

## 🔧 Configuration

### Enable/Disable Widgets

1. Go to `/admin/settings`
2. Under "WhatsApp Integration":
   - Toggle "Enable WhatsApp Widget"
   - Enter WhatsApp number (with country code)
3. Under "Contact Information":
   - Enter Phone Number
   - Enter Email
   - Enter Address
4. Click "Save Settings"

### Widget Behavior

| Setting | Widget Affected | Behavior |
|---------|----------------|----------|
| `whatsappEnabled: true` | WhatsApp Button | Shows bottom-right |
| `whatsappEnabled: false` | WhatsApp Button | Hidden |
| `phoneNumber: "..."` | Phone Button | Shows bottom-left |
| `phoneNumber: ""` | Phone Button | Hidden |
| Chat Widget | Always shows | If WhatsApp or Phone enabled |

## 📍 Widget Positions

```
┌─────────────────────────────────────┐
│ Navbar                              │
│                          [Chat] 💬  │ ← Top Right (gold)
│                                     │
│                                     │
│         Page Content                │
│                                     │
│                                     │
│ 📞                         💬       │ ← Bottom corners
│ [Phone]              [WhatsApp]     │
└─────────────────────────────────────┘
  Bottom Left          Bottom Right
  (navy)               (green)
```

## 🎨 Widget Features

### WhatsApp Button (Bottom Right)
- Green background (#25D366)
- Opens WhatsApp with pre-filled message
- Pulse animation
- Tooltip: "Chat on WhatsApp"
- Size: 64px × 64px

### Phone Button (Bottom Left)
- Navy background
- Initiates phone call
- Pulse animation
- Tooltip: Shows phone number
- Size: 64px × 64px

### Chat Widget (Top Right)
- Gold background
- Opens chat popup below button
- Red notification badge
- Tooltip: "Live Chat"
- Size: 56px × 56px

### Chat Popup
- Opens below chat button (top-right)
- Width: 320px (mobile), 384px (desktop)
- Quick actions:
  - Continue on WhatsApp
  - Call Us Now
  - Send Email (links to /contact)
- Business hours display
- Slide-up animation

## 🧪 Testing

### Test WhatsApp Widget
1. Enable in `/admin/settings`
2. Visit any public page
3. Look at bottom-right corner
4. Click button → Should open WhatsApp

### Test Phone Widget
1. Add phone number in `/admin/settings`
2. Visit any public page
3. Look at bottom-left corner
4. Click button → Should initiate call

### Test Chat Widget
1. Visit any public page
2. Look at top-right (below navbar)
3. Click button → Chat popup opens
4. Try quick action buttons

### Test Admin Panel
1. Go to `/admin/dashboard`
2. Widgets should NOT appear
3. Navigate to any admin page
4. Widgets should remain hidden

## 🐛 Troubleshooting

### Widgets Not Appearing

**Check 1: Database Settings**
```bash
cd backend
node add-phone-setting.js
```

**Check 2: Settings in Admin Panel**
- Go to `/admin/settings`
- Verify "Enable WhatsApp Widget" is checked
- Verify phone number is entered
- Click "Save Settings"

**Check 3: Browser Console**
- Open DevTools (F12)
- Check Console for errors
- Look for failed API calls to `/api/settings/*`

**Check 4: API Response**
- Open DevTools → Network tab
- Visit a public page
- Look for calls to `/api/settings/whatsappEnabled`
- Check response: `{ success: true, data: { settingValue: true } }`

### Widgets Showing in Admin Panel

**Check**: FloatingWidgets.jsx should have:
```javascript
const isAdminPanel = location.pathname.startsWith('/admin');
if (isAdminPanel || ...) return null;
```

### WhatsApp Not Opening

**Check**: WhatsApp number format
- Must include country code
- Example: `+919876543210`
- No spaces or special characters

### Phone Call Not Working

**Check**: Phone number format
- Can include spaces and dashes
- Example: `+91 98765 43210`
- Browser will handle formatting

## 📝 Files Modified

### Backend
- `backend/controllers/settingsController.js` - Added default values
- `backend/seed.js` - Added phoneNumber, email, address settings
- `backend/add-phone-setting.js` - NEW script to add missing settings

### Frontend
- `frontend/src/components/FloatingWidgets.jsx` - Main widget component
- `frontend/src/App.jsx` - Added FloatingWidgets to Router
- `frontend/src/pages/admin/SiteSettings.jsx` - Improved success message

## 🎯 Next Steps

1. **Run the setup script**:
   ```bash
   cd backend
   node add-phone-setting.js
   ```

2. **Configure in admin panel**:
   - Go to `/admin/settings`
   - Enable WhatsApp widget
   - Enter your actual phone numbers
   - Save settings

3. **Test on frontend**:
   - Visit any public page
   - Verify all 3 widgets appear
   - Test each widget functionality

4. **Customize** (optional):
   - Update phone numbers to real ones
   - Customize WhatsApp message
   - Adjust widget positions if needed

## ✅ Success Checklist

- [ ] Ran `node add-phone-setting.js`
- [ ] Settings saved in admin panel
- [ ] WhatsApp widget appears (bottom-right)
- [ ] Phone widget appears (bottom-left)
- [ ] Chat widget appears (top-right)
- [ ] Widgets hidden in admin panel
- [ ] WhatsApp opens correctly
- [ ] Phone call initiates
- [ ] Chat popup works
- [ ] All animations smooth
