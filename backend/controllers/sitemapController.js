const Service = require('../models/Service');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');
const connectDB = require('../config/db');

const getBaseUrl = (req) => {
  // Priority 1: Use environment variable (production)
  if (process.env.SITE_URL && process.env.NODE_ENV === 'production') {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }
  
  // Priority 2: Use request headers (for dynamic detection)
  const forwardedProto = req?.headers?.['x-forwarded-proto'];
  const forwardedHost = req?.headers?.['x-forwarded-host'];
  const host = forwardedHost || req?.get?.('host');
  const protocol = forwardedProto || req?.protocol || 'https';

  if (host) {
    // Normalize to non-www version for consistency
    const normalizedHost = host.replace(/^www\./, '');
    return `${protocol}://${normalizedHost}`.replace(/\/+$/, '');
  }

  // Priority 3: Fallback to default (non-www)
  return 'https://gaglawyers.com';
};

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/firm', priority: '0.8', changefreq: 'monthly' },
  { url: '/team', priority: '0.7', changefreq: 'monthly' },
  { url: '/awards', priority: '0.7', changefreq: 'monthly' },
  { url: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
  { url: '/careers', priority: '0.6', changefreq: 'weekly' },
  { url: '/affiliation', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { url: '/terms', priority: '0.4', changefreq: 'yearly' },
];

const toIso = (value) => {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

const buildUrlsetXml = (entries) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  entries.forEach((entry) => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    if (entry.lastmod) xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    if (entry.changefreq) xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    if (entry.priority) xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  xml += '</urlset>';
  return xml;
};

const buildSitemapIndexXml = (entries) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  entries.forEach((entry) => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  xml += '</sitemapindex>';
  return xml;
};

const sendXml = (res, xml, maxAge = 3600) => {
  res.status(200);
  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', `public, max-age=${maxAge}`);
  res.send(xml);
};

const getServicesSitemapEntries = async (req) => {
  const baseUrl = getBaseUrl(req);
  const services = await Service.find({ slug: { $exists: true, $ne: '' } }).select('slug updatedAt').lean();
  return services.map((service) => ({
    loc: `${baseUrl}/${service.slug}`,
    lastmod: toIso(service.updatedAt),
    changefreq: 'weekly',
    priority: '0.8',
  }));
};

const getBlogsSitemapEntries = async (req) => {
  const baseUrl = getBaseUrl(req);
  const blogPosts = await BlogPost.find({ isPublished: true, slug: { $exists: true, $ne: '' } })
    .select('slug updatedAt')
    .lean();
  return blogPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: toIso(post.updatedAt),
    changefreq: 'monthly',
    priority: '0.7',
  }));
};

const getLocationsSitemapEntries = async (req) => {
  const baseUrl = getBaseUrl(req);
  const page = parseInt(req.query.page || '1', 10);
  const limit = 2000; // URLs per sitemap chunk (smaller files load faster)
  const skip = (page - 1) * limit;
  
  const locationPages = await LocationPage.find({ isActive: true, slug: { $exists: true, $ne: '' } })
    .select('slug updatedAt')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
    
  return locationPages.map((page) => ({
    loc: `${baseUrl}/${page.slug}`,
    lastmod: toIso(page.updatedAt),
    changefreq: 'monthly',
    priority: '0.8',
  }));
};

const getStaticSitemapEntries = async (req) => {
  const baseUrl = getBaseUrl(req);
  // Use a fixed date for static pages that don't change often
  // This is more honest than using "now" every time
  const staticPageDate = '2026-05-01T00:00:00.000Z';
  
  return STATIC_PAGES.map((page) => ({
    loc: `${baseUrl}${page.url}`,
    lastmod: staticPageDate,
    changefreq: page.changefreq,
    priority: page.priority,
  }));
};

const generateSitemap = async (req, res) => {
  try {
    await connectDB();
    const baseUrl = getBaseUrl(req);
    
    // Count total location pages to determine how many sitemap files we need
    const totalLocations = await LocationPage.countDocuments({ isActive: true });
    const locationsPerSitemap = 2000;
    const numLocationSitemaps = Math.ceil(totalLocations / locationsPerSitemap);
    
    // Get actual last modification dates from database
    const [latestService, latestBlog, latestLocation] = await Promise.all([
      Service.findOne({ slug: { $exists: true, $ne: '' } }).sort({ updatedAt: -1 }).select('updatedAt').lean(),
      BlogPost.findOne({ isPublished: true }).sort({ updatedAt: -1 }).select('updatedAt').lean(),
      LocationPage.findOne({ isActive: true }).sort({ updatedAt: -1 }).select('updatedAt').lean(),
    ]);
    
    const entries = [
      { 
        loc: `${baseUrl}/pages-sitemap.xml`, 
        lastmod: '2026-05-01T00:00:00.000Z' // Static pages don't change often
      },
      { 
        loc: `${baseUrl}/services.xml`, 
        lastmod: latestService ? toIso(latestService.updatedAt) : toIso(new Date())
      },
      { 
        loc: `${baseUrl}/blogs.xml`, 
        lastmod: latestBlog ? toIso(latestBlog.updatedAt) : toIso(new Date())
      },
    ];
    
    // Add multiple location sitemaps with actual last modification date
    const locationLastMod = latestLocation ? toIso(latestLocation.updatedAt) : toIso(new Date());
    for (let i = 1; i <= numLocationSitemaps; i++) {
      entries.push({
        loc: `${baseUrl}/locations-${i}.xml`,
        lastmod: locationLastMod,
      });
    }
    
    return sendXml(res, buildSitemapIndexXml(entries));
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating sitemap index',
      error: error.message,
    });
  }
};

const generateNamedSitemap = async (req, res) => {
  try {
    await connectDB();
    const name = String(req.params.name || '').toLowerCase();
    let entries = [];

    if (name === 'pages-sitemap') {
      entries = await getStaticSitemapEntries(req);
    } else if (name === 'services') {
      entries = await getServicesSitemapEntries(req);
    } else if (name === 'blogs') {
      entries = await getBlogsSitemapEntries(req);
    } else if (name.startsWith('locations')) {
      // Extract page number from name like "locations-1", "locations-2", etc.
      const match = name.match(/locations-(\d+)/);
      if (match) {
        req.query.page = match[1];
      }
      entries = await getLocationsSitemapEntries(req);
    } else {
      return res.status(404).json({
        success: false,
        message: 'Unknown sitemap',
      });
    }

    return sendXml(res, buildUrlsetXml(entries));
  } catch (error) {
    console.error('Section sitemap generation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating section sitemap',
      error: error.message,
    });
  }
};

const generateRobotsTxt = (req, res) => {
  const baseUrl = getBaseUrl(req);
  
  let txt = '# Robots.txt for GAG Lawyers\n';
  txt += '# Generated automatically\n\n';
  txt += 'User-agent: *\n';
  txt += 'Allow: /\n';
  txt += 'Disallow: /admin/\n';
  txt += 'Disallow: /api/\n';
  txt += 'Disallow: /admin\n';
  txt += 'Disallow: /api\n\n';
  txt += '# Crawl-delay for polite crawling\n';
  txt += 'Crawl-delay: 1\n\n';
  txt += `Sitemap: ${baseUrl}/sitemap.xml\n`;

  res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.send(txt);
};

module.exports = {
  generateSitemap,
  generateNamedSitemap,
  generateRobotsTxt,
};
