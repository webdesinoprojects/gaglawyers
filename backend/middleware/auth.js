const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const isDbUnavailableError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('buffering timed out') ||
    message.includes('server selection timed out') ||
    message.includes('topology is closed') ||
    message.includes('not connected') ||
    error?.name === 'MongooseServerSelectionError' ||
    error?.name === 'MongoServerSelectionError'
  );
};

const protect = async (req, res, next) => {
  let token;

  if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }

  try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (mongoose.connection.readyState !== 1) {
      try {
        await connectDB();
      } catch (dbError) {
        console.error('Database unavailable during auth:', dbError.message);
        return res.status(503).json({
          success: false,
          message: 'Authentication temporarily unavailable. Database connection issue.',
        });
      }
    }

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user is inactive',
      });
    }

    return next();
  } catch (error) {
    if (isDbUnavailableError(error)) {
      console.error('Database auth query failed:', error.message);
      return res.status(503).json({
        success: false,
        message: 'Authentication temporarily unavailable. Please retry.',
      });
    }

    return res.status(401).json({
      success: false,
      message: `Not authorized, token failed - ${error.message}`,
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'super-admin' || req.user.role === 'sub-admin')) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Not authorized as admin',
  });
};

const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super-admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Not authorized as super admin',
  });
};

module.exports = { protect, adminOnly, superAdminOnly };
