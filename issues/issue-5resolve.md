# Issue 5 Resolution: Location Placement In Headings

## Problem

Admin users needed control over where the city/location appears in service-location page headings.

Example need:

```text
Best Lawyers in Delhi
Delhi Legal Support
Property Dispute Help in Noida
```

The existing toggle only controlled whether `in City` was appended to the end.

## Existing Behavior

The code already supported a location heading append toggle:

```text
Append "in City" to heading on location pages
```

But it did not clearly guide admins on exact placement.

## Code Fixes Made

### Admin guidance

File:

```text
frontend/src/components/admin/SectionCard.jsx
```

Change:

- Added guidance that admins can use `{city}` inside a heading for exact placement.

Example:

```text
Best Lawyers in {city}
```

### Renderer safety

File:

```text
frontend/src/pages/LocationPageDynamic.jsx
```

Change:

- The location page heading renderer now defensively replaces `{city}` before deciding whether to append a city.

## How Admin Should Use It

Use `{city}` when exact placement is needed:

```text
Heading: Best Lawyers in {city}
Output: Best Lawyers in Delhi
```

Use the append toggle when the city should simply go at the end:

```text
Heading: Property Dispute Help
Toggle on
Output: Property Dispute Help in Delhi
```

Turn the append toggle off when no city should be added.
