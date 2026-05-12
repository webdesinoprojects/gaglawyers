const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const resolveFrontendPublicDir = () => {
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
  return null;
};

const sendStatic = (res, absPath, contentType) => {
  res.set('Content-Type', contentType);
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', 'public, max-age=3600');
  return res.sendFile(absPath);
};

const servePublicFile = (relativePath, contentType) => (req, res) => {
  const publicDir = resolveFrontendPublicDir();
  if (!publicDir) {
    return res.status(404).json({ success: false, message: 'Static public directory not found' });
  }

  const absPath = path.join(publicDir, relativePath);
  if (!fs.existsSync(absPath)) {
    return res.status(404).json({
      success: false,
      message: 'Sitemap file not generated yet',
      hint: 'Run: (backend) npm run generate:sitemap',
    });
  }

  return sendStatic(res, absPath, contentType);
};

router.get('/sitemap.xml', servePublicFile('sitemap.xml', 'application/xml; charset=utf-8'));
router.get('/sitemap.xml.gz', servePublicFile('sitemap.xml.gz', 'application/gzip'));

router.get('/pages-sitemap.xml', servePublicFile('pages-sitemap.xml', 'application/xml; charset=utf-8'));
router.get('/pages-sitemap.xml.gz', servePublicFile('pages-sitemap.xml.gz', 'application/gzip'));

router.get('/services.xml', servePublicFile('services.xml', 'application/xml; charset=utf-8'));
router.get('/services.xml.gz', servePublicFile('services.xml.gz', 'application/gzip'));

router.get('/blogs.xml', servePublicFile('blogs.xml', 'application/xml; charset=utf-8'));
router.get('/blogs.xml.gz', servePublicFile('blogs.xml.gz', 'application/gzip'));

// Support paginated location sitemaps: locations-1.xml, locations-2.xml, etc.
router.get('/locations-:page.xml', (req, res) => {
  const page = String(req.params.page || '').trim();
  return servePublicFile(`locations-${page}.xml`, 'application/xml; charset=utf-8')(req, res);
});
router.get('/locations-:page.xml.gz', (req, res) => {
  const page = String(req.params.page || '').trim();
  return servePublicFile(`locations-${page}.xml.gz`, 'application/gzip')(req, res);
});

// Legacy support for single locations.xml (redirects to locations-1.xml)
router.get('/locations.xml', (req, res) => res.redirect(301, '/locations-1.xml'));
router.get('/locations.xml.gz', (req, res) => res.redirect(301, '/locations-1.xml.gz'));

// Legacy support for OLD sitemap URL (redirect to new paginated version)
router.get('/locations-sitemap.xml', (req, res) => {
  // Redirect to the main sitemap index which includes all location sitemaps
  return res.redirect(301, '/sitemap.xml');
});
// Legacy support for other old sitemap URLs
router.get('/services-sitemap.xml', (req, res) => {
  return res.redirect(301, '/services.xml');
});
router.get('/articles-sitemap.xml', (req, res) => {
  return res.redirect(301, '/blogs.xml');
});
router.get('/newsletters-sitemap.xml', (req, res) => {
  return res.redirect(301, '/blogs.xml');
});

// robots.txt should also be static (served from frontend/public/robots.txt)
router.get('/robots.txt', servePublicFile('robots.txt', 'text/plain; charset=utf-8'));

module.exports = router;
