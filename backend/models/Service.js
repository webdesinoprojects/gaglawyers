const mongoose = require('mongoose');

/**
 * Minimal Service Model
 * Core fields: id, name, slug (preserved from existing data)
 * Extended fields: seo, globalSettings (JSON objects)
 */
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  seo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  globalSettings: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
