const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const upload = require('../utils/imageUpload');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), uploadImage);

module.exports = router;
