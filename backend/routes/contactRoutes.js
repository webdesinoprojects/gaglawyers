const express = require('express');
const { 
  createContactInquiry, 
  getAllContactInquiries,
  updateContactStatus,
  deleteContactInquiry 
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getAllContactInquiries);
router.post('/', createContactInquiry);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContactInquiry);

module.exports = router;
