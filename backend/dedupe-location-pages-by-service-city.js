const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');
const { buildLocationPageSlug } = require('./utils/slugify');

dotenv.config();

const APPLY = process.argv.includes('--apply');

const pickKeepDoc = (docs, canonicalSlug) => {
  let best = null;
  for (const doc of docs) {
    const isCanonical = doc.slug === canonicalSlug ? 1 : 0;
    const isCustom = doc?.content?.templateMode === 'custom' ? 1 : 0;
    const views = Number(doc.views || 0);
    const updatedAt = new Date(doc.updatedAt || doc.createdAt || 0).getTime();
    const score = (isCanonical * 1000000) + (isCustom * 100000) + (views * 100) + updatedAt;
    if (!best || score > best.score) best = { doc, score };
  }
  return best ? best.doc : docs[0];
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  const services = await Service.find({}).select('_id name slug').sort({ name: 1 }).lean();
  let groupsWithDuplicates = 0;
  let deletionsPlanned = 0;
  const deleteIds = [];

  for (const service of services) {
    const docs = await LocationPage.find({ service: service._id })
      .select('_id city slug content views createdAt updatedAt')
      .lean();

    const cityGroups = new Map();
    for (const doc of docs) {
      const city = String(doc.city || '').trim();
      if (!city) continue;
      if (!cityGroups.has(city)) cityGroups.set(city, []);
      cityGroups.get(city).push(doc);
    }

    for (const [city, cityDocs] of cityGroups.entries()) {
      if (cityDocs.length <= 1) continue;
      groupsWithDuplicates += 1;
      const canonicalSlug = buildLocationPageSlug(service.slug, city);
      const keepDoc = pickKeepDoc(cityDocs, canonicalSlug);
      const toDelete = cityDocs.filter((doc) => String(doc._id) !== String(keepDoc._id));
      deletionsPlanned += toDelete.length;
      toDelete.forEach((doc) => deleteIds.push(doc._id));
    }
  }

  console.log(`Duplicate service+city groups: ${groupsWithDuplicates}`);
  console.log(`Duplicate rows to delete: ${deletionsPlanned}`);

  if (!APPLY) {
    console.log('Dry run only. Re-run with --apply to delete duplicates.');
    await mongoose.disconnect();
    return;
  }

  if (deleteIds.length > 0) {
    const result = await LocationPage.deleteMany({ _id: { $in: deleteIds } });
    console.log(`Deleted duplicates: ${result.deletedCount}`);
  } else {
    console.log('No duplicates found to delete.');
  }

  await mongoose.disconnect();
  console.log('Done.');
};

run().catch(async (error) => {
  console.error('Dedupe failed:', error);
  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error('Disconnect failed:', disconnectError);
  }
  process.exit(1);
});
