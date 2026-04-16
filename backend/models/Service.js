const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  /** Optional: shown as the service page hero H1 when set (falls back to title, then name). */
  heroTitle: {
    type: String,
    trim: true,
  },
  /** Optional: hero subtitle under the H1 (falls back to shortDescription). */
  heroDescription: {
    type: String,
    trim: true,
  },
  /** Optional: hero background image URL */
  heroImage: {
    type: String,
    trim: true,
  },
  /** Optional: `<meta name="description">` / SEO description when set. */
  metaDescription: {
    type: String,
    trim: true,
  },
  /** Optional: document `<title>` when set (falls back to legacy SEO logic on the frontend). */
  seoTitle: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['military', 'criminal', 'administrative', 'civil', 'corporate', 'family', 'labour', 'property', 'litigation', 'immigration', 'adr'],
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  overview: {
    type: String,
  },
  typesOfCases: [{
    type: String,
  }],
  process: [{
    step: Number,
    title: String,
    description: String,
  }],
  keyPoints: [{
    type: String,
  }],
  iconName: {
    type: String,
    default: 'Briefcase',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
