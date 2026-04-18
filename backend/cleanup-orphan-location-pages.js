const mongoose = require('mongoose');
const dotenv = require('dotenv');
const LocationPage = require('./models/LocationPage');
const Service = require('./models/Service');
const { generateSlug } = require('./utils/slugify');

dotenv.config();

const APPLY = process.argv.includes('--apply');
const REPAIR_LINKS = process.argv.includes('--repair-links');
const DELETE_UNRESOLVED = process.argv.includes('--delete-unresolved');

const ALIAS_TO_SERVICE_SLUG = {
  'criminal-defense-cases': 'criminal-lawyer',
  'cyber-crime-cases': 'cyber-crime-lawyer',
  'supreme-court-litigation': 'supreme-court-lawyer',
  'immigration-law-services': 'immigration-lawyer',
  'nclt-company-law-matters': 'corporate-lawyer',
  'family-law-disputes': 'family-lawyer',
  'trademark-ip-rights': 'ip-license-agreement',
  'tax-gst-disputes': 'tax-and-gst-disputes-lawyer',
  'motor-accident-claims': 'motor-accident-lawyer',
  'high-court-litigation': 'high-court-lawyer',
  'corporate-law-services': 'corporate-lawyer',
  'landlord-tenant-disputes': 'landlord-tenant-lawyer',
  'property-real-estate-disputes': 'property-lawyer',
  'wills-succession-planning': 'will-lawyer',
  'divorce-matrimonial-cases': 'divorce-lawyer',
};

const tokenize = (text) =>
  String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !['lawyer', 'law', 'services', 'service', 'cases', 'case', 'matters', 'matter'].includes(word));

const jaccardSimilarity = (left, right) => {
  const a = new Set(left);
  const b = new Set(right);
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

const resolveTargetService = (serviceName, serviceBySlug, services) => {
  const name = String(serviceName || '').trim();
  if (!name) return null;

  const normalizedSlug = generateSlug(name);
  const exact = serviceBySlug.get(normalizedSlug);
  if (exact) return exact;

  const aliasSlug = ALIAS_TO_SERVICE_SLUG[normalizedSlug];
  if (aliasSlug) {
    const aliasMatch = serviceBySlug.get(aliasSlug);
    if (aliasMatch) return aliasMatch;
  }

  const sourceTokens = tokenize(name);
  let best = null;
  for (const service of services) {
    const score = jaccardSimilarity(sourceTokens, tokenize(service.name));
    if (!best || score > best.score) {
      best = { service, score };
    }
  }

  if (best && best.score >= 0.5) {
    return best.service;
  }

  return null;
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  const serviceIds = await Service.find({}).distinct('_id');
  const validServiceSet = new Set(serviceIds.map((id) => String(id)));

  const pages = await LocationPage.find({}).select('_id slug service serviceName city').lean();
  const orphanPages = pages.filter((page) => !validServiceSet.has(String(page.service || '')));

  console.log(`Total location pages: ${pages.length}`);
  console.log(`Orphan location pages: ${orphanPages.length}`);

  if (orphanPages.length > 0) {
    console.log('\nSample orphan slugs:');
    orphanPages.slice(0, 20).forEach((page, idx) => {
      console.log(`${idx + 1}. ${page.slug} (${page.serviceName || 'Unknown Service'} - ${page.city || 'Unknown City'})`);
    });
  }

  const services = await Service.find({}).select('_id name slug').lean();
  const serviceBySlug = new Map();
  services.forEach((service) => {
    const key = String(service.slug || '').trim().toLowerCase();
    if (key) serviceBySlug.set(key, service);
  });

  const relinkPlan = orphanPages
    .map((page) => {
      const fromName = String(page.serviceName || '').trim();
      if (!fromName) return null;
      const targetService = resolveTargetService(fromName, serviceBySlug, services);
      if (!targetService) return null;
      return {
        pageId: page._id,
        slug: page.slug,
        city: page.city,
        oldServiceId: String(page.service || ''),
        newServiceId: String(targetService._id),
        newServiceName: targetService.name,
      };
    })
    .filter(Boolean);

  const unresolvedOrphans = orphanPages.length - relinkPlan.length;
  console.log(`Relink candidates: ${relinkPlan.length}`);
  console.log(`Unresolved orphans: ${unresolvedOrphans}`);

  if (relinkPlan.length > 0) {
    console.log('\nSample relink candidates:');
    relinkPlan.slice(0, 20).forEach((item, idx) => {
      console.log(
        `${idx + 1}. ${item.slug} | ${item.oldServiceId} -> ${item.newServiceId} (${item.newServiceName})`
      );
    });
  }

  if (APPLY && REPAIR_LINKS && relinkPlan.length > 0) {
    const ops = relinkPlan.map((item) => ({
      updateOne: {
        filter: { _id: item.pageId },
        update: { $set: { service: item.newServiceId, serviceName: item.newServiceName } },
      },
    }));
    const result = await LocationPage.bulkWrite(ops, { ordered: false });
    console.log(`\nRelinked pages: ${result.modifiedCount || 0}`);
  } else if (!APPLY || !REPAIR_LINKS) {
    console.log('\nRelink dry run only. Use --apply --repair-links to relink orphan pages.');
  }

  if (APPLY && DELETE_UNRESOLVED && unresolvedOrphans > 0) {
    const relinkedIds = new Set(relinkPlan.map((item) => String(item.pageId)));
    const deleteIds = orphanPages
      .filter((page) => !relinkedIds.has(String(page._id)))
      .map((page) => page._id);
    const result = await LocationPage.deleteMany({ _id: { $in: deleteIds } });
    console.log(`Deleted unresolved orphan pages: ${result.deletedCount}`);
  } else if (!APPLY || !DELETE_UNRESOLVED) {
    console.log('Deletion skipped. Use --apply --delete-unresolved to delete unresolved orphans.');
  }

  // Keep serviceName in sync with canonical Service.name for validly linked pages
  const canonicalizeResult = await LocationPage.aggregate([
    {
      $lookup: {
        from: 'services',
        localField: 'service',
        foreignField: '_id',
        as: 'serviceInfo',
      },
    },
    { $unwind: '$serviceInfo' },
    {
      $project: {
        _id: 1,
        serviceName: 1,
        canonicalName: '$serviceInfo.name',
      },
    },
    {
      $match: {
        $expr: { $ne: ['$serviceName', '$canonicalName'] },
      },
    },
    { $limit: 500000 },
  ]);

  console.log(`Service-name canonicalization candidates: ${canonicalizeResult.length}`);
  if (APPLY && canonicalizeResult.length > 0) {
    const nameOps = canonicalizeResult.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { serviceName: item.canonicalName } },
      },
    }));
    const syncResult = await LocationPage.bulkWrite(nameOps, { ordered: false });
    console.log(`Canonicalized serviceName on pages: ${syncResult.modifiedCount || 0}`);
  } else if (!APPLY) {
    console.log('Canonicalization dry run only. Use --apply to enforce canonical service names.');
  }

  await mongoose.disconnect();
  console.log('Done.');
};

run().catch(async (error) => {
  console.error('Cleanup failed:', error);
  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error('Disconnect failed:', disconnectError);
  }
  process.exit(1);
});
