const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllForms,
  getFormByIdentifier,
  upsertForm,
  deleteForm,
} = require('../controllers/formContentController');

// Public routes
router.get('/', getAllForms);
router.get('/:identifier', getFormByIdentifier);

// Protected routes
router.put('/:formIdentifier', protect, adminOnly, upsertForm);
router.delete('/:identifier', protect, adminOnly, deleteForm);

module.exports = router;
