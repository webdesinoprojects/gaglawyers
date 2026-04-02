require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const Review = require('./models/Review');
const Service = require('./models/Service');
const TeamMember = require('./models/TeamMember');
const Award = require('./models/Award');
const GalleryImage = require('./models/GalleryImage');
const LocationPage = require('./models/LocationPage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected\n');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const verifyData = async () => {
  try {
    await connectDB();

    console.log('='.repeat(70));
    console.log('DATABASE CONTENT VERIFICATION');
    console.log('='.repeat(70));
    console.log('Checking all collections for API-ready data...\n');

    // Blog Posts
    const totalBlogs = await BlogPost.countDocuments();
    const publishedBlogs = await BlogPost.countDocuments({ isPublished: true });
    console.log('📝 BLOG POSTS:');
    console.log(`   Total: ${totalBlogs}`);
    console.log(`   Published: ${publishedBlogs}`);
    if (publishedBlogs > 0) {
      const recentBlogs = await BlogPost.find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .select('title category publishedAt');
      console.log('   Recent Posts:');
      recentBlogs.forEach(blog => {
        console.log(`     • ${blog.title} (${blog.category})`);
      });
    }
    console.log('');

    // Testimonials/Reviews
    const totalReviews = await Review.countDocuments();
    const featuredReviews = await Review.countDocuments({ isFeatured: true });
    const publishedReviews = await Review.countDocuments({ isPublished: true });
    console.log('💬 TESTIMONIALS/REVIEWS:');
    console.log(`   Total: ${totalReviews}`);
    console.log(`   Published: ${publishedReviews}`);
    console.log(`   Featured: ${featuredReviews}`);
    if (featuredReviews > 0) {
      const featured = await Review.find({ isFeatured: true })
        .select('clientName designation rating');
      console.log('   Featured Reviews:');
      featured.forEach(review => {
        console.log(`     • ${review.clientName} - ${review.designation} (${review.rating}★)`);
      });
    }
    console.log('');

    // Services
    const totalServices = await Service.countDocuments();
    console.log('⚖️  SERVICES:');
    console.log(`   Total: ${totalServices}`);
    if (totalServices > 0) {
      const services = await Service.find().sort({ order: 1 }).select('name category');
      console.log('   All Services:');
      services.forEach((service, index) => {
        console.log(`     ${index + 1}. ${service.name} (${service.category})`);
      });
    }
    console.log('');

    // Team Members
    const totalTeam = await TeamMember.countDocuments();
    const activeTeam = await TeamMember.countDocuments({ isActive: true });
    console.log('👥 TEAM MEMBERS:');
    console.log(`   Total: ${totalTeam}`);
    console.log(`   Active: ${activeTeam}`);
    if (activeTeam > 0) {
      const team = await TeamMember.find({ isActive: true })
        .sort({ order: 1 })
        .select('name designation');
      console.log('   Active Members:');
      team.forEach(member => {
        console.log(`     • ${member.name} - ${member.designation}`);
      });
    }
    console.log('');

    // Awards
    const totalAwards = await Award.countDocuments();
    console.log('🏆 AWARDS:');
    console.log(`   Total: ${totalAwards}`);
    if (totalAwards > 0) {
      const awards = await Award.find().sort({ year: -1 }).limit(5).select('title year');
      console.log('   Recent Awards:');
      awards.forEach(award => {
        console.log(`     • ${award.title} (${award.year})`);
      });
    }
    console.log('');

    // Gallery Images
    const totalImages = await GalleryImage.countDocuments();
    const activeImages = await GalleryImage.countDocuments({ isActive: true });
    console.log('🖼️  GALLERY IMAGES:');
    console.log(`   Total: ${totalImages}`);
    console.log(`   Active: ${activeImages}`);
    if (activeImages > 0) {
      const categories = await GalleryImage.distinct('category', { isActive: true });
      console.log(`   Categories: ${categories.join(', ')}`);
    }
    console.log('');

    // Location Pages
    const totalLocations = await LocationPage.countDocuments();
    const activeLocations = await LocationPage.countDocuments({ isActive: true });
    console.log('📍 LOCATION PAGES:');
    console.log(`   Total: ${totalLocations}`);
    console.log(`   Active: ${activeLocations}`);
    if (totalLocations > 0) {
      const cities = await LocationPage.distinct('city');
      console.log(`   Unique Cities: ${cities.length}`);
      const serviceCount = await LocationPage.distinct('service');
      console.log(`   Services Covered: ${serviceCount.length}`);
    }
    console.log('');

    // Summary
    console.log('='.repeat(70));
    console.log('SUMMARY');
    console.log('='.repeat(70));
    
    const hasContent = {
      blogs: publishedBlogs > 0,
      testimonials: featuredReviews > 0,
      services: totalServices >= 25,
      team: activeTeam > 0,
      awards: totalAwards > 0,
      gallery: activeImages > 0,
      locations: activeLocations > 0,
    };

    console.log('Content Status:');
    console.log(`   ${hasContent.blogs ? '✓' : '✗'} Blog Posts ${hasContent.blogs ? '(Ready)' : '(Missing - Run seed-blogs-testimonials.js)'}`);
    console.log(`   ${hasContent.testimonials ? '✓' : '✗'} Testimonials ${hasContent.testimonials ? '(Ready)' : '(Missing - Run seed-blogs-testimonials.js)'}`);
    console.log(`   ${hasContent.services ? '✓' : '✗'} Services ${hasContent.services ? '(Ready)' : '(Missing - Run seed-services.js)'}`);
    console.log(`   ${hasContent.team ? '✓' : '✗'} Team Members ${hasContent.team ? '(Ready)' : '(Add via Admin Panel)'}`);
    console.log(`   ${hasContent.awards ? '✓' : '✗'} Awards ${hasContent.awards ? '(Ready)' : '(Add via Admin Panel)'}`);
    console.log(`   ${hasContent.gallery ? '✓' : '✗'} Gallery ${hasContent.gallery ? '(Ready)' : '(Add via Admin Panel)'}`);
    console.log(`   ${hasContent.locations ? '✓' : '✗'} Location Pages ${hasContent.locations ? '(Ready)' : '(Run fix-everything.js)'}`);

    const allReady = Object.values(hasContent).every(v => v);
    console.log('');
    if (allReady) {
      console.log('✓ ALL CONTENT READY! Your website is fully populated.');
    } else {
      console.log('⚠ Some content is missing. Run the suggested scripts to populate.');
    }
    console.log('='.repeat(70));

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error verifying data:', error);
    process.exit(1);
  }
};

verifyData();
