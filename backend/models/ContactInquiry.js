const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  serviceOfInterest: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  resumePublicId: {
    type: String,
    default: '',
  },
  resumeOriginalName: {
    type: String,
    default: '',
  },
  resumeBytes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
