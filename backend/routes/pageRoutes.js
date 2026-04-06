const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/slug/:slug', pageController.getPageBySlug);

// Protected routes (admin only)
router.get('/', protect, adminOnly, pageController.getAllPages);
router.get('/:id', protect, adminOnly, pageController.getPageById);
router.post('/', protect, adminOnly, pageController.createPage);
router.put('/:id', protect, adminOnly, pageController.updatePage);
router.delete('/:id', protect, adminOnly, pageController.deletePage);
router.put('/:id/toggle-publish', protect, adminOnly, pageController.togglePublish);
router.put('/:id/reorder-blocks', protect, adminOnly, pageController.reorderBlocks);
router.post('/:id/duplicate', protect, adminOnly, pageController.duplicatePage);

module.exports = router;
