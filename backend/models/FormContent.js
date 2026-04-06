const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  helpText: String,
  errorMessage: String,
  isRequired: {
    type: Boolean,
    default: false,
  },
  fieldType: {
    type: String,
    enum: ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio'],
    default: 'text',
  },
  options: [String], // For select, checkbox, radio
  order: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const formContentSchema = new mongoose.Schema({
  formIdentifier: {
    type: String,
    required: true,
    unique: true,
    enum: ['contact', 'appointment', 'consultation', 'newsletter', 'callback'],
  },
  formTitle: String,
  formDescription: String,
  fields: [formFieldSchema],
  submitButtonText: {
    type: String,
    default: 'Submit',
  },
  successMessage: {
    type: String,
    default: 'Thank you! We will contact you shortly.',
  },
  errorMessage: {
    type: String,
    default: 'Something went wrong. Please try again.',
  },
  redirectUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FormContent', formContentSchema);
