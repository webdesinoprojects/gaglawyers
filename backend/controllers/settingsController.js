const SiteSettings = require('../models/SiteSettings');

const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await SiteSettings.findOne({ settingKey: key });

    if (!setting) {
      const defaultValues = {
        disclaimerEnabled: true,
        disclaimerText: 'The information provided on this website is for general informational purposes only.',
        rightClickDisabled: false,
        copyProtectionEnabled: false,
        whatsappEnabled: true,
        whatsappNumber: '+919876543210',
      };

      return res.status(200).json({
        success: true,
        data: {
          settingKey: key,
          settingValue: defaultValues[key] || null,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getAllSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.find();
    res.status(200).json({
      success: true,
      count: settings.length,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { settingValue, description } = req.body;

    const setting = await SiteSettings.findOneAndUpdate(
      { settingKey: key },
      { settingValue, description },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getSetting,
  getAllSettings,
  updateSetting,
};
