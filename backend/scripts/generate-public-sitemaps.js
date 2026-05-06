const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Service = require('../models/Service');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');

const DOMAIN = 'https://www.raagconsultants.co.in';
const PUBLIC_DIR = path.resolve(__dirname, '../../frontend/public');

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/firm', changefreq: 'monthly', priority: '0.8' },
  { path: '/team', changefreq: 'monthly', priority: '0.7' },
  { path: '/awards', changefreq: 'monthly', priority: '0.7' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.7' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/articles', changefreq: 'daily', priority: '0.8' },
  { path: '/newsletter', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/careers', changefreq: 'weekly', priority: '0.6' },
  { path: '/affiliation', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const ensureTrailingDomain = (value) => value.replace(/\/+$/, '');
const baseUrl = ensureTrailingDomain(DOMAIN);

const toIsoDate = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
};

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildUrlsetXml = (entries) => {
  const rows = entries
    .map((entry) => {
      return [
        '  <url>',
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`,
        `    <priority>${escapeXml(entry.priority)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
};

const buildSitemapIndexXml = (entries) => {
  const rows = entries
    .map((entry) => {
      return [
        '  <sitemap>',
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        '  </sitemap>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>\n`;
};

const writeXml = (fileName, xmlContent) => {
  const absolutePath = path.join(PUBLIC_DIR, fileName);
  fs.writeFileSync(absolutePath, xmlContent, 'utf8');
};

const removeExistingSitemapFiles = () => {
  const files = fs.readdirSync(PUBLIC_DIR);
  for (const fileName of files) {
    if (/sitemap.*\.xml$/i.test(fileName)) {
      const target = path.join(PUBLIC_DIR, fileName);
      try {
        fs.unlinkSync(target);
      } catch (error) {
        if (error && (error.code === 'EPERM' || error.code === 'EACCES')) {
          // Fall back to truncating when Windows/OneDrive keeps a handle open.
          fs.writeFileSync(target, '', 'utf8');
        } else {
          throw error;
        }
      }
    }
  }
};

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);

  removeExistingSitemapFiles();

  const now = toIsoDate(new Date());

  const pagesEntries = STATIC_ROUTES.map((route) => ({
    loc: `${baseUrl}${route.path}`,
    lastmod: now,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  const services = await Service.find({ isActive: true, slug: { $exists: true, $ne: '' } })
    .select('slug updatedAt')
    .lean();
  const servicesEntries = services.map((service) => ({
    loc: `${baseUrl}/${service.slug}`,
    lastmod: toIsoDate(service.updatedAt),
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const articlePosts = await BlogPost.find({
    isPublished: true,
    contentType: 'article',
    slug: { $exists: true, $ne: '' },
  })
    .select('slug updatedAt')
    .lean();
  const articlesEntries = articlePosts.map((post) => ({
    loc: `${baseUrl}/articles/${post.slug}`,
    lastmod: toIsoDate(post.updatedAt),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const newsletterPosts = await BlogPost.find({
    isPublished: true,
    contentType: 'newsletter',
    slug: { $exists: true, $ne: '' },
  })
    .select('slug updatedAt')
    .lean();
  const newslettersEntries = newsletterPosts.map((post) => ({
    loc: `${baseUrl}/newsletter/${post.slug}`,
    lastmod: toIsoDate(post.updatedAt),
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const locationPages = await LocationPage.find({
    isActive: true,
    slug: { $exists: true, $ne: '' },
  })
    .select('slug updatedAt')
    .lean();
  const locationsEntries = locationPages.map((page) => ({
    loc: `${baseUrl}/${page.slug}`,
    lastmod: toIsoDate(page.updatedAt),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  writeXml('pages-sitemap.xml', buildUrlsetXml(pagesEntries));
  writeXml('services-sitemap.xml', buildUrlsetXml(servicesEntries));
  writeXml('articles-sitemap.xml', buildUrlsetXml(articlesEntries));
  writeXml('newsletters-sitemap.xml', buildUrlsetXml(newslettersEntries));
  writeXml('locations-sitemap.xml', buildUrlsetXml(locationsEntries));

  const sitemapIndexEntries = [
    { loc: `${baseUrl}/pages-sitemap.xml`, lastmod: now },
    { loc: `${baseUrl}/services-sitemap.xml`, lastmod: now },
    { loc: `${baseUrl}/articles-sitemap.xml`, lastmod: now },
    { loc: `${baseUrl}/newsletters-sitemap.xml`, lastmod: now },
    { loc: `${baseUrl}/locations-sitemap.xml`, lastmod: now },
  ];
  writeXml('sitemap.xml', buildSitemapIndexXml(sitemapIndexEntries));

  console.log('Generated sitemap files in frontend/public:');
  console.log(`- sitemap.xml (index)`);
  console.log(`- pages-sitemap.xml (${pagesEntries.length} URLs)`);
  console.log(`- services-sitemap.xml (${servicesEntries.length} URLs)`);
  console.log(`- articles-sitemap.xml (${articlesEntries.length} URLs)`);
  console.log(`- newsletters-sitemap.xml (${newslettersEntries.length} URLs)`);
  console.log(`- locations-sitemap.xml (${locationsEntries.length} URLs)`);
}

run()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Failed to generate public sitemaps:', error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // no-op
    }
    process.exit(1);
  });
