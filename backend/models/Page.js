const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  blockType: {
    type: String,
    required: true,
    // Types: hero, content, cta, stats, team, testimonials, services, blog, gallery, form, custom
  },
  blockName: String,
  order: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  settings: {
    backgroundColor: String,
    padding: String,
    margin: String,
    customCss: String,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Flexible content structure
  },
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  // Page Type
  pageType: {
    type: String,
    enum: ['standard', 'home', 'about', 'contact', 'services', 'blog', 'custom'],
    default: 'standard',
  },
  
  // Template
  template: {
    type: String,
    enum: ['default', 'full-width', 'sidebar-left', 'sidebar-right', 'landing'],
    default: 'default',
  },
  
  // Content Blocks
  blocks: [blockSchema],
  
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: {
      url: String,
      cloudinaryPublicId: String,
    },
    canonicalUrl: String,
    noIndex: {
      type: Boolean,
      default: false,
    },
    noFollow: {
      type: Boolean,
      default: false,
    },
  },
  
  // Featured Image
  featuredImage: {
    url: String,
    cloudinaryPublicId: String,
    altText: String,
  },
  
  // Status & Visibility
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  publishedAt: Date,
  
  // Access Control
  isProtected: {
    type: Boolean,
    default: false,
  },
  allowedRoles: [String],
  
  // Author
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  // Custom Scripts
  customScripts: {
    header: String,
    footer: String,
  },
}, {
  timestamps: true,
});

// Indexes
pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1, publishedAt: -1 });
pageSchema.index({ pageType: 1 });

// Pre-save hook to set publishedAt
pageSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Page', pageSchema);
