require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const BlogPost = require('./models/BlogPost');
const PageContent = require('./models/PageContent');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function checkAllSEO() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    // Check Locations
    console.log('=== LOCATIONS ===');
    const totalLocations = await LocationPage.countDocuments();
    const locationsWithSEO = await LocationPage.countDocuments({
      'seo.description': { $exists: true, $ne: '', $ne: null }
    });
    console.log(`Total: ${totalLocations.toLocaleString()}`);
    console.log(`With SEO: ${locationsWithSEO.toLocaleString()}`);
    console.log(`Missing SEO: ${(totalLocations - locationsWithSEO).toLocaleString()}`);

    // Check Blogs
    console.log('\n=== BLOGS ===');
    const totalBlogs = await BlogPost.countDocuments();
    const blogsWithSEO = await BlogPost.countDocuments({
      'seo.description': { $exists: true, $ne: '', $ne: null }
    });
    console.log(`Total: ${totalBlogs.toLocaleString()}`);
    console.log(`With SEO: ${blogsWithSEO.toLocaleString()}`);
    console.log(`Missing SEO: ${(totalBlogs - blogsWithSEO).toLocaleString()}`);

    // Check Static Pages
    console.log('\n=== STATIC PAGES ===');
    const totalPages = await PageContent.countDocuments();
    const pagesWithSEO = await PageContent.countDocuments({
      'seo.description': { $exists: true, $ne: '', $ne: null }
    });
    console.log(`Total: ${totalPages.toLocaleString()}`);
    console.log(`With SEO: ${pagesWithSEO.toLocaleString()}`);
    console.log(`Missing SEO: ${(totalPages - pagesWithSEO).toLocaleString()}`);

    // Overall Stats
    console.log('\n=== OVERALL ===');
    const grandTotal = totalLocations + totalBlogs + totalPages;
    const grandWithSEO = locationsWithSEO + blogsWithSEO + pagesWithSEO;
    console.log(`Total Pages: ${grandTotal.toLocaleString()}`);
    console.log(`With SEO: ${grandWithSEO.toLocaleString()}`);
    console.log(`Missing SEO: ${(grandTotal - grandWithSEO).toLocaleString()}`);
    console.log(`Completion Rate: ${Math.round((grandWithSEO / grandTotal) * 100)}%`);

    // Sample pages without SEO
    if (totalPages - pagesWithSEO > 0) {
      console.log('\n--- Sample static pages without SEO ---');
      const samplePages = await PageContent.find({
        $or: [
          { 'seo.description': { $exists: false } },
          { 'seo.description': '' },
          { 'seo.description': null }
        ]
      }).limit(3);

      samplePages.forEach((page, i) => {
        console.log(`\n${i + 1}. ${page.pageName}`);
        console.log(`   SEO Title: ${page.seo?.title || 'MISSING'}`);
        console.log(`   SEO Description: ${page.seo?.description || 'MISSING'}`);
      });
    }

    if (totalBlogs - blogsWithSEO > 0) {
      console.log('\n--- Sample blogs without SEO ---');
      const sampleBlogs = await BlogPost.find({
        $or: [
          { 'seo.description': { $exists: false } },
          { 'seo.description': '' },
          { 'seo.description': null }
        ]
      }).limit(3);

      sampleBlogs.forEach((blog, i) => {
        console.log(`\n${i + 1}. ${blog.title}`);
        console.log(`   SEO Title: ${blog.seo?.title || 'MISSING'}`);
        console.log(`   SEO Description: ${blog.seo?.description || 'MISSING'}`);
      });
    }

    console.log('\n✓ Check completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

checkAllSEO();
