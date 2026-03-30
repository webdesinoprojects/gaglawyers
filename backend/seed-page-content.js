require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('./models/PageContent');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const pageContents = [
  {
    pageName: 'home',
    sections: {
      hero: {
        heading: 'Excellence in Legal Advisory & Advocacy',
        subheading: 'Grover & Grover Advocates delivers sophisticated legal solutions with integrity, precision, and unwavering commitment to your success.',
        ctaPrimary: 'Schedule Consultation',
        ctaSecondary: 'Our Services',
      },
      stats: {
        casesRepresented: '5000+',
        criminalMatters: '700+',
        familyMatters: '500+',
        civilMatters: '900+',
      },
      practiceAreas: {
        heading: 'Practice Areas',
        subheading: 'Comprehensive legal expertise across multiple domains',
      },
      testimonials: {
        heading: 'What Our Clients Say',
        subheading: 'Trusted by leading businesses and individuals across India',
      },
    },
    seo: {
      title: 'GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates',
      description: 'Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India.',
      keywords: 'lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law',
    },
    isPublished: true,
  },
  {
    pageName: 'about',
    sections: {
      hero: {
        heading: 'GAG Lawyers',
        subheading: 'Grover & Grover Advocates',
        tagline: 'Law is not only about interpreting statutes but also about offering guidance, clarity, and support during some of life\'s most critical moments.',
      },
      introduction: {
        text: 'At GAG Lawyers - Grover & Grover Advocates, whether it is a business transaction, a personal dispute, or a cross-border matter, our focus remains the same – to provide solutions that are practical, reliable, and aligned with our clients\' goals.',
      },
      founder: {
        name: 'Advocate Rahul Grover',
        imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop',
        bio: 'Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.',
        quote: 'What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon. Many of our clients turn to us not just for representation, but for long-term guidance on both personal and professional matters – a reflection of the trust he has built since the inception of the firm.',
      },
      mission: {
        heading: 'Our Mission and Values',
        description: 'We approach every matter with the belief that the client\'s interest is paramount. Our mission is to combine deep legal expertise with practical insight, ensuring that every client receives advice tailored to their situation.',
      },
    },
    seo: {
      title: 'About Us - The Firm | GAG Lawyers - Grover & Grover Advocates',
      description: 'Founded by Advocate Rahul Grover, GAG Lawyers provides high-quality legal services across India and abroad. Full-service law firm for individuals, businesses, and international clients.',
      keywords: 'about gag lawyers, rahul grover advocate, law firm india, legal services, grover and grover advocates',
    },
    isPublished: true,
  },
  {
    pageName: 'firm',
    sections: {
      history: {
        title: 'Our History',
        content: 'Founded in 1998, Grover & Grover Advocates began as a vision to provide exceptional legal services with unwavering integrity. Over the past 25+ years, we have grown into one of the most respected law firms in the region, serving a diverse clientele ranging from individuals to multinational corporations. Our journey has been marked by landmark cases, satisfied clients, and a steadfast commitment to justice.',
      },
      mission: {
        title: 'Our Mission',
        content: 'To deliver exceptional legal services that protect our clients\' interests, uphold justice, and contribute to the development of a fair and equitable society. We strive to be trusted advisors who provide strategic, practical, and innovative legal solutions.',
      },
      vision: {
        title: 'Our Vision',
        content: 'To be recognized as a leading law firm known for excellence, integrity, and client-focused service. We envision a future where legal expertise meets technological innovation, making quality legal services accessible to all who need them.',
      },
      values: [
        {
          title: 'Integrity',
          description: 'We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every interaction.',
          icon: 'Heart',
        },
        {
          title: 'Excellence',
          description: 'We are committed to delivering superior legal services through continuous learning, strategic thinking, and meticulous attention to detail.',
          icon: 'Target',
        },
        {
          title: 'Client-First',
          description: 'Your success is our priority. We listen, understand, and tailor our approach to meet your unique needs and objectives.',
          icon: 'Users',
        },
        {
          title: 'Innovation',
          description: 'We embrace modern legal practices and technology to provide efficient, effective solutions in an ever-evolving legal landscape.',
          icon: 'Lightbulb',
        },
      ],
    },
    seo: {
      title: 'The Firm - History, Mission & Values | GAG Lawyers',
      description: 'Learn about the history, mission, and values that drive GAG Lawyers - Grover & Grover Advocates. 25+ years of legal excellence.',
      keywords: 'law firm history, legal services mission, firm values, gag lawyers background',
    },
    isPublished: true,
  },
  {
    pageName: 'contact',
    sections: {
      hero: {
        heading: 'Get in Touch',
        subheading: 'We\'re here to help. Reach out to discuss your legal needs.',
      },
      office: {
        heading: 'Our Office',
        description: 'Visit us at our office or schedule a consultation at your convenience.',
      },
    },
    seo: {
      title: 'Contact Us | GAG Lawyers - Schedule Your Consultation',
      description: 'Contact GAG Lawyers for legal consultation. Phone, email, or visit our office. Serving clients across India and internationally.',
      keywords: 'contact lawyers, legal consultation, schedule appointment, law firm contact',
    },
    isPublished: true,
  },
  {
    pageName: 'awards',
    sections: {
      hero: {
        heading: 'Awards & Achievements',
        subheading: 'Recognition for our commitment to excellence, integrity, and client satisfaction.',
      },
      introduction: {
        text: 'At GAG Lawyers – Grover & Grover Advocates, over the years, the firm has been honoured for its outstanding work in litigation, corporate advisory, and legal innovation, underscoring the dedication of our team under the leadership of Advocate Rahul Grover.',
      },
    },
    seo: {
      title: 'Awards & Recognition | GAG Lawyers - Grover & Grover Advocates',
      description: 'Recognition for excellence in litigation, corporate advisory, and legal innovation. Awards highlighting our commitment to client satisfaction.',
      keywords: 'law firm awards, legal excellence, litigation awards, corporate advisory recognition',
    },
    isPublished: true,
  },
  {
    pageName: 'gallery',
    sections: {
      hero: {
        heading: 'Image Gallery',
        subheading: 'A visual journey into the life of the firm, highlighting milestones, achievements, and the people who make it all possible.',
      },
      introduction: {
        text: 'The Image Gallery at GAG Lawyers – Grover & Grover Advocates offers a visual journey into the life of the firm. It is a reflection of our values, dedication, and commitment to clients across India and globally.',
      },
    },
    seo: {
      title: 'Image Gallery | GAG Lawyers - Grover & Grover Advocates',
      description: 'Visual journey into the life of GAG Lawyers - courtroom advocacy, client engagements, events, milestones, and community outreach.',
      keywords: 'law firm gallery, courtroom photos, legal events, firm milestones, community outreach',
    },
    isPublished: true,
  },
];

const seedPageContent = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing page content...');
    await PageContent.deleteMany({});

    console.log('🌱 Seeding page content...');
    const created = await PageContent.insertMany(pageContents);

    console.log(`✅ Successfully created ${created.length} page content records:`);
    created.forEach(page => {
      console.log(`   - ${page.pageName}`);
    });

    console.log('\n✅ Page content seeding complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Login to admin panel: http://localhost:5173/admin/login');
    console.log('   2. Go to Page Content Manager: /admin/pages');
    console.log('   3. Edit any page content and SEO settings');
    console.log('   4. Changes will reflect immediately on frontend\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding page content:', error);
    process.exit(1);
  }
};

seedPageContent();
