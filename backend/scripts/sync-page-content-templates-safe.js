require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const PAGE_TEMPLATES = [
  {
    pageName: 'team',
    sections: {
      hero: {
        badge: 'Meet Our Team',
        title: 'Our Team',
        subtitle:
          'Our strength lies not just in legal knowledge but in the people who apply it with dedication and care.',
      },
      introduction: {
        paragraph1:
          'At GAG Lawyers - Grover & Grover Advocates, every member of our team shares the same vision: to combine legal excellence with personal commitment so that our clients always feel supported, informed, and represented.',
        paragraph2:
          'Leading this vision is our Founder & Owner, Advocate Rahul Grover, whose leadership and experience have shaped the firm into what it is today.',
      },
      founder: {
        heading: 'Our Founder & Owner',
        highlight: 'A Visionary Leader in Law',
      },
    },
    seo: {
      title: 'Our Team | GAG Lawyers - Grover & Grover Advocates',
      description:
        'Meet our team led by Advocate Rahul Grover. Skilled lawyers and professionals combining legal excellence with personal commitment to client success.',
      keywords: 'legal team, advocate rahul grover, law firm team, lawyers in india, legal specialists',
    },
    isPublished: true,
  },
  {
    pageName: 'services',
    sections: {
      hero: {
        eyebrow: 'Practice Areas',
        heading: 'Legal Excellence Redefined',
        subheading:
          'Navigate complex legal challenges with confidence. Our expert team delivers strategic solutions across diverse practice areas.',
      },
      whyChoose: {
        heading: 'Why Choose Us',
        cards: [
          {
            title: 'Expert Legal Team',
            description:
              'Seasoned professionals with decades of combined experience across multiple practice areas.',
          },
          {
            title: 'Proven Success',
            description:
              'Track record of favorable outcomes and satisfied clients across diverse legal matters.',
          },
          {
            title: 'Client-Centric',
            description: 'Personalized attention and strategic guidance tailored to your specific situation.',
          },
        ],
      },
    },
    seo: {
      title: 'Legal Services - GAG Lawyers | Practice Areas',
      description:
        'Explore comprehensive legal services by GAG Lawyers across core practice areas with dedicated representation and strategy-focused advice.',
      keywords: 'legal services delhi, advocates, litigation, legal consultation, law firm practice areas',
    },
    isPublished: true,
  },
  {
    pageName: 'blog',
    sections: {
      hero: {
        heading: 'Legal Insights & Updates',
        subheading: 'Practical legal guidance, updates, and thought leadership from our team.',
      },
    },
    seo: {
      title: 'Legal Blog | GAG Lawyers - Grover & Grover Advocates',
      description:
        'Read practical legal insights, updates, and analysis from the team at GAG Lawyers.',
      keywords: 'legal blog, law updates, legal insights, gag lawyers blog',
    },
    isPublished: true,
  },
  {
    pageName: 'contact',
    sections: {
      hero: {
        heading: 'Get In Touch',
        subheading: "Let's discuss how we can help you with your legal needs",
      },
      contactInfo: {
        title: 'Contact Information',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        addressLabel: 'Office Address',
      },
      form: {
        title: 'Send Us a Message',
        subtitle: "Fill out the form below and we'll get back to you within 24 hours.",
      },
    },
    seo: {
      title: 'Contact Us - GAG Lawyers | Legal Consultation',
      description:
        'Get in touch with our legal experts. Schedule a consultation for corporate law, litigation, real estate, and family law matters.',
      keywords: 'contact lawyers, legal consultation, lawyers in delhi, law firm contact',
    },
    isPublished: true,
  },
  {
    pageName: 'awards',
    sections: {
      hero: {
        heading: 'Awards & Achievements',
        subheading:
          'Recognition for our commitment to excellence, integrity, and client satisfaction.',
      },
    },
    seo: {
      title: 'Awards & Recognition | GAG Lawyers - Grover & Grover Advocates',
      description:
        'Recognition for excellence in litigation, corporate advisory, and legal innovation. Awards highlighting our commitment to client satisfaction.',
      keywords: 'law firm awards, legal excellence, litigation awards, corporate advisory recognition',
    },
    isPublished: true,
  },
  {
    pageName: 'gallery',
    sections: {
      hero: {
        heading: 'Image Gallery',
        subheading:
          'A visual journey into the life of the firm, highlighting milestones, achievements, and the people who make it all possible.',
      },
      highlights: {
        heading: 'Highlights from Our Gallery',
      },
    },
    seo: {
      title: 'Image Gallery | GAG Lawyers - Grover & Grover Advocates',
      description:
        'Visual journey into the life of GAG Lawyers - courtroom advocacy, client engagements, events, milestones, and community outreach.',
      keywords: 'law firm gallery, courtroom photos, legal events, firm milestones, community outreach',
    },
    isPublished: true,
  },
  {
    pageName: 'affiliation',
    sections: {
      hero: {
        heading: 'Affiliations & Memberships',
        subheading:
          'Our memberships in esteemed legal and industry bodies reflect our commitment to ethical practice, professional growth, and global connectivity.',
      },
      affiliations: {
        heading: 'Key Legal Affiliations',
      },
    },
    seo: {
      title: 'Affiliations & Memberships | GAG Lawyers - Grover & Grover Advocates',
      description:
        'Our memberships in esteemed legal and industry bodies reflect our commitment to ethical practice, professional growth, and global connectivity.',
      keywords: 'bar council india, scba, legal affiliations, law firm memberships, international legal networks',
    },
    isPublished: true,
  },
  {
    pageName: 'privacyPolicy',
    sections: {
      hero: {
        heading: 'Privacy Policy',
        lastUpdated: 'March 20, 2024',
      },
      introduction: {
        heading: 'Introduction',
        body:
          'This Privacy Policy explains how GAG Lawyers collects, uses, discloses, and protects your personal information when you visit our website or use our legal services.',
      },
      rights: {
        heading: 'Your Rights',
      },
    },
    seo: {
      title: 'Privacy Policy | GAG Lawyers',
      description:
        'Learn how GAG Lawyers collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
      keywords: 'privacy policy, data protection, confidentiality, legal privacy',
    },
    isPublished: true,
  },
  {
    pageName: 'termsOfService',
    sections: {
      hero: {
        heading: 'Terms of Service',
        lastUpdated: 'March 20, 2024',
      },
      agreement: {
        heading: 'Agreement to Terms',
        body:
          'By accessing or using the GAG Lawyers website or engaging our legal services, you agree to be bound by these Terms of Service.',
      },
      legalDisclaimer: {
        heading: 'Legal Information Disclaimer',
      },
    },
    seo: {
      title: 'Terms of Service | GAG Lawyers',
      description:
        "Read the terms and conditions for using GAG Lawyers' website and legal services. Understanding your rights and responsibilities.",
      keywords: 'terms of service, legal terms, conditions, user agreement',
    },
    isPublished: true,
  },
];

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function mergeMissing(target, source) {
  if (!isObject(source)) return target;
  const out = isObject(target) ? { ...target } : {};

  Object.entries(source).forEach(([key, value]) => {
    const existing = out[key];

    if (existing === undefined || existing === null || existing === '') {
      out[key] = value;
      return;
    }

    if (isObject(existing) && isObject(value)) {
      out[key] = mergeMissing(existing, value);
      return;
    }

    if (Array.isArray(existing)) {
      if (existing.length === 0 && Array.isArray(value)) {
        out[key] = value;
      }
      return;
    }
  });

  return out;
}

async function run() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('Missing MONGO_URI/MONGODB_URI');

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB.');

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const template of PAGE_TEMPLATES) {
    const existing = await PageContent.findOne({ pageName: template.pageName });
    if (!existing) {
      await PageContent.create(template);
      created += 1;
      console.log(`[created] ${template.pageName}`);
      continue;
    }

    const mergedSections = mergeMissing(existing.sections?.toObject?.() || existing.sections || {}, template.sections || {});
    const mergedSeo = mergeMissing(existing.seo || {}, template.seo || {});
    const nextPublished = existing.isPublished ?? template.isPublished ?? true;

    const didChange =
      JSON.stringify(existing.sections?.toObject?.() || existing.sections || {}) !== JSON.stringify(mergedSections) ||
      JSON.stringify(existing.seo || {}) !== JSON.stringify(mergedSeo) ||
      existing.isPublished !== nextPublished;

    if (!didChange) {
      unchanged += 1;
      console.log(`[unchanged] ${template.pageName}`);
      continue;
    }

    existing.sections = mergedSections;
    existing.seo = mergedSeo;
    existing.isPublished = nextPublished;
    await existing.save();
    updated += 1;
    console.log(`[updated] ${template.pageName}`);
  }

  console.log('\nDone.');
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
}

run()
  .catch((error) => {
    console.error('Failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
