require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('All 25 Location Slugs for DELHI:\n');
  const delhi = await LocationPage.find({ city: 'Delhi' }).sort({ serviceName: 1 });
  delhi.forEach((p, i) => {
    console.log(`${i+1}. ${p.slug}`);
  });
  console.log(`\nTotal: ${delhi.length} pages`);
  mongoose.disconnect();
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
