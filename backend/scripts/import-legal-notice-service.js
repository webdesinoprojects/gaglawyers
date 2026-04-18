require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importLegalNoticeService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Legal Notice/i });
    
    if (!service) {
      console.error('❌ Legal Notice service not found in database');
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
        heading: 'Legal Notice Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Notice Services',
          description: 'A legal notice is essentially a formal notice sent to a person who is expecting to commence legal proceedings. Legal notification must precede legal proceedings. And having a good lawyer will make all the difference in achieving your intended results.',
          image: '/images/legal-notice-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Lawyer for Legal Notice Expertise',
        background: 'light',
        content: {
          text: 'A legal notice is essentially a formal notice sent to a person who is expecting to commence legal proceedings. Legal notification must precede legal proceedings. And having a good lawyer will make all the difference in achieving your intended results.\n\nAt Grover & Grover Advocates and Solicitors, GAG Lawyers, it is widely accepted that communication is a key component of successful legal representation. Our team of expert legal notice lawyers in Delhi will help you draft and respond to legal notice and guide you through even the most difficult situations.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 3,
        heading: 'Our Legal Notice Services',
        background: 'light',
        content: {
          items: [
            {
              title: 'Drafting and Sending Legal Notices',
              description: 'Our lawyers for legal notices in Delhi have the expertise to draft accurate and effective legal notices specific to your situation. Whether it\'s a legal notice for non-payment of loan or any other issue, we make sure the information from us to you is clear, accurate and complete and communicates effectively.'
            },
            {
              title: 'Legal Notice for Recovery of Money',
              description: 'If you are in debt, our team will help you draft a legal notice for recovery of money in Delhi. Our team knows the legal notice format for recovery of money. They can draft such a document clearly stating your claim and what the recipient must do to settle the claim.'
            },
            {
              title: 'Legal Notice for Cheque Bounce',
              description: 'Bounced Checks are a real hassle. Our attorneys in Delhi can help you draft a legal notice for cheque bounce. Thus begins the process of getting your money back with all appropriate legal remedies available.'
            },
            {
              title: 'Legal Notice to Tenant to Vacate',
              description: 'Cases involving disputes between landlords and tenants are often complex. When a tenant must move out in Delhi, we can help you draft a compliant notice asking the tenant to move out in accordance with all applicable laws in that jurisdiction.'
            },
            {
              title: 'Legal Notice Under Section 138',
              description: 'We can help draft legal notices under Section 138 of the Negotiable Instruments Act. In the case of dishonest checks, our lawyers will make sure that all the formalities leading to the correct process are taken care of in such cases.'
            },
            {
              title: 'Online Legal Notice for Recovery of Money',
              description: 'In the current digital age, we offer an online legal notice for recovery of money service in Delhi. This can be a quick and effective way to start the recovery process.'
            },
            {
              title: 'Reply to Legal Notice',
              description: 'We will ensure that you can respond appropriately to legal notices. Our legal services team will respond to legal notices as drafts. This will ensure that your interests are addressed and claims against you are clearly clarified. We are also experts in drafting reply to legal notice for cheque bounce and draft reply to legal notice for recovery of money in Delhi.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 4,
        heading: 'The Importance of Professional Legal Notices in Delhi',
        background: 'light',
        content: {
          description: 'Although it is possible to submit legal information without a lawyer in Delhi, having professional legal advice can greatly strengthen your position. A lawyer for legal notice can:',
          steps: [
            {
              title: 'Ensure Legal Soundness',
              description: 'Ensure your notice is legally sound and effective'
            },
            {
              title: 'Avoid Common Pitfalls',
              description: 'Help you avoid common pitfalls that could weaken your case'
            },
            {
              title: 'Strategic Advice',
              description: 'Advise you on the best course of action based on the response to your notice'
            },
            {
              title: 'Litigation Preparation',
              description: 'Prepare you for potential legal proceedings if the matter isn\'t resolved through the notice'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 5,
        heading: 'Case Studies: Supreme Court of India Rulings on Legal Notices',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Nandlal Wasudeo Badwaik v. Lata Nandlal Badwaik (2014)',
              description: 'The Supreme Court said the case was important for the proper provision of legal information. It states that sending information via registered mail alone is not considered evidence of service. This decision emphasizes the need for professional management of legal notices to ensure that arrangements are made appropriately and efficiently in accordance with the law.'
            },
            {
              title: 'Kumari Madhuri Patil v. Additional Commissioner, Tribal Development (1994)',
              description: 'A key issue in this decision concerns the question of the appropriate length of a legal notice. The Supreme Court concluded that what constitutes the \'reasonable time\' to comply with any notice depends on the facts and circumstances of each case. This decision shows that legal notices must be drafted correctly, as it relates to the specific circumstances involved in that case.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 6,
        heading: 'Legal Notice Fees',
        background: 'light',
        content: {
          text: 'We understand that legal costs are a concern for many clients. Our legal data fees are transparent and competitive. At GAG Lawyers, our legal notice fees of lawyer in Delhi are structured to deliver value, ensuring a high-quality legal service.\n\nFor cases involving monetary recovery, we offer clear information about legal notice charges for recovery of money. We believe in transparency and will provide you with a detailed breakdown of all costs involved.'
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 7,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'Can I send legal notice without lawyer in Delhi?',
              answer: 'You can draft a legal notice without lawyer. But it\'s not something that\'s strongly recommended. An attorney will make sure your notice is legal, communicate your position effectively and comply with all relevant laws.'
            },
            {
              question: 'What is format of reply to legal notice under section 138?',
              answer: 'Responses to Section 138 notices generally include: Acknowledgment of receipt of the notice, Denial of allegations or explanation of circumstances, Any counter-claims or defenses, Request for withdrawal of the notice or proposal for settlement.'
            },
            {
              question: 'How to send legal notice for divorce?',
              answer: 'To send legal notice of divorce: Consult a lawyer to draft the notice, Include grounds for divorce and any relevant details, Send via registered post with acknowledgment due, Keep proof of sending and delivery.'
            },
            {
              question: 'How to send legal notice online?',
              answer: 'To send a legal notice online: Draft the notice (preferably with legal assistance), Use a reputable online service platform, Upload your notice and recipient details, Pay the required fee, The platform will send the notice electronically or by post.'
            },
            {
              question: 'How to send legal notice online free?',
              answer: 'Although there are some free templates available online, but it is not recommended to submit legal information for free. Legal assistance helps ensure that your information is effective and legal.'
            },
            {
              question: 'How to send legal notice to Amazon?',
              answer: 'To send a legal notice to Amazon: Draft a clear, concise notice stating your grievance, Include your order details and relevant evidence, Send to Amazon\'s registered office address via registered post, Consider sending a copy to their customer service email.'
            },
            {
              question: 'How to send legal notice to builder?',
              answer: 'To send a legal notice to a builder: Draft a notice detailing your grievances and demands, Include relevant dates, agreement details, and evidence, Send to the builder\'s registered office via registered post, Keep proof of sending and delivery.'
            },
            {
              question: 'How to send legal notice to company in Delhi?',
              answer: 'To send a legal notice to a company: Draft a clear, detailed notice, Address it to the company\'s registered office, Send via registered post with acknowledgement due, Keep all records of sending and receipt.'
            },
            {
              question: 'How to send legal notice to employer in Delhi?',
              answer: 'To send legal notices to employers: Draft a letter detailing your grievances and demands, Include dates and relevant evidence, Address the human resources department or company director, Send via registered mail with receipt.'
            },
            {
              question: 'Who can send legal notice?',
              answer: 'Anyone can send a legal notice, including: Individuals, Companies, Legal representatives (lawyers), Governing board. However, it is best to consult an attorney to ensure that the information is legally effective and efficient.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 8,
        heading: 'Contact Us',
        background: 'dark',
        content: {
          description: 'If you need help with legal information, contact GAG Lawyers - Grover and Grover Advocates and Solicitors. Our lawyer for legal notice in Delhi is here to help you manage this important part of the legal communications process.',
          buttonText: 'Schedule Your Appointment',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    await ServiceSection.insertMany(sections);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, {
      seo: {
        title: 'Legal Notice Lawyer in Delhi - GAG Lawyers',
        description: 'A legal notice is essentially a formal notice sent to a person who is expecting to commence legal proceedings. Legal notification must precede legal proceedings. And having a good lawyer will make all the difference in achieving your intended results.',
        keywords: 'Legal notice for non-payment of loan in Delhi, legal notice for recovery of money in Delhi, reply to legal notice in Delhi, send legal notice online in Delhi, legal notice for cheque bounce in Delhi, send legal notice in Delhi'
      }
    });

    console.log(`✅ Legal Notice Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importLegalNoticeService();
