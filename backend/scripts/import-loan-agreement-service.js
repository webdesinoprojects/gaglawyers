require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'loan-agreement',
  name: 'Loan Agreement',
  sections: [
    {
      type: 'hero',
      heading: 'Loan Agreement',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Loan Agreements',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'What Are Loan Agreements?',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A loan agreement is a contract for lawful binding between a lender and a borrower, primarily on terms and conditions of a loan. Be you the lender or borrower, getting the best terms with an experienced lawyer is a must for the loan agreement.\n\nAre you seeking a lawyer to draft or review loan agreements? You are in the right place. Grover and Grover Advocates and Solicitors specialize in the preparation of full-proof loan agreements meant to work for your interest as well as ensuring that your interests\' pursuit is within the law. Here at GAG Lawyers, our lawyer for loan agreements are experienced enough to ensure that you are guided through the process without breaking a sweat.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Loan Agreements We Handle',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Personal Loans',
            description: 'Comprehensive loan agreements for personal borrowing needs with clear terms and legal protection for both parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Business Loans',
            description: 'Specialized business loan agreements tailored to enhance your business while ensuring your interests are protected.'
          },
          {
            icon: 'CheckCircle',
            title: 'Car Loans',
            description: 'Vehicle loan agreements with specific particulars addressing all aspects of automobile financing.'
          },
          {
            icon: 'CheckCircle',
            title: 'Property Loans',
            description: 'Real estate loan agreements that protect your investments in high-value property transactions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unsecured Loans',
            description: 'Secure agreements that reduce the risks and vulnerabilities associated with unsecured lending.'
          },
          {
            icon: 'CheckCircle',
            title: 'ECB (External Commercial Borrowing) Loans',
            description: 'Comprehensive understanding of external commercial borrowing regulations to navigate the complex process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Loans Between Friends',
            description: 'Formal agreements that are legally binding without damaging personal relationships.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Our Comprehensive Loan Agreement Services',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Drafting Custom Loan Agreements',
            description: 'We provide draft loan agreements with precise consideration to all your specific requirements, whether a loan agreement between two parties or a complex business arrangement.'
          },
          {
            icon: 'CheckCircle',
            title: 'Review and Negotiation',
            description: 'If a loan agreement has been offered, our lawyers will meticulously review the terms and negotiate with lenders to fetch the best possible outcome.'
          },
          {
            icon: 'CheckCircle',
            title: 'Drafting of Security Agreements',
            description: 'We help you draft robust security agreements that protect your interests as a lender.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance and Regulatory Advice',
            description: 'Keeping abreast with changes in financial regulations, our team ensures your loan agreements are fully Indian law compliant.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'In case of any problems arising from loan agreements, we can represent you in court with experienced litigators.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Case Studies: Impact of Expert Legal Counsel',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Industrial Credit and Investment Corporation of India Ltd. v. Grapco Industries Ltd. (1999)',
            description: 'The Supreme Court insisted upon the loan agreement terms being clear and not ambiguous, highlighting the importance of experienced legal drafting.'
          },
          {
            icon: 'CheckCircle',
            title: 'Transmission Corporation of A.P. Ltd. v. GMR Vemagiri Power Generation Ltd. (2018)',
            description: 'This case demonstrates the importance of having well-prepared force majeure clauses in a loan contract, which may go unnoticed without professional legal advice.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Loan Agreement Legal Fees',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'When a customer looks for a lawyer dealing in loan agreement services, one of the primary concerns is the expenses. Even though the fees may differ due to the complexity of the content and the service offered, here is a standard rate:\n\n• Advocate fee for loan agreement: The majority of standard agreements will attract an average fee ranging from ₹10,000 - ₹50,000.\n• Lawyer fee for loan agreement: It could be slightly expensive and may cost between ₹15,000 to ₹75,000 in case of more complicated agreements.\n\nEngaging a lawyer to prepare or review a loan agreement is worthwhile for safeguarding your interests and ensuring that the principles of law are adhered to. Note: The price mentioned above may vary depending on various factors.'
      }
    },
    {
      type: 'overview',
      heading: 'Loan Agreement Stamp Duty',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'Generally, stamp duty tends to be one of the lesser known matters in loan agreements. Here in India, it varies from state to state. Our team shall be able to guide you through those stamp duties, so your agreement will comply with all requirements, and at the same time, it is valid under the eyes of the law.\n\nAt GAG Lawyers - Grover and Grover Advocates and Solicitors, we specialize in giving expert legal guidance for all loan agreements. Our services specialize in the best loan agreement attorneys and advisors; you will need to protect and strictly adhere to the regulations and laws governing your financial transactions with our help.\n\nGet in touch with us today and experience the peace of mind that comes from working with professional legal professionals.'
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            question: 'How to write a legal loan agreement?',
            answer: 'It is advisable to hire a lawyer when drafting a loan agreement. However, a standard one would require the following elements: names and addresses of the parties, amount of the loan and the loan\'s purpose, interest rate and the method of its computation, terms of repayment and timetable for payment, what happens in case of default, and signatures of the parties to the contract.'
          },
          {
            question: 'What makes a loan agreement legally binding?',
            answer: 'A loan agreement becomes legally binding when it includes: offer and acceptance by both parties, consideration (the loan amount), legal capacity of parties to contract, lawful purpose, mutual consent without coercion, proper documentation with signatures, and compliance with stamp duty and registration requirements where applicable.'
          },
          {
            question: 'Can I draft a loan agreement without a lawyer?',
            answer: 'While you can draft a loan agreement without a lawyer using templates, it is highly advisable to consult a lawyer for loan agreement services. A lawyer ensures the agreement is legally sound, protects your interests, complies with applicable laws, includes necessary clauses for various scenarios, and can withstand legal scrutiny in case of disputes.'
          },
          {
            question: 'What\'s the difference between a secured and unsecured loan agreement?',
            answer: 'A secured loan agreement includes collateral (property, vehicle, or other assets) that the lender can claim if the borrower defaults. An unsecured loan agreement has no collateral backing, relying solely on the borrower\'s creditworthiness and promise to repay. Secured loans typically have lower interest rates due to reduced lender risk.'
          },
          {
            question: 'How long does it take to draft a loan agreement?',
            answer: 'The time to draft a loan agreement varies based on complexity. A simple personal loan agreement may take 2-3 days, while complex business or property loan agreements can take 1-2 weeks. The timeline includes initial consultation, drafting, review, revisions based on feedback, and finalization.'
          },
          {
            question: 'What happens if a borrower defaults on a loan agreement?',
            answer: 'If a borrower defaults, the consequences depend on the agreement terms and may include: acceleration of the entire loan amount becoming due immediately, seizure of collateral in secured loans, legal action for recovery, damage to credit score, penalty charges and increased interest rates, and potential criminal proceedings in cases of fraud.'
          },
          {
            question: 'Is registration of loan agreement mandatory?',
            answer: 'Registration is mandatory for loan agreements involving immovable property or loans exceeding a certain amount (typically ₹100 or more) under the Registration Act, 1908. Even when not mandatory, registration is advisable as it provides legal validity, serves as conclusive proof, and makes the agreement enforceable in court.'
          },
          {
            question: 'Can interest rates be changed during the loan period?',
            answer: 'Interest rates can be changed only if the loan agreement includes a variable interest rate clause or rate revision clause. For fixed-rate loans, the interest rate remains constant throughout the loan period. Any changes to interest rates must be clearly specified in the agreement and comply with applicable regulations.'
          },
          {
            question: 'What is the difference between a loan agreement and a promissory note?',
            answer: 'A loan agreement is a comprehensive contract detailing all terms and conditions of the loan, including repayment schedule, interest, collateral, and default provisions. A promissory note is a simpler document where the borrower promises to pay a specific amount by a certain date. Loan agreements are more detailed and provide better legal protection.'
          },
          {
            question: 'Can a loan agreement be modified after signing?',
            answer: 'Yes, a loan agreement can be modified after signing through a written amendment or addendum signed by all parties. The modification should clearly state what terms are being changed, be executed with the same formalities as the original agreement, and comply with stamp duty requirements for the amended terms.'
          },
          {
            question: 'What should be included in a loan agreement for friends or family?',
            answer: 'Even for informal loans, include: names and addresses of parties, loan amount and purpose, interest rate (if any), repayment schedule, consequences of default, signatures and date. This formalizes the arrangement, prevents misunderstandings, provides legal recourse if needed, and maintains the relationship by setting clear expectations.'
          },
          {
            question: 'Are there any tax implications for loan agreements?',
            answer: 'Yes, tax implications include: interest income is taxable for the lender, interest paid may be deductible for business loans, gifts disguised as loans may attract gift tax, and loans below market interest rates between related parties may have imputed income implications. Consult a tax advisor for specific situations.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Loan Agreement Services?',
      visible: true,
      order: 8,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional loan agreement services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Loan Agreement Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert loan agreement services in Delhi. Professional legal advice for personal loans, business loans, property loans, and loan agreement drafting and review.'
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
