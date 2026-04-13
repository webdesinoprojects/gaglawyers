require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const { buildLocationPageSlug } = require('./utils/slugify');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('âœ… MongoDB connected\n');
  } catch (error) {
    console.error('âŒ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service name to new slug mapping
const serviceNameToNewSlug = {
  'Armed Forces Tribunal (AFT) Cases': 'armed-force-tribunal',
  'Bail Lawyer': 'bail',
  'CAT (Central Administrative Tribunal) Matters': 'cat-matters',
  'Contract Dispute Cases': 'contract',
  'Civil Law & Civil Disputes': 'civil',
  'Cheque Bounce Cases': 'cheque-bounce',
  'Insurance Claim & Dispute Cases': 'insurance',
  'High Court Litigation': 'high-court',
  'Cyber Crime Cases': 'cyber-crime',
  'Employment & Labour Law Cases': 'employment',
  'Insolvency & Bankruptcy Cases': 'insolvency-bankruptcy',
  'Corporate Law Services': 'corporate',
  'Immigration Law Services': 'immigration',
  'Debt Recovery (DRT) Cases': 'debt-recovery-drt',
  'Landlord-Tenant Disputes': 'landlord-tenant',
  'Criminal Defense Cases': 'criminal',
  'Divorce & Matrimonial Cases': 'divorce',
  'Family Law Disputes': 'family',
  'Writ Petition & Public Interest Litigation (PIL)': 'writ-petition',
  'Property Law & Real Estate Disputes': 'property',
  'Sexual Harassment & 498A Cases': 'sexual-harassment-section-498a',
  'Legal Notice & Documentation': 'legal-notice',
  'Motor Accident & MACT Cases': 'motor-accident-mact',
  'Supreme Court Litigation': 'supreme-court',
  'Mediation & Arbitration (ADR)': 'mediation-and-arbitration'
};

const migrateLocationSlugs = async () => {
  try {
    await connectDB();

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('ðŸ”„ LOCATION SLUG MIGRATION (BULK MODE)');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    const totalLocations = await LocationPage.countDocuments();
    console.log(`ðŸ“ Found ${totalLocations} location pages to migrate\n`);

    const uniqueServiceNames = await LocationPage.distinct('serviceName');
    console.log(`ðŸ“ Found ${uniqueServiceNames.length} unique service names\n`);

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    let totalUpdated = 0;
    let totalSkipped = 0;

    // Process each service name
    for (const serviceName of uniqueServiceNames) {
      const newSlug = serviceNameToNewSlug[serviceName];

      if (!newSlug) {
        console.log(`âš ï¸  No mapping found for service: ${serviceName}`);
        continue;
      }

      console.log(`ðŸ”„ Processing: ${serviceName}`);
      console.log(`   New slug pattern: ${newSlug}-lawyer-in-{city}`);

      // Get all location pages for this service name
      const locationPages = await LocationPage.find({ serviceName: serviceName }).lean();
      console.log(`   Found ${locationPages.length} location pages`);

      // Prepare bulk operations
      const bulkOps = [];
      
      for (const page of locationPages) {
        const newLocationSlug = buildLocationPageSlug(newSlug, page.city);
        
        // Skip if slug is already correct
        if (page.slug === newLocationSlug) {
          totalSkipped++;
          continue;
        }

        bulkOps.push({
          updateOne: {
            filter: { _id: page._id },
            update: { $set: { slug: newLocationSlug } }
          }
        });
      }

      if (bulkOps.length > 0) {
        const result = await LocationPage.bulkWrite(bulkOps, { ordered: false });
        totalUpdated += result.modifiedCount;
        console.log(`   âœ… Updated: ${result.modifiedCount} pages`);
      } else {
        console.log(`   â­ï¸  All pages already have correct slugs`);
      }
      console.log('');
    }

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('âœ… MIGRATION COMPLETE!');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');
    console.log(`ðŸ“Š SUMMARY:`);
    console.log(`   âœ… Updated: ${totalUpdated} location pages`);
    console.log(`   â­ï¸  Skipped: ${totalSkipped} location pages (already correct)`);
    console.log(`\nðŸŽ‰ Location slugs have been migrated!\n`);

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('ðŸ“ EXAMPLES OF NEW SLUGS FOR DELHI:');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    // Show examples for Delhi
    const delhiPages = await LocationPage.find({ city: 'Delhi' }).sort({ serviceName: 1 }).limit(10);
    delhiPages.forEach((page, i) => {
      console.log(`   ${i + 1}. ${page.slug}`);
    });

    console.log('\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    process.exit(0);
  } catch (error) {
    console.error('âŒ Fatal error:', error);
    process.exit(1);
  }
};

// Run the migration
migrateLocationSlugs();


