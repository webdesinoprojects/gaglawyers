/**
 * Final cleanup: Remove remaining old fields
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function cleanup() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const servicesCollection = db.collection('services');

    console.log('🧹 Removing remaining old fields...');
    const result = await servicesCollection.updateMany(
      {},
      {
        $unset: {
          documentChecklist: '',
          popularCases: '',
          seoKeywords: ''
        }
      }
    );

    console.log(`✅ Cleaned ${result.modifiedCount} services\n`);

    // Verify final state
    const sample = await servicesCollection.findOne({});
    console.log('📋 Final service structure:');
    console.log('   Fields:', Object.keys(sample).join(', '));
    console.log('   Sample:', JSON.stringify(sample, null, 2));

    console.log('\n✅ Final cleanup completed!');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

if (require.main === module) {
  cleanup()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = cleanup;
