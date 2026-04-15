# Service Page Layout Standardization

## Problem
Currently, the ServicePage component has hardcoded content for specific services (AFT, Bail, CAT, Cheque Bounce, Civil, Contract, Agreement to Sell) with images, content blocks, document checklists, popular cases, and FAQs. Other services don't have this structure, making the layout inconsistent and difficult to manage through the admin panel.

## Solution
We've added new fields to the Service model so ALL services can have the same layout structure and be fully manageable through the admin panel.

## Changes Made

### 1. Service Model Updated (`backend/models/Service.js`)

Added new fields:
```javascript
heroImage: String,              // Hero image URL for the service page
contentBlocks: [{               // Detailed content sections
  heading: String,
  paragraphs: [String]
}],
documentChecklist: [String],    // Required documents list
popularCases: [String],         // Landmark cases
faqs: [{                        // Frequently asked questions
  question: String,
  answer: String
}],
seoKeywords: [String]           // SEO keywords array
```

### 2. Agreement to Sell Service Updated

The "Agreement to Sell" service has been updated with:
- ✅ Hero image (property image from Unsplash)
- ✅ 5 content blocks with detailed information
- ✅ 9 document checklist items
- ✅ 3 popular cases
- ✅ 5 FAQs
- ✅ 13 SEO keywords

## Next Steps

### Step 1: Update ServicePage Component ✅ COMPLETED

The `frontend/src/pages/ServicePage.jsx` file has been updated to:

1. ✅ **Removed hardcoded overrides** - Deleted the AFT_OVERRIDES, BAIL_OVERRIDES, CAT_OVERRIDES, etc. constants
2. ✅ **Uses database fields** - Replaced hardcoded content with service data from the database
3. ✅ **Renders sections conditionally** - Only shows sections if data exists

### Step 2: Update Admin Panel (ServiceManager) ✅ COMPLETED

The `frontend/src/pages/admin/ServiceManager.jsx` has been updated to allow editing:

1. ✅ **Added form fields for new data**:
   - Hero Image URL input
   - Content Blocks editor (heading + multiple paragraphs)
   - Document Checklist (array of strings)
   - Popular Cases (array of strings)
   - FAQs editor (question + answer pairs)
   - SEO Keywords (array of strings)

2. ✅ **Updated form state** to include new fields
3. ✅ **Updated save handler** to include new fields in API call

**Field Formats:**
- **Hero Image**: Simple URL input
- **Content Blocks**: Format: `[HEADING] heading text [CONTENT] paragraphs [BLOCK]` for next section
- **Document Checklist**: One item per line
- **Popular Cases**: One case per line
- **FAQs**: Format: `Q: question text A: answer text ---` (separator for next FAQ)
- **SEO Keywords**: One keyword per line

### Step 3: Migrate Existing Services ⏳ NEXT

Create a migration script to copy hardcoded data to database for existing services:

```javascript
// backend/migrate-service-content.js
// This script will:
// 1. Read AFT_OVERRIDES, BAIL_OVERRIDES, etc. from ServicePage.jsx
// 2. Update each service in database with the corresponding data
// 3. Add appropriate hero images for each category
```

### Step 4: Update All Services

For services that don't have the new fields yet:
1. Add appropriate hero images based on category
2. Add default FAQs if custom ones aren't provided
3. Optionally add content blocks, document checklists, and popular cases

## Benefits

1. **Consistent Layout** - All service pages will have the same structure
2. **Easy Management** - Everything editable through admin panel
3. **No Code Changes** - Adding/updating content doesn't require code deployment
4. **SEO Friendly** - Each service can have custom SEO keywords
5. **Scalable** - Easy to add new services with full content

## Default Fallbacks

For services without the new fields, the page will:
- Use category-based hero images
- Generate default FAQs based on service name
- Show only the sections that have data (overview, types of cases, process, key points)
- Use service name for SEO keywords

## Testing Checklist

- [ ] All existing services display correctly
- [ ] New services can be created with all fields
- [ ] Admin panel allows editing all new fields
- [ ] Images load correctly or show fallback
- [ ] SEO meta tags use new keywords
- [ ] Mobile responsive layout maintained
- [ ] Content blocks render HTML safely
- [ ] FAQs expand/collapse correctly

## Migration Priority

1. **High Priority** (Services with existing hardcoded content):
   - Armed Forces Tribunal
   - Bail & Anticipatory Bail
   - CAT Matters
   - Cheque Bounce
   - Civil Law
   - Contract Disputes
   - Agreement to Sell ✅ (Already done)

2. **Medium Priority** (Popular services):
   - Family Law
   - Property Disputes
   - Criminal Defense
   - Corporate Law

3. **Low Priority** (Other services):
   - Remaining services can use default layout

## Files to Modify

1. ✅ `backend/models/Service.js` - Model updated
2. ✅ `backend/update-agreement-to-sell.js` - Example migration script
3. ✅ `frontend/src/pages/ServicePage.jsx` - Removed hardcoded overrides, uses database fields
4. ✅ `frontend/src/pages/admin/ServiceManager.jsx` - Added form fields for new data
5. ⏳ `backend/migrate-service-content.js` - Migrate existing hardcoded content to database (NEXT STEP)

## Conclusion

This standardization will make the website much easier to maintain and allow the client to manage all service content through the admin panel without needing developer assistance for content updates.
