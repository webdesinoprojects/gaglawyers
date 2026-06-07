# Issue 1 Resolution: Location Page Metadata In Source HTML

## Problem

Location pages had SEO metadata in the backend/database, but many live location page URLs showed generic metadata in `Ctrl+U` / page source.

Example affected URLs:

- `https://www.gaglawyers.com/criminal-lawyer-in-karkarduma`
- `https://www.gaglawyers.com/sale-deed-lawyer-in-delhi`
- `https://www.gaglawyers.com/family-lawyer-in-goalpara`

Observed in raw HTML source:

```text
title: GAG Lawyers
description: Generic homepage description
canonical: missing
og:title: missing
```

But the API had complete metadata:

```text
/api/locations/slug/criminal-lawyer-in-karkarduma
seo.title: Criminal Lawyer in Karkarduma - GAG Lawyers
seo.description: present
seo.keywords: present
seo.h1: present
content.heading: present
content.intro: present
```

## Why Inspect And Ctrl+U Differ

`Ctrl+U` shows the original HTML returned by the server.

Normal browser Inspect shows the DOM after React JavaScript has loaded and updated the page.

The site was serving many public routes as a static Vite SPA fallback. That means nginx/Vercel could return the same generic `index.html` for routes like:

```text
/criminal-lawyer-in-karkarduma
```

Then React fetched page data later and updated metadata in the browser. This can make Inspect look correct while `Ctrl+U` stays generic.

## Root Cause

The official domain was not pointing to Vercel during inspection.

Observed production routing:

```text
gaglawyers.com A record: 187.127.159.234
www.gaglawyers.com A record: 187.127.159.234
nameservers: ns1.dns-parking.com, ns2.dns-parking.com
server header: nginx/1.24.0 (Ubuntu)
```

So the production issue is mainly on the current VPS/nginx deployment path, not only a Vercel setting.

The backend already has SEO injection middleware, but it only works when the backend serves the built frontend HTML.

Relevant files:

- `backend/middleware/seoInjection.js`
- `backend/server.js`
- `frontend/src/pages/LocationPageDynamic.jsx`
- `frontend/scripts/prerender-seo.mjs`

## Code Changes Made

### 1. Location page frontend metadata alignment

File:

```text
frontend/src/pages/LocationPageDynamic.jsx
```

Changes:

- Use saved `seo.title` instead of always rebuilding the title.
- Use saved `seo.description` / `seo.metaDescription`.
- Use saved `seo.keywords`.
- Pass canonical in both location template branches.
- Use location `content.heading` and `content.intro` for the service-template hero where possible.

This keeps hydrated browser metadata closer to the backend/admin metadata.

### 2. Backend server startup safety

File:

```text
backend/server.js
```

Change:

- Only call `app.listen()` when running `server.js` directly.
- Keep exporting `app` safely for serverless/import usage.

This avoids duplicate server starts when `backend/api/index.js` imports the app.

## Verification Done

Frontend build passed:

```bash
cd frontend
npm run build
```

Backend import check passed:

```bash
cd backend
node -e "const app=require('./server'); console.log(typeof app);"
```

Local build showed:

```text
Fetched 0 service pages.
Prerendered SEO HTML for 8 routes.
```

Reason: local `VITE_API_URL` was not set. This confirms static prerender is fragile unless build-time API env is configured correctly.

## Recommended Production Fix

Use backend-served HTML for the official domain.

That means nginx should proxy public page requests to the backend, and the backend should serve `frontend/dist` through `seoInjectionMiddleware`.

### Server env needed

```bash
NODE_ENV=production
PORT=5000
SITE_URL=https://gaglawyers.com
FRONTEND_DIST_PATH=/path/to/gaglawyers/frontend/dist
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Build frontend on server

```bash
cd /path/to/gaglawyers/frontend
npm ci
npm run build
```

### Install and run backend

```bash
cd /path/to/gaglawyers/backend
npm ci
pm2 start server.js --name gaglawyers --update-env
pm2 save
```

### nginx public route should proxy to backend

```nginx
location / {
  proxy_pass http://127.0.0.1:5000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Avoid using this for public HTML routes:

```nginx
try_files $uri /index.html;
```

That static fallback is what causes generic source metadata on location pages.

## If Moving To Vercel Later

Do not point the official domain to a frontend-only static Vercel project. The same `Ctrl+U` issue can return.

If using Vercel, first deploy a setup where dynamic HTML is generated or injected for public routes.

General Vercel domain records:

```text
apex/root domain A record: 76.76.21.21
www CNAME: cname.vercel-dns.com
```

Use the exact records shown in the Vercel project domain screen.

## Final Check After Deployment

Run:

```bash
curl -L https://www.gaglawyers.com/criminal-lawyer-in-karkarduma | grep -iE "<title>|canonical|description|og:title"
```

Expected result:

```text
title: Criminal Lawyer in Karkarduma - GAG Lawyers
description: location-specific description
canonical: https://gaglawyers.com/criminal-lawyer-in-karkarduma
og:title: location-specific title
```

