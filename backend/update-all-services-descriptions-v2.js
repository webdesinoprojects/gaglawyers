require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateAllServicesDescriptions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    console.log('--- Fetching All Services ---\n');
    
    // Get all services
    const services = await Service.find({}).sort({ order: 1, name: 1 });
    
    if (!services || services.length === 0) {
      console.log('✗ No services found in database');
      process.exit(1);
    }

    console.log(`✓ Found ${services.length} services\n`);
    console.log('--- Updating Service Descriptions ---\n');

    let updatedCount = 0;
    const updates = [];

    // Prepare all updates
    for (const service of services) {
      const serviceName = service.name;
      
      // Create new title and shortDescription
      const newTitle = `${serviceName} Lawyer – GAG Lawyers`;
      const newShortDescription = `${serviceName} Lawyer – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;

      updates.push({
        updateOne: {
          filter: { _id: service._id },
          update: {
            $set: {
              title: newTitle,
              shortDescription: newShortDescription,
            }
          }
        }
      });

      console.log(`  ✓ ${serviceName}`);
      updatedCount++;
    }

    console.log(`\n--- Applying ${updatedCount} Updates ---\n`);

    // Execute bulk updates
    if (updates.length > 0) {
      const result = await Service.bulkWrite(updates);
      
      console.log('========================================');
      console.log('BULK UPDATE RESULTS');
      console.log('========================================');
      console.log(`✓ Matched: ${result.matchedCount}`);
      console.log(`✓ Modified: ${result.modifiedCount}`);
      console.log('========================================\n');

      if (result.modifiedCount === updatedCount) {
        console.log(`✓ Successfully updated all ${updatedCount} services!`);
        console.log('✓ All services now have consistent title and shortDescription format.\n');
      } else {
        console.log(`⚠ Warning: Updated ${result.modifiedCount} out of ${updatedCount} services`);
      }
    }

    // Display sample updates
    console.log('--- Sample Updated Services ---\n');
    const updatedServices = await Service.find({}).sort({ order: 1, name: 1 }).limit(3);
    
    updatedServices.forEach((service) => {
      console.log(`Service: ${service.name}`);
      console.log(`  Title: ${service.title}`);
      console.log(`  Short Desc: ${service.shortDescription.substring(0, 80)}...`);
      console.log();
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error updating services:', error.message);
    console.error(error);
    process.exit(1);
  }
}

updateAllServicesDescriptions();
