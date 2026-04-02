const express = require('express');
const {
  bulkFixLocationsSEO,
  bulkFixBlogsSEO,
  bulkFixPagesSEO,
  getSEOStats
} = require('../controllers/seoController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/bulk-fix/locations', protect, adminOnly, bulkFixLocationsSEO);
router.post('/bulk-fix/blogs', protect, adminOnly, bulkFixBlogsSEO);
router.post('/bulk-fix/pages', protect, adminOnly, bulkFixPagesSEO);
router.get('/stats', protect, adminOnly, getSEOStats);

module.exports = router;
