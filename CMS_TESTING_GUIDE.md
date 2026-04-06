# CMS TESTING GUIDE

## Quick Testing Checklist

### 1. Backend Testing

#### Verify Database Collections
```bash
# Connect to MongoDB and verify collections exist
use your_database_name

# Check reusable blocks
db.reusableblocks.find().count()  # Should return 9

# Check page blocks
db.pageblocks.find().count()  # Should return 4

# Check navigation menus
db.navigationmenus.find().count()  # Should return 4

# Check form contents
db.formcontents.find().count()  # Should return 2

# Check global settings
db.globalsettings.find().count()  # Should return 1
```

#### Test API Endpoints
```bash
# Test reusable blocks endpoint
curl http://localhost:5000/api/cms/reusable-blocks

# Test page blocks endpoint
curl http://localhost:5000/api/cms/page-blocks/home

# Test navigation endpoint
curl http://localhost:5000/api/cms/navigation/header

# Test forms endpoint
curl http://localhost:5000/api/cms/forms/contact

# Test global settings endpoint
curl http://localhost:5000/api/cms/global-settings
```

### 2. Admin Panel Testing

#### Login
1. Navigate to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Verify redirect to dashboard

#### Block Manager (`/admin/blocks`)
- [ ] Can view all blocks
- [ ] Can create new block
- [ ] Can edit existing block
- [ ] Can delete block
- [ ] Can filter blocks by type
- [ ] JSON editor works correctly

#### Page Block Assignment Manager (`/admin/page-blocks`)
- [ ] Can select different pages
- [ ] Can view current page blocks
- [ ] Can add block to page
- [ ] Can remove block from page
- [ ] Can reorder blocks (up/down)
- [ ] Can toggle block visibility

#### Navigation Manager (`/admin/navigation`)
- [ ] Can select different menu locations
- [ ] Can view menu items
- [ ] Can add new menu item
- [ ] Can edit menu item
- [ ] Can remove menu item
- [ ] Can toggle item visibility
- [ ] Can set "open in new tab"

#### Form Content Manager (`/admin/forms`)
- [ ] Can select different forms
- [ ] Can view form configuration
- [ ] Can edit form title and description
- [ ] Can add new field
- [ ] Can edit field properties
- [ ] Can remove field
- [ ] Can toggle field visibility
- [ ] Can set field as required

### 3. Frontend Testing

#### Homepage (`/`)
- [ ] Hero section renders from CMS
- [ ] Stats bar renders from CMS
- [ ] "Why Choose Us" section renders from CMS
- [ ] "How We Work" section renders from CMS
- [ ] Appointment form renders from CMS
- [ ] Services grid loads
- [ ] Team section loads
- [ ] Blog section loads
- [ ] Navigation menu renders from CMS
- [ ] Footer renders from CMS

#### About Page (`/about`)
- [ ] Hero section renders
- [ ] Values section renders from CMS
- [ ] Practice areas render from CMS
- [ ] "Why Choose Us" renders from CMS
- [ ] Founder section displays
- [ ] Closing statement displays
- [ ] Navigation and footer render

#### Services Page (`/services`)
- [ ] Hero section renders
- [ ] Services list loads
- [ ] FAQ section renders from CMS
- [ ] CTA section renders
- [ ] Navigation and footer render

#### Contact Page (`/contact`)
- [ ] Hero section renders
- [ ] Contact info renders from CMS
- [ ] Contact form renders from CMS
- [ ] Form fields match CMS configuration
- [ ] Form submission works
- [ ] Navigation and footer render

### 4. Content Update Testing

#### Test Block Update
1. Go to `/admin/blocks`
2. Edit "Home Hero Section" block
3. Change heading text
4. Save
5. Visit homepage
6. Verify heading changed

#### Test Navigation Update
1. Go to `/admin/navigation`
2. Select "Main Navigation"
3. Add new menu item
4. Save
5. Visit any page
6. Verify new menu item appears

#### Test Form Update
1. Go to `/admin/forms`
2. Select "Contact Form"
3. Change submit button text
4. Save
5. Visit contact page
6. Verify button text changed

#### Test Block Visibility
1. Go to `/admin/page-blocks`
2. Select "Home Page"
3. Toggle visibility of a block
4. Visit homepage
5. Verify block shows/hides

#### Test Block Ordering
1. Go to `/admin/page-blocks`
2. Select "Home Page"
3. Move a block up or down
4. Visit homepage
5. Verify block order changed

### 5. Form Submission Testing

#### Contact Form
1. Visit `/contact`
2. Fill out contact form
3. Submit
4. Verify success message displays
5. Check admin panel for submission

#### Appointment Form
1. Visit homepage
2. Scroll to appointment section
3. Fill out appointment form
4. Submit
5. Verify success message displays
6. Check admin panel for submission

### 6. Responsive Testing

#### Mobile View
- [ ] Homepage renders correctly on mobile
- [ ] Navigation menu works on mobile
- [ ] Forms work on mobile
- [ ] All pages responsive

#### Tablet View
- [ ] Homepage renders correctly on tablet
- [ ] Navigation menu works on tablet
- [ ] Forms work on tablet
- [ ] All pages responsive

### 7. Browser Testing

Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 8. Performance Testing

#### Page Load Times
- [ ] Homepage loads in <3 seconds
- [ ] About page loads in <3 seconds
- [ ] Services page loads in <3 seconds
- [ ] Contact page loads in <3 seconds

#### API Response Times
- [ ] Block fetch <100ms
- [ ] Navigation fetch <100ms
- [ ] Form config fetch <100ms

### 9. Error Handling Testing

#### Test Invalid Data
1. Try to create block with invalid JSON
2. Verify error message displays
3. Try to submit form with missing required fields
4. Verify validation works

#### Test Network Errors
1. Disconnect from network
2. Try to load page
3. Verify graceful error handling

### 10. Security Testing

#### Test Authentication
1. Try to access admin panel without login
2. Verify redirect to login page
3. Try to access admin API without token
4. Verify 401 error

#### Test Authorization
1. Login as non-admin user (if applicable)
2. Try to access admin panel
3. Verify access denied

---

## Common Issues and Solutions

### Issue: Blocks not rendering
**Solution**: 
- Check if seed script ran successfully
- Verify page blocks are assigned
- Check if blocks are marked as visible
- Check browser console for errors

### Issue: Navigation not updating
**Solution**:
- Check if menu is marked as active
- Check if menu items are marked as visible
- Clear browser cache
- Check API response

### Issue: Forms not working
**Solution**:
- Check if form is marked as active
- Check if form fields are configured
- Check API endpoint
- Check form submission handler

### Issue: Admin panel not accessible
**Solution**:
- Check authentication token
- Check user role
- Check backend logs
- Verify JWT secret

---

## Testing Commands

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Run Seed Script
```bash
cd backend
node seed-cms-content.js
```

### Check Backend Logs
```bash
cd backend
npm start
# Watch console for errors
```

### Check Frontend Console
```
Open browser DevTools
Check Console tab for errors
Check Network tab for failed requests
```

---

## Success Criteria

✅ All admin panels accessible  
✅ All CRUD operations work  
✅ All frontend pages render dynamically  
✅ All content updates reflect immediately  
✅ All forms work correctly  
✅ No console errors  
✅ Mobile responsive  
✅ Cross-browser compatible  
✅ Performance meets requirements  

---

## Next Steps After Testing

1. Fix any issues found during testing
2. Deploy to staging environment
3. Perform UAT (User Acceptance Testing)
4. Deploy to production
5. Monitor for errors
6. Train admin users on CMS

