require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MONGO_URI = process.env.MONGO_URI;

async function importSupremeCourtService() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find service by name
    const service = await Service.findOne({ name: /Supreme Court/i });
    
    if (!service) {
      console.error('❌ Supreme Court service not found in database');
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
        heading: 'Supreme Court Lawyer in Delhi',
        background: 'dark',
        content: {
          subtitle: 'Expert Representation in India\'s Highest Court',
          description: 'We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
          image: '/images/supreme-court-hero.jpg'
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 2,
        heading: 'Supreme Court Lawyers',
        background: 'light',
        content: {
          text: 'Supreme Court Lawyers in Delhi are the highest level of legal practitioners in India. They are qualified to appear before the Supreme Court of India, the highest court of appeals in the country. Supreme Court Lawyers are highly experienced, knowledgeable, and respected in the legal profession.\n\nA Supreme Court Lawyer in Delhi must possess a valid Advocate on Record (AOR) certificate, issued by the Supreme Court of India. This certificate allows the lawyer to practice and appear before the Supreme Court. To obtain an AOR certificate, a lawyer must have at least seven years of practice in the High Court and pass the All India Bar Examination (AIBE), held twice a year.\n\nSupreme Court Lawyers in Delhi usually have extensive expertise in Indian law, judicial pronouncements, and procedural rules. They interpret the laws to serve their clients\' best interests and are consulted by other lawyers on Supreme Court matters. They enjoy prestige and influence, and many go on to become judges or Chief Justices of the Supreme Court or High Courts.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 3,
        heading: 'Types of Disputes Heard by Supreme Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Constitutional Disputes',
              description: 'The Supreme Court is the guardian of the Indian Constitution. Lawyers handle disputes between states, between the central government and states, or between citizens. They review legislation to ensure it aligns with the Constitution.'
            },
            {
              title: 'Civil Disputes',
              description: 'Supreme Court Lawyers handle civil disputes involving property, contracts, land, and economic matters. Cases may include disputes between citizens, states, or the government.'
            },
            {
              title: 'Criminal Disputes',
              description: 'Lawyers handle criminal appeals, including death penalty cases. They argue bail petitions, challenge criminal proceedings, and represent clients in high-stakes criminal matters.'
            },
            {
              title: 'Tax Disputes',
              description: 'The Supreme Court is the court of last resort for tax-related disputes. Lawyers advise on tax law interpretation, liability, and penalties.'
            },
            {
              title: 'Other Disputes',
              description: 'Supreme Court Lawyers handle disputes in public policy, international law, administrative law, and appeals from High Courts and tribunals.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 4,
        heading: 'Role of Supreme Court Lawyer',
        background: 'accent',
        content: {
          items: [
            {
              title: 'Legal Research and Analysis',
              description: 'Conduct extensive research on legal issues, judicial precedents, and constitutional provisions relevant to the case.'
            },
            {
              title: 'Document Preparation',
              description: 'Prepare briefs, petitions, motions, and pleadings according to Supreme Court rules and procedures.'
            },
            {
              title: 'Strategic Advice',
              description: 'Interpret legal issues and provide clients with strategic advice on case management and legal remedies.'
            },
            {
              title: 'Court Representation',
              description: 'Represent clients in Supreme Court proceedings, present evidence persuasively, and cross-examine witnesses effectively.'
            },
            {
              title: 'Settlement Negotiation',
              description: 'Negotiate settlements and manage case strategy to achieve the best possible outcomes for clients.'
            },
            {
              title: 'Procedural Compliance',
              description: 'Ensure compliance with Supreme Court rules, procedural requirements, and filing deadlines.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'process',
        visible: true,
        order: 5,
        heading: 'Procedure to File a Case in Supreme Court',
        background: 'light',
        content: {
          description: 'Filing a case in the Supreme Court of India is complex. Supreme Court Lawyers guide clients through the process:',
          steps: [
            {
              title: 'Drafting Special Leave Petition (SLP)',
              description: 'The SLP is drafted according to Supreme Court Rules, 1966, detailing facts and relief sought.'
            },
            {
              title: 'Filing with Registry',
              description: 'The SLP is filed with the Supreme Court Registry, accompanied by affidavit and notarized documents.'
            },
            {
              title: 'Docket Number Assignment',
              description: 'The Registry assigns a number, and the SLP is listed before the Supreme Court. Notices may be issued.'
            },
            {
              title: 'Hearing',
              description: 'After the hearing, the court grants or denies relief. Costs and damages may be ordered.'
            },
            {
              title: 'Appeal',
              description: 'If relief is denied, a further appeal may be filed in the Supreme Court.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 6,
        heading: 'Documents Required to File a Case',
        background: 'light',
        content: {
          items: [
            {
              title: 'Writ Petition or SLP',
              description: 'The main petition document outlining the case and relief sought.'
            },
            {
              title: 'Affidavit',
              description: 'Affidavit in support of the petition with sworn statements.'
            },
            {
              title: 'Memo of Parties',
              description: 'Memo of parties and vakalatnama (authorization to represent).'
            },
            {
              title: 'Index of Documents',
              description: 'Complete index of all documents being filed with the petition.'
            },
            {
              title: 'Supporting Evidence',
              description: 'Copies of contracts, agreements, or other evidence supporting the case.'
            },
            {
              title: 'Court Order',
              description: 'Court order granting permission to file, if applicable.'
            },
            {
              title: 'Administrative Documents',
              description: 'Cause list, court fees, notice of hearing, and summons.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'overview',
        visible: true,
        order: 7,
        heading: 'How Grover & Grover, Advocates Help in Supreme Court Cases',
        background: 'accent',
        content: {
          text: 'Grover & Grover, Advocates and Solicitors in New Delhi specialize in Supreme Court cases. They provide:\n\n• Filing petitions and preparing legal documents\n• Representing clients in Supreme Court proceedings\n• Conducting research and preparing legal briefs\n• Expertise in Supreme Court rules and procedures\n• Handling bail applications and criminal appeals\n• Managing civil, constitutional, and tax disputes\n\nClients can trust Grover & Grover, Advocates for top-level guidance and representation in the Supreme Court of India.'
        }
      },
      {
        serviceId: service._id,
        type: 'benefits',
        visible: true,
        order: 8,
        heading: 'Popular Cases of Supreme Court',
        background: 'light',
        content: {
          items: [
            {
              title: 'Keshavananda Bharati v. State of Kerala (1973)',
              description: 'Landmark case established the doctrine of basic structure which held that the Indian Constitution was not amendable in its entirety and certain basic features of the Constitution could not be changed. This case was instrumental in providing some permanency to the Indian Constitution.'
            },
            {
              title: 'Unnikrishnan v. State of Andhra Pradesh (1993)',
              description: 'One of the most important cases in the realm of education in India. The Supreme Court held that the right to education is a fundamental right and is a part of the right to life under Article 21 of the Constitution.'
            },
            {
              title: 'Maneka Gandhi v. Union of India (1978)',
              description: 'Important case which established the principle of procedural due process. The Supreme Court held that the procedure adopted by the government in depriving a person of his or her life or liberty must not be arbitrary, but must be fair, just and reasonable.'
            },
            {
              title: 'Vishakha and Others v. State of Rajasthan (1997)',
              description: 'One of the most important cases in the realm of women\'s rights in India. The Supreme Court held that sexual harassment of women at the workplace is a violation of their fundamental rights and laid down guidelines to prevent and redress sexual harassment.'
            }
          ]
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
              question: 'What is the Supreme Court of India?',
              answer: 'The Supreme Court of India is the highest judicial authority in the country.'
            },
            {
              question: 'How many judges are there in the Supreme Court of India?',
              answer: 'Currently, the Supreme Court has a sanctioned strength of 34 judges, including the Chief Justice of India.'
            },
            {
              question: 'What is the role of a Supreme Court Lawyer in India?',
              answer: 'A Supreme Court Lawyer represents clients before the Supreme Court of India and helps them navigate complex legal matters and appeals.'
            },
            {
              question: 'What kind of cases does the Supreme Court of India hear?',
              answer: 'The Supreme Court of India hears cases related to civil, criminal, constitutional, and administrative matters.'
            },
            {
              question: 'How can I file a case in the Supreme Court of India?',
              answer: 'To file a case in the Supreme Court of India, one must submit a Special Leave Petition (SLP) along with relevant documents and court fees.'
            },
            {
              question: 'What is the time limit for filing an SLP in the Supreme Court of India?',
              answer: 'The time limit for filing an SLP is 90 days from the date of the judgment or order passed by the High Court or any other subordinate court.'
            },
            {
              question: 'Can I directly file a case in the Supreme Court of India?',
              answer: 'Generally, one cannot directly file a case in the Supreme Court of India. However, in certain exceptional cases, the Supreme Court may entertain a petition filed directly.'
            },
            {
              question: 'What is the jurisdiction of the Supreme Court of India?',
              answer: 'The Supreme Court of India has jurisdiction over the entire country and can hear appeals from all high courts and other subordinate courts.'
            },
            {
              question: 'What is a review petition in the Supreme Court of India?',
              answer: 'A review petition is a request filed by a party to the case for the reconsideration of a judgment or order passed by the Supreme Court.'
            },
            {
              question: 'Can I appeal the decision of the Supreme Court of India?',
              answer: 'In certain cases, a party can appeal the decision of the Supreme Court of India by filing a curative petition or a review petition.'
            },
            {
              question: 'What is the role of the Chief Justice of India?',
              answer: 'The Chief Justice of India is the head of the Indian judiciary and the administrative head of the Supreme Court of India.'
            },
            {
              question: 'How is the Chief Justice of India appointed?',
              answer: 'The President of India appoints the Chief Justice of India in consultation with other judges of the Supreme Court and high courts.'
            },
            {
              question: 'How can I find a good Supreme Court Lawyer in India?',
              answer: 'One can find a good Supreme Court Lawyer in India by asking for referrals, conducting online research, and verifying their credentials.'
            },
            {
              question: 'What is the difference between an SLP and an appeal in the Supreme Court of India?',
              answer: 'An SLP is a discretionary remedy and a way to seek permission to appeal before the Supreme Court, while an appeal is a right granted by law to parties dissatisfied with a lower court.'
            },
            {
              question: 'What is the process of hearing a case in the Supreme Court of India?',
              answer: 'The Supreme Court of India follows a process of oral arguments, written submissions, and evidentiary hearings to adjudicate cases.'
            },
            {
              question: 'How long does it take for a case to be heard and decided by the Supreme Court of India?',
              answer: 'The time taken for a case to be heard and decided by the Supreme Court of India depends on various factors such as the complexity of the case, the number of parties involved, and the workload of the court.'
            },
            {
              question: 'What are the qualifications required to become a Supreme Court judge?',
              answer: 'A person must have been a judge of a high court for at least five years, or an advocate of a high court for at least ten years, or an outstanding jurist in the opinion of the President of India to be appointed as a Supreme Court judge.'
            }
          ]
        }
      },
      {
        serviceId: service._id,
        type: 'cta_banner',
        visible: true,
        order: 10,
        heading: 'Need Expert Supreme Court Representation?',
        background: 'dark',
        content: {
          description: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional Supreme Court legal services in Delhi.',
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
        title: 'Supreme Court Lawyer in Delhi - GAG Lawyers',
        description: 'Supreme Court Lawyer in Delhi - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in Delhi. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.',
        keywords: 'Best Supreme Court Lawyer near me, Top Supreme Court Lawyer in India, Best Advocates for Supreme Court Lawyer Cases in Delhi, Supreme Court Lawyer for bail, Top Supreme Court Lawyer for Bail, Supreme Court Lawyer near me, best Supreme Court advocate in Chennai, top 10 Supreme Court advocate in Lucknow, top 10 Supreme Court advocate in Patna, best Supreme Court advocate Allahabad, best Supreme Court advocate Delhi, best Supreme Court advocate in Ahmedabad, best Supreme Court lawyer in Delhi, best Supreme Court advocate in Chandigarh, Supreme Court criminal advocate'
      }
    });

    console.log(`✅ Supreme Court Lawyer imported — ${sections.length} sections saved`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importSupremeCourtService();
