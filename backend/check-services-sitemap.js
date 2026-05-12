require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function checkServices() {
  try {
    console.log('🔍 Checking Services for Sitemap\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Count services
    const total = await Service.countDocuments();
    const withSlug = await Service.countDocuments({ 
      slug: { $exists: true, $ne: '' } 
    });
    const withoutSlug = await Service.countDocuments({ 
      $or: [
        { slug: { $exists: false } }, 
        { slug: '' }, 
        { slug: null }
      ] 
    });

    console.log('📊 Service Statistics:');
    console.log(`   Total Services: ${total}`);
    console.log(`   Services WITH slug: ${withSlug}`);
    console.log(`   Services WITHOUT slug: ${withoutSlug}\n`);

    if (withoutSlug > 0) {
      console.log('⚠️  Services WITHOUT slugs (not in sitemap):');
      const samplesWithoutSlug = await Service.find({ 
        $or: [
          { slug: { $exists: false } }, 
          { slug: '' }, 
          { slug: null }
        ] 
      }).select('title slug').limit(20);
      
      samplesWithoutSlug.forEach((s, i) => {
        console.log(`   ${i + 1}. ${s.title} | slug: "${s.slug || 'MISSING'}"`);
      });
      
      console.log('\n❌ These services will NOT appear in sitemap!');
      console.log('   Fix: Add slugs to these services in admin panel\n');
    }

    // Show services that ARE in sitemap
    console.log('✅ Services WITH slugs (in sitemap):');
    const servicesWithSlug = await Service.find({ 
      slug: { $exists: true, $ne: '' } 
    }).select('title slug').limit(20);
    
    servicesWithSlug.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.title} | slug: "${s.slug}"`);
    });

    if (servicesWithSlug.length < total) {
      console.log(`   ... and ${withSlug - 20} more`);
    }

    console.log('\n✅ Check Complete!');
    
    if (withSlug === total) {
      console.log('🎉 All services have slugs and will appear in sitemap!');
    } else {
      console.log(`⚠️  ${withoutSlug} services missing slugs - they won't appear in sitemap!`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkServices();
