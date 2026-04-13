require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug, buildLocationPageSlug } = require('./utils/slugify');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('âœ… MongoDB connected\n');
  } catch (error) {
    console.error('âŒ MongoDB connection error:', error);
    process.exit(1);
  }
};

// EXACTLY 25 services - no more, no less
const EXACT_25_SERVICES = [
  "Armed Forces Tribunal (AFT) Cases",
  "Bail Lawyer",
  "CAT (Central Administrative Tribunal) Matters",
  "Cheque Bounce Cases",
  "Civil Law & Civil Disputes",
  "Contract Dispute Cases",
  "Corporate Law Services",
  "Criminal Defense Cases",
  "Cyber Crime Cases",
  "Divorce & Matrimonial Cases",
  "Debt Recovery (DRT) Cases",
  "Employment & Labour Law Cases",
  "Family Law Disputes",
  "High Court Litigation",
  "Immigration Law Services",
  "Insolvency & Bankruptcy Cases",
  "Insurance Claim & Dispute Cases",
  "Landlord-Tenant Disputes",
  "Motor Accident Claims",
  "NCLT & Company Law Matters",
  "Property & Real Estate Disputes",
  "Supreme Court Litigation",
  "Tax & GST Disputes",
  "Trademark & IP Rights",
  "Wills & Succession Planning"
];

const fixEverything = async () => {
  try {
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('ðŸ”§ FIX EVERYTHING - Clean Database & Regenerate');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    await connectDB();

    // STEP 1: Delete ALL location pages
    console.log('ðŸ—‘ï¸  Step 1: Deleting ALL location pages...');
    const deletedPages = await LocationPage.deleteMany({});
    console.log(`   âœ… Deleted ${deletedPages.deletedCount} pages\n`);

    // STEP 2: Clean up services - keep ONLY the 25 we want
    console.log('ðŸ§¹ Step 2: Cleaning services (keeping only 25)...');
    const allServices = await Service.find({});
    console.log(`   Found ${allServices.length} services in database`);
    
    // Delete services NOT in our list of 25
    const servicesToKeep = new Set(EXACT_25_SERVICES);
    let deletedServices = 0;
    
    for (const service of allServices) {
      const serviceName = service.name || service.title;
      if (!servicesToKeep.has(serviceName)) {
        await Service.deleteOne({ _id: service._id });
        console.log(`   âŒ Deleted: ${serviceName}`);
        deletedServices++;
      }
    }
    
    console.log(`   âœ… Deleted ${deletedServices} extra services\n`);

    // STEP 3: Ensure all 25 services exist
    console.log('ðŸ“ Step 3: Ensuring all 25 services exist...');
    const serviceMap = new Map();
    
    for (const serviceName of EXACT_25_SERVICES) {
      let service = await Service.findOne({ name: serviceName });
      
      if (!service) {
        service = await Service.create({
          name: serviceName,
          title: serviceName,
          slug: generateSlug(serviceName),
          category: 'litigation',
          shortDescription: `Professional ${serviceName.toLowerCase()} services.`,
          longDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers.`,
          description: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers.`,
          iconName: 'Scale'
        });
        console.log(`   âœ… Created: ${serviceName}`);
      } else {
        console.log(`   âœ“ Exists: ${serviceName}`);
      }
      
      serviceMap.set(serviceName, service);
    }
    
    const finalServiceCount = await Service.countDocuments();
    console.log(`\n   ðŸ“Š Final service count: ${finalServiceCount}`);
    
    if (finalServiceCount !== 25) {
      console.log(`   âš ï¸  WARNING: Expected 25 services, got ${finalServiceCount}!`);
      process.exit(1);
    }
    
    console.log(`   âœ… Perfect! Exactly 25 services\n`);

    // STEP 4: Load and clean locations
    console.log('ðŸ“ Step 4: Loading locations...');
    const { locations } = require('./seed-1702-locations');
    const uniqueLocations = [...new Set(locations)];
    
    console.log(`   Original: ${locations.length} locations`);
    console.log(`   Unique: ${uniqueLocations.length} locations`);
    console.log(`   Duplicates removed: ${locations.length - uniqueLocations.length}\n`);

    // STEP 5: Generate ALL location pages
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('ðŸ”¨ Step 5: Generating location pages...');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');
    console.log(`   Services: ${EXACT_25_SERVICES.length}`);
    console.log(`   Locations: ${uniqueLocations.length}`);
    console.log(`   Total to generate: ${EXACT_25_SERVICES.length * uniqueLocations.length}\n`);

    let totalCreated = 0;
    const BATCH_SIZE = 100;
    const locationPages = [];

    for (let i = 0; i < EXACT_25_SERVICES.length; i++) {
      const serviceName = EXACT_25_SERVICES[i];
      const serviceDoc = serviceMap.get(serviceName);
      const serviceId = serviceDoc._id;
      
      console.log(`   [${i + 1}/${EXACT_25_SERVICES.length}] ${serviceName}`);
      
      for (const city of uniqueLocations) {
        const slug = buildLocationPageSlug(serviceDoc.slug, city);
        
        locationPages.push({
          service: serviceId,
          serviceName: serviceName,
          city: city,
          slug: slug,
          content: {
            heading: `${serviceName} in ${city}`,
            intro: `GAG Lawyers provides expert ${serviceName.toLowerCase()} services in ${city}. Contact us for professional legal assistance.`,
            sections: [
              {
                title: `Why Choose Our ${serviceName} Services in ${city}`,
                content: `Expert legal representation in ${city} for ${serviceName.toLowerCase()}.`
              },
              {
                title: 'Our Approach',
                content: `We provide comprehensive legal solutions tailored to your needs.`
              },
              {
                title: `Contact Our ${city} Legal Team`,
                content: `Get in touch with our experienced advocates in ${city} today.`
              }
            ]
          },
          seo: {
            title: `${serviceName} in ${city} | GAG Lawyers`,
            description: `Expert ${serviceName.toLowerCase()} services in ${city}. Contact GAG Lawyers for professional legal assistance.`,
            keywords: `${serviceName.toLowerCase()}, ${city}, lawyers, advocates`,
            h1: `${serviceName} in ${city}`
          },
          isActive: true,
          views: 0
        });

        if (locationPages.length >= BATCH_SIZE) {
          await LocationPage.insertMany(locationPages);
          totalCreated += locationPages.length;
          process.stdout.write(`\r   âœ… Progress: ${totalCreated}/${EXACT_25_SERVICES.length * uniqueLocations.length} pages`);
          locationPages.length = 0;
        }
      }
    }

    // Insert remaining
    if (locationPages.length > 0) {
      await LocationPage.insertMany(locationPages);
      totalCreated += locationPages.length;
    }

    console.log('\n\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
    console.log('âœ… COMPLETE!');
    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    const finalPageCount = await LocationPage.countDocuments();
    const finalServices = await Service.countDocuments();
    const uniqueCities = await LocationPage.distinct('city');

    console.log('ðŸ“Š FINAL SUMMARY:');
    console.log(`   Services in DB: ${finalServices}`);
    console.log(`   Unique locations: ${uniqueCities.length}`);
    console.log(`   Total pages: ${finalPageCount}`);
    console.log(`   Expected: ${finalServices} Ã— ${uniqueCities.length} = ${finalServices * uniqueCities.length}`);
    
    if (finalPageCount === finalServices * uniqueCities.length && finalServices === 25) {
      console.log('\n   âœ… PERFECT! Everything is correct!\n');
    } else {
      console.log('\n   âš ï¸  Something is wrong:\n');
      if (finalServices !== 25) {
        console.log(`   - Services: Expected 25, got ${finalServices}`);
      }
      if (finalPageCount !== finalServices * uniqueCities.length) {
        console.log(`   - Pages: Expected ${finalServices * uniqueCities.length}, got ${finalPageCount}`);
      }
    }

    console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n');

    process.exit(0);
  } catch (error) {
    console.error('\nâŒ Error:', error);
    process.exit(1);
  }
};

fixEverything();


