const mongoose = require('mongoose');

const locationPageSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  content: {
    templateMode: {
      type: String,
      enum: ['service', 'custom'],
      default: 'service',
    },
    heading: { type: String, required: true },
    intro: { type: String, required: true },
    sections: [{
      title: String,
      content: String,
    }],
  },
  images: [{
    url: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    publicId: { type: String, default: '' },
  }],
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, default: '' },
    h1: { type: String, required: true },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  showInFooter: {
    type: Boolean,
    default: false,
    index: true,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

locationPageSchema.index({ service: 1, city: 1 });
locationPageSchema.index({ isActive: 1 });

module.exports = mongoose.model('LocationPage', locationPageSchema);
