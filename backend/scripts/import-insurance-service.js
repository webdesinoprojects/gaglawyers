require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'insurance-lawyer',
  name: 'Insurance Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Insurance Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for insurance disputes including claim denials, bad faith practices, policy coverage disputes, and regulatory compliance. Specialized representation for all types of insurance matters.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Insurance Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Insurance law in India is a set of rules, regulations, and guidelines for the insurance industry. Insurance law ensures that the rights of policyholders are safeguarded and that insurance companies comply with their obligations. Insurance law also regulates how insurers should conduct business, how claims should be handled, and what limits can be imposed on coverage.\n\nInsurance law in India also establishes procedures for filing claims, resolving disputes between insurers and policyholders, and determining compensation for injuries or damages caused by an accident or illness. The Insurance Laws Act of India provides for the regulation and development of the insurance sector. It came into force on January 1, 1956.\n\nInsurance law in India is primarily administered by the Insurance Regulatory and Development Authority of India (IRDAI). The IRDAI was established as an independent statutory body under Section 3 of the Insurance Laws Act 1956 to regulate, develop, and promote the Indian insurance industry so that it can create a sense of security among consumers. The Ministry of Corporate Affairs (MCA) is responsible for enforcing provisions related to financial services and corporate governance under the Companies Act, 2013.'
      }
    },
    {
      type: 'benefits',
      heading: 'Primary Types of Insurance Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Insurance Regulatory and Development Authority (IRDA) Act',
            description: 'The IRDA Act, 1999, provides for the establishment of an authority to protect the interests of insurance policyholders, regulate, and ensure orderly growth of the insurance industry. The Act defines the powers, duties, and licensing terms of insurers and agents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Life Insurance Corporation Act',
            description: 'The LIC Act, 1956, regulates all life insurance businesses and created the Life Insurance Corporation of India (LIC), which has exclusive rights to transact life insurance business in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insurance Act, 1938',
            description: 'Governs the insurance sector, outlining insurer and insured responsibilities and the framework for disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insurance Ombudsman Act',
            description: 'Introduced in 2019, it provides a platform for the resolution of complaints related to insurance services. Appointments are made in consultation with IRDAI.'
          },
          {
            icon: 'CheckCircle',
            title: 'Motor Vehicles Act',
            description: 'Governs all matters relating to motor vehicles, including insurance coverage, registration, inspection, and licensing.'
          },
          {
            icon: 'CheckCircle',
            title: 'Marine Insurance Act',
            description: 'Enacted in 1963 to regulate marine insurance contracts and related disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insurance Claims Settlement and Surveyors Act',
            description: 'Regulates the activities of surveyors and loss assessors and ensures fair claims settlement.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Fraud or Misrepresentation',
            description: 'Imprisonment up to 3 years, fine up to ₹10,000, or both for fraudulent claims or misrepresentation of facts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-Compliance with Insurance Act or IRDA Act',
            description: 'Imprisonment up to 6 months, fine up to ₹1 lakh, or both for violations of Insurance Act or IRDA Act provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Breach of Trust by Insurer',
            description: 'Imprisonment up to 7 years, fine up to ₹1 lakh for criminal breach of trust by an insurance company.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negligence by Insurance Agents',
            description: 'Imprisonment up to 1 year, fine up to ₹1 lakh for negligence or misconduct by insurance agents.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available Under Insurance Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Civil Remedies',
            description: 'File a claim in civil court for damages or compensation for denied claims or breach of contract.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Remedies',
            description: 'File a complaint against insurers for criminal breach of trust or fraudulent practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Regulatory Relief',
            description: 'Approach IRDAI or Insurance Ombudsman for resolution of complaints and disputes with insurance companies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Arbitration',
            description: 'Obtain binding awards from arbitrators for resolution of insurance disputes outside of court.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Insurance Lawyers',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice and Consultation',
            description: 'Advise clients on rights, obligations, and remedies available under insurance law. Provide guidance on policy terms and coverage.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in courts, IRDAI proceedings, and appeals before High Courts and Supreme Court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Claim Filing Assistance',
            description: 'Assist with claim filing, negotiation with insurers, and settlement of disputes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Counsel',
            description: 'Provide counsel on consumer protection, contract law, and tort law as they relate to insurance matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection from Future Issues',
            description: 'Protect clients from future mishaps due to insurer negligence or bad faith practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Policy Review',
            description: 'Review insurance policies to identify potential issues, exclusions, and coverage gaps.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File an Insurance Case',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Insurance Policy Documents',
            description: 'Complete insurance policy documents including terms, conditions, and coverage details.'
          },
          {
            icon: 'CheckCircle',
            title: 'Claim Forms',
            description: 'Properly filled claim forms submitted to the insurance company.'
          },
          {
            icon: 'CheckCircle',
            title: 'Medical Reports',
            description: 'Medical reports, bills, and prescriptions (for health insurance claims).'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Evidence',
            description: 'Bills, receipts, photographs, and other evidence supporting the claim.'
          },
          {
            icon: 'CheckCircle',
            title: 'Company Registration Certificate',
            description: 'Certificate of company registration (for corporate insurance matters).'
          },
          {
            icon: 'CheckCircle',
            title: 'Policyholder Identity Proof',
            description: 'Valid identity proof of the policyholder such as Aadhaar card, passport, or driver\'s license.'
          },
          {
            icon: 'CheckCircle',
            title: 'Insurer\'s License Copy',
            description: 'Copy of the insurer\'s license to verify their authorization to conduct insurance business.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Fee Challan',
            description: 'Proof of payment of court fees for filing the case.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Insurance Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Policy Terms Advice',
            description: 'Provide advice on policy terms, exclusions, and coverage adequacy to ensure clients understand their insurance policies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation with Insurers',
            description: 'Negotiate with insurers for fair settlements and ensure clients receive rightful compensation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings and IRDAI appeals, providing strong legal advocacy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Claims Filing Assistance',
            description: 'Assist with claims filing and evidence gathering to strengthen the client\'s case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Guidance',
            description: 'Provide guidance on consumer protection, contract law, and tort law as they relate to insurance matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensation Recovery',
            description: 'Help clients obtain rightful compensation for denied claims or bad faith practices by insurers.'
          },
          {
            icon: 'CheckCircle',
            title: 'Risk Management',
            description: 'Help businesses with risk management by reviewing insurance policies and contracts, identifying potential legal issues.'
          },
          {
            icon: 'CheckCircle',
            title: 'Comprehensive Support',
            description: 'Provide comprehensive legal support for all types of insurance including health, life, property, liability, and motor insurance.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'United India Insurance Co. Ltd. v. Subhash Chandra Gupta (2018)',
            description: 'Supreme Court case concerning the interpretation of Section 45 of the Insurance Act, 1938. The court held that the insurer cannot reject the claim for payment of the insured\'s death benefit on the ground of non-disclosure of material facts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Oriental Insurance Co. Ltd. v. United India Insurance Co. Ltd. (2015)',
            description: 'Supreme Court case concerning the interpretation of Section 64VB of the Insurance Act, 1938. The court held that the insurer is not liable to pay the claim if the insured has made a false statement or suppressed material information when applying for the policy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Liberty India Insurance Co. Ltd. v. Meenakshi (2019)',
            description: 'High Court case concerning the interpretation of Section 45 of the Insurance Act, 1938. The court held that the insurer cannot reject the claim for payment of the insured\'s death benefit on the ground of non-disclosure of material facts.'
          },
          {
            icon: 'CheckCircle',
            title: 'National Insurance Co. Ltd. v. Bhagwati (2017)',
            description: 'High Court case concerning the interpretation of Section 64V of the Insurance Act, 1938, establishing important precedents for insurance claim disputes.'
          }
        ]
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
            question: 'What are some common types of insurance law cases in India?',
            answer: 'Common types include disputes over coverage, denial of claims, bad faith practices by insurers, and breach of contract.'
          },
          {
            question: 'What qualifications should I look for in an insurance lawyer?',
            answer: 'Look for an insurance lawyer who has experience in handling insurance law cases, understands the nuances of insurance contracts and policies, and has a deep knowledge of relevant laws and regulations.'
          },
          {
            question: 'Can I sue an insurance company for denying my claim?',
            answer: 'Yes, you can sue an insurance company for denying your claim, and an insurance lawyer can help you file a lawsuit and represent you in court.'
          },
          {
            question: 'How long do insurance law cases typically take to resolve?',
            answer: 'Insurance law cases can vary in length depending on their complexity and the legal process involved. Some cases can be resolved relatively quickly, while others may take months or even years to complete.'
          },
          {
            question: 'What should I do if my insurance claim is denied?',
            answer: 'If your insurance claim is denied, you should carefully review the denial letter and contact an insurance lawyer to discuss your legal options.'
          },
          {
            question: 'Can I appeal an insurance company\'s decision to deny my claim?',
            answer: 'Yes, you can appeal an insurance company\'s decision through internal appeals, IRDAI complaints, or legal proceedings.'
          },
          {
            question: 'What are some common defenses used in insurance law cases?',
            answer: 'Common defenses include arguing that the claim was not covered under the policy, that the policyholder provided false information, or that the policy was cancelled due to non-payment of premiums.'
          },
          {
            question: 'What are the penalties for insurance companies that engage in bad faith practices?',
            answer: 'Penalties can vary depending on the severity of the offense and the laws of the jurisdiction. Penalties may include fines, sanctions, and revocation of the insurer\'s license.'
          },
          {
            question: 'Can insurance law cases be settled out of court?',
            answer: 'Yes, insurance law cases can be settled out of court through negotiation or alternative dispute resolution methods, such as mediation or arbitration.'
          },
          {
            question: 'How can businesses protect themselves from insurance disputes?',
            answer: 'Businesses can protect themselves by carefully reviewing and understanding their insurance policies, promptly reporting any claims, and maintaining accurate records of all communications with insurers.'
          },
          {
            question: 'How does the IRDAI regulate the insurance industry in India?',
            answer: 'The IRDAI is the regulatory body that oversees the insurance industry in India, ensuring that insurance companies comply with applicable laws and regulations and protect the interests of policyholders.'
          },
          {
            question: 'What is the role of an insurance lawyer in the insurance claims process?',
            answer: 'An insurance lawyer can help policyholders navigate the insurance claims process, negotiate with insurers, and represent them in court or other legal proceedings.'
          },
          {
            question: 'How does insurance law impact businesses in India?',
            answer: 'Insurance law can have a significant impact on businesses in India, as it governs the way insurance policies are created, managed, and enforced.'
          },
          {
            question: 'Can insurance lawyers provide legal assistance for all types of insurance?',
            answer: 'Insurance lawyers can provide legal assistance for a variety of insurance types, including health insurance, life insurance, property insurance, liability insurance, and more.'
          },
          {
            question: 'Can insurance companies be held liable for bad faith practices?',
            answer: 'Yes, insurance companies can be held liable for bad faith practices if they act in a manner that is dishonest, fraudulent, or in bad faith.'
          },
          {
            question: 'What is the statute of limitations for filing an insurance claim in India?',
            answer: 'The statute of limitations for filing an insurance claim in India can vary depending on the specific policy and type of claim. It is important to consult with an insurance lawyer to determine the applicable limitations period.'
          },
          {
            question: 'What are common mistakes policyholders make when filing insurance claims?',
            answer: 'Common mistakes include failing to report the claim promptly, providing incomplete or inaccurate information, and accepting a low settlement offer from the insurer.'
          },
          {
            question: 'How can insurance lawyers help businesses with risk management?',
            answer: 'Insurance lawyers can help businesses with risk management by reviewing insurance policies and contracts, identifying potential legal issues, and providing guidance on best practices for managing risk and avoiding disputes.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact our expert insurance lawyers today for professional assistance with claim denials, policy disputes, and all insurance matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Insurance Lawyer in Delhi – GAG Lawyers',
    metaDescription: 'Insurance Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
