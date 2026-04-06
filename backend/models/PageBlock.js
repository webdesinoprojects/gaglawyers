const mongoose = require('mongoose');

const pageBlockSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    enum: ['home', 'about', 'services', 'contact', 'firm', 'team', 'awards', 'gallery', 'blog'],
  },
  blocks: [{
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReusableBlock',
    },
    blockIdentifier: String, // For quick lookup
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    overrideContent: {
      type: mongoose.Schema.Types.Mixed,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

pageBlockSchema.index({ pageName: 1 });

module.exports = mongoose.model('PageBlock', pageBlockSchema);
