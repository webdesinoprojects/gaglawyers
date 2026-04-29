const express = require('express');
const { generateSitemap, generateSectionSitemap, generateRobotsTxt } = require('../controllers/sitemapController');

const router = express.Router();

router.get('/sitemap.xml', generateSitemap);
router.get('/sitemaps/:section.xml', generateSectionSitemap);
router.get('/robots.txt', generateRobotsTxt);

module.exports = router;
