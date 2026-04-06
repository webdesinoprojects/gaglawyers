const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  openInNewTab: {
    type: Boolean,
    default: false,
  },
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
    openInNewTab: Boolean,
    order: Number,
    isVisible: Boolean,
  }],
});

const navigationMenuSchema = new mongoose.Schema({
  menuLocation: {
    type: String,
    required: true,
    unique: true,
    enum: ['header', 'footer-primary', 'footer-secondary', 'footer-legal', 'mobile'],
  },
  menuName: {
    type: String,
    required: true,
  },
  items: [menuItemSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('NavigationMenu', navigationMenuSchema);
