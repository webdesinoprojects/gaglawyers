#!/usr/bin/env node

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env'), quiet: true });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');

const shouldApply = process.argv.includes('--apply');
const onlyActive = process.argv.includes('--only-active');

const stripLocation = (value = '') =>
  String(value)
    .replace(/\s+in\s+delhi\b/gi, '')
    .replace(/\s+in\s+india\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

const toKeywordBase = (serviceName = '') => {
  const cleaned = stripLocation(serviceName);
  if (!cleaned) return 'Legal Service';
  return cleaned;
};

const unique = (arr) => Array.from(new Set(arr.map((s) => String(s).trim()).filter(Boolean)));

const buildKeywords = (serviceName) => {
  const base = toKeywordBase(serviceName);
  const lowerBase = base.toLowerCase();

  return unique([
    `${base}`,
    `${base} lawyer`,
    `${base} advocate`,
    `advocate for ${lowerBase} matters`,
    `best ${lowerBase} lawyers near me`,
    `${lowerBase} lawyer fees`,
    `${base} lawyer near me`,
    `best ${base} lawyers`,
    `top ${base} lawyer in india`,
    `best advocates for ${base} cases`,
    `best lawyers for ${base} cases`,
    `lawyer for ${base} cases`,
    `lawyer for ${base} matters`,
    `lawyer for ${base} disputes`,
    `${base} lawyer in high court`,
    `top ${base} lawyer in supreme court`,
  ]).join(', ');
};

const buildTitle = (serviceName) => `${toKeywordBase(serviceName)} - GAG Lawyers`;
const buildMetaDescription = (serviceName) =>
  `${toKeywordBase(serviceName)} in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI in backend/.env');
  }

  await connectDB();

  const filter = onlyActive ? { isActive: true } : {};
  const services = await Service.find(filter).select('name slug seo isActive').lean();
  const activeCount = services.filter((s) => s.isActive !== false).length;
  const inactiveCount = services.length - activeCount;
  console.log(`\nFound ${services.length} services (active: ${activeCount}, inactive: ${inactiveCount})`);
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY-RUN'}\n`);

  let updatedCount = 0;

  for (const service of services) {
    const title = buildTitle(service.name);
    const keywords = buildKeywords(service.name);
    const metaDescription = buildMetaDescription(service.name);
    const nextSeo = {
      ...(service.seo || {}),
      title,
      keywords,
      metaDescription,
    };

    console.log(`- ${service.slug}`);
    console.log(`  title: ${title}`);
    console.log(`  metaDescription: ${metaDescription}`);
    console.log(`  keywords: ${keywords}\n`);

    if (shouldApply) {
      await Service.updateOne({ _id: service._id }, { $set: { seo: nextSeo } });
      updatedCount += 1;
    }
  }

  if (shouldApply) {
    console.log(`Done. Updated SEO title/metaDescription/keywords for ${updatedCount} services.`);
  } else {
    console.log('Dry-run complete. No database changes were made.');
    console.log('Run with --apply to save updates.');
  }
}

main()
  .catch((error) => {
    console.error('\nFailed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
