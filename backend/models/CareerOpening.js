const mongoose = require('mongoose');

const careerOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      default: 'New Delhi',
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Internship'],
      required: true,
      default: 'Full-time',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CareerOpening', careerOpeningSchema);
