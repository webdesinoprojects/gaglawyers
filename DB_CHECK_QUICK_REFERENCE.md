# Database Check - Quick Reference

## Commands

```bash
# Quick inspection (30 seconds)
cd backend
npm run inspect

# Detailed check with recommendations (1 minute)
cd backend
npm run check

# Seed database with sample data
cd backend
npm run seed
```

---

## What Gets Checked

### Collections (11 total)
- ✅ Users
- ✅ Team Members
- ✅ Services
- ✅ Awards
- ✅ Gallery Images
- ✅ Blog Posts
- ✅ Reviews
- ✅ Contact Inquiries
- ✅ Page Content
- ✅ Location Pages
- ✅ Site Settings

### Image Storage (6 collections with images)
- Team Members → `imageUrl` + `cloudinaryPublicId`
- Awards → `imageUrl` + `cloudinaryPublicId`
- Gallery Images → `imageUrl` + `cloudinaryPublicId`
- Blog Posts → `featuredImage` + `featuredImagePublicId`
- Reviews → `imageUrl` + `cloudinaryPublicId`

---

## Image Format Examples

### ✅ Correct (Cloudinary with PublicId)
```json
{
  "imageUrl": "https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/team-john.jpg",
  "cloudinaryPublicId": "gaglawyers/team-john"
}
```

### ⚠️ Warning (External Image)
```json
{
  "imageUrl": "https://images.unsplash.com/photo-1234567890/image.jpg",
  "cloudinaryPublicId": ""
}
```

### ❌ Issue (Cloudinary without PublicId)
```json
{
  "imageUrl": "https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/team-john.jpg",
  "cloudinaryPublicId": ""
}
```

### ❌ Issue (Missing Image)
```json
{
  "imageUrl": "",
  "cloudinaryPublicId": ""
}
```

---

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Missing publicId | Re-upload image via admin panel |
| External images | Download → Upload via admin panel |
| Missing images | Upload images via admin panel |
| Empty database | Run `npm run seed` |

---

## Health Score

- **100%** = All Cloudinary images have publicIds ✅
- **80-99%** = Most images OK, some need fixing ⚠️
- **<80%** = Many issues, needs attention ❌

---

## Output Files

Save reports for tracking:
```bash
npm run check > db-report-$(date +%Y%m%d).txt
```

---

## Quick Troubleshooting

**Can't connect to MongoDB?**
- Check `.env` has correct `MONGO_URI`
- Verify MongoDB is running

**Script hangs?**
- Press Ctrl+C
- Check network connection
- Try again

**No data found?**
- Run `npm run seed` first
- Check database name in connection string

---

## Before Deployment Checklist

```bash
# 1. Check database
npm run check

# 2. Verify output shows:
✓ No missing publicIds
✓ No external images (or minimal)
✓ All collections have data
✓ Health score 100%

# 3. If issues found:
- Fix via admin panel
- Re-run check
- Repeat until 100%
```

---

## Pro Tips

1. Run `npm run inspect` daily
2. Run `npm run check` before deploy
3. Save reports to track changes
4. Fix issues immediately
5. Keep external images minimal in production

---

**Remember:** Proper image storage = No orphaned files + Automatic cleanup + Production ready
