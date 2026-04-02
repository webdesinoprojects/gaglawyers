require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function testBulkFix() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    // Check total locations
    const totalLocations = await LocationPage.countDocuments();
    console.log(`Total locations: ${totalLocations.toLocaleString()}`);

    // Check locations without SEO
    const locationsWithoutSEO = await LocationPage.countDocuments({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    });
    console.log(`Locations without SEO: ${locationsWithoutSEO.toLocaleString()}`);

    // Check locations with SEO
    const locationsWithSEO = await LocationPage.countDocuments({
      'seo.description': { $exists: true, $ne: '', $ne: null }
    });
    console.log(`Locations with SEO: ${locationsWithSEO.toLocaleString()}`);

    // Sample a few locations without SEO
    console.log('\n--- Sample locations without SEO ---');
    const samples = await LocationPage.find({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    }).limit(3);

    samples.forEach((loc, i) => {
      console.log(`\n${i + 1}. ${loc.serviceName} in ${loc.city}`);
      console.log(`   Slug: ${loc.slug}`);
      console.log(`   SEO Title: ${loc.seo?.title || 'MISSING'}`);
      console.log(`   SEO Description: ${loc.seo?.description || 'MISSING'}`);
      console.log(`   SEO Keywords: ${loc.seo?.keywords || 'MISSING'}`);
    });

    // Test fixing one location
    if (samples.length > 0) {
      console.log('\n--- Testing bulk fix on 1 location ---');
      const testLocation = samples[0];
      
      if (!testLocation.seo) {
        testLocation.seo = {};
      }
      
      testLocation.seo.title = `${testLocation.serviceName} in ${testLocation.city} | GAG Lawyers`;
      testLocation.seo.description = `Looking for ${testLocation.serviceName} in ${testLocation.city}, India? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`;
      testLocation.seo.keywords = `${testLocation.serviceName}, ${testLocation.city}, lawyers, legal services, advocates, India`;
      
      if (!testLocation.seo.h1) {
        testLocation.seo.h1 = `${testLocation.serviceName} in ${testLocation.city}`;
      }
      
      await testLocation.save();
      console.log('✓ Successfully updated test location');
      console.log(`   New SEO Title: ${testLocation.seo.title}`);
      console.log(`   New SEO Description: ${testLocation.seo.description.substring(0, 100)}...`);
    }

    console.log('\n✓ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testBulkFix();
