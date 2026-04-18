require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'high-court-lawyer',
  name: 'High Court Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'High Court Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal representation in High Court cases including criminal appeals, civil disputes, constitutional matters, and bail applications. Experienced advocacy for complex litigation.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'High Court Lawyers - Expert Legal Representation',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'High Court lawyers are legal professionals who specialize in representing clients in cases tried in the High Court. The High Court is the highest court in a jurisdiction and the final court of appeal for decisions made in lower courts. Experienced High Court lawyers in Delhi possess the qualifications, knowledge, and courtroom skills required to handle complex legal matters efficiently.\n\nA High Court lawyer must be proficient in interpreting complex legislation, legal precedents, and procedural rules to advocate effectively for their clients. They prepare and present evidence, cross-examine witnesses, and ensure that every legal document is accurately filed. Whether you need representation for criminal appeals, civil disputes, constitutional challenges, or bail applications, having an experienced attorney ensures that your rights are protected throughout the judicial process.\n\nHigh Court lawyers handle high-stakes cases that require deep legal knowledge, strategic thinking, and exceptional courtroom advocacy skills. They work on matters that have been appealed from lower courts or cases that fall directly under the High Court\'s original jurisdiction.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes Heard by High Court',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Criminal Matters',
            description: 'Serious offences such as murder, terrorism, treason, and appeals against lower court convictions. High Court lawyers handle criminal appeals and bail applications in complex cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Civil Disputes',
            description: 'Large-scale civil matters, commercial disputes, property or land conflicts, and professional negligence claims requiring expert legal representation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Constitutional Matters',
            description: 'Challenges to the legality of laws, government decisions, and inter-governmental disputes. Cases involving fundamental rights and constitutional interpretation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Administrative Law',
            description: 'Disputes involving citizens and government bodies, including local councils and tribunal decisions. Judicial review of administrative actions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Human Rights Issues',
            description: 'Cases ensuring compliance with constitutional and international human rights standards. Protection of fundamental rights and liberties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Writ Petitions',
            description: 'Filing and arguing writ petitions including habeas corpus, mandamus, prohibition, certiorari, and quo warranto for protection of rights.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of High Court Lawyers',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice and Consultation',
            description: 'Advise clients on legal rights and obligations, assess the merits of cases, and provide strategic guidance on the best course of action.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings before the High Court, presenting arguments, examining witnesses, and advocating for clients\' interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Drafting Legal Documents',
            description: 'Draft legal documents and petitions for cases, appeals, or bail applications with precision and legal accuracy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation and Settlement',
            description: 'Negotiate settlements in cases where out-of-court resolution is possible, saving time and resources for clients.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Research',
            description: 'Conduct thorough legal research on precedents, statutes, and case law to build strong arguments and legal strategies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ethical Compliance',
            description: 'Ensure compliance with ethical and professional standards set by the Bar Council and maintain the highest standards of legal practice.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Case in High Court',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            title: 'Determine Jurisdiction',
            description: 'Consult a High Court lawyer to identify the correct court based on the location of parties and case type. Ensure the High Court has jurisdiction over the matter.'
          },
          {
            title: 'Prepare Pleadings',
            description: 'Draft the statement of claim and written statement with the guidance of an experienced High Court lawyer. Ensure all facts and legal arguments are clearly presented.'
          },
          {
            title: 'Draft Petition and Affidavit',
            description: 'The petition must outline facts and legal arguments, while the affidavit is a sworn declaration verified by a notary. Both documents must be accurate and complete.'
          },
          {
            title: 'File with High Court Registry',
            description: 'Submit documents with the necessary court fees to the High Court registry. Court fees vary by case type and jurisdiction.'
          },
          {
            title: 'Await Court Decision',
            description: 'The court may take months to review the case. Favorable decisions proceed to trial, while unfavorable outcomes can be appealed to higher courts.'
          },
          {
            title: 'Court Proceedings',
            description: 'Attend hearings, present evidence, cross-examine witnesses, and make legal arguments before the High Court judges.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Case in High Court',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Petition',
            description: 'Detailed petition outlining the case facts, parties involved, and relief sought from the High Court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavits',
            description: 'Sworn affidavits supporting claims made in the petition, verified by a notary public.'
          },
          {
            icon: 'CheckCircle',
            title: 'Complaint Forms and Summons',
            description: 'For civil cases, complaint forms, summons, and written statements must be filed.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Documents',
            description: 'Indictments, police reports, contracts, or other documents relevant to the case (for criminal or contractual disputes).'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Payment',
            description: 'Proof of payment of court fees as required by the High Court registry.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lower Court Orders',
            description: 'If filing an appeal, copies of lower court judgments and orders must be submitted.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in High Court Cases',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Legal Representation',
            description: 'Provide legal representation in all types of High Court cases in Delhi, including criminal, civil, constitutional, and administrative matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Expert Document Drafting',
            description: 'Draft petitions, affidavits, and legal documents accurately and in compliance with High Court rules and procedures.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement Negotiation',
            description: 'Negotiate settlements and mediate disputes efficiently to achieve favorable outcomes without lengthy litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bail Applications',
            description: 'Represent clients for bail cases in Delhi High Court and other High Courts, ensuring immediate legal assistance in urgent matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Strategic Legal Advice',
            description: 'Provide strategic advice and courtroom advocacy based on years of experience handling complex High Court litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals and Revisions',
            description: 'Handle appeals from lower courts and revision petitions, ensuring all legal grounds are thoroughly argued.'
          },
          {
            icon: 'CheckCircle',
            title: 'Writ Petitions',
            description: 'File and argue writ petitions for protection of fundamental rights and judicial review of administrative actions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Multi-Jurisdictional Expertise',
            description: 'Experience in Delhi High Court and other High Courts across India, providing comprehensive legal support.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular High Court Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Brown v. Board of Education (1954)',
            description: 'Landmark case that declared racial segregation in public schools was unconstitutional. The case overturned the separate but equal doctrine and set the stage for the civil rights movement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Roe v. Wade (1973)',
            description: 'Controversial case concerning a woman\'s right to have an abortion. The Supreme Court ruled that the right to privacy extended to a woman\'s right to have an abortion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Miranda v. Arizona (1966)',
            description: 'Established the Miranda rights that must be read to criminal suspects during interrogation. The Court ruled that suspects must be informed of their rights to remain silent and to have an attorney.'
          },
          {
            icon: 'CheckCircle',
            title: 'United States v. Nixon (1974)',
            description: 'Case where President Nixon refused to comply with a subpoena to hand over tapes of White House conversations. The Supreme Court ruled that Nixon had to turn over the tapes and did not have absolute executive privilege.'
          },
          {
            icon: 'CheckCircle',
            title: 'United States v. Microsoft (2001)',
            description: 'Antitrust case against Microsoft and its Windows operating system. The Supreme Court ruled that Microsoft had violated antitrust laws but did not break up the company.'
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
            question: 'What is a high court case in India?',
            answer: 'A high court case in India is a legal proceeding that is heard by a high court, which is a superior court of record with jurisdiction over a specific geographical area or subject matter.'
          },
          {
            question: 'What are the types of cases that can be heard by a high court in India?',
            answer: 'High courts in India have the power to hear civil, criminal, and constitutional cases. They also handle writ petitions, appeals from lower courts, and matters of original jurisdiction.'
          },
          {
            question: 'What is the role of a High Court Lawyer in India?',
            answer: 'A High Court Lawyer in India represents clients in legal proceedings before the high court, providing legal advice and advocacy to protect their rights and interests.'
          },
          {
            question: 'What is the difference between a high court and a district court in India?',
            answer: 'A district court in India has jurisdiction over a specific district, whereas a high court has jurisdiction over a larger geographic area or subject matter. High courts are superior courts of record and have the power to review decisions made by lower courts.'
          },
          {
            question: 'Can I appeal a decision made by a district court to a high court in India?',
            answer: 'Yes, a party dissatisfied with a decision made by a district court can file an appeal to the high court within the prescribed time limit.'
          },
          {
            question: 'How can I file a high court case in India?',
            answer: 'To file a high court case in India, a person must first consult with a High Court Lawyer and provide them with all relevant information and documents. The lawyer will then draft and file the necessary court documents.'
          },
          {
            question: 'What are the fees associated with filing a high court case in India?',
            answer: 'The fees associated with filing a high court case in India depend on the nature of the case and the relief sought. Court fees vary by jurisdiction and case type.'
          },
          {
            question: 'How long does it take for a high court case to be heard in India?',
            answer: 'The time it takes for a high court case to be heard in India varies depending on the complexity of the case and the availability of judges. It can take several months to several years for a case to be resolved.'
          },
          {
            question: 'Can I represent myself in a high court case in India?',
            answer: 'Yes, it is possible to represent oneself in a high court case in India, but it is not recommended. It is important to have legal representation to ensure that your rights and interests are protected.'
          },
          {
            question: 'What is the procedure for an appeal in a high court case in India?',
            answer: 'To appeal a decision made by a lower court, a party must file an appeal with the high court within the time limit set by law. The high court will then review the lower court\'s decision.'
          },
          {
            question: 'Can a High Court Lawyer in India handle cases outside their jurisdiction?',
            answer: 'No, a High Court Lawyer in India can only handle cases within the jurisdiction of the high court where they are registered to practice.'
          },
          {
            question: 'What is the role of a judge in a high court case in India?',
            answer: 'The role of a judge in a high court case in India is to listen to arguments presented by the parties, apply the law to the facts of the case, and make a decision based on legal principles and precedents.'
          },
          {
            question: 'What are the qualifications required to become a High Court Lawyer in India?',
            answer: 'To become a High Court Lawyer in India, a person must first complete a law degree and pass the bar exam. They must also have a minimum number of years of experience practicing law as specified by the Bar Council.'
          },
          {
            question: 'How can I find the best High Court Lawyer in India?',
            answer: 'To find the best High Court Lawyer in India, one should seek referrals from trusted sources, research the lawyer\'s experience and track record, and schedule consultations to assess their expertise.'
          },
          {
            question: 'What is the process for filing a writ petition in a high court in India?',
            answer: 'To file a writ petition in a high court in India, a person must first consult with a High Court Lawyer and provide them with all relevant information and documents. The lawyer will then draft and file the necessary court documents, including the petition and supporting affidavits.'
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
        body: 'Contact our expert High Court lawyers today for professional representation in appeals, writ petitions, bail applications, and complex litigation',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'High Court Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'High Court Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
