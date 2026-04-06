const express = require('express');
const router = express.Router();
const globalSettingsController = require('../controllers/globalSettingsController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route
router.get('/', globalSettingsController.getSettings);

// Protected routes (admin only)
router.put('/', protect, adminOnly, globalSettingsController.updateSettings);
router.post('/logo', protect, adminOnly, upload.single('logo'), globalSettingsController.uploadLogo);
router.post('/favicon', protect, adminOnly, upload.single('favicon'), globalSettingsController.uploadFavicon);

module.exports = router;
