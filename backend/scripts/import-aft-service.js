require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'armed-force-tribunal-lawyer',
  name: 'Armed Forces Tribunal Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Armed Forces Tribunal Matters (AFT Matters)',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal representation for Armed Forces Tribunal cases in Delhi. We offer specialized guidance for service matters, appeals, and disputes related to armed forces personnel.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Armed Forces Tribunal Lawyer (AFT Lawyer)',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'The Armed Forces Tribunal (AFT) is a specialised judicial body established to adjudicate disputes and complaints related to the armed forces. It was set up in 2007 under the Armed Forces Tribunal Act, 2007, and consists of a chairman, vice chairman, and other members who are appointed by the President of India.\n\nThe AFT has jurisdiction over matters related to service laws applicable to members of the armed forces, including those relating to recruitment, promotion, pay and allowances, termination, or discharge from service. It also hears appeals against decisions taken in court martial proceedings. The AFT is empowered to pass orders for reinstatement or the grant of compensation in cases of wrongful termination or discharge from service.\n\nThe Armed Forces Tribunal Act, 2007 provides for the formation of tribunals as per Section 3. All orders passed or intended to be passed by an Armed Forces Tribunal shall require the prior sanction of the Armed Forces Appeal Board.'
      }
    },
    {
      type: 'benefits',
      heading: 'Functions of Armed Forces Tribunal',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Administration of Justice',
            description: 'Armed tribunals are responsible for the administration of justice in the armed forces, ensuring that members of the military receive fair and impartial trials.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Offences & War Crimes',
            description: 'Hearing cases related to criminal offences, high-ranking officers, war crimes, and other matters related to military operations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Personnel Management',
            description: 'Authority to issue orders pertaining to personnel management, discipline, and other issues within their jurisdiction.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'Protecting the rights of service members and upholding international law in military matters.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights & Remedies Available Under AFT Act',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Seek Damages',
            description: 'The AFT Act provides the right to seek damages and compensation for financial losses due to unfair trading practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Injunctive Relief',
            description: 'Individuals can seek injunctive relief to prevent further harm or unfair practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Criminal Sanctions',
            description: 'The Act provides for criminal sanctions against those who engage in unfair trading practices.'
          },
          {
            icon: 'CheckCircle',
            title: 'Statutory Cause of Action',
            description: 'Section 21 creates a statutory cause of action for individuals against business operators who have engaged in unfair trading practices.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Steps in Filing Appeal With Armed Forces Tribunal',
      visible: true,
      order: 4,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Prepare Petition for Review',
            description: 'Prepare a petition for review with all supporting documentation including affidavits, expert reports, and legal documents. Keep these documents readily available and updated throughout the process.'
          },
          {
            stepNumber: 2,
            title: 'File Documents in Sequence',
            description: 'File all documents consecutively with proper attribution. The court will not accept anything submitted out of sequence or without proper, signed, and dated receipts.'
          },
          {
            stepNumber: 3,
            title: 'File Motion for Appeal',
            description: 'If the petition is denied without a trial, file a motion for an appeal with the decision. Obtain permission from the presiding judge before moving to other appeals.'
          },
          {
            stepNumber: 4,
            title: 'Await Judge\'s Ruling',
            description: 'The presiding judge will consider all aspects of your motion and provide their ruling within 30 days after filing the motion for an appeal.'
          },
          {
            stepNumber: 5,
            title: 'Motion for Reconsideration',
            description: 'If denied relief and the motion for appeal is denied, you may file a motion to reconsider the decision. The judge will provide ruling within 30 days after filing.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Armed Forces Tribunal Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'Representing clients at hearings before the AFT, filing appeals, and providing legal advice on matters related to military law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Case Preparation',
            description: 'Assistance with filing petitions, preparing documents, and presenting cases in a way that will be accepted by the AFT.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compensation Claims',
            description: 'Providing advice on compensation claims for injuries sustained while serving in the armed forces.'
          },
          {
            icon: 'CheckCircle',
            title: 'Filing Complaints',
            description: 'Assisting with filing complaints against service personnel or institutions, if appropriate, ensuring clients receive justice from the AFT.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is the Armed Forces Tribunal (AFT)?',
            answer: 'The Armed Forces Tribunal (AFT) is a quasi-judicial body in India that was established under the Armed Forces Tribunal Act, 2007. It provides a platform for armed forces personnel, including retired personnel, to seek redressal of their grievances related to service matters.'
          },
          {
            question: 'Who can approach the Armed Forces Tribunal (AFT)?',
            answer: 'Any serving or retired armed forces personnel, including officers, junior commissioned officers, and other ranks, can approach the Armed Forces Tribunal (AFT) for redressal of their grievances related to service matters.'
          },
          {
            question: 'What types of cases are heard by the Armed Forces Tribunal (AFT)?',
            answer: 'The Armed Forces Tribunal (AFT) hears cases related to service matters of armed forces personnel, including promotions, postings, transfers, pay, pensions, and retirement benefits. It also deals with cases related to disciplinary matters, such as court-martial proceedings, and cases related to the violation of fundamental rights of armed forces personnel.'
          },
          {
            question: 'What is the time limit for filing a case with the Armed Forces Tribunal (AFT)?',
            answer: 'The time limit for filing a case with the Armed Forces Tribunal (AFT) is 3 months from the date of the cause of action or incident. However, the AFT may condone the delay in filing the application if it is satisfied that there was sufficient cause for the delay.'
          },
          {
            question: 'Can a lawyer represent me in a case before the Armed Forces Tribunal (AFT)?',
            answer: 'Yes, a lawyer can represent you in a case before the Armed Forces Tribunal (AFT). In fact, it is advisable to hire a competent and experienced lawyer to represent you in the AFT as the proceedings involve complex legal issues.'
          },
          {
            question: 'How long does it take for a case to be resolved in the Armed Forces Tribunal (AFT)?',
            answer: 'The time taken to resolve a case in the Armed Forces Tribunal (AFT) varies from case to case and depends on various factors such as the complexity of the case, the availability of evidence, and the workload of the tribunal. However, the AFT is required to dispose of cases within six months from the date of filing.'
          },
          {
            question: 'What are the documents required to file a case with the Armed Forces Tribunal (AFT)?',
            answer: 'The documents required to file a case with the Armed Forces Tribunal (AFT) include a memorandum of petition, an affidavit in support of the petition, copies of relevant documents, and a fee of Rs. 100.'
          },
          {
            question: 'Can I appeal a decision of the Armed Forces Tribunal (AFT)?',
            answer: 'Yes, a person can appeal a decision of the Armed Forces Tribunal (AFT) to the higher courts. The appeal must be filed in the form of a memorandum of appeal in the respective High Court or the Supreme Court, depending on the jurisdiction of the AFT.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Ready to Get Started?',
      visible: true,
      order: 7,
      background: 'dark',
      content: {
        body: 'Contact our expert legal team today for professional assistance with Armed Forces Tribunal matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Armed Force Tribunal Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Armed Force Tribunal Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations'
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

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Create new sections
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

    // Update SEO
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
