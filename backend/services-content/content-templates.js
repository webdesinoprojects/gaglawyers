/**
 * Content Templates for Different Service Categories
 * These templates provide rich, realistic content structure
 */

// Unsplash Image URLs for different categories
const imageUrls = {
  criminal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
  family: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  civil: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80',
  corporate: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  property: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  labour: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
  litigation: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
  military: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80',
  administrative: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  adr: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80',
  immigration: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80'
};

// Generate content blocks based on service type
const generateContentBlocks = (serviceName, category) => {
  const blocks = [];

  // Block 1: Introduction
  blocks.push({
    type: 'introduction',
    heading: `Understanding ${serviceName}`,
    subheading: 'Comprehensive Legal Guidance and Representation',
    paragraphs: [
      `${serviceName} services encompass a wide range of legal matters that require expert knowledge and professional handling. Our experienced team of lawyers specializes in providing comprehensive legal solutions tailored to your specific needs.`,
      `With years of experience in ${category} law, we understand the complexities and nuances involved in these cases. Our approach combines legal expertise with personalized attention to ensure the best possible outcomes for our clients.`,
      `Whether you're facing a legal challenge or need preventive legal advice, our ${serviceName.toLowerCase()} services are designed to protect your rights and interests at every stage of the legal process.`
    ],
    icon: 'Shield',
    backgroundColor: '#f8fafc'
  });

  // Block 2: Legal Framework
  blocks.push({
    type: 'legal-framework',
    heading: 'Legal Framework and Applicable Laws',
    subheading: 'Understanding the Legal Foundation',
    paragraphs: [
      `The legal framework governing ${serviceName.toLowerCase()} matters in India is comprehensive and well-established. It draws from various statutes, precedents, and constitutional provisions that ensure justice and fairness.`,
      `Our lawyers stay updated with the latest amendments, judicial pronouncements, and legal developments to provide you with current and accurate legal advice.`
    ],
    keyLaws: [
      'Constitution of India - Fundamental Rights and Duties',
      'Relevant Central and State Legislation',
      'Procedural Laws - CPC, CrPC, Evidence Act',
      'Supreme Court and High Court Precedents',
      'International Conventions (where applicable)'
    ],
    icon: 'Scale',
    backgroundColor: '#ffffff'
  });

  // Block 3: Types of Cases/Services
  blocks.push({
    type: 'types',
    heading: `Types of ${serviceName} Cases We Handle`,
    subheading: 'Comprehensive Legal Services Across All Matters',
    cases: [
      {
        name: 'Consultation and Legal Advice',
        description: 'Expert legal consultation to understand your rights, obligations, and available legal remedies.'
      },
      {
        name: 'Documentation and Drafting',
        description: 'Professional drafting of legal documents, petitions, applications, and agreements.'
      },
      {
        name: 'Court Representation',
        description: 'Skilled representation before all courts and tribunals with strategic advocacy.'
      },
      {
        name: 'Negotiation and Settlement',
        description: 'Effective negotiation to achieve favorable settlements and avoid prolonged litigation.'
      },
      {
        name: 'Appeals and Reviews',
        description: 'Filing and arguing appeals before higher courts to challenge unfavorable orders.'
      }
    ],
    icon: 'Briefcase',
    backgroundColor: '#f8fafc'
  });

  // Block 4: Process
  blocks.push({
    type: 'process',
    heading: 'Our Legal Process',
    subheading: 'Step-by-Step Approach to Your Case',
    steps: [
      {
        step: 1,
        title: 'Initial Consultation',
        description: 'Free initial consultation to understand your case, review documents, and assess legal merits. We provide honest evaluation and clear guidance on the way forward.',
        duration: '30-60 minutes'
      },
      {
        step: 2,
        title: 'Case Analysis',
        description: 'Comprehensive analysis of your case including legal research, precedent study, and strategy development. We identify strengths, weaknesses, and potential outcomes.',
        duration: '2-3 days'
      },
      {
        step: 3,
        title: 'Documentation',
        description: 'Meticulous preparation of all legal documents, petitions, affidavits, and supporting evidence. We ensure compliance with all procedural requirements.',
        duration: '3-7 days'
      },
      {
        step: 4,
        title: 'Filing and Representation',
        description: 'Professional filing of your case and expert representation in court. We handle all court appearances, arguments, and procedural matters.',
        duration: 'Ongoing'
      },
      {
        step: 5,
        title: 'Follow-up and Execution',
        description: 'Regular updates on case progress, compliance with court orders, and execution of favorable judgments. We stay with you until complete resolution.',
        duration: 'Until resolution'
      }
    ],
    icon: 'ClipboardList',
    backgroundColor: '#ffffff'
  });

  return blocks;
};

module.exports = {
  imageUrls,
  generateContentBlocks
};
