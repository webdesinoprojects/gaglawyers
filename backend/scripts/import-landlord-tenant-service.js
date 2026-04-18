require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'landlord-tenant-lawyer',
  name: 'Landlord Tenant Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Landlord Tenant Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for landlord-tenant disputes including evictions, rent disputes, lease agreements, security deposits, and property maintenance issues. Professional representation for both landlords and tenants.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Landlord-Tenant Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Landlord-tenant law is a specialized set of laws that govern the relationship between landlords and tenants. It covers topics such as how to properly draft a lease agreement, how to collect rent, and how to handle evictions. This area of law protects landlords from unfair tenant practices and tenants from unfair landlord practices.\n\nA landlord is a person or entity that owns property used for leasing to tenants. In most jurisdictions, a tenant is either an individual owner of property (in which case they are called a tenant-occupier) or an entity that leases property from the landlord. Tenants commonly rent out residential and commercial spaces, but other types of landlords may exist as well, such as hotels, mining companies, and farms.\n\nLandlord-tenant law usually covers the following topics: the relationship between the parties, occupying obligations, rent, security deposit refunds, repairs, and day-to-day interaction with the landlord. It is a term used to refer to people who own property, which they rent out, or to other entities with privileges over the property. Landlords typically provide these housing units in return for occupancy rents and security deposits from tenants.'
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Eviction Proceedings',
            description: 'If a tenant is not paying rent, the landlord could be charged for eviction proceedings and damages. Eviction without court approval can lead to substantial fines.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rental Contract Disputes',
            description: 'If a dispute arises between two landlords over rental contracts, both parties could be charged. Unauthorized demands from a landlord for repairs may result in fines.'
          },
          {
            icon: 'CheckCircle',
            title: 'Illegal Eviction Penalties',
            description: 'Penalties for illegal eviction can include fines and imprisonment for the landlord, as well as damages awarded to the tenant.'
          },
          {
            icon: 'CheckCircle',
            title: 'Civil Suits',
            description: 'The landlord may file civil suits against tenants violating rental agreements, including claims for damages or rent arrears.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Complaints',
            description: 'Criminal complaints may involve trespass, intimidation, or wrongful confinement. Punishments may include imprisonment, fines, or both.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Damage Compensation',
            description: 'The landlord may seek compensation for property damage caused by the tenant through legal proceedings.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Lease Agreement',
            description: 'A lease agreement legally binds the landlord (lessor) and tenant (lessee), outlining rent, duration, security deposits, maintenance responsibilities, and restrictions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Written Lease Agreement',
            description: 'Clear clauses on rent, duration, security deposits, maintenance, and property use help avoid disputes and provide legal protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rent Control Laws',
            description: 'Regulate rental amounts and ensure fair returns for landlords while protecting tenants from excessive rent increases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Eviction Rights',
            description: 'Landlords may evict tenants violating the lease or failing to pay rent, but must follow proper legal procedures and obtain court approval.'
          },
          {
            icon: 'CheckCircle',
            title: 'Deposit Refund',
            description: 'Tenants can claim refundable deposits if the landlord fails to return them after the lease ends, with legal recourse available.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensation Claims',
            description: 'Tenants may claim monetary or legal compensation if landlords fail their duties, such as property repairs or deposit returns.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Landlord-Tenant Lawyers',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice',
            description: 'Provide legal advice for both landlords and tenants on their rights, obligations, and available remedies under the law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Drafting and Reviewing Agreements',
            description: 'Draft and review lease agreements and rental contracts to ensure they are legally sound and protect clients\' interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court during disputes, eviction proceedings, and other legal matters related to landlord-tenant relationships.'
          },
          {
            icon: 'CheckCircle',
            title: 'Tenant Protection',
            description: 'Protect tenants from unfair practices, illegal evictions, and violations of their rights under rental agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Landlord Protection',
            description: 'Protect landlords from legal disputes, non-payment of rent, property damage, and tenant violations of lease terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiation',
            description: 'Negotiate rental agreements and dispute resolutions to benefit both parties and avoid lengthy litigation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Regulatory Compliance',
            description: 'Ensure landlords and tenants understand and follow regulations, avoiding unnecessary litigation and legal complications.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Lease Agreement',
            description: 'Valid lease agreement between landlord and tenant outlining all terms and conditions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Notice of Termination',
            description: 'Required for eviction, specifying reasons for termination and providing proper notice period.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rent Receipts',
            description: 'Proof of timely rent payments or evidence of non-payment, depending on the nature of the dispute.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Ownership',
            description: 'Landlord must prove property ownership through title deeds and other ownership documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Tax Returns',
            description: 'Copies of property tax returns to show tax compliance and ownership.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Documents',
            description: 'Title deed, building plans, and other relevant property documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Documents',
            description: 'State-specific rules and regulations regarding landlord-tenant law that apply to the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Breach',
            description: 'Documentation of violations by the tenant or landlord, including photographs, correspondence, and witness statements.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Rental Agreement Drafting',
            description: 'Draft comprehensive rental agreements and lease contracts that protect clients\' interests and comply with legal requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rental Terms Negotiation',
            description: 'Negotiate rental terms between landlords and tenants to reach mutually beneficial agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Resolve disputes between landlords and tenants through negotiation, mediation, or litigation as needed.'
          },
          {
            icon: 'CheckCircle',
            title: 'Eviction Notice Filing',
            description: 'Assist landlords in filing eviction notices and following proper legal procedures for tenant removal.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights and Obligations Guidance',
            description: 'Provide guidance on legal rights and obligations for both landlords and tenants under applicable laws.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court proceedings for landlord-tenant disputes, evictions, and related matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Commercial and Residential Expertise',
            description: 'Handle both commercial and residential property disputes with years of experience and expertise.'
          },
          {
            icon: 'CheckCircle',
            title: 'Strategic Legal Advice',
            description: 'Provide strategic guidance on rent control, eviction issues, and property management matters.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Phool Kumari v. Kalu Ram (AIR 1980 SC 1717)',
            description: 'Dealt with a tenant\'s right to remain in a house after lease expiration. The court held that tenancy can be extended for a reasonable period as long as the tenant is not in arrears of rent.'
          },
          {
            icon: 'CheckCircle',
            title: 'Mallikarjun v. Bhimrao (AIR 1988 SC 1464)',
            description: 'Addressed whether a tenant can be evicted for non-payment of rent. The court held that a landlord cannot evict unless willing to accept the tenant\'s reasonable offer to pay arrears.'
          },
          {
            icon: 'CheckCircle',
            title: 'N.K. Sharma v. Rajesh Kumar (AIR 1991 SC 1468)',
            description: 'Dealt with eviction on grounds of non-use of premises. The court held that a landlord cannot evict unless there are reasonable grounds to believe the tenant is misusing or not taking proper care of the premises.'
          },
          {
            icon: 'CheckCircle',
            title: 'K.C. Srinivasan v. M.V. Rajesh (AIR 1996 SC 2126)',
            description: 'Addressed eviction for subletting without consent. The court held that a landlord can evict for subletting without consent, provided the tenant failed to comply with agreement terms.'
          },
          {
            icon: 'CheckCircle',
            title: 'M/s. Mahavir Prasad v. M/s. Kishorelal (AIR 2003 SC 1031)',
            description: 'Dealt with eviction for illegal modifications. The court held that a landlord can evict for illegal modifications without consent, provided the tenant failed to rectify the breach.'
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
            question: 'What is a landlord-tenant dispute?',
            answer: 'A landlord-tenant dispute is a legal disagreement between a landlord and a tenant over issues such as rent, security deposits, lease terms, eviction, or property maintenance.'
          },
          {
            question: 'What are common types of landlord-tenant disputes in India?',
            answer: 'Common types include failure to pay rent, illegal eviction, breach of lease agreements, damage to rental property, and security deposit disputes.'
          },
          {
            question: 'Can a landlord evict a tenant without a court order in India?',
            answer: 'No, a landlord cannot evict a tenant without a court order in India. The eviction process must be carried out in accordance with applicable laws and regulations.'
          },
          {
            question: 'What is the role of a landlord-tenant lawyer?',
            answer: 'A landlord-tenant lawyer provides legal representation and advice to landlords and tenants in disputes related to rental agreements, leases, eviction, and property maintenance.'
          },
          {
            question: 'Can a tenant break a lease agreement in India?',
            answer: 'Yes, a tenant can break a lease agreement in India, but there may be consequences such as losing the security deposit or being sued for breach of contract.'
          },
          {
            question: 'How can a landlord-tenant lawyer help resolve disputes?',
            answer: 'A lawyer can help by negotiating with the other party, filing legal claims, representing clients in court, and providing guidance on legal rights and obligations.'
          },
          {
            question: 'Can a tenant sue a landlord in India?',
            answer: 'Yes, a tenant can sue a landlord for various reasons such as breach of contract, wrongful eviction, or failure to maintain the rental property.'
          },
          {
            question: 'Can a landlord increase rent during a lease agreement?',
            answer: 'A landlord can only increase rent during a lease agreement if there is a provision in the lease allowing for rent increases or if both parties mutually agree to the increase.'
          },
          {
            question: 'What is the procedure for filing a landlord-tenant dispute?',
            answer: 'The procedure typically involves sending a notice to the other party, filing a case in the appropriate court, and attending court hearings.'
          },
          {
            question: 'What are the penalties for illegal eviction?',
            answer: 'Penalties can include fines and imprisonment for the landlord, as well as damages awarded to the tenant.'
          },
          {
            question: 'What is the legal notice period for eviction in India?',
            answer: 'The legal notice period for eviction can vary depending on the state and the specific circumstances of the case.'
          },
          {
            question: 'How can a lawyer help with lease agreements?',
            answer: 'A lawyer can help by reviewing and drafting lease agreements, negotiating lease terms, and providing guidance on legal rights and obligations under the lease.'
          },
          {
            question: 'What are the rights of a tenant in India?',
            answer: 'Tenants have rights such as the right to peaceful enjoyment of the rental property, the right to timely repairs and maintenance, and the right to fair treatment by the landlord.'
          },
          {
            question: 'Can a tenant terminate a lease agreement early?',
            answer: 'Yes, a tenant can terminate a lease agreement early, but there may be consequences such as losing the security deposit or being sued for breach of contract.'
          },
          {
            question: 'Can a tenant withhold rent in India?',
            answer: 'A tenant can only withhold rent if there is a legal justification, such as the landlord failing to maintain the rental property or breaching the lease agreement.'
          },
          {
            question: 'Can a landlord ask for a security deposit?',
            answer: 'Yes, a landlord can ask for a security deposit, but there are legal limits on the amount that can be requested and how it can be used.'
          },
          {
            question: 'Can a tenant sublet a rental property?',
            answer: 'A tenant can sublet a rental property only if the lease agreement allows for it or if the landlord gives written consent.'
          },
          {
            question: 'Can a landlord enter a rental property without consent?',
            answer: 'A landlord cannot enter a rental property without the tenant\'s consent except in emergency situations or as specified in the lease agreement.'
          },
          {
            question: 'Can a tenant claim compensation for property damage?',
            answer: 'Yes, a tenant can claim compensation for damage to personal property if the damage was caused by the landlord\'s negligence or failure to maintain the property.'
          },
          {
            question: 'What legal remedies are available for tenants?',
            answer: 'Legal remedies include filing a case in court for breach of contract, eviction, or damages, as well as seeking relief under various laws such as the Rent Control Act and Consumer Protection Act.'
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
        body: 'Contact our expert landlord-tenant lawyers today for professional assistance with rental disputes, evictions, lease agreements, and all property matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Landlord tenant Lawyer in Delhi – GAG Lawyers',
    metaDescription: 'Landlord tenant Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
