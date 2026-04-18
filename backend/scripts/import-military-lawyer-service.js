require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'military-lawyer',
  name: 'Military Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Military Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Representation for Military Law Cases in India',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Military Cases',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A military lawyer must possess a thorough understanding of the laws and regulations surrounding military law and military cases. A military lawyer must also be well-versed in the evidence required to support our clients\' positions and have the skills to construct compelling cases by collecting facts, conducting witness interviews, and researching military legal precedents relevant to the case.\n\nMilitary law in India is a branch of criminal law that is applicable to personnel of the Indian Armed Forces. It is regulated by the Armed Forces Tribunal Act, 2007 and the Army Act, 1950. It covers a wide range of offences, from minor disciplinary offences to more serious offences such as desertion, mutiny, and treason.\n\nThe system of military law in India is based on English common law and is administered by various military tribunals. These tribunals are headed by a judge of the rank of Major General and are responsible for trying offences committed by members of the armed forces. The tribunals have the power to impose punishments such as imprisonment, fines, dismissal from service, and reduction in rank.'
      }
    },
    {
      type: 'overview',
      heading: 'Military Offences and Court Martial',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Military offences are divided into two categories: summary offences and offences under the Army Act. Summary offences are minor offences such as disobedience and misconduct and are usually tried by a commanding officer. Offences under the Army Act are more serious offences, such as desertion, mutiny, and treason. These offences are tried by the court martial.\n\nThe court-martial is a judicial tribunal consisting of military personnel, headed by a judge advocate. The court-martial has the power to impose punishments such as imprisonment, fines, dismissal from service, and reduction in rank. The punishments imposed by the court-martial are subject to review by the Armed Forces Tribunal.\n\nMilitary law in India is an important part of the Indian Armed Forces and is used to maintain discipline and order in the ranks. It is important to note that the application of military law in India is subject to the provisions of the Constitution of India and is not absolute. The military justice system in India is subject to the same rules of natural justice and procedural fairness as any other criminal justice system.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes Under Military Law',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Civil Disputes',
            description: 'Civil disputes under military law involve matters such as contracts, property rights, and settlements. These disputes are usually settled by a court martial presided over by a senior officer and made up of other officers of the same rank as the accused. The court martial can impose punishments such as fines, imprisonment, and dismissal from service.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Disputes',
            description: 'Criminal disputes involve offences such as desertion, mutiny, disobedience, and adultery. These offences are punishable by a court martial which can impose punishments such as death, imprisonment, forfeiture of pay, and dismissal from service.'
          },
          {
            icon: 'CheckCircle',
            title: 'Civilian Personnel Cases',
            description: 'Military law also applies to civilian personnel working in military areas or on military projects. These personnel are subject to the same laws and regulations as members of the armed forces and can be subject to court martial for offences such as espionage, sabotage, and treason.'
          },
          {
            icon: 'CheckCircle',
            title: 'IPC Offences',
            description: 'Military law also applies to civilians charged with offences under the Indian Penal Code. These offences are usually tried in a civil court but may be referred to a court martial in certain circumstances. The court martial has the same powers as a civil court and can impose punishments such as fines, imprisonment, and even execution.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Military Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Fair Trial',
            description: 'Military personnel have the right to be brought before a court for trial for any offence committed. The Army Act, 1950 provides for the right to be defended by a legal representative during court proceedings and protects military personnel from being subjected to any cruel, inhuman, or degrading treatment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Obligation to Obey Orders',
            description: 'Military personnel are obligated to obey all orders given to them by their superiors. The Act requires military personnel to be loyal to their superiors and to the nation, maintain the highest standards of discipline, and perform their duties in accordance with prescribed regulations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Appeal',
            description: 'The Army Act provides for the right to appeal against any order or decision made by the military authorities. Military personnel have the right to legal representation during court proceedings and the protection of their rights to be given a fair trial.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protection of Rights',
            description: 'The Act provides comprehensive protection of the rights of military personnel including the right to appeal, right to legal representation, and the right to a fair trial in accordance with principles of natural justice and procedural fairness.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment in Military Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'The Indian military is subject to the Armed Forces Act, 1950, which acts as the primary source of military law in India. The Act provides for punitive measures for offences committed by members of the armed forces, with the intent of ensuring discipline and maintaining order in the military.\n\nMilitary offences are divided into two categories: minor offences and serious offences. Minor offences may include failure to obey orders, absence without leave, or insubordination. For these, punishment may include a reprimand, forfeiture of pay, or reduction in rank.\n\nSerious offences may include desertion, mutiny, or other acts of violence. For these, a court-martial may be convened, and the accused may be subject to imprisonment, dishonourable discharge, or even the death penalty. A member found guilty of a serious offence may also be subjected to "cashiering" or dismissal from service.\n\nIn addition to these punishments, a member of the armed forces may be subject to forfeiture of privileges such as the right to vote or hold public office. In extreme cases, a member may be stripped of medals or decorations and barred from re-enlistment. Members may also face disciplinary action for offences committed outside of military service, including criminal or civil offences.'
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Military Lawyer',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'Military lawyers are the legal representatives of armed forces personnel, responsible for providing legal advice and support to members of the military. They represent military personnel before various tribunals, courts, and other forums in cases related to military law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Military Justice Process',
            description: 'Military lawyers play an important role in the process of military justice by representing accused military personnel in court, presenting evidence and material in support of the accused, and filing appeals and petitions in higher courts and tribunals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Research and Documentation',
            description: 'Military lawyers conduct legal research and prepare legal documents related to military law. They must be well versed in laws and regulations related to the military and able to interpret and apply them to protect their clients\' interests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Resolution',
            description: 'Military lawyers handle various types of disputes between members of the military, including disputes related to pay, benefits, entitlements, and disciplinary action. They ensure that the rights of the accused are respected and that they receive a fair and just trial.'
          },
          {
            icon: 'CheckCircle',
            title: 'Civil Matters Advice',
            description: 'Military lawyers provide legal advice to members of the armed forces on various civil matters. They are knowledgeable about civil laws that apply to armed forces personnel and provide legal assistance to protect their rights in civil matters.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure for Filing a Military Law Case',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Collect Relevant Documents',
            description: 'Gather all relevant documents including enlistment papers, discharge certificate, service record book, court martial orders, and any other documents required for filing the case in court.'
          },
          {
            stepNumber: 2,
            title: 'Determine Appropriate Court',
            description: 'Determine the court of law in which to file the case. The Supreme Court of India is the highest court of appeal for all matters related to military law. You can also approach the High Court in the respective state to file the case.'
          },
          {
            stepNumber: 3,
            title: 'Prepare and Submit Petition',
            description: 'Prepare the petition containing all relevant facts and arguments related to the case. The petition should include all documents required by the court for deciding the case. Submit the petition to the appropriate court.'
          },
          {
            stepNumber: 4,
            title: 'Court Hearing',
            description: 'The court will issue a notice to the other party in the case. Both parties will be asked to present their arguments. The court will hear arguments from both parties and decide the case based on the evidence and arguments presented.'
          },
          {
            stepNumber: 5,
            title: 'Appeal Process',
            description: 'After the court delivers its judgement, parties may appeal the judgement to higher courts as per provisions of law. The higher court may set aside or modify the judgement of the lower court if it finds any errors. The case is finally settled after the higher court delivers its judgement.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases in Military Law',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Ministry of Defence v. Babita Puniya & Ors (2007)',
            description: 'The Supreme Court held that the right to equality and non-discrimination is a fundamental right available to all citizens of India, and it is the duty of the state to ensure that members of the armed forces are not discriminated against in the provision of benefits and services.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lt. Col. B.R. Singh & Ors v. Union of India & Ors (2008)',
            description: 'The Supreme Court held that the "right to life" is a fundamental right and that the armed forces should not be subjected to arbitrary punishments. The right to life includes the right to be treated with dignity and respect and the right to be free from cruel, inhuman, and degrading treatment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Lt. Col. M.M. Arora v. Union of India (2009)',
            description: 'The Supreme Court held that the "right to be heard" is a fundamental right and that members of the armed forces are entitled to a fair hearing and due process of law before any disciplinary action is taken against them.'
          },
          {
            icon: 'CheckCircle',
            title: 'R.K. Anand v. Union of India (2011)',
            description: 'The Supreme Court held that the "right to fair compensation" is a fundamental right and that the armed forces are entitled to compensation for death or disability incurred while in the service of the nation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ranjit Thakur v. Union of India (2016)',
            description: 'The Supreme Court held that the "right to service conditions" is a fundamental right and that members of the armed forces are entitled to reasonable service conditions and fair remuneration for their services.'
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
            question: 'What is a military case?',
            answer: 'A military case is a legal proceeding in which a member of the military is accused of a crime under the Uniform Code of Military Justice (UCMJ) or in India, under the Army Act, 1950, Air Force Act, 1950, or Navy Act, 1957. These cases involve offences committed by military personnel and are tried in military tribunals or courts martial.'
          },
          {
            question: 'What types of cases are heard in military court?',
            answer: 'Military courts hear cases involving offences under military law including desertion, mutiny, disobedience of orders, absence without leave, insubordination, adultery, treason, espionage, sabotage, and other violations of military discipline. They also handle civil disputes related to contracts, property rights, and settlements involving military personnel.'
          },
          {
            question: 'Who decides military cases?',
            answer: 'Military cases are decided by courts martial, which are judicial tribunals consisting of military personnel headed by a judge advocate. For minor offences, a commanding officer may decide summary offences. More serious cases are tried by courts martial, and their decisions can be reviewed by the Armed Forces Tribunal. Appeals can be made to High Courts and the Supreme Court of India.'
          },
          {
            question: 'How is a court-martial conducted?',
            answer: 'A court-martial is conducted as a formal judicial proceeding with a presiding officer (judge advocate) and panel of military officers. The accused is informed of charges, has the right to legal representation, evidence is presented by both prosecution and defense, witnesses are examined and cross-examined, and the panel deliberates to reach a verdict. If found guilty, the court-martial determines the appropriate punishment.'
          },
          {
            question: 'What are the different types of court-martial?',
            answer: 'In India, there are three types of courts martial: Summary Court Martial (for minor offences with limited punishment powers), District Court Martial (for intermediate offences), and General Court Martial (for serious offences with full powers including death penalty). The type of court martial depends on the severity of the offence and the rank of the accused.'
          },
          {
            question: 'What rights do military personnel have in a court-martial?',
            answer: 'Military personnel have the right to be informed of charges, right to legal representation, right to present evidence and call witnesses, right to cross-examine prosecution witnesses, right to a fair and impartial trial, right to appeal the decision, protection from cruel and degrading treatment, and the right to be treated with dignity and respect throughout the proceedings.'
          },
          {
            question: 'Can a civilian attorney represent a military member in a court-martial?',
            answer: 'Yes, a military member can be represented by a civilian attorney in a court-martial, in addition to or instead of military defense counsel. The civilian attorney must be qualified to practice law and may need to be approved by the convening authority. Many military personnel choose experienced civilian military lawyers for complex cases.'
          },
          {
            question: 'What happens if a military member is found guilty in a court-martial?',
            answer: 'If found guilty, the court-martial will determine the punishment which may include reprimand, forfeiture of pay, reduction in rank, confinement/imprisonment, dismissal from service, dishonorable discharge, or in extreme cases, the death penalty. The convicted member may also lose certain privileges such as the right to vote or hold public office, and may be stripped of medals or decorations.'
          },
          {
            question: 'Can a military case be appealed?',
            answer: 'Yes, military cases can be appealed. Decisions of courts martial are subject to review by the Armed Forces Tribunal. Further appeals can be made to the High Court and ultimately to the Supreme Court of India. The appellate courts can set aside, modify, or uphold the lower court\'s decision based on errors of law or fact.'
          },
          {
            question: 'How does a military case differ from a civilian case?',
            answer: 'Military cases are governed by military law (Army Act, Air Force Act, Navy Act) rather than civilian criminal law, tried in military tribunals rather than civilian courts, involve military-specific offences, have different procedural rules, and are subject to military chain of command. However, military justice must still comply with constitutional principles of natural justice and procedural fairness.'
          },
          {
            question: 'What is the role of a military defense attorney in a court-martial?',
            answer: 'A military defense attorney represents the accused military member, investigates the charges and gathers evidence, interviews witnesses, challenges prosecution evidence, presents defense evidence and arguments, cross-examines prosecution witnesses, advises the accused on legal rights and options, negotiates with prosecutors when appropriate, and files appeals if necessary. They ensure the accused receives a fair trial and their rights are protected.'
          },
          {
            question: 'What is the role of a military prosecutor in a court-martial?',
            answer: 'A military prosecutor (also called Judge Advocate General or JAG officer) represents the government/military in prosecuting the case. They investigate alleged offences, gather evidence, interview witnesses, prepare charges, present evidence and arguments in court, examine witnesses, prove the case beyond reasonable doubt, and recommend appropriate punishment if the accused is found guilty.'
          },
          {
            question: 'What is the burden of proof in a military case?',
            answer: 'In military criminal cases, the burden of proof is on the prosecution to prove the accused guilty "beyond reasonable doubt," the same standard as in civilian criminal cases. This is a high standard requiring the prosecution to present sufficient evidence that leaves no reasonable doubt in the minds of the court martial panel about the accused\'s guilt.'
          },
          {
            question: 'Can a military member be discharged from the military as a result of a court-martial?',
            answer: 'Yes, a military member can be discharged from the military as a result of a court-martial conviction. Depending on the severity of the offence, the discharge may be honorable, general, or dishonorable. Dismissal from service or dishonorable discharge can have serious consequences including loss of benefits, difficulty finding employment, and social stigma.'
          },
          {
            question: 'How can a military member facing a court-martial obtain legal representation?',
            answer: 'A military member facing court-martial can obtain legal representation through: military-appointed defense counsel (provided free of charge), hiring a civilian military lawyer at their own expense, or a combination of both. It is advisable to consult with an experienced military lawyer as soon as charges are filed or investigation begins. Contact GAG Lawyers for expert military law representation.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Military Law Representation?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional military law services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Military Lawyer in Delhi - Court Martial Defense | GAG Lawyers',
    metaDescription: 'Expert military law services in Delhi. Experienced military lawyers for court martial defense, Armed Forces Tribunal cases, and military justice matters.'
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
