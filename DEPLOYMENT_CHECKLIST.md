# CMS DEPLOYMENT CHECKLIST

## PRE-DEPLOYMENT STEPS

### 1. Database Setup
- [ ] Run seed script: `cd backend && node seed-cms-content.js`
- [ ] Verify collections created:
  - [ ] `reusableblocks` (should have ~10 documents)
  - [ ] `pageblocks` (should have 4 documents)
  - [ ] `navigationmenus` (should have 4 documents)
  - [ ] `formcontents` (should have 2 documents)
  - [ ] `globalsettings` (should have 1 document)

### 2. Backend Verification
- [ ] All new routes registered in `server.js`
- [ ] All controllers created and functional
- [ ] All models created with proper schemas
- [ ] Authentication middleware working
- [ ] CORS configured correctly

### 3. Frontend Verification
- [ ] All dynamic pages created (HomeDynamic, AboutDynamic, ServicesDynamic, ContactDynamic)
- [ ] All block components created (10 components)
- [ ] BlockRenderer working correctly
- [ ] DynamicNavbar rendering from CMS
- [ ] DynamicFooter rendering from CMS
- [ ] DynamicForm rendering from CMS
- [ ] App.jsx routes updated
- [ ] Layout.jsx using dynamic components
- [ ] AdminLayout.jsx menu items updated

### 4. Admin Panel Testing
- [ ] Login to `/admin/login`
- [ ] Access BlockManager (`/admin/blocks`)
- [ ] Access PageBlockAssignmentManager (`/admin/page-blocks`)
- [ ] Access NavigationManager (`/admin/navigation`)
- [ ] Access FormContentManager (`/admin/forms`)
- [ ] Test creating a new block
- [ ] Test editing an existing block
- [ ] Test assigning block to page
- [ ] Test reordering blocks
- [ ] Test toggling block visibility
- [ ] Test updating navigation menu
- [ ] Test updating form configuration

### 5. Frontend Testing
- [ ] Visit homepage (`/`)
  - [ ] Hero section renders from CMS
  - [ ] Stats bar renders from CMS
  - [ ] "Why Choose Us" renders from CMS
  - [ ] "How We Work" renders from CMS
  - [ ] Services grid loads
  - [ ] Team section loads
  - [ ] Blog section loads
- [ ] Visit about page (`/about`)
  - [ ] Values section renders from CMS
  - [ ] Practice areas render from CMS
  - [ ] "Why Choose Us" renders from CMS
- [ ] Visit services page (`/services`)
  - [ ] Services list loads
  - [ ] FAQ section renders from CMS
- [ ] Visit contact page (`/contact`)
  - [ ] Contact info renders from CMS
  - [ ] Form renders from CMS with correct labels
  - [ ] Form submission works
- [ ] Check navigation
  - [ ] Header menu renders from CMS
  - [ ] All links work
- [ ] Check footer
  - [ ] Footer menus render from CMS
  - [ ] Contact info displays
  - [ ] Social media links display (if configured)
  - [ ] Copyright text displays

### 6. Content Update Testing
- [ ] Edit a block in admin
- [ ] Verify change appears on frontend immediately
- [ ] Edit navigation menu
- [ ] Verify menu updates on frontend
- [ ] Edit form configuration
- [ ] Verify form updates on frontend
- [ ] Toggle block visibility
- [ ] Verify block hides/shows on frontend

### 7. Performance Testing
- [ ] Check page load times (<3 seconds)
- [ ] Check API response times (<200ms)
- [ ] Check for console errors
- [ ] Check for network errors
- [ ] Test on mobile devices
- [ ] Test on different browsers

### 8. Security Testing
- [ ] Verify admin routes require authentication
- [ ] Verify non-admin users cannot access admin panel
- [ ] Verify CMS write operations require admin role
- [ ] Verify public can view published content
- [ ] Test logout functionality

## DEPLOYMENT STEPS

### 1. Environment Variables
Set the following in production:
```
# Backend
NODE_ENV=production
MONGO_URI=<production_mongodb_uri>
JWT_SECRET=<strong_random_secret>
CLOUDINARY_CLOUD_NAME=<production_cloudinary>
CLOUDINARY_API_KEY=<production_key>
CLOUDINARY_API_SECRET=<production_secret>
SITE_URL=https://yourdomain.com

# Frontend
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 2. Build Frontend
```bash
cd frontend
npm run build
```

### 3. Deploy Backend
- [ ] Deploy to hosting service (Railway, Render, Heroku, etc.)
- [ ] Verify MongoDB connection
- [ ] Run seed script on production database
- [ ] Test API endpoints

### 4. Deploy Frontend
- [ ] Deploy to hosting service (Vercel, Netlify, etc.)
- [ ] Verify API connection
- [ ] Test all pages

### 5. Post-Deployment
- [ ] Create admin user (if not seeded)
- [ ] Login to admin panel
- [ ] Verify all CMS features work
- [ ] Update content as needed
- [ ] Monitor for errors

## POST-DEPLOYMENT VERIFICATION

### Admin Panel
- [ ] All managers accessible
- [ ] All CRUD operations work
- [ ] Image uploads work (if applicable)
- [ ] Search functionality works
- [ ] Logout works

### Frontend
- [ ] All pages load correctly
- [ ] All dynamic content displays
- [ ] All forms work
- [ ] All navigation works
- [ ] All images load
- [ ] No console errors
- [ ] No 404 errors

### SEO
- [ ] Meta tags present on all pages
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Social sharing works

## MAINTENANCE TASKS

### Daily
- [ ] Monitor error logs
- [ ] Check form submissions

### Weekly
- [ ] Review content updates
- [ ] Check performance metrics
- [ ] Backup database

### Monthly
- [ ] Review and optimize database
- [ ] Update dependencies
- [ ] Review security

## TROUBLESHOOTING

### Issue: Blocks not rendering
- Check if seed script ran successfully
- Check if page blocks are assigned
- Check if blocks are marked as visible
- Check browser console for errors

### Issue: Navigation not updating
- Check if menu is marked as active
- Check if menu items are marked as visible
- Clear browser cache
- Check API response

### Issue: Forms not working
- Check if form is marked as active
- Check if form fields are configured
- Check API endpoint
- Check form submission handler

### Issue: Admin panel not accessible
- Check authentication token
- Check user role
- Check backend logs
- Verify JWT secret

## ROLLBACK PLAN

If issues occur:
1. Keep old pages (Home.jsx, About.jsx, etc.) as backup
2. Switch routes back to old pages in App.jsx
3. Investigate and fix issues
4. Re-deploy when ready

## SUCCESS CRITERIA

✅ All admin panels accessible and functional
✅ All frontend pages render dynamically from CMS
✅ All content updates reflect immediately
✅ No hardcoded content in critical areas
✅ Performance meets requirements (<3s page load)
✅ No console errors
✅ Mobile responsive
✅ Cross-browser compatible

## SIGN-OFF

- [ ] Backend developer approval
- [ ] Frontend developer approval
- [ ] QA testing complete
- [ ] Client/stakeholder approval
- [ ] Ready for production deployment

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Verified By:** _______________
