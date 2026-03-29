const express = require('express');
const {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
} = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllImages);
router.post('/', protect, adminOnly, createImage);
router.put('/:id', protect, adminOnly, updateImage);
router.delete('/:id', protect, adminOnly, deleteImage);

module.exports = router;
