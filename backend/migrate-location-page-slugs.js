/**
 * Rewrites every LocationPage.slug to: {serviceSlug}-lawyer-in-{citySlug}
 *
 * Usage:
 *   node migrate-location-page-slugs.js           # dry-run (no DB writes)
 *   node migrate-location-page-slugs.js --apply   # perform updates
 *
 * Uses a two-phase update so unique index on slug never conflicts mid-migration.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug, buildLocationPageSlug } = require('./utils/slugify');

const apply = process.argv.includes('--apply');

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected\n');
};

const serviceSlugForPage = async (page) => {
  if (page.service && typeof page.service === 'object' && page.service.slug) {
    return page.service.slug;
  }
  if (page.service) {
    const s = await Service.findById(page.service).select('slug name').lean();
    if (s?.slug) return s.slug;
  }
  const name = page.serviceName || '';
  if (name) return generateSlug(name);
  return '';
};

const main = async () => {
  try {
    await connect();

    const pages = await LocationPage.find({})
      .populate('service', 'slug name')
      .sort({ _id: 1 })
      .lean();

    const assignments = [];

    for (const page of pages) {
      const serviceSlug = await serviceSlugForPage(page);
      const city = page.city || '';
      const base = buildLocationPageSlug(serviceSlug, city);

      if (!base) {
        console.warn(`SKIP (no slug base) _id=${page._id} serviceName=${page.serviceName} city=${city}`);
        continue;
      }

      assignments.push({
        _id: page._id,
        oldSlug: page.slug,
        base,
      });
    }

    // Resolve duplicate base targets (same service+city slug): append -2, -3, ...
    const byBase = new Map();
    for (const a of assignments) {
      if (!byBase.has(a.base)) byBase.set(a.base, []);
      byBase.get(a.base).push(a);
    }

    const finalList = [];
    for (const [base, group] of byBase) {
      if (group.length === 1) {
        finalList.push({ ...group[0], newSlug: base });
      } else {
        console.warn(`Duplicate logical target "${base}" (${group.length} docs) — suffixing`);
        group.forEach((item, i) => {
          const newSlug = i === 0 ? base : `${base}-${i + 1}`;
          finalList.push({ ...item, newSlug });
        });
      }
    }

    const wouldChange = finalList.filter((x) => x.oldSlug !== x.newSlug);
    console.log(`Total pages: ${pages.length}`);
    console.log(`Would change: ${wouldChange.length}`);
    console.log(`Unchanged (already correct): ${finalList.length - wouldChange.length}\n`);

    if (wouldChange.length > 0) {
      console.log('Sample changes (up to 15):');
      wouldChange.slice(0, 15).forEach((x) => {
        console.log(`  ${x.oldSlug}\n    -> ${x.newSlug}`);
      });
      if (wouldChange.length > 15) console.log(`  ... and ${wouldChange.length - 15} more\n`);
    }

    if (!apply) {
      console.log('\nDry-run only. Re-run with --apply to write changes.\n');
      await mongoose.disconnect();
      process.exit(0);
    }

    const phase1 = finalList.map((x) => ({
      updateOne: {
        filter: { _id: x._id },
        update: { $set: { slug: `__migr_tmp_${String(x._id)}` } },
      },
    }));

    for (let i = 0; i < phase1.length; i += 500) {
      const chunk = phase1.slice(i, i + 500);
      if (chunk.length) await LocationPage.bulkWrite(chunk);
    }
    console.log(`Phase 1: set ${finalList.length} temporary slugs`);

    const phase2 = finalList.map((x) => ({
      updateOne: {
        filter: { _id: x._id },
        update: { $set: { slug: x.newSlug } },
      },
    }));

    for (let i = 0; i < phase2.length; i += 500) {
      const chunk = phase2.slice(i, i + 500);
      if (chunk.length) await LocationPage.bulkWrite(chunk);
    }
    console.log(`Phase 2: set ${finalList.length} final slugs\nDone.\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

main();
