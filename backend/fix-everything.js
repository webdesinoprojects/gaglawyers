require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug } = require('./utils/slugify');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// EXACTLY 25 services - no more, no less
const EXACT_25_SERVICES = [
  "Armed Forces Tribunal (AFT) Cases",
  "Bail & Anticipatory Bail Cases",
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
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔧 FIX EVERYTHING - Clean Database & Regenerate');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await connectDB();

    // STEP 1: Delete ALL location pages
    console.log('🗑️  Step 1: Deleting ALL location pages...');
    const deletedPages = await LocationPage.deleteMany({});
    console.log(`   ✅ Deleted ${deletedPages.deletedCount} pages\n`);

    // STEP 2: Clean up services - keep ONLY the 25 we want
    console.log('🧹 Step 2: Cleaning services (keeping only 25)...');
    const allServices = await Service.find({});
    console.log(`   Found ${allServices.length} services in database`);
    
    // Delete services NOT in our list of 25
    const servicesToKeep = new Set(EXACT_25_SERVICES);
    let deletedServices = 0;
    
    for (const service of allServices) {
      const serviceName = service.name || service.title;
      if (!servicesToKeep.has(serviceName)) {
        await Service.deleteOne({ _id: service._id });
        console.log(`   ❌ Deleted: ${serviceName}`);
        deletedServices++;
      }
    }
    
    console.log(`   ✅ Deleted ${deletedServices} extra services\n`);

    // STEP 3: Ensure all 25 services exist
    console.log('📝 Step 3: Ensuring all 25 services exist...');
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
        console.log(`   ✅ Created: ${serviceName}`);
      } else {
        console.log(`   ✓ Exists: ${serviceName}`);
      }
      
      serviceMap.set(serviceName, service._id);
    }
    
    const finalServiceCount = await Service.countDocuments();
    console.log(`\n   📊 Final service count: ${finalServiceCount}`);
    
    if (finalServiceCount !== 25) {
      console.log(`   ⚠️  WARNING: Expected 25 services, got ${finalServiceCount}!`);
      process.exit(1);
    }
    
    console.log(`   ✅ Perfect! Exactly 25 services\n`);

    // STEP 4: Load and clean locations
    console.log('📍 Step 4: Loading locations...');
    const { locations } = require('./seed-1702-locations');
    const uniqueLocations = [...new Set(locations)];
    
    console.log(`   Original: ${locations.length} locations`);
    console.log(`   Unique: ${uniqueLocations.length} locations`);
    console.log(`   Duplicates removed: ${locations.length - uniqueLocations.length}\n`);

    // STEP 5: Generate ALL location pages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔨 Step 5: Generating location pages...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`   Services: ${EXACT_25_SERVICES.length}`);
    console.log(`   Locations: ${uniqueLocations.length}`);
    console.log(`   Total to generate: ${EXACT_25_SERVICES.length * uniqueLocations.length}\n`);

    let totalCreated = 0;
    const BATCH_SIZE = 100;
    const locationPages = [];

    for (let i = 0; i < EXACT_25_SERVICES.length; i++) {
      const serviceName = EXACT_25_SERVICES[i];
      const serviceId = serviceMap.get(serviceName);
      
      console.log(`   [${i + 1}/${EXACT_25_SERVICES.length}] ${serviceName}`);
      
      for (const city of uniqueLocations) {
        const slug = generateSlug(`${serviceName}-${city}`);
        
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
          process.stdout.write(`\r   ✅ Progress: ${totalCreated}/${EXACT_25_SERVICES.length * uniqueLocations.length} pages`);
          locationPages.length = 0;
        }
      }
    }

    // Insert remaining
    if (locationPages.length > 0) {
      await LocationPage.insertMany(locationPages);
      totalCreated += locationPages.length;
    }

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const finalPageCount = await LocationPage.countDocuments();
    const finalServices = await Service.countDocuments();
    const uniqueCities = await LocationPage.distinct('city');

    console.log('📊 FINAL SUMMARY:');
    console.log(`   Services in DB: ${finalServices}`);
    console.log(`   Unique locations: ${uniqueCities.length}`);
    console.log(`   Total pages: ${finalPageCount}`);
    console.log(`   Expected: ${finalServices} × ${uniqueCities.length} = ${finalServices * uniqueCities.length}`);
    
    if (finalPageCount === finalServices * uniqueCities.length && finalServices === 25) {
      console.log('\n   ✅ PERFECT! Everything is correct!\n');
    } else {
      console.log('\n   ⚠️  Something is wrong:\n');
      if (finalServices !== 25) {
        console.log(`   - Services: Expected 25, got ${finalServices}`);
      }
      if (finalPageCount !== finalServices * uniqueCities.length) {
        console.log(`   - Pages: Expected ${finalServices * uniqueCities.length}, got ${finalPageCount}`);
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
};

fixEverything();
