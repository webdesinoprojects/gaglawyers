const express = require('express');
const router = express.Router();
const { getTemplate, saveTemplate, applyTemplate } = require('../controllers/locationSeoController');
const { protect, adminOnly } = require('../middleware/auth');

// Per-service location-page SEO template (admin only).
router.get('/:slug/location-seo-template', protect, adminOnly, getTemplate);
router.put('/:slug/location-seo-template', protect, adminOnly, saveTemplate);
router.post('/:slug/location-seo-template/apply', protect, adminOnly, applyTemplate);

module.exports = router;
