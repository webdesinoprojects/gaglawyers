require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'cheque-bounce-lawyer',
  name: 'Cheque Bounce Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Expert Cheque Bounce Lawyers in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Professional legal assistance for cheque bounce cases. Get immediate help with legal notices, criminal complaints, and court representation for dishonoured cheques.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Cheque Bounce - Understanding the Legal Framework',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'In the realm of financial transactions, a scenario unfolds when the bank tasked with honoring a check returns it due to an insufficiency of monetary resources. This predicament, commonly known as a "cheque bounce," plagues both individuals and enterprises relying on checks for monetary transactions. Multiple factors can precipitate this situation, ranging from inaccuracies in the check\'s details to an inadequacy of funds in the associated account, or even the expiration of the check.\n\nA bounced check doesn\'t merely constitute a minor inconvenience; rather, it carries substantial repercussions for both the individual or entity issuing the check and its intended recipient. A check, a tangible representation of monetary value, commanding immediate payment, holds the capacity for deposition in any banking institution. The act of bouncing a check signifies its issuance in error, necessitating its return to the originator.\n\nIt is a criminal offense to issue a check that is dishonoured due to insufficient funds or any other reason. If a check is bounced, the drawer of the check can face criminal charges and be liable for fines and penalties under Section 138 of the Negotiable Instruments Act.'
      }
    },
    {
      type: 'benefits',
      heading: 'What to Do When a Cheque Gets Bounced',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Immediate Action Required',
            description: 'Contact the issuer immediately and make arrangements to recover the outstanding amount. Time is critical in cheque bounce cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Send Legal Notice',
            description: 'Issue a legal notice to the drawer within 30 days of receiving information about the dishonour from the bank, as mandated by law.'
          },
          {
            icon: 'CheckCircle',
            title: 'File Criminal Complaint',
            description: 'If the drawer fails to make payment within 15 days of receiving the notice, file a criminal complaint under Section 138 of the Negotiable Instruments Act.'
          },
          {
            icon: 'CheckCircle',
            title: 'Preserve Evidence',
            description: 'Keep all documents safe including the bounced cheque, bank memo, legal notice, and any correspondence with the drawer.'
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
            title: 'Criminal Offense',
            description: 'Issuing a cheque that bounces due to insufficient funds is a criminal offense under Section 138 of the Negotiable Instruments Act.'
          },
          {
            icon: 'CheckCircle',
            title: 'Imprisonment',
            description: 'The drawer can be punished with imprisonment for a term which may extend to two years, as per the amended provisions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Monetary Fine',
            description: 'The court can impose a fine which may extend to twice the amount of the cheque, or both imprisonment and fine.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bank Charges',
            description: 'Additional bank charges and penalties are levied by the bank for dishonoured cheques, adding to the financial burden.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available Under Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Civil Suit for Recovery',
            description: 'File a civil suit for recovery of money to recover the value of the money paid by the drawer, in addition to costs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Debt Recovery Tribunal (DRT)',
            description: 'File an application before the Debt Recovery Tribunal for recovery of the amount plus costs, if applicable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Complaint',
            description: 'File a criminal complaint against the drawer of the cheque under Section 138 of the Negotiable Instruments Act for prosecution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negotiated Settlement',
            description: 'Pursue out-of-court settlement through negotiation between parties, which can be faster and less expensive than litigation.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Complete Procedure to File a Cheque Bounce Case',
      visible: true,
      order: 5,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Receive Dishonour Memo',
            description: 'Obtain the cheque return memo from the bank stating the reason for dishonour (insufficient funds, signature mismatch, etc.).'
          },
          {
            stepNumber: 2,
            title: 'Issue Legal Notice',
            description: 'Send a legal notice to the drawer within 30 days of receiving information about dishonour, demanding payment of the cheque amount.'
          },
          {
            stepNumber: 3,
            title: 'Wait for Response',
            description: 'Give the drawer 15 days from receipt of notice to make payment. If payment is not made, proceed with criminal complaint.'
          },
          {
            stepNumber: 4,
            title: 'File Criminal Complaint',
            description: 'File a complaint under Section 138 of the Negotiable Instruments Act in the appropriate Magistrate court within 30 days.'
          },
          {
            stepNumber: 5,
            title: 'Court Proceedings',
            description: 'Attend court hearings, present evidence including the bounced cheque, bank memo, legal notice, and any correspondence with the drawer.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Cheque Bounce Lawyers',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice & Representation',
            description: 'Provide legal advice and representation to both the complainant and the accused, ensuring proper handling of the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Drafting Legal Documents',
            description: 'Draft legal notices, complaints, and other documents in proper format as per legal requirements and court procedures.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Represent clients in court, present evidence properly, and ensure that the rights of both parties are protected during the process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement Negotiation',
            description: 'Help negotiate settlements between parties if possible, providing advice on the best course of action and potential outcomes.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Cheque Bounce Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expert Legal Guidance',
            description: 'We provide comprehensive legal advice on cheque bounce cases, helping clients understand their rights and the legal process involved.'
          },
          {
            icon: 'CheckCircle',
            title: 'Notice Drafting & Filing',
            description: 'Our team drafts legally sound notices and files complaints with police and courts, ensuring all procedural requirements are met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'We represent clients in court proceedings, present evidence effectively, and argue cases to ensure the best possible outcome.'
          },
          {
            icon: 'CheckCircle',
            title: 'Settlement & Recovery',
            description: 'We help negotiate settlements when possible and assist in recovery of amounts through legal channels, minimizing time and costs.'
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
            question: 'What is Cheque Bounce?',
            answer: 'Cheque bounce is a term used to describe a situation in which a cheque that has been issued by one party is returned by the bank due to insufficient funds or other reasons such as signature mismatch, closed account, or invalid account number.'
          },
          {
            question: 'What are the consequences of Cheque Bounce?',
            answer: 'Cheque bounce can lead to various consequences, including criminal prosecution under Section 138 of the Negotiable Instruments Act, imprisonment up to 2 years, monetary fines up to twice the cheque amount, bank penalties, and damage to credit score.'
          },
          {
            question: 'What is the penalty for Cheque Bounce?',
            answer: 'The penalty for Cheque Bounce includes imprisonment for up to 2 years, a fine which may extend to twice the amount of the cheque, or both. Additionally, banks impose their own fees and penalties for dishonoured cheques.'
          },
          {
            question: 'How can Cheque Bounce be avoided?',
            answer: 'Cheque Bounce can be avoided by ensuring sufficient funds in the account before issuing a cheque, double-checking all details on the cheque, maintaining proper account records, and using electronic payment methods whenever possible.'
          },
          {
            question: 'What is the legal recourse for Cheque Bounce?',
            answer: 'Under the Negotiable Instruments Act, the payee can send a legal notice within 30 days and file a criminal complaint if payment is not made within 15 days. The case can result in imprisonment, fine, or both for the drawer.'
          },
          {
            question: 'Can Cheque Bounce affect credit score?',
            answer: 'Yes, Cheque Bounce can negatively affect credit score, as it indicates to lenders and financial institutions that the individual is a credit risk and may have financial management issues.'
          },
          {
            question: 'What is the time limit for Cheque Bounce cases?',
            answer: 'The legal notice must be sent within 30 days of receiving information about dishonour. If payment is not made within 15 days of notice, a criminal complaint must be filed within 30 days thereafter.'
          },
          {
            question: 'Can Cheque Bounce be resolved out of court?',
            answer: 'Yes, Cheque Bounce can be resolved out of court through negotiation and settlement between the parties involved. This can be faster and less expensive, but it is advisable to seek legal advice before settling.'
          },
          {
            question: 'What documents are required for a Cheque Bounce case?',
            answer: 'Required documents include the original bounced cheque, bank dishonour memo, legal notice sent to the drawer, proof of service of notice, bank statements, and any correspondence between the parties.'
          },
          {
            question: 'How long does it take to resolve a Cheque Bounce case?',
            answer: 'The time to resolve a Cheque Bounce case varies depending on court schedules and case complexity. It can take anywhere from a few months to several years, though courts are mandated to try to conclude cases within 6 months.'
          },
          {
            question: 'Can a Cheque Bounce case be appealed?',
            answer: 'Yes, a Cheque Bounce case can be appealed if parties are not satisfied with the outcome. Appeals must be filed within the prescribed timeframe in the higher court with proper grounds.'
          },
          {
            question: 'Can a Cheque Bounce case be filed for a post-dated cheque?',
            answer: 'Yes, a Cheque Bounce case can be filed for a post-dated cheque if it is presented before the date mentioned on it and returned by the bank due to insufficient funds or other reasons.'
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
        body: 'Contact our expert legal team today for immediate assistance with cheque bounce cases and legal representation',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Cheque Bounce Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Cheque Bounce Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations'
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
