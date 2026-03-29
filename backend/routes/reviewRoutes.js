const express = require('express');
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', protect, adminOnly, createReview);
router.put('/:id', protect, adminOnly, updateReview);
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;
