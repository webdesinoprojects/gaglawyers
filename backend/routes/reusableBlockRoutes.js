const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllBlocks,
  getBlockByIdentifier,
  createBlock,
  updateBlock,
  deleteBlock,
} = require('../controllers/reusableBlockController');

// Public routes
router.get('/', getAllBlocks);
router.get('/:identifier', getBlockByIdentifier);

// Protected routes
router.post('/', protect, adminOnly, createBlock);
router.put('/:id', protect, adminOnly, updateBlock);
router.delete('/:id', protect, adminOnly, deleteBlock);

module.exports = router;
