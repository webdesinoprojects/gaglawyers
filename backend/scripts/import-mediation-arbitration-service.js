require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importMediationArbitrationService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Mediation.*Arbitration/i });
    
    if (!service) {
      console.error('❌ Mediation & Arbitration service not found in database');
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
        heading: 'Mediation & Arbitration Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Alternative Dispute Resolution Services',
          description: 'We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
          image: '/images/mediation-arbitration-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Mediation & Arbitration Cases',
        background: 'light',
        content: {
          text: 'Mediation is a process of dispute resolution in which an impartial third-party mediator assists two or more parties to reach a mutually acceptable agreement. This process helps the parties resolve their disputes without resorting to litigation or arbitration. It is often used in family disputes, business negotiations, and other areas of civil law. The mediator works with both sides to identify common interests, explore possible solutions, and develop strategies for reaching an agreement that all parties can accept. Mediation offers an effective alternative to the costly and time-consuming court system.\n\nArbitration is a form of alternative dispute resolution (ADR) that is used to settle disputes between two or more parties. It is a voluntary process that involves the parties in dispute appointing an independent arbitrator who will listen to their arguments and make a decision on the matter. The arbitrator\'s decision is legally binding and can be enforced by a court of law. Arbitration can be used in many different types of disputes, including those involving contracts, civil rights, family matters, business disputes, and personal injury claims.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 3,
        heading: 'Mediation & Arbitration Lawyer – Grover & Grover Advocates',
        background: 'light',
        content: {
          text: 'Mediation and arbitration are two methods of alternative dispute resolution (ADR) that can be used to resolve disputes without going to court. Mediation is a voluntary process in which an impartial third-party mediator helps the parties involved reach a mutually acceptable agreement. Arbitration is a more formal process in which an arbitrator hears evidence from both sides and then renders a binding decision. Both mediation and arbitration are designed to provide an effective, efficient, and cost-effective way for parties to resolve their disputes without having to go through the lengthy and expensive process of litigation.\n\nGrover & Grover Advocates specialise in helping clients navigate these processes, providing strategic legal advice, drafting agreements, and facilitating communication between parties to reach mutually beneficial outcomes.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 4,
        heading: 'Difference Between Mediation & Arbitration Cases',
        background: 'accent',
        content: {
          text: 'Mediation and arbitration are two forms of alternative dispute resolution (ADR) that can be used to settle disputes without going to court. Both processes involve an impartial third party who assists the parties in reaching a mutually acceptable agreement. The main difference between mediation and arbitration is that mediation is a voluntary process, while arbitration is a binding decision made by an arbitrator. Additionally, mediation focuses on finding common ground between parties, while arbitration involves making a decision based on the evidence presented.\n\nIn contrast, arbitration is a legal process in which an arbitrator makes a binding decision on the outcome of the dispute after hearing both sides of the argument. Both methods can be used to resolve disputes outside of court, but it is important to understand how each one works before choosing which one is best for your situation.\n\nMediation is a process of negotiation in which an impartial third party helps parties reach an agreement. The mediation process usually lasts at least three hours and involves making sure the parties are comfortable with what they are discussing before going any further. In order for mediation to take place, it must be voluntary on both sides, and all key stakeholders must agree on the process.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 5,
        heading: 'Benefits of Using Mediation & Arbitration to Resolve Matters',
        background: 'light',
        content: {
          items: [
            {
              title: 'Cost-Effective Solution',
              description: 'More cost-effective than going through the court system, saving both time and money for all parties involved.'
            },
            {
              title: 'Faster Resolution',
              description: 'Provides a faster solution compared to traditional litigation, allowing parties to resolve disputes efficiently.'
            },
            {
              title: 'Less Confrontational',
              description: 'Offers a less confrontational approach than court proceedings, helping preserve relationships between parties.'
            },
            {
              title: 'Greater Flexibility',
              description: 'Allows for greater flexibility in terms of the outcome as parties can negotiate their own settlement terms.'
            },
            {
              title: 'Privacy and Confidentiality',
              description: 'Both processes are confidential, protecting sensitive information from public disclosure.'
            },
            {
              title: 'Mutually Acceptable Outcomes',
              description: 'Enables parties to reach outcomes that both sides find acceptable without compromising on their interests or values.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 6,
        heading: 'Role of Lawyer in Mediation & Arbitration Cases',
        background: 'light',
        content: {
          description: 'Mediation and arbitration lawyers play an important role in these processes, as they provide legal counsel and advice to the parties involved in the dispute. Our lawyers help ensure that mediation and arbitration proceedings are conducted fairly and effectively by:',
          steps: [
            {
              title: 'Legal Counsel and Advice',
              description: 'Provide legal counsel and advice to parties involved in the dispute, helping them understand the process, their rights and obligations.'
            },
            {
              title: 'Risk Assessment',
              description: 'Help parties understand any potential risks or outcomes associated with their case.'
            },
            {
              title: 'Settlement Negotiation',
              description: 'Assist in negotiating settlements between parties to reach mutually beneficial agreements.'
            },
            {
              title: 'Legal Binding Agreements',
              description: 'Ensure that all agreements are legally binding and properly documented.'
            },
            {
              title: 'Conflict Prevention',
              description: 'Help prevent or resolve conflicts before they arise by facilitating communication between parties.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 7,
        heading: 'Documents Required to File a Case Related to Mediation & Arbitration',
        background: 'light',
        content: {
          text: 'In order to ensure that the process runs smoothly, it is important to have the right documents in place. The various documents required for mediation and arbitration include contracts, affidavits, and other legal documents.\n\nMandatory Contract for Mediation and Arbitration: Under the Federal Rules of Civil Procedure, the parties must enter into a written contract for mediation and arbitration. This document outlines how the parties expect to resolve their dispute. The contract also describes who will do what, with whom they will meet, how long it will take to complete the mediation or arbitration process, and any other key details. The contract can be signed by both parties (or their representative) in front of an attorney or a notary public if necessary.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 8,
        heading: 'How Grover & Grover, Advocates Help in Mediation & Arbitration Cases',
        background: 'accent',
        content: {
          text: 'Grover & Grover, Advocates and Solicitors, is a law firm that specialises in assisting clients with mediation and arbitration. By leveraging their expertise in the field of dispute resolution, they are able to provide clients with the necessary legal advice and representation to help them achieve a successful outcome. With their experience in mediation and arbitration, they are able to provide strategic advice on how best to approach disputes as well as assistance throughout the entire process. In addition, they can also help by facilitating negotiations between parties in order to reach a mutually beneficial agreement.\n\nThe decision to mediate a dispute is often best made when the parties have already tried and failed to reach an agreement. Mediation is also beneficial when there are many issues at stake, such as land disputes, or if one party does not have the means to hire a private attorney.'
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 9,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'What is mediation and arbitration?',
              answer: 'Mediation is a process in which a neutral third party helps parties in a dispute reach a mutually agreeable resolution. Arbitration is a process in which a neutral third party acts as a judge and makes a binding decision on the dispute.'
            },
            {
              question: 'What are the benefits of mediation and arbitration?',
              answer: 'Mediation and arbitration are often faster and less expensive than going to court. They also allow the parties to have more control over the outcome of the dispute and can be more flexible than court proceedings. Additionally, they can be less adversarial and may preserve relationships between parties.'
            },
            {
              question: 'When is mediation or arbitration appropriate?',
              answer: 'Mediation or arbitration may be appropriate in any situation where there is a dispute that needs to be resolved, such as in commercial disputes, family law disputes, and personal injury cases. It may be particularly helpful when the parties want to avoid the expense and stress of a court trial, or when they want to preserve a relationship or business arrangement.'
            },
            {
              question: 'How do I find a mediator or arbitrator?',
              answer: 'You can find a mediator or arbitrator by contacting local organizations that provide alternative dispute resolution services or contacting a private mediator or arbitrator. It\'s important to find someone who is qualified and experienced in the type of dispute you have.'
            },
            {
              question: 'How long does mediation or arbitration take?',
              answer: 'The length of mediation or arbitration depends on the complexity of the dispute and the willingness of the parties to reach an agreement. Mediation can typically be completed in a few hours or days, while arbitration may take several weeks or months.'
            },
            {
              question: 'Is the decision binding in arbitration?',
              answer: 'Yes, the decision in arbitration is typically binding and can only be appealed under certain circumstances. This means that the parties must comply with the decision, unlike in mediation where the parties can choose whether or not to reach an agreement.'
            },
            {
              question: 'Is mediation or arbitration confidential?',
              answer: 'Yes, both mediation and arbitration are confidential processes. This means that the discussions and decisions made during the process cannot be disclosed to third parties without the parties\' consent.'
            },
            {
              question: 'How much does mediation or arbitration cost?',
              answer: 'The cost of mediation or arbitration varies depending on the complexity of the dispute and the fees charged by the mediator or arbitrator. However, these processes are generally less expensive than going to court.'
            },
            {
              question: 'Do I need a lawyer for mediation or arbitration?',
              answer: 'While you don\'t necessarily need a lawyer for mediation or arbitration, it\'s often helpful to have legal representation to ensure that your rights and interests are protected. Additionally, some disputes may require legal expertise to resolve effectively.'
            },
            {
              question: 'How successful are mediation and arbitration?',
              answer: 'Mediation and arbitration can be very successful in resolving disputes, with a high percentage of cases resulting in a settlement or decision. However, the success of the process depends on the willingness of the parties to work together and reach an agreement.'
            },
            {
              question: 'How does mediation work?',
              answer: 'In mediation, a neutral third party called a mediator works with the parties to help them identify and explore their interests and goals, and to develop options for resolving the dispute. The mediator does not make a decision or impose a solution, but rather facilitates communication and negotiation between the parties.'
            },
            {
              question: 'How does arbitration work?',
              answer: 'In arbitration, a neutral third party called an arbitrator acts as a judge and makes a decision that is binding on the parties. The arbitrator may hear testimony and receive evidence from the parties, and may issue a written decision that explains the reasoning behind the decision.'
            },
            {
              question: 'What are the differences between mediation and arbitration?',
              answer: 'Mediation is a non-binding process that focuses on helping the parties reach a mutually agreeable resolution. Arbitration is a binding process in which a neutral third party makes a decision that is final and enforceable. Additionally, mediation is often more informal and flexible than arbitration.'
            },
            {
              question: 'Can mediation and arbitration be used together?',
              answer: 'Yes, in some cases, mediation and arbitration can be used together in what is called "med-arb." In this process, the parties first attempt to resolve the dispute through mediation, but if they are unable to reach an agreement, they proceed to arbitration.'
            },
            {
              question: 'What are the qualifications for a mediator or arbitrator?',
              answer: 'The qualifications for a mediator or arbitrator vary depending on the jurisdiction and the type of dispute. In general, a mediator or arbitrator should have training and experience in alternative dispute resolution, as well as knowledge of the legal issues related to the dispute.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 10,
        heading: 'Need Expert Mediation & Arbitration Services?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional mediation and arbitration services in Delhi.',
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
        title: 'Mediation & arbitration Lawyer in Delhi – GAG Lawyers',
        description: 'Mediation & arbitration Lawyer in Delhi – GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
        keywords: 'Mediation & Arbitration Lawyer near me, Best Mediation & Arbitration Lawyer near me, Mediation & Arbitration Lawyer for divorce in Delhi, Mediation & Arbitration Lawyer for Child Custody in Delhi, Best divorce lawyers for Mediation Lawyer in Delhi, Top Arbitration Lawyer in India, Best Arbitration Lawyer near me, Arbitration lawyer near me, Arbitration Lawyer fees in Delhi, Mediation Lawyer fees in Delhi, divorce mediation attorney near me, divorce mediation lawyer near me, Mediation & Arbitration Lawyer in Delhi'
      }
    });

    console.log(`✅ Mediation & Arbitration Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importMediationArbitrationService();
