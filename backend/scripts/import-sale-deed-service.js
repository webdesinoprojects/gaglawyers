require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'sale-deed',
  name: 'Sale Deed',
  sections: [
    {
      type: 'hero',
      heading: 'Sale Deed',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Property Sale Deed Registration',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'The Crucial Role of Sale Deed Registration',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'The complex process of dealing in properties requires legal expertise, especially with regard to the deed of sale registration. GAG Lawyers - Grover and Grover Advocates and Solicitors provide quality service in matters related to property and more precisely in sale deed registration. Our solicitors for registering the sale deeds ensure hassle-free transfer of your property in a lawfully compliant and interest-protective manner at each step.\n\nAn impeccably composed sale deed is highly crucial in the transfer of ownership of immovable property since it becomes one of the proofs as unshakeable as is possible for the transaction between the buyer and the seller. We as your dedicated lawyer for register sale deed, would like to address the critical importance of proper registration to safeguard your property rights and avoid legal complications later on.'
      }
    },
    {
      type: 'overview',
      heading: 'Why Professional Assistance Matters',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Navigating the intricacies of property law can be daunting for individuals without legal expertise. Our team of experienced lawyers for register sale deed brings years of knowledge and practical experience to ensure your property transaction is executed flawlessly.\n\nWe handle all aspects of the registration process, from document preparation to final registration, ensuring compliance with all legal requirements. Our comprehensive approach protects your interests and provides peace of mind throughout the property transfer process.'
      }
    },
    {
      type: 'benefits',
      heading: 'Understanding Registry Charges and Fees',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Registry Charges',
            description: 'The charges in respect of the registry depend upon the value of property and its location. Normally, such charges are calculated based on the percentage of the market value of such property or the consideration for its sale, whichever is higher. We calculate with utmost accuracy based on the latest regulations as your lawyer for register sale deed.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lawyer Fees for Register Sale Deed',
            description: 'Our lawyer fees for register sale deed are competitive and transparent. We give you detailed breakdowns of the services and costs associated. Our comprehensive legal services include document preparation, consultation, and the complete registration process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Stamp Duty',
            description: 'Stamp duty is a significant addition to the registration cost. Rates vary based on the type of property, location, and value. Our experts update you with all new stamp duty regulations so that you avoid overpayment and receive the proper calculation.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Leveraging Technology: Online Property Registration Check',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Verification of Registration Information',
            description: 'We verify all registration details to ensure accuracy and completeness of your property records.'
          },
          {
            icon: 'CheckCircle',
            title: 'Checking Encumbrances',
            description: 'We check for any encumbrances on the property to ensure clear title and identify any potential legal issues.'
          },
          {
            icon: 'CheckCircle',
            title: 'Confirming Recorded Information',
            description: 'We confirm the correctness of all information recorded in official property records, providing an additional layer of protection and security.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Specialized Services',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Relinquishment Deed',
            description: 'We handle relinquishment deeds wherein it is about a surrender of the rights of a property. We take care of the relinquishment deed registration charge and update you in regard to the process, ensuring you understand how relinquishment deed charges differ from standard sale deed registration fees.'
          },
          {
            icon: 'CheckCircle',
            title: 'Power of Attorney to Registry',
            description: 'From power of attorney to registry, our service encompasses a myriad of aspects in property law. We provide guidance on how to convert power of attorney to registry in Delhi, ensuring that all legal requirements are met and the conversion is done effectively and smoothly.'
          },
          {
            icon: 'CheckCircle',
            title: 'Gift Deed and Blood Relations',
            description: 'We specialize in stamp duty on gift deed in Delhi in blood relations, ensuring you benefit from exemptions or reduced rates where applicable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Relinquishment in Blood Relations',
            description: 'We handle stamp duty on relinquishment deed in blood relation, ensuring proper calculation and compliance with special provisions for family transactions.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases in Property Law',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Suraj Lamp & Industries Pvt. Ltd. vs. State of Haryana (2012)',
            description: 'This important judgment considered whether GPA, sale agreement, and will transactions were valid. The Supreme Court held that such transactions do not convey title and do not amount to transfer of immovable property. This judgment underlines the principle of proper sale deed registration. As your competent lawyer for register sale deed, we ensure that each transfer of property takes place through a registered sale deed.'
          },
          {
            icon: 'CheckCircle',
            title: 'DLF Limited vs. Manmohan Lowe (2014)',
            description: 'This case dealt with stamp duty evasion through property undervaluation. The Supreme Court ruled that market value for calculation of stamp duty should be taken, instead of declared sale consideration. This has a great impact on property registrations and registry charges calculations. Our team carefully analyzes property values to accurately calculate stamp duty.'
          },
          {
            icon: 'CheckCircle',
            title: 'Vidya Drolia vs. Durga Trading Corporation (2020)',
            description: 'The Supreme Court held that disputes relating to rights in personam in immovable property are arbitrable, while disputes relating to rights in rem are not. This difference makes a huge difference in property disputes. As your lawyer for register sale deed, we guide you to apply the most proper mechanisms of resolving any dispute that may arise.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Secure Your Property Rights with Expert Legal Guidance',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Whatever be the size of your portfolio or whether you are selling a first time house, GAG Lawyers - Grover and Grover Advocates and Solicitors will guide you on how to legally register a sale deed. We offer competent lawyer services for the purpose of registering a sale deed in all processes.\n\nOur firm\'s position among the top property lawyers in the country showcases our ability to handle complex property matters with expertise and success. Our services include everything, from handling fees for registry to the proper online property registration checks. From relinquishment deed charges to complexities and intricacies of property sale deed registration, we ensure that your interests are protected at every step of the process.\n\nContact us today to book a consultation and feel the difference skilled expert legal counsel can make in the process of registering your property. Our team of lawyers will guide you through this in detail and help manage the intricacies of property law, securing your treasured assets.'
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
            question: 'How to convert power of attorney to registry in Delhi?',
            answer: 'The process of converting power of attorney to registry in Delhi involves several steps: revoke the existing power of attorney through a formal revocation deed, prepare a new sale deed in the name of the actual buyer (not the power of attorney holder), conduct property valuation to determine stamp duty, pay applicable stamp duty based on current market value or consideration (whichever is higher), pay registration fees (typically 1% of property value in Delhi), submit all required documents including identity proofs, address proofs, and property documents, appear before the sub-registrar with all parties and witnesses, and complete biometric verification and registration formalities. As your lawyer for register sale deed, we guide you through each step meticulously, ensuring all legal requirements are met and the conversion is completed smoothly and legally.'
          },
          {
            question: 'What is the stamp duty on gift deed in Delhi in blood relation?',
            answer: 'In Delhi, stamp duty on gift deed varies based on the relationship between the donor and donee. For blood relations (parents, children, siblings, spouse), the stamp duty is significantly reduced: for gifts between blood relatives, stamp duty is typically 2% of the property value (compared to 6% for regular transfers), for gifts between spouses, stamp duty is Rs. 1,000 (nominal), and for gifts to children or parents, stamp duty is 2% of property value. Additionally, registration charges of 1% apply. To avail of these concessional rates, you must provide proof of relationship such as birth certificates, marriage certificates, or family records. Our experts ensure you benefit from all applicable exemptions and reduced rates, properly documenting the relationship to avoid any disputes or additional charges.'
          },
          {
            question: 'How much is the stamp duty on relinquishment deed in blood relation?',
            answer: 'Stamp duty on relinquishment deed in blood relation in Delhi is concessional compared to regular property transfers. The rates are: for relinquishment among blood relatives (siblings, parents, children), stamp duty is typically 2% of the relinquished share\'s value, for relinquishment between spouses, stamp duty is Rs. 1,000 (nominal), and registration charges of 1% apply in addition to stamp duty. The stamp duty is calculated on the market value of the share being relinquished, not the entire property value. For example, if a property worth Rs. 1 crore is jointly owned by 4 siblings and one relinquishes their 25% share, stamp duty is calculated on Rs. 25 lakhs. Our team ensures accurate calculation of the relinquished share value and proper documentation of the blood relationship to avail concessional rates.'
          },
          {
            question: 'What is a sale deed and why is it important?',
            answer: 'A sale deed is a legal document that transfers ownership of immovable property from the seller to the buyer. It is the primary and most important document in property transactions. Importance of sale deed: it is the conclusive proof of ownership transfer, it is mandatory for registration under the Registration Act, 1908, it protects the buyer\'s legal rights to the property, it is required for mutation of property records, it is necessary for obtaining loans against the property, it serves as evidence in case of disputes, and it is required for claiming tax benefits. A properly executed and registered sale deed is essential for establishing clear title to property. Without a registered sale deed, the transfer of ownership is not legally valid, and the buyer cannot claim ownership rights. Our lawyers ensure your sale deed is properly drafted, executed, and registered to provide maximum legal protection.'
          },
          {
            question: 'What documents are required for sale deed registration?',
            answer: 'Documents required for sale deed registration include: from the seller - original sale deed or title deed proving ownership, encumbrance certificate (EC) for last 13-30 years, property tax receipts, NOC from society/housing board if applicable, identity proof (Aadhar, PAN, passport), address proof, and photographs. From the buyer - identity proof (Aadhar, PAN, passport), address proof, PAN card (mandatory for transactions above Rs. 5 lakhs), and photographs. Common documents - sale agreement, payment receipts, property valuation certificate, and witness documents (2 witnesses with ID proof). Additional documents may be required based on property type and location. Our lawyers help you gather, verify, and organize all required documents to ensure smooth registration without delays or rejections.'
          },
          {
            question: 'How long does sale deed registration take?',
            answer: 'The sale deed registration process typically takes 1-7 days depending on various factors: document preparation (1-3 days if all documents are ready), appointment booking at sub-registrar office (same day to 3 days depending on availability), actual registration process (2-4 hours on the appointment day), and receipt of registered deed (same day or within 7 days). The timeline can be longer if: documents are incomplete or have discrepancies, property has legal issues or pending disputes, stamp duty calculation requires clarification, or the sub-registrar office has a backlog. With our assistance as your lawyer for register sale deed, we expedite the process by ensuring all documents are in perfect order before submission, booking appointments promptly, and handling any issues that arise during registration. We aim to complete the entire process as quickly as possible while ensuring legal compliance.'
          },
          {
            question: 'What is the difference between sale deed and sale agreement?',
            answer: 'Sale deed and sale agreement are two different documents with distinct purposes: Sale Agreement is a preliminary contract between buyer and seller outlining the terms and conditions of the future sale. It creates a contractual obligation to sell/buy but does not transfer ownership. It is executed before the actual sale and typically involves payment of advance/token money. Sale Deed is the final document that actually transfers ownership from seller to buyer. It is executed after full payment and must be registered to be legally valid. It is the conclusive proof of ownership transfer. Key differences: sale agreement is executory (promises future action), sale deed is executed (completes the action); sale agreement does not transfer ownership, sale deed transfers ownership; sale agreement registration is optional, sale deed registration is mandatory; and sale agreement can be cancelled, sale deed cannot be easily cancelled. Both documents are important in property transactions, serving different purposes at different stages.'
          },
          {
            question: 'Can a sale deed be cancelled after registration?',
            answer: 'Yes, a registered sale deed can be cancelled, but only under specific circumstances and through proper legal procedures: by mutual consent of both parties through a cancellation deed, by court order if the sale deed was obtained through fraud, coercion, undue influence, or misrepresentation, if the sale deed is void ab initio (invalid from the beginning) due to legal defects, or if conditions mentioned in the sale deed are not fulfilled. The cancellation process involves: filing a suit for cancellation in civil court, providing evidence of grounds for cancellation, obtaining a court decree for cancellation, executing a cancellation deed, and registering the cancellation deed. Cancellation is not easy and requires strong legal grounds. Simply changing your mind or finding a better deal is not sufficient ground for cancellation. Our lawyers can advise you on the viability of cancellation in your specific case and represent you in court if necessary.'
          },
          {
            question: 'What are the consequences of not registering a sale deed?',
            answer: 'Not registering a sale deed has serious legal consequences: the transfer of ownership is not legally valid, the buyer cannot claim legal ownership of the property, the sale deed is not admissible as evidence in court, the buyer cannot sell or mortgage the property, property records (mutation) cannot be updated in the buyer\'s name, the buyer cannot claim tax benefits on the property, the seller can sell the property to another person, and disputes over ownership are likely to arise. Under Section 17 of the Registration Act, 1908, registration of sale deed is mandatory for immovable property. An unregistered sale deed does not confer any title or ownership rights to the buyer. Even if full payment is made, without registration, the buyer has no legal claim to the property. Our lawyers emphasize the critical importance of timely registration and ensure your sale deed is registered properly to avoid these serious consequences.'
          },
          {
            question: 'What is the stamp duty and registration charges for sale deed?',
            answer: 'Stamp duty and registration charges vary by state and property type. In Delhi, the rates are: for male buyers - stamp duty is 6% of property value, registration charges are 1% of property value. For female buyers - stamp duty is 4% of property value (2% concession), registration charges are 1% of property value. For joint ownership (male and female) - stamp duty is 5% of property value, registration charges are 1% of property value. Additional charges may include: transfer charges, mutation charges, and legal fees. Stamp duty is calculated on the market value or consideration amount, whichever is higher. Market value is determined by the government\'s circle rate for the area. Our lawyers ensure accurate calculation of all charges and help you understand the complete cost of registration before proceeding.'
          },
          {
            question: 'Can NRIs purchase property and register sale deed in India?',
            answer: 'Yes, Non-Resident Indians (NRIs) can purchase property and register sale deed in India, subject to certain conditions: NRIs can purchase residential and commercial properties without RBI approval, NRIs cannot purchase agricultural land, plantation property, or farmhouses without special permission, payment must be made through proper banking channels (NRE/NRO accounts or foreign remittance), and all FEMA (Foreign Exchange Management Act) regulations must be complied with. For sale deed registration, NRIs must: provide passport copy and visa details, provide PAN card (mandatory), execute a power of attorney if not present in India for registration, or be physically present at the sub-registrar office with valid documents. Our lawyers specialize in NRI property transactions and ensure compliance with all FEMA regulations, RBI guidelines, and registration requirements. We can also help with power of attorney execution if you cannot be present for registration.'
          },
          {
            question: 'What is the role of witnesses in sale deed registration?',
            answer: 'Witnesses play an important role in sale deed registration: at least 2 witnesses are required for sale deed execution, witnesses must be present during the signing of the sale deed, witnesses must also be present at the sub-registrar office during registration, witnesses must provide their identity proof and signatures, and witnesses attest that the parties signed the deed voluntarily and in their presence. Witness requirements: must be adults (18 years or above), should not be direct parties to the transaction (buyer or seller), should have valid identity proof, and should be available for future reference if needed. Witnesses provide credibility to the transaction and can testify in case of disputes. While witnesses are not liable for the transaction, their presence is mandatory for valid registration. Our lawyers arrange for appropriate witnesses if you don\'t have suitable persons available.'
          },
          {
            question: 'How do I verify if a sale deed is genuine?',
            answer: 'To verify if a sale deed is genuine: check the registration details - verify the sale deed is registered with the sub-registrar office by checking registration number and date, obtain an encumbrance certificate (EC) from the sub-registrar office showing the property\'s transaction history, verify the seller\'s ownership through title documents and previous sale deeds, check for any pending litigation or disputes on the property, verify stamp duty payment through stamps affixed on the deed, confirm signatures of all parties match their identity documents, verify witness details and signatures, and check for any alterations or overwriting in the deed. You can also: visit the sub-registrar office to verify registration records, conduct a title search through a lawyer, obtain a legal opinion on the title, and check property tax records with the municipal corporation. Our lawyers provide comprehensive verification services including title search, document verification, and legal opinion to ensure the sale deed is genuine and the property has clear title.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Sale Deed Registration Services?',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional sale deed registration and property legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Sale Deed Registration Lawyer in Delhi - Property Transfer | GAG Lawyers',
    metaDescription: 'Expert sale deed registration services in Delhi. Professional legal assistance for property transfer, stamp duty, and registry charges.'
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
