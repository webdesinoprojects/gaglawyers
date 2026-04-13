#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');

const DEFAULT_SERVICE_SLUGS_FILE = path.join(__dirname, 'target-service-slugs.json');
const DEFAULT_LOCATION_SLUGS_FILE = path.join(__dirname, 'target-location-slugs.json');

function parseArgs(argv) {
  const args = {
    apply: false,
    dryRun: true,
    servicesFile: DEFAULT_SERVICE_SLUGS_FILE,
    locationsFile: DEFAULT_LOCATION_SLUGS_FILE,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--apply') {
      args.apply = true;
      args.dryRun = false;
    } else if (arg === '--dry-run') {
      args.apply = false;
      args.dryRun = true;
    } else if (arg === '--services') {
      args.servicesFile = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    } else if (arg === '--locations') {
      args.locationsFile = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      console.log('Usage:');
      console.log('  node sync-service-location-pages.js --dry-run');
      console.log('  node sync-service-location-pages.js --apply');
      console.log('  node sync-service-location-pages.js --dry-run --services ./target-service-slugs.json --locations ./target-location-slugs.json');
      process.exit(0);
    }
  }

  return args;
}

function readSlugList(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }

  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON array`);
  }

  const normalized = parsed
    .map((item) => String(item || '').trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set(normalized));
}

function locationSlugToCity(locationSlug) {
  return locationSlug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function makeContent(serviceName, city) {
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
}

function makeSeo(serviceName, city) {
  const lowered = String(serviceName || '').toLowerCase();
  return {
    title: `${serviceName} in ${city} | GAG Lawyers`,
    description: `Professional ${lowered} support in ${city}. Speak with our team for case-focused legal guidance.`,
    keywords: `${lowered}, ${city.toLowerCase()}, legal services`,
    h1: `${serviceName} in ${city}`,
  };
}

function getLocationSlugFromPageSlug(pageSlug) {
  const idx = String(pageSlug || '').lastIndexOf('-in-');
  if (idx === -1) return null;
  return pageSlug.slice(idx + 4).trim().toLowerCase() || null;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const targetServiceSlugs = readSlugList(args.servicesFile, 'Service slugs');
  const targetLocationSlugs = readSlugList(args.locationsFile, 'Location slugs');
  const targetLocationSet = new Set(targetLocationSlugs);

  await connectDB();

  const [services, allPages] = await Promise.all([
    Service.find({ slug: { $in: targetServiceSlugs } }).select('_id slug name title').lean(),
    LocationPage.find({}).select('slug city').lean(),
  ]);

  const servicesBySlug = new Map();
  for (const service of services) {
    if (!servicesBySlug.has(service.slug)) servicesBySlug.set(service.slug, []);
    servicesBySlug.get(service.slug).push(service);
  }

  const existingPageSlugSet = new Set();
  const locationCityRegistry = new Map(); // locationSlug -> Map(lowerCity -> city)

  for (const page of allPages) {
    const pageSlug = String(page.slug || '').toLowerCase();
    if (pageSlug) existingPageSlugSet.add(pageSlug);

    const locationSlug = getLocationSlugFromPageSlug(pageSlug);
    if (!locationSlug || !targetLocationSet.has(locationSlug)) continue;

    const cityValue = String(page.city || '').trim();
    if (!cityValue) continue;

    if (!locationCityRegistry.has(locationSlug)) locationCityRegistry.set(locationSlug, new Map());
    const cityMap = locationCityRegistry.get(locationSlug);
    const cityKey = cityValue.toLowerCase();
    if (!cityMap.has(cityKey)) cityMap.set(cityKey, cityValue);
  }

  const ambiguousLocationSlugs = new Set();
  for (const locationSlug of targetLocationSlugs) {
    const cityMap = locationCityRegistry.get(locationSlug);
    if (cityMap && cityMap.size > 1) {
      ambiguousLocationSlugs.add(locationSlug);
    }
  }

  const missingServiceSlugs = [];
  const ambiguousServiceSlugs = [];
  const validServices = [];

  for (const serviceSlug of targetServiceSlugs) {
    const found = servicesBySlug.get(serviceSlug) || [];
    if (found.length === 0) {
      missingServiceSlugs.push(serviceSlug);
      continue;
    }
    if (found.length > 1) {
      ambiguousServiceSlugs.push(serviceSlug);
      continue;
    }
    validServices.push(found[0]);
  }

  const toUpsert = [];
  let skippedExisting = 0;
  let skippedAmbiguous = 0;
  let skippedMissingService = 0;
  let combinationsScanned = 0;
  const locationSlugsCreatedSet = new Set();

  for (const serviceSlug of targetServiceSlugs) {
    const serviceFound = servicesBySlug.get(serviceSlug) || [];
    const isServiceAmbiguous = serviceFound.length > 1;
    const service = serviceFound.length === 1 ? serviceFound[0] : null;

    for (const locationSlug of targetLocationSlugs) {
      combinationsScanned += 1;

      if (!service || isServiceAmbiguous) {
        if (isServiceAmbiguous) {
          skippedAmbiguous += 1;
        } else {
          skippedMissingService += 1;
        }
        continue;
      }

      if (ambiguousLocationSlugs.has(locationSlug)) {
        skippedAmbiguous += 1;
        continue;
      }

      const finalSlug = `${serviceSlug}-in-${locationSlug}`;
      if (existingPageSlugSet.has(finalSlug)) {
        skippedExisting += 1;
        continue;
      }

      const cityMap = locationCityRegistry.get(locationSlug);
      const city = cityMap && cityMap.size === 1
        ? Array.from(cityMap.values())[0]
        : locationSlugToCity(locationSlug);

      if (!cityMap || cityMap.size === 0) {
        locationSlugsCreatedSet.add(locationSlug);
      }

      const serviceName = service.name || service.title || service.slug;
      toUpsert.push({
        service: service._id,
        serviceName,
        city,
        slug: finalSlug,
        content: makeContent(serviceName, city),
        seo: makeSeo(serviceName, city),
        isActive: true,
      });
    }
  }

  let pagesCreated = 0;
  if (!args.dryRun && toUpsert.length > 0) {
    const chunkSize = 500;
    for (let i = 0; i < toUpsert.length; i += chunkSize) {
      const chunk = toUpsert.slice(i, i + chunkSize);
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          const ops = chunk.map((doc) => ({
            updateOne: {
              filter: { slug: doc.slug },
              update: { $setOnInsert: doc },
              upsert: true,
            },
          }));
          const result = await LocationPage.bulkWrite(ops, { ordered: false, session });
          pagesCreated += result.upsertedCount || 0;
        });
      } finally {
        await session.endSession();
      }
    }
  } else if (args.dryRun) {
    pagesCreated = toUpsert.length;
  }

  const summary = {
    mode: args.dryRun ? 'DRY_RUN' : 'APPLY',
    totalServicesChecked: targetServiceSlugs.length,
    totalLocationsChecked: targetLocationSlugs.length,
    totalCombinationsScanned: combinationsScanned,
    locationsCreated: locationSlugsCreatedSet.size,
    mappingsPagesCreated: pagesCreated,
    skippedExisting,
    skippedAmbiguous,
  };

  console.log('\n=== Service-Location Sync Summary ===');
  console.log(`mode: ${summary.mode}`);
  console.log(`total services checked: ${summary.totalServicesChecked}`);
  console.log(`total locations checked: ${summary.totalLocationsChecked}`);
  console.log(`total combinations scanned: ${summary.totalCombinationsScanned}`);
  console.log(`locations created: ${summary.locationsCreated}`);
  console.log(`mappings/pages created: ${summary.mappingsPagesCreated}`);
  console.log(`skipped existing: ${summary.skippedExisting}`);
  console.log(`skipped ambiguous: ${summary.skippedAmbiguous}`);

  if (missingServiceSlugs.length > 0) {
    console.log(`missing services (exact slug not found): ${missingServiceSlugs.length}`);
    missingServiceSlugs.forEach((slug) => console.log(`  - ${slug}`));
    console.log(`skipped due to missing service: ${skippedMissingService}`);
  }

  if (ambiguousServiceSlugs.length > 0) {
    console.log(`ambiguous services (multiple rows with same slug): ${ambiguousServiceSlugs.length}`);
    ambiguousServiceSlugs.forEach((slug) => console.log(`  - ${slug}`));
  }

  if (ambiguousLocationSlugs.size > 0) {
    console.log(`ambiguous locations (multiple city values for slug): ${ambiguousLocationSlugs.size}`);
    Array.from(ambiguousLocationSlugs).forEach((slug) => {
      const variants = Array.from((locationCityRegistry.get(slug) || new Map()).values());
      console.log(`  - ${slug}: ${variants.join(' | ')}`);
    });
  }

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nSync failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {
    // ignore close failures
  }
  process.exit(1);
});
