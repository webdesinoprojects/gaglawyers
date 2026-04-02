// SERVICE DATA TEMPLATE
// Copy this template and fill in your content for each service
// Then paste into frontend/src/data/servicesData.js

'your-service-slug-here': {
  // Basic Info
  title: 'Service Title',
  subtitle: 'Short description for preview',
  metaTitle: 'SEO Title | Grover & Grover Advocates',
  metaDescription: 'SEO description with keywords',
  
  // Hero Section (Always Required)
  hero: {
    title: 'Main Heading for Hero',
    subtitle: 'Subtitle/tagline for hero section',
    cta: 'Get Free Consultation'  // Or customize CTA text
  },

  // About Section (Optional but recommended)
  about: {
    title: 'About [Service Name]',
    content: `Main paragraph describing the service. 
    Can be multiple sentences. Use backticks for multi-line text.`,
    sections: [  // Optional sub-sections
      {
        heading: 'Optional Sub-heading',
        points: [
          'Bullet point 1',
          'Bullet point 2',
          'Bullet point 3'
        ]
      }
    ]
  },

  // Types Section (Choose appropriate name)
  // Use: typesOfBail, typesOfCases, typesOfDisputes, etc.
  typesOfBail: {  // Rename based on service
    title: 'Types of [Something]',
    description: 'Optional intro text',
    types: [
      {
        name: 'Type Name 1',
        description: 'Description of this type'
      },
      {
        name: 'Type Name 2',
        description: 'Description of this type'
      }
    ]
  },

  // OR use this structure for simpler cases:
  typesOfCases: {
    title: 'Types of Cases',
    cases: [
      {
        name: 'Case Type 1',
        description: 'What this involves'
      },
      {
        name: 'Case Type 2',
        description: 'What this involves'
      }
    ]
  },

  // Acts & Provisions (Optional)
  actsProvisions: {
    title: 'Acts & Provisions',
    items: [
      'Act Name, Year',
      'Section numbers',
      'Other relevant laws'
    ]
  },

  // Major Statutes (Alternative to actsProvisions)
  majorStatutes: {
    title: 'Major Statutes',
    statutes: [
      'Statute 1, Year',
      'Statute 2, Year'
    ]
  },

  // Filing Procedure (Optional)
  filingProcedure: {
    title: 'Filing Procedure',
    steps: [
      'Step 1: Description',
      'Step 2: Description',
      'Step 3: Description',
      'Step 4: Description'
    ]
  },

  // What to Do (Alternative for advice-style services)
  whatToDo: {
    title: 'What to Do When...',
    steps: [
      'Action 1',
      'Action 2',
      'Action 3'
    ]
  },

  // Charges & Penalties (Optional)
  chargesAndPenalties: {
    title: 'Charges, Penalties & Punishment',
    items: [
      'Penalty description 1',
      'Penalty description 2',
      'Fine amounts and imprisonment details'
    ]
  },

  // Legal Remedies (Optional)
  legalRemedies: {
    title: 'Legal Remedies',
    remedies: [
      'Remedy 1: Description',
      'Remedy 2: Description'
    ]
  },

  // OR use detailed remedies:
  remediesAvailable: {
    title: 'Remedies Available',
    remedies: [
      {
        name: 'Remedy Name',
        description: 'What this remedy provides'
      }
    ]
  },

  // Rights & Obligations (Optional)
  rightsObligations: {
    title: 'Rights & Obligations',
    description: 'General description',
    rights: [
      'Right 1',
      'Right 2'
    ],
    obligations: [
      'Obligation 1',
      'Obligation 2'
    ]
  },

  // Documents Required (Highly Recommended)
  documentsRequired: {
    title: 'Documents Required',
    documents: [
      'Document 1',
      'Document 2',
      'Document 3',
      'Document 4',
      'Identity proof',
      'Address proof',
      'Any other relevant documents'
    ]
  },

  // Role of Our Lawyers (Highly Recommended)
  roleOfLawyers: {
    title: 'Role of Our Lawyers',
    description: `Detailed description of what your lawyers do for this service. 
    Include specific actions, responsibilities, and how they help clients.`
  },

  // How Grover & Grover Helps (Required - Your unique value)
  howWeHelp: {
    title: 'How Grover & Grover Helps',
    description: `Specific ways your firm helps clients with this service. 
    Mention 24/7 availability, experience, success rate, or unique approaches.`
  },

  // Popular Cases (Highly Recommended)
  popularCases: {
    title: 'Popular Cases',
    cases: [
      'Case Name vs. Respondent (Year) Court - Brief description',
      'Case Name vs. Respondent (Year) Court - Brief description',
      'Case Name vs. Respondent (Year) Court - Brief description'
    ]
  },

  // FAQs (Required - Minimum 5, Recommended 10-15)
  faqs: [
    {
      question: 'What is [service] in India?',
      answer: 'Comprehensive answer explaining the service, its purpose, and relevance.'
    },
    {
      question: 'Who can avail this service?',
      answer: 'Answer describing eligibility and who typically needs this service.'
    },
    {
      question: 'How long does the process take?',
      answer: 'Realistic timeline explanation with factors that affect duration.'
    },
    {
      question: 'What are the costs involved?',
      answer: 'General cost information without specific pricing.'
    },
    {
      question: 'Do I need a lawyer for this?',
      answer: 'Explanation of why legal representation is important for this service.'
    },
    {
      question: 'What documents do I need?',
      answer: 'Summary of key documents (detailed list should be in documentsRequired section).'
    },
    {
      question: 'Can I handle this myself?',
      answer: 'Honest answer about DIY vs. professional help.'
    },
    {
      question: 'What if I lose the case?',
      answer: 'Information about appeals and next steps.'
    },
    {
      question: 'How do I choose the right lawyer?',
      answer: 'Guidance on selecting a lawyer (subtly highlighting your firm\'s strengths).'
    },
    {
      question: 'Can this be settled out of court?',
      answer: 'Information about alternative dispute resolution if applicable.'
    }
    // Add more FAQs as needed (10-15 is ideal)
  ]
},

// ========================================
// EXAMPLE: COMPLETE SERVICE DATA
// ========================================

// Here's a complete example for Contract Dispute Lawyer:

'contract-lawyer-in-delhi': {
  title: 'Top Contract & Commercial Dispute Lawyers in Delhi',
  subtitle: 'Expert legal counsel for breach of contract, warranty disputes, and all commercial agreement matters.',
  metaTitle: 'Best Contract Lawyers in Delhi | Commercial Dispute Experts',
  metaDescription: 'Expert contract lawyers for breach of contract and commercial disputes in Delhi. Comprehensive legal services.',
  
  hero: {
    title: 'Top Contract & Commercial Dispute Lawyers in Delhi',
    subtitle: 'Expert legal counsel for breach of contract, warranty disputes, and all commercial agreement matters.',
    cta: 'Get Free Consultation'
  },

  about: {
    title: 'About Contract Law',
    content: 'Contract law in India is governed by the Indian Contract Act, 1872, supplemented by the Indian Sale of Goods Act and the Indian Partnership Act. A contract is a legally binding agreement between parties to do or refrain from doing something.',
    sections: []
  },

  typesOfCases: {
    title: 'Types of Contract Disputes',
    cases: [
      {
        name: 'Breach of Contract',
        description: 'Failure to provide goods/services, failure to pay, non-performance, late delivery'
      },
      {
        name: 'Breach of Warranty',
        description: 'Failure to repair/replace defective goods, failure to provide documentation'
      },
      {
        name: 'Interpretation Disputes',
        description: 'Ambiguity over contract terms, clause construction disputes'
      },
      {
        name: 'Damages Disputes',
        description: 'Disagreements over compensation amount, type of damages, causation'
      }
    ]
  },

  actsProvisions: {
    title: 'Acts & Provisions',
    items: [
      'Indian Contract Act, 1872 (primary legislation)',
      'Indian Sale of Goods Act',
      'Indian Partnership Act',
      'Indian Negotiable Instruments Act',
      'Indian Stamp Act',
      'Indian Arbitration Act',
      'Indian Evidence Act, 1872',
      'Consumer Protection Act, 1986'
    ]
  },

  remediesAvailable: {
    title: 'Remedies for Breach',
    remedies: [
      { name: 'Specific Performance', description: 'Court directs fulfilment of contract' },
      { name: 'Damages', description: 'Monetary compensation' },
      { name: 'Quantum Meruit', description: 'Payment for work done' },
      { name: 'Injunction', description: 'Court order to stop action' },
      { name: 'Rescission', description: 'Cancellation of contract' },
      { name: 'Restitution', description: 'Return to original position' }
    ]
  },

  documentsRequired: {
    title: 'Documents Required',
    documents: [
      'Copy of the disputed contract/agreement',
      'Correspondence between parties (emails, letters)',
      'Payment records/invoices',
      'Evidence of breach (delivery records, bank statements)',
      'Witness statements/affidavits',
      'Previous settlement attempts documentation'
    ]
  },

  roleOfLawyers: {
    title: 'Role of Our Lawyers',
    description: 'Analyze and understand contracts in detail, ensure clauses comply with Indian law, draft contracts, negotiate terms, identify potential disputes before they arise, close loopholes, advise on legal implications, enforce contractual rights, and recommend best course of action.'
  },

  howWeHelp: {
    title: 'How Grover & Grover Helps',
    description: 'We provide comprehensive advice on Indian contract law complexities, draft and review contracts, advise on rights and liabilities, represent in court and arbitration, negotiate settlements, handle appeals. We specialize in commercial contracts, partnership agreements, and service contracts.'
  },

  popularCases: {
    title: 'Popular Cases',
    cases: [
      'Keshavlal Laxmidas & Co. vs. Union of India (SC, 1969) – Breach by government',
      'State of Gujarat vs. Vadilal Sarabhai (SC, 1973) – Government contract breach',
      'P.G. Narayana & Co. vs. State of Kerala (HC Kerala, 1975)',
      'Indian Oil Corp. Ltd. vs. State of Rajasthan (SC, 1982)',
      'Bharat Sanchar Nigam Ltd. vs. Union of India (SC, 2003)'
    ]
  },

  faqs: [
    {
      question: 'What is contract law in India?',
      answer: 'Legal rules governing formation, performance, and enforcement of agreements between parties.'
    },
    {
      question: 'Types of contracts recognized?',
      answer: 'Express, implied, unilateral, bilateral, executed, executory contracts.'
    },
    {
      question: 'Essential elements of valid contract?',
      answer: 'Offer/acceptance, intention to create legal relations, consideration, capacity, free consent, lawful object, certainty.'
    },
    {
      question: 'Remedies for breach?',
      answer: 'Specific performance, damages, quantum meruit, injunction, rescission, restitution.'
    },
    {
      question: 'Limitation period for breach?',
      answer: '3 years from date of breach under the Indian Limitation Act.'
    },
    {
      question: 'Can unwritten contracts be enforced?',
      answer: 'Yes, except immovable property contracts which must be written and registered.'
    },
    {
      question: 'Can minors enter contracts?',
      answer: 'Generally no, except contracts for necessities of life.'
    },
    {
      question: 'How to resolve contract disputes?',
      answer: 'Through mediation, arbitration, or court litigation depending on contract terms and circumstances.'
    }
  ]
}

// ========================================
// QUICK TIPS FOR EACH SERVICE:
// ========================================

/*
1. CRIMINAL LAWYER
   - Focus on: Bail, arrest, FIR, charge sheet
   - Key sections: typesOfCases, filingProcedure, documentsRequired
   
2. DIVORCE LAWYER
   - Focus on: Mutual consent, contested, grounds
   - Key sections: typesOfDivorce, filingProcedure, documentsRequired
   
3. EMPLOYMENT LAWYER
   - Focus on: Wrongful termination, wages, harassment
   - Key sections: actsProvisions, rightsObligations, legalRemedies

4. IMMIGRATION LAWYER
   - Focus on: Visas, citizenship, deportation
   - Key sections: categories, documentsRequired, filingProcedure

5. HIGH COURT LAWYER
   - Focus on: Appeals, writs, jurisdiction
   - Key sections: typesOfCases, filingProcedure, popularCases

... and so on for each service
*/
