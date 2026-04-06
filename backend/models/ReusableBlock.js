const mongoose = require('mongoose');

const reusableBlockSchema = new mongoose.Schema({
  blockIdentifier: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  blockName: {
    type: String,
    required: true,
  },
  blockType: {
    type: String,
    required: true,
    enum: [
      'hero',
      'stats',
      'features',
      'process-steps',
      'cta',
      'testimonials',
      'team-showcase',
      'blog-preview',
      'services-grid',
      'values',
      'why-choose-us',
      'contact-info',
      'text-content',
      'image-text',
      'faq',
      'custom',
    ],
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  settings: {
    backgroundColor: String,
    textColor: String,
    padding: String,
    margin: String,
    customCss: String,
  },
  category: {
    type: String,
    enum: ['marketing', 'content', 'navigation', 'form', 'media', 'other'],
    default: 'content',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

reusableBlockSchema.index({ blockIdentifier: 1 });
reusableBlockSchema.index({ blockType: 1 });

module.exports = mongoose.model('ReusableBlock', reusableBlockSchema);
