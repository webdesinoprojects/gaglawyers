const mongoose = require('mongoose');

const navigationItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['link', 'dropdown', 'megamenu'],
    default: 'link',
  },
  url: String,
  openInNewTab: {
    type: Boolean,
    default: false,
  },
  icon: String,
  order: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  children: [{
    label: String,
    url: String,
    icon: String,
    description: String,
    order: Number,
    isVisible: {
      type: Boolean,
      default: true,
    },
  }],
  cssClass: String,
});

const navigationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    enum: ['header', 'footer', 'mobile', 'sidebar'],
    required: true,
  },
  items: [navigationItemSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Navigation', navigationSchema);
