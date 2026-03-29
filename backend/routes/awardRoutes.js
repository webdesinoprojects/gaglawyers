const express = require('express');
const {
  getAllAwards,
  createAward,
  updateAward,
  deleteAward,
} = require('../controllers/awardController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllAwards);
router.post('/', protect, adminOnly, createAward);
router.put('/:id', protect, adminOnly, updateAward);
router.delete('/:id', protect, adminOnly, deleteAward);

module.exports = router;
