require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'right-to-information-lawyer',
  name: 'Right To Information Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Right To Information Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for RTI Applications and Appeals',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Right To Information',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Right To Information (RTI) lawyer is a legal professional who specializes in handling cases related to the right to information laws and regulations in a particular country or region.\n\nRTI is a law that provides a right to information to every citizen of India. It was passed in 2005 and since then it has been used by citizens for transparency and accountability. RTI is an acronym for the Right to Information Act, 2005 which was passed in India on October 3, 2005. The RTI Act allows anyone who has paid taxes or fees to access information from any public office or institution. It promotes transparency and accountability in governance, business, education, and healthcare services.\n\nRTI is one of the most important legislations that have been passed in recent times because it helped people fight corruption by promoting transparency and accountability in governance, business, education, and health care services.'
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under the RTI Act',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Know',
            description: 'Citizens have a right to know what their government or public body does or how it works. This fundamental right enables transparency in government operations and decision-making processes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right against Unlawful Censorship',
            description: 'Citizens have an absolute right not to be censored while accessing or obtaining information under this act. This ensures free flow of information without arbitrary restrictions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right against Frivolous Litigation',
            description: 'Citizens have an absolute right not to be harassed while seeking or obtaining information under this act. This protection ensures citizens can exercise their rights without fear of retaliation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right against Evasion',
            description: 'Citizens have a right to obtain information from their government or public body even if it is not yet classified under this act. This prevents authorities from evading disclosure through technicalities.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Major Benefits of RTI Act',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Transparency and Accountability',
            description: 'RTI is a powerful tool that helps expose corruption, and RTI requests have led to the suspension of several public servants and investigations into their alleged misconduct. It has been a game-changer for transparency and accountability in India.'
          },
          {
            icon: 'CheckCircle',
            title: 'Citizen Empowerment',
            description: 'The RTI Act empowers citizens to hold the government accountable and protect individual rights. It provides an avenue for citizens to request information from all levels of government, resulting in greater oversight.'
          },
          {
            icon: 'CheckCircle',
            title: 'Fighting Corruption',
            description: 'RTI has been successful at exposing corruption by allowing citizens to access information about government operations, financial transactions, and decision-making processes. This has led to investigations and disciplinary actions against corrupt officials.'
          },
          {
            icon: 'CheckCircle',
            title: 'Improved Governance',
            description: 'The act has improved governance by making government operations more transparent and responsive to citizen needs. It has created a culture of openness and accountability in public administration.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure and Fees to File RTI',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'File Application',
            description: 'File an application with the local government office where you live or work. It should be filed in person so that you can get a copy of your application and any supporting documents you need.'
          },
          {
            stepNumber: 2,
            title: 'Pay Nominal Fee',
            description: 'There are no specific fees associated with RTI other than a nominal fee for photocopying and postage if you have any documents that need to be submitted with your request. The application fee is typically Rs. 10.'
          },
          {
            stepNumber: 3,
            title: 'State-Specific Procedures',
            description: 'The RTI procedure varies from state to state. In some states like Maharashtra, the application needs approval from the State Information Commission. In others like Haryana and Rajasthan, permission can be given by a local government office.'
          },
          {
            stepNumber: 4,
            title: 'Wait for Response',
            description: 'The process can take anywhere between ten days to two months depending on what documents are being requested. Public authorities are required to respond within 30 days of receiving the application.'
          },
          {
            stepNumber: 5,
            title: 'Appeal if Necessary',
            description: 'If the response is unsatisfactory or no response is received, you can file an appeal with the First Appellate Authority within 30 days, and subsequently with the Information Commission if needed.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyers in Filing RTI',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expert Guidance',
            description: 'RTI lawyers provide expert guidance on how to frame RTI applications effectively to obtain the desired information. They understand the nuances of the law and can help identify the correct authority to approach.'
          },
          {
            icon: 'CheckCircle',
            title: 'Application Drafting',
            description: 'Lawyers assist in drafting RTI applications that comply with specific requirements of the law, ensuring the application is framed in a way that is likely to result in the desired information being provided.'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals and Complaints',
            description: 'If an application is rejected or ignored, lawyers can assist in filing appeals or complaints with the relevant appellate authority and represent clients before Information Commissions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Enforcement',
            description: 'Lawyers can help in enforcing the right to information by filing writ petitions in High Courts or Supreme Court if necessary, ensuring citizens\' rights are protected.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File RTI',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Application Form',
            description: 'A written application addressed to the Public Information Officer (PIO) of the concerned department, clearly stating the information sought.'
          },
          {
            icon: 'CheckCircle',
            title: 'Identity Proof',
            description: 'While not mandatory, providing identity proof can help in tracking the application and receiving responses. However, RTI can be filed without revealing identity in certain cases.'
          },
          {
            icon: 'CheckCircle',
            title: 'Fee Payment Receipt',
            description: 'Receipt of payment of the application fee (typically Rs. 10) through demand draft, cash, or online payment as per the department\'s requirements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Documents',
            description: 'Any supporting documents that help clarify the information being sought or establish the applicant\'s connection to the matter, if relevant.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover Advocates Help in RTI',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Grover & Grover Advocates and Solicitors is a law firm that specializes in providing legal services related to various areas of law, including Right to Information (RTI) laws. We help individuals, organizations, and businesses in filing RTI applications with the appropriate government authorities.\n\nOur lawyers assist clients in drafting RTI applications that comply with specific requirements of the law. We help in identifying the correct government agency or authority to file the application with, and ensure that the application is framed in a way that is likely to result in the desired information being provided.\n\nIf an application is rejected or ignored by the government agency, we assist in filing appeals or complaints with the relevant appellate authority. We represent clients before the Central Information Commission or State Information Commissions and provide legal support throughout the appeal process. We can also help clients in enforcing their right to information by filing writ petitions in the High Court or Supreme Court, if necessary.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases Related to RTI',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Central Board of Secondary Education (CBSE) Case (2011)',
            description: 'The Supreme Court ruled that answer sheets of students who appeared for exams under the CBSE are covered under RTI laws, and can be accessed by applicants seeking the same.'
          },
          {
            icon: 'CheckCircle',
            title: 'Girish Ramchandra Deshpande Case (2012)',
            description: 'The Supreme Court clarified that an individual\'s personal information that has no relationship to any public activity or interest cannot be disclosed under RTI. However, service records and performance evaluation reports of public servants are disclosable.'
          },
          {
            icon: 'CheckCircle',
            title: 'Namit Sharma Case (2013)',
            description: 'The Delhi High Court directed all public authorities to upload on their website RTI applications, responses, and appeals and to update the same on a regular basis, enhancing transparency.'
          },
          {
            icon: 'CheckCircle',
            title: 'Subhash Chandra Agrawal Case (2013)',
            description: 'The Supreme Court ordered the disclosure of the names of account holders who have stashed black money in foreign banks. This ruling helped in bringing transparency in financial dealings and unearthing black money.'
          },
          {
            icon: 'CheckCircle',
            title: 'RBI vs. Jayantilal N. Mistry Case (2015)',
            description: 'The Supreme Court ruled that the Reserve Bank of India (RBI) cannot refuse to disclose information about banks under RTI, as this information is of public interest and affects the economy.'
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
            question: 'What is RTI?',
            answer: 'RTI stands for Right to Information. It is an act passed by the Indian Parliament in 2005 which empowers citizens to seek information from public authorities. The RTI Act, 2005 came into effect on October 15, 2005, and applies to all states and union territories of India except Jammu and Kashmir (which has its own RTI law). The act promotes transparency and accountability in the working of government departments and public authorities by giving citizens the right to access information held by them.'
          },
          {
            question: 'What are RTI cases?',
            answer: 'RTI cases refer to legal matters arising from applications filed under the Right to Information Act, 2005. These cases can involve: applications seeking information from public authorities, appeals filed when information is denied or not provided satisfactorily, complaints against Public Information Officers for non-compliance, penalty proceedings against officials who willfully deny information, writ petitions in High Courts or Supreme Court for enforcement of RTI rights, and cases related to exemptions under Section 8 of the RTI Act. RTI cases are heard by First Appellate Authorities, State/Central Information Commissions, and courts.'
          },
          {
            question: 'What is the procedure for filing an RTI application?',
            answer: 'The procedure for filing an RTI application is: write an application in English, Hindi, or the official language of the area addressed to the Public Information Officer (PIO) of the concerned department, clearly mention the information you are seeking (be specific and precise), pay the application fee of Rs. 10 (through demand draft, cash, or online as per department requirements), submit the application in person, by post, or online through the RTI portal, the PIO must respond within 30 days (48 hours if the information concerns life or liberty of a person), if information is denied or not provided, file first appeal within 30 days to the First Appellate Authority, if still unsatisfied, file second appeal to the State/Central Information Commission within 90 days.'
          },
          {
            question: 'How can an RTI lawyer help?',
            answer: 'An RTI lawyer can help in multiple ways: drafting effective RTI applications that are likely to yield desired information, identifying the correct public authority and PIO to approach, framing questions precisely to avoid rejection on technical grounds, filing appeals when information is denied or inadequate response is received, representing clients before Information Commissions during hearings, filing writ petitions in High Courts or Supreme Court for enforcement of RTI rights, advising on exemptions under Section 8 and whether information can be sought, handling penalty proceedings against non-compliant officials, and providing strategic guidance on using RTI as a tool for transparency and accountability.'
          },
          {
            question: 'What are the grounds for filing an RTI appeal?',
            answer: 'Grounds for filing an RTI appeal include: information requested was not provided within the stipulated time period (30 days), information provided is incomplete or unsatisfactory, application fee was wrongly demanded or excessive fee was charged, information was wrongly denied citing exemptions under Section 8, the PIO transferred the application to wrong authority, the PIO refused to accept the RTI application, information provided is misleading or false, the public authority claimed that information does not exist when it actually does, or any other violation of provisions of the RTI Act. First appeal should be filed within 30 days to the First Appellate Authority, and second appeal within 90 days to the Information Commission.'
          },
          {
            question: 'What is the time limit for filing an RTI appeal?',
            answer: 'The time limits for filing RTI appeals are: First Appeal must be filed within 30 days from the date of receipt of information or from the expiry of 30 days if no information was received. The First Appellate Authority may condone delay if sufficient cause is shown. Second Appeal must be filed within 90 days from the date of decision of the First Appellate Authority or from the expiry of the time limit for decision by the First Appellate Authority (which is 30 days). The Information Commission may condone delay beyond 90 days if there is sufficient cause. It is advisable to file appeals promptly to avoid complications and ensure timely resolution.'
          },
          {
            question: 'What are the types of information that can be sought under RTI?',
            answer: 'Under RTI, you can seek: government files, documents, and records, information about government schemes and policies, details of government expenditure and budgets, information about public works and projects, details of government contracts and tenders, information about government employees and their service records, copies of government orders and circulars, information about government decision-making processes, details of government assets and properties, and any other information held by public authorities. However, information exempted under Section 8 (such as information affecting national security, cabinet papers, personal information, trade secrets, etc.) and Section 9 (information disclosure of which would infringe copyright) cannot be sought.'
          },
          {
            question: 'Who can file an RTI application?',
            answer: 'Any citizen of India can file an RTI application. There are no restrictions based on age, gender, caste, religion, or any other factor. You do not need to give reasons for seeking information or explain why you need it. Even organizations, NGOs, and companies can file RTI applications. However, only Indian citizens can file RTI applications; foreign nationals cannot. BPL (Below Poverty Line) cardholders are exempted from paying the application fee. The RTI Act does not require the applicant to disclose their identity, though providing contact details helps in receiving the response.'
          },
          {
            question: 'What are the remedies available if an RTI application is rejected?',
            answer: 'If your RTI application is rejected, you have the following remedies: file a First Appeal within 30 days to the First Appellate Authority of the concerned department, if the First Appeal is also rejected or you are not satisfied with the decision, file a Second Appeal within 90 days to the State Information Commission (for state government departments) or Central Information Commission (for central government departments), if the Information Commission\'s decision is not satisfactory, file a writ petition in the High Court or Supreme Court under Article 226 or 32 of the Constitution, seek penalty against the PIO if information was wrongfully denied, and in case of malafide denial, file a complaint for disciplinary action against the concerned officer.'
          },
          {
            question: 'Can I file an RTI application without the help of a lawyer?',
            answer: 'Yes, you can file an RTI application without the help of a lawyer. The RTI Act is designed to be citizen-friendly and the process is simple. You just need to write an application clearly stating the information you seek, pay the nominal fee of Rs. 10, and submit it to the concerned Public Information Officer. However, hiring an RTI lawyer is beneficial when: the matter is complex or involves legal technicalities, you need to file appeals or represent before Information Commissions, the information sought is likely to be denied citing exemptions, you need strategic guidance on framing questions effectively, or you want to file writ petitions in courts. At Grover & Grover Advocates, we provide expert assistance for all RTI matters.'
          },
          {
            question: 'How long does it take to get a response to an RTI application?',
            answer: 'The time limit for receiving a response to an RTI application is: 30 days from the date of receipt of application by the Public Information Officer (PIO), 48 hours if the information concerns the life or liberty of a person (urgent cases), 5 additional days if the application was sent through the Assistant Public Information Officer (APIO) who then transfers it to the PIO, and 30 days from the date of payment if the PIO sought additional fee for providing information. If no response is received within these time limits, it is deemed that the information has been denied and you can file an appeal. Delays beyond these periods may result in penalties being imposed on the concerned PIO.'
          },
          {
            question: 'What kind of information can I seek through an RTI application?',
            answer: 'You can seek any information held by public authorities including: copies of government documents, files, and records, information about government policies, schemes, and programs, details of government expenditure and financial transactions, information about public works, projects, and contracts, details of government employees and their service records, information about government decision-making processes, copies of government orders, circulars, and notifications, information about government assets and properties, details of government tenders and procurement, and any other information that is held by or under the control of public authorities. However, information exempted under Sections 8 and 9 of the RTI Act (such as information affecting national security, cabinet papers, personal information unrelated to public activity, trade secrets, etc.) cannot be sought.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert RTI Legal Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional Right to Information legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Right To Information Lawyer in Delhi - RTI Application & Appeals | GAG Lawyers',
    metaDescription: 'Expert RTI lawyer services in Delhi. Professional legal assistance for Right to Information applications, appeals, and enforcement.'
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
