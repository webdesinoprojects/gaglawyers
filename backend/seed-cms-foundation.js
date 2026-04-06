const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const GlobalSettings = require('./models/GlobalSettings');
const { getGlobalAddressFields } = require('./config/officeAddress');
const Navigation = require('./models/Navigation');

const seedCMSFoundation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Seed Global Settings
    console.log('\n📝 Seeding Global Settings...');
    const existingSettings = await GlobalSettings.findOne();
    
    if (!existingSettings) {
      await GlobalSettings.create({
        siteName: 'GAG Lawyers',
        siteTagline: 'Grover & Grover Advocates',
        siteDescription: 'Delivering excellence in legal services with integrity and precision.',
        contact: {
          phone: {
            primary: '+91 99962 63370',
            displayText: '+91 99962 63370',
            availability: 'Mon-Fri, 9am-6pm',
          },
          email: {
            primary: 'contact@gaglawyers.com',
          },
          address: getGlobalAddressFields(),
        },
        socialMedia: {
          facebook: 'https://www.facebook.com/gaglawyers',
          twitter: 'https://twitter.com/gaglawyers',
          linkedin: 'https://www.linkedin.com/company/gaglawyers',
        },
        business: {
          yearsOfExperience: 20,
          casesHandled: 5000,
          successRate: 98,
          establishedYear: 2004,
        },
        seo: {
          defaultTitle: 'GAG Lawyers - Premier Legal Services in India',
          defaultDescription: 'Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India.',
          defaultKeywords: 'lawyers in delhi, advocates in india, corporate law firm, civil litigation',
        },
        legal: {
          copyrightText: 'GAG Lawyers. All Rights Reserved.',
        },
        features: {
          maintenanceMode: false,
          showDisclaimerModal: true,
          enableBlog: true,
          enableBooking: true,
        },
      });
      console.log('✅ Global Settings created');
    } else {
      console.log('ℹ️  Global Settings already exist');
    }

    // 2. Seed Header Navigation
    console.log('\n📝 Seeding Header Navigation...');
    const existingHeaderNav = await Navigation.findOne({ location: 'header' });
    
    if (!existingHeaderNav) {
      await Navigation.create({
        name: 'Main Navigation',
        location: 'header',
        isActive: true,
        items: [
          {
            label: 'Home',
            type: 'link',
            url: '/',
            order: 1,
            isVisible: true,
          },
          {
            label: 'About',
            type: 'dropdown',
            order: 2,
            isVisible: true,
            children: [
              { label: 'The Firm', url: '/about', order: 1, isVisible: true },
              { label: 'Our Team', url: '/team', order: 2, isVisible: true },
              { label: 'Awards', url: '/awards', order: 3, isVisible: true },
              { label: 'Affiliation', url: '/affiliation', order: 4, isVisible: true },
              { label: 'Image Gallery', url: '/gallery', order: 5, isVisible: true },
            ],
          },
          {
            label: 'Services',
            type: 'dropdown',
            url: '/services',
            order: 3,
            isVisible: true,
            children: [], // Will be populated dynamically from services
          },
          {
            label: 'Blog',
            type: 'link',
            url: '/blog',
            order: 4,
            isVisible: true,
          },
          {
            label: 'Contact',
            type: 'link',
            url: '/contact',
            order: 5,
            isVisible: true,
          },
        ],
      });
      console.log('✅ Header Navigation created');
    } else {
      console.log('ℹ️  Header Navigation already exists');
    }

    // 3. Seed Footer Navigation
    console.log('\n📝 Seeding Footer Navigation...');
    const existingFooterNav = await Navigation.findOne({ location: 'footer' });
    
    if (!existingFooterNav) {
      await Navigation.create({
        name: 'Footer Navigation',
        location: 'footer',
        isActive: true,
        items: [
          { label: 'About Us', url: '/about', order: 1, isVisible: true },
          { label: 'Practice Areas', url: '/services', order: 2, isVisible: true },
          { label: 'Our Team', url: '/team', order: 3, isVisible: true },
          { label: 'Blog', url: '/blog', order: 4, isVisible: true },
          { label: 'Contact', url: '/contact', order: 5, isVisible: true },
          { label: 'Privacy Policy', url: '/privacy', order: 6, isVisible: true },
          { label: 'Terms of Service', url: '/terms', order: 7, isVisible: true },
        ],
      });
      console.log('✅ Footer Navigation created');
    } else {
      console.log('ℹ️  Footer Navigation already exists');
    }

    console.log('\n✅ CMS Foundation seeded successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Global Settings: Initialized');
    console.log('   - Header Navigation: Created');
    console.log('   - Footer Navigation: Created');
    console.log('\n🎉 You can now manage these from the admin panel!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding CMS foundation:', error);
    process.exit(1);
  }
};

seedCMSFoundation();
