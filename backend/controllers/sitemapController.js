const Service = require('../models/Service');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');

const generateSitemap = async (req, res) => {
  try {
    const baseUrl = process.env.SITE_URL || 'https://gaglawyers.com';
    
    const staticPages = [
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

    const services = await Service.find({ slug: { $exists: true, $ne: '' } }).select('slug updatedAt');
    const blogPosts = await BlogPost.find({ isPublished: true }).select('slug updatedAt');
    const locationPages = await LocationPage.find({ isActive: true }).select('slug updatedAt');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
    xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

    // Static pages
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += `  </url>\n`;
    });

    // Service pages
    services.forEach(service => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${service.slug}</loc>\n`;
      xml += `    <lastmod>${service.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Blog posts
    blogPosts.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    // Location pages
    locationPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${page.slug}</loc>\n`;
      xml += `    <lastmod>${page.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating sitemap',
      error: error.message,
    });
  }
};

const generateRobotsTxt = (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://gaglawyers.com';
  
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
  generateRobotsTxt,
};
