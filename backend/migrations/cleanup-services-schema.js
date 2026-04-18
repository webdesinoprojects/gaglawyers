/**
 * Migration: Clean up services collection
 * 
 * KEEPS: _id, name, slug
 * REMOVES: All other fields from old CMS system
 * ADDS: seo (jsonb-like object), globalSettings (jsonb-like object)
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function migrate() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const servicesCollection = db.collection('services');

    // Check current count
    const count = await servicesCollection.countDocuments();
    console.log(`📊 Found ${count} services in collection\n`);

    // Show sample of what will be removed
    const sample = await servicesCollection.findOne({});
    if (sample) {
      console.log('📋 Sample service before cleanup:');
      console.log('   Fields:', Object.keys(sample).join(', '));
      console.log('   Keeping: _id, name, slug');
      console.log('   Removing: All other fields\n');
    }

    console.log('⚠️  This will remove the following fields from ALL services:');
    console.log('   - title, heroTitle, heroDescription, heroImage');
    console.log('   - metaDescription, seoTitle');
    console.log('   - category, shortDescription, longDescription, description');
    console.log('   - overview, typesOfCases, process, keyPoints');
    console.log('   - iconName, order, contentBlocks, faqs');
    console.log('   - createdAt, updatedAt, __v\n');

    // Perform the cleanup - keep only id, name, slug
    console.log('🧹 Cleaning up services collection...');
    const result = await servicesCollection.updateMany(
      {},
      {
        $unset: {
          title: '',
          heroTitle: '',
          heroDescription: '',
          heroImage: '',
          metaDescription: '',
          seoTitle: '',
          category: '',
          shortDescription: '',
          longDescription: '',
          description: '',
          overview: '',
          typesOfCases: '',
          process: '',
          keyPoints: '',
          iconName: '',
          order: '',
          contentBlocks: '',
          faqs: '',
          createdAt: '',
          updatedAt: '',
          __v: ''
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} services\n`);

    // Add new fields with default empty values
    console.log('➕ Adding new schema fields...');
    const addResult = await servicesCollection.updateMany(
      {},
      {
        $set: {
          seo: {},
          globalSettings: {}
        }
      }
    );

    console.log(`✅ Added new fields to ${addResult.modifiedCount} services\n`);

    // Show sample after cleanup
    const cleanedSample = await servicesCollection.findOne({});
    if (cleanedSample) {
      console.log('📋 Sample service after cleanup:');
      console.log('   Fields:', Object.keys(cleanedSample).join(', '));
      console.log('   Values:', JSON.stringify(cleanedSample, null, 2));
    }

    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run migration
if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = migrate;
