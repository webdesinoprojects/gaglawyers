require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');

async function testSitemap() {
  try {
    console.log('🔍 Testing Sitemap - Location Pages\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get location pages
    const locationPages = await LocationPage.find({ isActive: true })
      .select('slug serviceName city updatedAt')
      .limit(10)
      .lean();

    console.log(`📊 Total Active Location Pages: ${await LocationPage.countDocuments({ isActive: true })}`);
    console.log(`📊 Sample Location Pages (first 10):\n`);

    locationPages.forEach((page, index) => {
      console.log(`${index + 1}. Service: ${page.serviceName}`);
      console.log(`   City: ${page.city}`);
      console.log(`   Slug: ${page.slug}`);
      console.log(`   URL: https://gaglawyers.com/${page.slug}`);
      console.log(`   Updated: ${page.updatedAt}`);
      console.log('');
    });

    // Check for any location pages without slugs
    const withoutSlug = await LocationPage.countDocuments({
      isActive: true,
      $or: [
        { slug: { $exists: false } },
        { slug: '' },
        { slug: null }
      ]
    });

    if (withoutSlug > 0) {
      console.log(`⚠️  WARNING: ${withoutSlug} active location pages without slugs!`);
      
      const problematic = await LocationPage.find({
        isActive: true,
        $or: [
          { slug: { $exists: false } },
          { slug: '' },
          { slug: null }
        ]
      }).select('serviceName city').limit(5);

      console.log('\nProblematic pages:');
      problematic.forEach(p => {
        console.log(`  - ${p.serviceName} in ${p.city}`);
      });
    } else {
      console.log('✅ All active location pages have slugs!');
    }

    console.log('\n✅ Sitemap Test Complete!');
    console.log('\n📝 To test the sitemap:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Visit: http://localhost:5000/sitemap.xml');
    console.log('   3. Visit: http://localhost:5000/locations.xml');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testSitemap();
