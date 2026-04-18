# Service Content Migration Guide

Since the live site (gaglawyers.com) blocks automated scraping with 403 errors, we use a browser-based approach to extract content.

## 🎯 Overview

1. **Browser Scraper** - Run in browser console while on live site
2. **Import Script** - Import the scraped JSON into MongoDB

## 📋 Method 1: Single Service (Recommended for Testing)

### Step 1: Scrape Content

1. Open https://gaglawyers.com/services/bail-lawyer (or any service page)
2. Open DevTools Console (F12)
3. Copy the entire contents of `browser-scraper.js`
4. Paste into console and press Enter
5. You'll see output like:
   ```
   ✅ Scraping complete!
   
   Service: Bail Lawyer
   Slug: bail-lawyer
   Sections found: 6
   
   📋 Copy the JSON below:
   ```
6. Copy the JSON output
7. Save to a file: `bail-lawyer.json`

### Step 2: Import to Database

```bash
cd backend
node scripts/importServiceContent.js single bail-lawyer.json
```

You should see:
```
✅ Connected to MongoDB
📂 Reading file: bail-lawyer.json

📝 Importing: Bail Lawyer (bail-lawyer)
   🗑️  Deleted old sections
   ✅ Created 6 sections
   ✅ Updated SEO

✅ Import successful!
```

### Step 3: Verify in Admin Panel

1. Go to http://localhost:5173/admin/service-manager
2. Click "Bail Lawyer" in the sidebar
3. You should see all scraped sections

---

## 📦 Method 2: Bulk Import (For All 56 Services)

### Step 1: Scrape All Services

Create a directory for JSON files:
```bash
mkdir backend/scripts/scraped-services
```

For each of the 56 services:

1. Open the service page on gaglawyers.com
2. Run browser-scraper.js in console
3. Copy the JSON
4. Save to `scraped-services/[slug].json`

Example:
- `scraped-services/bail-lawyer.json`
- `scraped-services/divorce-lawyer.json`
- `scraped-services/property-lawyer.json`
- etc.

### Step 2: Bulk Import

```bash
cd backend
node scripts/importServiceContent.js bulk scripts/scraped-services/
```

Output:
```
Found 56 JSON files

[1/56] Processing: bail-lawyer.json
📝 Importing: Bail Lawyer (bail-lawyer)
   ✅ Created 6 sections

[2/56] Processing: divorce-lawyer.json
📝 Importing: Divorce Lawyer (divorce-lawyer)
   ✅ Created 7 sections

...

📊 SUMMARY

Total files: 56
✅ Succeeded: 56
❌ Failed: 0
```

---

## 🔧 Method 3: Paste JSON Directly (Quick Test)

```bash
cd backend
node scripts/importServiceContent.js stdin
```

Then paste the JSON and press:
- **Unix/Mac**: Ctrl+D
- **Windows**: Ctrl+Z then Enter

---

## 📝 Service List (56 Total)

Here are all the service slugs you need to scrape:

1. agreement-to-sell
2. armed-force-tribunal-lawyer
3. bail-lawyer
4. cat-matters-lawyer
5. cheque-bounce-lawyer
6. child-custody-lawyer
7. civil-lawyer
8. consumer-court-lawyer
9. contract-lawyer
10. corporate-law
11. court-marriage-lawyer
12. criminal-defense-cases
13. cyber-crime
14. debt-recovery-lawyer
15. divorce-lawyer
16. dowry-lawyer
17. employment-agreement
18. employment-lawyer
19. environment-lawyer
20. family-law-disputes
21. firearms-lawyer
22. food-and-drug-lawyer
23. franchise-agreement
24. high-court-litigation
25. human-rights-lawyer
26. ip-license-agreement
27. immigration-law
28. insolvency-bankruptcy-lawyer
29. insurance-lawyer
30. labour-lawyer
31. landlord-tenant-lawyer
32. leave-and-license-agreement
33. legal-notice
34. loan-agreement
35. marriage-registration-lawyer
36. media-and-broadcasting-lawyer
37. mediation-and-arbitration-lawyer
38. medical-negligence-lawyer
39. memorandum-of-understanding-mou
40. military-lawyer
41. motor-accident-lawyer
42. muslim-lawyer
43. non-disclosure-agreement
44. partnership-deed
45. property-lawyer
46. rera-registration
47. rent-agreement
48. right-to-information-lawyer
49. smc-certificate
50. sale-deed
51. sexual-harassment-lawyer
52. sports-lawyer
53. succession-certificate
54. supreme-court-litigation
55. will-lawyer
56. writ-petition-lawyer

---

## 🎨 What Gets Scraped

The browser scraper extracts:

### Hero Section
- Heading (h1)
- Subheading (first paragraph)
- Background image
- CTA button

### Overview Section
- Heading (first h2)
- Body paragraphs

### Benefits Section
- Heading (h2/h3 with "benefits", "why choose", etc.)
- List items with icons, titles, descriptions

### Process Section
- Heading (h2/h3 with "process", "steps", etc.)
- Numbered steps with titles and descriptions

### FAQ Section
- Heading (h2/h3 with "faq", "questions", etc.)
- Question/answer pairs

### CTA Banner
- Always added at the end
- Default text: "Ready to Get Started?"

---

## 🐛 Troubleshooting

### "Service not found in database"
The service slug must already exist in MongoDB. Check with:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const Service = require('./models/Service'); mongoose.connect(process.env.MONGO_URI).then(async () => { const s = await Service.findOne({ slug: 'bail-lawyer' }); console.log(s); process.exit(0); });"
```

### Browser scraper returns empty sections
The live site HTML structure might be different. Inspect the page and adjust the selectors in `browser-scraper.js`.

### JSON parse error
Make sure you copied the complete JSON output, including opening `{` and closing `}`.

---

## 💡 Tips

1. **Start with 1-2 services** to test the workflow
2. **Check the admin panel** after each import to verify content
3. **Save JSON files** with the slug as filename for easy tracking
4. **Use bulk import** once you've verified the process works
5. **The scraper is smart** - it only includes sections that have actual content

---

## 🚀 Quick Start (Test with One Service)

```bash
# 1. Visit https://gaglawyers.com/services/bail-lawyer
# 2. Open console, paste browser-scraper.js
# 3. Copy the JSON output
# 4. Save to test.json
# 5. Import:

cd backend
node scripts/importServiceContent.js single test.json

# 6. Check admin panel at http://localhost:5173/admin/service-manager
```

---

## ✅ Success Criteria

After importing, each service should have:
- ✅ Hero section with heading and subheading
- ✅ Overview section with body text
- ✅ 2-4 additional sections (benefits, process, FAQ)
- ✅ CTA banner at the end
- ✅ SEO title and meta description
- ✅ All content visible in Service Manager admin panel
- ✅ Service page renders correctly at `/services/[slug]`
