require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importMotorAccidentService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Motor Accident/i });
    
    if (!service) {
      console.error('❌ Motor Accident service not found in database');
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
        heading: 'Motor Accident MACT Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Representation for Motor Accident Claims',
          description: 'We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
          image: '/images/motor-accident-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Motor Accident Cases',
        background: 'light',
        content: {
          text: 'Motor accident law in India is a set of laws and regulations that govern the rights and responsibilities of individuals involved in motor vehicle accidents. These laws are designed to protect people from injury, property damage, and financial loss due to motor vehicle accidents. They also provide a legal framework for resolving disputes between parties involved in an accident. Motor Accident law in India is constantly evolving as new technologies and vehicles become available, making it important for individuals to stay informed about their rights and responsibilities when it comes to motor vehicle accidents.\n\nThe Motor Vehicles Act is designed to regulate the manufacturing and use of vehicles in India, while penal code applies to actions committed by people who are driving or riding a vehicle. The Indian Penal Code also governs other offenses connected with motor vehicles such as causing death through rash driving, driving without license, driving without insurance, drunk-driving, and vehicular manslaughter.\n\nMotor Accident Law in India governs the rights and liabilities of parties involved in a motor vehicle accident. It covers the liability of the parties involved, compensation to victims, insurance, and other related matters. Under the Motor Vehicles Act of 1988, it is mandatory for all motor vehicles to be insured to protect the interests of the parties involved in case of an accident.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 3,
        heading: 'Rules and Regulations for Victim of Motor Accidents',
        background: 'light',
        content: {
          text: 'Motor accidents in India are unfortunately a leading cause of death and injury. It is crucial to have a thorough understanding of the compensation rules and regulations for victims in such cases. Compensation rules and regulations for motor accident victims in India can be found in Sections 17, 19, 20, and 21 of the Motor Vehicles Act. These sections provide the legal framework through which victims can seek compensation after a motor accident occurs.\n\nVictims have the option to take civil action against any party responsible for their injuries or death due to negligence or violation of traffic rules. Section 17 allows for action based on negligent driving resulting in an accident, while Section 20 deals with unsafe driving causing an accident.\n\nTo handle claims from motor accident victims, there is a legal body known as the Motor Accident Claims Tribunal (MACT). Victims are entitled to reimbursement for medical costs, loss of income, and mental anguish.'
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 4,
        heading: 'Steps to Claim Compensation After a Motor Accident',
        background: 'light',
        content: {
          description: 'Accidents on the road can be incredibly traumatic, causing both physical and emotional damage. Individuals involved can consult a Motor Accident Lawyer in Delhi to claim compensation from insurance companies or through the court. Steps include:',
          steps: [
            {
              title: 'File an FIR',
              description: 'First Information Report must be lodged immediately after the accident.'
            },
            {
              title: 'Gather Evidence',
              description: 'Collect photos, medical certificates, and witness statements to support your claim.'
            },
            {
              title: 'Inform Insurance Company',
              description: 'Submit all relevant documents to the insurance company promptly.'
            },
            {
              title: 'Engage Legal Representation',
              description: 'Hiring a lawyer for accident case is highly recommended to navigate the legal process.'
            },
            {
              title: 'File Your Claim',
              description: 'Complete tribunal filings for MACT case procedure in Delhi.'
            },
            {
              title: 'Negotiate',
              description: 'Your lawyer negotiates for maximum compensation on your behalf.'
            },
            {
              title: 'Receive Compensation',
              description: 'Insurance company releases the agreed-upon compensation amount.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 5,
        heading: 'Legal Provisions Related to Road Safety & Rules Violation',
        background: 'accent',
        content: {
          text: 'The Motor Vehicles Act of 1988, the Motor Vehicle (Amendment) Act 2019, Central Motor Vehicle Rules 1989, and Motor Vehicles (Insurance) Act 1938 govern road safety and enforce penalties for violations. MACT Tribunal is specifically empowered under the Motor Accident Claims Tribunal (MACT) Act 1988 to settle claims.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 6,
        heading: 'Role of Motor Accident Lawyer in Delhi in Motor Accident Cases',
        background: 'light',
        content: {
          text: 'Motor Accident Lawyer in Delhi and Motor Accident Advocate in Delhi play a critical role in assisting victims. They provide legal guidance, help collect evidence, file claims, and represent victims in court. For those involved in complex cases like truck collisions, consulting Truck accident lawyers or Lawyers for auto accidents is recommended.\n\nThe maximum compensation for death is Rs 4.5 lakhs and for permanent total disability is Rs 1.5 lakhs. Lawyers ensure victims know their rights and act promptly in filing claims.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 7,
        heading: 'Documents Required to Claim Compensation',
        background: 'light',
        content: {
          items: [
            {
              title: 'Accident Report',
              description: 'Official accident report from the police or relevant authorities.'
            },
            {
              title: 'Vehicle Registration Papers',
              description: 'Registration documents of all vehicles involved in the accident.'
            },
            {
              title: 'Medical Bills',
              description: 'All medical expenses, treatment records, and hospital bills.'
            },
            {
              title: 'Insurance Papers',
              description: 'Insurance policy documents of the vehicles involved.'
            },
            {
              title: 'Photographs',
              description: 'Photos of the accident scene, vehicle damage, and injuries.'
            },
            {
              title: 'Witness Statements',
              description: 'Statements from eyewitnesses who saw the accident occur.'
            },
            {
              title: 'Police Statements',
              description: 'Official statements recorded by the police.'
            },
            {
              title: 'Legal Documents',
              description: 'Any other relevant legal documents pertaining to the case.'
            },
            {
              title: 'Death Certificate',
              description: 'Death certificate if the accident resulted in fatality.'
            },
            {
              title: 'Claim Form',
              description: 'Completed claim form as required by the tribunal or insurance company.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 8,
        heading: 'How Grover & Grover, Advocates Help in Motor Accident Cases',
        background: 'accent',
        content: {
          text: 'Grover & Grover, Advocates and Solicitors assist in Motor Accident Cases by providing legal advice, drafting documents, negotiating with insurers, and representing victims in MACT proceedings. They also provide support to victims to maximize compensation and ensure justice is served. Our experienced team handles all aspects of motor accident claims, from initial consultation to final settlement.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 9,
        heading: 'Popular Cases of Supreme Court and High Courts',
        background: 'light',
        content: {
          items: [
            {
              title: 'Jacob Mathew v. State of Punjab (2005)',
              description: 'This case established a standard for determining medical negligence, including cases arising from motor accidents involving injuries requiring medical attention.'
            },
            {
              title: 'S. Rajaseekaran v. Union of India (2014)',
              description: 'The court addressed the often overlooked aspect of loss of consortium in motor accident cases, emphasizing the need for fair compensation.'
            },
            {
              title: 'Naveen Kumar v. Vijay Kumar (2018)',
              description: 'This judgment redefined the legal parameters of hit and run offenses, clarifying the responsibilities of the parties involved and establishing liability.'
            },
            {
              title: 'Rajiv Kumar v. State of Maharashtra (Bombay High Court, 2011)',
              description: 'This case laid down guidelines for accident investigations, emphasizing the importance of thorough and unbiased inquiries in determining liability.'
            },
            {
              title: 'Vidya Devi v. United Insurance Co. Ltd. (Delhi High Court, 2015)',
              description: 'The Delhi High Court broadened the scope of third-party liability, addressing the responsibilities of entities beyond the driver involved in a motor accident.'
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
              question: 'What is a motor accident case in India?',
              answer: 'A motor accident case in India is a legal dispute arising from a road accident involving motor vehicles, resulting in injury or property damage.'
            },
            {
              question: 'Who can file a motor accident case in India?',
              answer: 'Any person who has been injured or suffered property damage as a result of a motor accident can file a motor accident case in India. This includes drivers, passengers, and pedestrians.'
            },
            {
              question: 'What is the role of a Motor Accident Lawyer in Delhi in India?',
              answer: 'The role of a Motor Accident Lawyer in Delhi is to represent clients in motor accident cases and help them to obtain fair compensation for their losses. They can provide legal advice, negotiate with insurance companies, and represent clients in court.'
            },
            {
              question: 'How much compensation can I receive for a motor accident case in India?',
              answer: 'The compensation amount for a motor accident case in India varies depending on the severity of the injury and the extent of property damage. The Motor Vehicles Act, 1988, provides for a maximum compensation amount of Rs. 50 lakh in case of death and Rs. 10 lakh in case of permanent disability.'
            },
            {
              question: 'Can I claim compensation for a hit-and-run motor accident in India?',
              answer: 'Yes, a person can claim compensation for a hit-and-run motor accident in India. The Motor Vehicles Act provides for a Motor Accident Claims Tribunal (MACT) to handle such cases and compensate the victim from the Solarium Fund.'
            },
            {
              question: 'How can I prove fault in a motor accident case in India?',
              answer: 'Proving fault in a motor accident case in India involves collecting and presenting evidence such as eyewitness testimony, police reports, and medical records. The burden of proof is on the person making the claim to establish that the other party was at fault.'
            },
            {
              question: 'How long does it take to resolve a motor accident case in India?',
              answer: 'The time taken to resolve a motor accident case in India varies depending on the complexity of the case and the court\'s workload. It can take anywhere from a few months to several years.'
            },
            {
              question: 'Can I file a motor accident case if I was partially at fault?',
              answer: 'Yes, a person can file a motor accident case in India even if they were partially at fault. However, the compensation amount may be reduced proportionately to the level of their fault.'
            },
            {
              question: 'What documents are required to file a motor accident case in India?',
              answer: 'The documents required to file a motor accident case in India include a copy of the FIR, medical reports, insurance policy details, and any other evidence supporting the claim.'
            },
            {
              question: 'Can I settle a motor accident case outside of court in India?',
              answer: 'Yes, a motor accident case in India can be settled outside of court through negotiations between the parties involved. However, it is advisable to consult a Motor Accident Lawyer before agreeing to any settlement terms.'
            },
            {
              question: 'What is the statute of limitations for filing a motor accident case in India?',
              answer: 'The statute of limitations for filing a motor accident case in India is three years from the date of the accident. After this period, the claim may be time-barred and cannot be pursued.'
            },
            {
              question: 'What is the difference between a civil and criminal motor accident case in India?',
              answer: 'The main difference is that a civil case seeks compensation for damages suffered by the victim, while a criminal case seeks punishment for the at-fault driver. Criminal cases are initiated by the State, while civil cases are initiated by the victim.'
            },
            {
              question: 'How can I choose the best Motor Accident Lawyer in Delhi in India?',
              answer: 'To choose the best Motor Accident Lawyer in Delhi, you can look for factors such as experience, expertise, track record, communication skills, and cost.'
            },
            {
              question: 'What factors affect the compensation amount in a motor accident case in India?',
              answer: 'The factors that affect the compensation amount include the severity of the injuries, extent of property damage, medical expenses, loss of income, and disability.'
            },
            {
              question: 'What are the common causes of motor accidents in India?',
              answer: 'The common causes of motor accidents in India include reckless driving, speeding, drunk driving, poor road conditions, and lack of traffic regulations.'
            },
            {
              question: 'What happens if the driver at fault in a motor accident case is uninsured?',
              answer: 'If the driver at fault is uninsured, the victim can still claim compensation through the Motor Vehicles Act provisions.'
            },
            {
              question: 'Can I file a motor accident case against a government vehicle in India?',
              answer: 'Yes, a person can file a motor accident case against a government vehicle in India, but the procedure and compensation may differ from private vehicles.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 11,
        heading: 'Need Legal Help with Motor Accident Claims?',
        background: 'dark',
        content: {
          description: 'Contact Grover & Grover, Advocates and Solicitors for expert legal representation in motor accident cases.',
          buttonText: 'Get Legal Consultation',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    await ServiceSection.insertMany(sections);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, {
      seo: {
        title: 'Motor Accident Mact Lawyer in Delhi - GAG Lawyers',
        description: 'Motor Accident Mact Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
        keywords: 'mact Lawyer near me, mact Lawyer fees in Delhi, mact advocate near me, compensation lawyers near me, compensation lawyers in Delhi, lawyer for accident case near me, attorneys for accident cases in Delhi, dar in mact cases in Delhi, mact case procedure in Delhi, Motor Accident Lawyer in Delhi, Motor Accident Advocate in Delhi, Best mact Lawyers in Delhi, Best mact Lawyer near me, Truck accident lawyers near me, Lawyers for auto accidents near me'
      }
    });

    console.log(`✅ Motor Accident MACT Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importMotorAccidentService();
