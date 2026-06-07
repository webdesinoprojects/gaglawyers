# Issue 6 Resolution: Services Page Loading Lag And Markdown Text

## Problem

The services page and service-location pages sometimes loaded slowly. The user also reported that service cards could show markdown-like text on hover or during display.

This can contribute to a poor user experience and can also make Google see thin content if server HTML is generic.

## Root Cause

Several public pages depended on API data after the React app loaded.

The services page also passed API/admin text directly into card summaries. If that text contained markdown, HTML, or formatting markers, the UI could show those characters instead of clean text.

## Code Fixes Made

### Services page

File:

```text
frontend/src/pages/Services.jsx
```

Changes:

- Added display-text cleanup for service title, summary, and image alt text.
- Strips common markdown and HTML markers before rendering cards.
- Added in-memory service list cache.
- Removed unused hover state from service grid cards to reduce extra rerenders.
- Fetches latest service list with `cache: no-store`.

### Reusable service card

File:

```text
frontend/src/components/ServiceCard.jsx
```

Changes:

- Added the same cleanup before rendering title and description.

### Dynamic pages

Files:

```text
frontend/src/pages/ServicePageDynamic.jsx
frontend/src/pages/LocationPageDynamic.jsx
```

Changes:

- Added in-memory cache for dynamic service pages.
- Added in-memory cache for dynamic location pages.
- Location pages fetch service/template data in parallel with location data.

## Verification After Deploy

Open:

```text
/services
```

Expected:

```text
Cards show clean summaries without markdown symbols.
Hovering cards does not flash markdown text.
Navigation to service and location pages feels faster after first load.
```

For GSC soft 404 prevention, this frontend fix must be used with the backend SEO source HTML fix from issue 2.
