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
const { OFFICE_ADDRESS_LINE } = require('./config/officeAddress');

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
      isActive: true,
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
        name: 'Corporate Law',
        slug: 'corporate-law',
        category: 'corporate',
        shortDescription: 'Comprehensive legal services for businesses including M&A, compliance, and contracts.',
        longDescription: 'Comprehensive legal services for businesses including M&A, compliance, contracts, and corporate governance. We provide expert guidance on business structuring, regulatory matters, and commercial transactions.',
        iconName: 'Briefcase',
        order: 1,
      },
      {
        name: 'Civil Litigation',
        slug: 'civil-litigation',
        category: 'litigation',
        shortDescription: 'Expert representation in civil disputes, property matters, and contract disputes.',
        longDescription: 'Expert representation in civil disputes, property matters, contract disputes, and appellate practice. Our experienced litigators handle complex civil cases with strategic precision.',
        iconName: 'Gavel',
        order: 2,
      },
      {
        name: 'Real Estate Law',
        slug: 'real-estate-law',
        category: 'property',
        shortDescription: 'Complete legal support for property transactions, title verification, and disputes.',
        longDescription: 'Complete legal support for property transactions, title verification, disputes, and development projects. We ensure smooth property dealings with thorough due diligence and documentation.',
        iconName: 'Home',
        order: 3,
      },
      {
        name: 'Family Law',
        slug: 'family-law',
        category: 'family',
        shortDescription: 'Sensitive handling of divorce, custody, and matrimonial disputes.',
        longDescription: 'Sensitive handling of divorce, custody, matrimonial disputes, and succession planning. We provide compassionate yet effective representation in family matters.',
        iconName: 'Users',
        order: 4,
      },
      {
        name: 'Criminal Defense',
        slug: 'criminal-defense',
        category: 'criminal',
        shortDescription: 'Experienced defense counsel for criminal cases and bail applications.',
        longDescription: 'Experienced defense counsel for criminal cases, bail applications, and appellate matters. Our criminal law experts protect your rights at every stage of the proceedings.',
        iconName: 'Shield',
        order: 5,
      },
      {
        name: 'Intellectual Property',
        slug: 'intellectual-property',
        category: 'corporate',
        shortDescription: 'Protection and enforcement of trademarks, copyrights, patents, and trade secrets.',
        longDescription: 'Protection and enforcement of trademarks, copyrights, patents, and trade secrets. We safeguard your intellectual assets with strategic IP management and enforcement.',
        iconName: 'Lightbulb',
        order: 6,
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
        settingValue: `Disclaimer
Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers - Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.
The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on 'I AGREE', the user acknowledges that:
- The user wishes to gain more information about GAG Lawyers - Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use.
- The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user's volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship.
- None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.
- GAG Lawyers - Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.`,
        description: 'Disclaimer popup text',
      },
      {
        settingKey: 'whatsappEnabled',
        settingValue: true,
        description: 'Enable WhatsApp widget',
      },
      {
        settingKey: 'whatsappNumber',
        settingValue: '+919996263370',
        description: 'WhatsApp contact number',
      },
      {
        settingKey: 'phoneNumber',
        settingValue: '+919996263370',
        description: 'Phone contact number',
      },
      {
        settingKey: 'email',
        settingValue: 'contact@gaglawyers.com',
        description: 'Contact email address',
      },
      {
        settingKey: 'address',
        settingValue: OFFICE_ADDRESS_LINE,
        description: 'Office address',
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
