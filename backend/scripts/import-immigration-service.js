require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'immigration-lawyer',
  name: 'Immigration Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Immigration Lawyer in Delhi',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert legal guidance for immigration matters including visa applications, citizenship, work permits, asylum cases, and deportation defense. Specialized assistance for US, Canada, Australia, and New Zealand immigration.',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Immigration Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Immigration law is a branch of law that deals with the rights, duties, and obligations of people who are not citizens of a particular country. It covers a wide range of topics, from the rights of immigrants to enter a country and remain in it, to citizenship and naturalisation, to the deportation and removal of immigrants. It also regulates the employment of foreign workers and the ability of immigrants to access social services.\n\nImmigration law is an important tool for ensuring that immigrants are treated fairly and that they have access to the same rights and opportunities as citizens. Immigration law is a complex and ever-changing area of law that governs the legal process of individuals entering, living in, and leaving a country. It is the branch of law that deals with the rights, duties, and obligations of immigrants to a country, as well as their ability to gain citizenship or other legal status in that country.\n\nImmigration law also covers issues related to refugees and asylum seekers. Understanding immigration law is essential for anyone who is considering living or working abroad. Immigration law is the body of law that governs the movement of people across international borders. It deals with issues such as citizenship, visas, refugee status, and other matters related to individuals entering or leaving a country.'
      }
    },
    {
      type: 'benefits',
      heading: 'Charges, Penalties & Punishment in Immigration Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Admission of an Unlawful Immigrant',
            description: 'This charge applies to any individual who enters India without permission. This can also apply to individuals who enter the country for illicit purposes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Detention of an Unlawful Immigrant',
            description: 'When a person is taken into custody and held within a detention facility, they are subjected to this charge. The person may be released on bail or be ordered deported before this charge can be applied.'
          },
          {
            icon: 'CheckCircle',
            title: 'Failing to Depart India on Time',
            description: 'This occurs when an individual is ordered by a court or government authority to leave the country and they do not comply with the order.'
          },
          {
            icon: 'CheckCircle',
            title: 'Failing to Pay Restitution',
            description: 'This occurs when a person who has been ordered to pay restitution for crimes committed against another fails or refuses to do so.'
          },
          {
            icon: 'CheckCircle',
            title: 'Failure to Appear for Treatment',
            description: 'This occurs when a person who has been ordered to undergo treatment for substance abuse, mental health, or emotional disturbance fails or refuses to do so.'
          },
          {
            icon: 'CheckCircle',
            title: 'Violation of Probation Terms',
            description: 'A violation is conduct that violates the terms or conditions established by the court in granting probation.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File an Immigration Case',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        steps: [
          {
            title: 'File Notice of Intention',
            description: 'File a notice with the appropriate court stating intention to file a case and pay the required fee if applicable.'
          },
          {
            title: 'Prepare Affidavit',
            description: 'Prepare a written declaration of facts (affidavit) that will be offered as evidence in the immigration case.'
          },
          {
            title: 'File Documents',
            description: 'File affidavits, complaints, and testimonies with Indian courts. Documents must contain specific details acknowledging allegations and be signed under oath.'
          },
          {
            title: 'Select Legal Representation',
            description: 'Select an experienced immigration lawyer who can provide legal advice and represent you throughout the process.'
          },
          {
            title: 'Court Proceedings',
            description: 'Attend court proceedings and follow all legal procedures as guided by your immigration lawyer.'
          },
          {
            title: 'Obtain Legal Advice',
            description: 'Continuously obtain legal advice throughout the process to ensure proper handling of your case.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Immigration Lawyers',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Expert Legal Advice',
            description: 'Provide invaluable advice to those seeking to enter or remain in a foreign country, helping them understand their rights and responsibilities under the law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Visa Applications',
            description: 'Assist with visa applications for various countries including US, Canada, Australia, and New Zealand, ensuring all requirements are met.'
          },
          {
            icon: 'CheckCircle',
            title: 'Family Reunification',
            description: 'Help with family reunification cases, ensuring families can be together in their chosen country of residence.'
          },
          {
            icon: 'CheckCircle',
            title: 'Deportation Defense',
            description: 'Provide assistance with deportation hearings, defending clients against removal orders and protecting their rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'Asylum Cases',
            description: 'Represent clients in asylum cases, helping refugees and asylum seekers obtain protection and legal status.'
          },
          {
            icon: 'CheckCircle',
            title: 'Citizenship and Naturalization',
            description: 'Guide clients through the citizenship and naturalization process, ensuring all requirements are met for successful applications.'
          },
          {
            icon: 'CheckCircle',
            title: 'Stay Updated on Policy Changes',
            description: 'Stay up-to-date on relevant changes in immigration policy and procedure to ensure clients have access to justice and current information.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required for Immigration Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Completed Application Form',
            description: 'Properly filled application form for the specific immigration matter being pursued.'
          },
          {
            icon: 'CheckCircle',
            title: 'Passport-Sized Photographs',
            description: 'Recent passport-sized photographs meeting the specifications required by immigration authorities.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Identity',
            description: 'Birth certificate, driver\'s licence, or passport to establish identity.'
          },
          {
            icon: 'CheckCircle',
            title: 'Current Address and Contact Information',
            description: 'Proof of current residence and valid contact details.'
          },
          {
            icon: 'CheckCircle',
            title: 'Proof of Legal Status',
            description: 'Green card, work visa, or permanent residence card demonstrating current legal status.'
          },
          {
            icon: 'CheckCircle',
            title: 'Financial Documents',
            description: 'Bank statements, pay stubs, and proof of income to demonstrate financial stability.'
          },
          {
            icon: 'CheckCircle',
            title: 'Immigration-Specific Documents',
            description: 'Proof of marriage for spouse petitions, employment contracts, or evidence related to the specific immigration issue.'
          },
          {
            icon: 'CheckCircle',
            title: 'Supporting Documents',
            description: 'Affidavits from witnesses, character references, and any other supporting documentation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Filing Fees',
            description: 'Payment of all applicable filing fees as required by immigration authorities.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'How Grover & Grover, Advocates Help in Immigration Cases',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Professional Legal Advice',
            description: 'Provide professional legal advice and representation to individuals and businesses looking to move abroad or resolve immigration issues.'
          },
          {
            icon: 'CheckCircle',
            title: 'Visa Application Assistance',
            description: 'Assist with visa applications for US, Canada, Australia, New Zealand, and other countries, ensuring all documentation is complete and accurate.'
          },
          {
            icon: 'CheckCircle',
            title: 'Appeals and Deportation Orders',
            description: 'Handle appeals against visa rejections and deportation orders, providing strong legal representation.'
          },
          {
            icon: 'CheckCircle',
            title: 'Family-Based Immigration',
            description: 'Assist with family-based immigration cases, helping families reunite in their chosen country.'
          },
          {
            icon: 'CheckCircle',
            title: 'Naturalization Applications',
            description: 'Guide clients through naturalization applications, ensuring they meet all requirements for citizenship.'
          },
          {
            icon: 'CheckCircle',
            title: 'Asylum Claims',
            description: 'Represent clients in asylum claims, helping refugees obtain protection and legal status.'
          },
          {
            icon: 'CheckCircle',
            title: 'Work Permits and Employment Visas',
            description: 'Assist businesses and individuals with work permits and employment-based immigration matters.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights Protection',
            description: 'Ensure clients\' rights are protected at all times throughout the immigration process.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Supreme Court & High Court Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'M.P. Sharma vs. Satish Chandra (1954)',
            description: 'Landmark Supreme Court judgement establishing that a person who is not an Indian citizen cannot claim the right to move freely throughout the country.'
          },
          {
            icon: 'CheckCircle',
            title: 'Indra Sawhney v. Union of India (1992)',
            description: 'Supreme Court case that challenged the constitutional validity of the reservation policy. The court held that the reservation policy was valid as long as it was within the parameters of the Constitution.'
          },
          {
            icon: 'CheckCircle',
            title: 'Azad Hind Bank vs. Central Bank of India (1998)',
            description: 'Supreme Court case related to foreign citizens investing in India. The court held that a foreign citizen can invest in India, but the government must approve it.'
          },
          {
            icon: 'CheckCircle',
            title: 'Sherry Khan v. Union of India (2006)',
            description: 'High Court case related to illegal migrants in India. The court held that illegal migrants should not be allowed to stay in India and should be deported to their country of origin.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ramesh Kumar v. Union of India (2012)',
            description: 'High Court case about granting visas to foreign nationals. The court held that the government of India has the right to grant or deny visas to foreign nationals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Anil Kapoor vs. Union of India (2018)',
            description: 'High Court case related to deportation of foreign nationals. The court held that the government has the right to deport foreign nationals who are staying in India illegally.'
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
            question: 'What is immigration law in India?',
            answer: 'Immigration law in India is the body of law that governs the entry, stay, and exit of foreign nationals into and from India. The main laws include the Foreigners Act, the Passports Act, and the Registration of Foreigners Act.'
          },
          {
            question: 'What do immigration lawyers in India do?',
            answer: 'Immigration lawyers in India work to assist individuals and businesses with navigating the complex legal requirements for entering and staying in India, as well as addressing any issues related to visas or citizenship.'
          },
          {
            question: 'What are the different types of immigration cases handled by lawyers?',
            answer: 'Immigration lawyers handle family-based immigration, employment-based immigration, asylum cases, citizenship and naturalization, DACA cases, deportation defense, humanitarian visas, and immigration appeals.'
          },
          {
            question: 'What are some common reasons to seek an immigration lawyer?',
            answer: 'Common reasons include obtaining a visa, extending stay in the country, applying for citizenship, or addressing any legal issues related to immigration status.'
          },
          {
            question: 'What is the process for obtaining a visa to enter India?',
            answer: 'The process depends on the specific type of visa being sought, but typically involves submitting an application and supporting documents to the appropriate Indian embassy or consulate.'
          },
          {
            question: 'What is the process for applying for Indian citizenship?',
            answer: 'The process depends on individual circumstances but typically involves meeting certain residency requirements and passing a citizenship test.'
          },
          {
            question: 'Can foreign nationals work in India?',
            answer: 'Yes, foreign nationals can work in India if they obtain the appropriate visa and work authorization.'
          },
          {
            question: 'What are the consequences of overstaying a visa in India?',
            answer: 'Consequences can include fines, deportation, and in some cases, being barred from entering the country in the future.'
          },
          {
            question: 'What is the process for appealing a visa or immigration decision?',
            answer: 'The process depends on the specific circumstances but typically involves filing an appeal with the appropriate authority or court.'
          },
          {
            question: 'What are some common immigration issues faced by businesses?',
            answer: 'Common issues include obtaining work permits for foreign employees, compliance with immigration regulations, and managing visa applications for international staff.'
          },
          {
            question: 'Are there restrictions on jobs that foreign nationals can hold in India?',
            answer: 'Yes, there are some restrictions on the types of jobs that foreign nationals can hold in India, particularly in certain industries or sectors.'
          },
          {
            question: 'How can I stay updated on changes to immigration laws?',
            answer: 'Stay updated by regularly consulting with immigration lawyers, subscribing to relevant publications or newsletters, and monitoring government websites for updates.'
          },
          {
            question: 'What is the role of the FRRO in India?',
            answer: 'The Foreigners Regional Registration Office (FRRO) in India is responsible for registering and monitoring the activities of foreign nationals in the country.'
          },
          {
            question: 'Can immigration lawyers assist with matters outside of India?',
            answer: 'Yes, immigration lawyers in India may be able to assist with immigration matters outside of India, particularly those involving Indian nationals or Indian immigration regulations.'
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
        body: 'Contact our expert immigration lawyers today for professional assistance with visa applications, citizenship, work permits, and all immigration matters',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Immigration Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Immigration Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.'
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
