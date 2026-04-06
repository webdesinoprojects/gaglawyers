require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const fs = require('fs');
const path = require('path');
const { buildLocationPageSlug, generateSlug } = require('./utils/slugify');

// Read services and locations from JSON files
const servicesFile = path.join(__dirname, 'services.json');
const locationsFile = path.join(__dirname, 'locations.json');

// Generate content for location page
const generateContent = (serviceName, city) => {
  return {
    heading: `${serviceName} in ${city}`,
    intro: `Looking for expert ${serviceName.toLowerCase()} services in ${city}? GAG Lawyers - Grover & Grover Advocates provides comprehensive legal solutions tailored to your needs. Our experienced team of advocates specializes in ${serviceName.toLowerCase()} and has successfully handled numerous cases in ${city} and across India.`,
    sections: [
      {
        title: `Why Choose GAG Lawyers for ${serviceName} in ${city}?`,
        content: `Our firm brings decades of combined experience in ${serviceName.toLowerCase()} to clients in ${city}. We understand the local legal landscape and provide personalized attention to every case. Whether you're an individual, business, or organization in ${city}, our team is committed to protecting your interests and achieving the best possible outcomes.`,
      },
      {
        title: `Our ${serviceName} Services in ${city}`,
        content: `We offer a full range of ${serviceName.toLowerCase()} services including consultation, documentation, representation, and ongoing legal support. Our advocates in ${city} are well-versed in both local and national legal frameworks, ensuring comprehensive coverage for all your legal needs.`,
      },
      {
        title: `Contact Us for ${serviceName} in ${city}`,
        content: `Schedule a consultation with our ${serviceName.toLowerCase()} experts serving ${city}. We offer flexible appointment options and are committed to providing accessible, high-quality legal services. Contact GAG Lawyers - Grover & Grover Advocates today to discuss your legal requirements.`,
      },
    ],
  };
};

// Generate SEO data
const generateSEO = (serviceName, city) => {
  return {
    title: `${serviceName} in ${city} | GAG Lawyers - Expert Legal Services`,
    description: `Expert ${serviceName.toLowerCase()} services in ${city}. GAG Lawyers - Grover & Grover Advocates offers professional legal solutions with experienced advocates. Contact us for consultation.`,
    keywords: `${serviceName.toLowerCase()}, ${serviceName.toLowerCase()} in ${city}, lawyers in ${city}, advocates in ${city}, legal services ${city}, GAG lawyers ${city}`,
    h1: `${serviceName} Services in ${city}`,
  };
};

const generateLocationPages = async () => {
  try {
    console.log('\n🚀 Starting Location Pages Generation...\n');
    
    await connectDB();

    // Check if files exist
    if (!fs.existsSync(servicesFile)) {
      console.error('❌ services.json not found!');
      console.log('   Please create backend/services.json with your 25 services');
      console.log('   Format: ["Service Name 1", "Service Name 2", ...]');
      process.exit(1);
    }

    if (!fs.existsSync(locationsFile)) {
      console.error('❌ locations.json not found!');
      console.log('   Please create backend/locations.json with your 1702 locations');
      console.log('   Format: ["City 1", "City 2", ...]');
      process.exit(1);
    }

    // Read data
    const servicesData = JSON.parse(fs.readFileSync(servicesFile, 'utf8'));
    const locationsData = JSON.parse(fs.readFileSync(locationsFile, 'utf8'));

    console.log(`📊 Data loaded:`);
    console.log(`   Services: ${servicesData.length}`);
    console.log(`   Locations: ${locationsData.length}`);
    console.log(`   Total pages to generate: ${servicesData.length * locationsData.length}\n`);

    // Get or create services in database
    console.log('📝 Processing services...');
    const serviceMap = new Map();
    
    for (const serviceName of servicesData) {
      let service = await Service.findOne({ $or: [{ title: serviceName }, { name: serviceName }] });
      
      if (!service) {
        service = await Service.create({
          name: serviceName,
          title: serviceName,
          slug: generateSlug(serviceName),
          category: 'litigation',
          shortDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
          longDescription: `Professional ${serviceName.toLowerCase()} services by GAG Lawyers - Grover & Grover Advocates.`,
        });
        console.log(`   ✓ Created service: ${serviceName}`);
      } else {
        console.log(`   ✓ Found service: ${serviceName}`);
      }
      
      serviceMap.set(serviceName, service);
    }

    console.log(`\n✅ ${serviceMap.size} services ready\n`);

    // Check existing location pages
    const existingCount = await LocationPage.countDocuments();
    console.log(`📋 Existing location pages: ${existingCount}`);

    if (existingCount > 0) {
      console.log('\n⚠️  Location pages already exist in database.');
      console.log('   Options:');
      console.log('   1. Keep existing pages (script will skip duplicates)');
      console.log('   2. Delete all and regenerate (uncomment delete line below)');
      console.log('');
      
      // Uncomment the line below to delete existing pages
      // await LocationPage.deleteMany();
      // console.log('✓ Deleted existing location pages\n');
    }

    // Generate location pages
    console.log('🔨 Generating location pages...\n');
    
    let created = 0;
    let skipped = 0;
    let errors = 0;
    const batchSize = 100;
    const locationPages = [];

    for (const serviceName of servicesData) {
      const serviceDoc = serviceMap.get(serviceName);
      const serviceId = serviceDoc._id;
      
      for (const city of locationsData) {
        const slug = buildLocationPageSlug(serviceDoc.slug, city);
        
        // Check if already exists
        const exists = await LocationPage.findOne({ slug });
        if (exists) {
          skipped++;
          continue;
        }

        locationPages.push({
          service: serviceId,
          serviceName: serviceName,
          city: city,
          slug: slug,
          content: generateContent(serviceName, city),
          seo: generateSEO(serviceName, city),
          isActive: true,
          views: 0,
        });

        // Insert in batches
        if (locationPages.length >= batchSize) {
          try {
            await LocationPage.insertMany(locationPages, { ordered: false });
            created += locationPages.length;
            console.log(`   ✓ Created ${created} pages...`);
            locationPages.length = 0; // Clear array
          } catch (error) {
            if (error.code === 11000) {
              // Duplicate key error - some were created
              created += locationPages.length - error.writeErrors?.length || 0;
              errors += error.writeErrors?.length || 0;
            } else {
              console.error('   ❌ Batch insert error:', error.message);
              errors += locationPages.length;
            }
            locationPages.length = 0;
          }
        }
      }
    }

    // Insert remaining pages
    if (locationPages.length > 0) {
      try {
        await LocationPage.insertMany(locationPages, { ordered: false });
        created += locationPages.length;
      } catch (error) {
        if (error.code === 11000) {
          created += locationPages.length - error.writeErrors?.length || 0;
          errors += error.writeErrors?.length || 0;
        } else {
          errors += locationPages.length;
        }
      }
    }

    console.log('\n✅ Location Pages Generation Complete!\n');
    console.log('📊 Summary:');
    console.log(`   ✓ Created: ${created} pages`);
    console.log(`   ⊘ Skipped: ${skipped} pages (already exist)`);
    console.log(`   ✗ Errors: ${errors} pages`);
    console.log(`   📈 Total in database: ${await LocationPage.countDocuments()}`);
    
    console.log('\n🔗 Sample URLs:');
    const samples = await LocationPage.find().limit(5);
    samples.forEach(page => {
      console.log(`   /${page.slug}`);
    });

    console.log('\n✅ Done! Location pages are ready for SEO.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error generating location pages:', error);
    process.exit(1);
  }
};

generateLocationPages();
