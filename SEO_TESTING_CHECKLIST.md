# SEO Testing Checklist

## ✅ Pre-Deployment Testing

### 1. Local Development Testing

#### Test Robots.txt
```bash
# Start your backend server
cd backend
npm start

# In browser, visit:
http://localhost:5000/robots.txt
```

**Expected Output**:
```
# Robots.txt for GAG Lawyers
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1
Sitemap: https://gaglawyers.com/sitemap.xml
```

#### Test Sitemap.xml
```bash
# In browser, visit:
http://localhost:5000/sitemap.xml
```

**Expected**: XML file with all pages listed

#### Test Meta Tags on Pages
```bash
# Start frontend
cd frontend
npm run dev

# Visit: http://localhost:5173
# Right-click → View Page Source
# Check for:
```

**Required Tags**:
- `<title>` - Should be unique per page
- `<meta name="description">` - Should be unique per page
- `<meta name="keywords">` - Should be relevant
- `<link rel="canonical">` - Should match current URL
- `<meta property="og:title">` - For social sharing
- `<meta property="og:description">` - For social sharing
- `<meta property="og:image">` - For social sharing
- `<meta name="twitter:card">` - For Twitter
- `<script type="application/ld+json">` - Structured data

### 2. Component Testing

#### Test SEOHead Component
Create a test page or check existing pages:

```jsx
// Should render without errors
<SEOHead 
  title="Test Page | GAG Lawyers"
  description="Test description"
  keywords="test, keywords"
/>
```

#### Test GoogleAnalytics Component
```jsx
// Should not throw errors even without GA ID
<GoogleAnalytics measurementId="" />

// Should load GA script with valid ID
<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
```

#### Test SEOHeading Component
```jsx
// Should render h1
<SEOHeading level={1}>Title</SEOHeading>

// Should render h2
<SEOHeading level={2}>Subtitle</SEOHeading>
```

#### Test SEOImage Component
```jsx
// Should have alt text
<SEOImage src="/test.jpg" alt="Test image" />

// Should have fallback alt
<SEOImage src="/test.jpg" />
```

---

## 🚀 Post-Deployment Testing

### 1. Production URL Tests

#### Test Robots.txt
```
Visit: https://gaglawyers.com/robots.txt
Status: Should return 200 OK
Content-Type: text/plain
```

#### Test Sitemap.xml
```
Visit: https://gaglawyers.com/sitemap.xml
Status: Should return 200 OK
Content-Type: application/xml
```

### 2. Page-by-Page Testing

Test these pages for proper SEO:

#### Home Page
- [ ] URL: https://gaglawyers.com/
- [ ] Title: Contains "GAG Lawyers"
- [ ] H1: One main heading
- [ ] Meta description: Present and descriptive
- [ ] Canonical: https://gaglawyers.com/
- [ ] Structured data: Organization, WebSite

#### About Page
- [ ] URL: https://gaglawyers.com/about
- [ ] Title: Contains "About"
- [ ] H1: One main heading
- [ ] Meta description: Present
- [ ] Canonical: https://gaglawyers.com/about

#### Services Page
- [ ] URL: https://gaglawyers.com/services
- [ ] Title: Contains "Services"
- [ ] H1: One main heading
- [ ] Meta description: Present
- [ ] Canonical: https://gaglawyers.com/services

#### Individual Service Page
- [ ] URL: https://gaglawyers.com/[service-slug]
- [ ] Title: Contains service name
- [ ] H1: Service name
- [ ] Meta description: Service-specific
- [ ] Canonical: Correct URL
- [ ] Structured data: Service schema

#### Blog Post
- [ ] URL: https://gaglawyers.com/blog/[slug]
- [ ] Title: Contains post title
- [ ] H1: Post title
- [ ] Meta description: Post excerpt
- [ ] Canonical: Correct URL
- [ ] Structured data: Article schema
- [ ] Author information
- [ ] Published date

#### Location Page
- [ ] URL: https://gaglawyers.com/[service]/[city]
- [ ] Title: Contains service and city
- [ ] H1: Service in City
- [ ] Meta description: Location-specific
- [ ] Canonical: Correct URL
- [ ] Structured data: LocalBusiness

#### Contact Page
- [ ] URL: https://gaglawyers.com/contact
- [ ] Title: Contains "Contact"
- [ ] H1: One main heading
- [ ] Meta description: Present
- [ ] Canonical: https://gaglawyers.com/contact

---

## 🔍 SEO Validation Tools

### 1. Google Rich Results Test
```
URL: https://search.google.com/test/rich-results
Test: https://gaglawyers.com
Expected: Valid structured data, no errors
```

**Check for**:
- Organization schema
- WebSite schema
- WebPage schema
- Article schema (on blog posts)
- Service schema (on service pages)
- Breadcrumb schema

### 2. Google Mobile-Friendly Test
```
URL: https://search.google.com/test/mobile-friendly
Test: https://gaglawyers.com
Expected: Page is mobile-friendly
```

### 3. PageSpeed Insights
```
URL: https://pagespeed.web.dev/
Test: https://gaglawyers.com
Expected: 
- Performance: 80+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
```

### 4. Schema Markup Validator
```
URL: https://validator.schema.org/
Test: https://gaglawyers.com
Expected: Valid JSON-LD, no errors
```

### 5. Meta Tags Checker
```
URL: https://metatags.io/
Test: https://gaglawyers.com
Expected: All meta tags present and correct
```

### 6. Open Graph Debugger
```
URL: https://developers.facebook.com/tools/debug/
Test: https://gaglawyers.com
Expected: Proper OG tags, image preview
```

### 7. Twitter Card Validator
```
URL: https://cards-dev.twitter.com/validator
Test: https://gaglawyers.com
Expected: Valid Twitter card, image preview
```

---

## 📊 Google Analytics Testing

### 1. Real-Time Testing
```
1. Set up Google Analytics
2. Visit your website
3. Go to GA Dashboard → Real-time
4. Should see your visit in real-time
```

### 2. Page View Testing
```
1. Visit multiple pages
2. Check GA Real-time → Events
3. Should see page_view events
```

### 3. Route Change Testing
```
1. Navigate between pages (SPA routing)
2. Check GA Real-time
3. Should track each route change
```

---

## 🔧 Technical SEO Checks

### 1. HTTP Headers
```bash
curl -I https://gaglawyers.com/sitemap.xml
```

**Expected**:
```
HTTP/2 200
content-type: application/xml
cache-control: public, max-age=3600
```

```bash
curl -I https://gaglawyers.com/robots.txt
```

**Expected**:
```
HTTP/2 200
content-type: text/plain
cache-control: public, max-age=86400
```

### 2. Canonical URLs
Check that canonical URLs:
- [ ] Are absolute (include domain)
- [ ] Match the current page URL
- [ ] Don't have trailing slashes inconsistently
- [ ] Use HTTPS

### 3. Heading Hierarchy
For each page, verify:
- [ ] Only ONE H1 tag
- [ ] H2 tags for major sections
- [ ] H3 tags for subsections
- [ ] No skipped levels (H1 → H3)
- [ ] Logical content structure

### 4. Image Optimization
Check that images:
- [ ] Have alt attributes
- [ ] Have descriptive alt text
- [ ] Use lazy loading
- [ ] Have proper dimensions
- [ ] Are optimized (compressed)

### 5. Internal Linking
Verify:
- [ ] Navigation links work
- [ ] Breadcrumbs are present
- [ ] Footer links work
- [ ] No broken internal links

---

## 🌐 Search Engine Submission

### Google Search Console
- [ ] Property added
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] No errors in coverage report
- [ ] Mobile usability: No issues
- [ ] Core Web Vitals: Good

### Bing Webmaster Tools
- [ ] Site added
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] No crawl errors

---

## 📱 Mobile Testing

### Responsive Design
Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (Chrome, Firefox, Safari)

### Mobile SEO
- [ ] Viewport meta tag present
- [ ] Text readable without zooming
- [ ] Tap targets properly sized
- [ ] No horizontal scrolling
- [ ] Fast loading on mobile

---

## 🎯 Content Quality Checks

### Meta Descriptions
- [ ] 150-160 characters
- [ ] Unique per page
- [ ] Compelling and descriptive
- [ ] Include target keywords
- [ ] Call-to-action when appropriate

### Page Titles
- [ ] 50-60 characters
- [ ] Unique per page
- [ ] Include brand name
- [ ] Include target keywords
- [ ] Descriptive and compelling

### Keywords
- [ ] Relevant to page content
- [ ] Not stuffed
- [ ] Natural placement
- [ ] Include long-tail keywords

### Content
- [ ] Original and unique
- [ ] Well-structured
- [ ] Proper grammar and spelling
- [ ] Valuable to users
- [ ] Regularly updated

---

## 🔒 Security & Performance

### HTTPS
- [ ] All pages use HTTPS
- [ ] No mixed content warnings
- [ ] Valid SSL certificate
- [ ] Redirects from HTTP to HTTPS

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Lazy loading enabled
- [ ] Caching configured

---

## 📋 Final Checklist

Before going live, ensure:

### Technical SEO
- [x] Robots.txt accessible
- [x] Sitemap.xml accessible
- [x] Canonical tags on all pages
- [x] Meta tags on all pages
- [x] Structured data on all pages
- [x] Heading hierarchy correct
- [x] Image alt text present
- [x] Mobile-friendly
- [x] Fast loading
- [x] HTTPS enabled

### Analytics & Tracking
- [ ] Google Analytics configured
- [ ] GA tracking code working
- [ ] Page views tracked
- [ ] Events tracked (optional)

### Search Engine Submission
- [ ] Google Search Console setup
- [ ] Sitemap submitted to Google
- [ ] Bing Webmaster Tools setup (optional)
- [ ] Sitemap submitted to Bing (optional)

### Content Quality
- [ ] Unique titles on all pages
- [ ] Unique descriptions on all pages
- [ ] Relevant keywords
- [ ] Quality content
- [ ] No duplicate content

### Validation
- [ ] Rich Results Test passed
- [ ] Mobile-Friendly Test passed
- [ ] PageSpeed Insights good scores
- [ ] Schema Markup valid
- [ ] No console errors

---

## 🎉 Success Criteria

Your SEO implementation is successful when:

1. ✅ All pages have proper meta tags
2. ✅ Structured data validates without errors
3. ✅ Sitemap is accessible and complete
4. ✅ Robots.txt is accessible
5. ✅ Google Analytics tracks page views
6. ✅ Mobile-friendly test passes
7. ✅ PageSpeed scores are good
8. ✅ No broken links
9. ✅ All images have alt text
10. ✅ Heading hierarchy is correct

---

## 📞 Troubleshooting

### Issue: Sitemap not accessible
**Solution**: Check backend server is running, verify route configuration

### Issue: Meta tags not showing
**Solution**: Check SEOHead component is imported and used on page

### Issue: Google Analytics not tracking
**Solution**: Verify VITE_GA_MEASUREMENT_ID is set correctly

### Issue: Structured data errors
**Solution**: Use Rich Results Test to identify specific errors

### Issue: Mobile-friendly test fails
**Solution**: Check viewport meta tag, test responsive design

---

**Testing Date**: _______________
**Tested By**: _______________
**Status**: _______________
**Notes**: _______________
