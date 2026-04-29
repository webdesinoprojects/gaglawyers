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
router.get('/locations.xml', (req, res, next) => {
  req.params.name = 'locations';
  return generateNamedSitemap(req, res, next);
});
router.get('/robots.txt', generateRobotsTxt);

module.exports = router;
