#!/usr/bin/env node

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env'), quiet: true });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const LocationPage = require('../models/LocationPage');

const shouldApply = process.argv.includes('--apply');
const onlyActive = process.argv.includes('--only-active');

const esc = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const stripServiceLocationSuffix = (serviceName = '', city = '') => {
  const cityPattern = city ? new RegExp(`\\s+in\\s+${esc(city)}\\b`, 'ig') : null;
  return String(serviceName || '')
    .replace(/\s+in\s+delhi\b/gi, '')
    .replace(/\s+in\s+india\b/gi, '')
    .replace(cityPattern || /$^/, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const unique = (items) => Array.from(new Set(items.map((x) => String(x).trim()).filter(Boolean)));

const buildTitle = (serviceName, city) => `${serviceName} in ${city} - GAG Lawyers`;
const buildMetaDescription = (serviceName, city) =>
  `${serviceName} in ${city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in ${city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations`;

// Base service name without a trailing "Lawyer"/"Advocate" word, so phrases that
// append "lawyer/lawyers" don't double up: "Criminal Lawyer" -> "Criminal", giving
// "best criminal lawyers near me" instead of "best criminal lawyer lawyers near me".
// Non-lawyer names ("Bail", "Cheque Bounce") are returned unchanged.
const baseService = (serviceName = '') =>
  String(serviceName).replace(/\s+(lawyers?|advocates?)\s*$/i, '').trim() || String(serviceName).trim();

const buildKeywords = (serviceName, city) => {
  const s = serviceName;               // full, e.g. "Criminal Lawyer"
  const b = baseService(serviceName);  // base, e.g. "Criminal"
  const ls = s.toLowerCase();
  const lb = b.toLowerCase();
  const lc = city.toLowerCase();

  return unique([
    `${ls} in ${lc}`,
    `advocate for ${lb} matters in ${lc}`,
    `best ${lb} lawyers near me`,
    `${lb} lawyer fees in ${lc}`,
    `${lb} lawyer near me`,
    `best ${lb} lawyers in ${city}`,
    `top ${lb} lawyer in india`,
    `best advocates for ${lb} cases in ${city}`,
    `best lawyers for ${lb} cases in ${city}`,
    `lawyer for ${lb} cases in ${city}`,
    `lawyer for ${lb} matters in ${city}`,
    `lawyer for ${lb} disputes in ${city}`,
    `${lb} lawyer in high court`,
    `${lb} lawyer in supreme court`,
  ]).join(', ');
};

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI in backend/.env');
  }

  await connectDB();

  const filter = onlyActive ? { isActive: true } : {};
  const pages = await LocationPage.find(filter).select('slug city serviceName seo isActive').lean();
  console.log(`\nFound ${pages.length} location pages`);
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY-RUN'}\n`);

  let updatedCount = 0;

  for (const page of pages) {
    const city = String(page.city || '').trim();
    const rawService = String(page.serviceName || '').trim();
    if (!city || !rawService) continue;

    const serviceName = stripServiceLocationSuffix(rawService, city) || rawService;
    const title = buildTitle(serviceName, city);
    const keywords = buildKeywords(serviceName, city);
    const metaDescription = buildMetaDescription(serviceName, city);
    const nextSeo = {
      ...(page.seo || {}),
      title,
      keywords,
      metaDescription,
      h1: `${serviceName} in ${city}`,
    };

    console.log(`- ${page.slug}`);
    console.log(`  title: ${title}`);
    console.log(`  metaDescription: ${metaDescription}`);
    console.log(`  keywords: ${keywords}\n`);

    if (shouldApply) {
      await LocationPage.updateOne({ _id: page._id }, { $set: { seo: nextSeo } });
      updatedCount += 1;
    }
  }

  if (shouldApply) {
    console.log(`Done. Updated SEO title/metaDescription/keywords for ${updatedCount} location pages.`);
  } else {
    console.log('Dry-run complete. No database changes made.');
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
