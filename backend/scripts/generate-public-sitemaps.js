const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Service = require('../models/Service');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');

const DOMAIN = 'https://gaglawyers.com';
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

  const now = new Date();

  // Static pages get slightly different timestamps to add variation
  const pagesEntries = STATIC_ROUTES.map((route, index) => {
    const dateWithOffset = new Date(now.getTime() - (index * 60000)); // Offset each by 1 minute
    return {
      loc: `${baseUrl}${route.path}`,
      lastmod: toIsoDate(dateWithOffset),
      changefreq: route.changefreq,
      priority: route.priority,
    };
  });

  const services = await Service.find({ isActive: true, slug: { $exists: true, $ne: '' } })
    .select('slug updatedAt')
    .lean();
  const servicesEntries = services.map((service, index) => ({
    loc: `${baseUrl}/${service.slug}`,
    // Add slight variation if multiple services have same updatedAt
    lastmod: toIsoDate(new Date(new Date(service.updatedAt).getTime() + (index * 1000))),
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
  const articlesEntries = articlePosts.map((post, index) => ({
    loc: `${baseUrl}/articles/${post.slug}`,
    lastmod: toIsoDate(new Date(new Date(post.updatedAt).getTime() + (index * 1000))),
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
  const newslettersEntries = newsletterPosts.map((post, index) => ({
    loc: `${baseUrl}/newsletter/${post.slug}`,
    lastmod: toIsoDate(new Date(new Date(post.updatedAt).getTime() + (index * 1000))),
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const locationPages = await LocationPage.find({
    isActive: true,
    slug: { $exists: true, $ne: '' },
  })
    .select('slug updatedAt')
    .lean();
  
  // Paginate locations into multiple sitemaps (45,000 per file to stay well under 50,000 limit)
  const urlsPerLocationSitemap = 45000;
  const locationSitemapIndexEntries = [];
  
  for (let pageNum = 0; pageNum < locationPages.length; pageNum += urlsPerLocationSitemap) {
    const pageIndex = Math.floor(pageNum / urlsPerLocationSitemap) + 1;
    const paginatedPages = locationPages.slice(pageNum, pageNum + urlsPerLocationSitemap);
    
    const locationsEntries = paginatedPages.map((page, index) => ({
      loc: `${baseUrl}/${page.slug}`,
      lastmod: toIsoDate(new Date(new Date(page.updatedAt).getTime() + (index * 1000))),
      changefreq: 'monthly',
      priority: '0.7',
    }));
    
    const fileName = `locations-${pageIndex}.xml`;
    writeXml(fileName, buildUrlsetXml(locationsEntries));
    
    const lastmodTime = new Date(now.getTime() - (pageIndex * 60000));
    locationSitemapIndexEntries.push({
      loc: `${baseUrl}/${fileName}`,
      lastmod: toIsoDate(lastmodTime),
    });
  }

  writeXml('pages-sitemap.xml', buildUrlsetXml(pagesEntries));
  writeXml('services-sitemap.xml', buildUrlsetXml(servicesEntries));
  writeXml('articles-sitemap.xml', buildUrlsetXml(articlesEntries));
  writeXml('newsletters-sitemap.xml', buildUrlsetXml(newslettersEntries));

  const sitemapIndexEntries = [
    { loc: `${baseUrl}/pages-sitemap.xml`, lastmod: toIsoDate(new Date(now.getTime() - 0)) },
    { loc: `${baseUrl}/services-sitemap.xml`, lastmod: toIsoDate(new Date(now.getTime() - 60000)) },
    { loc: `${baseUrl}/articles-sitemap.xml`, lastmod: toIsoDate(new Date(now.getTime() - 120000)) },
    { loc: `${baseUrl}/newsletters-sitemap.xml`, lastmod: toIsoDate(new Date(now.getTime() - 180000)) },
    ...locationSitemapIndexEntries,
  ];
  writeXml('sitemap.xml', buildSitemapIndexXml(sitemapIndexEntries));

  console.log('Generated sitemap files in frontend/public:');
  console.log(`- sitemap.xml (index with ${sitemapIndexEntries.length} sitemaps)`);
  console.log(`- pages-sitemap.xml (${pagesEntries.length} URLs)`);
  console.log(`- services-sitemap.xml (${servicesEntries.length} URLs)`);
  console.log(`- articles-sitemap.xml (${articlesEntries.length} URLs)`);
  console.log(`- newsletters-sitemap.xml (${newslettersEntries.length} URLs)`);
  locationSitemapIndexEntries.forEach((entry, i) => {
    console.log(`- locations-${i + 1}.xml`);
  });
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
