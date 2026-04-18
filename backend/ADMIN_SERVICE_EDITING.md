# Admin Guide: Editing Service Names and Slugs

## Overview
Service names and slugs are now fully editable through the CMS API. This allows you to customize service titles and URLs without requiring database access.

## API Endpoint

### Update Service
**Endpoint:** `PUT /api/services/:slug`

**Request Body:**
```json
{
  "name": "New Service Name",
  "slug": "new-service-slug",
  "seo": {
    "title": "SEO Title",
    "metaDescription": "SEO Description"
  },
  "sections": [
    // ... sections array (optional)
  ]
}
```

## Editing Service Name

To change a service name:

```javascript
// Example: Change "Bail Lawyer" to "Bail Application Lawyer"
PUT /api/services/bail-lawyer

{
  "name": "Bail Application Lawyer"
}
```

## Editing Service Slug

To change a service slug (URL):

```javascript
// Example: Change slug from "bail-lawyer" to "bail-application-lawyer"
PUT /api/services/bail-lawyer

{
  "slug": "bail-application-lawyer"
}
```

**Important Notes:**
- The new slug must be unique (not already used by another service)
- After changing the slug, use the NEW slug in future API calls
- Old URLs will no longer work after slug change

## Editing Both Name and Slug

```javascript
PUT /api/services/bail-lawyer

{
  "name": "Bail Application Lawyer",
  "slug": "bail-application-lawyer"
}
```

## Hero Subheading Format

All service hero sections now follow this format:
```
Expert Legal Services for [Service Description] - GAG Lawyers
```

Examples:
- "Expert Legal Services for Bail Applications and Criminal Defense - GAG Lawyers"
- "Expert Legal Services for Divorce and Family Law Matters - GAG Lawyers"
- "Expert Legal Services for Property Disputes and Real Estate Law - GAG Lawyers"

To update the hero subheading:

```javascript
PUT /api/services/bail-lawyer

{
  "sections": [
    {
      "type": "hero",
      "heading": "Bail Lawyer",
      "visible": true,
      "order": 0,
      "background": "dark",
      "content": {
        "subheading": "Expert Legal Services for Bail Applications and Criminal Defense - GAG Lawyers",
        "ctaText": "Call Us Now",
        "ctaLink": "/contact",
        "backgroundImageUrl": ""
      }
    }
    // ... other sections
  ]
}
```

## Complete Example

Here's a complete example of updating a service:

```javascript
PUT /api/services/bail-lawyer

{
  "name": "Bail Application Lawyer",
  "slug": "bail-application-lawyer",
  "seo": {
    "title": "Bail Application Lawyer in Delhi - Criminal Defense | GAG Lawyers",
    "metaDescription": "Expert bail application services in Delhi. Professional legal assistance for anticipatory bail, regular bail, and criminal defense matters."
  },
  "sections": [
    {
      "type": "hero",
      "heading": "Bail Application Lawyer",
      "visible": true,
      "order": 0,
      "background": "dark",
      "content": {
        "subheading": "Expert Legal Services for Bail Applications and Criminal Defense - GAG Lawyers",
        "ctaText": "Call Us Now",
        "ctaLink": "/contact",
        "backgroundImageUrl": ""
      }
    }
    // ... other sections remain the same
  ]
}
```

## Response

Successful response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Bail Application Lawyer",
    "slug": "bail-application-lawyer",
    "seo": { ... },
    "sections": [ ... ]
  }
}
```

Error response (slug already exists):
```json
{
  "success": false,
  "message": "Slug already exists"
}
```

## Best Practices

1. **Always update SEO when changing name/slug:**
   - Update the SEO title to match the new service name
   - Update the meta description if needed

2. **Update hero section when changing name:**
   - Update the hero heading to match the new service name
   - Update the hero subheading to follow the format

3. **Test the new slug:**
   - After changing, test the new URL: `/services/new-slug`
   - Ensure the old URL returns 404

4. **Backup before major changes:**
   - Consider exporting service data before making bulk changes
   - Keep a record of old slugs for redirect mapping if needed

## Frontend Integration

After updating service names/slugs, ensure your frontend:
1. Refreshes the services list
2. Updates any hardcoded links
3. Implements redirects from old URLs to new URLs (if needed)

## Bulk Updates

To update multiple services, you can create a script or use the API in a loop:

```javascript
const services = [
  { oldSlug: 'bail-lawyer', newName: 'Bail Application Lawyer', newSlug: 'bail-application-lawyer' },
  { oldSlug: 'divorce-lawyer', newName: 'Divorce and Family Lawyer', newSlug: 'divorce-family-lawyer' },
  // ... more services
];

for (const service of services) {
  await fetch(`/api/services/${service.oldSlug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: service.newName,
      slug: service.newSlug
    })
  });
}
```

## Troubleshooting

**Issue:** "Slug already exists" error
- **Solution:** Choose a different, unique slug

**Issue:** Service not found after slug change
- **Solution:** Use the NEW slug in API calls, not the old one

**Issue:** Hero subheading not updating
- **Solution:** Include the complete sections array in the update request

## Support

For technical support or questions about service editing, contact the development team.
