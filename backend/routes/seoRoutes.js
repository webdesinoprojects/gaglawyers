const express = require('express');
const { generateSitemap, generateNamedSitemap, generateRobotsTxt } = require('../controllers/sitemapController');

const router = express.Router();

router.get('/sitemap.xml', generateSitemap);
router.get('/pages-sitemap.xml', (req, res, next) => {
  req.params.name = 'pages-sitemap';
  return generateNamedSitemap(req, res, next);
});
router.get('/services.xml', (req, res, next) => {
  req.params.name = 'services';
  return generateNamedSitemap(req, res, next);
});
router.get('/blogs.xml', (req, res, next) => {
  req.params.name = 'blogs';
  return generateNamedSitemap(req, res, next);
});
// Support paginated location sitemaps: locations-1.xml, locations-2.xml, etc.
router.get('/locations-:page.xml', (req, res, next) => {
  req.params.name = `locations-${req.params.page}`;
  return generateNamedSitemap(req, res, next);
});
// Legacy support for single locations.xml (redirects to locations-1.xml)
router.get('/locations.xml', (req, res, next) => {
  req.params.name = 'locations-1';
  return generateNamedSitemap(req, res, next);
});
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
// Support for locations-sitemap.xml (same as locations.xml)
router.get('/locations-sitemap.xml', (req, res, next) => {
  req.params.name = 'locations-1';
  return generateNamedSitemap(req, res, next);
});
router.get('/robots.txt', generateRobotsTxt);

module.exports = router;
