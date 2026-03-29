const express = require('express');
const { uploadToCloudinary, deleteFromCloudinary } = require('../controllers/cloudinaryUploadController');
const cloudinaryUpload = require('../utils/cloudinaryUpload');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/upload', protect, adminOnly, cloudinaryUpload.single('image'), uploadToCloudinary);
router.delete('/delete', protect, adminOnly, deleteFromCloudinary);

module.exports = router;
