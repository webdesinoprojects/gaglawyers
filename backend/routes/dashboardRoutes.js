const express = require('express');
const { getDashboardFeed } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/feed', protect, adminOnly, getDashboardFeed);

module.exports = router;
