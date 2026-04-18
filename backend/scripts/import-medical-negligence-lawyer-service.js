require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'medical-negligence-lawyer',
  name: 'Medical Negligence Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Medical Negligence Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Medical Negligence Cases',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Medical Negligence Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'As a medical negligence lawyer, it is essential to possess a comprehensive understanding of the laws and regulations that govern medical negligence cases. A lawyer must possess the skills to build persuasive cases by conducting interviews, gathering facts, and researching relevant legal precedents within the field of medical negligence law.\n\nMedical negligence in India is defined as a situation in which a medical professional or healthcare provider fails to provide a standard of care that a reasonable medical professional would have provided under similar circumstances. It may result in serious medical complications, injury, or even death. It is important to note that medical negligence is different from medical malpractice, which is professional misconduct or negligence that is intentional or reckless.'
      }
    },
    {
      type: 'overview',
      heading: 'Medical Negligence in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'It is estimated that medical negligence accounts for around four per cent of all deaths in India each year. This figure is even higher in rural areas, where access to healthcare is limited and the quality of care provided by healthcare providers is often substandard. Medical negligence can be attributed to a variety of factors, including inadequate training, a lack of resources, and poor communication between patients and healthcare providers.\n\nIn recent years, there has been an increase in awareness about medical negligence among both patients and healthcare providers, but much more needs to be done to reduce its prevalence across the country. Medical negligence is a form of medical misconduct that is defined as the failure of a healthcare provider to use his or her skills and knowledge in an appropriate manner.'
      }
    },
    {
      type: 'benefits',
      heading: 'Different Types of Medical Negligence',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Misdiagnosis',
            description: 'When a medical professional misidentifies a patient\'s condition or fails to diagnose an illness altogether. Signs include a delay in diagnosis or failure to order necessary tests.'
          },
          {
            icon: 'CheckCircle',
            title: 'Surgical Errors',
            description: 'When a medical professional makes an error during a surgical procedure, such as leaving an instrument inside the body or performing the wrong surgery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Anaesthesia Errors',
            description: 'Occur when an anesthesiologist administers an incorrect dose of anaesthesia or fails to monitor a patient\'s vital signs during surgery.'
          },
          {
            icon: 'CheckCircle',
            title: 'Birth Injury',
            description: 'Occurs when a medical professional fails to properly monitor a mother and baby during labour and delivery, resulting in the baby being injured.'
          },
          {
            icon: 'CheckCircle',
            title: 'Medication Errors',
            description: 'Occur when a medical professional prescribes the wrong medication or an incorrect dosage of medication to a patient.'
          },
          {
            icon: 'CheckCircle',
            title: 'Laboratory Errors',
            description: 'Occur when a laboratory technician or other medical professional mishandles a patient\'s sample or incorrectly interprets the results of a test.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        body: 'Medical negligence cases are a serious issue in India, and the charges, penalties, and punishments associated with them can be severe. Depending on the severity of the case, doctors can face a range of penalties, including fines, jail time, suspension of their medical license, and more. In some cases, they may even be held liable for damages caused by their negligence.\n\nThe charges and penalties for medical negligence cases in India vary depending on the nature and severity of the case. In some cases, the doctor may be found guilty of negligence and be liable to pay damages to the victim. In more serious cases, the doctor may be charged with criminal negligence and face imprisonment. The maximum punishment for medical negligence in India is imprisonment for up to seven years and/or a fine.\n\nThe Indian Penal Code also states that any person who causes death by negligence can be charged with culpable homicide, which carries a maximum sentence of life imprisonment. In addition, if the negligence is proven to be deliberate or intentional, the doctor can be charged with murder, which carries a maximum sentence of death.'
      }
    },
    {
      type: 'benefits',
      heading: 'Legal Remedies Available',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Refund of Medical Expenses',
            description: 'The complainant can claim a refund of the medical expenses incurred for the negligent treatment of the medical practitioner.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensatory Damages',
            description: 'The complainant can claim monetary compensation for the physical and mental harm caused by the medical negligence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Punitive Damages',
            description: 'The complainant can claim punitive damages from the medical practitioner or hospital in cases where the negligence is gross and goes beyond ordinary negligence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Injunctive Relief',
            description: 'The complainant can seek an injunction or restraining order to prevent the medical practitioner or hospital from continuing the negligent treatment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Declaratory Relief',
            description: 'The complainant can seek a declaration from the court declaring the medical practitioner or hospital guilty of medical negligence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Apology',
            description: 'In some cases, the court may order the medical practitioner or hospital to issue an apology to the complainant.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Medical Negligence Lawyers',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'In India, medical negligence cases are handled by lawyers specializing in medical negligence cases. Medical negligence lawyers provide legal advice and representation to people who have been injured due to medical negligence. They are responsible for representing the victims in court and making sure that they receive the compensation they deserve.\n\nMedical negligence lawyers also provide legal advice to victims, helping them understand their rights and how to pursue their claims. Furthermore, a medical negligence lawyer can help victims take action against negligent healthcare providers by filing lawsuits or initiating arbitration proceedings. A medical negligence lawyer can help victims understand the complexities of the medical negligence laws in India and navigate the legal system.\n\nMedical negligence lawyers can provide legal advice and assistance in filing a medical negligence claim, help the victim collect evidence, understand the process, and navigate the court system. They can also provide effective representation in negotiations with doctors, healthcare providers, and insurance companies.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Medical Negligence Case',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Seek Medical Advice',
            description: 'Consult a qualified medical professional to obtain an opinion on the medical negligence that has occurred.'
          },
          {
            stepNumber: 2,
            title: 'Research the Law',
            description: 'Research the applicable laws and regulations regarding medical negligence.'
          },
          {
            stepNumber: 3,
            title: 'Prepare the Complaint',
            description: 'Draft a complaint outlining the facts of the case and the alleged medical negligence.'
          },
          {
            stepNumber: 4,
            title: 'File the Complaint',
            description: 'File the complaint with the appropriate court.'
          },
          {
            stepNumber: 5,
            title: 'Serve the Defendant',
            description: 'Serve the defendant with the complaint.'
          },
          {
            stepNumber: 6,
            title: 'Discovery',
            description: 'Each party can request information and documents from the other party to support their case.'
          },
          {
            stepNumber: 7,
            title: 'Settlement Negotiations',
            description: 'The parties may attempt to negotiate a settlement to avoid a trial.'
          },
          {
            stepNumber: 8,
            title: 'Trial',
            description: 'If the parties are unable to settle, the case proceeds to trial.'
          },
          {
            stepNumber: 9,
            title: 'Judgement',
            description: 'The court will issue its judgement in the case.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Case',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Medical Reports',
            description: 'Medical reports of the patient documenting the treatment received and injuries sustained.'
          },
          {
            icon: 'CheckCircle',
            title: 'Negligence Complaint',
            description: 'Negligence complaint filed with the concerned hospital or medical practitioner.'
          },
          {
            icon: 'CheckCircle',
            title: 'Related Documents',
            description: 'Copies of any documents related to the incident like bills, discharge summary, prescriptions, etc.'
          },
          {
            icon: 'CheckCircle',
            title: 'Medical Council Report',
            description: 'Report of the medical council which has conducted the inquiry into the matter.'
          },
          {
            icon: 'CheckCircle',
            title: 'Complaint to Authorities',
            description: 'Complaint to the state or central health ministry or consumer forum.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence',
            description: 'Copies of the evidence collected by the consumer forum or state health ministry.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavit',
            description: 'Affidavit of the patient or his family members.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Notices',
            description: 'Copies of any legal notices served.'
          },
          {
            icon: 'CheckCircle',
            title: 'Damage Evidence',
            description: 'Documents evidencing any damages caused due to the negligence.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a leading law firm in India that specialises in medical negligence cases. They provide legal representation to patients who have suffered from medical negligence and help them get the compensation they deserve. The firm has a team of experienced lawyers who are well-versed in medical negligence laws in India.\n\nThey understand the complexities of such cases and can provide the best legal advice to their clients. They also have access to the latest research on medical negligence laws and regulations, which helps them stay up-to-date with changes in the law. Grover & Grover can evaluate the case to determine whether or not the medical negligence is actionable and whether the victim has a good chance of receiving a positive outcome.\n\nIf the case merits further action, the lawyers will collect all relevant evidence, such as medical records, witness statements, and expert opinions. They also have the ability to negotiate on the victim\'s behalf to reach a settlement out of court. If the case goes to trial, they can present the victim\'s case in court and argue for a favourable outcome.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'K. Maheshwari v. Union of India & Ors. (2016)',
            description: 'The Supreme Court held that the deficiency in services was negligent and the doctor\'s negligent care was the cause of the patient\'s death.'
          },
          {
            icon: 'CheckCircle',
            title: 'Jacob Mathew v. State of Punjab & Anr. (2005)',
            description: 'The Supreme Court held that the medical negligence and deficiency in service were proved, and the patient\'s death was due to medical negligence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rashmi Rekha Baruah v. State of Assam & Ors. (2003)',
            description: 'The High Court of Assam held that the patient\'s death was due to medical negligence and the doctor was liable for damages.'
          },
          {
            icon: 'CheckCircle',
            title: 'State of Gujarat v. Rameshbhai (2014)',
            description: 'The High Court of Gujarat held that the doctor was negligent and the patient\'s death was due to the doctor\'s negligence.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 11,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is medical negligence?',
            answer: 'Medical negligence is a situation where a medical professional or healthcare provider fails to provide a standard of care that a reasonable medical professional would have provided under similar circumstances, resulting in injury, complications, or death to the patient.'
          },
          {
            question: 'What is the difference between medical negligence and medical malpractice?',
            answer: 'Medical negligence refers to unintentional failure to provide adequate care, while medical malpractice is professional misconduct or negligence that is intentional or reckless. Medical malpractice is a more serious offense involving deliberate wrongdoing or gross negligence.'
          },
          {
            question: 'How do I prove medical negligence in India?',
            answer: 'To prove medical negligence, you must establish: duty of care owed by the doctor to the patient, breach of that duty through substandard care, causation linking the breach to the injury, and actual damages suffered. This requires medical records, expert opinions, witness statements, and evidence of the standard of care.'
          },
          {
            question: 'What is the time limit to file a medical negligence case in India?',
            answer: 'Under the Consumer Protection Act, a complaint must be filed within 2 years from the date when the cause of action arose. However, the court may condone the delay if sufficient cause is shown. For civil suits, the limitation period is typically 3 years from the date of knowledge of negligence.'
          },
          {
            question: 'What compensation can I claim in a medical negligence case?',
            answer: 'You can claim: refund of medical expenses, compensatory damages for physical and mental harm, punitive damages in cases of gross negligence, loss of income and earning capacity, cost of future medical treatment, and in case of death, compensation to family members for loss of support and consortium.'
          },
          {
            question: 'Where can I file a medical negligence case in India?',
            answer: 'Medical negligence cases can be filed in: Consumer Forums (District, State, or National) under the Consumer Protection Act, Civil Courts for tort claims, Criminal Courts if criminal negligence is involved, or Medical Council of India for professional misconduct. The choice depends on the nature of the case and relief sought.'
          },
          {
            question: 'What is the role of expert opinion in medical negligence cases?',
            answer: 'Expert medical opinion is crucial in medical negligence cases to establish: the standard of care expected in similar circumstances, whether the doctor breached that standard, causation between the breach and injury, and extent of damages. Courts rely heavily on expert testimony to understand complex medical issues.'
          },
          {
            question: 'Can I file a case against a government hospital for medical negligence?',
            answer: 'Yes, you can file a case against government hospitals and doctors. Government hospitals are liable for medical negligence under the Consumer Protection Act and tort law. However, individual government doctors may have certain protections, and the procedure may differ slightly from cases against private practitioners.'
          },
          {
            question: 'What is the Bolam Test in medical negligence?',
            answer: 'The Bolam Test, adopted by Indian courts, states that a doctor is not negligent if he acts in accordance with a practice accepted as proper by a responsible body of medical professionals skilled in that particular field, even if other doctors may have a different opinion. The doctor must meet the standard of an ordinary skilled professional.'
          },
          {
            question: 'How long does a medical negligence case take in India?',
            answer: 'Medical negligence cases can take 2-5 years or longer depending on: complexity of the case, court where filed (Consumer Forum is generally faster than civil courts), availability of evidence and expert witnesses, number of adjournments, and whether appeals are filed. Consumer Forum cases are typically resolved faster than civil suits.'
          },
          {
            question: 'What are the common defenses in medical negligence cases?',
            answer: 'Common defenses include: the doctor followed accepted medical practice (Bolam Test), the injury was due to patient\'s pre-existing condition, the patient consented to the risks, the patient did not follow medical advice, the injury was an unavoidable complication, and contributory negligence by the patient.'
          },
          {
            question: 'Can I file a criminal case for medical negligence?',
            answer: 'Yes, criminal cases can be filed under IPC Section 304A (causing death by negligence) or Section 338 (causing grievous hurt by negligence). However, criminal prosecution requires proof of gross negligence or recklessness. The Supreme Court has held that simple lack of care or error of judgment is not sufficient for criminal liability.'
          },
          {
            question: 'What is informed consent and how does it relate to medical negligence?',
            answer: 'Informed consent means the patient must be informed about the nature of treatment, risks involved, alternative treatments, and consequences of not taking treatment. Failure to obtain proper informed consent can constitute medical negligence, especially if the patient suffers harm from undisclosed risks.'
          },
          {
            question: 'Can I sue for wrong diagnosis?',
            answer: 'Yes, you can sue for wrong diagnosis if it amounts to medical negligence. However, you must prove that the misdiagnosis was due to failure to follow standard diagnostic procedures, not merely an error of judgment. The misdiagnosis must have caused harm, and a competent doctor in similar circumstances would have made the correct diagnosis.'
          },
          {
            question: 'What should I do immediately after suspecting medical negligence?',
            answer: 'Immediately: seek second medical opinion and necessary treatment, preserve all medical records, bills, and prescriptions, document the sequence of events in writing, take photographs of injuries if applicable, collect contact information of witnesses, do not sign any settlement or waiver documents, and consult a medical negligence lawyer as soon as possible.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Medical Negligence Legal Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional medical negligence legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Medical Negligence Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert medical negligence legal services in Delhi. Professional representation for medical malpractice cases, compensation claims, and healthcare disputes.'
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
