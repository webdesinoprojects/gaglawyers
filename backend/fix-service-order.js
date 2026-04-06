const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');

const fixServiceOrder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all services
    const services = await Service.find().sort({ createdAt: 1 });
    console.log(`Found ${services.length} services`);

    // Update each service with a proper order
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      service.order = i + 1;
      await service.save();
      console.log(`Updated ${service.name} - Order: ${service.order}`);
    }

    console.log('\n✅ All services updated with proper order values!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixServiceOrder();
