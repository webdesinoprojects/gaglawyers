# Service Content Scraper

This script scrapes all 56 service pages from gaglawyers.com and seeds the content into MongoDB.

## Installation

```bash
cd backend
npm install cheerio axios
```

## Usage

```bash
node scripts/scrapeAndSeedServices.js
```

## What It Does

### Step 1: Discover Service URLs
- Checks `sitemap.xml` first
- Falls back to scraping the services page
- Collects all service URLs
- Prints discovered URLs before proceeding

### Step 2: Scrape Each Service Page
For each URL, extracts:
- **Hero section**: H1, subtitle, CTA, background image
- **Overview section**: First H2 and following paragraphs
- **Benefits section**: "Why choose us" lists or cards
- **Process section**: Numbered steps or "How it works"
- **FAQ section**: Q&A pairs or accordion items
- **CTA Banner**: Always added at the end
- **SEO**: Page title and meta description

### Step 3: Seed into MongoDB
- Finds existing service by slug (doesn't create new ones)
- Deletes old sections
- Creates new sections from scraped content
- Updates SEO fields
- Preserves: `_id`, `name`, `slug`, `createdAt`

## Features

✅ **Respectful scraping**: 1 second delay between requests
✅ **Idempotent**: Safe to run multiple times
✅ **Error handling**: Logs failures and continues
✅ **Progress tracking**: Shows X/56 progress
✅ **Failed services log**: Saves to `failed-services.json`
✅ **Absolute URLs**: Converts all image URLs to absolute
✅ **Clean text**: Removes extra whitespace and formatting

## Output

```
🚀 Service Content Scraper & Seeder

==================================================
✅ Connected to MongoDB

📋 STEP 1: Discovering service URLs...

✅ Found 56 service URLs from sitemap

📋 Discovered URLs:
   1. https://gaglawyers.com/services/cheque-bounce-lawyer
   2. https://gaglawyers.com/services/divorce-lawyer
   ...

[1/56] Scraping: cheque-bounce-lawyer...
   ✅ Scraped 6 sections
   ✅ Seeded to database

[2/56] Scraping: divorce-lawyer...
   ✅ Scraped 5 sections
   ✅ Seeded to database

...

==================================================

📊 SUMMARY

Total services: 56
✅ Succeeded: 54
❌ Failed: 2

⚠️  Failed services saved to: scripts/failed-services.json

Failed services:
   - some-service: 404 Not Found
   - another-service: Timeout

✅ Script completed!
```

## Failed Services

If any services fail, they're saved to `failed-services.json`:

```json
[
  {
    "url": "https://gaglawyers.com/services/some-service",
    "slug": "some-service",
    "error": "404 Not Found"
  }
]
```

You can then handle these manually in the admin panel.

## Section Mapping

### Hero Section
- **Heading**: First `<h1>` on page
- **Subheading**: First `<p>` after h1 or hero description
- **CTA**: Always "Schedule Consultation" → "/contact"
- **Background**: Hero/banner background image

### Overview Section
- **Heading**: First `<h2>` on page
- **Body**: All `<p>` tags following the h2 until next h2/h3

### Benefits Section
- **Trigger**: H2/H3 containing "benefit", "why choose", "advantage"
- **Items**: Extracted from `<li>`, `.card`, or `.benefit-item`
- **Structure**: Icon (default: CheckCircle), title, description

### Process Section
- **Trigger**: H2/H3 containing "process", "how it works", "steps"
- **Steps**: Extracted from numbered lists or step items
- **Structure**: Step number, title, description

### FAQ Section
- **Trigger**: H2/H3 containing "faq", "question", "q&a"
- **Items**: Extracted from accordion items, dt/dd pairs, or h4/p pairs
- **Structure**: Question, answer

### CTA Banner
- **Always added**: At the end of every service
- **Heading**: "Ready to Get Started?"
- **Body**: "Contact our expert legal team today..."
- **Button**: "Schedule Consultation" → "/contact"

## Important Notes

### What It Does NOT Do:
- ❌ Create new service documents
- ❌ Modify service names or slugs
- ❌ Delete existing services
- ❌ Scrape images (only stores URLs)

### What It DOES Do:
- ✅ Update sections array
- ✅ Update SEO fields
- ✅ Preserve all existing service data
- ✅ Make content immediately editable in admin panel

## Troubleshooting

### "Service not found in DB"
The service exists on the live site but not in your database. Add it manually first.

### "404 Not Found"
The service URL doesn't exist on the live site. Check the URL or skip it.

### "Timeout"
The page took too long to load. Try running the script again.

### No sections scraped
The page structure doesn't match the expected patterns. You'll need to add content manually in the admin panel.

## After Running

1. Check the summary for succeeded/failed counts
2. Review `failed-services.json` if any failed
3. Open admin panel at `/admin/services`
4. All scraped content should be visible and editable
5. Review and adjust content as needed
6. Add any missing sections manually

## Customization

### Change delay between requests:
```javascript
const DELAY_MS = 2000; // 2 seconds
```

### Change site URL:
```javascript
const SITE_URL = 'https://different-site.com';
```

### Add more section types:
Add new extraction logic in the `scrapeServicePage` function.

## Safety

- ✅ Read-only on live site (only GET requests)
- ✅ Respects rate limits (1 second delay)
- ✅ Idempotent (safe to run multiple times)
- ✅ Preserves existing data
- ✅ Logs all operations
- ✅ Handles errors gracefully

## License

Internal tool for content migration. Not for redistribution.
