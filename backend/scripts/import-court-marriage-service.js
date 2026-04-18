require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importCourtMarriageService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Court Marriage/i });
    
    if (!service) {
      console.error('❌ Court Marriage service not found in database');
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
        heading: 'Court Marriage Lawyer',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Services for Court Marriage',
          description: 'Court marriage lawyers are required to have a comprehensive understanding of court marriage laws and possess the expertise to gather and analyze the evidence required to build a strong case for their clients.',
          image: '/images/court-marriage-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Court Marriage',
        background: 'light',
        content: {
          text: 'A court marriage in India is a civil marriage conducted by a court of law. This type of marriage is conducted under the Special Marriage Act, 1954. Under this act, a couple who wishes to get married can apply for a court marriage. The court will then process their application, and if all conditions are met, the court will issue a marriage certificate.\n\nThe couple must be at least 21 years of age and not related to each other. Both must be of sound mind and be able to give their consent to the marriage. Court marriage in India is considered to be the most secure and legal way to get married. The marriage is registered in court, and the couple is provided with a valid marriage certificate.\n\nCourt marriage in India is a good option for those couples who do not wish to have a traditional wedding. This type of marriage is secure, legal, and less expensive. Furthermore, it is also much more convenient and can be done without involving any intermediaries.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 3,
        heading: 'Acts and Provisions Related To Court Marriage',
        background: 'light',
        content: {
          text: 'Court marriage in India is the process of solemnizing a marriage between two individuals in the presence of a court. It is an elaborate procedure that is regulated by the 1954 Special Marriage Act. It is an alternative to traditional religious wedding ceremonies. A court marriage in India is also known as a civil marriage.\n\nCourt marriage in India is open to all religions, castes, and creeds. It is an ideal option for couples who come from different religions, castes, and backgrounds. It is also a popular option among couples who do not want to be restricted by the customs and rituals associated with traditional religious wedding ceremonies.\n\nThe Special Marriage Act, 1954 defines the types of court marriages and sets out the rules and regulations that need to be followed. It provides for a minimum age of 18 for the bride and 21 for the groom. It also sets out the documents that need to be presented to the court.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 4,
        heading: 'Rights and Obligations Under Court Marriage',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Right to Choose Marriage Without Rituals',
              description: 'Couples can choose to get married without any religious or traditional rituals. This is one of the main advantages of court marriage.'
            },
            {
              title: 'Right to File for Divorce',
              description: 'Couples getting married through court marriage have the right to file for divorce if the marriage has irretrievably broken down.'
            },
            {
              title: 'Obligation to Pay Registration Fee',
              description: 'Couples must pay a marriage registration fee as part of the legal process.'
            },
            {
              title: 'Obligation to File Affidavit',
              description: 'Couples must file an affidavit to declare their intention to marry.'
            },
            {
              title: 'Obligation to Submit Proof of Identity',
              description: 'Couples must submit proof of their identity and other required documents.'
            },
            {
              title: 'Court Authority on Marriage Matters',
              description: 'The court has authority to make decisions on matters related to division of assets, custody of children, alimony, and spousal support.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 5,
        heading: 'Procedure of Court Marriage',
        background: 'light',
        content: {
          description: 'The procedure for court marriage in India is fairly straightforward. All couples need to do is follow these steps:',
          steps: [
            {
              title: 'Obtain Marriage Registration Form',
              description: 'Obtain a marriage registration form from the local marriage registrar\'s office, either in person or online.'
            },
            {
              title: 'Fill Out Required Forms',
              description: 'Fill out the form with full name, address, contact number, age, and other relevant details of both bride and groom.'
            },
            {
              title: 'Submit Required Documents',
              description: 'Present relevant documents including proof of identity, address, date of birth, and other required documents to the marriage registrar.'
            },
            {
              title: 'Pay Registration Fee',
              description: 'Pay the required fee which may vary from state to state.'
            },
            {
              title: 'Receive Marriage Certificate',
              description: 'After verification and payment, the marriage registrar will issue a marriage certificate to the couple.'
            },
            {
              title: 'Complete Honeymoon Period',
              description: 'The marriage is not valid until the couple completes a mandatory seven-day honeymoon period together.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 6,
        heading: 'Documents Required For Court Marriage',
        background: 'light',
        content: {
          items: [
            {
              title: 'Age Proof',
              description: 'Birth certificate or school leaving certificate for both parties.'
            },
            {
              title: 'Identity Proof',
              description: 'Valid proof of identity such as passport, driving license, voter ID card, or Aadhaar card.'
            },
            {
              title: 'Residence Proof',
              description: 'Passport, electricity bill, telephone bill, or ration card as proof of residence.'
            },
            {
              title: 'Written Declaration',
              description: 'Declaration stating that both parties are not related by blood or marriage and are of sound mind.'
            },
            {
              title: 'Divorce Decree',
              description: 'If either party is a divorcee, the divorce decree must be presented.'
            },
            {
              title: 'Death Certificate',
              description: 'If either party is a widow or widower, the death certificate of the deceased spouse is required.'
            },
            {
              title: 'Photographs',
              description: 'Four passport-size photographs of both parties are required.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 7,
        heading: 'Role of Lawyer in Court Marriage',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Legal Guidance',
              description: 'Help the couple understand the legal implications of the marriage and explain legal requirements.'
            },
            {
              title: 'Document Preparation',
              description: 'Help prepare legal documents including affidavit of marriage, statement of particulars, and marriage certificate.'
            },
            {
              title: 'Court Representation',
              description: 'Be present during the court marriage to answer questions and ensure the marriage is conducted in accordance with the law.'
            },
            {
              title: 'Document Verification',
              description: 'Ensure that the couple has all necessary documents such as valid passport, birth certificate, and address proof.'
            },
            {
              title: 'Marriage License Assistance',
              description: 'Help the couple obtain the necessary marriage license.'
            },
            {
              title: 'Registration Support',
              description: 'Help the couple register the marriage and obtain a copy of the marriage certificate after solemnization.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 8,
        heading: 'How Grover & Grover, Advocates Help',
        background: 'light',
        content: {
          text: 'Grover & Grover Advocates and Solicitors is the leading law firm in India for court marriages. With their team of experienced and qualified lawyers, they provide the necessary legal advice, guidance, and assistance for couples who are looking to get married in a court of law.\n\nThey provide extensive advice and guidance on all matters related to court marriage in India, including:\n\n• Legal requirements that need to be met to register a court marriage\n• Necessary paperwork and documentation including affidavits and notification of intent\n• Process for obtaining necessary court orders for the marriage\n• Various legal options available for couples considering court marriage\n• Assistance in the actual court marriage process including document preparation and court representation\n• Help with any disputes or disagreements that may arise during the marriage process\n\nWith their expertise in the law, they can help couples ensure that the marriage process goes as smoothly as possible and that the marriage is legally binding and valid.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 9,
        heading: 'Popular Cases in Supreme Court and High Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Lata Singh v. State of UP (2006)',
              description: 'The Supreme Court held that couples have the right to choose their own religion and marry without the consent of their parents and that the state must respect their right to marriage.'
            },
            {
              title: 'Santhosh Sharma vs. State of Uttarakhand (2014)',
              description: 'The High Court held that the right to choose one\'s own religion and marry without parental consent is a fundamental right guaranteed under the Indian Constitution.'
            },
            {
              title: 'Anuj Garg vs. Hotel Association of India (2017)',
              description: 'The Supreme Court held that couples have the right to solemnize their marriage in a public place of their choice, even if it is a hotel.'
            },
            {
              title: 'Anu Kumar vs. State of Rajasthan (2019)',
              description: 'The High Court held that couples have the right to choose their own religion and marry without the consent of their parents, further cementing the right to solemnize marriage in a public place.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 10,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'What is a court marriage?',
              answer: 'A court marriage is a legal procedure where a couple gets married in the presence of a marriage registrar and witnesses, without any religious ceremony or rituals.'
            },
            {
              question: 'What are the legal implications of a court marriage in India?',
              answer: 'A court marriage in India is a legally binding contract between two individuals. It gives them the right to live together as husband and wife, inherit each other\'s property, and claim maintenance in case of separation or divorce.'
            },
            {
              question: 'Who can do court marriage?',
              answer: 'Any two individuals who are eligible to marry and fulfill the legal requirements can do a court marriage in India. The individuals must be of marriageable age (18 years for bride, 21 years for groom) and must not be closely related to each other.'
            },
            {
              question: 'What is the role of a lawyer in a court marriage?',
              answer: 'The role of a lawyer in a court marriage is to provide legal advice, help with the documentation process, and represent the couple in case of any legal disputes.'
            },
            {
              question: 'How long does it take to complete a court marriage in India?',
              answer: 'The time taken to complete a court marriage in India varies from state to state and depends on the workload of the marriage registrar. Generally, it takes 1-2 hours to complete the process.'
            },
            {
              question: 'What is the difference between a court marriage and a traditional wedding ceremony?',
              answer: 'A court marriage is a legal procedure performed in the presence of a marriage registrar and witnesses, while a traditional wedding ceremony involves religious or cultural rituals and ceremonies.'
            },
            {
              question: 'What is the role of witnesses in a court marriage in India?',
              answer: 'The role of witnesses in a court marriage in India is to attest to the fact that the couple got married in their presence and to sign the marriage certificate as witnesses.'
            },
            {
              question: 'How long is the court marriage registration valid in India?',
              answer: 'The court marriage registration is valid for the lifetime of the couple and serves as proof of their marriage.'
            },
            {
              question: 'Can a court marriage be converted into a traditional wedding ceremony?',
              answer: 'Yes, a court marriage can be converted into a traditional wedding ceremony if the couple wishes to do so.'
            },
            {
              question: 'What are the legal rights of a couple after a court marriage in India?',
              answer: 'After a court marriage in India, a couple has the legal right to live together as husband and wife, inherit each other\'s property, and claim maintenance in case of separation or divorce.'
            },
            {
              question: 'Can foreign nationals get married in court in India?',
              answer: 'Yes, foreign nationals can get married in court in India, but they need to follow the guidelines and procedures laid down by the Indian government.'
            },
            {
              question: 'Is it mandatory to get the consent of parents for a court marriage in India?',
              answer: 'No, it is not mandatory to get the consent of parents for a court marriage in India. However, it is advisable to inform them and take their consent if possible.'
            },
            {
              question: 'Who is a court marriage lawyer?',
              answer: 'A court marriage lawyer is a legal professional who specializes in handling court marriage cases and assists couples in completing the legal formalities required for a court marriage.'
            },
            {
              question: 'Is it necessary to have witnesses for a court marriage in India?',
              answer: 'Yes, two witnesses are required for a court marriage in India, who should be present during the marriage registration and sign the marriage certificate.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 11,
        heading: 'Need Expert Court Marriage Legal Services?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional court marriage legal services in Delhi.',
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
        title: 'Court Marriage Lawyer in Delhi - GAG Lawyers',
        description: 'Court marriage lawyers are required to have a comprehensive understanding of court marriage laws and possess the expertise to gather and analyze the evidence required to build a strong case for their clients.',
        keywords: 'court marriage lawyer, court marriage in India, Special Marriage Act, civil marriage, marriage registration, court marriage procedure, marriage certificate'
      }
    });

    console.log(`✅ Court Marriage Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importCourtMarriageService();
