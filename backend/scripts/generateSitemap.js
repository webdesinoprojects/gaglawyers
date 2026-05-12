/* eslint-disable no-console */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { SitemapStream, streamToPromise } = require('sitemap');

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');

const STATIC_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/firm', priority: 0.8, changefreq: 'monthly' },
  { url: '/team', priority: 0.7, changefreq: 'monthly' },
  { url: '/awards', priority: 0.7, changefreq: 'monthly' },
  { url: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { url: '/services', priority: 0.9, changefreq: 'weekly' },
  { url: '/blog', priority: 0.8, changefreq: 'daily' },
  { url: '/contact', priority: 0.9, changefreq: 'monthly' },
  { url: '/careers', priority: 0.6, changefreq: 'weekly' },
  { url: '/affiliation', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.4, changefreq: 'yearly' },
  { url: '/terms', priority: 0.4, changefreq: 'yearly' },
];

function getBaseUrl() {
  // Prefer an explicit base URL for sitemap generation.
  // This avoids accidentally generating localhost URLs on dev machines.
  const raw = String(process.env.SITEMAP_BASE_URL || process.env.SITE_URL || 'https://gaglawyers.com').trim();
  return raw.replace(/\/+$/, '');
}

function toIso(value) {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function gzipBuffer(buf) {
  return zlib.gzipSync(buf, { level: zlib.constants.Z_BEST_COMPRESSION });
}

function resolveFrontendPublicDir() {
  const candidates = [
    path.resolve(__dirname, '../../frontend/public'),
    path.resolve(process.cwd(), 'frontend/public'),
    path.resolve(process.cwd(), 'public'),
  ];

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch (_) {
      // ignore
    }
  }

  throw new Error(`Could not find frontend public directory. Tried: ${candidates.join(', ')}`);
}

async function buildSitemapXml({ hostname, entries }) {
  const sm = new SitemapStream({ hostname });
  for (const entry of entries) sm.write(entry);
  sm.end();
  const xml = await streamToPromise(sm).then((data) => data.toString());
  return xml;
}

async function writeXmlFile(outDir, filename, xml, { gzip = true } = {}) {
  const target = path.join(outDir, filename);
  fs.writeFileSync(target, xml, 'utf8');
  if (gzip) {
    fs.writeFileSync(`${target}.gz`, gzipBuffer(Buffer.from(xml, 'utf8')));
  }
  return target;
}

async function main() {
  const baseUrl = getBaseUrl();
  const outDir = resolveFrontendPublicDir();
  ensureDir(outDir);

  console.log(`[sitemap] output dir: ${outDir}`);
  console.log(`[sitemap] base url: ${baseUrl}`);

  await connectDB();

  // Keep the existing URL shapes:
  // - /pages-sitemap.xml (static pages)
  // - /services.xml (service slugs mounted at /:serviceSlug)
  // - /blogs.xml (blog posts at /blog/:slug)
  // - /locations-1.xml, /locations-2.xml, ... (location pages at /:slug)
  // - /sitemap.xml is an INDEX of those sitemaps

  const staticLastMod = '2026-05-01T00:00:00.000Z';

  const pagesEntries = STATIC_PAGES.map((p) => ({
    url: p.url,
    lastmodISO: staticLastMod,
    changefreq: p.changefreq,
    priority: p.priority,
  }));

  const services = await Service.find({
    slug: { $exists: true, $ne: '' },
    isActive: { $ne: false },
  })
    .select('slug updatedAt')
    .lean();

  const servicesEntries = services.map((s) => ({
    url: `/${s.slug}`,
    lastmodISO: toIso(s.updatedAt),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const blogs = await BlogPost.find({
    isPublished: true,
    slug: { $exists: true, $ne: '' },
  })
    .select('slug updatedAt publishedAt')
    .lean();

  const blogsEntries = blogs.map((b) => ({
    url: `/blog/${b.slug}`,
    lastmodISO: toIso(b.updatedAt || b.publishedAt),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  // Smaller chunks = faster per-file loads for crawlers and nginx (fewer URLs per XML).
  const locationsPerSitemap = 2000;
  const totalLocations = await LocationPage.countDocuments({
    isActive: true,
    slug: { $exists: true, $ne: '' },
  });
  const numLocationSitemaps = Math.max(1, Math.ceil(totalLocations / locationsPerSitemap));

  console.log(`[sitemap] services: ${servicesEntries.length}`);
  console.log(`[sitemap] blogs: ${blogsEntries.length}`);
  console.log(`[sitemap] active locations: ${totalLocations} (${numLocationSitemaps} files @ ${locationsPerSitemap}/file)`);

  // Write section sitemaps
  const pagesXml = await buildSitemapXml({ hostname: baseUrl, entries: pagesEntries });
  await writeXmlFile(outDir, 'pages-sitemap.xml', pagesXml, { gzip: true });

  const servicesXml = await buildSitemapXml({ hostname: baseUrl, entries: servicesEntries });
  await writeXmlFile(outDir, 'services.xml', servicesXml, { gzip: true });

  const blogsXml = await buildSitemapXml({ hostname: baseUrl, entries: blogsEntries });
  await writeXmlFile(outDir, 'blogs.xml', blogsXml, { gzip: true });

  for (let i = 1; i <= numLocationSitemaps; i++) {
    const skip = (i - 1) * locationsPerSitemap;
    const locationDocs = await LocationPage.find({
      isActive: true,
      slug: { $exists: true, $ne: '' },
    })
      .select('slug updatedAt')
      // NOTE: ordering is irrelevant for sitemaps; sorting by updatedAt can exceed
      // Mongo's in-memory sort limit on large collections without an index.
      // _id is indexed by default and makes this generator production/cron safe.
      .sort({ _id: 1 })
      .skip(skip)
      .limit(locationsPerSitemap)
      .lean();

    const locationEntries = locationDocs.map((p) => ({
      url: `/${p.slug}`,
      lastmodISO: toIso(p.updatedAt),
      changefreq: 'monthly',
      priority: 0.8,
    }));

    const xml = await buildSitemapXml({ hostname: baseUrl, entries: locationEntries });
    await writeXmlFile(outDir, `locations-${i}.xml`, xml, { gzip: true });
    console.log(`[sitemap] wrote locations-${i}.xml (${locationEntries.length})`);
  }

  // Build sitemap INDEX manually so it exactly matches expected index format/URLs
  const nowIso = new Date().toISOString();
  const indexEntries = [
    { loc: `${baseUrl}/pages-sitemap.xml`, lastmod: staticLastMod },
    { loc: `${baseUrl}/services.xml`, lastmod: nowIso },
    { loc: `${baseUrl}/blogs.xml`, lastmod: nowIso },
    ...Array.from({ length: numLocationSitemaps }).map((_, idx) => ({
      loc: `${baseUrl}/locations-${idx + 1}.xml`,
      lastmod: nowIso,
    })),
  ];

  const indexXml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    indexEntries
      .map((e) => `  <sitemap>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`)
      .join('\n') +
    '\n</sitemapindex>\n';

  await writeXmlFile(outDir, 'sitemap.xml', indexXml, { gzip: true });
  console.log('[sitemap] wrote sitemap.xml (index)');
  console.log('[sitemap] done');

  await mongoose.connection.close().catch(() => {});
  process.exit(0);
}

main().catch(async (err) => {
  console.error('[sitemap] failed:', err);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});

