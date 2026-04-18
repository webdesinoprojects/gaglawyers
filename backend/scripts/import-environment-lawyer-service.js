require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'environment-lawyer',
  name: 'Environment Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Environment Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Environmental Law',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Environmental Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Environmental lawyer must possess a thorough understanding of environmental law and be knowledgeable about the evidence required to prove environmental cases. They must also have the ability to construct robust environmental cases for their clients by gathering relevant facts, interviewing witnesses, and researching legal Precedents.\n\nEnvironment Law in India is a department of regulation which deals with the legal safety of the environment in India. It is a complex association of laws and regulations which govern the management of herbal assets, pollution tiers, and different factors of the environment. India has a wealthy prison framework which is primarily based at the Constitution of India, statutes, rules and rules, ordinances, and numerous other prison devices.'
      }
    },
    {
      type: 'overview',
      heading: 'Environmental Law in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'This legal framework is designed to protect the environment by regulating and controlling activities that have an effect at the environment. The number one goal of Environment Law in India is to protect the surroundings and its sources from pollution, degradation, and destruction. It also ambitions to promote the conservation of herbal sources and make sure sustainable improvement.\n\nThe law additionally seeks to make sure that sports which have an unfavorable impact on the surroundings are executed responsibly. This includes the regulation of air and water pollution, waste control, and conservation of flora and fauna. The law is enforced thru the Ministry of Environment, Forests and Climate Change, that is the nodal company for environmental safety in India.\n\nIn India, Environment Law is primarily based on the precept of sustainable improvement, this means that that improvement have to be performed in a manner that does not damage the environment. The law additionally takes into consideration the pastimes of different stakeholders along with industries, farmers, and citizens who are laid low with environmental problems.'
      }
    },
    {
      type: 'benefits',
      heading: 'Key Environmental Laws in India',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Environment (Protection) Act, 1986',
            description: 'Comprehensive legislation providing for the prevention and control of pollution, and the protection and improvement of the environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Water (Prevention and Control of Pollution) Act, 1974',
            description: 'Provides for the prevention and control of water pollution and the maintaining or restoring of wholesomeness of water.'
          },
          {
            icon: 'CheckCircle',
            title: 'Forest (Conservation) Act, 1980',
            description: 'Provides for the conservation of forests and regulates the de-reservation of forests and use of forest land for non-forest purposes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Air (Prevention and Control of Pollution) Act, 1981',
            description: 'Provides for the prevention, control and abatement of air pollution and for the establishment of Boards for carrying out the purposes of the Act.'
          },
          {
            icon: 'CheckCircle',
            title: 'National Environment Policy, 2006',
            description: 'Comprehensive policy framework aimed at protecting the environment and promoting sustainable development.'
          },
          {
            icon: 'CheckCircle',
            title: 'National Green Tribunal Act, 2010',
            description: 'Establishes a specialized tribunal for effective and expeditious disposal of cases relating to environmental protection.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Disputes Under Environmental Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Air Pollution Disputes',
            description: 'Air pollution is one of the foremost environmental issues in India. Disputes can be related to the release of dangerous pollutants, emissions from factories and other commercial activities, and air quality standards not being met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Water Pollution Disputes',
            description: 'Water pollution disputes involve cases of contamination of water sources, discharge of hazardous pollution into water bodies, and instances of water quality standards not being met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Land Pollution Disputes',
            description: 'Disputes related to land pollution can involve instances of infection of land by hazardous pollutants, land use violations, and cases of land quality requirements not being met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Forest Conservation Disputes',
            description: 'Disputes related to forest conservation can involve instances of illegal logging, deforestation, and instances of protected species being harmed.'
          },
          {
            icon: 'CheckCircle',
            title: 'Wildlife Conservation Disputes',
            description: 'Wildlife conservation disputes ensure that the wildlife is protected from exploitation and also ensure the proper management of the wildlife under the Wildlife (Protection) Act, 1972 and the Biodiversity Act, 2002.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under Environmental Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Citizens\' Rights',
            description: 'Citizens have the right to access information about the environment, be informed about environmental issues, and to participate in decision making processes that affect the environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Citizens\' Obligations',
            description: 'Citizens have the responsibility to participate in activities that help conserve natural resources and protect the environment, including planting trees and participating in clean-up events.'
          },
          {
            icon: 'CheckCircle',
            title: 'Business Rights and Responsibilities',
            description: 'Companies must adhere to environmental regulations and must take efforts to reduce the environmental impact of their activities. This includes ensuring that their operations do not cause harm to the environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Government Agency Obligations',
            description: 'Government agencies have the right to create policies and regulations designed to protect the environment, as well as the obligation to ensure that these laws and policies are enforced.'
          },
          {
            icon: 'CheckCircle',
            title: 'Local Government Responsibilities',
            description: 'Local governments have the right to create and enforce regulations designed to protect the environment, and the responsibility to participate in activities that help conserve natural resources.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment in Environment Law',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        body: 'Environment law in India is governed through the Environment (Protection) Act, 1986. The act states that any person who does any harm to the environment, or any activity that is probably to reason harm to the environment, will be subject to the relevant expenses, penalties, and punishments. These are relevant each to individuals and agencies.\n\nThe Environment (Protection) Act, 1986 also states that any character or employer who pollutes the environment in any manner, including via using dangerous chemicals, could be situation to fines. The fines are determined through the court, and might range from some hundred rupees to numerous lakhs. In addition, the offender may be required to pay compensation to the affected humans or to the authorities.\n\nEnvironmental offences are also punishable under the Water (Prevention and Control of Pollution) Act, 1974, the Air (Prevention and Control of Pollution) Act, 1981 and the Forest (Conservation) Act, 1980. These acts provide for fines and imprisonment for folks that violate the environmental laws. The fines can variety from some thousand rupees to several lakhs, and the imprisonment can range from some months to several years.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Case Related to Environment Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Research Relevant Laws',
            description: 'Start by discovering the relevant laws and understanding how they apply to the case. It is essential to recognize the applicable laws and rules in order to ensure that the case is filed properly.'
          },
          {
            stepNumber: 2,
            title: 'Identify the Parties',
            description: 'Identify the person or corporation responsible for the environmental regulation violation, as well as any other parties that may be affected by the case. This ensures that all relevant parties are notified.'
          },
          {
            stepNumber: 3,
            title: 'File the Case',
            description: 'Fill out the necessary paperwork and submit it to the appropriate court. Ensure that all of the paperwork is filled out correctly and that all necessary documentation is included.'
          },
          {
            stepNumber: 4,
            title: 'Monitor the Progress',
            description: 'Attend court hearings, review court files, and talk to the parties involved. Keep updated with any changes to the law that may affect the case.'
          },
          {
            stepNumber: 5,
            title: 'Conclude the Case',
            description: 'Attend court hearings, file any required documentation, and potentially reach a settlement agreement. Ensure that all parties are satisfied with the outcome and that the environment is protected.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File an Environmental Case',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Pleadings and Affidavits',
            description: 'Original or certified copies of the pleadings, affidavits, written submissions, and other documents are essential for the court to consider the case.'
          },
          {
            icon: 'CheckCircle',
            title: 'Environmental Reports',
            description: 'Reports and studies related to the environmental problem, including air and water pollution levels, evidence of how the environmental issue has affected the environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Permits and Licenses',
            description: 'Any permits or licenses related to the environmental issue should be included in the document package.'
          },
          {
            icon: 'CheckCircle',
            title: 'Party Documentation',
            description: 'Contact information, legal documents such as contracts, correspondence between the parties, and any other relevant documents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Documents',
            description: 'The court\'s regulations and rules, as well as any other documents related to the environment law in India, including the court\'s list of attorneys.'
          },
          {
            icon: 'CheckCircle',
            title: 'Remedies Documentation',
            description: 'Documents related to the petitioner\'s financial losses, health impacts, and any other documents associated with the remedies sought.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Environmental Lawyer in Environment Law',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Environmental Lawyer in Delhi play an important function in environmental law in India. Environmental Lawyer in Delhi are key players in the legal framework by way of presenting prison recommendation and assistance to authorities, enterprise, and people on environmental law issues. Environmental Lawyer in Delhi help to make certain that environmental legal guidelines and rules are adhered to and that legal movement is taken if important.\n\nOne of the primary roles of Environmental Lawyer in Delhi in environmental law in India is to endorse clients on their legal responsibilities. This includes imparting advice at the diverse laws and regulations that practice to the environment, consisting of those associated with air and water pollutants, land use, and biodiversity safety. Environmental Lawyer in Delhi also help to ensure that groups are in compliance with these legal guidelines.\n\nEnvironmental Lawyer in Delhi also play an essential role inside the enforcement of environmental laws. This includes offering legal recommendation to government corporations on the enforcement of environmental laws, in addition to representing customers in court docket complaints related to environmental troubles. Environmental Lawyer in Delhi can also be worried inside the prosecution of individuals or agencies which have violated environmental laws.'
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors are a law firm in India that specializes in environmental law. They have extensive experience in the area and are well-versed in the nuances of India\'s environmental laws. They provide legal advice and assistance to individuals, corporations and organizations in need of help with their environmental issues.\n\nGrover & Grover, Advocates and Solicitors are well-versed in the various environmental legal guidelines in India, including the Water (Prevention and Control of Pollution) Act, 1974, the Air (Prevention and Control of Pollution) Act, 1981, the Environment Protection Act, 1986 and the Forest (Conservation) Act, 1980.\n\nThe firm provides legal advice on a number of environmental issues, including pollution control, hazardous waste management, energy conservation, land use planning and development, natural resource conservation, biodiversity protection and climate change. They can assist clients with issues related to air, water and soil pollution, as well as provide legal advice to help ensure compliance with local, state and federal environmental regulations.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases in Supreme Court and High Court',
      visible: true,
      order: 11,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Vellore Citizens Welfare Forum vs. Union of India (1996)',
            description: 'The Supreme Court issued a historic ruling ordering the closure of tanneries in the Vellore area found to be discharging hazardous effluents into water bodies. This case set a benchmark for environmental protection and regulation.'
          },
          {
            icon: 'CheckCircle',
            title: 'M.C. Mehta vs. Union of India (1997)',
            description: 'The Supreme Court directed the closure of all polluting industries within the Ganga river basin, effectively protecting the river and its ecology. The court held that the right to life and clean environment is a fundamental right.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indian Council for Environ-Legal Action vs. Union of India (1996)',
            description: 'The Supreme Court issued a landmark judgement ordering the closure of all polluting industries located within the Ganga river basin, holding that the right to clean environment is a fundamental right.'
          },
          {
            icon: 'CheckCircle',
            title: 'Goa Foundation vs. Union of India (2014)',
            description: 'The Supreme Court held that the government must protect the environment and that it is the duty of citizens to ensure that their actions do not result in environmental degradation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dr. Sheela Barse vs. Union of India (1986)',
            description: 'The Supreme Court held that the right to clean environment is a fundamental right under the Indian Constitution and that the State must take measures to protect it.'
          }
        ]
      }
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      visible: true,
      order: 12,
      background: 'light',
      content: {
        items: [
          {
            question: 'What is environmental law in India?',
            answer: 'Environmental law in India is a body of laws and regulations that aim to protect the environment and promote sustainable development.'
          },
          {
            question: 'What is the role of an environmental lawyer in India?',
            answer: 'An environmental lawyer in India helps clients navigate environmental legal guidelines and regulations, and works to ensure that their rights are protected in environmental disputes.'
          },
          {
            question: 'What types of cases do environmental lawyers in India handle?',
            answer: 'Environmental lawyers in India handle a wide range of cases, including pollution control, environmental impact assessments, land use disputes, and natural resource management.'
          },
          {
            question: 'What are the current environmental laws in India?',
            answer: 'Some of the current environmental laws in India include the Air (Prevention and Control of Pollution) Act, the Water (Prevention and Control of Pollution) Act, and the National Green Tribunal Act.'
          },
          {
            question: 'What is the National Green Tribunal in India?',
            answer: 'The National Green Tribunal in India is a specialized court that hears cases related to environmental law and the protection of the environment.'
          },
          {
            question: 'What is the penalty for violating environmental laws in India?',
            answer: 'The penalty for violating environmental laws in India can vary depending on the severity of the violation, but may include fines, imprisonment, or other sanctions.'
          },
          {
            question: 'What is the role of the Ministry of Environment, Forest and Climate Change in India?',
            answer: 'The Ministry of Environment, Forest and Climate Change in India is responsible for formulating and implementing regulations and programs related to the environment and sustainable development.'
          },
          {
            question: 'What is the process for appealing a decision of the National Green Tribunal in India?',
            answer: 'The process for appealing a decision of the National Green Tribunal in India involves filing an appeal with the appropriate appellate authority, such as the Supreme Court of India.'
          },
          {
            question: 'What is the legal framework for waste management in India?',
            answer: 'The legal framework for waste management in India includes the Municipal Solid Waste (Management and Handling) Rules, 2000, and the Plastic Waste Management Rules, 2016.'
          },
          {
            question: 'Can an environmental lawyer in India assist me in filing a complaint against a company for environmental violations?',
            answer: 'Yes, an environmental lawyer in India can help you in filing a complaint against a company for environmental violations by providing legal advice, gathering evidence, and representing you in court.'
          },
          {
            question: 'What are the penalties for non-compliance with environmental regulations in India?',
            answer: 'The penalties for non-compliance with environmental regulations in India vary depending on the nature and severity of the violation. They can include fines, imprisonment, revocation of permits, and closure of operations.'
          },
          {
            question: 'Can an environmental lawyer in India assist me in obtaining environmental clearances for infrastructure projects?',
            answer: 'Yes, an environmental lawyer in India can assist you in obtaining environmental clearances for infrastructure projects by providing legal advice, preparing and filing applications, and representing you before regulatory authorities.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Environmental Law Services?',
      visible: true,
      order: 13,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional environmental law services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Environment Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert environmental law services in Delhi. Professional legal advice for pollution control, environmental disputes, and compliance with environmental regulations.'
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
