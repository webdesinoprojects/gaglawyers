require('dotenv').config();
const mongoose = require('mongoose');
const ReusableBlock = require('./models/ReusableBlock');
const PageBlock = require('./models/PageBlock');
const NavigationMenu = require('./models/NavigationMenu');
const FormContent = require('./models/FormContent');
const GlobalSettings = require('./models/GlobalSettings');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedReusableBlocks = async () => {
  console.log('Seeding reusable blocks...');

  const blocks = [
    // HOME PAGE BLOCKS
    {
      blockIdentifier: 'home-hero',
      blockName: 'Home Hero Section',
      blockType: 'hero',
      category: 'marketing',
      content: {
        eyebrow: 'GROVER & GROVER ADVOCATES',
        heading: 'Precision in Law.',
        headingAccent: 'Excellence in Practice.',
        description: "India's premier law firm delivering strategic legal counsel across corporate, litigation, and regulatory matters for over two decades.",
        ctaPrimary: {
          text: 'Schedule a Consultation',
          url: '/contact',
        },
        ctaSecondary: {
          text: 'Our Practice Areas',
          url: '/services',
        },
        backgroundImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
        trustIndicators: [
          { value: '20+', label: 'Years Experience' },
          { value: '5000+', label: 'Cases Won' },
          { value: '98%', label: 'Success Rate' },
        ],
      },
    },
    {
      blockIdentifier: 'home-stats',
      blockName: 'Home Stats Bar',
      blockType: 'stats',
      category: 'content',
      content: {
        stats: [
          { value: '5000+', label: 'Cases Represented' },
          { value: '700+', label: 'Criminal Matters' },
          { value: '500+', label: 'Family Dispute Matters' },
          { value: '900+', label: 'Civil Matters' },
        ],
      },
    },
    {
      blockIdentifier: 'home-why-choose-us',
      blockName: 'Why Choose Us',
      blockType: 'features',
      category: 'marketing',
      content: {
        eyebrow: 'Why GAG Lawyers',
        heading: 'Your Trusted Legal Partner',
        subheading: 'We combine decades of experience with innovative legal strategies to deliver exceptional results',
        features: [
          {
            icon: 'Shield',
            title: 'Proven Track Record',
            description: 'Over 5000+ successful cases with a 98% success rate across diverse legal matters',
          },
          {
            icon: 'Users',
            title: 'Expert Team',
            description: 'Highly qualified advocates with specialized expertise in multiple practice areas',
          },
          {
            icon: 'Award',
            title: 'Client-Focused',
            description: "Personalized attention and tailored legal strategies for every client's unique needs",
          },
          {
            icon: 'TrendingUp',
            title: 'Results-Driven',
            description: 'Strategic approach focused on achieving the best possible outcomes for our clients',
          },
        ],
      },
    },
    {
      blockIdentifier: 'home-process',
      blockName: 'How We Work',
      blockType: 'process-steps',
      category: 'content',
      content: {
        eyebrow: 'Our Process',
        heading: 'How We Work With You',
        subheading: 'A transparent, systematic approach to delivering exceptional legal services',
        steps: [
          {
            number: 1,
            title: 'Initial Consultation',
            description: 'We listen to your concerns and understand your legal needs in detail',
            style: 'navy',
          },
          {
            number: 2,
            title: 'Case Analysis',
            description: 'Thorough review of your case with detailed legal research and strategy development',
            style: 'light',
          },
          {
            number: 3,
            title: 'Action Plan',
            description: 'Clear roadmap with timelines, milestones, and transparent cost structure',
            style: 'light',
          },
          {
            number: 4,
            title: 'Execution & Results',
            description: 'Dedicated representation with regular updates until successful resolution',
            style: 'gold',
          },
        ],
      },
    },

    // ABOUT PAGE BLOCKS
    {
      blockIdentifier: 'about-values',
      blockName: 'Our Values',
      blockType: 'values',
      category: 'content',
      content: {
        heading: 'Our Mission and Values',
        description: "We approach every matter with the belief that the client's interest is paramount. Our mission is to combine deep legal expertise with practical insight, ensuring that every client receives advice tailored to their situation.",
        values: [
          {
            icon: 'Shield',
            title: 'Integrity',
            description: 'Ethical practice and transparency in every matter.',
          },
          {
            icon: 'Award',
            title: 'Excellence',
            description: 'Consistent pursuit of quality and precision.',
          },
          {
            icon: 'Heart',
            title: 'Commitment',
            description: 'Dedication to protecting client interests.',
          },
          {
            icon: 'Target',
            title: 'Innovation',
            description: 'Forward-looking solutions for evolving challenges.',
          },
          {
            icon: 'Globe',
            title: 'Global Outlook',
            description: 'Understanding the needs of both Indian and international clients.',
          },
        ],
      },
    },
    {
      blockIdentifier: 'about-practice-areas',
      blockName: 'Practice Areas List',
      blockType: 'text-content',
      category: 'content',
      content: {
        heading: 'Our Practice Areas',
        subheading: 'We are a multi-disciplinary law firm offering a wide range of services',
        areas: [
          {
            title: 'Litigation & Dispute Resolution',
            description: 'Our lawyers represent clients before the Supreme Court of India, various High Courts, District Courts, and Tribunals.',
          },
          {
            title: 'Corporate & Commercial Law',
            description: 'From company formation to contract negotiation and mergers & acquisitions, we assist businesses at every stage of growth.',
          },
          {
            title: 'Family & Matrimonial Law',
            description: 'We understand the sensitivity of family disputes and work to achieve fair, practical, and compassionate outcomes.',
          },
          {
            title: 'Criminal Law',
            description: 'We have successfully defended clients in matters involving bail, anticipatory bail, quashing of FIRs, white-collar crimes, cybercrimes, and economic offences.',
          },
          {
            title: 'Real Estate & Property Law',
            description: 'We advise on property transactions, title due diligence, lease and tenancy matters, builder-buyer disputes, and property transfers.',
          },
          {
            title: 'Intellectual Property Rights (IPR)',
            description: 'We help clients safeguard their intellectual property through trademark registration, copyright enforcement, patent filings, and IP litigation.',
          },
          {
            title: 'Employment & Labour Law',
            description: 'Our team advises on employment agreements, workplace policies, labour compliance, and disputes between employers and employees.',
          },
          {
            title: 'International & Cross-Border Matters',
            description: 'For NRIs and international businesses, we provide specialized services related to property disputes, matrimonial cases, inheritance issues.',
          },
        ],
      },
    },
    {
      blockIdentifier: 'about-why-choose-us',
      blockName: 'Why Clients Choose Us',
      blockType: 'why-choose-us',
      category: 'marketing',
      content: {
        heading: 'Why Clients Choose Us',
        reasons: [
          'Full-Service Expertise – One firm for all legal needs, whether personal or business-related.',
          'Pan-India Reach – Presence across courts and tribunals in India.',
          'Global Perspective – Services designed for international clients with interests in India.',
          'Proven Results – A strong track record of success in complex cases.',
          'Client-Centric Service – Individual attention and strategies tailored to each client.',
        ],
      },
    },

    // SERVICES PAGE BLOCKS
    {
      blockIdentifier: 'services-faq',
      blockName: 'Services FAQ',
      blockType: 'faq',
      category: 'content',
      content: {
        heading: 'Frequently Asked Questions',
        subheading: 'Find answers to common questions about our legal services and processes',
        faqs: [
          {
            question: 'How do I schedule an initial consultation?',
            answer: 'You can schedule a consultation by filling out the contact form on our Contact page, calling us directly, or sending an email to contact@gaglawyers.com. Initial consultations are typically scheduled within 48 hours.',
          },
          {
            question: 'What are your fees and billing practices?',
            answer: 'Our fee structure varies depending on the nature and complexity of the case. We offer transparent pricing with options for hourly billing, fixed fees, or retainer arrangements. Detailed fee information is provided during the initial consultation.',
          },
          {
            question: 'Do you handle cases outside of Delhi?',
            answer: 'Yes, our team regularly represents clients across India. We have appeared in various High Courts and the Supreme Court of India, and we work with local counsel when necessary.',
          },
          {
            question: 'How long does a typical case take?',
            answer: 'Case timelines vary significantly based on the type of matter, complexity, and court schedules. During consultation, we provide realistic timelines based on similar cases and current court conditions.',
          },
          {
            question: 'Can I get legal advice online?',
            answer: 'Yes, we offer remote consultations via video conference for your convenience. However, certain matters may require in-person meetings depending on the nature of the case.',
          },
        ],
      },
    },

    // CONTACT PAGE BLOCKS
    {
      blockIdentifier: 'contact-info',
      blockName: 'Contact Information',
      blockType: 'contact-info',
      category: 'content',
      content: {
        heading: 'Contact Information',
        description: 'Reach out to us through any of the following channels. Our team is ready to assist you with your legal matters.',
        email: {
          label: 'Email',
          value: 'contact@gaglawyers.com',
          href: 'mailto:contact@gaglawyers.com',
        },
        phone: {
          label: 'Phone',
          value: '+91 99962 63370',
          additional: 'WhatsApp Available',
        },
        address: {
          label: 'Office Address',
          value: '123 Lawyers Colony\nConnaught Place\nNew Delhi - 110001',
        },
        mapEmbedUrl: '',
      },
    },
  ];

  await ReusableBlock.deleteMany({});
  const createdBlocks = await ReusableBlock.insertMany(blocks);
  console.log(`✓ Created ${createdBlocks.length} reusable blocks`);
  
  return createdBlocks;
};

const seedPageBlocks = async (blocks) => {
  console.log('Seeding page blocks...');

  const blockMap = {};
  blocks.forEach(block => {
    blockMap[block.blockIdentifier] = block._id;
  });

  const pageBlocks = [
    {
      pageName: 'home',
      blocks: [
        { blockId: blockMap['home-hero'], blockIdentifier: 'home-hero', order: 0, isVisible: true },
        { blockId: blockMap['home-stats'], blockIdentifier: 'home-stats', order: 1, isVisible: true },
        { blockId: blockMap['home-why-choose-us'], blockIdentifier: 'home-why-choose-us', order: 2, isVisible: true },
        { blockId: blockMap['home-process'], blockIdentifier: 'home-process', order: 3, isVisible: true },
      ],
      isActive: true,
    },
    {
      pageName: 'about',
      blocks: [
        { blockId: blockMap['about-values'], blockIdentifier: 'about-values', order: 0, isVisible: true },
        { blockId: blockMap['about-practice-areas'], blockIdentifier: 'about-practice-areas', order: 1, isVisible: true },
        { blockId: blockMap['about-why-choose-us'], blockIdentifier: 'about-why-choose-us', order: 2, isVisible: true },
      ],
      isActive: true,
    },
    {
      pageName: 'services',
      blocks: [
        { blockId: blockMap['services-faq'], blockIdentifier: 'services-faq', order: 0, isVisible: true },
      ],
      isActive: true,
    },
    {
      pageName: 'contact',
      blocks: [
        { blockId: blockMap['contact-info'], blockIdentifier: 'contact-info', order: 0, isVisible: true },
      ],
      isActive: true,
    },
  ];

  await PageBlock.deleteMany({});
  const createdPageBlocks = await PageBlock.insertMany(pageBlocks);
  console.log(`✓ Created ${createdPageBlocks.length} page block assignments`);
};

const seedNavigation = async () => {
  console.log('Seeding navigation menus...');

  const menus = [
    {
      menuLocation: 'header',
      menuName: 'Main Navigation',
      items: [
        { label: 'Home', url: '/', order: 0, isVisible: true, openInNewTab: false },
        { label: 'About', url: '/about', order: 1, isVisible: true, openInNewTab: false },
        { label: 'Services', url: '/services', order: 2, isVisible: true, openInNewTab: false },
        { label: 'Team', url: '/team', order: 3, isVisible: true, openInNewTab: false },
        { label: 'Blog', url: '/blog', order: 4, isVisible: true, openInNewTab: false },
        { label: 'Contact', url: '/contact', order: 5, isVisible: true, openInNewTab: false },
      ],
      isActive: true,
    },
    {
      menuLocation: 'footer-primary',
      menuName: 'Footer - Quick Links',
      items: [
        { label: 'About Us', url: '/about', order: 0, isVisible: true },
        { label: 'Our Team', url: '/team', order: 1, isVisible: true },
        { label: 'Services', url: '/services', order: 2, isVisible: true },
        { label: 'Awards', url: '/awards', order: 3, isVisible: true },
      ],
      isActive: true,
    },
    {
      menuLocation: 'footer-secondary',
      menuName: 'Footer - Resources',
      items: [
        { label: 'Blog', url: '/blog', order: 0, isVisible: true },
        { label: 'Gallery', url: '/gallery', order: 1, isVisible: true },
        { label: 'Contact', url: '/contact', order: 2, isVisible: true },
      ],
      isActive: true,
    },
    {
      menuLocation: 'footer-legal',
      menuName: 'Footer - Legal',
      items: [
        { label: 'Privacy Policy', url: '/privacy-policy', order: 0, isVisible: true },
        { label: 'Terms of Service', url: '/terms-of-service', order: 1, isVisible: true },
      ],
      isActive: true,
    },
  ];

  await NavigationMenu.deleteMany({});
  const createdMenus = await NavigationMenu.insertMany(menus);
  console.log(`✓ Created ${createdMenus.length} navigation menus`);
};

const seedFormContent = async () => {
  console.log('Seeding form content...');

  const forms = [
    {
      formIdentifier: 'contact',
      formTitle: 'Send Us a Message',
      formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
      fields: [
        {
          fieldName: 'name',
          label: 'Full Name',
          placeholder: 'Your full name',
          fieldType: 'text',
          isRequired: true,
          order: 0,
          isVisible: true,
        },
        {
          fieldName: 'email',
          label: 'Email Address',
          placeholder: 'you@example.com',
          fieldType: 'email',
          isRequired: true,
          order: 1,
          isVisible: true,
        },
        {
          fieldName: 'phone',
          label: 'Phone Number',
          placeholder: 'Your mobile number (with country code)',
          fieldType: 'tel',
          isRequired: true,
          order: 2,
          isVisible: true,
        },
        {
          fieldName: 'serviceOfInterest',
          label: 'Practice Area of Interest',
          placeholder: 'Select a practice area',
          fieldType: 'select',
          isRequired: true,
          order: 3,
          isVisible: true,
        },
        {
          fieldName: 'message',
          label: 'Message',
          placeholder: 'Tell us about your legal matter...',
          fieldType: 'textarea',
          isRequired: true,
          order: 4,
          isVisible: true,
        },
      ],
      submitButtonText: 'Submit Inquiry',
      successMessage: 'Thank you! We will contact you shortly.',
      errorMessage: 'Something went wrong. Please try again.',
      isActive: true,
    },
    {
      formIdentifier: 'appointment',
      formTitle: 'Book Appointment',
      formDescription: 'Schedule a consultation with our legal experts',
      fields: [
        {
          fieldName: 'name',
          label: 'Full Name *',
          placeholder: 'Enter your name',
          fieldType: 'text',
          isRequired: true,
          order: 0,
          isVisible: true,
        },
        {
          fieldName: 'email',
          label: 'Email Address *',
          placeholder: 'your@email.com',
          fieldType: 'email',
          isRequired: true,
          order: 1,
          isVisible: true,
        },
        {
          fieldName: 'phone',
          label: 'Phone Number *',
          placeholder: 'Your mobile number (with country code)',
          fieldType: 'tel',
          isRequired: true,
          order: 2,
          isVisible: true,
        },
        {
          fieldName: 'service',
          label: 'Legal Service *',
          placeholder: 'Select a service',
          fieldType: 'select',
          isRequired: true,
          order: 3,
          isVisible: true,
        },
        {
          fieldName: 'description',
          label: 'Brief Description',
          placeholder: 'Tell us about your legal matter...',
          fieldType: 'textarea',
          isRequired: false,
          order: 4,
          isVisible: true,
        },
      ],
      submitButtonText: 'Book Appointment',
      successMessage: "We'll get back to you within 24 hours",
      errorMessage: 'Unable to book appointment. Please try again.',
      isActive: true,
    },
  ];

  await FormContent.deleteMany({});
  const createdForms = await FormContent.insertMany(forms);
  console.log(`✓ Created ${createdForms.length} form configurations`);
};

const seedGlobalSettings = async () => {
  console.log('Seeding global settings...');

  const settings = {
    siteName: 'GAG Lawyers',
    siteTagline: 'Grover & Grover Advocates',
    siteDescription: 'Delivering excellence in legal services with integrity and precision.',
    contact: {
      phone: {
        primary: '+91 99962 63370',
        displayText: '+91 99962 63370',
        availability: 'Mon-Sat: 9:00 AM - 6:00 PM',
        whatsapp: '+919996263370',
      },
      email: {
        primary: 'contact@gaglawyers.com',
        displayText: 'contact@gaglawyers.com',
      },
      address: {
        street: '123 Lawyers Colony',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
        displayText: '123 Lawyers Colony, Connaught Place, New Delhi - 110001',
        mapEmbedUrl: '',
      },
    },
    socialMedia: {
      facebook: { url: '', isVisible: false },
      twitter: { url: '', isVisible: false },
      linkedin: { url: '', isVisible: true },
      instagram: { url: '', isVisible: true },
      youtube: { url: '', isVisible: false },
    },
    business: {
      yearsOfExperience: 20,
      casesHandled: 5000,
      successRate: 98,
      establishedYear: 2004,
    },
    seo: {
      defaultTitle: 'GAG Lawyers - Premier Legal Services in India',
      defaultDescription: 'Expert legal services across corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India.',
      defaultKeywords: 'lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law',
    },
    features: {
      maintenanceMode: false,
      showDisclaimerModal: true,
      enableBlog: true,
      enableBooking: true,
    },
    legal: {
      copyrightText: '© 2024 GAG Lawyers - Grover & Grover Advocates. All rights reserved.',
      disclaimerText: 'The information provided on this website is for general informational purposes only and does not constitute legal advice.',
    },
  };

  await GlobalSettings.deleteMany({});
  await GlobalSettings.create(settings);
  console.log('✓ Created global settings');
};

const runSeed = async () => {
  try {
    await connectDB();
    
    console.log('\n🌱 Starting CMS content seeding...\n');
    
    const blocks = await seedReusableBlocks();
    await seedPageBlocks(blocks);
    await seedNavigation();
    await seedFormContent();
    await seedGlobalSettings();
    
    console.log('\n✅ CMS content seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

runSeed();
