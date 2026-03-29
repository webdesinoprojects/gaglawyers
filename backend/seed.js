require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const TeamMember = require('./models/TeamMember');
const Service = require('./models/Service');
const Award = require('./models/Award');
const GalleryImage = require('./models/GalleryImage');
const BlogPost = require('./models/BlogPost');
const Review = require('./models/Review');
const User = require('./models/User');
const SiteSettings = require('./models/SiteSettings');

const seedData = async () => {
  try {
    await connectDB();

    await TeamMember.deleteMany();
    await Service.deleteMany();
    await Award.deleteMany();
    await GalleryImage.deleteMany();
    await BlogPost.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await SiteSettings.deleteMany();

    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@gaglawyers.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'super-admin',
    });

    console.log('Seeding team members...');
    const teamMembers = await TeamMember.insertMany([
      {
        name: 'Advocate Rajesh Grover',
        designation: 'Senior Partner & Founder',
        bio: 'Over 30 years of experience in corporate law, civil litigation, and arbitration. Former member of the Bar Council of Delhi.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        order: 1,
      },
      {
        name: 'Advocate Meera Grover',
        designation: 'Managing Partner',
        bio: 'Specializes in family law, alternative dispute resolution, and women\'s rights. Member of the National Human Rights Commission panel.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
        order: 2,
      },
      {
        name: 'Advocate Vikram Singh',
        designation: 'Partner - Litigation',
        bio: 'Expert in criminal defense, appellate practice, and constitutional law. Argued cases before Supreme Court and High Courts.',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
        order: 3,
      },
      {
        name: 'Advocate Neha Kapoor',
        designation: 'Partner - Corporate',
        bio: 'Specializes in mergers & acquisitions, corporate governance, and regulatory compliance. MBA from IIM Ahmedabad.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
        order: 4,
      },
    ]);

    console.log('Seeding services...');
    const services = await Service.insertMany([
      {
        title: 'Corporate Law',
        description: 'Comprehensive legal services for businesses including M&A, compliance, contracts, and corporate governance.',
        iconName: 'Briefcase',
      },
      {
        title: 'Civil Litigation',
        description: 'Expert representation in civil disputes, property matters, contract disputes, and appellate practice.',
        iconName: 'Gavel',
      },
      {
        title: 'Real Estate Law',
        description: 'Complete legal support for property transactions, title verification, disputes, and development projects.',
        iconName: 'Home',
      },
      {
        title: 'Family Law',
        description: 'Sensitive handling of divorce, custody, matrimonial disputes, and succession planning.',
        iconName: 'Users',
      },
      {
        title: 'Criminal Defense',
        description: 'Experienced defense counsel for criminal cases, bail applications, and appellate matters.',
        iconName: 'Shield',
      },
      {
        title: 'Intellectual Property',
        description: 'Protection and enforcement of trademarks, copyrights, patents, and trade secrets.',
        iconName: 'Lightbulb',
      },
    ]);

    console.log('Seeding awards...');
    await Award.insertMany([
      {
        title: 'Excellence in Legal Practice Award',
        description: 'Recognized for outstanding contribution to the legal profession',
        year: 2024,
        issuingBody: 'Bar Council of India',
        imageUrl: '',
        order: 1,
      },
      {
        title: 'Top Law Firm of the Year',
        description: 'Awarded for exceptional client service and legal expertise',
        year: 2023,
        issuingBody: 'Indian Law Society',
        imageUrl: '',
        order: 2,
      },
      {
        title: 'Corporate Law Excellence',
        description: 'Outstanding performance in corporate legal advisory',
        year: 2023,
        issuingBody: 'National Legal Awards',
        imageUrl: '',
        order: 3,
      },
    ]);

    console.log('Seeding gallery images...');
    await GalleryImage.insertMany([
      {
        title: 'Office Reception',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        category: 'office',
        order: 1,
      },
      {
        title: 'Conference Room',
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
        category: 'office',
        order: 2,
      },
      {
        title: 'Law Library',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop',
        category: 'office',
        order: 3,
      },
    ]);

    console.log('Seeding blog posts...');
    await BlogPost.insertMany([
      {
        title: 'Understanding Corporate Governance in Modern India',
        slug: 'corporate-governance-modern-india',
        excerpt: 'An in-depth look at the evolving landscape of corporate governance and compliance requirements for Indian businesses.',
        content: '<p>Corporate governance in India has evolved significantly in recent years...</p>',
        featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
        author: adminUser._id,
        category: 'Corporate Law',
        tags: ['corporate governance', 'compliance', 'business law'],
        isPublished: true,
        publishedAt: new Date('2026-03-15'),
      },
      {
        title: 'Real Estate Law: Key Changes in 2026',
        slug: 'real-estate-law-changes-2026',
        excerpt: 'Important updates and amendments affecting property transactions and real estate development in India.',
        content: '<p>The real estate sector in India has witnessed several key legal changes...</p>',
        featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
        author: adminUser._id,
        category: 'Real Estate',
        tags: ['real estate', 'property law', 'legal updates'],
        isPublished: true,
        publishedAt: new Date('2026-03-10'),
      },
    ]);

    console.log('Seeding reviews...');
    await Review.insertMany([
      {
        clientName: 'Rajesh Kumar',
        designation: 'CEO, Tech Innovations Ltd',
        content: 'GAG Lawyers provided exceptional service during our corporate merger. Their attention to detail and strategic advice was invaluable.',
        rating: 5,
        order: 1,
        isFeatured: true,
      },
      {
        clientName: 'Priya Sharma',
        designation: 'Business Owner',
        content: 'Professional, responsive, and highly knowledgeable. They handled our property dispute with remarkable expertise.',
        rating: 5,
        order: 2,
        isFeatured: true,
      },
      {
        clientName: 'Amit Patel',
        designation: 'Managing Director',
        content: 'The team at GAG Lawyers is simply outstanding. They guided us through a complex legal matter with clarity and confidence.',
        rating: 5,
        order: 3,
        isFeatured: true,
      },
    ]);

    console.log('Seeding site settings...');
    await SiteSettings.insertMany([
      {
        settingKey: 'disclaimerEnabled',
        settingValue: true,
        description: 'Enable/disable disclaimer popup',
      },
      {
        settingKey: 'disclaimerText',
        settingValue: 'The information provided on this website is for general informational purposes only. It does not constitute legal advice and should not be relied upon as such. No attorney-client relationship is created by use of this website or its content.\n\nFor specific legal advice regarding your individual situation, please consult directly with a qualified attorney at our firm. Past results do not guarantee future outcomes.',
        description: 'Disclaimer popup text',
      },
      {
        settingKey: 'whatsappEnabled',
        settingValue: true,
        description: 'Enable WhatsApp widget',
      },
      {
        settingKey: 'whatsappNumber',
        settingValue: '+919876543210',
        description: 'WhatsApp contact number',
      },
      {
        settingKey: 'rightClickDisabled',
        settingValue: false,
        description: 'Disable right-click on website',
      },
      {
        settingKey: 'copyProtectionEnabled',
        settingValue: false,
        description: 'Disable text selection',
      },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`✅ Admin credentials: ${process.env.ADMIN_EMAIL || 'admin@gaglawyers.com'} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
