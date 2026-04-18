require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'human-rights-lawyer',
  name: 'Human Rights Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Human Rights Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Human Rights Cases',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Human Rights Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Human rights lawyers must possess a deep understanding of the law and be well-versed in the evidence required to prove an issue related to human rights. In addition, they must possess the skills to construct robust human rights cases for their clients, which involves collecting facts, interviewing witnesses, and researching legal precedents.\n\nHuman rights in India refer to the fundamental rights and freedoms that every individual in the country is entitled to. These rights are enshrined in the Constitution of India and protected by various laws and regulations.'
      }
    },
    {
      type: 'benefits',
      heading: 'Fundamental Human Rights in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Right to Equality',
            description: 'This includes the right to equal treatment under the law, regardless of one\'s gender, caste, religion, or race.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Freedom',
            description: 'This includes the right to freedom of speech and expression, freedom of assembly, freedom of movement, and freedom of religion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Life and Personal Liberty',
            description: 'This includes the right to live with dignity, the right to be free from torture or inhumane treatment, and the right to personal liberty.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Education',
            description: 'This includes the right to free and compulsory education for all children between the ages of 6 and 14.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Work',
            description: 'This includes the right to work and earn a living wage, as well as the right to form and join trade unions.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Health',
            description: 'This includes the right to access healthcare facilities and services.'
          },
          {
            icon: 'CheckCircle',
            title: 'Right to Information',
            description: 'This includes the right to access information held by the government or any other public authority.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Constitutional Protection and International Treaties',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        body: 'In addition to these rights, India is also a signatory to various international treaties and conventions on human rights, including the Universal Declaration of Human Rights and the International Covenant on Civil and Political Rights. The government of India has also established several institutions, such as the National Human Rights Commission, to promote and protect human rights in the country.\n\nIndia has a rich cultural and social history, and the Constitution of India recognizes the diversity and pluralism of its society. The Constitution guarantees not only fundamental rights but also the right to cultural and educational autonomy to its citizens, especially minorities. The Constitution also protects the rights of women, children, and vulnerable sections of society, such as the disabled and the elderly.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Human Rights Available',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Civil and Political Rights',
            description: 'These rights protect the individual\'s freedom, dignity, and autonomy. Examples include the right to life and liberty, the right to equality, the right to freedom of speech and expression, the right to a fair trial, and the right to privacy.'
          },
          {
            icon: 'CheckCircle',
            title: 'Women\'s Rights',
            description: 'These rights specifically address issues of gender-based discrimination, violence, and inequality. Examples include the right to equality, the right to protection from sexual harassment and domestic violence, and the right to reproductive health.'
          },
          {
            icon: 'CheckCircle',
            title: 'Economic, Social, and Cultural Rights',
            description: 'These rights protect an individual\'s well-being, standard of living, and social welfare. Examples include the right to education, the right to health, the right to work and a decent living wage, the right to housing, and the right to food.'
          },
          {
            icon: 'CheckCircle',
            title: 'Children\'s Rights',
            description: 'These rights are specifically aimed at protecting the rights and well-being of children. Examples include the right to education, the right to protection from exploitation and abuse, and the right to a safe and nurturing environment.'
          },
          {
            icon: 'CheckCircle',
            title: 'Minority Rights',
            description: 'These rights protect the rights of religious, linguistic, and ethnic minorities. Examples include the right to cultural and educational autonomy, the right to freedom of religion, and the right to protection from discrimination.'
          },
          {
            icon: 'CheckCircle',
            title: 'Rights of Persons with Disabilities',
            description: 'These rights protect the rights of persons with disabilities and promote their full participation in society. Examples include the right to education, the right to employment, the right to access healthcare, and the right to accessible public spaces.'
          },
          {
            icon: 'CheckCircle',
            title: 'Environmental Rights',
            description: 'These rights address environmental issues and promote sustainable development. Examples include the right to clean air and water, the right to a healthy environment, and the right to the protection of natural resources.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Legal Framework in Human Rights Law',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'The legal framework of human rights in India is based on several sources, including the Constitution of India, domestic laws, and international human rights treaties. The Constitution of India is the supreme law of the land and provides the framework for the protection and promotion of human rights.\n\nSeveral laws have been enacted to protect human rights in India, such as the Protection of Human Rights Act, 1993, the Right to Information Act, 2005, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act, 2013. The National Human Rights Commission (NHRC) and the State Human Rights Commissions (SHRCs) have been established to investigate complaints of human rights violations and make recommendations for redress.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Human Rights Case',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Identify the Human Rights Commission',
            description: 'Depending on the nature of the complaint and the location of the violation, you need to approach the NHRC or the SHRC of the respective state.'
          },
          {
            stepNumber: 2,
            title: 'Draft the Complaint',
            description: 'The complaint should include a description of the incident, the nature of the violation, and the parties involved. Provide any supporting documents, such as witness statements, medical reports, and photographs.'
          },
          {
            stepNumber: 3,
            title: 'Submit the Complaint',
            description: 'The complaint can be submitted in person, by post, or through email to the Human Rights Commission. You can also file an online complaint through the NHRC or SHRC websites.'
          },
          {
            stepNumber: 4,
            title: 'Acknowledgment and Investigation',
            description: 'The Commission will acknowledge the receipt of the complaint and assign a case number. The Commission will investigate the complaint and may seek additional information from the concerned parties.'
          },
          {
            stepNumber: 5,
            title: 'Recommendations and Follow-up',
            description: 'Based on the investigation, the Commission may make recommendations for redress, such as compensation, rehabilitation, and legal action against the perpetrators. Follow up with the Commission to ensure implementation.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Human Rights Lawyer',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Representation',
            description: 'Lawyers can represent victims of human rights violations, such as police brutality, custodial torture, extrajudicial killings, and discrimination. They can provide legal advice, file complaints and petitions in courts, and pursue legal remedies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Advocacy and Legal Reforms',
            description: 'Lawyers can engage in advocacy and lobby for legal reforms that promote and protect human rights. They can work with civil society organizations, policymakers, and other stakeholders to ensure compliance with human rights standards.'
          },
          {
            icon: 'CheckCircle',
            title: 'Public Interest Litigation',
            description: 'Lawyers can file public interest litigation (PIL) in courts to seek remedies for systemic human rights violations that affect a large number of people. PILs have been instrumental in bringing about legal and policy changes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Capacity Building',
            description: 'Lawyers can contribute to capacity building by conducting legal training programs, workshops, and seminars on human rights issues. They can also mentor and guide young lawyers interested in human rights law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Monitoring and Reporting',
            description: 'Lawyers can monitor and report on human rights violations by working with human rights organizations, civil society groups, and the media. They can document violations, advocate for accountability, and raise awareness.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Human Rights Case',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Complaint or Petition',
            description: 'A written complaint or petition is the most important document. The complaint should clearly describe the facts and circumstances of the violation, including the date, time, place, and persons involved.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavit',
            description: 'An affidavit is a sworn statement made by the victim or witness of a human rights violation. The affidavit should include the details of the violation and should be signed in the presence of a notary public or judicial officer.'
          },
          {
            icon: 'CheckCircle',
            title: 'Documentary Evidence',
            description: 'Documentary evidence, such as medical reports, police reports, photographs, videos, and other records, can be used to support the complaint. These documents should be relevant and authenticated.'
          },
          {
            icon: 'CheckCircle',
            title: 'Witness Statements',
            description: 'Witness statements can be used to corroborate the victim\'s account of the human rights violation. Witnesses can be identified by the victim or the lawyer, and their statements should be signed and notarized.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Documents',
            description: 'Legal documents, such as power of attorney, vakalatnama, and court fee receipts, may also be required to file a case of human rights violation in India.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover Advocates Help',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Grover & Grover Advocates is a well-known law firm in India that has a dedicated team of lawyers who specialize in human rights law. They provide legal assistance and representation to victims of human rights violations in India, and they work to ensure that justice is served in all cases.\n\nThe firm has over 50 years of experience in providing legal services to clients across a range of areas, including human rights law. The firm has a team of highly experienced and dedicated lawyers who specialize in human rights law and have a deep understanding of the legal and social issues related to human rights in India.\n\nOne of the key strengths of Grover & Grover Advocates is its commitment to the cause of human rights in India. The firm has a strong track record of representing clients in high-profile cases of human rights violations and has successfully secured justice and compensation for victims.'
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
            title: 'Maneka Gandhi v. Union of India (1978)',
            description: 'This landmark case related to the right to travel and passport rights. The Supreme Court held that the right to travel abroad is a fundamental right under Article 21 of the Constitution and cannot be curtailed except through due process of law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Vishakha v. State of Rajasthan (1997)',
            description: 'This case related to the sexual harassment of women in the workplace. The Supreme Court laid down guidelines to prevent sexual harassment and recognized it as a violation of fundamental rights under Articles 14, 15, and 21.'
          },
          {
            icon: 'CheckCircle',
            title: 'Olga Tellis v. Bombay Municipal Corporation (1985)',
            description: 'This case related to the right to livelihood for pavement dwellers in Mumbai. The Supreme Court held that the right to livelihood is a fundamental right under Article 21 and cannot be taken away arbitrarily.'
          },
          {
            icon: 'CheckCircle',
            title: 'Naz Foundation v. Government of NCT of Delhi (2009)',
            description: 'This case related to the decriminalization of homosexuality. The Delhi High Court struck down Section 377 of the Indian Penal Code as unconstitutional and a violation of fundamental rights.'
          },
          {
            icon: 'CheckCircle',
            title: 'PUCL v. Union of India (2002)',
            description: 'This case relates to the right to food and starvation deaths. The Supreme Court directed the government to implement various schemes and programs to ensure that every citizen has access to food.'
          },
          {
            icon: 'CheckCircle',
            title: 'PUCL v. State of Maharashtra (2014)',
            description: 'This case related to police encounters and extrajudicial killings. The Bombay High Court directed the government to set up a special investigative team to investigate all cases of police encounters.'
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
            question: 'What are human rights in India?',
            answer: 'Human rights in India refer to the fundamental rights that every individual is entitled to, regardless of their race, gender, religion, caste, or any other factor. These rights include the right to life, liberty, and equality, as well as freedom of speech, assembly, and religion.'
          },
          {
            question: 'What is the legal framework for human rights in India?',
            answer: 'The legal framework for human rights in India is based on the Constitution of India, domestic laws such as the Protection of Human Rights Act 1993, and international human rights treaties. The National Human Rights Commission (NHRC) and State Human Rights Commissions (SHRCs) are key institutions for protection.'
          },
          {
            question: 'What is the role of the NHRC in protecting human rights in India?',
            answer: 'The NHRC is an independent statutory body established in 1993 that investigates complaints of human rights violations, makes recommendations for redress, initiates suo motu investigations, and works to promote and protect human rights in India through awareness and education programs.'
          },
          {
            question: 'What is the status of women\'s rights in India?',
            answer: 'Women\'s rights in India are protected under the Constitution and various laws including the Protection of Women from Domestic Violence Act 2005, Sexual Harassment at Workplace Act 2013, and Dowry Prohibition Act. However, challenges remain in implementation and addressing gender-based discrimination and violence.'
          },
          {
            question: 'What is the status of LGBTQ+ rights in India?',
            answer: 'In 2018, the Supreme Court decriminalized consensual homosexual acts by reading down Section 377 of the Indian Penal Code. However, LGBTQ+ individuals still face discrimination and lack comprehensive legal protections in areas such as marriage, adoption, and anti-discrimination laws.'
          },
          {
            question: 'What is the status of child rights in India?',
            answer: 'Child rights in India are protected under the Constitution and laws such as the Juvenile Justice Act 2015, Right to Education Act 2009, and Child Labour Prohibition Act. The government has implemented various schemes for child welfare, though challenges remain in areas like child labor and trafficking.'
          },
          {
            question: 'What is the role of the judiciary in protecting human rights in India?',
            answer: 'The judiciary plays a crucial role through judicial review, issuing writs for enforcement of fundamental rights, interpreting the Constitution and laws to ensure consistency with human rights principles, and hearing public interest litigations that address systemic human rights violations.'
          },
          {
            question: 'What do human rights lawyers in India do?',
            answer: 'Human rights lawyers in India provide legal representation to victims of human rights violations, file complaints and petitions, engage in advocacy for legal reforms, conduct public interest litigation, provide capacity building and training, and monitor and report on human rights violations.'
          },
          {
            question: 'What is the role of the National Human Rights Commission in India?',
            answer: 'The NHRC investigates complaints of human rights violations, makes recommendations for redress including compensation and legal action, conducts suo motu investigations, promotes human rights awareness and education, and monitors the implementation of international human rights treaties in India.'
          },
          {
            question: 'What are some common human rights violations in India?',
            answer: 'Common violations include police brutality and custodial torture, extrajudicial killings, discrimination based on caste, religion, or gender, violations of women\'s and children\'s rights, restrictions on freedom of speech and expression, and violations of rights of marginalized communities.'
          },
          {
            question: 'What remedies are available for human rights violations in India?',
            answer: 'Remedies include filing complaints with NHRC or SHRCs, filing criminal complaints with police, filing civil suits for compensation, filing writ petitions in High Courts or Supreme Court, public interest litigation, and seeking interim relief such as protection orders or medical treatment.'
          },
          {
            question: 'What is the process for pursuing a human rights case in court in India?',
            answer: 'The process involves gathering evidence and documentation, filing a complaint or petition with the appropriate forum (NHRC, SHRC, or court), attending hearings and presenting evidence, obtaining recommendations or judgments, and following up on implementation of remedies ordered.'
          },
          {
            question: 'Can human rights lawyers in India work on cases outside of India?',
            answer: 'Yes, human rights lawyers in India can work on international cases by engaging with international human rights bodies like the UN, participating in international conferences and advocacy, submitting reports to international bodies, and collaborating with international human rights organizations.'
          },
          {
            question: 'How are human rights lawyers in India regulated?',
            answer: 'Human rights lawyers in India are regulated by the Bar Council of India and State Bar Councils, which set standards for legal practice, conduct, and ethics. Lawyers must be enrolled with a Bar Council and follow the Advocates Act 1961 and Bar Council rules.'
          },
          {
            question: 'How can individuals get involved in human rights advocacy in India?',
            answer: 'Individuals can get involved by volunteering with human rights organizations, participating in awareness campaigns and protests, documenting and reporting violations, supporting victims through legal aid or counseling, pursuing education in human rights law, and engaging with policymakers for legal reforms.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Human Rights Legal Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional human rights legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Human Rights Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert human rights legal services in Delhi. Professional representation for human rights violations, NHRC complaints, and constitutional rights protection.'
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
