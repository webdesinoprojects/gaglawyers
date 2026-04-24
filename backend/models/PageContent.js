const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'home',
      'about',
      'firm',
      'team',
      'services',
      'blog',
      'contact',
      'awards',
      'gallery',
      'affiliation',
      'privacyPolicy',
      'termsOfService',
    ],
  },
  sections: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    ogImagePublicId: { type: String, default: '' },
    canonical: { type: String, default: '' },
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PageContent', pageContentSchema);
