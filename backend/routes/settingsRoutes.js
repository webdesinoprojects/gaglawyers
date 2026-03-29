const express = require('express');
const {
  getSetting,
  getAllSettings,
  updateSetting,
} = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getAllSettings);
router.get('/:key', getSetting);
router.put('/:key', protect, adminOnly, updateSetting);

module.exports = router;
