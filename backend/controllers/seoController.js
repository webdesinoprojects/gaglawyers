const LocationPage = require('../models/LocationPage');
const BlogPost = require('../models/BlogPost');
const PageContent = require('../models/PageContent');

const bulkFixLocationsSEO = async (req, res) => {
  try {
    const { limit = 100 } = req.body;
    
    // Find locations without meta descriptions (checking nested seo.description)
    const locationsToFix = await LocationPage.find({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    }).limit(parseInt(limit));

    let fixed = 0;
    let failed = 0;
    const errors = [];

    for (const location of locationsToFix) {
      try {
        const city = location.city || 'India';
        const serviceName = location.serviceName || 'legal services';
        
        // Ensure seo object exists
        if (!location.seo) {
          location.seo = {};
        }
        
        // Generate SEO data
        location.seo.title = `${serviceName} in ${city} | GAG Lawyers`;
        location.seo.description = `Looking for ${serviceName} in ${city}, India? GAG Lawyers offers professional legal services with 25+ years of experience. Contact us for expert consultation.`;
        location.seo.keywords = `${serviceName}, ${city}, lawyers, legal services, advocates, India`;
        
        if (!location.seo.h1) {
          location.seo.h1 = `${serviceName} in ${city}`;
        }
        
        await location.save();
        fixed++;
      } catch (error) {
        failed++;
        errors.push({ id: location._id, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: `Bulk fix completed`,
      data: {
        total: locationsToFix.length,
        fixed,
        failed,
        errors: errors.slice(0, 10) // Return first 10 errors only
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Bulk fix error',
      error: error.message
    });
  }
};

const bulkFixBlogsSEO = async (req, res) => {
  try {
    const { limit = 100 } = req.body;
    
    const blogsToFix = await BlogPost.find({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    }).limit(parseInt(limit));

    let fixed = 0;
    let failed = 0;

    for (const blog of blogsToFix) {
      try {
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
        fixed++;
      } catch (error) {
        failed++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Bulk fix completed`,
      data: {
        total: blogsToFix.length,
        fixed,
        failed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Bulk fix error',
      error: error.message
    });
  }
};

const bulkFixPagesSEO = async (req, res) => {
  try {
    const pagesToFix = await PageContent.find({
      $or: [
        { 'seo.description': { $exists: false } },
        { 'seo.description': '' },
        { 'seo.description': null }
      ]
    });

    let fixed = 0;
    let failed = 0;

    for (const page of pagesToFix) {
      try {
        if (!page.seo) {
          page.seo = {};
        }
        
        page.seo.title = page.pageName.charAt(0).toUpperCase() + page.pageName.slice(1) + ' | GAG Lawyers';
        page.seo.description = `Professional legal services - ${page.pageName} page. Contact GAG Lawyers for expert legal consultation.`;
        page.seo.keywords = `${page.pageName}, legal services, lawyers, advocates`;
        
        await page.save();
        fixed++;
      } catch (error) {
        failed++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Bulk fix completed`,
      data: {
        total: pagesToFix.length,
        fixed,
        failed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Bulk fix error',
      error: error.message
    });
  }
};

const getSEOStats = async (req, res) => {
  try {
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

    res.status(200).json({
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching SEO stats',
      error: error.message
    });
  }
};

module.exports = {
  bulkFixLocationsSEO,
  bulkFixBlogsSEO,
  bulkFixPagesSEO,
  getSEOStats
};
