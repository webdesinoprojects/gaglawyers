require('dotenv').config();
const mongoose = require('mongoose');
const Award = require('./models/Award');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const awards = [
  {
    title: 'Excellence in Legal Practice Award',
    description: 'Recognized for outstanding contribution to the legal profession and exceptional client service over 25 years',
    year: 2024,
    issuingBody: 'Bar Council of India',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
    order: 1,
    isPublished: true,
  },
  {
    title: 'Top Law Firm of the Year',
    description: 'Awarded for exceptional client service, legal expertise, and innovative approach to complex legal matters',
    year: 2023,
    issuingBody: 'Indian Law Society',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    order: 2,
    isPublished: true,
  },
  {
    title: 'Corporate Law Excellence Award',
    description: 'Outstanding performance in corporate legal advisory and successful representation in high-profile corporate cases',
    year: 2023,
    issuingBody: 'National Legal Awards',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    order: 3,
    isPublished: true,
  },
  {
    title: 'Best Criminal Defense Firm',
    description: 'Recognition for exceptional defense strategies and successful outcomes in complex criminal cases',
    year: 2022,
    issuingBody: 'Criminal Law Association of India',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    order: 4,
    isPublished: true,
  },
  {
    title: 'Pro Bono Service Award',
    description: 'Honored for commitment to providing free legal aid to underprivileged communities and social justice initiatives',
    year: 2022,
    issuingBody: 'Legal Aid Society',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    order: 5,
    isPublished: true,
  },
  {
    title: 'Civil Litigation Excellence',
    description: 'Awarded for outstanding representation in civil litigation matters and achieving favorable outcomes for clients',
    year: 2021,
    issuingBody: 'High Court Bar Association',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    order: 6,
    isPublished: true,
  },
  {
    title: 'Family Law Specialist Recognition',
    description: 'Recognition for compassionate and effective handling of sensitive family law matters',
    year: 2021,
    issuingBody: 'Family Law Council',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    order: 7,
    isPublished: true,
  },
  {
    title: 'Legal Innovation Award',
    description: 'Recognized for implementing innovative legal strategies and adopting modern technology in legal practice',
    year: 2020,
    issuingBody: 'Legal Tech Association',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    order: 8,
    isPublished: true,
  },
  {
    title: 'Client Service Excellence',
    description: 'Awarded for maintaining highest standards of client satisfaction and professional ethics',
    year: 2020,
    issuingBody: 'Legal Services Board',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    order: 9,
    isPublished: true,
  },
  {
    title: '25 Years of Legal Excellence',
    description: 'Milestone recognition for 25 years of dedicated service to the legal profession and community',
    year: 2019,
    issuingBody: 'Supreme Court Bar Association',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    order: 10,
    isPublished: true,
  },
];

const seedAwards = async () => {
  try {
    await connectDB();

    console.log('\n🏆 Seeding Awards...');
    
    let addedCount = 0;
    let skippedCount = 0;

    for (const awardData of awards) {
      const existingAward = await Award.findOne({ 
        title: awardData.title,
        year: awardData.year 
      });
      
      if (existingAward) {
        console.log(`  ⊘ Award "${awardData.title}" (${awardData.year}) already exists, skipping...`);
        skippedCount++;
      } else {
        await Award.create(awardData);
        console.log(`  ✓ Created award: "${awardData.title}" (${awardData.year})`);
        addedCount++;
      }
    }

    // Get statistics
    const totalAwards = await Award.countDocuments();
    const publishedAwards = await Award.countDocuments({ isPublished: true });
    const years = await Award.distinct('year');
    const issuingBodies = await Award.distinct('issuingBody');

    console.log('\n' + '='.repeat(60));
    console.log('✓ AWARDS SEEDING COMPLETED');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   • Awards Added: ${addedCount}`);
    console.log(`   • Awards Skipped: ${skippedCount}`);
    console.log(`   • Total Awards in Database: ${totalAwards}`);
    console.log(`   • Published Awards: ${publishedAwards}`);
    console.log(`   • Years Covered: ${years.sort((a, b) => b - a).join(', ')}`);
    console.log(`   • Issuing Bodies: ${issuingBodies.length}`);
    console.log('\n🏅 Awards by Year:');
    
    const yearCounts = {};
    awards.forEach(award => {
      yearCounts[award.year] = (yearCounts[award.year] || 0) + 1;
    });
    
    Object.keys(yearCounts).sort((a, b) => b - a).forEach(year => {
      console.log(`   • ${year}: ${yearCounts[year]} award(s)`);
    });
    
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding awards:', error);
    process.exit(1);
  }
};

// Run the seed function
seedAwards();
