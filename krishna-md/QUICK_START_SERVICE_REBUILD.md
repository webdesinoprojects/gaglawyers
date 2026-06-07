# Quick Start - Service Pages Rebuild

## 🎉 System is Ready!

The service pages system has been completely rebuilt from scratch. Here's how to get started:

## Step 1: Install Dependency (1 minute)

```bash
cd frontend
npm install @hello-pangea/dnd
```

## Step 2: Start Servers (1 minute)

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

## Step 3: Create Your First Service Page (5 minutes)

### 3.1 Login to Admin
- Go to: http://localhost:5173/admin/login
- Login with your admin credentials

### 3.2 Open Service Manager
- Navigate to: http://localhost:5173/admin/services
- You'll see a list of all 56 services on the left

### 3.3 Select a Service
- Click on "Cheque Bounce Lawyer" (or any service)
- The editor will load on the right

### 3.4 Configure SEO (Optional)
```
Title: Expert Cheque Bounce Lawyers | Legal Services
Meta Description: Professional legal assistance for cheque bounce cases. Free consultation available.
```

### 3.5 Add Hero Section
1. Click "Add Section" button
2. Section will appear with default type "overview"
3. Change type to "hero" from dropdown
4. Enter heading: `Expert Cheque Bounce Legal Services`
5. Click expand icon (chevron down)
6. Replace content JSON with:
```json
{
  "subheading": "Professional Legal Assistance",
  "ctaText": "Get Free Consultation",
  "ctaLink": "/contact"
}
```

### 3.6 Add Overview Section
1. Click "Add Section" again
2. Keep type as "overview"
3. Enter heading: `About Our Services`
4. Expand and set content:
```json
{
  "body": "We provide comprehensive legal assistance for cheque bounce cases under Section 138 of the Negotiable Instruments Act. Our experienced lawyers have successfully handled hundreds of cases with a high success rate."
}
```

### 3.7 Add Benefits Section
1. Click "Add Section"
2. Change type to "benefits"
3. Enter heading: `Why Choose Us`
4. Expand and set content:
```json
{
  "items": [
    {
      "icon": "Shield",
      "title": "Expert Legal Team",
      "description": "Experienced lawyers with proven track record in cheque bounce cases"
    },
    {
      "icon": "Clock",
      "title": "Quick Response",
      "description": "Fast turnaround on legal notices and court filings"
    },
    {
      "icon": "Award",
      "title": "High Success Rate",
      "description": "90% success rate in recovering cheque bounce amounts"
    }
  ]
}
```

### 3.8 Save
- Click the green "Save Changes" button at the bottom
- Wait for success message

### 3.9 View Your Page
- Open: http://localhost:5173/services/cheque-bounce-lawyer
- You should see your hero, overview, and benefits sections!

## Step 4: Customize Further

### Reorder Sections
- Drag sections using the grip icon (⋮⋮)
- Drop in desired position
- Save changes

### Hide/Show Sections
- Click the eye icon to toggle visibility
- Hidden sections won't appear on the frontend
- Save changes

### Add More Section Types

**Process Section:**
```json
{
  "steps": [
    {
      "stepNumber": 1,
      "title": "Initial Consultation",
      "description": "Free consultation to understand your case details"
    },
    {
      "stepNumber": 2,
      "title": "Legal Notice",
      "description": "Draft and send legal notice to the defaulter"
    },
    {
      "stepNumber": 3,
      "title": "Case Filing",
      "description": "File complaint in the appropriate magistrate court"
    }
  ]
}
```

**FAQ Section:**
```json
{
  "items": [
    {
      "question": "What is the time limit for filing a cheque bounce case?",
      "answer": "You must file the case within 30 days of receiving the return memo from the bank."
    },
    {
      "question": "What are the penalties for cheque bounce?",
      "answer": "The penalty can be up to twice the cheque amount or imprisonment up to 2 years, or both."
    }
  ]
}
```

**CTA Banner:**
```json
{
  "body": "Get expert legal advice from experienced lawyers. Free initial consultation available.",
  "buttonText": "Contact Us Today",
  "buttonLink": "/contact"
}
```

## Step 5: Repeat for All 56 Services

Now that you know how to create one service page, repeat the process for all 56 services:

1. Select service from list
2. Add sections (hero, overview, benefits, process, faq, cta)
3. Customize headings and content
4. Save
5. Move to next service

## Tips

### Content Templates
Create a template for common sections and reuse across services:

**Hero Template:**
```json
{
  "subheading": "Professional Legal Assistance",
  "ctaText": "Get Free Consultation",
  "ctaLink": "/contact"
}
```

**CTA Template:**
```json
{
  "body": "Need legal help? Contact our expert lawyers today.",
  "buttonText": "Contact Us",
  "buttonLink": "/contact"
}
```

### Section Order Recommendation
1. Hero (always first)
2. Overview
3. Benefits
4. Process
5. FAQ
6. CTA Banner (always last)

### Background Colors
- `light` - White background (default)
- `dark` - Dark blue background (#1a2744)
- `accent` - Gold accent background

### Visibility Strategy
- Use visibility toggle to A/B test sections
- Hide sections that need content updates
- Show only completed sections to users

## Troubleshooting

### Issue: Can't see sections on frontend
**Solution:** Make sure sections have `visible: true` (eye icon is open)

### Issue: Sections in wrong order
**Solution:** Drag sections to reorder, then save

### Issue: Content not updating
**Solution:** Clear browser cache and refresh

### Issue: JSON error in content
**Solution:** Validate JSON at jsonlint.com before pasting

## What's Next?

- [ ] Create content for all 56 services
- [ ] Add images to hero sections
- [ ] Customize colors per service
- [ ] Add testimonials sections
- [ ] Add pricing sections (if applicable)
- [ ] Test on mobile devices
- [ ] Deploy to production

## Documentation

- `SERVICE_REBUILD_SUMMARY.md` - Complete technical documentation
- `SERVICE_PAGES_REBUILD_COMPLETE.md` - Detailed implementation guide
- `INSTALL_SERVICE_SYSTEM.md` - Installation instructions
- `FINAL_CHECKLIST.md` - Pre-launch checklist

## Support

If you encounter any issues:
1. Check the documentation files
2. Verify all dependencies are installed
3. Check browser console for errors
4. Verify API endpoints are responding

---

**Estimated Time to Complete All 56 Services:** 4-6 hours

**System Status:** ✅ Ready for Production

Enjoy your new service pages system! 🚀
