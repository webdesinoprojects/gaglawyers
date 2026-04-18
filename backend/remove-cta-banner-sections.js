require('dotenv').config();
const mongoose = require('mongoose');
const ServiceSection = require('./models/ServiceSection');

const removeCtaBannerSections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const beforeCount = await ServiceSection.countDocuments({ type: 'cta_banner' });
    console.log(`Found ${beforeCount} CTA banner sections`);

    const result = await ServiceSection.deleteMany({ type: 'cta_banner' });
    console.log(`Deleted ${result.deletedCount} CTA banner sections`);

    const afterCount = await ServiceSection.countDocuments({ type: 'cta_banner' });
    console.log(`Remaining CTA banner sections: ${afterCount}`);
  } catch (error) {
    console.error('Failed to remove CTA banner sections:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

removeCtaBannerSections();
