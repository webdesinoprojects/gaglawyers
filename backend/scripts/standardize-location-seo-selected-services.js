require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');

const APPLY = process.argv.includes('--apply');
const TARGET_SERVICE_SLUGS = ['medical-negligence-lawyer', 'consumer-court-lawyer'];

const buildDescription = (serviceName, city) =>
  `${serviceName} in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;

const buildKeywords = (serviceName, city) => {
  const service = String(serviceName || '').trim();
  const cityName = String(city || '').trim();

  return [
    `${service.toLowerCase()} in ${cityName.toLowerCase()}`,
    `advocate for ${service.toLowerCase()} matters in ${cityName.toLowerCase()}`,
    `best ${service} lawyers near me`,
    `${service} lawyer fees in ${cityName}`,
    `${service} lawyer near me`,
    `best ${service} lawyers in ${cityName}`,
    `top ${service} lawyer in india`,
    `best advocates for ${service} cases in ${cityName}`,
    `best lawyers for ${service} cases in ${cityName}`,
    `lawyer for ${service} disputes in ${cityName}`,
    `${service} lawyer in high court`,
    `top ${service} lawyer in supreme court`,
  ].join(', ');
};

async function run() {
  await connectDB();

  const services = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } })
    .select('_id slug name title')
    .lean();

  const foundSlugs = new Set(services.map((row) => row.slug));
  const missing = TARGET_SERVICE_SLUGS.filter((slug) => !foundSlugs.has(slug));
  if (missing.length > 0) {
    throw new Error(`Missing target services in DB: ${missing.join(', ')}`);
  }

  const pages = await LocationPage.find({
    service: { $in: services.map((s) => s._id) },
  })
    .select('_id city serviceName seo')
    .lean();

  console.log('\n=== Standardize Location SEO (Selected Services) ===');
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Target service slugs: ${TARGET_SERVICE_SLUGS.join(', ')}`);
  console.log(`Services found: ${services.length}`);
  console.log(`Location pages matched: ${pages.length}`);

  const preview = pages.slice(0, 5).map((page) => {
    const serviceName = String(page.serviceName || '').trim();
    const city = String(page.city || '').trim();
    return {
      city,
      oldTitle: page?.seo?.title || '',
      newTitle: `${serviceName} in ${city} | GAG Lawyers`,
    };
  });
  if (preview.length > 0) {
    console.log('Preview (first 5 title updates):');
    preview.forEach((row, i) => {
      console.log(`${i + 1}. ${row.oldTitle}  ->  ${row.newTitle}`);
    });
  }

  if (!APPLY) {
    console.log('Dry run complete. Re-run with --apply to persist changes.');
    await mongoose.disconnect();
    return;
  }

  const ops = pages.map((page) => {
    const serviceName = String(page.serviceName || '').trim();
    const city = String(page.city || '').trim();
    const title = `${serviceName} in ${city} | GAG Lawyers`;

    return {
      updateOne: {
        filter: { _id: page._id },
        update: {
          $set: {
            'seo.title': title,
            'seo.h1': `${serviceName} in ${city}`,
            'seo.description': buildDescription(serviceName, city),
            'seo.keywords': buildKeywords(serviceName, city),
          },
        },
      },
    };
  });

  if (ops.length > 0) {
    const result = await LocationPage.bulkWrite(ops, { ordered: false });
    console.log(`Matched: ${result.matchedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
  } else {
    console.log('No pages matched. Nothing to update.');
  }

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nScript failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});

