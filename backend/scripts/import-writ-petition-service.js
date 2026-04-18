require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

async function importWritPetitionService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find the service
    const service = await Service.findOne({ slug: 'writ-petition-lawyer' });
    if (!service) {
      console.error('❌ Service not found: writ-petition-lawyer');
      process.exit(1);
    }

    console.log(`Found service: ${service.name} (${service._id})`);

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });
    console.log('🗑️  Deleted existing sections');

    // Create sections array
    const sections = [
      {
        type: 'hero',
        heading: 'Writ Petition Lawyer',
        visible: true,
        order: 0,
        background: 'dark',
        content: {
          subheading: 'Expert Legal Services for Writ Petitions and Constitutional Remedies - GAG Lawyers',
          ctaText: 'Schedule Consultation',
          ctaLink: '/contact',
          backgroundImageUrl: ''
        }
      },
      {
        type: 'overview',
        heading: 'Writ Petition',
        visible: true,
        order: 1,
        background: 'light',
        content: {
          body: 'A writ petition is a legal procedure through which an individual or organization can approach the court for enforcement of a legal right or to prevent an illegal act. It is a remedy provided under the Constitution of India for protecting citizens\' fundamental rights.\n\nWrit Petition Lawyer in Delhi ensures that the petitioner\'s rights are represented effectively in court. A writ petition is filed to address violations of fundamental rights, abuse of power by public authorities, or illegal actions affecting citizens. Best Writ Petition Lawyers near me are skilled at guiding clients through this complex legal process.\n\nThe Supreme Court of India and High Courts have the authority to hear writ petitions. Top Writ Petition Lawyer in India can draft, file, and represent clients in all types of writ petitions, ensuring compliance with the Constitution and procedural rules. Best Advocates for Writ Petition Cases in Delhi are often consulted for high-profile cases involving constitutional and legal rights.'
        }
      },
      {
        type: 'benefits',
        heading: 'Types of Writ Petition',
        visible: true,
        order: 2,
        background: 'light',
        content: {
          items: [
            {
              icon: 'Scale',
              title: 'Writ of Mandamus',
              description: 'A court order compelling an individual or government agency to perform a duty it is legally obligated to carry out. Writ Petition Lawyer in Delhi frequently use this writ to enforce statutory obligations.'
            },
            {
              icon: 'Shield',
              title: 'Writ of Habeas Corpus',
              description: 'Ensures that a person unlawfully detained is brought before the court. Lawyer for Writ Petition Matters in Delhi handle these cases to protect personal liberty.'
            },
            {
              icon: 'FileText',
              title: 'Writ of Certiorari',
              description: 'Directs a lower court to send the record of a case for review. Best Lawyers for Writ Petition Cases in Delhi often use this to correct judicial errors.'
            },
            {
              icon: 'AlertCircle',
              title: 'Writ of Prohibition',
              description: 'Prevents a lower court from exceeding its jurisdiction. Writ Petition Lawyer in High Court and Supreme Court advise clients on using this writ strategically.'
            },
            {
              icon: 'Users',
              title: 'Writ of Quo Warranto',
              description: 'Challenges the right of a person to hold a public office or position. Lawyer for Writ Petition Disputes in Delhi prepare cases to question unlawful authority claims.'
            }
          ]
        }
      },
      {
        type: 'overview',
        heading: 'Acts and Provisions Under Writ Petition',
        visible: true,
        order: 3,
        background: 'light',
        content: {
          body: 'The Administrative Tribunals Act, 1985, provides for the establishment of tribunals for disputes regarding recruitment, service conditions, and related matters. Writ Petition Lawyer in Delhi leverage this act when filing petitions against administrative authorities.\n\nThe Central Administrative Tribunal (CAT) adjudicates disputes of central government employees, including IAS, IPS, and other service matters.\n\nHigh Courts entertain writ petitions under Article 226 of the Constitution of India. Citizens can file a writ petition to address violations of fundamental rights or abuse of power by government authorities.\n\nThe Supreme Court of India can issue writs of habeas corpus, mandamus, prohibition, certiorari, and quo warranto. Top Writ Petition Lawyer in India represent clients in such cases to protect their constitutional rights.'
        }
      },
      {
        type: 'benefits',
        heading: 'Rights and Obligations Under Writ Petition',
        visible: true,
        order: 4,
        background: 'light',
        content: {
          items: [
            {
              icon: 'CheckCircle',
              title: 'Right to Approach Court',
              description: 'Petitioners can approach the court when fundamental rights are violated. Filing a writ petition gives citizens the right to access the court and seek remedies for violations of fundamental rights.'
            },
            {
              icon: 'Award',
              title: 'Right to Remedies',
              description: 'The court can grant damages, compensation, or enforce remedies. Orders can compel government authorities to take corrective action.'
            },
            {
              icon: 'FileCheck',
              title: 'Obligation to Prove',
              description: 'Petitioners must prove that the issue requires judicial intervention. Facts must be presented clearly and coherently.'
            },
            {
              icon: 'Gavel',
              title: 'Compliance with Orders',
              description: 'Petitioners must comply with court orders. Best Writ Petition Lawyers near me guide petitioners in exercising these rights responsibly.'
            }
          ]
        }
      },
      {
        type: 'benefits',
        heading: 'Role of Lawyers in Writ Petition',
        visible: true,
        order: 5,
        background: 'dark',
        content: {
          items: [
            {
              icon: 'Search',
              title: 'Legal Research',
              description: 'Research laws, regulations, and case precedents relevant to the petition. Top Writ Petition Lawyer in India provide comprehensive guidance throughout the process.'
            },
            {
              icon: 'FileText',
              title: 'Drafting Petition',
              description: 'Ensure that the writ petition is accurate, legally compliant, and includes all necessary details with proper legal formatting.'
            },
            {
              icon: 'Users',
              title: 'Court Representation',
              description: 'Present evidence, make legal arguments, and protect the petitioner\'s rights during court proceedings.'
            },
            {
              icon: 'MessageCircle',
              title: 'Follow-up Advice',
              description: 'Inform petitioners about the implications of court rulings and advise on appeals if necessary.'
            }
          ]
        }
      },
      {
        type: 'process',
        heading: 'Procedure to File Writ Petition',
        visible: true,
        order: 6,
        background: 'light',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'Draft the Writ Petition',
              description: 'Draft the writ petition including all facts, evidence, and cause of action. Lawyer for Writ Petition Disputes in Delhi ensures accuracy and legal compliance.'
            },
            {
              stepNumber: 2,
              title: 'Attach Supporting Documents',
              description: 'Attach relevant documents, laws, and regulations to the petition. Include all necessary evidence and legal references.'
            },
            {
              stepNumber: 3,
              title: 'Submit to Appropriate Court',
              description: 'Submit the petition to the appropriate court, such as High Court or Supreme Court, depending on the issue and jurisdiction.'
            },
            {
              stepNumber: 4,
              title: 'Court Notice and Interim Relief',
              description: 'Court may issue notice to the opposite party or grant interim relief based on the urgency and merits of the case.'
            },
            {
              stepNumber: 5,
              title: 'Final Order and Appeals',
              description: 'If the court rules in favor, the relief is granted. If not, an appeal can be filed to a higher court. Best Lawyers for Writ Petition Cases in Delhi assist in filing appeals effectively.'
            }
          ]
        }
      },
      {
        type: 'overview',
        heading: 'Documents Required to File Writ Petition',
        visible: true,
        order: 7,
        background: 'light',
        content: {
          body: '• Copy of the petition with jurisdiction and facts\n• Covering letter explaining why the petition should be heard\n• Affidavit with evidence supporting the case\n• Memorandum of Arguments outlining legal reasoning\n• Exhibits including documents, photographs, or physical evidence\n\nWrit Petition Lawyer in High Court ensures all documents are properly prepared and submitted according to court requirements.'
        }
      },
      {
        type: 'overview',
        heading: 'How Grover & Grover, Advocates Help to File Writ Petition',
        visible: true,
        order: 8,
        background: 'light',
        content: {
          body: 'Grover & Grover Advocates and Solicitors provide:\n\n• Legal research and strategy for writ petitions\n• Drafting and filing petitions with complete documentation\n• Representation in court proceedings for High Court and Supreme Court\n• Guidance on legal procedures and remedies for the petitioner\n\nClients can rely on Writ Petition Lawyer fees in Delhi, Best Writ Petition Lawyers near me, Top Writ Petition Lawyer in India, and Best Advocates for Writ Petition Cases in Delhi for expert representation.\n\nOther services include: Best Lawyers for Writ Petition Cases in Delhi, Lawyer for Writ Petition Matters in Delhi, Lawyer for Writ Petition Disputes in Delhi, Writ Petition Lawyer in High Court, and Top Writ Petition Lawyer in Supreme Court.'
        }
      },
      {
        type: 'faq',
        heading: 'Frequently Asked Questions - Writ Petition',
        visible: true,
        order: 9,
        background: 'light',
        content: {
          items: [
            {
              question: 'What is a Writ Petition?',
              answer: 'A Writ Petition is a legal remedy available in India under the Constitution of India to enforce fundamental rights or other legal rights of a person against the violation of those rights by the state or any other public authority.'
            },
            {
              question: 'How to file a Writ Petition in India?',
              answer: 'A Writ Petition can be filed in the High Court or the Supreme Court of India, depending on the nature of the case. It is generally filed by a person aggrieved by the violation of his/her fundamental rights or any other legal right. It is advisable to consult a lawyer before filing a Writ Petition, as it involves technicalities of law and procedure.'
            },
            {
              question: 'What are the types of Writ Petitions?',
              answer: 'The types of Writ Petitions available in India are: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.'
            },
            {
              question: 'What is the difference between a Writ Petition and a PIL?',
              answer: 'A Writ Petition is filed by an aggrieved person who seeks legal remedy against the violation of his/her fundamental rights or any other legal right, while a Public Interest Litigation (PIL) is filed by a person in the interest of the public at large.'
            },
            {
              question: 'Who can file a Writ Petition in India?',
              answer: 'A Writ Petition can be filed by any person who is aggrieved by the violation of his/her fundamental rights or any other legal right. Even a public-spirited person or a group of persons can file a Writ Petition in the interest of the public.'
            },
            {
              question: 'What is the time limit for filing a Writ Petition?',
              answer: 'The time limit for filing a Writ Petition varies depending on the nature of the case and the court in which it is filed. Generally, a Writ Petition should be filed within a reasonable time from the date of violation of the rights of the petitioner.'
            },
            {
              question: 'What is the fee for filing a Writ Petition?',
              answer: 'The fee for filing a Writ Petition varies depending on the court in which it is filed and the nature of the case. It is advisable to consult a lawyer to know the exact fee for filing a Writ Petition.'
            },
            {
              question: 'How long does it take for a Writ Petition to be disposed of?',
              answer: 'The time taken for disposal of a Writ Petition depends on the nature of the case and the court in which it is filed. Generally, it may take several months or even years for a Writ Petition to be disposed of.'
            },
            {
              question: 'What is the role of a Lawyer in filing a Writ Petition?',
              answer: 'A Lawyer plays a crucial role in filing a Writ Petition. He/she assists the petitioner in drafting the petition, filing it in the appropriate court, and representing the petitioner in court proceedings.'
            },
            {
              question: 'How to choose a Lawyer for filing a Writ Petition?',
              answer: 'To choose a Lawyer for filing a Writ Petition, one should consider his/her experience, expertise in the field, success rate in handling similar cases, and fees charged. It is advisable to consult multiple Lawyers and compare their profiles before finalizing one.'
            }
          ]
        }
      },
      {
        type: 'faq',
        heading: 'Frequently Asked Questions - Public Interest Litigation (PIL)',
        visible: true,
        order: 10,
        background: 'light',
        content: {
          items: [
            {
              question: 'What is a Public Interest Litigation (PIL)?',
              answer: 'A Public Interest Litigation (PIL) is a legal proceeding in India where any individual or organization can approach the court to seek legal remedy on behalf of the general public or a marginalized group for issues that affect the public interest. PILs are usually filed to address matters of social welfare, human rights, corruption, and environmental protection.'
            },
            {
              question: 'Who can file a PIL in India?',
              answer: 'Any individual, organization, or group of persons can file a PIL in India. The person filing the PIL does not have to be directly affected by the issue, but must show that the issue affects the larger public interest.'
            },
            {
              question: 'What are the types of PILs that can be filed in India?',
              answer: 'There are various types of PILs that can be filed in India, including those related to environmental issues, consumer protection, human rights violations, public health, and corruption.'
            },
            {
              question: 'What is the procedure for filing a PIL?',
              answer: 'To file a PIL in India, a person must first draft a petition that outlines the issue affecting the public interest. The petition must then be filed in the relevant court, along with an affidavit supporting the allegations made in the petition. The court will then examine the petition and decide whether to admit it for hearing.'
            },
            {
              question: 'What is the time limit for filing a PIL?',
              answer: 'There is no specific time limit for filing a PIL in India. However, it is advisable to file a PIL as soon as possible after the issue arises.'
            },
            {
              question: 'What is the fee for filing a PIL?',
              answer: 'The fee for filing a PIL varies depending on the court where the petition is filed. The fee may also be waived in certain cases, such as for persons from economically weaker sections.'
            },
            {
              question: 'How long does it take for a PIL to be disposed of?',
              answer: 'The time taken for a PIL to be disposed of varies depending on the complexity of the case and the workload of the court. However, the court will usually take prompt action in cases where there is an urgent need for intervention.'
            },
            {
              question: 'What is the role of a Lawyer in filing a PIL?',
              answer: 'A Lawyer plays a crucial role in filing a PIL. They can provide legal advice, draft the petition, and represent the petitioner in court.'
            },
            {
              question: 'How to choose a Lawyer for filing a PIL?',
              answer: 'To choose a Lawyer for filing a PIL, it is important to look for a lawyer who has experience in handling PIL cases and has a good track record. It is also important to choose a lawyer who has a good understanding of the issue being addressed in the PIL.'
            }
          ]
        }
      },
      {
        type: 'cta_banner',
        heading: 'Ready to File Your Writ Petition?',
        visible: true,
        order: 11,
        background: 'dark',
        content: {
          body: 'Contact our expert legal team today for professional assistance with writ petitions and constitutional remedies',
          buttonText: 'Schedule Consultation',
          buttonLink: '/contact'
        }
      }
    ];

    // Insert sections
    const sectionDocs = sections.map(section => ({
      serviceId: service._id,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    // Update service SEO
    service.seo = {
      title: 'Writ Petition Lawyer in Delhi – GAG Lawyers',
      metaDescription: 'Writ Petition Lawyer in Delhi – GAG Lawyers. Writ Petition Lawyer-Grover & Grover Advocates providing legal representation to individuals who wish to file a writ petition before a court'
    };
    await service.save();

    console.log(`✅ Successfully imported ${sections.length} sections for ${service.name}`);
    console.log('\n📊 Section Breakdown:');
    console.log(`   Hero: 1`);
    console.log(`   Overview: 4`);
    console.log(`   Benefits: 3`);
    console.log(`   Process: 1`);
    console.log(`   FAQ: 2 (19 total questions)`);
    console.log(`   CTA: 1`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

importWritPetitionService();
