# Quick Installation Guide

## Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install @hello-pangea/dnd
```

## Step 2: Verify Backend Routes

Make sure `backend/server.js` or `backend/api/index.js` includes the service routes:

```javascript
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);
```

## Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 4: Test the System

1. **Admin Panel:** http://localhost:5173/admin/services
2. **Service Page:** http://localhost:5173/services/cheque-bounce-lawyer

## Step 5: Create Your First Service Page

1. Login to admin panel
2. Go to Service Manager
3. Select any service from the list
4. Click "Add Section"
5. Choose section type (e.g., "Hero")
6. Enter heading: "Expert Legal Services"
7. Expand section and add content:
   ```json
   {
     "subheading": "Professional Legal Assistance",
     "ctaText": "Contact Us Today",
     "ctaLink": "/contact"
   }
   ```
8. Click "Save Changes"
9. Visit the service page to see it live!

## Troubleshooting

### Issue: Drag-and-drop not working
**Solution:** Make sure `@hello-pangea/dnd` is installed:
```bash
cd frontend
npm install @hello-pangea/dnd
```

### Issue: 404 on API calls
**Solution:** Verify service routes are registered in `backend/server.js`:
```javascript
app.use('/api/services', require('./routes/serviceRoutes'));
```

### Issue: Sections not rendering
**Solution:** Check that sections have `visible: true` and valid content

## Quick Commands

```bash
# Install dependencies
cd frontend && npm install @hello-pangea/dnd

# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Run migrations (if needed)
cd backend && node migrations/inspect-service-related-collections.js
```

## What's Next?

- Add more section types (testimonials, pricing, audience)
- Customize section styling
- Add image upload for hero backgrounds
- Create section templates
- Add content validation

Enjoy your new service pages system! 🎉
