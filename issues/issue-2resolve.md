# Issue 2 Resolution: Soft 404 On Service Location Pages

## Problem

Google Search Console reported many service/location URLs as `Soft 404`.

From the shared sheet:

```text
Issue: Soft 404
Affected URL table: 477 URLs
Last crawled: 2026-05-29
```

Examples checked from the sheet showed valid public URLs returning the same thin SPA HTML:

```text
title: GAG Lawyers
canonical: missing
body: only frontend root shell
status: 200
```

That can look like a weak or empty page to Google even if React later loads the correct content in the browser.

## Root Cause

The current production domain was serving frontend fallback HTML for many dynamic location URLs. The server response did not include page-specific body content or page-specific SEO tags in source HTML.

Google judges the first server response more strictly than a human browser after JavaScript finishes.

## Code Fixes Made

### Backend raw HTML fallback

File:

```text
backend/middleware/seoInjection.js
```

Changes:

- Injects a real fallback `<main>` into the server HTML for indexable public pages.
- Uses the page-specific title and description in that fallback body.
- Keeps non-existent pages as real `404` with `noindex`.

This gives Google meaningful source HTML instead of only:

```html
<div id="root"></div>
```

### Faster client loading

Files:

```text
frontend/src/pages/LocationPageDynamic.jsx
frontend/src/pages/ServicePageDynamic.jsx
frontend/src/pages/Services.jsx
```

Changes:

- Added in-memory cache for service pages.
- Added in-memory cache for location pages.
- Location pages now fetch service template data in parallel with the location page request.
- Services list reuses cached data while refreshing in the background.

## Deployment Requirement

This fix only works on production if public page requests go through the backend SEO middleware.

Do not serve dynamic public pages only with:

```nginx
try_files $uri /index.html;
```

Use backend proxy for public routes:

```nginx
location / {
  proxy_pass http://127.0.0.1:5000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Verification After Deploy

Run:

```bash
curl -L https://gaglawyers.com/contract-lawyer-in-jor-bagh
```

Expected:

```text
200 status
location-specific <title>
location-specific meta description
self canonical
visible fallback <main> content in source HTML
```

Then in Search Console, open the Soft 404 issue and click `Validate fix`.
