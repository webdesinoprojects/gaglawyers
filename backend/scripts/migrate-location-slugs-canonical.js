require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const LocationPage = require('../models/LocationPage');
require('../models/Service');
const { buildLocationPageSlug } = require('../utils/slugify');

const shouldApply = process.argv.includes('--apply');

async function run() {
  await connectDB();

  const pages = await LocationPage.find({})
    .populate('service', 'slug')
    .select('_id slug city service')
    .lean();

  const ops = [];
  const preview = [];
  const seenTargetSlugs = new Set();
  let skippedNoService = 0;
  let conflicts = 0;

  for (const page of pages) {
    const serviceSlug = page?.service?.slug;
    if (!serviceSlug || !page.city) {
      skippedNoService += 1;
      continue;
    }

    const canonical = buildLocationPageSlug(serviceSlug, page.city).toLowerCase();
    if (!canonical || canonical === page.slug) continue;

    if (seenTargetSlugs.has(canonical)) {
      conflicts += 1;
      continue;
    }
    seenTargetSlugs.add(canonical);

    ops.push({
      updateOne: {
        filter: { _id: page._id },
        update: { $set: { slug: canonical } },
      },
    });
    if (preview.length < 20) preview.push({ from: page.slug, to: canonical });
  }

  console.log('\n=== Canonical Location Slug Migration ===');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Total location pages scanned: ${pages.length}`);
  console.log(`Pages needing slug update: ${ops.length}`);
  console.log(`Skipped (missing service/city): ${skippedNoService}`);
  console.log(`Potential in-memory conflicts skipped: ${conflicts}`);
  console.log('\nSample updates:');
  preview.forEach((x) => console.log(`- ${x.from}  ->  ${x.to}`));

  if (!shouldApply) {
    console.log('\nDry run complete. Re-run with --apply to execute.');
    await mongoose.disconnect();
    return;
  }

  let updated = 0;
  const chunkSize = 500;
  for (let i = 0; i < ops.length; i += chunkSize) {
    const chunk = ops.slice(i, i + chunkSize);
    const result = await LocationPage.bulkWrite(chunk, { ordered: false });
    updated += result.modifiedCount || 0;
  }

  console.log(`\nApplied updates: ${updated}`);
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nMigration failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
