const express = require('express');
const {
  getAllAwards,
  getAllAwardsAdmin,
  getHomeAwardSettings,
  updateHomeAwardSettings,
  createAward,
  updateAward,
  deleteAward,
} = require('../controllers/awardController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/admin', protect, adminOnly, getAllAwardsAdmin);
router.get('/home-settings', protect, adminOnly, getHomeAwardSettings);
router.put('/home-settings', protect, adminOnly, updateHomeAwardSettings);
router.get('/', getAllAwards);
router.post('/', protect, adminOnly, createAward);
router.put('/:id', protect, adminOnly, updateAward);
router.delete('/:id', protect, adminOnly, deleteAward);

module.exports = router;
