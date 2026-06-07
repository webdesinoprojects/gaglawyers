# Database Inspection Scripts - User Guide

## Overview

Two scripts are available to inspect your MongoDB database and verify data integrity, especially image storage formats.

---

## Scripts Available

### 1. Quick Inspection (`inspect-database.js`)
**Purpose:** Fast overview of all collections and image storage

**Run:**
```bash
cd backend
npm run inspect
```

**What it shows:**
- Total documents per collection
- Sample document from each collection
- Image analysis (Cloudinary vs External vs Missing)
- Potential issues

**Use when:** You want a quick health check

---

### 2. Detailed Check (`detailed-db-check.js`)
**Purpose:** Comprehensive analysis with color-coded output and recommendations

**Run:**
```bash
cd backend
npm run check
```

**What it shows:**
- Database connection details
- Field validation for each collection
- Detailed image analysis with sample URLs
- PublicId presence check
- Document structure examples
- Health score
- Actionable recommendations

**Use when:** You need detailed diagnostics or troubleshooting

---

## Understanding the Output

### Image Storage Categories

#### 1. Cloudinary Images ✅
```
https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/abc123.jpg
```
- **Good:** Stored on Cloudinary CDN
- **Fast:** Served from global CDN
- **Managed:** Can be deleted via API
- **Optimized:** Automatic format/quality optimization

#### 2. External Images ⚠️
```
https://images.unsplash.com/photo-1234567890/image.jpg
```
- **OK for dev:** Fine for testing/development
- **Not managed:** Won't be deleted when document is removed
- **Not optimized:** No automatic optimization
- **Action needed:** Replace with Cloudinary images for production

#### 3. Missing Images ❌
```
imageUrl: ""
or
imageUrl: null
```
- **Issue:** Document expects image but has none
- **Impact:** Broken images on frontend
- **Action needed:** Upload images through admin panel

---

## Image Format in Database

### Correct Format (Cloudinary)

**TeamMember Example:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "designation": "Senior Partner",
  "imageUrl": "https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/team-john-doe.jpg",
  "cloudinaryPublicId": "gaglawyers/team-john-doe",
  "order": 1,
  "createdAt": "2026-03-30T10:00:00.000Z",
  "updatedAt": "2026-03-30T10:00:00.000Z"
}
```

**Key Fields:**
- `imageUrl`: Full Cloudinary URL (for display)
- `cloudinaryPublicId`: Cloudinary identifier (for deletion)

**BlogPost Example:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Understanding Corporate Law",
  "slug": "understanding-corporate-law",
  "featuredImage": "https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/blog-corporate-law.jpg",
  "featuredImagePublicId": "gaglawyers/blog-corporate-law",
  "author": "507f1f77bcf86cd799439013",
  "isPublished": true,
  "views": 42
}
```

**Note:** BlogPost uses `featuredImage` and `featuredImagePublicId` instead of `imageUrl` and `cloudinaryPublicId`.

---

## Common Issues and Solutions

### Issue 1: Cloudinary Images Without PublicId

**Symptom:**
```
⚠️  TeamMembers: 3 Cloudinary images without publicId
```

**Problem:**
- Images are on Cloudinary but publicId is missing
- Can't be deleted automatically when document is removed
- Orphaned images accumulate in Cloudinary

**Solution:**
1. Go to admin panel
2. Edit the affected documents
3. Re-upload the images (this will set publicId)
4. Or manually add publicId by extracting from URL

**Extract publicId from URL:**
```
URL: https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/team-john.jpg
PublicId: gaglawyers/team-john
```

---

### Issue 2: External Images (Unsplash, etc.)

**Symptom:**
```
⚠️  5 external images (won't be cleaned up)
```

**Problem:**
- Images hosted on external services (Unsplash, etc.)
- Fine for development/testing
- Not managed by your system
- Won't be deleted when documents are removed

**Solution:**
1. Download the images
2. Upload through admin panel
3. Cloudinary will host them
4. PublicId will be set automatically

---

### Issue 3: Missing Images

**Symptom:**
```
❌ 2 documents have missing images
```

**Problem:**
- Documents have empty imageUrl field
- Broken images on frontend

**Solution:**
1. Go to admin panel
2. Edit the affected documents
3. Upload images

---

### Issue 4: Empty Database

**Symptom:**
```
⚠️  Database is empty. Run seed script to populate with sample data.
```

**Solution:**
```bash
cd backend
npm run seed
```

This will create:
- 1 admin user
- 4 team members
- 6 services
- 3 awards
- 3 gallery images
- 2 blog posts
- 3 reviews
- 6 site settings

---

## Health Score Interpretation

### 100% Healthy ✅
```
✓ All images are properly stored in Cloudinary with publicIds!
```
- All images on Cloudinary
- All have publicIds
- Ready for production

### 80-99% Good ⚠️
```
⚠ 85% of Cloudinary images have publicIds. Good, but can be improved.
```
- Most images properly configured
- Some missing publicIds
- Action: Fix the remaining images

### Below 80% Needs Attention ❌
```
✗ Only 60% of Cloudinary images have publicIds. Needs attention.
```
- Many images missing publicIds
- Potential orphaned images
- Action: Re-upload images through admin panel

---

## Sample Output

### Quick Inspection
```
🔍 DATABASE INSPECTION STARTING...

📦 TEAM MEMBERS
--------------------------------------------------------------------------------
Total documents: 4

📸 Image Analysis:
  - Cloudinary images: 4
  - External images: 0
  - Missing images: 0
  - Has publicId field: Yes

📄 Sample Document:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Advocate Rajesh Grover",
  "designation": "Senior Partner & Founder",
  "bio": "Over 30 years of experience...",
  "imageUrl": "https://res.cloudinary.com/dmp2lsw2b/...",
  "cloudinaryPublicId": "gaglawyers/team-rajesh",
  "order": 1
}

📊 SUMMARY
--------------------------------------------------------------------------------
Total Collections: 11
Total Documents: 25

📸 Image Storage:
  - Cloudinary images: 15
  - External images: 0
  - Missing images: 0

✅ No issues found!
```

### Detailed Check (Color-coded in terminal)
```
🔍 DETAILED DATABASE INSPECTION
================================================================================
✓ Connected to MongoDB
ℹ Database: gaglawyers
ℹ Host: cluster0.bbzseyk.mongodb.net

📦 TeamMembers
--------------------------------------------------------------------------------
ℹ Total documents: 4

ℹ Field Check:
✓ name: Present in all documents
✓ designation: Present in all documents
✓ bio: Present in all documents
✓ order: Present in all documents

ℹ 📸 Image Analysis:
  Cloudinary images: 4
  External images: 0
  Missing images: 0
  With publicId: 4
  Without publicId: 0

ℹ Sample Image URLs:
  1. https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/team-1.jpg
     PublicId: gaglawyers/team-1

📊 FINAL REPORT
================================================================================
ℹ Total Collections: 11
ℹ Total Documents: 25

📸 Image Storage Summary:
  Cloudinary images: 15
  External images: 0
  Missing images: 0
  With publicId: 15
  Without publicId: 0

⚠️  ISSUES FOUND:
✓ No issues detected!

✅ HEALTH CHECK:
✓ All images are properly stored in Cloudinary with publicIds!
```

---

## When to Run These Scripts

### Daily Development
```bash
npm run inspect
```
Quick check to ensure everything is working

### Before Deployment
```bash
npm run check
```
Comprehensive check to catch any issues

### After Seed Script
```bash
npm run seed
npm run check
```
Verify seed data is correct

### After Bulk Operations
```bash
npm run check
```
Verify data integrity after importing/migrating data

### Troubleshooting
```bash
npm run check
```
Detailed diagnostics when something seems wrong

---

## Advanced Usage

### Check Specific Collection

Modify the script to focus on one collection:

```javascript
// In detailed-db-check.js
const collections = [
  { name: 'TeamMembers', model: TeamMember, hasImage: true, ... },
  // Comment out others
];
```

### Export Report to File

```bash
npm run check > database-report.txt
```

### Check Production Database

Update `.env` temporarily:
```env
MONGO_URI=mongodb+srv://user:pass@production-cluster.mongodb.net/gaglawyers
```

Run check:
```bash
npm run check
```

**Important:** Change back to development URI after checking!

---

## Troubleshooting the Scripts

### Error: Cannot connect to MongoDB

**Check:**
1. MongoDB is running (local) or accessible (Atlas)
2. `.env` file has correct `MONGO_URI`
3. Network connection is stable

### Error: Model not found

**Check:**
1. All model files exist in `backend/models/`
2. Model names match imports in script

### Script hangs

**Possible causes:**
1. Large database (increase timeout)
2. Network issues
3. MongoDB connection pool exhausted

**Solution:**
```bash
# Kill the process
Ctrl+C

# Try again
npm run check
```

---

## Best Practices

### 1. Regular Checks
Run `npm run inspect` daily during development

### 2. Pre-Deployment Validation
Always run `npm run check` before deploying to production

### 3. Document Issues
Save output to file for tracking:
```bash
npm run check > reports/db-check-$(date +%Y%m%d).txt
```

### 4. Fix Issues Immediately
Don't let missing publicIds accumulate

### 5. Monitor Image Storage
Keep external images to minimum in production

---

## Summary

**Two scripts, two purposes:**

1. **`npm run inspect`** - Quick health check
2. **`npm run check`** - Detailed diagnostics

**What they verify:**
- ✅ All collections have data
- ✅ Required fields are present
- ✅ Images are properly stored
- ✅ PublicIds exist for Cloudinary images
- ✅ No orphaned images

**When to use:**
- Daily: Quick inspect
- Before deploy: Detailed check
- Troubleshooting: Detailed check
- After seed: Either one

**Goal:** Ensure database integrity and proper image management for production readiness.
