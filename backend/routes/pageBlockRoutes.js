const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getPageBlocks,
  updatePageBlocks,
  addBlockToPage,
  removeBlockFromPage,
} = require('../controllers/pageBlockController');

// Public routes
router.get('/:pageName', getPageBlocks);

// Protected routes
router.put('/:pageName', protect, adminOnly, updatePageBlocks);
router.post('/:pageName/blocks', protect, adminOnly, addBlockToPage);
router.delete('/:pageName/blocks/:blockId', protect, adminOnly, removeBlockFromPage);

module.exports = router;
