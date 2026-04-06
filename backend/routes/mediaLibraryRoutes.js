const express = require('express');
const router = express.Router();
const mediaLibraryController = require('../controllers/mediaLibraryController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Protected routes (admin only)
router.post('/upload', protect, adminOnly, upload.single('file'), mediaLibraryController.uploadMedia);
router.get('/', protect, adminOnly, mediaLibraryController.getAllMedia);
router.get('/folders', protect, adminOnly, mediaLibraryController.getFolders);
router.get('/:id', protect, adminOnly, mediaLibraryController.getMediaById);
router.put('/:id', protect, adminOnly, mediaLibraryController.updateMedia);
router.delete('/:id', protect, adminOnly, mediaLibraryController.deleteMedia);
router.post('/bulk-delete', protect, adminOnly, mediaLibraryController.bulkDeleteMedia);

module.exports = router;
