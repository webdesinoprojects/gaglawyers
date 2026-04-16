require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

/**
 * Complete Civil Law Service Content Update
 * Professional, comprehensive content structure for Civil Law service page
 * All sections are admin-controllable through Service Manager
 */

const updateCivilLawService = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find civil law service - adjust slug as per your database
    const civilService = await Service.findOne({ slug: 'civil-lawyer' });
    
    if (!civilService) {
      console.error('