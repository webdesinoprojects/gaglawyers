require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');
const { buildLocationPageSlug } = require('../utils/slugify');
const { locations: baseLocations } = require('../seed-1702-locations-data');

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

function getArg(name, fallback = '') {
  const found = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (!found) return fallback;
  return found.slice(name.length + 1).trim();
}

function uniqueLocations(list) {
  return Array.from(
    new Set(
      (list || [])
        .map((x) => String(x || '').trim())
        .filter(Boolean)
    )
  );
}

function parseLocationsFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return uniqueLocations(raw.split(/[,\r\n]+/).map((x) => x.trim()));
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
  const fileArg = getArg('--locations-file', 'backend/locations-454.txt');
  const resolvedFile = path.resolve(process.cwd(), fileArg);
  if (!fs.existsSync(resolvedFile)) {
    throw new Error(`Locations file not found: ${resolvedFile}`);
  }

  const existingUnique = uniqueLocations(baseLocations);
  const existingSet = new Set(existingUnique);
  const requested = parseLocationsFile(resolvedFile);
  const newLocations = requested.filter((loc) => !existingSet.has(loc));
  const allLocations = uniqueLocations([...existingUnique, ...newLocations]);

  await connectDB();

  const targetServices = await Service.find({ slug: { $in: TARGET_SERVICE_SLUGS } })
    .select('_id name title slug')
    .lean();
  const foundSlugSet = new Set(targetServices.map((s) => s.slug));
  const missingSlugs = TARGET_SERVICE_SLUGS.filter((slug) => !foundSlugSet.has(slug));
  if (missingSlugs.length) {
    throw new Error(`Missing target services: ${missingSlugs.join(', ')}`);
  }

  const targetIds = targetServices.map((s) => s._id);
  const targetPages = await LocationPage.find({ service: { $in: targetIds } })
    .select('slug')
    .lean();
  const existingSlugSet = new Set(
    targetPages.map((p) => String(p.slug || '').toLowerCase())
  );

  const toInsert = [];
  for (const service of targetServices) {
    const serviceName = service.name || service.title || service.slug;
    for (const city of allLocations) {
      const slug = buildLocationPageSlug(service.slug, city).toLowerCase();
      if (existingSlugSet.has(slug)) continue;
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

  const expectedTargetPages = targetServices.length * allLocations.length;
  console.log('\n=== Add Locations + Generate Pages ===');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Requested list count: ${requested.length}`);
  console.log(`Truly new locations vs existing 1218: ${newLocations.length}`);
  console.log(`Total unique locations after merge: ${allLocations.length}`);
  console.log(`Target services: ${targetServices.length}`);
  console.log(`Pages to insert: ${toInsert.length}`);
  console.log(`Expected target total after run: ${expectedTargetPages}`);

  if (!shouldApply) {
    console.log('Dry run complete. Re-run with --apply to execute.');
    await mongoose.disconnect();
    return;
  }

  let inserted = 0;
  const chunkSize = 500;
  for (let i = 0; i < toInsert.length; i += chunkSize) {
    const chunk = toInsert.slice(i, i + chunkSize);
    if (chunk.length) {
      await LocationPage.insertMany(chunk, { ordered: false });
      inserted += chunk.length;
    }
  }

  const finalTargetCount = await LocationPage.countDocuments({
    service: { $in: targetIds },
  });

  console.log('\nApplied changes:');
  console.log(`Inserted target pages: ${inserted}`);
  console.log(`Final target pages: ${finalTargetCount}`);
  console.log(`Expected target pages: ${expectedTargetPages}`);
  if (finalTargetCount !== expectedTargetPages) {
    console.log('WARNING: Final target page count does not match expected.');
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
