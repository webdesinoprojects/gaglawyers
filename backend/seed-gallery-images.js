require('dotenv').config();
const mongoose = require('mongoose');
const GalleryImage = require('./models/GalleryImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const galleryImages = [
  // Office Images
  {
    title: 'Modern Office Reception',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'office',
    description: 'Our welcoming reception area designed for client comfort',
    order: 1,
    isActive: true,
  },
  {
    title: 'Conference Room',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    category: 'office',
    description: 'State-of-the-art conference facilities for client meetings',
    order: 2,
    isActive: true,
  },

  // Courtroom Advocacy
  {
    title: 'Supreme Court Appearance',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    category: 'courtroom',
    description: 'Our team representing clients at the Supreme Court',
    order: 3,
    isActive: true,
  },
  {
    title: 'High Court Proceedings',
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
    category: 'courtroom',
    description: 'Advocating for justice in High Court',
    order: 4,
    isActive: true,
  },
  {
    title: 'District Court Hearing',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    category: 'courtroom',
    description: 'Professional representation in district court',
    order: 5,
    isActive: true,
  },

  // Client Engagements
  {
    title: 'Client Consultation',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    category: 'client',
    description: 'Personalized legal consultation with our senior advocates',
    order: 6,
    isActive: true,
  },
  {
    title: 'Strategy Discussion',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'client',
    description: 'Collaborative case strategy planning session',
    order: 7,
    isActive: true,
  },
  {
    title: 'Document Review',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    category: 'client',
    description: 'Thorough review of legal documents with clients',
    order: 8,
    isActive: true,
  },

  // Events & Conferences
  {
    title: 'Legal Conference 2024',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'events',
    description: 'Annual legal conference with industry leaders',
    order: 9,
    isActive: true,
  },
  {
    title: 'Seminar on Corporate Law',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    category: 'events',
    description: 'Educational seminar on recent corporate law developments',
    order: 10,
    isActive: true,
  },
  {
    title: 'Professional Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    category: 'events',
    description: 'Interactive workshop on legal best practices',
    order: 11,
    isActive: true,
  },

  // Firm Milestones
  {
    title: '25 Years of Excellence',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    category: 'milestones',
    description: 'Celebrating 25 years of legal excellence',
    order: 12,
    isActive: true,
  },
  {
    title: 'Award Ceremony',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=800&q=80',
    category: 'milestones',
    description: 'Recognition for outstanding legal services',
    order: 13,
    isActive: true,
  },

  // Community & Outreach
  {
    title: 'Legal Aid Camp',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    category: 'community',
    description: 'Free legal aid camp for underprivileged communities',
    order: 14,
    isActive: true,
  },
  {
    title: 'Law Student Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    category: 'community',
    description: 'Mentoring the next generation of legal professionals',
    order: 15,
    isActive: true,
  },
];

const seedGallery = async () => {
  try {
    await connectDB();

    console.log('\n🖼️  Seeding Gallery Images...');
    
    let addedCount = 0;
    let skippedCount = 0;

    for (const imageData of galleryImages) {
      const existingImage = await GalleryImage.findOne({ 
        title: imageData.title,
        category: imageData.category 
      });
      
      if (existingImage) {
        console.log(`  ⊘ Image "${imageData.title}" already exists, skipping...`);
        skippedCount++;
      } else {
        await GalleryImage.create(imageData);
        console.log(`  ✓ Created image: "${imageData.title}" (${imageData.category})`);
        addedCount++;
      }
    }

    // Get statistics
    const totalImages = await GalleryImage.countDocuments();
    const activeImages = await GalleryImage.countDocuments({ isActive: true });
    const categories = await GalleryImage.distinct('category');

    console.log('\n' + '='.repeat(60));
    console.log('✓ GALLERY SEEDING COMPLETED');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   • Images Added: ${addedCount}`);
    console.log(`   • Images Skipped: ${skippedCount}`);
    console.log(`   • Total Images in Gallery: ${totalImages}`);
    console.log(`   • Active Images: ${activeImages}`);
    console.log(`   • Categories: ${categories.length}`);
    console.log(`\n📁 Categories:`);
    categories.forEach(cat => {
      const count = galleryImages.filter(img => img.category === cat).length;
      console.log(`   • ${cat}: ${count} images`);
    });
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding gallery:', error);
    process.exit(1);
  }
};

// Run the seed function
seedGallery();
