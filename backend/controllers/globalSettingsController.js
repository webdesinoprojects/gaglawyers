const GlobalSettings = require('../models/GlobalSettings');
const cloudinary = require('../config/cloudinary');

// Get global settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await GlobalSettings.getSettings();
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: error.message,
    });
  }
};

// Update global settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne();
    
    if (!settings) {
      settings = new GlobalSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    await settings.save();
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message,
    });
  }
};

// Upload logo
exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'gag-lawyers/branding',
      transformation: [
        { width: 500, height: 500, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    const settings = await GlobalSettings.getSettings();
    
    // Delete old logo from Cloudinary if exists
    if (settings.logo?.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(settings.logo.cloudinaryPublicId);
    }
    
    settings.logo = {
      url: result.secure_url,
      cloudinaryPublicId: result.public_id,
    };
    
    await settings.save();

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      data: settings.logo,
    });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload logo',
      error: error.message,
    });
  }
};

// Upload favicon
exports.uploadFavicon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'gag-lawyers/branding',
      transformation: [
        { width: 64, height: 64, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    const settings = await GlobalSettings.getSettings();
    
    // Delete old favicon from Cloudinary if exists
    if (settings.favicon?.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(settings.favicon.cloudinaryPublicId);
    }
    
    settings.favicon = {
      url: result.secure_url,
      cloudinaryPublicId: result.public_id,
    };
    
    await settings.save();

    res.json({
      success: true,
      message: 'Favicon uploaded successfully',
      data: settings.favicon,
    });
  } catch (error) {
    console.error('Error uploading favicon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload favicon',
      error: error.message,
    });
  }
};
