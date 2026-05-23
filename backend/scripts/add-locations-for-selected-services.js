require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');
const { buildLocationPageSlug } = require('../utils/slugify');
const { locations: rawLocations } = require('../seed-1702-locations-data');

const APPLY = process.argv.includes('--apply');
const TARGET_SERVICE_SLUGS = ['medical-negligence-lawyer', 'consumer-court-lawyer'];
const EXTRA_LOCATIONS_FILE = path.resolve(__dirname, '..', 'locations-454.txt');

const uniqueLocations = (list) =>
  Array.from(new Set((list || []).map((x) => String(x || '').trim()).filter(Boolean)));

const makeContent = (serviceName, city) => {
  const lowered = String(serviceName || '').toLowerCase();
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
};

const makeSeo = (serviceName, city) => {
  const lowered = String(serviceName || '').toLowerCase();
  return {
    title: `${serviceName} in ${city} | GAG Lawyers`,
    description: `Professional ${lowered} support in ${city}. Speak with our team for case-focused legal guidance.`,
    keywords: `${lowered}, ${String(city || '').toLowerCase()}, legal services`,
    h1: `${serviceName} in ${city}`,
  };
};

async function run() {
  await connectDB();

  const baseLocations = uniqueLocations(rawLocations);
  let mergedLocations = [...baseLocations];
  let extraLocations = [];
  if (fs.existsSync(EXTRA_LOCATIONS_FILE)) {
    const raw = fs.readFileSync(EXTRA_LOCATIONS_FILE, 'utf8');
    extraLocations = uniqueLocations(raw.split(/[,\r\n]+/).map((x) => x.trim()));
    mergedLocations = uniqueLocations([...baseLocations, ...extraLocations]);
  }
  const locations = mergedLocations;
  const services = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } })
    .select('_id slug name title')
    .lean();

  const foundSlugs = new Set(services.map((row) => row.slug));
  const missing = TARGET_SERVICE_SLUGS.filter((slug) => !foundSlugs.has(slug));
  if (missing.length > 0) {
    throw new Error(`Missing target services in DB: ${missing.join(', ')}`);
  }

  const existingSlugSet = new Set(
    (
      await LocationPage.find({
        service: { $in: services.map((s) => s._id) },
      })
        .select('slug')
        .lean()
    ).map((row) => String(row.slug || '').toLowerCase())
  );

  const toInsert = [];
  for (const service of services) {
    const serviceName = service.name || service.title || service.slug;
    for (const city of locations) {
      const pageSlug = buildLocationPageSlug(service.slug, city).toLowerCase();
      if (existingSlugSet.has(pageSlug)) continue;
      toInsert.push({
        service: service._id,
        serviceName,
        city,
        slug: pageSlug,
        content: makeContent(serviceName, city),
        seo: makeSeo(serviceName, city),
        isActive: true,
      });
    }
  }

  console.log('\n=== Add Locations For Selected Services ===');
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Target service slugs: ${TARGET_SERVICE_SLUGS.join(', ')}`);
  console.log(`Services found: ${services.length}`);
  console.log(`Base unique locations: ${baseLocations.length}`);
  console.log(`Extra locations file entries: ${extraLocations.length}`);
  console.log(`Merged unique locations: ${locations.length}`);
  console.log(`Existing pages for target services: ${existingSlugSet.size}`);
  console.log(`Pages to insert: ${toInsert.length}`);

  if (!APPLY) {
    console.log('Dry run complete. Re-run with --apply to insert pages.');
    await mongoose.disconnect();
    return;
  }

  let inserted = 0;
  const chunkSize = 500;
  for (let i = 0; i < toInsert.length; i += chunkSize) {
    const chunk = toInsert.slice(i, i + chunkSize);
    await LocationPage.insertMany(chunk, { ordered: false });
    inserted += chunk.length;
  }

  const finalCount = await LocationPage.countDocuments({
    service: { $in: services.map((s) => s._id) },
  });
  console.log(`Inserted: ${inserted}`);
  console.log(`Final target services location page count: ${finalCount}`);

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nScript failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
