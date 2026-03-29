const express = require('express');
const { generateSitemap, generateRobotsTxt } = require('../controllers/sitemapController');

const router = express.Router();

router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', generateRobotsTxt);

module.exports = router;
