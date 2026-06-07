# Services Page - Admin Panel Management Guide

## Overview
The new Services page design is now fully manageable through the admin panel. Every visual element, badge, image, and setting can be controlled without touching code.

## Accessing the Admin Panel

1. Navigate to `/admin/services`
2. Select any service from the left sidebar
3. Click on the new **"Services Page"** tab

## Admin Panel Features

### 1. Services Page Tab
A dedicated tab for managing how each service appears on the main `/services` page.

#### Sections Available:

### 📊 Visibility Settings

**Show on Services Page**
- Toggle to show/hide the service on the public services page
- When disabled, service won't appear in the grid or search results
- Service detail page remains accessible via direct URL

**Featured Service** ⭐
- Mark service as featured to appear in the spotlight section
- Featured services get enhanced visibility with:
  - Large hero-style display
  - Trust indicators grid
  - Prominent CTA buttons
  - Background image overlay

**Display Priority (Order)**
- Set numeric order for service appearance
- Lower numbers appear first
- Services with same priority are sorted alphabetically
- Example: Priority 1 appears before Priority 10

---

### ✍️ Card Content

**Card Title**
- Override the default service name for the card
- Leave empty to use the service name automatically
- Best practice: Keep it short (2-5 words)
- Example: "Criminal Defense" instead of "Criminal Defense Legal Services"

**Card Summary**
- Brief description shown on service cards (150-200 characters recommended)
- Appears in:
  - Service grid cards
  - Search results
  - Featured spotlight
- Character counter shows usage (max 200)
- Should be compelling and action-oriented

---

### 🖼️ Card Image

**Image URL**
- Full URL to the service card image
- Recommended size: 1200x800px or larger
- Landscape orientation works best
- Supports any image hosting service

**Preview Button**
- Click to see how the image looks
- Helps verify image quality and composition
- Shows actual card rendering

**Image Alt Text**
- Descriptive text for accessibility
- Important for SEO and screen readers
- Example: "Lawyer reviewing criminal defense documents in courtroom"

**Unsplash Integration**
- Smart suggestions based on service type
- Click any suggested term to search Unsplash
- Opens in new tab for easy browsing
- Tip: Right-click image → "Copy image address" → Paste in URL field

**Suggested Search Terms:**
- Criminal/Bail services: "justice", "courthouse", "legal documents", "judge gavel"
- Corporate/Business: "business meeting", "corporate office", "handshake", "contract signing"
- Family/Divorce: "family", "mediation", "counseling", "agreement"
- Property/Real Estate: "real estate", "property", "building", "architecture"
- Cyber/Technology: "cybersecurity", "technology", "digital", "computer"
- Default: "law", "legal", "justice", "courthouse"

---

### 🏆 Card Badges

Control which trust badges appear on the service card:

**Expert Team Badge** ✓
- Green badge with checkmark icon
- Shows "Expert Team" text
- Enabled by default
- Indicates specialized expertise

**Proven Results Badge** ⭐
- Blue badge with star icon
- Shows "Proven Results" text
- Enabled by default
- Highlights track record

Both badges appear below the card description and add credibility.

---

### 📈 Custom Stats (Optional)

Override default stats when this service is featured in the spotlight section:

**Years Experience**
- Example: "25+", "15 Years", "Since 1998"
- Appears with Award icon

**Happy Clients**
- Example: "1000+", "500+ Satisfied", "2K+"
- Appears with Users icon

**Success Rate**
- Example: "95%", "98% Win Rate", "High Success"
- Appears with TrendingUp icon

**Cases Handled**
- Example: "500+", "1000+ Cases", "Extensive"
- Appears with Scale icon

Leave empty to use default site-wide stats.

---

### 👁️ Card Preview

Live preview of how the service card will appear:
- Shows actual image
- Displays title and summary
- Shows active/inactive status
- Displays featured badge if enabled
- Shows selected trust badges
- Exact representation of public view

---

## How Settings Affect the Public Page

### Service Grid
- **isActive**: Controls visibility in grid
- **displayOrder**: Controls position in grid
- **cardTitle**: Card heading
- **shortDescription**: Card text
- **cardImageUrl**: Card background image
- **Badges**: Trust indicators below description

### Featured Spotlight Section
- **isFeatured**: Enables spotlight display
- **cardImageUrl**: Large hero image
- **customStats**: Overrides default stats
- **cardTitle & shortDescription**: Main content

### Search Functionality
- **isActive**: Must be true to appear in search
- **cardTitle**: Searchable
- **shortDescription**: Searchable
- Results update in real-time

---

## Database Schema

### New Field: `servicesPageSettings`
Stored as a JSON object in the Service model:

```javascript
{
  isFeatured: Boolean,
  displayOrder: Number,
  cardTitle: String,
  showExpertTeamBadge: Boolean,
  showProvenResultsBadge: Boolean,
  customStats: {
    experience: String,
    clients: String,
    successRate: String,
    casesHandled: String
  }
}
```

### Existing Fields Used:
- `isActive`: Visibility toggle
- `shortDescription`: Card summary
- `cardImageUrl`: Image URL
- `cardImageAlt`: Image alt text
- `name`: Default card title

---

## Best Practices

### Images
1. Use high-quality, professional images
2. Ensure images are relevant to the service
3. Landscape orientation (16:9 or 4:3 ratio)
4. Minimum 1200px width for sharp display
5. Use Unsplash for free, high-quality stock photos
6. Always add descriptive alt text

### Content
1. Keep card titles short and impactful
2. Write compelling summaries (150-200 chars)
3. Focus on benefits, not just features
4. Use action-oriented language
5. Maintain consistent tone across services

### Organization
1. Use display order strategically
2. Feature your most important services
3. Keep 2-4 featured services maximum
4. Ensure all active services have images
5. Review and update content regularly

### SEO
1. Write unique descriptions for each service
2. Include relevant keywords naturally
3. Use descriptive alt text for images
4. Keep titles under 60 characters
5. Optimize meta descriptions in SEO tab

---

## Workflow Example

### Adding a New Service to the Page:

1. **Create Service** (if new)
   - Click "Create Service" in sidebar
   - Enter service name
   - Confirm slug

2. **Configure Basic Info** (SEO & Settings tab)
   - Set page title and meta description
   - Add keywords
   - Enable "Service Active"

3. **Set Up Services Page Appearance** (Services Page tab)
   - ✅ Enable "Show on Services Page"
   - Set display order (e.g., 5)
   - Add card title (optional)
   - Write compelling card summary

4. **Add Image**
   - Click suggested Unsplash term
   - Find suitable image
   - Right-click → Copy image address
   - Paste in Image URL field
   - Click Preview to verify
   - Add descriptive alt text

5. **Configure Badges**
   - Enable/disable Expert Team badge
   - Enable/disable Proven Results badge

6. **Optional: Make Featured**
   - ✅ Enable "Featured Service"
   - Add custom stats if desired

7. **Preview**
   - Check card preview at bottom
   - Verify all information is correct

8. **Save**
   - Click "Save changes" button
   - Verify success message

9. **Test**
   - Visit `/services` page
   - Verify service appears correctly
   - Test search functionality
   - Check mobile responsiveness

---

## Troubleshooting

### Service Not Appearing
- Check "Show on Services Page" is enabled
- Verify "Service Active" is checked in SEO tab
- Ensure service is saved
- Clear browser cache

### Image Not Loading
- Verify URL is correct and accessible
- Check image format (JPG, PNG, WebP supported)
- Ensure HTTPS URL (not HTTP)
- Try different image source
- Check browser console for errors

### Featured Section Not Showing
- Verify "Featured Service" is enabled
- Check that service is active
- Ensure image URL is valid
- Save and refresh page

### Badges Not Appearing
- Check badge toggles are enabled
- Verify service is saved
- Clear browser cache
- Check card preview first

### Stats Not Updating
- Ensure custom stats are filled in
- Verify service is featured
- Save changes
- Refresh page

---

## API Endpoints Used

### GET `/api/services`
Fetches all services with:
- name, slug, isActive
- shortDescription
- cardImageUrl, cardImageAlt
- seo, globalSettings
- **servicesPageSettings** (new)

### PUT `/api/services/:slug`
Updates service including:
- All basic fields
- **servicesPageSettings** (new)
- sections

### Response includes:
- Updated service data
- All sections
- Success/error status

---

## Technical Details

### Frontend Components
- **ServicesPageTab.jsx**: New admin tab component
- **ServiceEditor.jsx**: Updated with new tab
- **ServiceManager.jsx**: Updated to save new field
- **Services.jsx**: Public page consuming settings

### Backend Updates
- **Service.js** model: Added `servicesPageSettings` field
- **serviceController.js**: Updated to handle new field
- Field type: `mongoose.Schema.Types.Mixed` (flexible JSON)

### Data Flow
1. Admin edits in ServicesPageTab
2. Changes stored in component state
3. Save button triggers API call
4. Backend validates and saves to MongoDB
5. Public page fetches updated data
6. Settings applied to UI rendering

---

## Future Enhancements (Optional)

Potential additions for even more control:

1. **Category Filtering**
   - Add service categories
   - Filter buttons on public page

2. **Color Customization**
   - Per-service accent colors
   - Custom badge colors

3. **Video Backgrounds**
   - Support video URLs
   - Autoplay options

4. **Testimonials Integration**
   - Link specific testimonials to services
   - Display in spotlight section

5. **Analytics**
   - Track service card clicks
   - Popular services dashboard

6. **Bulk Operations**
   - Update multiple services at once
   - Batch image uploads

7. **Templates**
   - Save service configurations as templates
   - Quick apply to new services

---

## Support

For issues or questions:
1. Check this guide first
2. Review browser console for errors
3. Verify all required fields are filled
4. Test in different browsers
5. Check network tab for API errors

Remember: All changes are saved to the database and persist across sessions. Always preview before saving major changes!
