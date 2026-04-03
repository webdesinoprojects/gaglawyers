/**
 * UNDO SCRIPT - Restores database to original state
 * This script undoes the seed-25-services.js changes
 * It deletes all 25 services and restores the original basic services
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./models/Service');

const originalServices = [
  {
    name: 'Corporate Law',
    slug: 'corporate-law',
    category: 'corporate',
    shortDescription: 'Comprehensive legal services for businesses including M&A, compliance, and contracts.',
    longDescription: 'Comprehensive legal services for businesses including M&A, compliance, contracts, and corporate governance. We provide expert guidance on business structuring, regulatory matters, and commercial transactions.',
    iconName: 'Briefcase',
    order: 1,
  },
  {
    name: 'Civil Litigation',
    slug: 'civil-litigation',
    category: 'litigation',
    shortDescription: 'Expert representation in civil disputes, property matters, and contract disputes.',
    longDescription: 'Expert representation in civil disputes, property matters, contract disputes, and appellate practice. Our experienced litigators handle complex civil cases with strategic precision.',
    iconName: 'Gavel',
    order: 2,
  },
  {
    name: 'Real Estate Law',
    slug: 'real-estate-law',
    category: 'property',
    shortDescription: 'Complete legal support for property transactions, title verification, and disputes.',
    longDescription: 'Complete legal support for property transactions, title verification, disputes, and development projects. We ensure smooth property dealings with thorough due diligence and documentation.',
    iconName: 'Home',
    order: 3,
  },
  {
    name: 'Family Law',
    slug: 'family-law',
    category: 'family',
    shortDescription: 'Sensitive handling of divorce, custody, and matrimonial disputes.',
    longDescription: 'Sensitive handling of divorce, custody, matrimonial disputes, and family matters. We provide compassionate yet effective representation tailored to your family\'s needs.',
    iconName: 'Heart',
    order: 4,
  },
  {
    name: 'Criminal Defense',
    slug: 'criminal-defense',
    category: 'criminal',
    shortDescription: 'Vigorous defense in criminal matters and white-collar crime cases.',
    longDescription: 'Vigorous defense in criminal matters, white-collar crime cases, and appellate practice. We protect your rights and build strong defenses against criminal charges.',
    iconName: 'Shield',
    order: 5,
  },
  {
    name: 'Intellectual Property',
    slug: 'intellectual-property',
    category: 'corporate',
    shortDescription: 'Protection and enforcement of patents, trademarks, copyrights, and trade secrets.',
    longDescription: 'Protection and enforcement of patents, trademarks, copyrights, and trade secrets. We help businesses safeguard their intellectual property through strategic registration and enforcement.',
    iconName: 'Lock',
    order: 6,
  },
];

const undoChanges = async () => {
  try {
    console.log('🔄 Starting UNDO process...\n');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB\n');

    // Check current services
    const currentCount = await Service.countDocuments();
    console.log(`📊 Current services in database: ${currentCount}`);

    // Delete all current services
    console.log('\n🗑️  Deleting all 25 seeded services...');
    const deletion = await Service.deleteMany({});
    console.log(`✅ Deleted ${deletion.deletedCount} services`);

    // Restore original services
    console.log('\n➕ Restoring original 6 basic services...');
    const restored = await Service.insertMany(originalServices);
    console.log(`✅ Restored ${restored.length} original services`);

    // Final count
    const finalCount = await Service.countDocuments();
    console.log(`\n📈 Final services in database: ${finalCount}`);

    console.log('\n✅ UNDO COMPLETE!');
    console.log('Database services have been restored to original state.');
    console.log('\n📝 Restored Services:');
    originalServices.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.name} (${s.slug})`);
    });
    
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during undo:', error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

undoChanges();
