const express = require('express');
const { createContactInquiry, getAllContactInquiries } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getAllContactInquiries);
router.post('/', createContactInquiry);

module.exports = router;
