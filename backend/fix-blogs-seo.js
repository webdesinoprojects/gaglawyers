require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function fixBlogsSEO() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    // Find blogs without meta descriptions
    const blogsToFix = await BlogPost.find({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    });

    console.log(`Found ${blogsToFix.length} blogs to fix\n`);

    let fixed = 0;
    let failed = 0;

    for (const blog of blogsToFix) {
      try {
        console.log(`Fixing: ${blog.title}`);
        
        // Ensure seo object exists
        if (!blog.seo) {
          blog.seo = {};
        }
        
        blog.seo.title = blog.title + ' | GAG Lawyers';
        blog.seo.description = blog.excerpt || `Read about ${blog.title} - Expert legal insights from GAG Lawyers.`;
        
        if (!blog.tags || blog.tags.length === 0) {
          blog.tags = ['legal', 'law', 'advice'];
        }
        
        blog.seo.keywords = blog.tags.join(', ');
        
        await blog.save();
        console.log(`  ✓ SEO Title: ${blog.seo.title}`);
        console.log(`  ✓ SEO Description: ${blog.seo.description.substring(0, 80)}...`);
        console.log(`  ✓ SEO Keywords: ${blog.seo.keywords}\n`);
        fixed++;
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}\n`);
        failed++;
      }
    }

    console.log(`\n=== RESULTS ===`);
    console.log(`Fixed: ${fixed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${blogsToFix.length}`);

    console.log('\n✓ Bulk fix completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixBlogsSEO();
