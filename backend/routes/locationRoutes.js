const express = require('express');
const {
  getAllLocationPages,
  getLocationPageBySlug,
  createLocationPage,
  updateLocationPage,
  toggleLocationPage,
  deleteLocationPage,
} = require('../controllers/locationController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllLocationPages);
router.get('/:slug', getLocationPageBySlug);
router.post('/', protect, adminOnly, createLocationPage);
router.put('/:id', protect, adminOnly, updateLocationPage);
router.patch('/:id/toggle', protect, adminOnly, toggleLocationPage);
router.delete('/:id', protect, adminOnly, deleteLocationPage);

module.exports = router;
