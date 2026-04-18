# Quick Start - Service Content Migration

## 🚀 3-Step Process

### Step 1: Scrape (2 minutes)

1. Visit: `https://gaglawyers.com/services/bail-lawyer`
2. Press `F12` to open DevTools Console
3. Copy entire contents of `backend/scripts/browser-scraper.js`
4. Paste into console and press Enter
5. Copy the JSON output
6. Save to `bail-lawyer.json`

### Step 2: Import (10 seconds)

```bash
cd backend
node scripts/importServiceContent.js single bail-lawyer.json
```

Expected output:
```
✅ Connected to MongoDB
📝 Importing: Bail Lawyer (bail-lawyer)
   🗑️  Deleted old sections
   ✅ Created 6 sections
   ✅ Updated SEO
✅ Import successful!
```

### Step 3: Verify (30 seconds)

1. Open: `http://localhost:5173/admin/service-manager`
2. Click "Bail Lawyer" in sidebar
3. Check sections are present
4. View live page: `http://localhost:5173/services/bail-lawyer`

---

## 📦 Bulk Import (All 56 Services)

### Setup:
```bash
mkdir backend/scripts/scraped-services
```

### For each service:
1. Visit service URL
2. Run browser scraper (F12 → paste script)
3. Save JSON to `scraped-services/[slug].json`

### Import all:
```bash
cd backend
node scripts/importServiceContent.js bulk scripts/scraped-services/
```

---

## 🔗 Service URLs

Base URL: `https://gaglawyers.com/services/`

Slugs (56 total):
```
agreement-to-sell
armed-force-tribunal-lawyer
bail-lawyer
cat-matters-lawyer
cheque-bounce-lawyer
child-custody-lawyer
civil-lawyer
consumer-court-lawyer
contract-lawyer
corporate-law
court-marriage-lawyer
criminal-defense-cases
cyber-crime
debt-recovery-lawyer
divorce-lawyer
dowry-lawyer
employment-agreement
employment-lawyer
environment-lawyer
family-law-disputes
firearms-lawyer
food-and-drug-lawyer
franchise-agreement
high-court-litigation
human-rights-lawyer
ip-license-agreement
immigration-law
insolvency-bankruptcy-lawyer
insurance-lawyer
labour-lawyer
landlord-tenant-lawyer
leave-and-license-agreement
legal-notice
loan-agreement
marriage-registration-lawyer
media-and-broadcasting-lawyer
mediation-and-arbitration-lawyer
medical-negligence-lawyer
memorandum-of-understanding-mou
military-lawyer
motor-accident-lawyer
muslim-lawyer
non-disclosure-agreement
partnership-deed
property-lawyer
rera-registration
rent-agreement
right-to-information-lawyer
smc-certificate
sale-deed
sexual-harassment-lawyer
sports-lawyer
succession-certificate
supreme-court-litigation
will-lawyer
writ-petition-lawyer
```

---

## 🐛 Troubleshooting

**"Service not found in database"**
→ Service slug must exist. Check with:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const Service = require('./models/Service'); mongoose.connect(process.env.MONGO_URI).then(async () => { const s = await Service.findOne({ slug: 'bail-lawyer' }); console.log(s ? 'Found' : 'Not found'); process.exit(0); });"
```

**JSON parse error**
→ Make sure you copied complete JSON (starts with `{`, ends with `}`)

**Empty sections**
→ Live site HTML might be different. Check console for errors.

---

## ✅ Files

- `backend/scripts/browser-scraper.js` - Run in browser console
- `backend/scripts/importServiceContent.js` - Import to database
- `backend/scripts/test-service-sample.json` - Example (already tested ✅)
- `backend/scripts/CONTENT_MIGRATION_GUIDE.md` - Full documentation
- `backend/scripts/BOOKMARKLET.md` - One-click bookmarklet

---

## 💡 Pro Tips

1. Test with 1-2 services first
2. Save all JSON files as backup
3. Use bulk import for efficiency
4. Edit/refine in admin panel after import
5. Browser scraper only includes sections with content

---

## 📞 Need Help?

Read the full guide: `backend/scripts/CONTENT_MIGRATION_GUIDE.md`
