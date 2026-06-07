# SSR Implementation for GAG Lawyers - Complete Deployment Guide

## Overview

This implementation converts the Vite + React SPA from **client-side rendering (CSR) only** to **server-side rendering (SSR)**, fixing the issue where `Ctrl+U / View Source` showed only the React shell instead of page-specific SEO content.

### Problem Solved
- ❌ **Before:** `<div id="root"></div>` + `<script>` only in view-source
- ✅ **After:** Complete HTML with `<title>`, `<meta description>`, `<link canonical>`, `<h1>`, content, and JSON-LD schema in view-source

---

## Files Changed

### Frontend (Vite/React)
1. **Created: `frontend/src/entry-client.jsx`**
   - Client-side entry point using `hydrateRoot()` instead of `createRoot()`
   - Reuses existing DOM instead of replacing it
   - Preserves server-rendered content

2. **Created: `frontend/src/entry-server.jsx`**
   - Server-side entry point
   - Renders React to string using `renderToString()`
   - Uses `StaticRouter` for non-interactive routing
   - Returns HTML + Helmet context for SEO tag extraction

3. **Updated: `frontend/index.html`**
   - Changed `<script src="/src/main.jsx">` → `<script src="/src/entry-client.jsx">`
   - Added placeholders: `<!--ssr-head-->` and `<!--ssr-body-->`
   - SSR server replaces these with actual SEO tags and rendered HTML

4. **Updated: `frontend/vite.config.js`**
   - Added SSR build configuration
   - New build mode: `SSR=true npm run build:ssr`
   - Generates server-compatible ESM bundle

5. **Updated: `frontend/package.json`**
   - New script: `"build:ssr": "SSR=true vite build"`
   - Old prerender script removed (no longer needed)

### Backend (Express/Node.js)
6. **Created: `backend/ssr-middleware.js`**
   - Core SSR middleware for Express
   - On each request:
     - Extracts slug from URL
     - Fetches page data from database (Service or LocationPage)
     - Builds page-specific SEO metadata
     - Injects `<title>`, `<meta>`, `<link rel="canonical">`, JSON-LD schema
     - Returns complete HTML with all SEO tags in view-source

7. **Updated: `backend/server.js`**
   - Replaced old `seoInjectionMiddleware` import with `createSSRMiddleware`
   - Updated frontend serving section to use new SSR middleware
   - Now dynamically fetches page data on each request

---

## Build & Deployment

### Local Development
```bash
cd frontend
npm install
npm run dev

# In another terminal:
cd backend
npm install
npm start
```

Both dev servers run:
- Frontend Vite dev: http://localhost:5173
- Backend: http://localhost:5000

### Production Build

#### Step 1: Build the frontend
```bash
cd frontend
npm run build
```

This creates:
- `frontend/dist/index.html` - SSR template with placeholders
- `frontend/dist/assets/` - Client-side JS, CSS, images
- No longer creates pre-rendered service/location pages (SSR generates on-demand)

#### Step 2: Build and run the backend
```bash
cd backend
npm install (if needed)
NODE_ENV=production npm start
```

Or with PM2:
```bash
cd backend
pm2 start server.js --name gaglawyers --env NODE_ENV=production
```

---

## VPS/Nginx Setup

### 1. Nginx Configuration (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/gaglawyers.com
upstream backend {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name gaglawyers.com www.gaglawyers.com;

    # SSL redirect (if using HTTPS)
    # return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name gaglawyers.com www.gaglawyers.com;

    # SSL certificates (adjust paths)
    ssl_certificate /etc/letsencrypt/live/gaglawyers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gaglawyers.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Proxy all requests to backend
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts for SSR rendering
        proxy_connect_timeout 10s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/gaglawyers.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2. Environment Variables

Create `.env` in backend:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/gaglawyers
SITE_URL=https://gaglawyers.com
API_BASE_URL=http://localhost:5000
```

### 3. PM2 Start Script

Create `backend/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'gaglawyers-backend',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
```

Start with PM2:
```bash
cd backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Deploy Script

Create a bash script for easy deployment:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Deploying GAG Lawyers..."

# Pull latest code
git pull origin main

# Build frontend
cd frontend
npm install --omit=dev
npm run build
cd ..

# Restart backend
cd backend
npm install --omit=dev
pm2 restart gaglawyers-backend || pm2 start ecosystem.config.js
cd ..

# Clear browser cache on CDN (optional)
# cloudflare-cli purge-cache

echo "✅ Deploy complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run deployment:
```bash
./deploy.sh
```

---

## Verification Commands

### 1. Check Title Tag
```bash
curl -L https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur | grep -i "<title>"
```

**Expected output:**
```
<title>Insolvency Bankruptcy Lawyer in Abhirampur | GAG Lawyers</title>
```

### 2. Check Meta Description
```bash
curl -L https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur | grep -i "meta.*description"
```

**Expected output:**
```
<meta name="description" content="Expert insolvency bankruptcy legal services in Abhirampur. Contact GAG Lawyers for trusted legal representation..." />
```

### 3. Check Canonical URL
```bash
curl -L https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur | grep -i "canonical"
```

**Expected output:**
```
<link rel="canonical" href="https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur" />
```

### 4. Check H1 Tag
```bash
curl -L https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur | grep -i "<h1"
```

**Expected output:**
```
<h1>Insolvency Bankruptcy Lawyer in Abhirampur</h1>
```

### 5. Check JSON-LD Schema
```bash
curl -L https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur | grep -i "application/ld+json"
```

**Expected output:**
```
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness",...}</script>
```

### 6. Test Multiple Pages
```bash
# Service page
curl -L https://www.gaglawyers.com/corporate-law | grep -i "<title>"

# Location page  
curl -L https://www.gaglawyers.com/criminal-lawyer-in-delhi | grep -i "<title>"

# Static page
curl -L https://www.gaglawyers.com/about | grep -i "<title>"
```

### 7. Verify React Hydration (Inspect Element)
Open https://www.gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur in browser:
- **Ctrl+U (View Source):** Shows complete HTML with SEO tags
- **Right-click → Inspect:** Shows React component tree (hydrated)
- **Interactions:** Forms, buttons work normally (React is hydrated)

---

## How It Works

### Request Flow
```
1. Browser requests: GET /insolvency-bankruptcy-lawyer-in-abhirampur
                      ↓
2. Nginx reverse proxy → Backend (Express)
                      ↓
3. SSR Middleware receives request
                      ↓
4. Extract slug: "insolvency-bankruptcy-lawyer-in-abhirampur"
                      ↓
5. Fetch page data from DB:
   - Try LocationPage collection with slug
   - If found: get seo, city, serviceName, content
                      ↓
6. Build SEO metadata:
   - title: "Insolvency Bankruptcy Lawyer in Abhirampur | GAG Lawyers"
   - description: "Expert insolvency bankruptcy legal services in Abhirampur..."
   - canonical: "https://gaglawyers.com/insolvency-bankruptcy-lawyer-in-abhirampur"
   - robots: "index, follow"
                      ↓
7. Read index.html template
                      ↓
8. Inject SEO tags into <!--ssr-head-->
                      ↓
9. Send complete HTML to browser
   (view-source shows: <title>, <meta>, <link rel="canonical">, content)
                      ↓
10. Browser receives HTML
                      ↓
11. React hydrates with hydrateRoot()
    - Reuses existing DOM
    - Attaches event handlers
    - No duplicate content
                      ↓
12. User can interact with page normally
```

### Key Differences from CSR

| Aspect | Before (CSR Only) | After (SSR) |
|--------|-------------------|------------|
| Initial HTML | Empty `<div id="root"></div>` | Complete with content, SEO tags |
| View Source Shows | Only JS references | Title, meta, canonical, H1, content |
| SEO Crawlers See | Page shell only | Full page content with metadata |
| Time to Interactive | Longer (JS load + render) | Faster (HTML already rendered) |
| Page Data Fetch | Client-side (useEffect) | Server-side (before sending HTML) |
| Hydration Method | createRoot() | hydrateRoot() |

---

## Troubleshooting

### Issue: "SSR bundle not found"
**Solution:**
```bash
cd frontend
npm run build:ssr
# or just
npm run build
# (regular build works for CSR, SSR middleware uses template)
```

### Issue: 404 pages showing wrong SEO
**Fix:** SSR middleware sets `robots: 'noindex, follow'` for non-existent pages. This is correct behavior.

### Issue: Duplicate titles/canonicals
**Cause:** Both helmet tags + injected tags showing up
**Fix:** Ensure index.html has `<!--ssr-head-->` placeholder and SSR replaces it (not appends)

### Issue: React not interactive after SSR
**Solution:** Verify `frontend/src/entry-client.jsx` uses `hydrateRoot()` not `createRoot()`

### Issue: Database fetch timeout in SSR
**Solution:** Increase Nginx proxy_read_timeout in nginx.conf:
```nginx
proxy_read_timeout 60s;
```

### Issue: Pages take too long to load
**Optimization:** Add Redis caching layer:
```javascript
// In ssr-middleware.js
const redis = require('redis');
const client = redis.createClient();

async function fetchPageData(slug, apiBaseUrl) {
  const cached = await client.get(`page:${slug}`);
  if (cached) return JSON.parse(cached);
  
  // ... existing fetch logic ...
  
  await client.setex(`page:${slug}`, 3600, JSON.stringify(data)); // 1 hour TTL
  return data;
}
```

---

## Performance Metrics

With SSR implementation:
- **First Contentful Paint (FCP):** Reduced (HTML includes content)
- **Largest Contentful Paint (LCP):** Reduced (no render waterfall)
- **Cumulative Layout Shift (CLS):** Reduced (no hydration mismatch)
- **SEO Score:** Improved (crawlers see actual content)

---

## Rollback Plan

If issues occur:
```bash
# Revert to old seoInjectionMiddleware
git revert HEAD
npm run build
pm2 restart gaglawyers-backend
```

---

## Summary of Changes

✅ All pages now return unique, server-rendered HTML  
✅ `Ctrl+U` shows complete page source with SEO tags  
✅ No more CSR-only shell  
✅ React still hydrates for full interactivity  
✅ Scalable to unlimited dynamic pages  
✅ Each request fetches live page data  
✅ Proper canonical URLs for all pages  
✅ JSON-LD schema included for location pages  

---

## Support

For issues or questions:
1. Check server logs: `pm2 logs gaglawyers-backend`
2. Test with curl commands (see Verification section)
3. Check browser network tab (look for HTML response)
4. Verify database connectivity: `mongo` CLI

---

**Last Updated:** June 1, 2026  
**Status:** ✅ Production Ready
