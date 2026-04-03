require('dotenv').config();
const mongoose = require('mongoose');
const ContactInquiry = require('./models/ContactInquiry');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { ssl: true });
    console.log('📧 Checking Contact Inquiries...\n');
    
    const count = await ContactInquiry.countDocuments();
    console.log('📧 Total Contact Inquiries in DB:', count);
    
    if (count > 0) {
      const inquiries = await ContactInquiry.find({}).limit(5);
      console.log('\n📋 Sample Inquiries:');
      inquiries.forEach((i, idx) => {
        console.log(`${idx+1}. Name: ${i.name}, Email: ${i.email}, Created: ${i.createdAt}`);
      });
    }
    
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
