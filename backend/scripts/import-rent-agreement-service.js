require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'rent-agreement',
  name: 'Rent Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Rent Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Comprehensive Rental Documentation',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Rent Agreements',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A rent agreement is something more than just a paper document; it\'s a legal document that forms the basic tenets of a rental agreement. Whether you are a person looking to let a space from your house or are a person who needs a place to reside or a shop for business, having a lawyer for rent agreement by your side would make all the difference.\n\nOur skills assure you a comprehensive, just deal, entirely compliant with all relevant laws and regulations. Your dedicated lawyer for rent agreement will do more than just fill out a template. The agreement will be differently designed in terms of your rental situation by negotiating terms or outlining responsibilities, every rental relationship must be well defined and legally protected according to our lawyers for a rent agreement.'
      }
    },
    {
      type: 'benefits',
      heading: 'Understanding the Costs and Fees',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Advocate Fees for Rent Agreement',
            description: 'Our expert advocate fees for rent agreements are competitively priced and transparent. This will depend upon the complexity of the agreement and any amount of customization required. We provide you with a clear fee structure prior to the job beginning so that there are no surprises along the way.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lawyer Fees for Rent Agreement',
            description: 'Our lawyer fees for rent agreement cover the whole drafting, reviewing, and finalizing of your rental document including all consultancy services, drafting, and revisions. We offer value for money by considering the important role that the properly drafted agreement plays in the protection of your interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rent Agreement Stamp Duty',
            description: 'Varying from state to state, the charges depend mainly on the rental income and terms of the agreement. As your lawyer for rent agreements, we guide you through these costs, ensuring compliance with local regulations while optimizing for cost-effectiveness.'
          },
          {
            icon: 'CheckCircle',
            title: 'Registration Fees',
            description: 'Being a rental agreement attorney, we address all such costs incurred in the process and ensure that such costs do not violate your local regulatory environment.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Rent Agreements We Handle',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Residential Rent Agreements',
            description: 'Whether you rent a house, an apartment, or just a room, our lawyer for rent agreement assures that your tenancy with the residential lease addresses all facets, from payment terms of rent to maintenance responsibilities.'
          },
          {
            icon: 'CheckCircle',
            title: 'Commercial Lease Agreements',
            description: 'For business property, we offer further specialized services as a lawyer for lease agreements. Commercial leases are usually more comprehensive terms compared to others; therefore, our expertise will ensure that your business interests are maintained.'
          },
          {
            icon: 'CheckCircle',
            title: 'Short-term Rental Contracts',
            description: 'We also offer short-term and holiday letting agreements that are designed for the precise requirement of such deals, ensuring flexibility and legal protection.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Online and Convenient Services',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Rent Agreement Online',
            description: 'We offer all our services on rent agreement online, so for those people who prefer to handle things digitally. Thus, your lawyer for rent agreement can now help you out from a distance, and the same level of legal expertise and personal service will be maintained with remote assistance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lease Agreement Online',
            description: 'We also offer our services through lease agreement online on commercial property. We combine the advantage of a digital service with the benefit of our legal experience.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rent Agreement Near Me',
            description: 'For clients who require face-to-face consultation, our service "lawyer for rent agreement near me" connects you to lawyers near you who are familiar with the intricacies of the market as well as regulations in your area.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Notarized and Registered Agreements',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Notarised Rent Agreement',
            description: 'A notarised rent agreement is provided, meaning it carries an extra level of authenticity to your document. This can be particularly important on high-value rentals or when additional legal weight is desired.'
          },
          {
            icon: 'CheckCircle',
            title: 'Registered Rent Agreement',
            description: 'In the case of long-term tenancy and also if states have made it mandatory to get a registered rent agreement, we do the whole paperwork needed to create a rent agreement. All the formalities pertaining to getting government registration wherein the document is given an official status are done in this process.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Supreme Court Cases Influencing Rent Agreements',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Samir Mukherjee vs. Damodar Valley Corporation (2021)',
            description: 'It defined the concept of \'rent\' in a contract of lease, especially in the case of lease of commercial properties. The decision of the Supreme Court would have huge implication on the computation of rental values and taxation changes the way we draft our commercial leases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Raj Rani vs. Oriental Insurance Company Ltd. (2022)',
            description: 'This case dealt with issues in the matter of tenants in case of damage to property. The decree of the Court decreed that rent agreement should have a clear responsibility and liability. A principle we take utmost care of while drafting.'
          },
          {
            icon: 'CheckCircle',
            title: 'Vinod Kumar Gupta v. Bharti Televentures Limited (2020)',
            description: 'It was a landmark case concerning the issue regarding the validity of unregistered lease deeds. The High Court held that in long-term leases, proper registration was required, and it became our guideline while dealing with the registered rent agreements.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Secure Your Rental Arrangement with Expert Legal Guidance',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Whether you are a landlord who looks to protect your investment property, or a tenant seeking fair terms, GAG Lawyers - Grover and Grover Advocates and Solicitors is your go-to partner for all of your rent agreement needs. As your committed lawyer for rent agreement, we strive to ensure that your rental agreements are well-composed, comprehensive, and shaped based on your specific requirements.\n\nFrom simple residential tenancies to the more complicated commercial agreements, we cover all aspects of renting law. Services such as online rent agreement options and notarised rent agreement support are made available to you for your convenience with no compromise on legal robustness.\n\nLet our team of expertly skilled lawyers for rent agreement help you find your way out of the complexities involved in rental law and secure your interests with a strong, legally sound agreement.'
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
            question: 'What is the 11 month rental agreement stamp paper value?',
            answer: 'The stamp paper value for an 11-month rental agreement varies by state in India. Generally, it is calculated as a percentage of the annual rent (typically 0.25% to 1% of annual rent depending on the state). For example, in Delhi, it is usually 2% of the average annual rent, while in Maharashtra, it is typically 0.25% of the total rent for the period. As your lawyer for rent agreement, we will advise you on the exact stamp duty amount based on your location, rental terms, and state-specific regulations. The 11-month period is commonly chosen to avoid the requirement of mandatory registration under the Registration Act, which applies to leases exceeding 11 months.'
          },
          {
            question: 'What are rent agreement documents required?',
            answer: 'The documents required for a rent agreement typically include: identity proof of landlord and tenant (Aadhar card, PAN card, passport), address proof of both parties, passport-size photographs of landlord and tenant, property ownership documents (sale deed, property tax receipts), NOC from society or housing association if applicable, previous rent agreement (if property was rented before), and details of witnesses (2 witnesses with ID proof). For registered agreements, additional documents may be required. As your lawyer for rent agreement, we guide you through the complete documentation process and ensure all necessary papers are in order for a legally valid agreement.'
          },
          {
            question: 'What is the standard rent agreement format?',
            answer: 'A standard rent agreement format includes: names and addresses of landlord and tenant, property description and address, rent amount and payment terms (monthly/quarterly), security deposit amount, agreement duration (start and end date), maintenance and utility payment responsibilities, terms for rent increase, notice period for termination, restrictions on property use, repair and maintenance obligations, subletting clause, lock-in period if any, dispute resolution mechanism, and signatures of landlord, tenant, and witnesses. However, each agreement should be customized based on specific requirements. As your lawyer for rent agreement, we ensure the format is comprehensive, legally compliant, and tailored to your specific rental situation, whether residential or commercial.'
          },
          {
            question: 'How much are the rent agreement charges?',
            answer: 'Rent agreement charges typically include: lawyer/advocate fees for drafting (Rs. 500 to Rs. 3,000 depending on complexity), stamp duty (varies by state, usually 0.25% to 2% of annual rent), registration charges if applicable (1% of annual rent in most states), notary charges if required (Rs. 100 to Rs. 500), and any additional consultation fees. The total cost can range from Rs. 1,000 to Rs. 10,000 or more depending on the property value, location, and complexity of terms. At GAG Lawyers, we provide transparent pricing with no hidden costs. Our lawyer fees for rent agreement are competitive and include comprehensive services from drafting to finalization, ensuring value for money and legal protection.'
          },
          {
            question: 'Is there a rent agreement court fee?',
            answer: 'Court fees for rent agreements are not typically applicable unless there is a dispute that requires court intervention. However, if you need to file a case related to rent agreement disputes (such as eviction, rent recovery, or breach of contract), court fees will apply based on the claim amount and jurisdiction. For registration of rent agreements, registration fees (not court fees) apply, which is usually 1% of the annual rent. If the agreement needs to be presented as evidence in court, properly stamped and registered agreements are more readily admissible. As your lawyer for rent agreement, we ensure your agreement is properly executed to minimize the likelihood of disputes and potential court involvement.'
          },
          {
            question: 'Is registration of rent agreement mandatory?',
            answer: 'Registration of rent agreement is mandatory in India for lease agreements exceeding 11 months as per Section 17 of the Registration Act, 1908. For agreements of 11 months or less, registration is optional but recommended for legal protection. Some states have made registration mandatory for all rental agreements regardless of duration. Benefits of registration include: legal validity and admissibility in court, protection against fraud, clear evidence of terms, easier dispute resolution, and compliance with law. Unregistered long-term leases (over 11 months) are not legally enforceable. As your lawyer for rent agreement, we advise on registration requirements based on your specific situation and handle the entire registration process.'
          },
          {
            question: 'What is the difference between notarized and registered rent agreement?',
            answer: 'A notarized rent agreement is one that has been verified by a notary public who confirms the identity of signatories and witnesses the signing. It provides authenticity but is not registered with the government. A registered rent agreement is one that has been officially recorded with the Sub-Registrar\'s office after payment of registration fees and stamp duty. Key differences: Registration provides stronger legal validity and is mandatory for leases over 11 months, notarization is quicker and less expensive but offers limited legal protection, registered agreements are admissible as primary evidence in court, notarized agreements may require additional proof. For maximum legal protection, especially for long-term or high-value rentals, registration is recommended. Our lawyers can help you choose the appropriate option.'
          },
          {
            question: 'Can a rent agreement be terminated before the agreed period?',
            answer: 'Yes, a rent agreement can be terminated before the agreed period under certain conditions: if there is a termination clause in the agreement specifying notice period and conditions, by mutual consent of both landlord and tenant, if either party breaches the agreement terms, for reasons specified in the agreement (non-payment of rent, property damage, illegal activities), or as per applicable rent control laws. The agreement should clearly specify: notice period required (typically 1-3 months), lock-in period during which termination is not allowed, consequences of early termination (forfeiture of security deposit, penalty), and procedure for termination. As your lawyer for rent agreement, we ensure these clauses are clearly defined to protect both parties\' interests and minimize disputes.'
          },
          {
            question: 'What happens to the security deposit in a rent agreement?',
            answer: 'The security deposit in a rent agreement serves as protection for the landlord against damages or unpaid rent. Key points: the amount is typically 2-10 months\' rent depending on the property and location, it should be clearly mentioned in the agreement, the deposit is refundable at the end of the tenancy, deductions can be made for: unpaid rent, property damages beyond normal wear and tear, unpaid utility bills, or breach of agreement terms. The landlord must return the deposit within a specified period (usually 30-60 days) after tenancy ends, after deducting legitimate expenses with proper documentation. The agreement should specify: exact deposit amount, conditions for deductions, timeline for refund, and interest on deposit if applicable. Our lawyers ensure these terms are clearly defined and fair to both parties.'
          },
          {
            question: 'Is a rent agreement valid without witnesses?',
            answer: 'While a rent agreement can be legally valid without witnesses, having witnesses is strongly recommended for several reasons: witnesses provide evidence of the agreement being signed voluntarily, they can testify in case of disputes, most standard formats include witness signatures, registration authorities typically require witness signatures for registered agreements, and witnesses add credibility and authenticity to the document. Typically, two witnesses are required who should be: adults (18 years or older), not direct parties to the agreement, willing to testify if needed, and have valid identification. For notarized or registered agreements, witnesses are mandatory. As your lawyer for rent agreement, we ensure proper execution with witnesses to maximize legal validity and enforceability.'
          },
          {
            question: 'Can rent be increased during the agreement period?',
            answer: 'Rent can be increased during the agreement period only if: there is a specific rent escalation clause in the agreement, both parties mutually agree to the increase in writing, or it is permitted under applicable rent control laws. The rent agreement should clearly specify: whether rent increases are allowed, the percentage or amount of increase, the frequency of increase (annual, biennial), the notice period for rent increase, and the mechanism for calculating the increase. Without such a clause, the landlord cannot unilaterally increase rent during the agreement period. For agreements spanning multiple years, it is common to include an annual escalation clause (typically 5-10% per year). Our lawyers ensure rent escalation terms are clearly defined and fair to both parties.'
          },
          {
            question: 'What is a lock-in period in a rent agreement?',
            answer: 'A lock-in period is a specified duration at the beginning of the tenancy during which neither the landlord nor the tenant can terminate the agreement, except in case of serious breach. Key aspects: typical lock-in periods range from 6 months to 2 years, it provides stability and security to both parties, during the lock-in period, the tenant cannot vacate without penalty, the landlord cannot ask the tenant to leave, and rent cannot be increased (unless specified). After the lock-in period, either party can terminate by giving proper notice as per the agreement. The lock-in period should be clearly mentioned in the agreement along with: consequences of breaking the lock-in (typically forfeiture of security deposit or penalty), exceptions to the lock-in period, and notice period after lock-in expires. Our lawyers help negotiate fair lock-in terms.'
          },
          {
            question: 'Do I need a lawyer for a simple rent agreement?',
            answer: 'While it is possible to create a rent agreement without a lawyer using templates, hiring a lawyer for rent agreement is highly recommended because: rental laws vary by state and locality, a lawyer ensures compliance with all applicable laws, customization is needed for specific situations, a lawyer can negotiate favorable terms, proper legal language prevents ambiguities and disputes, a lawyer identifies potential issues and risks, professional drafting ensures enforceability in court, and guidance on stamp duty and registration requirements is provided. The cost of hiring a lawyer is minimal compared to potential losses from disputes, eviction issues, or unenforceable agreements. Even for "simple" agreements, professional legal assistance provides peace of mind and protection. At GAG Lawyers, we offer affordable rent agreement services with comprehensive legal protection.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Rent Agreement Services?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional rent agreement drafting and legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Rent Agreement Lawyer in Delhi - Lease Agreement Drafting | GAG Lawyers',
    metaDescription: 'Expert rent agreement and lease agreement services in Delhi. Professional legal assistance for residential and commercial rental documentation.'
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
