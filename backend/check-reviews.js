require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Review = require('./models/Review');

const checkReviews = async () => {
  try {
    console.log('\n📋 Checking Reviews in Database...\n');
    
    await connectDB();
    
    const reviews = await Review.find().sort({ order: 1 });
    
    console.log(`Found ${reviews.length} reviews:\n`);
    
    reviews.forEach((review, index) => {
      console.log(`${index + 1}. ${review.clientName}`);
      console.log(`   Designation: ${review.designation || 'N/A'}`);
      console.log(`   Rating: ${review.rating} stars`);
      console.log(`   Published: ${review.isPublished ? 'Yes' : 'No'}`);
      console.log(`   Featured: ${review.isFeatured ? 'Yes' : 'No'}`);
      console.log(`   Image URL: ${review.imageUrl || 'No image'}`);
      console.log(`   Cloudinary ID: ${review.cloudinaryPublicId || 'N/A'}`);
      console.log(`   Content: "${review.content.substring(0, 60)}..."`);
      console.log('');
    });
    
    console.log('---\n');
    
    const featured = await Review.find({ isFeatured: true, isPublished: true }).sort({ order: 1 });
    console.log(`Featured reviews (shown on homepage): ${featured.length}`);
    featured.forEach((review) => {
      console.log(`  - ${review.clientName} ${review.imageUrl ? '(with image)' : '(no image)'}`);
    });
    
    console.log('\n✅ Done!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkReviews();
