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
    heading: { type: String, required: true },
    intro: { type: String, required: true },
    sections: [{
      title: String,
      content: String,
    }],
  },
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
