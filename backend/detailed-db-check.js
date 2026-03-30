require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import all models
const User = require('./models/User');
const TeamMember = require('./models/TeamMember');
const Service = require('./models/Service');
const Award = require('./models/Award');
const GalleryImage = require('./models/GalleryImage');
const BlogPost = require('./models/BlogPost');
const Review = require('./models/Review');
const ContactInquiry = require('./models/ContactInquiry');
const PageContent = require('./models/PageContent');
const LocationPage = require('./models/LocationPage');
const SiteSettings = require('./models/SiteSettings');

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

const log = {
  header: (text) => console.log(`\n${colors.bright}${colors.cyan}${text}${colors.reset}`),
  success: (text) => console.log(`${colors.green}✓ ${text}${colors.reset}`),
  warning: (text) => console.log(`${colors.yellow}⚠ ${text}${colors.reset}`),
  error: (text) => console.log(`${colors.red}✗ ${text}${colors.reset}`),
  info: (text) => console.log(`${colors.blue}ℹ ${text}${colors.reset}`),
  data: (text) => console.log(`  ${text}`),
};

const detailedCheck = async () => {
  try {
    log.header('🔍 DETAILED DATABASE INSPECTION');
    console.log('='.repeat(80));
    
    await connectDB();
    log.success('Connected to MongoDB');
    log.info(`Database: ${mongoose.connection.name}`);
    log.info(`Host: ${mongoose.connection.host}`);
    
    const collections = [
      { 
        name: 'Users', 
        model: User, 
        hasImage: false,
        checkFields: ['name', 'email', 'role', 'isActive']
      },
      { 
        name: 'TeamMembers', 
        model: TeamMember, 
        hasImage: true, 
        imageField: 'imageUrl',
        publicIdField: 'cloudinaryPublicId',
        checkFields: ['name', 'designation', 'bio', 'order']
      },
      { 
        name: 'Services', 
        model: Service, 
        hasImage: false,
        checkFields: ['title', 'description', 'iconName']
      },
      { 
        name: 'Awards', 
        model: Award, 
        hasImage: true, 
        imageField: 'imageUrl',
        publicIdField: 'cloudinaryPublicId',
        checkFields: ['title', 'year', 'issuingBody', 'isPublished']
      },
      { 
        name: 'GalleryImages', 
        model: GalleryImage, 
        hasImage: true, 
        imageField: 'imageUrl',
        publicIdField: 'cloudinaryPublicId',
        checkFields: ['title', 'category', 'isPublished']
      },
      { 
        name: 'BlogPosts', 
        model: BlogPost, 
        hasImage: true, 
        imageField: 'featuredImage',
        publicIdField: 'featuredImagePublicId',
        checkFields: ['title', 'slug', 'author', 'category', 'isPublished', 'views']
      },
      { 
        name: 'Reviews', 
        model: Review, 
        hasImage: true, 
        imageField: 'imageUrl',
        publicIdField: 'cloudinaryPublicId',
        checkFields: ['clientName', 'rating', 'isPublished', 'isFeatured']
      },
      { 
        name: 'ContactInquiries', 
        model: ContactInquiry, 
        hasImage: false,
        checkFields: ['name', 'email', 'phone', 'serviceOfInterest']
      },
      { 
        name: 'PageContent', 
        model: PageContent, 
        hasImage: false,
        checkFields: ['pageName', 'isPublished']
      },
      { 
        name: 'LocationPages', 
        model: LocationPage, 
        hasImage: false,
        checkFields: ['serviceName', 'city', 'slug', 'isActive', 'views']
      },
      { 
        name: 'SiteSettings', 
        model: SiteSettings, 
        hasImage: false,
        checkFields: ['settingKey', 'settingValue']
      },
    ];

    const report = {
      totalCollections: collections.length,
      totalDocuments: 0,
      imageStats: {
        cloudinary: 0,
        external: 0,
        missing: 0,
        withPublicId: 0,
        withoutPublicId: 0,
      },
      issues: [],
      collections: {},
    };

    // Inspect each collection
    for (const collection of collections) {
      log.header(`\n📦 ${collection.name}`);
      console.log('-'.repeat(80));
      
      const count = await collection.model.countDocuments();
      report.totalDocuments += count;
      
      log.info(`Total documents: ${count}`);
      
      if (count === 0) {
        log.warning('No documents found in this collection');
        report.collections[collection.name] = { count: 0, status: 'empty' };
        continue;
      }
      
      // Get sample documents
      const documents = await collection.model.find().limit(3);
      
      // Check required fields
      log.info(`\nField Check:`);
      for (const field of collection.checkFields) {
        const hasField = documents.every(doc => doc[field] !== undefined);
        if (hasField) {
          log.success(`${field}: Present in all documents`);
        } else {
          log.error(`${field}: Missing in some documents`);
          report.issues.push(`${collection.name}: Missing ${field} in some documents`);
        }
      }
      
      // Analyze images if collection has them
      if (collection.hasImage) {
        log.info(`\n📸 Image Analysis:`);
        
        const imageAnalysis = await analyzeImagesDetailed(
          collection.model,
          collection.imageField,
          collection.publicIdField
        );
        
        report.imageStats.cloudinary += imageAnalysis.cloudinary;
        report.imageStats.external += imageAnalysis.external;
        report.imageStats.missing += imageAnalysis.missing;
        report.imageStats.withPublicId += imageAnalysis.withPublicId;
        report.imageStats.withoutPublicId += imageAnalysis.withoutPublicId;
        
        log.data(`Cloudinary images: ${imageAnalysis.cloudinary}`);
        log.data(`External images: ${imageAnalysis.external}`);
        log.data(`Missing images: ${imageAnalysis.missing}`);
        log.data(`With publicId: ${imageAnalysis.withPublicId}`);
        log.data(`Without publicId: ${imageAnalysis.withoutPublicId}`);
        
        // Check for issues
        if (imageAnalysis.cloudinary > 0 && imageAnalysis.withoutPublicId > 0) {
          log.warning(`${imageAnalysis.withoutPublicId} Cloudinary images missing publicId`);
          report.issues.push(
            `${collection.name}: ${imageAnalysis.withoutPublicId} Cloudinary images without publicId`
          );
        }
        
        if (imageAnalysis.external > 0) {
          log.warning(`${imageAnalysis.external} external images (won't be cleaned up)`);
        }
        
        // Show sample image URLs
        if (imageAnalysis.samples.length > 0) {
          log.info(`\nSample Image URLs:`);
          imageAnalysis.samples.forEach((sample, i) => {
            log.data(`${i + 1}. ${sample.url}`);
            if (sample.publicId) {
              log.data(`   PublicId: ${sample.publicId}`);
            } else {
              log.warning(`   No publicId`);
            }
          });
        }
      }
      
      // Show sample document structure
      log.info(`\n📄 Sample Document Structure:`);
      const sampleDoc = documents[0].toObject();
      displayDocumentStructure(sampleDoc, collection.imageField, collection.publicIdField);
      
      report.collections[collection.name] = {
        count,
        status: 'ok',
        hasImages: collection.hasImage,
      };
    }

    // Print final report
    log.header('\n\n📊 FINAL REPORT');
    console.log('='.repeat(80));
    
    log.info(`Total Collections: ${report.totalCollections}`);
    log.info(`Total Documents: ${report.totalDocuments}`);
    
    log.header('\n📸 Image Storage Summary:');
    log.data(`Cloudinary images: ${report.imageStats.cloudinary}`);
    log.data(`External images: ${report.imageStats.external}`);
    log.data(`Missing images: ${report.imageStats.missing}`);
    log.data(`With publicId: ${report.imageStats.withPublicId}`);
    log.data(`Without publicId: ${report.imageStats.withoutPublicId}`);
    
    log.header('\n📋 Collection Summary:');
    Object.entries(report.collections).forEach(([name, data]) => {
      const status = data.count === 0 ? '(empty)' : '';
      log.data(`${name}: ${data.count} documents ${status}`);
    });
    
    // Issues report
    log.header('\n⚠️  ISSUES FOUND:');
    if (report.issues.length === 0) {
      log.success('No issues detected!');
    } else {
      report.issues.forEach(issue => log.warning(issue));
    }
    
    // Recommendations
    log.header('\n💡 RECOMMENDATIONS:');
    
    if (report.imageStats.withoutPublicId > 0) {
      log.warning(
        `${report.imageStats.withoutPublicId} Cloudinary images don't have publicId. ` +
        `These won't be deleted from Cloudinary when documents are removed.`
      );
      log.info('Action: Re-upload these images through the admin panel.');
    }
    
    if (report.imageStats.external > 0) {
      log.warning(
        `${report.imageStats.external} external images (Unsplash, etc.) detected. ` +
        `These are fine for development but should be replaced with Cloudinary images for production.`
      );
      log.info('Action: Upload proper images through the admin panel.');
    }
    
    if (report.totalDocuments === 0) {
      log.warning('Database is empty. Run seed script to populate with sample data.');
      log.info('Action: npm run seed');
    }
    
    const cloudinaryPercentage = report.imageStats.cloudinary > 0
      ? ((report.imageStats.withPublicId / report.imageStats.cloudinary) * 100).toFixed(1)
      : 0;
    
    log.header('\n✅ HEALTH CHECK:');
    if (cloudinaryPercentage === 100 && report.imageStats.external === 0) {
      log.success('All images are properly stored in Cloudinary with publicIds!');
    } else if (cloudinaryPercentage >= 80) {
      log.warning(`${cloudinaryPercentage}% of Cloudinary images have publicIds. Good, but can be improved.`);
    } else {
      log.error(`Only ${cloudinaryPercentage}% of Cloudinary images have publicIds. Needs attention.`);
    }
    
    console.log('\n' + '='.repeat(80));
    log.success('INSPECTION COMPLETE\n');
    
    process.exit(0);
  } catch (error) {
    log.error(`Error inspecting database: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

async function analyzeImagesDetailed(Model, imageField, publicIdField) {
  const analysis = {
    cloudinary: 0,
    external: 0,
    missing: 0,
    withPublicId: 0,
    withoutPublicId: 0,
    samples: [],
  };
  
  const documents = await Model.find();
  
  for (const doc of documents) {
    const imageUrl = doc[imageField];
    const publicId = doc[publicIdField];
    
    if (!imageUrl || imageUrl === '') {
      analysis.missing++;
    } else if (imageUrl.includes('cloudinary.com')) {
      analysis.cloudinary++;
      
      if (publicId && publicId !== '') {
        analysis.withPublicId++;
      } else {
        analysis.withoutPublicId++;
      }
      
      // Collect samples
      if (analysis.samples.length < 3) {
        analysis.samples.push({ url: imageUrl, publicId: publicId || null });
      }
    } else {
      analysis.external++;
      
      // Collect samples
      if (analysis.samples.length < 3) {
        analysis.samples.push({ url: imageUrl, publicId: null });
      }
    }
  }
  
  return analysis;
}

function displayDocumentStructure(doc, imageField, publicIdField) {
  const structure = {};
  
  for (const [key, value] of Object.entries(doc)) {
    if (key === '_id' || key === '__v') continue;
    
    let displayValue;
    if (key === imageField || key === publicIdField) {
      displayValue = value || '(empty)';
    } else if (typeof value === 'string' && value.length > 50) {
      displayValue = value.substring(0, 50) + '...';
    } else if (value instanceof Date) {
      displayValue = value.toISOString();
    } else if (typeof value === 'object' && value !== null) {
      displayValue = Array.isArray(value) ? `[Array: ${value.length} items]` : '[Object]';
    } else {
      displayValue = value;
    }
    
    structure[key] = displayValue;
  }
  
  console.log(JSON.stringify(structure, null, 2));
}

detailedCheck();
