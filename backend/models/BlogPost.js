const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
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
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    default: 'legal-news',
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
