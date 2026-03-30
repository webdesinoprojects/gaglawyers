require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const services = [
  {
    title: 'Corporate Law',
    description: 'Strategic counsel for mergers, acquisitions, and corporate governance. We guide businesses through complex regulatory landscapes.',
    iconName: 'Building2',
    order: 1,
  },
  {
    title: 'Civil Litigation',
    description: 'Expert representation in complex civil disputes and commercial litigation. Decades of courtroom experience.',
    iconName: 'Scale',
    order: 2,
  },
  {
    title: 'Real Estate Law',
    description: 'Comprehensive legal services for property transactions and disputes. Full spectrum of real estate matters.',
    iconName: 'Home',
    order: 3,
  },
  {
    title: 'Family Law',
    description: 'Sensitive handling of matrimonial and family matters with empathy and discretion.',
    iconName: 'Users',
    order: 4,
  },
  {
    title: 'Criminal Defense',
    description: 'Vigorous representation for clients facing criminal charges. Protecting your rights at every stage.',
    iconName: 'Shield',
    order: 5,
  },
  {
    title: 'Intellectual Property',
    description: 'Protect your innovations and creative works. Trademark, copyright, patent, and IP litigation services.',
    iconName: 'Lightbulb',
    order: 6,
  },
  {
    title: 'Employment & Labour Law',
    description: 'Advisory on employment agreements, workplace policies, and labour compliance. Representation before tribunals.',
    iconName: 'Briefcase',
    order: 7,
  },
  {
    title: 'International & Cross-Border',
    description: 'Specialized services for NRIs and international businesses. Property disputes, matrimonial cases, and cross-border contracts.',
    iconName: 'Globe',
    order: 8,
  },
];

const seedServices = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing services...');
    await Service.deleteMany({});

    console.log('🌱 Seeding services...');
    const created = await Service.insertMany(services);

    console.log(`✅ Successfully created ${created.length} services:`);
    created.forEach(service => {
      console.log(`   - ${service.title} (order: ${service.order})`);
    });

    console.log('\n✅ Services seeding complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to Services Manager: http://localhost:5173/admin/services');
    console.log('   2. Edit services or add more');
    console.log('   3. Services will appear on Home and Services pages');
    console.log('   4. Use these services in Location Pages Manager\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
