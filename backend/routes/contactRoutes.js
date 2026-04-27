const express = require('express');
const multer = require('multer');
const { 
  createContactInquiry, 
  getAllContactInquiries,
  updateContactStatus,
  deleteContactInquiry 
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  },
});

router.get('/', protect, adminOnly, getAllContactInquiries);
router.post('/', upload.single('resume'), createContactInquiry);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContactInquiry);

module.exports = router;
