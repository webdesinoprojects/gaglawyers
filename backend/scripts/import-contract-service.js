require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'contract-lawyer',
  name: 'Contract Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Expert Contract Lawyers in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Professional legal assistance for contract drafting, review, and dispute resolution. Specialized expertise in business contracts, commercial agreements, and contract litigation.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Contract Law - Comprehensive Legal Framework',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Contract law in India governs the enforceable promises and agreements that people, agencies, and other entities may enter into. It is a body of law that regulates and enforces the making and performance of agreements. It is based on the Indian Contract Act of 1872, which is a detailed piece of legislation that governs how contracts are formed and enforced.\n\nThe Indian Contract Act of 1872 outlines the primary principles of contract law in India. This Act is supplemented by the Indian Sale of Goods Act and the Indian Partnership Act. Together, these three pieces of legislation form the foundation of contract law in India and are the primary source of guidance for forming and enforcing contracts.\n\nThe Indian Contract Act of 1872 states that all contracts must be made with the free consent of both parties. It also states that all contracts must be valid, legal, and enforceable. Additionally, the Act outlines the rights and obligations of parties in a contract and the remedies available to either party in the case of a breach of contract.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes in Contract Cases',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Breach of Contract',
            description: 'Occurs when one or more parties fail to fulfill their obligations as stated in the contract, including failure to provide goods/services, non-payment, or delayed delivery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Breach of Warranty',
            description: 'Failure to fulfill warranty obligations such as repair/replace defective goods, perform promised maintenance, or provide necessary documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Interpretation Disputes',
            description: 'Ambiguity or disagreement over the meaning of certain terms or provisions, including disputes over construction, phrases, clauses, or legal interpretation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Damages Disputes',
            description: 'Disputes over compensation for losses or damages caused by breach of contract, including amount, type, or causation of damages.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions in Contract Law',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Indian Contract Act, 1872',
            description: 'Primary legal source governing contract disputes, providing remedies for breach including specific performance and damages, and covering formation, enforcement, and discharge of contracts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Sale of Goods Act',
            description: 'Outlines rights and obligations of parties in contracts concerning the sale of goods and remedies available in case of breach.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Partnership Act',
            description: 'Applies to contracts involving partnership agreements, outlining rights, obligations, and remedies for breach of partnership contracts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Evidence Act, 1872',
            description: 'Contains provisions relating to admissibility of evidence in legal cases, including documentary evidence such as contracts and presumptions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Consumer Protection Act, 1986',
            description: 'Provides protections to consumers against unfair trade practices in contractual relationships.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Contract Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Mutual Agreement',
            description: 'Both parties must agree to the terms and conditions of the contract for it to be legally binding and must act in good faith.'
          },
          {
            icon: 'CheckCircle',
            title: 'Capacity to Contract',
            description: 'Both parties must be capable of entering into the contract, meaning they must have the capacity to understand and agree to the terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Timely Performance',
            description: 'Each party has an obligation to fulfill their contractual obligations in a timely manner and refrain from acts that harm the other party\'s interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Good Faith Dealing',
            description: 'Both parties must act in a manner consistent with principles of good faith and fair dealing throughout the contract performance.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Essential Elements of Valid Contract',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Offer and Acceptance',
            description: 'Clear offer made by one party and unequivocal acceptance by the other party, creating mutual agreement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Consideration',
            description: 'Something of value exchanged between parties - the price paid by one party in exchange for the promise or performance of the other.'
          },
          {
            icon: 'CheckCircle',
            title: 'Free Consent',
            description: 'Agreement must be made with free consent of both parties, without coercion, undue influence, fraud, misrepresentation, or mistake.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lawful Object',
            description: 'The object and consideration of the contract must be lawful and not forbidden by law or against public policy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Certainty and Possibility',
            description: 'Terms must be certain and capable of performance - vague or impossible contracts are not enforceable.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Contract Lawyers',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Contract Analysis & Drafting',
            description: 'Analyze and understand contracts in detail, draft contracts following legal guidelines, and ensure terms are fair to all parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Compliance',
            description: 'Ensure contracts comply with relevant laws and regulations, are not in violation of existing agreements, and follow proper legal requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation & Dispute Resolution',
            description: 'Negotiate terms and conditions, identify potential disputes, provide advice on resolution, and identify loopholes to close them.'
          },
          {
            icon: 'CheckCircle',
            title: 'Enforcement & Remedies',
            description: 'Provide legal advice on enforcement, identify breaches, advise on remedies available, and guide on best course of action for implementation.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Contract Disputes',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expert Legal Advice',
            description: 'Our experienced team provides sound advice on contractual obligations, rights, and liabilities arising from contracts under Indian Contract Act.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contract Drafting & Review',
            description: 'We assist in drafting and execution of contracts, ensuring all parties understand their responsibilities and rights clearly.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution Services',
            description: 'We provide dispute resolution services including litigation, negotiation, drafting of settlements, and arbitration proceedings.'
          },
          {
            icon: 'CheckCircle',
            title: 'Enforcement Support',
            description: 'We help clients enforce contractual rights and remedies, including damages, injunctions, specific performance, and restitution.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is contract law in India?',
            answer: 'Contract law in India is a set of legal rules and principles that govern the formation, performance, and enforcement of agreements between two or more parties, based primarily on the Indian Contract Act of 1872.'
          },
          {
            question: 'What are the different types of contracts recognized by Indian contract law?',
            answer: 'Indian contract law recognizes various types of contracts including express contracts, implied contracts, unilateral contracts, bilateral contracts, executed contracts, and executory contracts.'
          },
          {
            question: 'What are the essential elements of a valid contract in India?',
            answer: 'Essential elements include offer and acceptance, intention to create legal relations, consideration, capacity of parties, free consent, lawful object, and certainty and possibility of performance.'
          },
          {
            question: 'What are the remedies available for breach of contract under Indian contract law?',
            answer: 'Remedies include specific performance (court orders party to fulfill obligations), damages (monetary compensation), quantum meruit (payment for work done), and injunction (court order to prevent breach).'
          },
          {
            question: 'What is the limitation period for filing a suit for breach of contract in India?',
            answer: 'The limitation period for filing a suit for breach of contract in India is three years from the date of the breach, as per the Indian Limitation Act.'
          },
          {
            question: 'Can a contract be enforced if it is not in writing in India?',
            answer: 'Yes, a contract can be enforced even if it is not in writing in India. However, certain types of contracts, such as contracts for the sale of immovable property, must be in writing to be enforceable.'
          },
          {
            question: 'Can minors enter into contracts in India?',
            answer: 'Minors are generally not competent to enter into contracts in India. However, there are certain exceptions to this rule, such as contracts for necessities like food, clothing, and shelter.'
          },
          {
            question: 'What is the difference between a void contract and a voidable contract?',
            answer: 'A void contract is not enforceable by law from the beginning, while a voidable contract is enforceable until it is voided by one of the parties who has the option to rescind it.'
          },
          {
            question: 'Can a contract be modified or rescinded under Indian contract law?',
            answer: 'Yes, a contract can be modified or rescinded with the agreement of all parties involved. Such modifications must be made in accordance with the terms of the original contract and requirements of Indian contract law.'
          },
          {
            question: 'What is the significance of consideration in a contract?',
            answer: 'Consideration is an essential element of a contract. It is the price paid by one party in exchange for the promise or performance of the other party, and serves as evidence of the intention to create legal relations.'
          },
          {
            question: 'What is the difference between a contract and a memorandum of understanding (MOU)?',
            answer: 'A contract is a legally binding agreement that creates rights and obligations enforceable by law, while an MOU is a non-binding agreement that outlines the understanding and intentions of the parties involved.'
          },
          {
            question: 'How can a contract dispute be resolved if parties cannot agree?',
            answer: 'Parties may seek mediation or arbitration where a neutral third party facilitates negotiation and decision-making. Alternatively, they may go to court and have a judge or jury decide the outcome of the dispute.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact our expert legal team today for professional assistance with contract drafting, review, and dispute resolution',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Contract Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Contract Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
  }
};

async function importService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const service = await Service.findOne({ slug: serviceData.slug });
    
    if (!service) {
      console.log(`❌ Service not found: ${serviceData.slug}`);
      process.exit(1);
    }

    await ServiceSection.deleteMany({ serviceId: service._id });

    const sectionDocs = serviceData.sections.map(section => ({
      serviceId: service._id,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    service.seo = serviceData.seo;
    await service.save();

    console.log(`✅ ${serviceData.name} imported — ${serviceData.sections.length} sections saved`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importService();
