# Issue 3 Resolution: Canonical Tag And Duplicate URL Reports

## Problem

Google Search Console showed canonical-related reports:

```text
Alternative page with proper canonical tag: 200 URLs
Duplicate, Google chose different canonical than user: 40 URLs
```

The shared canonical sheet contained URL rows for pages Google had crawled.

## Meaning

This does not always mean every listed page is broken. It means Google saw duplicate URL variants and decided another URL should be canonical.

Common examples:

```text
https://www.gaglawyers.com/services/
https://gaglawyers.com/services
https://www.gaglawyers.com/service-location-page
https://gaglawyers.com/service-location-page
```

If the source HTML is missing a canonical tag or mixes `www`, non-`www`, and trailing slashes, Google can pick a different canonical.

## Code Fixes Made

File:

```text
backend/middleware/seoInjection.js
```

Changes:

- Normalizes public page paths by removing trailing slashes except `/`.
- Redirects production `www.gaglawyers.com` HTML routes to the configured canonical host from `SITE_URL`.
- Injects one canonical tag for each public HTML page.
- Keeps canonical URLs in the format:

```text
https://gaglawyers.com/path
```

## Required Production Setting

Set this backend environment variable:

```bash
SITE_URL=https://gaglawyers.com
NODE_ENV=production
```

If the final preferred domain is different, change `SITE_URL` to that exact domain and keep it consistent everywhere.

## Verification After Deploy

Run:

```bash
curl -I https://www.gaglawyers.com/services/
```

Expected:

```text
301 redirect to https://gaglawyers.com/services
```

Then run:

```bash
curl -L https://gaglawyers.com/services | grep -i canonical
```

Expected:

```html
<link rel="canonical" href="https://gaglawyers.com/services" />
```

After this is live, validate the canonical issue in Search Console.
