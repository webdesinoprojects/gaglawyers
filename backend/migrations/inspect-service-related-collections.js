/**
 * Inspection script: Find all service-related collections
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function inspect() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📚 All collections in database:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    console.log('');

    // Check for service-related collections
    const serviceRelated = collections.filter(col => 
      col.name.toLowerCase().includes('service')
    );

    if (serviceRelated.length > 0) {
      console.log('🔍 Service-related collections found:');
      for (const col of serviceRelated) {
        const count = await db.collection(col.name).countDocuments();
        const sample = await db.collection(col.name).findOne({});
        console.log(`\n   📦 ${col.name} (${count} documents)`);
        if (sample) {
          console.log(`      Fields: ${Object.keys(sample).join(', ')}`);
        }
      }
    }

    // Check ContentBlock for service references
    const contentBlocksCol = db.collection('contentblocks');
    if (await contentBlocksCol.countDocuments() > 0) {
      const serviceBlocks = await contentBlocksCol.countDocuments({
        'usedInPages.pageName': /service/i
      });
      console.log(`\n   📦 contentblocks: ${serviceBlocks} blocks reference services`);
    }

    // Check PageContent for service pages
    const pageContentCol = db.collection('pagecontents');
    if (await pageContentCol.countDocuments() > 0) {
      const servicePages = await pageContentCol.find({
        pageName: /service/i
      }).toArray();
      console.log(`\n   📦 pagecontents: ${servicePages.length} service pages found`);
      servicePages.forEach(page => {
        console.log(`      - ${page.pageName}`);
      });
    }

    console.log('\n✅ Inspection completed!');
    
  } catch (error) {
    console.error('❌ Inspection failed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run inspection
if (require.main === module) {
  inspect()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = inspect;
