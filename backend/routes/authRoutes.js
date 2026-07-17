const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect, superAdminOnly } = require('../middleware/auth');

const router = express.Router();

// Throttle the reset endpoints to blunt abuse/brute-force.
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts, please try again later.' },
});

// Locked down: only an authenticated super-admin can create accounts.
// (Was previously public + trusted `role` from the body = anyone could self-promote.)
router.post('/register', protect, superAdminOnly, register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', resetLimiter, forgotPassword);
router.put('/reset-password/:token', resetLimiter, resetPassword);

module.exports = router;
