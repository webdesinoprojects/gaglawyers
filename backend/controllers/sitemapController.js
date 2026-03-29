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
    ];

    const blogPosts = await BlogPost.find({ isPublished: true }).select('slug updatedAt');
    const locationPages = await LocationPage.find({ isActive: true }).select('slug updatedAt');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    blogPosts.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

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
    res.send(xml);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating sitemap',
      error: error.message,
    });
  }
};

const generateRobotsTxt = (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://gaglawyers.com';
  
  let txt = 'User-agent: *\n';
  txt += 'Allow: /\n';
  txt += 'Disallow: /admin/\n';
  txt += 'Disallow: /api/\n\n';
  txt += `Sitemap: ${baseUrl}/sitemap.xml\n`;

  res.header('Content-Type', 'text/plain');
  res.send(txt);
};

module.exports = {
  generateSitemap,
  generateRobotsTxt,
};
