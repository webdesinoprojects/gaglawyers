require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');

const checkLocationSeo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    const total = await LocationPage.countDocuments();

    const withTitle = await LocationPage.countDocuments({
      'seo.title': { $exists: true, $ne: '' },
    });

    const withDescription = await LocationPage.countDocuments({
      'seo.description': { $exists: true, $ne: '' },
    });

    const withKeywords = await LocationPage.countDocuments({
      'seo.keywords': { $exists: true, $ne: '' },
    });

    const withAll = await LocationPage.countDocuments({
      'seo.title': { $exists: true, $ne: '' },
      'seo.description': { $exists: true, $ne: '' },
      'seo.keywords': { $exists: true, $ne: '' },
    });

    console.log(`📊 Total location pages : ${total}`);
    console.log(`🏷️  With SEO title       : ${withTitle} / ${total}`);
    console.log(`📝 With SEO description : ${withDescription} / ${total}`);
    console.log(`🔑 With SEO keywords    : ${withKeywords} / ${total}`);
    console.log(`✅ All three set        : ${withAll} / ${total}`);
    console.log(`❌ Missing at least one : ${total - withAll} / ${total}`);

    // Show one example that has all three
    const example = await LocationPage.findOne({
      'seo.title': { $exists: true, $ne: '' },
      'seo.description': { $exists: true, $ne: '' },
      'seo.keywords': { $exists: true, $ne: '' },
    }).select('slug city serviceName seo');

    if (example) {
      console.log('\n--- Sample page with all SEO fields set ---');
      console.log(`  Slug        : ${example.slug}`);
      console.log(`  City        : ${example.city}`);
      console.log(`  Service     : ${example.serviceName}`);
      console.log(`  Title       : ${example.seo.title}`);
      console.log(`  Description : ${example.seo.description}`);
      console.log(`  Keywords    : ${example.seo.keywords}`);
    } else {
      console.log('\n⚠️  No page found with all three SEO fields set.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkLocationSeo();
