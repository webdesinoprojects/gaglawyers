const express = require('express');
const router = express.Router();
const contentBlockController = require('../controllers/contentBlockController');
const { protect, adminOnly } = require('../middleware/auth');

// Public route
router.get('/identifier/:identifier', contentBlockController.getBlockByIdentifier);

// Protected routes (admin only)
router.get('/', protect, adminOnly, contentBlockController.getAllBlocks);
router.get('/types', protect, adminOnly, contentBlockController.getBlockTypes);
router.get('/:id', protect, adminOnly, contentBlockController.getBlockById);
router.post('/', protect, adminOnly, contentBlockController.createBlock);
router.put('/:id', protect, adminOnly, contentBlockController.updateBlock);
router.delete('/:id', protect, adminOnly, contentBlockController.deleteBlock);
router.put('/:id/toggle-active', protect, adminOnly, contentBlockController.toggleActive);
router.post('/:id/duplicate', protect, adminOnly, contentBlockController.duplicateBlock);

module.exports = router;
