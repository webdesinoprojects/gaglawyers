const mongoose = require('mongoose');

const mediaLibrarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  altText: String,
  
  // Cloudinary Data
  cloudinaryPublicId: {
    type: String,
    required: true,
    unique: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  secureUrl: {
    type: String,
    required: true,
  },
  
  // File Information
  fileType: {
    type: String,
    enum: ['image', 'video', 'document', 'other'],
    default: 'image',
  },
  mimeType: String,
  format: String,
  width: Number,
  height: Number,
  fileSize: Number, // in bytes
  
  // Organization
  folder: {
    type: String,
    default: 'general',
  },
  tags: [String],
  
  // Usage Tracking
  usedIn: [{
    type: {
      type: String,
      enum: ['page', 'blog', 'service', 'team', 'gallery', 'settings', 'other'],
    },
    referenceId: mongoose.Schema.Types.ObjectId,
    referenceName: String,
  }],
  
  // Metadata
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better search performance
mediaLibrarySchema.index({ title: 'text', description: 'text', tags: 'text' });
mediaLibrarySchema.index({ folder: 1, createdAt: -1 });
mediaLibrarySchema.index({ fileType: 1 });

module.exports = mongoose.model('MediaLibrary', mediaLibrarySchema);
