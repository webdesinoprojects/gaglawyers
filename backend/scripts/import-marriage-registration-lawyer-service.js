require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'marriage-registration-lawyer',
  name: 'Marriage Registration Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Marriage Registration Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Marriage Registration',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Marriage Registration Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A Marriage Registration lawyer must have a deep understanding of the laws and regulations governing marriage and matrimonial relationships. They should also have knowledge of the relevant evidence necessary to prove a case in the context of matrimonial disputes, such as issues related to marriage registration.\n\nMarriage registration in India is a legal process that requires couples to register their marriage with the local government. This registration process is mandatory for all marriages in India, and it serves as proof of the couple\'s marriage. The process involves submitting a marriage registration form to the local registrar of marriages, which must be signed by both parties and two witnesses.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure for Matrimonial Marriage Registration',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Filing of Notice of Intended Marriage',
            description: 'File a Notice of Intended Marriage with the Registrar of Marriages in the area where at least one of the parties has resided for a minimum of 30 days prior to the notice. This notice is required to be signed by both parties.'
          },
          {
            stepNumber: 2,
            title: 'Verification of the Notice',
            description: 'After the notice is filed, the registrar will verify the documents and the notice and call both parties for a personal hearing.'
          },
          {
            stepNumber: 3,
            title: 'Issue of Marriage Certificate',
            description: 'After the completion of the personal hearing and the verification process, the Registrar will issue the Marriage Certificate, which is generally valid for 60 days from the date of issue.'
          },
          {
            stepNumber: 4,
            title: 'Solemnization of the Marriage',
            description: 'The marriage should be solemnized within 60 days of the issue of the Marriage Certificate.'
          },
          {
            stepNumber: 5,
            title: 'Registration of the Marriage',
            description: 'After the solemnization of the marriage, both parties should register the marriage with the Registrar, who will issue the Marriage Registration Certificate.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions Under Matrimonial Marriage Act',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Hindu Marriage Registration',
            description: 'Applicable to Hindus, Buddhists, Jains, and Sikhs under the Hindu Marriage Act, 1955. Requires affidavit, birth certificates, identity proof, address proof, photographs, and other documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Muslim Marriage Registration',
            description: 'Applicable to Muslims under the Muslim Personal Law (Shariat) Application Act, 1937. Requires similar documentation including affidavits, certificates, and identity proofs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Christian Marriage Registration',
            description: 'Applicable to Christians under the Indian Christian Marriage Act, 1872. Requires comprehensive documentation including affidavits and certificates.'
          },
          {
            icon: 'CheckCircle',
            title: 'Parsi Marriage Registration',
            description: 'Applicable to Parsis under the Parsi Marriage and Divorce Act, 1936. Requires standard documentation for registration.'
          },
          {
            icon: 'CheckCircle',
            title: 'Special Marriage Act, 1954',
            description: 'Applicable to all citizens of India, regardless of their religion. Provides for civil marriage registration with comprehensive documentation requirements.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Divorce',
            description: 'Couples can file for divorce if they are unable to continue living together. This can be done through mutual consent or one spouse can file a petition seeking dissolution of marriage.'
          },
          {
            icon: 'CheckCircle',
            title: 'Annulment',
            description: 'A form of legal separation where a marriage is declared null and void and parties are restored to the legal status they enjoyed prior to the marriage.'
          },
          {
            icon: 'CheckCircle',
            title: 'Judicial Separation',
            description: 'A legal remedy available to couples who wish to stay separated without actually getting divorced.'
          },
          {
            icon: 'CheckCircle',
            title: 'Restitution of Conjugal Rights',
            description: 'A remedy available to a wronged spouse who is not being allowed to live with the other spouse.'
          },
          {
            icon: 'CheckCircle',
            title: 'Alimony and Maintenance',
            description: 'Forms of financial support for the dependent spouse, ensuring financial security after separation or divorce.'
          },
          {
            icon: 'CheckCircle',
            title: 'Custody and Guardianship',
            description: 'Remedies available to parents seeking custody or guardianship of children from the other parent.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Lawyers in Marriage Registration',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'The role of a marriage registration lawyer in matrimonial marriage registration cases in India is to advise clients on their legal rights and obligations under Indian law. A marriage registration lawyer helps clients understand the legal process, draft any necessary documents, and ensures that all required information is properly submitted to the appropriate authorities.\n\nA marriage registration lawyer can provide advice on the validity of the marriage, help clients through the process of registration, and provide legal representation during any court proceedings. They can also help resolve disputes between the parties or represent the client in any negotiations. Furthermore, marriage registration lawyers provide assistance in drafting the necessary paperwork needed for registering a marriage, ensuring that all legal requirements are met.'
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required for Marriage Registration',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Proof of Age and Identity',
            description: 'Birth certificates, school leaving certificates, or passports for both parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Residence',
            description: 'Utility bills, voter ID cards, ration cards, or passports for both parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavit for Marriage',
            description: 'An affidavit by both parties stating that there is no legal impediment to the marriage and that they are marrying of their own free will.'
          },
          {
            icon: 'CheckCircle',
            title: 'Marriage Invitation Card',
            description: 'A marriage invitation card, if available, as supporting documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Passport-size Photographs',
            description: 'Recent passport-size photographs of both parties.'
          },
          {
            icon: 'CheckCircle',
            title: 'Additional Documents',
            description: 'Death certificate or divorce decree for widow/divorcee, parental consent for parties under 21, and special marriage certificate notice for Special Marriage Act cases.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a leading law firm in India that specialises in matrimonial marriage registration cases. They provide legal advice and assistance to couples who are looking to register their marriages in India. Their team of experienced lawyers has extensive knowledge of the laws related to marriage registration and can help couples navigate the process with ease.\n\nThey can provide guidance on the process of registering the marriage, the required documents, and the timeline for registering the marriage. They can also provide advice on any disputes or legal issues that may arise in the process of registering the marriage. They also offer other services such as the drafting of prenuptial agreements, divorce petitions, and related family law matters.\n\nWith their expertise, they can ensure that couples get the best legal advice so that they can protect their rights and interests when registering their marriages in India. Contact Grover & Grover, Advocates and Solicitors, today to set up a consultation appointment.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Courts',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Lata Singh v. State of Uttar Pradesh',
            description: 'Landmark case where the Supreme Court held that the right to choose one\'s spouse, regardless of religion, is an intrinsic part of Article 21 of the Indian Constitution. The right to marry is a fundamental right of privacy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Shafin Jahan v. Ashokan K.M.',
            description: 'The Supreme Court held that interfaith marriages are to be celebrated and encouraged and that it is the right of an individual to choose their own partner.'
          },
          {
            icon: 'CheckCircle',
            title: 'D. Velusamy v. D. Patchaiammal',
            description: 'The Supreme Court held that any person who has attained the age of majority is free to marry any person of his or her choice, regardless of religion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Naveen Kohli v. Neelu Kohli',
            description: 'The Supreme Court held that even in cases where the marriage was never registered, the Court can still grant a decree of divorce.'
          },
          {
            icon: 'CheckCircle',
            title: 'Sushil Kumar Sharma v. Union of India',
            description: 'The Supreme Court held that the registration of marriages under the Hindu Marriage Act, 1955, is not compulsory and is only directory in nature.'
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
            question: 'What is a matrimonial case in India?',
            answer: 'A matrimonial case in India is a legal case related to marriage, such as divorce, annulment, legal separation, maintenance, alimony, child custody, restitution of conjugal rights, or any other dispute arising from marital relationships.'
          },
          {
            question: 'What are the grounds for divorce in India?',
            answer: 'Grounds for divorce in India include adultery, cruelty, desertion for two years, conversion to another religion, mental disorder, communicable disease, renunciation of the world, presumption of death (seven years absence), and mutual consent. Additional grounds for women include bigamy, rape, sodomy, or bestiality by husband.'
          },
          {
            question: 'What is the process of getting a divorce in India?',
            answer: 'The process involves filing a divorce petition in Family Court, serving notice to the other spouse, attending counseling sessions (if ordered), filing written statements and evidence, attending court hearings, and obtaining a divorce decree. Mutual consent divorce is faster, while contested divorce takes longer.'
          },
          {
            question: 'What is the role of a matrimonial lawyer in India?',
            answer: 'A matrimonial lawyer provides legal advice on marriage and divorce matters, drafts and files petitions, represents clients in court, negotiates settlements, handles property division and custody matters, ensures compliance with legal procedures, and protects client rights throughout the process.'
          },
          {
            question: 'Can a divorce be obtained through mutual consent in India?',
            answer: 'Yes, divorce by mutual consent is available under Section 13B of the Hindu Marriage Act and similar provisions in other personal laws. Both parties must agree to divorce, live separately for one year, file a joint petition, and appear before court. The process is faster than contested divorce.'
          },
          {
            question: 'How is alimony determined in India?',
            answer: 'Alimony is determined based on factors including income and earning capacity of both spouses, standard of living during marriage, duration of marriage, age and health of parties, conduct of parties, needs of dependent spouse, and ability of other spouse to pay. Courts have discretion to award appropriate amounts.'
          },
          {
            question: 'What is the process of getting a marriage annulled in India?',
            answer: 'Annulment requires filing a petition in Family Court on grounds such as impotence, mental incapacity, fraud, coercion, underage marriage, or prohibited relationship. The petitioner must prove grounds with evidence. If granted, the marriage is declared void ab initio (from the beginning).'
          },
          {
            question: 'What is the role of mediation in matrimonial cases in India?',
            answer: 'Mediation helps parties resolve disputes amicably without prolonged litigation. Courts often refer matrimonial cases to mediation centers. A neutral mediator facilitates discussion to reach mutually acceptable solutions on issues like custody, maintenance, and property division, saving time and costs.'
          },
          {
            question: 'Can a matrimonial lawyer help with child custody disputes in India?',
            answer: 'Yes, matrimonial lawyers assist with child custody disputes by filing custody petitions, presenting evidence of parenting ability, negotiating custody arrangements, ensuring child\'s best interests are prioritized, and representing clients in custody hearings and appeals.'
          },
          {
            question: 'Can a spouse claim a share of the other spouse\'s property in India?',
            answer: 'Under Hindu law, a wife has no automatic right to husband\'s property during marriage but can claim maintenance and share in joint property. Upon divorce, courts may order property division. Muslim and Christian laws have different provisions. Streedhan (wife\'s property) belongs exclusively to her.'
          },
          {
            question: 'Can a court order the division of matrimonial property in India?',
            answer: 'Yes, courts can order division of jointly acquired matrimonial property during divorce proceedings, considering contributions of both spouses, needs of parties and children, and principles of equity and justice. However, ancestral or self-acquired property of one spouse typically remains with that spouse.'
          },
          {
            question: 'What is the difference between contested and uncontested matrimonial cases in India?',
            answer: 'Uncontested cases involve mutual agreement on all issues (divorce by mutual consent), are faster, less expensive, and less adversarial. Contested cases involve disputes on grounds, custody, maintenance, or property, require extensive litigation, take longer, and are more expensive.'
          },
          {
            question: 'What is the role of the Family Court in India?',
            answer: 'Family Courts handle matrimonial disputes including divorce, custody, maintenance, domestic violence, and adoption. They aim for conciliation and settlement, provide a less formal environment, protect privacy, and have jurisdiction over all family-related matters under the Family Courts Act, 1984.'
          },
          {
            question: 'What is the process of filing for a divorce in India?',
            answer: 'The process includes: consulting a lawyer, preparing and filing divorce petition with required documents, paying court fees, serving notice to spouse, attending counseling (if ordered), filing evidence and written statements, attending hearings, and obtaining divorce decree after final hearing.'
          },
          {
            question: 'What is the role of the Supreme Court of India in matrimonial cases?',
            answer: 'The Supreme Court hears appeals from High Courts in matrimonial matters, interprets matrimonial laws, sets legal precedents, issues guidelines on family law matters, and exercises jurisdiction under Article 32 for fundamental rights violations in matrimonial disputes.'
          },
          {
            question: 'What is the time frame for getting a divorce in India?',
            answer: 'Mutual consent divorce typically takes 6-18 months including mandatory 6-month waiting period. Contested divorce can take 2-5 years or longer depending on case complexity, court backlog, number of hearings, and whether appeals are filed.'
          },
          {
            question: 'Can a court order the payment of interim maintenance in matrimonial cases in India?',
            answer: 'Yes, courts can order interim maintenance under Section 24 of Hindu Marriage Act and similar provisions in other laws. This provides financial support to the dependent spouse during pendency of matrimonial proceedings, ensuring they can sustain themselves and afford legal representation.'
          },
          {
            question: 'Can a matrimonial lawyer help with prenuptial agreements in India?',
            answer: 'Yes, matrimonial lawyers can draft prenuptial agreements outlining property division, maintenance, and other terms in case of divorce. While not explicitly recognized under Indian law, courts may consider them as evidence of parties\' intentions, especially under Special Marriage Act.'
          },
          {
            question: 'Can a spouse contest a divorce in India?',
            answer: 'Yes, a spouse can contest a divorce by filing a written statement denying allegations, presenting counter-evidence, cross-examining petitioner\'s witnesses, and arguing against divorce grounds. The petitioner must prove grounds for divorce beyond reasonable doubt in contested cases.'
          },
          {
            question: 'Can a matrimonial lawyer help with property disputes in India?',
            answer: 'Yes, matrimonial lawyers assist with property disputes by determining ownership rights, filing partition suits, negotiating property settlements, representing clients in property division proceedings, ensuring fair distribution of jointly acquired property, and protecting client\'s property interests during divorce.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Marriage Registration Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional marriage registration services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Marriage Registration Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert marriage registration services in Delhi. Professional legal advice for marriage registration, matrimonial disputes, divorce, and family law matters.'
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
