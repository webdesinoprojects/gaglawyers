require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importSexualHarassmentService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Sexual Harassment/i });
    
    if (!service) {
      console.error('❌ Sexual Harassment service not found in database');
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
        heading: 'Sexual Harassment & Section 498A Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Legal Protection for Women',
          description: 'We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
          image: '/images/sexual-harassment-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Sexual Harassment 498A Cases',
        background: 'light',
        content: {
          text: 'Sexual Harassment Lawyer in Delhi specializes in Sexual Harassment 498A Cases and assists women facing cruelty and harassment. Section 498A of the Indian Penal Code (IPC) deals with sexual harassment and cruelty towards married women.\n\nSection 498A criminalizes acts of cruelty and harassment by a husband or his relatives against a married woman, including causing her physical or mental harm, insulting or threatening her, or subjecting her to cruelty or harassment for dowry or other demands. The law under Section 498A is a strong tool to protect the rights of married women in India.\n\nDefinition of Cruelty under Section 498A: Cruelty includes any wilful conduct that causes injury, danger to life, limb, or health (physical or mental) of the woman, or harassment including verbal, emotional, or financial abuse. Physical harm need not be proven; mental or emotional distress caused by the accused is sufficient.'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 3,
        heading: 'Key Legal Aspects of Section 498A',
        background: 'accent',
        content: {
          text: 'Non-Bailable and Non-Compoundable Offence: Section 498A is non-bailable and non-compoundable, meaning the accused cannot get bail easily, and the case cannot be withdrawn or settled. The police must investigate the complaint, and the accused may be arrested without a warrant.\n\nMisuse of Section 498A: Section 498A has been criticized and misused, leading to false harassment cases. The Indian judiciary has termed it "criminal terrorism," and measures like "compoundable with court permission" have been introduced.\n\nIn summary, Section 498A of IPC protects married women from cruelty and harassment. Our experienced lawyers ensure women get justice in Sexual Harassment 498A Cases.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 4,
        heading: 'Types of Acts and Provisions',
        background: 'light',
        content: {
          items: [
            {
              title: 'Indian Penal Code (IPC) Section 498A',
              description: 'Criminalizes cruelty and harassment by husband or relatives, including physical harm, insult, threat, or harassment for dowry.'
            },
            {
              title: 'Protection of Women from Domestic Violence Act (PWDVA)',
              description: 'Protects women from domestic violence, including sexual, physical, emotional, and economic abuse. Provides for protection officers and shelter homes.'
            },
            {
              title: 'Sexual Harassment of Women at Workplace Act, 2013',
              description: 'Addresses workplace sexual harassment. Internal Complaints Committees investigate complaints.'
            },
            {
              title: 'Criminal Law (Amendment) Act, 2013',
              description: 'Expanded the definition of rape, including forced oral/anal sex and acts on someone unable to consent.'
            },
            {
              title: 'Indian Evidence Act',
              description: 'Provides for admissibility of electronic records as evidence in court.'
            },
            {
              title: 'Code of Criminal Procedure (CrPC)',
              description: 'Governs investigation, prosecution, and trial procedures.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 5,
        heading: 'Rights and Obligations Under Section 498A',
        background: 'light',
        content: {
          items: [
            {
              title: 'Right to File Complaint',
              description: 'Women can file complaints against husband or relatives, even if not living together.'
            },
            {
              title: 'Right to Protection',
              description: 'Women are entitled to protection. Police must investigate and act.'
            },
            {
              title: 'Right to Relief',
              description: 'Includes maintenance, residence, and custody of children.'
            },
            {
              title: 'Obligation of Police',
              description: 'Police must investigate complaints and arrest the accused if necessary.'
            },
            {
              title: 'Obligation of Accused',
              description: 'Accused must appear in court; failure leads to arrest.'
            },
            {
              title: 'Obligation of Court',
              description: 'Court must hear the case and grant relief if cruelty is proven.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 6,
        heading: 'Charges, Penalties & Punishment',
        background: 'accent',
        content: {
          text: 'Charge of Cruelty: Filed for harassment by husband or relatives.\n\nPenalty: Conviction may result in imprisonment up to three years plus fine.\n\nPunishment: Includes imprisonment, fines, or both. Relief may include maintenance, residence, custody.\n\nBail: Non-bailable; requires court approval.\n\nNon-Compoundable: Cannot settle between parties without court permission.\n\nArrest: Police can arrest without a warrant.\n\nInvestigation: Police must investigate promptly and thoroughly.'
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 7,
        heading: 'Procedure to File a Case',
        background: 'light',
        content: {
          description: 'The legal process for filing a Sexual Harassment Section 498A case involves several steps:',
          steps: [
            {
              title: 'Filing Complaint',
              description: 'File complaint with police; provide accused\'s details and evidence.'
            },
            {
              title: 'Investigation',
              description: 'Police investigate, collect evidence, interrogate accused/witnesses, arrest if needed.'
            },
            {
              title: 'Recording Statements',
              description: 'Statements of complainant and witnesses recorded; collect medical, photo, digital evidence.'
            },
            {
              title: 'Filing Chargesheet',
              description: 'Police submit chargesheet to court with all evidence and findings.'
            },
            {
              title: 'Summoning Accused',
              description: 'Court summons accused; legal representation allowed for both parties.'
            },
            {
              title: 'Trial',
              description: 'Evidence presented; arguments heard from both sides.'
            },
            {
              title: 'Judgment',
              description: 'Verdict delivered; punishment awarded if guilty.'
            },
            {
              title: 'Appeal',
              description: 'Parties may appeal to higher court if dissatisfied with judgment.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 8,
        heading: 'Documents Required',
        background: 'light',
        content: {
          items: [
            {
              title: 'Marriage Certificate',
              description: 'Proof of marriage between complainant and accused.'
            },
            {
              title: 'Medical Records',
              description: 'Medical reports documenting injuries or health issues.'
            },
            {
              title: 'Evidence of Harassment',
              description: 'Emails, messages, phone records showing harassment.'
            },
            {
              title: 'Evidence of Cruelty',
              description: 'Photos, financial records, or other proof of cruelty.'
            },
            {
              title: 'Statement of Complainant',
              description: 'Detailed statement describing the incidents of harassment.'
            },
            {
              title: 'Witness Details',
              description: 'Contact information and statements from witnesses.'
            },
            {
              title: 'Proof of Residence',
              description: 'Documents showing current residence of complainant.'
            },
            {
              title: 'Proof of Dowry Demand',
              description: 'Evidence of dowry demands if applicable.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 9,
        heading: 'Role of Lawyer',
        background: 'light',
        content: {
          items: [
            {
              title: 'Legal Advice',
              description: 'Advising complainant on rights and legal options available.'
            },
            {
              title: 'Document Preparation',
              description: 'Preparing complaint and all necessary legal documents.'
            },
            {
              title: 'Court Representation',
              description: 'Representing client in court hearings and proceedings.'
            },
            {
              title: 'Plea Bargaining',
              description: 'Assisting in plea bargaining if applicable.'
            },
            {
              title: 'Appeals',
              description: 'Representing in appeals to higher courts.'
            },
            {
              title: 'Rights Protection',
              description: 'Protecting rights throughout the legal process.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 10,
        heading: 'How Grover & Grover, Advocates Help',
        background: 'accent',
        content: {
          text: 'Grover & Grover, Advocates and Solicitors specialize in Sexual Harassment 498A Cases. They help with:\n\n• Evidence collection (medical reports, witness statements)\n• Drafting complaints with legal precision\n• Court representation in hearings & appeals\n• Negotiating settlements when appropriate\n• Protecting your rights throughout the process\n\nHaving experienced legal representation ensures your case is handled professionally and your rights are protected at every stage.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 11,
        heading: 'Popular Cases of Supreme Court and High Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Sushil Kumar Sharma v. Union of India (2005)',
              description: 'This case, heard by the Supreme Court, involved a husband who had been falsely accused of cruelty by his spouse under Section 498A. The Supreme Court held that the provision could not be used as a weapon by estranged wives to harass their husbands and in-laws.'
            },
            {
              title: 'Rajesh Sharma v. State of Uttar Pradesh (2010)',
              description: 'This case, heard by the Allahabad High Court, dealt with false accusations of cruelty under Section 498A. The court held that false cases under this section should be handled seriously, and that the accused should be granted bail as soon as possible.'
            },
            {
              title: 'Rajesh Sharma v. State of Uttar Pradesh (Supreme Court, 2010)',
              description: 'This case handled the issue of anticipatory bail in cases of cruelty under Section 498A. The court held that anticipatory bail should be granted to the accused unless there is a prima facie case against them.'
            },
            {
              title: 'Sushma Sharma v. Union of India (2018)',
              description: 'This case, heard by the Delhi High Court, involved the misuse of Section 498A by women to falsely implicate their husbands and in-laws. The court held that the provision should not be used as a tool of oppression, and that the accused should be granted bail as soon as possible.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'faq',
        visible: true,
        order: 12,
        heading: 'Frequently Asked Questions',
        background: 'light',
        content: {
          faqs: [
            {
              question: 'What is the role of a sexual harassment lawyer?',
              answer: 'A sexual harassment lawyer specializes in providing legal advice and representation to victims or individuals facing sexual harassment issues.'
            },
            {
              question: 'How can I find a reliable sexual harassment lawyer near me?',
              answer: 'Look for local sexual harassment lawyers by searching online directories or consulting your state\'s bar association.'
            },
            {
              question: 'What are the signs that I may need to hire a sexual harassment lawyer?',
              answer: 'Common signs include ongoing harassment, retaliation, or when internal reporting systems fail to address the issue effectively.'
            },
            {
              question: 'How much does it cost to hire a sexual harassment lawyer?',
              answer: 'Legal fees can vary; some lawyers offer free initial consultations, while others work on a contingency fee basis or hourly rates.'
            },
            {
              question: 'What legal rights do victims of sexual harassment have?',
              answer: 'A sexual harassment lawyer can help you understand your rights, which may include protection from retaliation and the right to take legal action.'
            },
            {
              question: 'Can I file a sexual harassment lawsuit against my employer?',
              answer: 'Yes, if your employer fails to address the issue or engages in harassment, you may have grounds for a lawsuit.'
            },
            {
              question: 'What evidence is needed to prove a sexual harassment case?',
              answer: 'Your lawyer can guide you on the types of evidence required, which may include emails, witness statements, and more.'
            },
            {
              question: 'What is the difference between federal and state laws regarding sexual harassment?',
              answer: 'Sexual harassment laws can vary by jurisdiction, and a lawyer can help you understand how they apply in your specific case.'
            },
            {
              question: 'What is the statute of limitations for filing a sexual harassment lawsuit?',
              answer: 'Time limits for filing a lawsuit can vary, and a lawyer can help you determine if you are within the statute of limitations.'
            },
            {
              question: 'How long does a sexual harassment case typically take to resolve?',
              answer: 'The duration of a case can vary widely, but your lawyer can provide an estimate based on the specifics of your situation.'
            },
            {
              question: 'Can I remain anonymous when pursuing a sexual harassment case?',
              answer: 'Lawyers can provide guidance on maintaining your privacy during the legal process.'
            },
            {
              question: 'What should I do if I am facing retaliation for reporting sexual harassment at work?',
              answer: 'A sexual harassment lawyer can help you address retaliation and protect your rights.'
            },
            {
              question: 'How do I file a complaint with a government agency for sexual harassment?',
              answer: 'Your lawyer can assist you in the process of filing a complaint with the appropriate agency, such as the EEOC.'
            },
            {
              question: 'Do I need to go to court to resolve a sexual harassment case, or can it be settled out of court?',
              answer: 'Lawyers can explore settlement options, but they can also represent you in court if necessary.'
            },
            {
              question: 'What should I bring to my initial consultation with a sexual harassment lawyer?',
              answer: 'It\'s helpful to bring any relevant documents, such as emails, witness statements, and a timeline of events to your initial meeting with a lawyer.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 13,
        heading: 'Need Legal Help with Sexual Harassment Cases?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for expert legal representation in sexual harassment and Section 498A cases.',
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
        title: 'Sexual Harassment Lawyer in Delhi - GAG Lawyers',
        description: 'Sexual Harassment Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
        keywords: 'Sexual Harassment Lawyer near me, Best Sexual Harassment Lawyer near me, Top Sexual Harassment Lawyer in Delhi, Top Sexual Harassment Lawyer in India, Sexual Harassment Advocates in Delhi, best Advocates for Sexual Harassment cases in Delhi, Best lawyers Sexual Harassment cases in Delhi, lawyers for Sexual Harassment in Delhi, Sexual Harassment Lawyer in Supreme Court, Sexual Harassment Lawyer in High Court'
      }
    });

    console.log(`✅ Sexual Harassment & Section 498A Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importSexualHarassmentService();
