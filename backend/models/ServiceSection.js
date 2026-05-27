const mongoose = require('mongoose');

/**
 * Service Section Model
 * Flexible content sections for service pages
 */
const serviceSectionSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'hero',
      'overview',
      'benefits',
      'process',
      'audience',
      'pricing',
      'faq',
      'testimonials',
      'cta_banner',
      'footer_note',
    ],
  },
  visible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  background: {
    type: String,
    enum: ['light', 'dark', 'accent'],
    default: 'light',
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {},
  },
  // null = use type-based default (hero/benefits/process → true, others → false)
  // true/false = admin-controlled explicit override
  appendLocationToHeading: {
    type: Boolean,
    default: null,
  },
}, {
  timestamps: true,
});

// Compound index for efficient queries
serviceSectionSchema.index({ serviceId: 1, order: 1 });
serviceSectionSchema.index({ serviceId: 1, visible: 1 });

module.exports = mongoose.model('ServiceSection', serviceSectionSchema);
