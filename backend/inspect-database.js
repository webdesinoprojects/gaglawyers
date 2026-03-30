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

const inspectDatabase = async () => {
  try {
    console.log('\n🔍 DATABASE INSPECTION STARTING...\n');
    console.log('='.repeat(80));
    
    await connectDB();
    
    const collections = [
      { name: 'Users', model: User, hasImage: false },
      { name: 'Team Members', model: TeamMember, hasImage: true, imageField: 'imageUrl' },
      { name: 'Services', model: Service, hasImage: false },
      { name: 'Awards', model: Award, hasImage: true, imageField: 'imageUrl' },
      { name: 'Gallery Images', model: GalleryImage, hasImage: true, imageField: 'imageUrl' },
      { name: 'Blog Posts', model: BlogPost, hasImage: true, imageField: 'featuredImage' },
      { name: 'Reviews', model: Review, hasImage: true, imageField: 'imageUrl' },
      { name: 'Contact Inquiries', model: ContactInquiry, hasImage: false },
      { name: 'Page Content', model: PageContent, hasImage: false },
      { name: 'Location Pages', model: LocationPage, hasImage: false },
      { name: 'Site Settings', model: SiteSettings, hasImage: false },
    ];

    const summary = {
      totalCollections: collections.length,
      totalDocuments: 0,
      cloudinaryImages: 0,
      externalImages: 0,
      missingImages: 0,
      collections: {},
    };

    for (const collection of collections) {
      console.log(`\n📦 ${collection.name.toUpperCase()}`);
      console.log('-'.repeat(80));
      
      const count = await collection.model.countDocuments();
      summary.totalDocuments += count;
      
      console.log(`Total documents: ${count}`);
      
      if (count > 0) {
        const documents = await collection.model.find().limit(5);
        
        summary.collections[collection.name] = {
          count,
          sample: documents.length > 0 ? documents[0] : null,
          imageAnalysis: null,
        };
        
        // Analyze images if collection has them
        if (collection.hasImage) {
          const imageAnalysis = await analyzeImages(
            collection.model,
            collection.imageField
          );
          summary.collections[collection.name].imageAnalysis = imageAnalysis;
          
          summary.cloudinaryImages += imageAnalysis.cloudinary;
          summary.externalImages += imageAnalysis.external;
          summary.missingImages += imageAnalysis.missing;
          
          console.log(`\n📸 Image Analysis:`);
          console.log(`  - Cloudinary images: ${imageAnalysis.cloudinary}`);
          console.log(`  - External images: ${imageAnalysis.external}`);
          console.log(`  - Missing images: ${imageAnalysis.missing}`);
          console.log(`  - Has publicId field: ${imageAnalysis.hasPublicId ? 'Yes' : 'No'}`);
        }
        
        // Show sample document
        console.log(`\n📄 Sample Document:`);
        console.log(JSON.stringify(documents[0], null, 2));
      } else {
        console.log('⚠️  No documents found');
        summary.collections[collection.name] = { count: 0, sample: null };
      }
    }

    // Print summary
    console.log('\n\n' + '='.repeat(80));
    console.log('📊 SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Collections: ${summary.totalCollections}`);
    console.log(`Total Documents: ${summary.totalDocuments}`);
    console.log(`\n📸 Image Storage:`);
    console.log(`  - Cloudinary images: ${summary.cloudinaryImages}`);
    console.log(`  - External images (Unsplash, etc.): ${summary.externalImages}`);
    console.log(`  - Missing images: ${summary.missingImages}`);
    
    console.log(`\n📋 Collection Breakdown:`);
    Object.entries(summary.collections).forEach(([name, data]) => {
      console.log(`  - ${name}: ${data.count} documents`);
    });
    
    // Check for potential issues
    console.log(`\n\n⚠️  POTENTIAL ISSUES:`);
    let issuesFound = false;
    
    if (summary.missingImages > 0) {
      console.log(`  ❌ ${summary.missingImages} documents have missing images`);
      issuesFound = true;
    }
    
    if (summary.externalImages > 0) {
      console.log(`  ⚠️  ${summary.externalImages} documents use external images (not Cloudinary)`);
      console.log(`     These won't be deleted when documents are removed`);
      issuesFound = true;
    }
    
    // Check for documents without cloudinaryPublicId
    for (const [name, data] of Object.entries(summary.collections)) {
      if (data.imageAnalysis && data.imageAnalysis.cloudinary > 0 && !data.imageAnalysis.hasPublicId) {
        console.log(`  ⚠️  ${name} has Cloudinary images but missing publicId field`);
        issuesFound = true;
      }
    }
    
    if (!issuesFound) {
      console.log(`  ✅ No issues found!`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ INSPECTION COMPLETE\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inspecting database:', error);
    process.exit(1);
  }
};

async function analyzeImages(Model, imageField) {
  const analysis = {
    cloudinary: 0,
    external: 0,
    missing: 0,
    hasPublicId: false,
  };
  
  const documents = await Model.find();
  
  // Check if model has publicId field
  if (documents.length > 0) {
    const publicIdField = imageField === 'featuredImage' 
      ? 'featuredImagePublicId' 
      : 'cloudinaryPublicId';
    analysis.hasPublicId = documents[0][publicIdField] !== undefined;
  }
  
  for (const doc of documents) {
    const imageUrl = doc[imageField];
    
    if (!imageUrl || imageUrl === '') {
      analysis.missing++;
    } else if (imageUrl.includes('cloudinary.com')) {
      analysis.cloudinary++;
    } else {
      analysis.external++;
    }
  }
  
  return analysis;
}

inspectDatabase();
