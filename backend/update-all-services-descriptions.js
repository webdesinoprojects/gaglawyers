require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const updateAllServicesDescriptions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fetch all services
    const services = await Service.find({});
    console.log(`\nFound ${services.length} services to update\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const service of services) {
      const serviceName = service.name || service.title || 'Legal Service';
      
      // Create the standardized short description
      const newShortDescription = `${serviceName} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;
      
      // Only update if the description is different
      if (service.shortDescription !== newShortDescription) {
        service.shortDescription = newShortDescription;
        
        // Also update the description field if it exists
        if (service.description) {
          service.description = newShortDescription;
        }
        
        await service.save();
        console.log(`✓ Updated: ${serviceName} (${service.slug})`);
        updatedCount++;
      } else {
        console.log(`- Skipped: ${serviceName} (already has correct description)`);
        skippedCount++;
      }
    }

    console.log('\n========================================');
    console.log(`Total services: ${services.length}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Skipped: ${skippedCount}`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error updating services:', error);
  } finally {
    await mongoose.connection.close();
  }
};

updateAllServicesDescriptions();
