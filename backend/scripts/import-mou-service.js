require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'memorandum-of-understanding-mou',
  name: 'Memorandum of Understanding MOU',
  sections: [
    {
      type: 'hero',
      heading: 'Memorandum of Understanding MOU',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for MOU Agreements',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'MOU Agreement Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A Memorandum of Understanding, which is often referred to as a Memorandum of Agreement, is basically a formal document that embodies the terms and details of an agreement entered into between two or more parties.\n\nIn the modern world of laws, ensuring there is a real understanding between any parties involved would be quite essential for the proper success of collaborations undertaken. Although technically not a contract and thus, generally not binding, an MOU is essential as a step towards more formal agreements and can be a crucial component of business negotiations and partnerships.'
      }
    },
    {
      type: 'overview',
      heading: 'Our Comprehensive MOU Services',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'At GAG Lawyers - Grover and Grover Advocates and Solicitors, our main focus is on providing detailed legal services over Memorandum of Understanding Agreements. Our MOU agreement lawyers work assiduously to ensure that your business interest is covered and that your intentions are unmistakably brought forth in every draft or review of an MOU.\n\nWe ensure that as your lawyer for MOU agreement matters, your MOU captures the true purposes of its coming into being and offers protection to your interests. We cover a very wide range of industries and types of agreements, and no matter what sort of MOU you need, we are here to provide it.'
      }
    },
    {
      type: 'benefits',
      heading: 'Our MOU Agreement Services',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Drafting Memorandum of Understanding',
            description: 'Our experienced lawyers specialize in making memorandum of understanding documents for your specific needs, including consultation to know your objectives, clear and concise language, full coverage of all terms and conditions, critical structuring to protect your interests, and compliance with applicable laws.'
          },
          {
            icon: 'CheckCircle',
            title: 'Review and Analysis of Existing MOUs',
            description: 'We review and analyze MOUs issued by other parties, identifying potential risks and liabilities, suggesting changes to safeguard your interests, ensuring clarity and enforceability of terms, and providing legal implications of the agreement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation Support',
            description: 'Our experienced lawyers represent you in MOU negotiations, offering strategic advice on negotiation strategies, presence in face-to-face or virtual conversations, drafting counter proposals and amendments, and advice on best practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Consultation on MOU Matters',
            description: 'We provide full legal consultancy including explanation of MOU and its implications, advisory on enforceability of MOU terms, discussion of potential hazards and benefits, and industry-specific insights and best practices.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'The Importance of Professional MOU Drafting',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Draftsmanship',
            description: 'A lawyer makes sure the language of the MOU is legally precise, enforceable, and correct.'
          },
          {
            icon: 'CheckCircle',
            title: 'Reduced Risk',
            description: 'Drafting professionally helps indicate and reduce risks long before they become an issue.'
          },
          {
            icon: 'CheckCircle',
            title: 'Clarity of Intent',
            description: 'A well-crafted MOU clearly spells out what the parties intend, reducing the possibility of future disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance',
            description: 'Our attorneys ascertain that your MOU complies with all applicable laws and regulations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Strategic Advantage',
            description: 'A professionally drafted MOU can be a strategic advantage in negotiation and business relationships.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Our Process for Drafting MOU Agreements',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Initial Consultation',
            description: 'We discuss with you your goals, the parties involved, and the specific terms that you may want included.'
          },
          {
            stepNumber: 2,
            title: 'Research and Analysis',
            description: 'The group conducts necessary research to confirm whether the MOU meets the standard requirements of the industry and requirements as may be brought forth by the law.'
          },
          {
            stepNumber: 3,
            title: 'Drafting',
            description: 'We create a comprehensive first draft memorandum of understanding, incorporating all the agreed terms and conditions.'
          },
          {
            stepNumber: 4,
            title: 'Review and Revision',
            description: 'You will review the first draft memorandum of understanding by lawyer, and we will do all the necessary revisions according to your comments.'
          },
          {
            stepNumber: 5,
            title: 'Finalization',
            description: 'Once all parties are satisfied, we finalize the MOU for signatures.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Fees for MOU Agreement Services',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'We appreciate that transparency in legal fee practice is key to the clients. Although the nature of each MOU can be very complex and broad, we are trying our best to offer reasonable pricing for our service.\n\nThe cost of preparing or reviewing an MOU agreement is commensurate with factors such as:\n• Complexity of the agreement\n• Number of parties\n• Industry and subject matter\n• The urgency of the request\n• Rate of negotiations\n\nWe encourage you to inquire about a quotation tailored to your specific needs. Our lawyer fees for MOU agreement services are fixed so that they represent excellent value for the expert legal guidance that you receive.'
      }
    },
    {
      type: 'benefits',
      heading: 'Case Studies: MOU Agreements in Indian Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Monnet Ispat and Energy Ltd. v. Union of India (2012)',
            description: 'The Supreme Court held that though MOUs are not a usual document that is legally binding, they can create a legitimate expectation and form the base for future agreements that would be legally enforceable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Motilal Padampat Sugar Mills Co. Ltd. v. State of Uttar Pradesh (1979)',
            description: 'This judgment held that the promises made in MOUs by state governments should be capable of being specifically enforceable. The doctrine of promissory estoppel would apply to actions taken based on commitments made in MOUs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Sharma Transport v. Government of A.P. & Ors (2002)',
            description: 'The Supreme Court reiterated that MOUs needed to be drafted in clear language. Terms used in an MOU between the government and private operators needed clear drafting to avoid disputes.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Professional MOU Agreement Services',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'Whether one needs draft memorandum of understanding documents or requires having one\'s lawyer review an agreement in terms of MOUs, wants to know about how to write a MOU, or wishes to consult on matters concerning MOUs, GAG Lawyers - Grover and Grover Advocates and Solicitors are at your service.\n\nOur team of advocates and lawyers is committed to the finest legal services suited to your requirements. Do not let it get too late. Let our expert lawyer handling MOU agreements for services draft or review your MOU.\n\nContact us today to schedule a consultation and let us navigate through these intricate confusions of MOU agreements so that we ensure your business interest is protected at every step.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 9,
      background: 'light',
      content: {
        items: [
          {
            question: 'How to Write a Memorandum of Understanding?',
            answer: 'Drafting a Memorandum of Understanding requires considering important elements: identify the parties, define the purpose of the MOU, outline the scope of the agreement, define terms and concepts, specify responsibilities of each party, include timelines and milestones, discuss confidentiality issues, establish process for amendment and termination, and include signatures of the parties involved. For a proper draft Memorandum of Understanding by advocate, seek our lawyers with MOU agreement services.'
          },
          {
            question: 'What is the Full Form of MOU?',
            answer: 'MOU stands for Memorandum of Understanding. It is also sometimes referred to as a Memorandum of Agreement (MOA). An MOU is a formal document that outlines the terms and details of an agreement between two or more parties.'
          },
          {
            question: 'How to Write a Memorandum?',
            answer: 'To write a memorandum: start with a clear title indicating it is a Memorandum of Understanding, identify all parties involved with full legal names and addresses, state the purpose and objectives clearly, outline the scope and key terms of understanding, specify roles and responsibilities of each party, include timelines and deliverables if applicable, address confidentiality and dispute resolution, specify duration and termination conditions, and conclude with signatures and dates. Professional legal assistance ensures all necessary elements are properly included.'
          },
          {
            question: 'Is an MOU legally binding in India?',
            answer: 'Generally, an MOU is not legally binding in India unless it contains all essential elements of a contract (offer, acceptance, consideration, intention to create legal relations). However, MOUs can create legitimate expectations and may be enforceable under the doctrine of promissory estoppel if one party has acted upon it. The enforceability depends on the language used and the intention of the parties.'
          },
          {
            question: 'What is the difference between an MOU and a contract?',
            answer: 'An MOU typically expresses mutual understanding and intent to work together but is generally not legally binding. A contract is a legally enforceable agreement with all essential elements including consideration. MOUs are often preliminary documents leading to formal contracts, while contracts create legal obligations. MOUs are more flexible and easier to modify, whereas contracts require formal amendment procedures.'
          },
          {
            question: 'Do I need a lawyer to draft an MOU?',
            answer: 'While not legally required, it is highly advisable to have a lawyer draft an MOU to ensure: proper legal language and structure, protection of your interests, compliance with applicable laws, clarity of terms to avoid future disputes, inclusion of necessary clauses, and professional drafting that can withstand legal scrutiny if enforceability becomes an issue.'
          },
          {
            question: 'Can an MOU be terminated?',
            answer: 'Yes, an MOU can be terminated. The termination process should be clearly outlined in the MOU itself, specifying: conditions under which termination is allowed, notice period required, process for termination, consequences of termination, and obligations that survive termination. If the MOU does not specify termination terms, parties can mutually agree to terminate or follow general principles of contract law.'
          },
          {
            question: 'What should be included in an MOU?',
            answer: 'An MOU should include: identification of all parties, purpose and objectives, scope of understanding, roles and responsibilities of each party, timelines and milestones, confidentiality provisions, intellectual property considerations, dispute resolution mechanism, amendment procedures, termination conditions, governing law, and signatures with dates. Additional clauses may be needed based on the specific situation.'
          },
          {
            question: 'How long does an MOU remain valid?',
            answer: 'The validity period of an MOU depends on what is specified in the document itself. MOUs can be: valid for a specific period (e.g., 1 year, 3 years), valid until a specific event occurs, valid until terminated by either party with notice, or indefinite until mutually terminated. It is important to clearly specify the duration in the MOU to avoid ambiguity.'
          },
          {
            question: 'Can an MOU be converted into a contract?',
            answer: 'Yes, an MOU can be converted into a formal contract by: adding essential elements of a contract (consideration, intention to create legal relations), making terms more specific and detailed, including enforcement mechanisms, adding legal remedies for breach, ensuring all parties sign with intention to be legally bound, and clearly stating that the document is intended to be a legally binding contract.'
          },
          {
            question: 'What is the cost of drafting an MOU?',
            answer: 'The cost of drafting an MOU varies based on: complexity of the agreement, number of parties involved, industry and subject matter, urgency of the requirement, extent of negotiations needed, and lawyer\'s experience and expertise. At GAG Lawyers, we provide transparent pricing tailored to your specific needs. Contact us for a detailed quotation.'
          },
          {
            question: 'Is stamp duty required on an MOU?',
            answer: 'Stamp duty requirements for MOUs vary by state in India. Generally, if the MOU creates any legal obligation or involves transfer of rights, it may attract stamp duty. Non-binding MOUs typically do not require stamp duty. However, it is advisable to consult with a lawyer to determine stamp duty applicability based on the specific content and purpose of your MOU and the state where it is executed.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert MOU Agreement Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional MOU agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Memorandum of Understanding MOU Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert MOU agreement services in Delhi. Professional legal advice for drafting, reviewing, and negotiating Memorandum of Understanding documents.'
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
