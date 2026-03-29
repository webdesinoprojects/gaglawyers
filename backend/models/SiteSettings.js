const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  settingKey: {
    type: String,
    required: true,
    unique: true,
  },
  settingValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
