# SEO Deployment Checklist

## 🚀 Pre-Deployment

### Backend Environment Variables
Ensure these are set in your production environment (Vercel/Heroku/etc.):

```env
SITE_URL=https://gaglawyers.com
```

This is critical for:
- Sitemap.xml generation
- Robots.txt generation
- Canonical URLs

### Frontend Environment Variables
Set in Vercel Dashboard or production environment:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Get this from Google Analytics (https://analytics.google.com)

---

## 📋 Deployment Steps

### 1. Deploy Backend
```bash
cd backend
# Ensure SITE_URL is set to production URL
# Deploy to your hosting (Vercel/Heroku/etc.)
```

### 2. Deploy Frontend
```bash
cd frontend
# Ensure VITE_GA_MEASUREMENT_ID is set
# Deploy to Vercel
```

### 3. Verify URLs
After deployment, check these URLs work:

- [ ] https://gaglawyers.com/robots.txt
- [ ] https://gaglawyers.com/sitemap.xml
- [ ] https://gaglawyers.com/ (homepage)

---

## ✅ Post-Deployment Verification

### Test Robots.txt
```bash
curl https://gaglawyers.com/robots.txt
```

Expected output:
```
# Robots.txt for GAG Lawyers
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://gaglawyers.com/sitemap.xml
```

### Test Sitemap.xml
```bash
curl https://gaglawyers.com/sitemap.xml
```

Should return XML with all pages.

### Test Meta Tags
1. Visit https://gaglawyers.com
2. Right-click → View Page Source
3. Check for:
   - `<title>` tag
   - `<meta name="description">`
   - `<link rel="canonical">`
   - `<script type="application/ld+json">`

### Test Google Analytics
1. Visit your website
2. Go to Google Analytics → Real-time
3. Should see your visit

---

## 🔍 Search Engine Submission

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: https://gaglawyers.com
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: https://gaglawyers.com/sitemap.xml
5. Request indexing for homepage

### Bing Webmaster Tools (Optional)
1. Go to https://www.bing.com/webmasters
2. Add site: gaglawyers.com
3. Verify ownership
4. Submit sitemap: https://gaglawyers.com/sitemap.xml

---

## 📊 Monitoring Setup

### Google Analytics
- [ ] Property created
- [ ] Measurement ID added to environment
- [ ] Real-time tracking verified
- [ ] Goals configured (optional)

### Google Search Console
- [ ] Property verified
- [ ] Sitemap submitted
- [ ] No coverage errors
- [ ] Mobile usability OK

---

## ✅ Final Checks

- [ ] All pages load correctly
- [ ] No console errors
- [ ] Meta tags unique per page
- [ ] Images have alt text
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Google Analytics tracking
- [ ] Mobile-friendly
- [ ] HTTPS enabled
- [ ] No broken links

---

## 🎉 Success!

Your website is now:
- ✅ Fully SEO optimized
- ✅ Search engine ready
- ✅ Analytics enabled
- ✅ AI-friendly

**Wait 2-4 weeks for search engine indexing and ranking improvements.**
