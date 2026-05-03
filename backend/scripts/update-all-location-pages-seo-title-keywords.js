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

const buildKeywords = (serviceName, city) => {
  const lowerService = serviceName.toLowerCase();
  const lowerCity = city.toLowerCase();

  return unique([
    `${lowerService} in ${lowerCity}`,
    `advocate for ${lowerService} matters in ${lowerCity}`,
    `best ${lowerService} lawyers near me`,
    `${lowerService} lawyer fees in ${lowerCity}`,
    `${serviceName} lawyer near me`,
    `best ${serviceName} lawyers in ${city}`,
    `best ${serviceName} lawyers near me`,
    `top ${serviceName} lawyer in india`,
    `best advocates for ${serviceName} cases in ${city}`,
    `best lawyers for ${serviceName} cases in ${city}`,
    `lawyer for ${serviceName} cases in ${city}`,
    `lawyer for ${serviceName} matters in ${city}`,
    `lawyer for ${serviceName} disputes in ${city}`,
    `${serviceName} lawyer in high court`,
    `top ${serviceName} lawyer in supreme court`,
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
