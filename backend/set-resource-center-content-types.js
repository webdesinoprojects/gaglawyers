require('dotenv').config();
const connectDB = require('./config/db');
const BlogPost = require('./models/BlogPost');

const main = async () => {
  try {
    console.log('\nSetting contentType for existing resource entries...\n');
    await connectDB();

    const result = await BlogPost.updateMany(
      { $or: [{ contentType: { $exists: false } }, { contentType: null }, { contentType: '' }] },
      { $set: { contentType: 'article' } }
    );

    console.log(`Matched: ${result.matchedCount}, Updated: ${result.modifiedCount}`);
    console.log('\nDone.\n');
    process.exit(0);
  } catch (error) {
    console.error('\nFailed to set content types:', error);
    process.exit(1);
  }
};

main();
