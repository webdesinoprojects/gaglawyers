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
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  shortDescription: {
    type: String,
    default: '',
    trim: true,
  },
  cardImageUrl: {
    type: String,
    default: '',
    trim: true,
  },
  cardImageAlt: {
    type: String,
    default: '',
    trim: true,
  },
  seo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  // Per-service template for the CITY location-page meta (title/description/keywords
  // with {city}/{service} placeholders). Separate from `seo` above (which is the
  // service page's own meta) — this only drives LocationPage.seo when "Apply" is run.
  locationSeoTemplate: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  globalSettings: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  servicesPageSettings: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
