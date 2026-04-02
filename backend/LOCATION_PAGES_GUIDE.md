# Location Pages Generation Guide

## Overview
This script generates **42,550 location pages** (25 services × 1,702 locations) for SEO optimization.

## Quick Start

### Step 1: Run the Generation Script
```bash
cd backend
npm run generate-all-locations
```

### Step 2: Monitor Progress
The script will:
- ✅ Create/verify all 25 services in database
- 🔨 Generate 42,550 location pages in batches of 100
- ⏭️ Skip any existing pages (based on slug)
- 📊 Show real-time progress

### Expected Output
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 LOCATION PAGES GENERATOR - 25 Services × 1702 Locations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Configuration:
   Services: 25
   Locations: 1702
   Total pages to generate: 42550

📝 Step 1: Processing services...
   ✅ Created service: Armed Forces Tribunal (AFT) Cases
   ✅ Created service: Bail & Anticipatory Bail Cases
   ...

✅ 25 services ready

🔨 Step 2: Generating location pages...
   ✅ Progress: 42550 pages created (0 skipped)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GENERATION COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY:
   ✅ Created: 42550 pages
   ⏭️  Skipped: 0 pages (already exist)
   📍 Total locations: 1702
   🔧 Total services: 25
   📈 Total in database: 42550
```

## What Gets Generated

### Services (25 total)
1. Armed Forces Tribunal (AFT) Cases
2. Bail & Anticipatory Bail Cases
3. CAT (Central Administrative Tribunal) Matters
4. Cheque Bounce Cases
5. Civil Law & Civil Disputes
6. Contract Dispute Cases
7. Corporate Law Services
8. Criminal Defense Cases
9. Cyber Crime Cases
10. Divorce & Matrimonial Cases
11. Debt Recovery (DRT) Cases
12. Employment & Labour Law Cases
13. Family Law Disputes
14. High Court Litigation
15. Immigration Law Services
16. Insolvency & Bankruptcy Cases
17. Insurance Claim & Dispute Cases
18. Landlord-Tenant Disputes
19. Motor Accident Claims
20. NCLT & Company Law Matters
21. Property & Real Estate Disputes
22. Supreme Court Litigation
23. Tax & GST Disputes
24. Trademark & IP Rights
25. Wills & Succession Planning

### Locations (1,702 total)
- **Indian Cities**: 1,500+ cities across all states
- **International**: USA (50 states), Canada (13 provinces), Europe (40+ countries), Middle East, Australia, New Zealand

### Page Structure
Each location page includes:
- **Slug**: `service-name-city-name` (e.g., `bail-anticipatory-bail-cases-mumbai`)
- **SEO Title**: "Service Name in City | GAG Lawyers - Expert Legal Services"
- **Meta Description**: Optimized for search engines
- **Keywords**: Service + location combinations
- **Content Sections**:
  1. Introduction
  2. Why Choose Our Services
  3. Our Approach
  4. Contact Information

## Sample URLs
```
/locations/armed-forces-tribunal-aft-cases-mumbai
/locations/bail-anticipatory-bail-cases-delhi
/locations/corporate-law-services-bangalore
/locations/divorce-matrimonial-cases-hyderabad
/locations/criminal-defense-cases-new-york
/locations/immigration-law-services-dubai
```

## Database Schema
```javascript
{
  service: ObjectId,           // Reference to Service
  serviceName: String,         // "Bail & Anticipatory Bail Cases"
  city: String,                // "Mumbai"
  slug: String,                // "bail-anticipatory-bail-cases-mumbai"
  content: {
    heading: String,
    intro: String,
    sections: [{
      title: String,
      content: String
    }]
  },
  seo: {
    title: String,
    description: String,
    keywords: String,
    h1: String
  },
  isActive: Boolean,           // true by default
  views: Number,               // 0 by default
  createdAt: Date,
  updatedAt: Date
}
```

## Performance

### Generation Time
- **Batch Size**: 100 pages per insert
- **Total Batches**: ~426 batches
- **Estimated Time**: 5-10 minutes (depending on database connection)

### Database Size
- **Documents**: 42,550 location pages
- **Estimated Size**: ~200-300 MB

## Re-running the Script

### Skip Duplicates (Default)
```bash
npm run generate-all-locations
```
The script automatically skips existing pages based on slug.

### Delete and Regenerate
Edit `generate-all-location-pages.js` and uncomment:
```javascript
// Uncomment to delete all existing pages
await LocationPage.deleteMany();
console.log('✅ Deleted all existing location pages\n');
```

## Verification

### Check Database Count
```bash
npm run inspect
```

### View in Admin Panel
```
http://localhost:5173/admin/locations
```

### Check Sitemap
```
http://localhost:5000/sitemap.xml
```

### Visit Sample Pages
```
http://localhost:5173/locations/bail-anticipatory-bail-cases-mumbai
http://localhost:5173/locations/corporate-law-services-delhi
```

## Troubleshooting

### Error: "MongoDB connection error"
- Check `.env` file has correct `MONGO_URI`
- Ensure MongoDB Atlas is accessible

### Error: "Service not found"
- The script automatically creates services
- If error persists, run: `npm run seed-25-services` first

### Slow Performance
- Increase `BATCH_SIZE` in script (default: 100)
- Check database connection speed
- Consider running during off-peak hours

### Duplicate Key Error
- Script automatically handles duplicates
- Existing pages are skipped based on slug

## Next Steps

1. **Activate Pages**: Use admin panel to bulk activate/deactivate pages
2. **SEO Optimization**: Submit sitemap to Google Search Console
3. **Content Enhancement**: Customize content for high-priority locations
4. **Analytics**: Track page views and conversions
5. **Maintenance**: Regularly update content and add new locations

## Files
- `generate-all-location-pages.js` - Main generation script
- `models/LocationPage.js` - Database schema
- `models/Service.js` - Service schema
- `utils/slugify.js` - Slug generation utility

## Support
For issues or questions, check:
- Database connection in `.env`
- Service model schema
- LocationPage model schema
- Slug generation logic
