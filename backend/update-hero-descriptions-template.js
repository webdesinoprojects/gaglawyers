require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const ServiceSection = require('./models/ServiceSection');

const normalizeServiceName = (name = '') =>
  name.replace(/\s+in\s+delhi\b/gi, '').replace(/\s+/g, ' ').trim();

const buildHeroDescription = (serviceName) =>
  `${serviceName} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.`;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const heroSections = await ServiceSection.find({ type: 'hero' }).lean();
    console.log(`Found ${heroSections.length} hero sections`);

    let updated = 0;
    for (const section of heroSections) {
      const service = await Service.findById(section.serviceId).lean();
      const rawName = service?.name || section?.heading || 'Legal Service';
      const serviceName = normalizeServiceName(rawName);
      const nextDescription = buildHeroDescription(serviceName);

      const currentDescription = section?.content?.description || '';
      if (currentDescription === nextDescription) continue;

      await ServiceSection.updateOne(
        { _id: section._id },
        {
          $set: {
            'content.description': nextDescription,
          },
        }
      );
      updated += 1;
    }

    console.log(`Updated ${updated} hero descriptions`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
