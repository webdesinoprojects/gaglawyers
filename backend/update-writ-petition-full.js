require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

async function updateService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    console.log('--- Updating Writ Petition Lawyer Service with Full Content ---');
    const writService = await Service.findOne({ slug: 'writ-petition-lawyer' });
    
    if (writService) {
      writService.shortDescription = 'Writ Petition Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      writService.description = 'Writ Petition Lawyer - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations.';
      
      writService.heroImage = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/services/writ-petition-lawyer-hero.jpg';
      
      writService.contentBlocks = [
        {
          heading: 'Understanding Writ Petition',
          content: `A writ petition is a legal procedure through which an individual or organization can approach the court for enforcement of a legal right or to prevent an illegal act. It is a remedy provided under the Constitution of India for protecting citizens' fundamental rights.

Writ Petition Lawyer in Delhi ensures that the petitioner's rights are represented effectively in court. A writ petition is filed to address violations of fundamental rights, abuse of power by public authorities, or illegal actions affecting citizens. Best Writ Petition Lawyers near me are skilled at guiding clients through this complex legal process.

The Supreme Court of India and High Courts have the authority to hear writ petitions. Top Writ Petition Lawyer in India can draft, file, and represent clients in all types of writ petitions, ensuring compliance with the Constitution and procedural rules. Best Advocates for Writ Petition Cases in Delhi are often consulted for high-profile cases involving constitutional and legal rights.`
        },
        {
          heading: 'Types of Writ Petition',
          content: `Writ of Mandamus: A court order compelling an individual or government agency to perform a duty it is legally obligated to carry out. Writ Petition Lawyer in Delhi frequently use this writ to enforce statutory obligations.

Writ of Habeas Corpus: Ensures that a person unlawfully detained is brought before the court. Lawyer for Writ Petition Matters in Delhi handle these cases to protect personal liberty.

Writ of Certiorari: Directs a lower court to send the record of a case for review. Best Lawyers for Writ Petition Cases in Delhi often use this to correct judicial errors.

Writ of Prohibition: Prevents a lower court from exceeding its jurisdiction. Writ Petition Lawyer in High Court and Supreme Court advise clients on using this writ strategically.

Writ of Quo Warranto: Challenges the right of a person to hold a public office or position. Lawyer for Writ Petition Disputes in Delhi prepare cases to question unlawful authority claims.`
        },
        {
          heading: 'Acts and Provisions Under Writ Petition',
          content: `The Administrative Tribunals Act, 1985, provides for the establishment of tribunals for disputes regarding recruitment, service conditions, and related matters. Writ Petition Lawyer in Delhi leverage this act when filing petitions against administrative authorities.

The Central Administrative Tribunal (CAT) adjudicates disputes of central government employees, including IAS, IPS, and other service matters.

High Courts entertain writ petitions under Article 226 of the Constitution of India. Citizens can file a writ petition to address violations of fundamental rights or abuse of power by government authorities.

The Supreme Court of India can issue writs of habeas corpus, mandamus, prohibition, certiorari, and quo warranto. Top Writ Petition Lawyer in India represent clients in such cases to protect their constitutional rights.`
        },
        {
          heading: 'Rights and Obligations Under Writ Petition',
          content: `Filing a writ petition gives citizens the right to access the court and seek remedies for violations of fundamental rights. Writ Petition Lawyer in Delhi ensure that these rights are fully exercised.

Rights:
Petitioners can approach the court when fundamental rights are violated.
The court can grant damages, compensation, or enforce remedies.
Orders can compel government authorities to take corrective action.

Obligations:
Petitioners must prove that the issue requires judicial intervention.
Facts must be presented clearly and coherently.
Petitioners must comply with court orders.

Best Writ Petition Lawyers near me guide petitioners in exercising these rights responsibly.`
        },
        {
          heading: 'Role of Lawyers and Procedure to File',
          content: `The role of a Writ Petition Lawyer in Delhi is crucial:

Legal Research: Research laws, regulations, and case precedents relevant to the petition.
Drafting Petition: Ensure that the writ petition is accurate, legally compliant, and includes all necessary details.
Court Representation: Present evidence, make legal arguments, and protect the petitioner's rights.
Follow-up Advice: Inform petitioners about the implications of court rulings and advise on appeals if necessary.

Top Writ Petition Lawyer in India provide comprehensive guidance throughout the process.

Procedure to File Writ Petition:
Draft the writ petition including all facts, evidence, and cause of action. Lawyer for Writ Petition Disputes in Delhi ensures accuracy.
Attach relevant documents, laws, and regulations to the petition.
Submit the petition to the appropriate court, such as High Court or Supreme Court, depending on the issue.
Court may issue notice to the opposite party or grant interim relief.
If the court rules in favor, the relief is granted. If not, an appeal can be filed to a higher court. Best Lawyers for Writ Petition Cases in Delhi assist in filing appeals effectively.`
        },
        {
          heading: 'How Grover & Grover, Advocates Help',
          content: `Grover & Grover Advocates and Solicitors provide:

Legal research and strategy for writ petitions.
Drafting and filing petitions with complete documentation.
Representation in court proceedings for High Court and Supreme Court.
Guidance on legal procedures and remedies for the petitioner.

Clients can rely on Writ Petition Lawyer fees in Delhi, Best Writ Petition Lawyers near me, Top Writ Petition Lawyer in India, and Best Advocates for Writ Petition Cases in Delhi for expert representation.

Other services include: Best Lawyers for Writ Petition Cases in Delhi, Lawyer for Writ Petition Matters in Delhi, Lawyer for Writ Petition Disputes in Delhi, Writ Petition Lawyer in High Court, and Top Writ Petition Lawyer in Supreme Court.

Documents Required to File Writ Petition:
Copy of the petition with jurisdiction and facts.
Covering letter explaining why the petition should be heard.
Affidavit with evidence supporting the case.
Memorandum of Arguments outlining legal reasoning.
Exhibits including documents, photographs, or physical evidence.

Writ Petition Lawyer in High Court ensures all documents are properly prepared and submitted.`
        }
      ];
      
      writService.documentChecklist = [
        'Petition detailing case facts and relief sought',
        'Affidavits supporting the claims',
        'Covering letter explaining urgency',
        'Memorandum of Arguments',
        'Exhibits (documents, photographs, evidence)',
        'Proof of locus standi',
        'Copies of relevant laws and regulations',
        'Court fee payment proof',
        'Vakalatnama (power of attorney)'
      ];
      
      writService.popularCases = [
        'Maneka Gandhi v. Union of India (1978) - Right to travel and personal liberty',
        'Vishaka v. State of Rajasthan (1997) - Sexual harassment guidelines',
        'Olga Tellis v. Bombay Municipal Corporation (1985) - Right to livelihood'
      ];
      
      writService.faqs = [
        {
          question: 'What is a Writ Petition?',
          answer: 'A Writ Petition is a legal remedy available in India under the Constitution to enforce fundamental rights or other legal rights against violation by the state or public authorities.'
        },
        {
          question: 'How to file a Writ Petition in India?',
          answer: 'A Writ Petition can be filed in High Court or Supreme Court depending on the case nature. It is generally filed by a person aggrieved by violation of fundamental rights. Consult a lawyer as it involves legal technicalities.'
        },
        {
          question: 'What are the types of Writ Petitions?',
          answer: 'The types are: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto. Each serves different purposes for protecting rights.'
        },
        {
          question: 'What is the difference between a Writ Petition and a PIL?',
          answer: 'A Writ Petition is filed by an aggrieved person seeking remedy for violation of their rights, while a Public Interest Litigation (PIL) is filed in the interest of the public at large.'
        },
        {
          question: 'Who can file a Writ Petition in India?',
          answer: 'Any person aggrieved by violation of fundamental rights or legal rights can file. Even public-spirited persons or groups can file in public interest.'
        }
      ];
      
      writService.seoKeywords = [
        'writ petition lawyer',
        'writ petition',
        'habeas corpus',
        'mandamus',
        'certiorari',
        'prohibition writ',
        'quo warranto',
        'constitutional lawyer',
        'fundamental rights',
        'high court writ',
        'supreme court writ',
        'public interest litigation',
        'writ petition filing'
      ];
      
      await writService.save();
      console.log('✓ Writ Petition Lawyer service updated with full content successfully!\n');
    } else {
      console.log('✗ Writ Petition Lawyer service not found\n');
    }

    console.log('========================================');
    console.log('Writ Petition service updated with complete content!');
    console.log('========================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating service:', error);
    process.exit(1);
  }
}

updateService();
