require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function testSitemapEndpoint() {
  try {
    console.log('🔍 Testing Services Sitemap Generation\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Simulate what the sitemap controller does
    const services = await Service.find({ slug: { $exists: true, $ne: '' } })
      .select('slug updatedAt')
      .lean();

    console.log(`📊 Found ${services.length} services with slugs\n`);

    if (services.length > 0) {
      console.log('First 10 services that SHOULD be in sitemap:');
      services.slice(0, 10).forEach((s, i) => {
        console.log(`   ${i + 1}. https://gaglawyers.com/${s.slug}`);
        console.log(`      lastmod: ${s.updatedAt.toISOString()}`);
      });
      
      if (services.length > 10) {
        console.log(`   ... and ${services.length - 10} more services\n`);
      }
    }

    console.log(`\n✅ Total services that should appear in sitemap: ${services.length}`);
    console.log('\n📝 If you see fewer in the actual sitemap:');
    console.log('   1. Clear browser cache');
    console.log('   2. Visit: https://gaglawyers.com/services.xml?v=4');
    console.log('   3. Check server logs for errors');
    console.log('   4. Verify latest code is deployed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testSitemapEndpoint();
