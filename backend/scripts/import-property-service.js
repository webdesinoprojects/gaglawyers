require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importPropertyService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Property/i });
    
    if (!service) {
      console.error('❌ Property service not found in database');
      process.exit(1);
    }

    console.log(`Found service: ${service.name} (slug: ${service.slug})`);

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Prepare sections
    const sections = [
      {
        serviceId: service._id,
        type: 'hero',
        visible: true,
        order: 1,
        heading: 'Property Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Services for Property Disputes',
          description: 'We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
          image: '/images/property-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Property Disputes',
        background: 'light',
        content: {
          text: 'Property Disputes are legal conflicts that arise between individuals or entities over ownership, possession, use, or rights associated with real property. These disputes can involve residential, commercial, or agricultural properties and may arise due to multiple reasons, including conflicting ownership claims, boundary disputes, breach of contracts, easement issues, inheritance conflicts, and landlord-tenant disputes. Resolving Property Disputes generally involves legal processes and may require the intervention of courts or alternative dispute resolution methods.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 3,
        heading: 'Common Types of Property Disputes',
        background: 'light',
        content: {
          items: [
            {
              title: 'Ownership Disputes',
              description: 'Occur when multiple parties claim ownership rights to a property. It may also include conflicting deeds, doubtful boundaries, or disputes concerning property transfer.'
            },
            {
              title: 'Boundary Disputes',
              description: 'Arise when neighboring property owners disagree about property boundaries, including encroachments, disputes over fence lines, or rights-of-way.'
            },
            {
              title: 'Landlord-Tenant Disputes',
              description: 'These disputes arise between landlords and tenants and may include issues like non-payment of rent, lease violations, property maintenance disputes, eviction cases, or security deposit disagreements.'
            },
            {
              title: 'Easement Disputes',
              description: 'Occur when there\'s conflict over the right to use or access a portion of someone else\'s property.'
            },
            {
              title: 'Nuisance Claims',
              description: 'Involve disputes over property use or enjoyment that interferes with neighboring properties, including noise disturbances, environmental pollution, or offensive odors.'
            },
            {
              title: 'Adverse Possession Claims',
              description: 'Arise when someone occupies and uses property without permission for a statutory period, potentially claiming ownership.'
            },
            {
              title: 'Inheritance Disputes',
              description: 'Include conflicts over property distribution after the death of an owner, including challenges to wills, claims of undue influence, or interpretation of testamentary documents.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 4,
        heading: 'Buying Property - Legal Process',
        background: 'accent',
        content: {
          description: 'Buying property is governed by property laws that vary across states. Here are the general steps involved:',
          steps: [
            {
              title: 'Research and Property Search',
              description: 'Begin by studying the property market and identifying your requirements. Engage a Property Lawyer for legal guidance.'
            },
            {
              title: 'Property Inspection and Due Diligence',
              description: 'Once a property is identified, conduct inspections and review legal documents, such as title deeds, surveys, and approvals.'
            },
            {
              title: 'Offer and Negotiation',
              description: 'Negotiate terms and make an offer with advice from a property attorney to ensure legal protection.'
            },
            {
              title: 'Sale Agreement and Contract',
              description: 'Formalize the agreement through a sale contract, possibly reviewed by legal experts if needed.'
            },
            {
              title: 'Financing and Conveyancing',
              description: 'Secure loans and engage a lawyer to manage legal documents, registration, and ownership transfer.'
            },
            {
              title: 'Property Transfer and Settlement',
              description: 'Complete registration, pay applicable taxes, and receive ownership and keys.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 5,
        heading: 'Selling Property - Legal Process',
        background: 'light',
        content: {
          description: 'Selling property involves several legal steps to ensure a smooth transaction:',
          steps: [
            {
              title: 'Property Valuation and Preparation',
              description: 'Determine market value via professional appraisal. Improve property for better appeal.'
            },
            {
              title: 'Marketing and Listing',
              description: 'Engage a property lawyer or estate agent to advertise the property.'
            },
            {
              title: 'Buyer Negotiation and Acceptance',
              description: 'Evaluate offers and negotiate terms with legal support.'
            },
            {
              title: 'Sales Contract and Conveyancing',
              description: 'Draft contracts accurately and manage legal formalities with a property lawyer.'
            },
            {
              title: 'Property Settlement and Transfer',
              description: 'Complete registration and transfer ownership with legal oversight.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 6,
        heading: 'Charges, Penalties & Punishments in Property Law',
        background: 'light',
        content: {
          text: 'Charges, penalties, and punishments depend on the jurisdiction and the nature of the offense. Common property law offenses include:\n\nTrespassing: Entering another\'s property without permission. Penalties include fines, community service, or imprisonment.\n\nTheft or Burglary: Unlawful removal of property. Penalties vary depending on property value and prior convictions.\n\nFraud or Embezzlement: Misrepresentation to wrongfully acquire property. Consequences include fines, restitution, and imprisonment.\n\nProperty Damage or Vandalism: Deliberate destruction of property. Penalties include fines, restitution, or imprisonment.\n\nLandlord-Tenant Offenses: Illegal eviction, non-return of security deposits, or lease violations.\n\nReal Estate Fraud: Misrepresentation in property transactions, mortgage fraud, or falsification of documents.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 7,
        heading: 'Acts and Provisions Under Property Law',
        background: 'accent',
        content: {
          text: 'Key legal acts governing property law in India include:\n\n• Transfer of Property Act\n• Registration Act\n• Land Acquisition Act\n• Real Estate (Regulation and Development) Act (RERA)\n• Rent Control Acts\n• Succession Laws\n• Co-ownership and Partition Laws\n• Environmental Protection Laws\n• Intellectual Property Laws'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 8,
        heading: 'Role of Property Lawyer in Property Cases',
        background: 'light',
        content: {
          items: [
            {
              title: 'Legal Advice and Consultation',
              description: 'Provide expert legal advice on property matters and rights.'
            },
            {
              title: 'Property Transactions',
              description: 'Assist in buying, selling, and transferring property with due diligence.'
            },
            {
              title: 'Title Verification',
              description: 'Verify property titles and ensure clear ownership.'
            },
            {
              title: 'Dispute Resolution',
              description: 'Resolve property disputes through negotiation, mediation, or litigation.'
            },
            {
              title: 'Legal Documentation',
              description: 'Draft and review legal documents including sale deeds, lease agreements, and contracts.'
            },
            {
              title: 'Court Representation',
              description: 'Represent clients in property disputes before courts and tribunals.'
            },
            {
              title: 'Research and Advocacy',
              description: 'Conduct legal research and advocate for client interests throughout proceedings.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 9,
        heading: 'Documents Required to File a Property Dispute Case',
        background: 'light',
        content: {
          items: [
            {
              title: 'Complaint/Petition',
              description: 'Formal complaint or petition initiating the legal proceedings.'
            },
            {
              title: 'Affidavit',
              description: 'Sworn statement of facts supporting your case.'
            },
            {
              title: 'Property Documents',
              description: 'Title deeds, Sale Deed, Lease Agreement, Encumbrance Certificate, Survey/Boundary Documents.'
            },
            {
              title: 'Notice/Communication',
              description: 'Any legal notices or communications exchanged between parties.'
            },
            {
              title: 'Evidence/Supporting Documents',
              description: 'Documents supporting your dispute claim.'
            },
            {
              title: 'Witness Statements',
              description: 'Statements from witnesses who can support your case.'
            },
            {
              title: 'Court Fees',
              description: 'Payment of required court fees for filing the case.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 10,
        heading: 'How Grover & Grover, Advocates Help in Property Cases',
        background: 'accent',
        content: {
          text: 'Grover & Grover, Advocates provide comprehensive legal services for property matters:\n\n• Legal advice and assessment of your property case\n• Case strategy and planning for optimal outcomes\n• Document review and preparation of legal documents\n• Representation in negotiations and litigation\n• Evidence gathering and legal research\n• Alternative Dispute Resolution (ADR) support\n• Client advocacy throughout the legal process\n\nOur experienced team ensures that your property rights are protected and disputes are resolved efficiently.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 11,
        heading: 'Popular Cases of Supreme Court and High Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Kelo v. City of New London (2005)',
              description: 'US Supreme Court case that dealt with eminent domain and the government\'s power to take private property for public use. The court ruled that the city\'s taking of private property to promote economic development qualified as a public use under the Fifth Amendment.'
            },
            {
              title: 'Olga Tellis v. Bombay Municipal Corporation (1985)',
              description: 'Supreme Court of India case involving the eviction of pavement dwellers in Mumbai. The court held that the right to livelihood is a fundamental right under the Indian Constitution and that the government can\'t deprive people of their homes without offering alternative arrangements.'
            },
            {
              title: 'Maneka Gandhi v. Union of India (1978)',
              description: 'Landmark case heard by the Supreme Court of India involving the interpretation of the right to life and personal liberty under Article 21 of the Indian Constitution. The court held that the right to travel abroad is encompassed in the right to personal liberty.'
            },
            {
              title: 'Bank Mellat v. HM Treasury (2013)',
              description: 'Supreme Court of the United Kingdom case that dealt with property rights in the context of financial sanctions. The court held that the government\'s actions were illegal as they had failed to provide a fair hearing and violated property rights.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 12,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'What is a property dispute case in India?',
              answer: 'A property dispute case in India is a legal dispute that arises between two or more parties over the ownership, possession, or use of a property.'
            },
            {
              question: 'What are the common types of property disputes in India?',
              answer: 'Common types of property disputes in India include disputes over ownership, title, boundaries, possession, and tenancy rights.'
            },
            {
              question: 'Who can file a property dispute case in India?',
              answer: 'Any person who has an interest in a property can file a property dispute case in India. This includes owners, tenants, and those with any other legal interest in the property.'
            },
            {
              question: 'What is the role of a Property Lawyer in Delhi in a property dispute case?',
              answer: 'A Property Lawyer in Delhi can help clients navigate the complex legal issues involved in a property dispute case. They can provide legal advice, represent clients in court, negotiate settlements, and help resolve disputes through alternative dispute resolution methods.'
            },
            {
              question: 'How can I find a good Property Lawyer in Delhi?',
              answer: 'You can find a good Property Lawyer in Delhi by asking for referrals from friends, family, or colleagues, searching online directories or legal directories, and checking the lawyer\'s credentials and experience.'
            },
            {
              question: 'How long does it take to resolve a property dispute case in India?',
              answer: 'The time it takes to resolve a property dispute case in India can vary depending on the complexity of the case, the number of parties involved, and the jurisdiction in which the case is filed. Some cases can be resolved quickly, while others can take years.'
            },
            {
              question: 'What are the legal remedies available in a property dispute case in India?',
              answer: 'Legal remedies available in a property dispute case in India can include injunctions, specific performance, damages, and partition.'
            },
            {
              question: 'Can a property dispute case be settled outside of court in India?',
              answer: 'Yes, a property dispute case can be settled outside of court in India through alternative dispute resolution methods such as mediation, arbitration, or negotiation.'
            },
            {
              question: 'Can a Property Lawyer help resolve a property dispute case without going to court?',
              answer: 'Yes, a Property Lawyer can help resolve a property dispute case without going to court by using alternative dispute resolution methods such as mediation, arbitration, or negotiation.'
            },
            {
              question: 'What are the legal requirements for filing a property dispute case in India?',
              answer: 'The legal requirements for filing a property dispute case in India include having a valid claim or interest in the property, providing evidence to support the claim, and filing the case within the appropriate time limits.'
            },
            {
              question: 'What evidence is needed to prove ownership in a property dispute case?',
              answer: 'Evidence that may be needed to prove ownership includes title deeds, sale agreements, tax receipts, and any other relevant documents that establish ownership.'
            },
            {
              question: 'Can a property dispute case be filed against a government agency in India?',
              answer: 'Yes, a property dispute case can be filed against a government agency in India if the agency has violated property rights or has improperly taken possession of the property.'
            },
            {
              question: 'What are the legal consequences of trespassing in a property dispute case?',
              answer: 'Trespassing is a criminal offense in India and can result in fines and imprisonment. In a property dispute case, trespassing can also be used as evidence to establish a claim to the property.'
            },
            {
              question: 'Can a property dispute case be resolved through mediation or arbitration?',
              answer: 'Yes, parties involved in a property dispute case can choose to resolve their matter through mediation or arbitration, which can be quicker and less expensive than going to court.'
            },
            {
              question: 'What are the consequences of losing a property dispute case in India?',
              answer: 'If a party loses a property dispute case in India, they may be ordered to pay compensation, hand over the disputed property, or cease certain activities on the property.'
            },
            {
              question: 'What is adverse possession in a property dispute case?',
              answer: 'Adverse possession is a legal principle in which a person who occupies and uses a property for a certain period of time without the owner\'s permission may claim ownership rights.'
            },
            {
              question: 'Can a property dispute case be filed in a different state from where the property is located?',
              answer: 'Yes, property dispute cases can be filed in any court that has jurisdiction over the property or parties involved in the dispute, regardless of where the property is located.'
            },
            {
              question: 'Can a property dispute case be resolved through a Lok Adalat in India?',
              answer: 'Yes, property dispute cases can be resolved through a Lok Adalat, which is a forum for alternative dispute resolution in India.'
            },
            {
              question: 'Can a property dispute case be filed against a family member in India?',
              answer: 'Yes, a property dispute case can be filed against a family member in India if there is a disagreement over ownership or use of the property. However, family disputes can be particularly sensitive and may require a different approach to resolution.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 13,
        heading: 'Need Expert Property Legal Services?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional property legal services in Delhi.',
          buttonText: 'Schedule Consultation',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    await ServiceSection.insertMany(sections);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, {
      seo: {
        title: 'Property Lawyer in Delhi – GAG Lawyers',
        description: 'Property Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
        keywords: 'Property Lawyer in Delhi Lawyer fees, Property Lawyer near me, Top 10 Property Lawyer in Delhi, best lawyer for property disputes in Delhi, Best property lawyer near me, Property Lawyer in Delhi high court, real estate Property Lawyer in Delhi, estate lawyers near me, property attorney near me, property dispute lawyers near me'
      }
    });

    console.log(`✅ Property Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importPropertyService();
