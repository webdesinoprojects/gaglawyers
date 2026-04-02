require('dotenv').config();
const mongoose = require('mongoose');
const LocationPage = require('./models/LocationPage');
const BlogPost = require('./models/BlogPost');
const PageContent = require('./models/PageContent');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function testSEOStats() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    console.log('=== Testing SEO Stats Endpoint Logic ===\n');

    const [
      totalLocations,
      locationsWithSEO,
      totalBlogs,
      blogsWithSEO,
      totalStaticPages,
      pagesWithSEO
    ] = await Promise.all([
      LocationPage.countDocuments(),
      LocationPage.countDocuments({ 
        'seo.description': { $exists: true, $ne: '', $ne: null } 
      }),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ 
        'seo.description': { $exists: true, $ne: '', $ne: null } 
      }),
      PageContent.countDocuments(),
      PageContent.countDocuments({ 
        'seo.description': { $exists: true, $ne: '', $ne: null } 
      })
    ]);

    const totalPages = totalLocations + totalBlogs + totalStaticPages;
    const withSEO = locationsWithSEO + blogsWithSEO + pagesWithSEO;

    console.log('Locations:');
    console.log(`  Total: ${totalLocations.toLocaleString()}`);
    console.log(`  With SEO: ${locationsWithSEO.toLocaleString()}`);
    
    console.log('\nBlogs:');
    console.log(`  Total: ${totalBlogs.toLocaleString()}`);
    console.log(`  With SEO: ${blogsWithSEO.toLocaleString()}`);
    
    console.log('\nStatic Pages:');
    console.log(`  Total: ${totalStaticPages.toLocaleString()}`);
    console.log(`  With SEO: ${pagesWithSEO.toLocaleString()}`);
    
    console.log('\n=== OVERALL STATS ===');
    console.log(`Total Pages: ${totalPages.toLocaleString()}`);
    console.log(`With SEO: ${withSEO.toLocaleString()}`);
    console.log(`Missing SEO: ${(totalPages - withSEO).toLocaleString()}`);
    console.log(`Completion Rate: ${totalPages > 0 ? Math.round((withSEO / totalPages) * 100) : 0}%`);

    console.log('\n=== API Response ===');
    const response = {
      success: true,
      data: {
        total: totalPages,
        withSEO,
        missingSEO: totalPages - withSEO,
        completionRate: totalPages > 0 ? Math.round((withSEO / totalPages) * 100) : 0,
        breakdown: {
          locations: { total: totalLocations, withSEO: locationsWithSEO },
          blogs: { total: totalBlogs, withSEO: blogsWithSEO },
          pages: { total: totalStaticPages, withSEO: pagesWithSEO }
        }
      }
    };
    console.log(JSON.stringify(response, null, 2));

    console.log('\n✓ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testSEOStats();
