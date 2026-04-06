const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllMenus,
  getMenuByLocation,
  upsertMenu,
  deleteMenu,
} = require('../controllers/navigationController');

// Public routes
router.get('/', getAllMenus);
router.get('/:location', getMenuByLocation);

// Protected routes
router.put('/:menuLocation', protect, adminOnly, upsertMenu);
router.delete('/:location', protect, adminOnly, deleteMenu);

module.exports = router;
