const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./models/Service');
const connectDB = require('./config/db');

const aftServiceUpdate = {
  name: "Armed Forces Tribunal (AFT) Cases",
  slug: "armed-forces-tribunal",
  category: "military",
  shortDescription: "Expert legal representation for military service disputes. Protecting the rights of armed forces personnel with specialized expertise.",
  longDescription: "The Armed Forces Tribunal (AFT) is a specialized judicial body established in 2007 to hear grievances and disputes of armed forces personnel. It provides a faster, more efficient alternative to traditional courts for service-related matters like promotions, transfers, pensions, and retirement benefits. Our firm specializes in AFT cases, helping serving and retired military personnel navigate complex service disputes. We understand the unique challenges faced by armed forces members and provide strategic legal representation to secure fair outcomes. Whether you're facing wrongful termination, pension disputes, or promotion-related grievances, we have the expertise and experience to advocate effectively for your rights before the tribunal.",
  overview: "The Armed Forces Tribunal (AFT) is a specialized judicial body established in 2007 to hear grievances and disputes of armed forces personnel. It provides a faster, more efficient alternative to traditional courts for service-related matters like promotions, transfers, pensions, and retirement benefits.\n\nOur firm specializes in AFT cases, helping serving and retired military personnel navigate complex service disputes. We understand the unique challenges faced by armed forces members and provide strategic legal representation to secure fair outcomes.\n\nWhether you're facing wrongful termination, pension disputes, or promotion-related grievances, we have the expertise and experience to advocate effectively for your rights before the tribunal.",
  typesOfCases: [
    "Service dispute resolutions (recruitment, posting, transfer)",
    "Pension and retirement benefit claims",
    "Promotion and seniority disputes",
    "Court-martial appeal proceedings",
    "Wrongful termination and discharge cases",
    "Pay and allowance disputes",
    "Reinstatement and compensation claims"
  ],
  process: [
    {
      step: 1,
      title: "Case Consultation",
      description: "We review your service records, understand the nature of your grievance, and assess the strength of your case under AFT jurisdiction."
    },
    {
      step: 2,
      title: "Documentation & Petition Preparation",
      description: "We prepare a comprehensive petition with all supporting documents, affidavits, and evidence required by the AFT."
    },
    {
      step: 3,
      title: "AFT Filing",
      description: "Your petition is filed within the 3-month statutory timeline, along with the required fee and supporting documentation."
    },
    {
      step: 4,
      title: "Tribunal Hearing & Representation",
      description: "We represent you during hearings, present evidence, cross-examine opposing witnesses, and make strong legal arguments."
    },
    {
      step: 5,
      title: "Appeal & Execution",
      description: "If needed, we file appeals to the High Court or Supreme Court and ensure proper execution of tribunal orders."
    }
  ],
  keyPoints: [
    "Military Law Expertise - Deep understanding of AFT procedures, military service regulations, and armed forces law",
    "Proven Track Record - Successful representation across pension claims, service disputes, and promotion matters",
    "Efficient Process - We deliver faster resolutions and maximize compensation for our clients",
    "Personalized Approach - Each case receives dedicated attention from experienced advocates specializing in AFT matters"
  ]
};

const faqData = [
  {
    question: "What is the Armed Forces Tribunal?",
    answer: "The AFT is an independent judicial body that hears grievances of armed forces personnel (Army, Navy, Air Force, Coast Guard) regarding service conditions, pensions, promotions, and disciplinary matters."
  },
  {
    question: "Who can file a case with the AFT?",
    answer: "Any serving or retired armed forces personnel—officers, JCOs, and other ranks—can approach the AFT for service-related grievances."
  },
  {
    question: "What is the time limit for filing?",
    answer: "Applications must be filed within 3 months from the date of the incident or grievance. The AFT may extend this deadline if there's sufficient cause for the delay."
  },
  {
    question: "How long does an AFT case take?",
    answer: "The AFT aims to dispose cases within 6 months. However, timelines vary based on case complexity and tribunal workload."
  },
  {
    question: "Do I need a lawyer for the AFT?",
    answer: "While not mandatory, hiring an experienced AFT lawyer significantly improves your chances of success and protects your rights effectively."
  },
  {
    question: "Can I appeal an AFT decision?",
    answer: "Yes, you can appeal to the High Court or Supreme Court if you disagree with the AFT's decision."
  }
];

const updateService = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update the AFT service
    console.log('Updating Armed Forces Tribunal service...');
    const result = await Service.findOneAndUpdate(
      { slug: "armed-forces-tribunal" },
      aftServiceUpdate,
      { new: true }
    );

    if (result) {
      console.log('✅ Service updated successfully!');
      console.log('\nUpdated fields:');
      console.log('- Short Description updated');
      console.log('- Long Description updated');
      console.log('- Overview updated');
      console.log('- Types of Cases: 7 cases');
      console.log('- Process Steps: 5 steps');
      console.log('- Key Points: 4 points');
      console.log('\nFAQ Data to add separately (6 questions)');
    } else {
      console.log('❌ Service not found');
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating service:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

updateService();
