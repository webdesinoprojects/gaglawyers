# Seed Blogs and Testimonials Script

This script adds 5 professional blog posts and 3 client testimonials to your database.

## What Gets Added

### Blog Posts (5)
1. **Understanding Criminal Defense Rights in India** - Criminal Law
2. **Real Estate Law: Key Changes in 2026** - Real Estate Law
3. **Corporate Compliance: Essential Checklist for 2026** - Corporate Law
4. **Family Law: Understanding Child Custody Rights** - Family Law
5. **Intellectual Property: Protecting Your Brand in the Digital Age** - Intellectual Property

Each blog post includes:
- Professional legal content with proper HTML formatting
- Featured images from Unsplash
- Categories and tags
- SEO metadata
- Published status with dates
- View counts

### Testimonials (3)
1. **Rajesh Kumar** - CEO, TechVision Solutions (Corporate Law)
2. **Priya Sharma** - Real Estate Developer (Property Law)
3. **Amit Patel** - Business Owner (Criminal Defense)

Each testimonial includes:
- Client name and designation
- Detailed review content
- 5-star rating
- Featured status
- Professional profile images

## How to Run

### Prerequisites
- MongoDB connection configured in `.env` file
- Node.js installed
- All dependencies installed (`npm install`)

### Run the Script

```bash
cd backend
node seed-blogs-testimonials.js
```

### Expected Output

```
✓ MongoDB Connected

📝 Seeding Blog Posts...
  ✓ Created blog: "Understanding Criminal Defense Rights in India"
  ✓ Created blog: "Real Estate Law: Key Changes in 2026"
  ✓ Created blog: "Corporate Compliance: Essential Checklist for 2026"
  ✓ Created blog: "Family Law: Understanding Child Custody Rights"
  ✓ Created blog: "Intellectual Property: Protecting Your Brand in the Digital Age"

💬 Seeding Testimonials...
  ✓ Created testimonial from: "Rajesh Kumar"
  ✓ Created testimonial from: "Priya Sharma"
  ✓ Created testimonial from: "Amit Patel"

============================================================
✓ SEEDING COMPLETED SUCCESSFULLY
============================================================
📊 Database Summary:
   • Total Blog Posts: 5 (5 published)
   • Total Testimonials: 3 (3 featured)
============================================================
```

## Features

### Smart Duplicate Prevention
- Checks for existing blogs by slug
- Checks for existing testimonials by client name and content
- Skips duplicates automatically
- Safe to run multiple times

### Admin User Creation
- Automatically creates an admin user if one doesn't exist
- Email: `admin@gaglawyers.com`
- Password: `admin123` (change this after first login!)
- All blog posts are associated with this admin user

### Data Quality
- All content is professionally written
- Proper HTML formatting with headings, lists, and blockquotes
- SEO-friendly slugs and metadata
- Realistic view counts and dates
- High-quality stock images from Unsplash

## Verification

After running the script, verify the data:

### Check Blogs
```bash
# In MongoDB shell or Compass
db.blogposts.find({ isPublished: true }).count()
```

### Check Testimonials
```bash
# In MongoDB shell or Compass
db.reviews.find({ isFeatured: true }).count()
```

### View in Application
1. Visit homepage: `http://localhost:5173/` - See latest 3 blogs and testimonials
2. Visit blog page: `http://localhost:5173/blog` - See all blog posts
3. Individual blog: `http://localhost:5173/blog/understanding-criminal-defense-rights-india`

## Customization

To add your own content, edit the `blogPosts` and `testimonials` arrays in `seed-blogs-testimonials.js`:

```javascript
const blogPosts = [
  {
    title: 'Your Blog Title',
    slug: 'your-blog-slug',
    excerpt: 'Brief description...',
    content: '<h2>Your HTML content...</h2>',
    category: 'Your Category',
    tags: ['tag1', 'tag2'],
    // ... other fields
  },
];
```

## Troubleshooting

### Error: MongoDB Connection Failed
- Check your `.env` file has correct `MONGODB_URI`
- Ensure MongoDB is running
- Verify network connectivity

### Error: Admin User Creation Failed
- Check if user with email already exists
- Verify User model is properly configured
- Check password hashing middleware

### Duplicate Key Error
- This means data already exists
- Script will skip duplicates automatically
- Safe to ignore if intentional

## Notes

- Script is idempotent (safe to run multiple times)
- Existing data is preserved
- Only new content is added
- Admin user password should be changed after first use
- Images are hosted on Unsplash (external URLs)

## Related Scripts

- `seed.js` - Seeds initial services and settings
- `seed-services.js` - Seeds 25 legal services
- `seed-1702-locations.js` - Seeds location pages
- `fix-everything.js` - Cleans and regenerates location pages
