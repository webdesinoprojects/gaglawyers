# Service Update Scripts

This directory contains scripts to update AFT, Bail, and CAT services with comprehensive content including hero images, content blocks, document checklists, popular cases, FAQs, and SEO keywords.

## Available Scripts

### Individual Service Update Scripts

1. **update-aft-service.js** - Updates Armed Forces Tribunal service
2. **update-bail-service.js** - Updates Bail & Anticipatory Bail service
3. **update-cat-service.js** - Updates CAT (Central Administrative Tribunal) service

### Combined Script

4. **update-all-three-services.js** - Updates all three services in one go

## How to Run

### Prerequisites

Make sure you have:
- MongoDB connection configured in `.env` file
- `MONGODB_URI` environment variable set
- Node.js installed

### Running Individual Scripts

```bash
# Update AFT service only
node backend/update-aft-service.js

# Update Bail service only
node backend/update-bail-service.js

# Update CAT service only
node backend/update-cat-service.js
```

### Running All Updates at Once

```bash
# Update all three services
node backend/update-all-three-services.js
```

## What Gets Updated

Each script updates the following fields for the respective service:

### 1. Hero Image
- High-quality Unsplash image relevant to the service category

### 2. Overview
- Comprehensive overview text for the service page

### 3. Content Blocks
- Multiple sections with headings and detailed paragraphs
- Covers various aspects like:
  - Service introduction
  - Functions and procedures
  - Rights and remedies
  - Role of lawyers
  - How Grover & Grover helps

### 4. Document Checklist
- List of required documents for the service
- 8-10 items per service

### 5. Popular Cases
- 3 landmark Supreme Court/High Court cases
- Case names with year and brief description

### 6. FAQs
- 5 frequently asked questions with detailed answers
- Covers common queries about the service

### 7. SEO Keywords
- 10-15 relevant keywords for search optimization
- Includes location-based and service-specific terms

## Service Slugs

The scripts look for services with these slugs:
- AFT: `armed-forces-tribunal-lawyer`
- Bail: `bail-anticipatory-bail-lawyer`
- CAT: `cat-central-administrative-tribunal-lawyer`

## Output

Each script will:
1. Connect to MongoDB
2. Find the service by slug
3. Update all fields with new content
4. Save the changes
5. Display success/error messages
6. Close the database connection

## Notes

- These scripts will **overwrite** existing content in the specified fields
- Make sure to backup your database before running if needed
- The scripts are idempotent - you can run them multiple times safely
- If a service is not found, the script will display an error message

## Troubleshooting

### Service Not Found
If you see "service not found" error:
1. Check if the service exists in the database
2. Verify the slug matches exactly
3. Check MongoDB connection

### Connection Error
If you see connection errors:
1. Verify `MONGODB_URI` in `.env` file
2. Check if MongoDB is running
3. Verify network connectivity

## Related Files

- `backend/models/Service.js` - Service model with all fields
- `backend/update-agreement-to-sell.js` - Example script for Agreement to Sell service
- `SERVICE_PAGE_LAYOUT_STANDARDIZATION.md` - Documentation on the standardization effort
