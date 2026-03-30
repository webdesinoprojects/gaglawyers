const express = require('express');
const {
  getAllPages,
  getPageContent,
  updatePageContent,
} = require('../controllers/pageContentController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getAllPages);
router.get('/:pageName', getPageContent);
router.put('/:pageName', protect, adminOnly, updatePageContent);

module.exports = router;
