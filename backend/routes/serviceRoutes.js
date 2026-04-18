const express = require('express');
const {
  getAllServices,
  createService,
  getServiceBySlug,
  updateService,
  deleteService,
  addSection,
  deleteSection,
  extractServiceContent,
  importServiceContent,
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post('/', protect, adminOnly, createService);
router.put('/:slug', protect, adminOnly, updateService);
router.delete('/:slug', protect, adminOnly, deleteService);
router.post('/:slug/sections', protect, adminOnly, addSection);
router.delete('/:slug/sections/:sectionId', protect, adminOnly, deleteSection);

// Import routes
router.post('/import/extract', protect, adminOnly, extractServiceContent);
router.post('/import/save', protect, adminOnly, importServiceContent);

module.exports = router;
