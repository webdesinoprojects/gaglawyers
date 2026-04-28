require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');
const { buildLocationPageSlug } = require('../utils/slugify');
const { locations: locationsRaw } = require('../seed-1702-locations-data');

const TARGET_SERVICE_SLUGS = [
  'armed-force-tribunal-lawyer',
  'bail-lawyer',
  'cat-matters-lawyer',
  'cheque-bounce-lawyer',
  'civil-lawyer',
  'contract-lawyer',
  'corporate-lawyer',
  'criminal-lawyer',
  'cyber-crime-lawyer',
  'divorce-lawyer',
  'debt-recovery-lawyer-drt-lawyer',
  'employment-lawyer',
  'family-lawyer',
  'high-court-lawyer',
  'immigration-lawyer',
  'insolvency-bankruptcy-lawyer',
  'insurance-lawyer',
  'landlord-tenant-lawyer',
  'legal-notice-lawyer',
  'mediation-and-arbitration-lawyer',
  'motor-accident-lawyer',
  'property-lawyer',
  'sexual-harassment-lawyer',
  'supreme-court-lawyer',
  'writ-petition-lawyer',
];

const shouldApply = process.argv.includes('--apply');

function uniqueLocations(list) {
  return Array.from(new Set((list || []).map((x) => String(x || '').trim()).filter(Boolean)));
}

function makeContent(serviceName, city) {
  const lowered = serviceName.toLowerCase();
  return {
    heading: `${serviceName} in ${city}`,
    intro: `Need ${lowered} assistance in ${city}? Our legal team provides focused guidance and representation.`,
    sections: [
      {
        title: `${serviceName} Support in ${city}`,
        content: `We handle ${lowered} matters in ${city} with practical strategy and clear communication.`,
      },
    ],
  };
}

function makeSeo(serviceName, city) {
  const lowered = serviceName.toLowerCase();
  return {
    title: `${serviceName} in ${city} | GAG Lawyers`,
    description: `Professional ${lowered} support in ${city}. Speak with our team for case-focused legal guidance.`,
    keywords: `${lowered}, ${city.toLowerCase()}, legal services`,
    h1: `${serviceName} in ${city}`,
  };
}

async function run() {
  await connectDB();

  const locations = uniqueLocations(locationsRaw);
  const expectedPerService = locations.length;
  const expectedTotal = TARGET_SERVICE_SLUGS.length * expectedPerService;

  const targetServices = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } })
    .select('_id name title slug')
    .lean();
  const targetServiceIdSet = new Set(targetServices.map((s) => String(s._id)));
  const foundSlugSet = new Set(targetServices.map((s) => s.slug));
  const missingSlugs = TARGET_SERVICE_SLUGS.filter((slug) => !foundSlugSet.has(slug));

  if (missingSlugs.length) {
    throw new Error(`Missing target services: ${missingSlugs.join(', ')}`);
  }

  const nonTargetFilter = { service: { $nin: Array.from(targetServiceIdSet) } };
  const nonTargetCount = await LocationPage.countDocuments(nonTargetFilter);

  const targetPages = await LocationPage.find({ service: { $in: Array.from(targetServiceIdSet) } })
    .select('_id slug service')
    .lean();
  const existingTargetSlugSet = new Set(targetPages.map((p) => String(p.slug || '').toLowerCase()));

  const toInsert = [];
  for (const service of targetServices) {
    const serviceName = service.name || service.title || service.slug;
    for (const city of locations) {
      const slug = buildLocationPageSlug(service.slug, city).toLowerCase();
      if (existingTargetSlugSet.has(slug)) continue;
      toInsert.push({
        service: service._id,
        serviceName,
        city,
        slug,
        content: makeContent(serviceName, city),
        seo: makeSeo(serviceName, city),
        isActive: true,
      });
    }
  }

  console.log('\n=== 25-Service Location Rebuild ===');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Target services: ${TARGET_SERVICE_SLUGS.length}`);
  console.log(`Unique locations: ${locations.length}`);
  console.log(`Expected total pages: ${expectedTotal}`);
  console.log(`Non-target pages to delete: ${nonTargetCount}`);
  console.log(`Missing target mappings to insert: ${toInsert.length}`);

  if (!shouldApply) {
    console.log('Dry run complete. Re-run with --apply to execute.');
    await mongoose.disconnect();
    return;
  }

  let deleted = 0;
  if (nonTargetCount > 0) {
    const result = await LocationPage.deleteMany(nonTargetFilter);
    deleted = result.deletedCount || 0;
  }

  let inserted = 0;
  if (toInsert.length > 0) {
    const chunkSize = 500;
    for (let i = 0; i < toInsert.length; i += chunkSize) {
      const chunk = toInsert.slice(i, i + chunkSize);
      await LocationPage.insertMany(chunk, { ordered: false });
      inserted += chunk.length;
    }
  }

  const finalTargetCount = await LocationPage.countDocuments({ service: { $in: Array.from(targetServiceIdSet) } });
  const finalNonTargetCount = await LocationPage.countDocuments(nonTargetFilter);
  const finalTotal = await LocationPage.countDocuments({});

  console.log('\nApplied changes:');
  console.log(`Deleted non-target pages: ${deleted}`);
  console.log(`Inserted target pages: ${inserted}`);
  console.log('\nFinal counts:');
  console.log(`Target pages: ${finalTargetCount}`);
  console.log(`Non-target pages: ${finalNonTargetCount}`);
  console.log(`Total location pages: ${finalTotal}`);
  console.log(`Expected target pages: ${expectedTotal}`);

  if (finalNonTargetCount !== 0) {
    console.log('WARNING: Some non-target pages still exist.');
  }
  if (finalTargetCount !== expectedTotal) {
    console.log('WARNING: Target page count does not match expected total.');
  }

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nRebuild failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
