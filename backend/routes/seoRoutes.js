const express = require('express');
const {
  generateSitemap,
  generateNamedSitemap,
  generateRobotsTxt,
} = require('../controllers/sitemapController');

const router = express.Router();

router.get('/sitemap.xml', generateSitemap);

router.get('/pages-sitemap.xml', (req, res) => {
  req.params.name = 'pages-sitemap';
  return generateNamedSitemap(req, res);
});

router.get('/services.xml', (req, res) => {
  req.params.name = 'services';
  return generateNamedSitemap(req, res);
});

router.get('/blogs.xml', (req, res) => {
  req.params.name = 'blogs';
  return generateNamedSitemap(req, res);
});

router.get('/locations-:page.xml', (req, res) => {
  req.params.name = `locations-${String(req.params.page || '').trim()}`;
  return generateNamedSitemap(req, res);
});

// Keep .gz URLs stable while serving dynamic XML from DB.
router.get('/sitemap.xml.gz', (req, res) => res.redirect(302, '/sitemap.xml'));
router.get('/pages-sitemap.xml.gz', (req, res) => res.redirect(302, '/pages-sitemap.xml'));
router.get('/services.xml.gz', (req, res) => res.redirect(302, '/services.xml'));
router.get('/blogs.xml.gz', (req, res) => res.redirect(302, '/blogs.xml'));
router.get('/locations-:page.xml.gz', (req, res) => res.redirect(302, `/locations-${req.params.page}.xml`));

// Legacy support for single locations.xml (redirects to locations-1.xml)
router.get('/locations.xml', (req, res) => res.redirect(301, '/locations-1.xml'));
router.get('/locations.xml.gz', (req, res) => res.redirect(301, '/locations-1.xml.gz'));

// Legacy support for old sitemap URLs
router.get('/locations-sitemap.xml', (req, res) => res.redirect(301, '/sitemap.xml'));
router.get('/services-sitemap.xml', (req, res) => res.redirect(301, '/services.xml'));
router.get('/articles-sitemap.xml', (req, res) => res.redirect(301, '/blogs.xml'));
router.get('/newsletters-sitemap.xml', (req, res) => res.redirect(301, '/blogs.xml'));

router.get('/robots.txt', generateRobotsTxt);

module.exports = router;
