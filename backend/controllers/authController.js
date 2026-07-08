const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'sub-admin',
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated',
        });
      }

      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed - Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Please contact support',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc   Request a password reset link
// @route  POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  // Same reply whether or not the email exists — prevents email enumeration.
  const genericMsg = 'If an account with that email exists, a password reset link has been sent.';
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.json({ success: true, message: genericMsg });
    }

    // Random token emailed to the user; only its hash is stored.
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 60 minutes
    await user.save({ validateBeforeSave: false });

    const clientBase = (process.env.SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');
    const resetUrl = `${clientBase}/admin/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2937">
        <p>Hello ${user.name || 'Admin'},</p>
        <p>We received a request to reset your GAG Lawyers admin password.</p>
        <p><a href="${resetUrl}" style="background:#0f172a;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Reset your password</a></p>
        <p>Or paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in <strong>60 minutes</strong>. If you didn't request this, you can ignore this email.</p>
        <p>— GAG Lawyers</p>
      </div>`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'GAG Lawyers Admin — Password Reset',
        html,
        text: `Reset your password (valid 60 minutes): ${resetUrl}`,
      });
    } catch (mailErr) {
      // Roll back the token so a failed send doesn't leave a dangling reset.
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;
      await user.save({ validateBeforeSave: false });
      console.error('Reset email failed:', mailErr);
      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }

    return res.json({ success: true, message: genericMsg });
  } catch (error) {
    console.error('forgotPassword error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc   Set a new password using a valid reset token
// @route  PUT /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || String(password).length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const hashed = crypto.createHash('sha256').update(String(token)).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset link' });
    }

    user.password = password; // pre-save hook re-hashes with bcrypt
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    return res.json({ success: true, message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
};
