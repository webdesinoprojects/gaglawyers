const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema({
  // Site Identity
  siteName: {
    type: String,
    default: 'GAG Lawyers',
  },
  siteTagline: {
    type: String,
    default: 'Grover & Grover Advocates',
  },
  siteDescription: {
    type: String,
    default: 'Delivering excellence in legal services with integrity and precision.',
  },
  
  // Branding
  logo: {
    url: String,
    cloudinaryPublicId: String,
  },
  favicon: {
    url: String,
    cloudinaryPublicId: String,
  },
  
  // Contact Information
  contact: {
    phone: {
      primary: String,
      secondary: String,
      displayText: String,
      availability: String,
      whatsapp: String,
    },
    email: {
      primary: String,
      secondary: String,
      displayText: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      displayText: String,
      mapEmbedUrl: String,
    },
  },
  
  // Social Media
  socialMedia: {
    facebook: {
      url: String,
      isVisible: { type: Boolean, default: true },
    },
    twitter: {
      url: String,
      isVisible: { type: Boolean, default: true },
    },
    linkedin: {
      url: String,
      isVisible: { type: Boolean, default: true },
    },
    instagram: {
      url: String,
      isVisible: { type: Boolean, default: true },
    },
    youtube: {
      url: String,
      isVisible: { type: Boolean, default: false },
    },
  },
  
  // Business Information
  business: {
    yearsOfExperience: Number,
    casesHandled: Number,
    successRate: Number,
    establishedYear: Number,
  },
  
  // SEO Defaults
  seo: {
    defaultTitle: String,
    defaultDescription: String,
    defaultKeywords: String,
    ogImage: {
      url: String,
      cloudinaryPublicId: String,
    },
  },
  
  // Scripts & Tracking
  scripts: {
    googleAnalytics: String,
    facebookPixel: String,
    customHeaderScripts: String,
    customFooterScripts: String,
  },
  
  // Feature Flags
  features: {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    showDisclaimerModal: {
      type: Boolean,
      default: true,
    },
    enableBlog: {
      type: Boolean,
      default: true,
    },
    enableBooking: {
      type: Boolean,
      default: true,
    },
  },
  
  // Legal
  legal: {
    copyrightText: String,
    disclaimerText: String,
  },
}, {
  timestamps: true,
});

// Ensure only one settings document exists
globalSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
