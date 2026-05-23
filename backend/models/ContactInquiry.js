const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  serviceOfInterest: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
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
