require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Review = require('./models/Review');

const addTestimonials = async () => {
  try {
    console.log('\n📝 Adding Testimonials to Database...\n');
    
    await connectDB();
    
    const testimonials = [
      {
        clientName: 'Rajesh Kumar',
        designation: 'CEO, Tech Innovations Ltd',
        content: 'GAG Lawyers provided exceptional service during our corporate merger. Their attention to detail and strategic advice was invaluable. The team demonstrated deep expertise in corporate law and guided us through every step of the process.',
        rating: 5,
        imageUrl: '',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
      {
        clientName: 'Priya Sharma',
        designation: 'Business Owner',
        content: 'Professional, responsive, and highly knowledgeable. They handled our property dispute with remarkable expertise. I highly recommend GAG Lawyers for any real estate legal matters.',
        rating: 5,
        imageUrl: '',
        order: 2,
        isPublished: true,
        isFeatured: true,
      },
      {
        clientName: 'Amit Patel',
        designation: 'Managing Director',
        content: 'The team at GAG Lawyers is simply outstanding. They guided us through a complex legal matter with clarity and confidence. Their professionalism and dedication to client success is unmatched.',
        rating: 5,
        imageUrl: '',
        order: 3,
        isPublished: true,
        isFeatured: true,
      },
      {
        clientName: 'Sneha Reddy',
        designation: 'Entrepreneur',
        content: 'Excellent legal counsel for our startup. They helped us navigate complex regulatory requirements and provided strategic advice that was crucial for our business growth.',
        rating: 5,
        imageUrl: '',
        order: 4,
        isPublished: true,
        isFeatured: false,
      },
      {
        clientName: 'Vikram Singh',
        designation: 'Real Estate Developer',
        content: 'GAG Lawyers handled multiple property transactions for our company. Their expertise in real estate law and attention to detail ensured smooth closings every time.',
        rating: 5,
        imageUrl: '',
        order: 5,
        isPublished: true,
        isFeatured: false,
      },
      {
        clientName: 'Anita Desai',
        designation: 'HR Director',
        content: 'They provided excellent guidance on employment law matters. The team is knowledgeable, responsive, and always available when we need them.',
        rating: 5,
        imageUrl: '',
        order: 6,
        isPublished: true,
        isFeatured: false,
      },
      {
        clientName: 'Rahul Mehta',
        designation: 'CFO, Manufacturing Co.',
        content: 'Outstanding service in handling our corporate compliance matters. GAG Lawyers demonstrated exceptional knowledge of corporate governance and regulatory requirements.',
        rating: 5,
        imageUrl: '',
        order: 7,
        isPublished: true,
        isFeatured: false,
      },
      {
        clientName: 'Kavita Iyer',
        designation: 'Founder, Tech Startup',
        content: 'They helped us with intellectual property protection and contract negotiations. Their strategic advice was instrumental in securing our first major partnership.',
        rating: 5,
        imageUrl: '',
        order: 8,
        isPublished: true,
        isFeatured: false,
      },
    ];

    console.log('Checking existing reviews...');
    const existingCount = await Review.countDocuments();
    console.log(`Found ${existingCount} existing reviews`);
    
    if (existingCount > 0) {
      console.log('\n⚠️  Reviews already exist in database.');
      console.log('Options:');
      console.log('1. Keep existing reviews (do nothing)');
      console.log('2. Add new reviews alongside existing ones');
      console.log('3. Replace all reviews with new ones');
      console.log('\nTo replace existing reviews, uncomment the delete line in the script.');
      console.log('To add alongside, the script will continue...\n');
      
      // Uncomment the line below to delete existing reviews
      // await Review.deleteMany();
      // console.log('✓ Deleted existing reviews\n');
    }

    console.log('Adding testimonials...');
    const created = await Review.insertMany(testimonials);
    
    console.log(`\n✅ Successfully added ${created.length} testimonials!\n`);
    
    console.log('Summary:');
    console.log(`  - Total reviews in database: ${await Review.countDocuments()}`);
    console.log(`  - Featured reviews: ${await Review.countDocuments({ isFeatured: true })}`);
    console.log(`  - Published reviews: ${await Review.countDocuments({ isPublished: true })}`);
    
    console.log('\n📋 Featured Reviews (shown on homepage):');
    const featured = await Review.find({ isFeatured: true, isPublished: true }).sort({ order: 1 });
    featured.forEach((review, index) => {
      console.log(`  ${index + 1}. ${review.clientName} - ${review.designation}`);
      console.log(`     "${review.content.substring(0, 60)}..."`);
    });
    
    console.log('\n✅ Done! You can now manage these reviews from the admin panel.');
    console.log('   Admin Panel: http://localhost:5173/admin/reviews\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding testimonials:', error);
    process.exit(1);
  }
};

addTestimonials();
