# Issue 4 Resolution: Footer Location Page Management

## Problem

The footer has a location section, but the admin controls could feel fixed or unreliable.

The admin had two controls:

```text
Location Manager: show/hide individual pages in footer
Site Settings: footerLocationSlugs manual list
```

But the API behavior did not match the Site Settings note.

## Root Cause

When `footerLocationSlugs` was configured, the backend still mixed in pinned `showInFooter` pages and required the manual pages to also have `showInFooter: true`.

That made the manual list not exact.

The frontend also used session storage and in-memory footer caching, so old footer links could stay visible after admin changes.

## Code Fixes Made

### Footer API

File:

```text
backend/controllers/locationController.js
```

Changes:

- If `footerLocationSlugs` is set, the footer now shows exactly those active location pages in that order.
- Manual footer slugs no longer need `showInFooter: true`.
- If `footerLocationSlugs` is empty, the normal `showInFooter` toggle behavior still works.
- Added `Cache-Control: no-store` for footer location API responses.

### Footer frontend cache

File:

```text
frontend/src/components/Footer.jsx
```

Changes:

- Bumped footer cache key from `v7` to `v8`.
- Footer links now fetch with `cache: no-store`.

## How Admin Should Use It

Option 1: exact footer list

```text
Admin -> Site Settings -> Footer Locations -> Location Slugs
```

Add one slug per line. Footer will use exactly that list/order.

Option 2: simple toggle mode

Leave the manual slug list empty, then use:

```text
Admin -> Location Manager -> show/hide footer button
```

## Verification After Deploy

Change one footer slug in admin, save it, then hard refresh the public site.

Expected:

```text
Footer location list changes according to admin setting.
No old cached list remains.
```
