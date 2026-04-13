require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
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
    console.log('ðŸ”„ LOCATION SLUG MIGRATION');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    // Get all services
    const services = await Service.find({}).sort({ order: 1 });
    console.log(`ðŸ“‹ Found ${services.length} services\n`);

    // Get all location pages
    const totalLocations = await LocationPage.countDocuments();
    console.log(`ðŸ“ Found ${totalLocations} location pages to migrate\n`);

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    // Get unique service names from location pages
    const uniqueServiceNames = await LocationPage.distinct('serviceName');
    console.log(`ðŸ“ Found ${uniqueServiceNames.length} unique service names in location pages\n`);

    // Process each service name
    for (const serviceName of uniqueServiceNames) {
      const newSlug = serviceNameToNewSlug[serviceName];

      if (!newSlug) {
        console.log(`âš ï¸  No mapping found for service: ${serviceName}`);
        continue;
      }

      console.log(`\nðŸ”„ Processing: ${serviceName}`);
      console.log(`   New slug pattern: ${newSlug}-lawyer-in-{city}`);

      // Get all location pages for this service name
      const locationPages = await LocationPage.find({ serviceName: serviceName });
      console.log(`   Found ${locationPages.length} location pages`);

      let serviceUpdated = 0;
      let serviceErrors = 0;
      let serviceSkipped = 0;

      // Update each location page
      for (const page of locationPages) {
        try {
          // Generate new slug using the new service slug pattern
          const newLocationSlug = buildLocationPageSlug(newSlug, page.city);
          
          // Skip if slug is already correct
          if (page.slug === newLocationSlug) {
            serviceSkipped++;
            totalSkipped++;
            continue;
          }
          
          // Check if new slug already exists (to avoid duplicates)
          const existing = await LocationPage.findOne({ 
            slug: newLocationSlug,
            _id: { $ne: page._id }
          });

          if (existing) {
            console.log(`   âš ï¸  Duplicate slug would be created for ${page.city}, skipping`);
            serviceErrors++;
            totalErrors++;
            continue;
          }

          // Update the slug
          await LocationPage.updateOne(
            { _id: page._id },
            { $set: { slug: newLocationSlug } }
          );

          serviceUpdated++;
          totalUpdated++;

          // Show progress every 200 updates
          if (serviceUpdated % 200 === 0) {
            process.stdout.write(`\r   âœ… Updated: ${serviceUpdated}/${locationPages.length}`);
          }
        } catch (error) {
          console.error(`\n   âŒ Error updating ${page.city}:`, error.message);
          serviceErrors++;
          totalErrors++;
        }
      }

      if (serviceUpdated > 0) {
        console.log(`\r   âœ… Updated: ${serviceUpdated}/${locationPages.length}`);
      }
      if (serviceSkipped > 0) {
        console.log(`   â­ï¸  Skipped: ${serviceSkipped} (already correct)`);
      }
      if (serviceErrors > 0) {
        console.log(`   âš ï¸  Errors: ${serviceErrors}`);
      }
    }

    console.log('\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('âœ… MIGRATION COMPLETE!');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');
    console.log(`ðŸ“Š SUMMARY:`);
    console.log(`   âœ… Updated: ${totalUpdated} location pages`);
    console.log(`   â­ï¸  Skipped: ${totalSkipped} location pages (no change needed)`);
    if (totalErrors > 0) {
      console.log(`   âŒ Errors: ${totalErrors} location pages`);
    }
    console.log(`\nðŸŽ‰ Location slugs have been migrated!\n`);

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('ðŸ“ EXAMPLES OF NEW SLUGS:');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    // Show some examples
    const samplePages = await LocationPage.find({ city: 'Delhi' }).limit(5);
    samplePages.forEach(page => {
      console.log(`   ${page.slug}`);
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


