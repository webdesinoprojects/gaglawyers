const mongoose = require('mongoose');

// Reusable content blocks that can be used across multiple pages
const contentBlockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  identifier: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: String,
  
  blockType: {
    type: String,
    required: true,
    enum: [
      'hero',
      'cta',
      'stats',
      'features',
      'testimonials',
      'team',
      'services',
      'blog',
      'gallery',
      'form',
      'text',
      'image',
      'video',
      'accordion',
      'tabs',
      'pricing',
      'timeline',
      'map',
      'custom',
    ],
  },
  
  // Block Content (flexible structure based on blockType)
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  
  // Visual Settings
  settings: {
    backgroundColor: String,
    backgroundImage: {
      url: String,
      cloudinaryPublicId: String,
    },
    textColor: String,
    padding: {
      top: String,
      bottom: String,
      left: String,
      right: String,
    },
    margin: {
      top: String,
      bottom: String,
    },
    customCss: String,
    animation: String,
  },
  
  // Usage Tracking
  usedInPages: [{
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
    },
    pageName: String,
  }],
  
  // Category for organization
  category: {
    type: String,
    enum: ['marketing', 'content', 'navigation', 'form', 'media', 'other'],
    default: 'content',
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Version Control
  version: {
    type: Number,
    default: 1,
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Indexes
contentBlockSchema.index({ identifier: 1 });
contentBlockSchema.index({ blockType: 1 });
contentBlockSchema.index({ category: 1 });

module.exports = mongoose.model('ContentBlock', contentBlockSchema);
