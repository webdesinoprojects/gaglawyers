require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');

async function importWritPetitionDelhiLocation() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find the Writ Petition Lawyer service
    const service = await Service.findOne({ slug: 'writ-petition-lawyer' });
    if (!service) {
      console.error('❌ Service not found: writ-petition-lawyer');
      process.exit(1);
    }

    console.log(`Found service: ${service.name} (${service._id})`);

    // Check if location page already exists
    const existingPage = await LocationPage.findOne({ slug: 'writ-petition-lawyer-in-delhi' });
    
    const locationData = {
      service: service._id,
      serviceName: 'Writ Petition Lawyer',
      city: 'Delhi',
      slug: 'writ-petition-lawyer-in-delhi',
      content: {
        heading: 'Writ Petition Lawyer in Delhi',
        intro: 'A writ petition is a legal procedure through which an individual or organization can approach the court for enforcement of a legal right or to prevent an illegal act. It is a remedy provided under the Constitution of India for protecting citizens\' fundamental rights.',
        sections: [
          {
            title: 'Writ Petition',
            content: 'Writ Petition Lawyer in Delhi ensures that the petitioner\'s rights are represented effectively in court. A writ petition is filed to address violations of fundamental rights, abuse of power by public authorities, or illegal actions affecting citizens. Best Writ Petition Lawyers near me are skilled at guiding clients through this complex legal process.\n\nThe Supreme Court of India and High Courts have the authority to hear writ petitions. Top Writ Petition Lawyer in India can draft, file, and represent clients in all types of writ petitions, ensuring compliance with the Constitution and procedural rules. Best Advocates for Writ Petition Cases in Delhi are often consulted for high-profile cases involving constitutional and legal rights.'
          },
          {
            title: 'Types of Writ Petition',
            content: 'Writ of Mandamus: A court order compelling an individual or government agency to perform a duty it is legally obligated to carry out. Writ Petition Lawyer in Delhi frequently use this writ to enforce statutory obligations.\n\nWrit of Habeas Corpus: Ensures that a person unlawfully detained is brought before the court. Lawyer for Writ Petition Matters in Delhi handle these cases to protect personal liberty.\n\nWrit of Certiorari: Directs a lower court to send the record of a case for review. Best Lawyers for Writ Petition Cases in Delhi often use this to correct judicial errors.\n\nWrit of Prohibition: Prevents a lower court from exceeding its jurisdiction. Writ Petition Lawyer in High Court and Supreme Court advise clients on using this writ strategically.\n\nWrit of Quo Warranto: Challenges the right of a person to hold a public office or position. Lawyer for Writ Petition Disputes in Delhi prepare cases to question unlawful authority claims.'
          },
          {
            title: 'Acts and Provisions Under Writ Petition',
            content: 'The Administrative Tribunals Act, 1985, provides for the establishment of tribunals for disputes regarding recruitment, service conditions, and related matters. Writ Petition Lawyer in Delhi leverage this act when filing petitions against administrative authorities.\n\nThe Central Administrative Tribunal (CAT) adjudicates disputes of central government employees, including IAS, IPS, and other service matters.\n\nHigh Courts entertain writ petitions under Article 226 of the Constitution of India. Citizens can file a writ petition to address violations of fundamental rights or abuse of power by government authorities.\n\nThe Supreme Court of India can issue writs of habeas corpus, mandamus, prohibition, certiorari, and quo warranto. Top Writ Petition Lawyer in India represent clients in such cases to protect their constitutional rights.'
          },
          {
            title: 'Rights and Obligations Under Writ Petition',
            content: 'Filing a writ petition gives citizens the right to access the court and seek remedies for violations of fundamental rights. Writ Petition Lawyer in Delhi ensure that these rights are fully exercised.\n\nRights:\n• Petitioners can approach the court when fundamental rights are violated.\n• The court can grant damages, compensation, or enforce remedies.\n• Orders can compel government authorities to take corrective action.\n\nObligations:\n• Petitioners must prove that the issue requires judicial intervention.\n• Facts must be presented clearly and coherently.\n• Petitioners must comply with court orders.\n\nBest Writ Petition Lawyers near me guide petitioners in exercising these rights responsibly.'
          },
          {
            title: 'Role of Lawyers in Writ Petition',
            content: 'The role of a Writ Petition Lawyer in Delhi is crucial:\n\nLegal Research: Research laws, regulations, and case precedents relevant to the petition.\n\nDrafting Petition: Ensure that the writ petition is accurate, legally compliant, and includes all necessary details.\n\nCourt Representation: Present evidence, make legal arguments, and protect the petitioner\'s rights.\n\nFollow-up Advice: Inform petitioners about the implications of court rulings and advise on appeals if necessary.\n\nTop Writ Petition Lawyer in India provide comprehensive guidance throughout the process.'
          },
          {
            title: 'Procedure to File Writ Petition',
            content: '1. Draft the writ petition including all facts, evidence, and cause of action. Lawyer for Writ Petition Disputes in Delhi ensures accuracy.\n\n2. Attach relevant documents, laws, and regulations to the petition.\n\n3. Submit the petition to the appropriate court, such as High Court or Supreme Court, depending on the issue.\n\n4. Court may issue notice to the opposite party or grant interim relief.\n\n5. If the court rules in favor, the relief is granted. If not, an appeal can be filed to a higher court. Best Lawyers for Writ Petition Cases in Delhi assist in filing appeals effectively.'
          },
          {
            title: 'Documents Required to File Writ Petition',
            content: '• Copy of the petition with jurisdiction and facts.\n• Covering letter explaining why the petition should be heard.\n• Affidavit with evidence supporting the case.\n• Memorandum of Arguments outlining legal reasoning.\n• Exhibits including documents, photographs, or physical evidence.\n\nWrit Petition Lawyer in High Court ensures all documents are properly prepared and submitted.'
          },
          {
            title: 'How Grover & Grover, Advocates Help to File Writ Petition',
            content: 'Grover & Grover Advocates and Solicitors provide:\n\n• Legal research and strategy for writ petitions.\n• Drafting and filing petitions with complete documentation.\n• Representation in court proceedings for High Court and Supreme Court.\n• Guidance on legal procedures and remedies for the petitioner.\n\nClients can rely on Writ Petition Lawyer fees in Delhi, Best Writ Petition Lawyers near me, Top Writ Petition Lawyer in India, and Best Advocates for Writ Petition Cases in Delhi for expert representation.\n\nOther services include: Best Lawyers for Writ Petition Cases in Delhi, Lawyer for Writ Petition Matters in Delhi, Lawyer for Writ Petition Disputes in Delhi, Writ Petition Lawyer in High Court, and Top Writ Petition Lawyer in Supreme Court.'
          },
          {
            title: 'Frequently Asked Questions - Writ Petition',
            content: 'Q: What is a Writ Petition?\nA: A Writ Petition is a legal remedy available in India under the Constitution of India to enforce fundamental rights or other legal rights of a person against the violation of those rights by the state or any other public authority.\n\nQ: How to file a Writ Petition in India?\nA: A Writ Petition can be filed in the High Court or the Supreme Court of India, depending on the nature of the case. It is generally filed by a person aggrieved by the violation of his/her fundamental rights or any other legal right. It is advisable to consult a lawyer before filing a Writ Petition, as it involves technicalities of law and procedure.\n\nQ: What are the types of Writ Petitions?\nA: The types of Writ Petitions available in India are: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.\n\nQ: What is the difference between a Writ Petition and a PIL?\nA: A Writ Petition is filed by an aggrieved person who seeks legal remedy against the violation of his/her fundamental rights or any other legal right, while a Public Interest Litigation (PIL) is filed by a person in the interest of the public at large.\n\nQ: Who can file a Writ Petition in India?\nA: A Writ Petition can be filed by any person who is aggrieved by the violation of his/her fundamental rights or any other legal right. Even a public-spirited person or a group of persons can file a Writ Petition in the interest of the public.\n\nQ: What is the time limit for filing a Writ Petition?\nA: The time limit for filing a Writ Petition varies depending on the nature of the case and the court in which it is filed. Generally, a Writ Petition should be filed within a reasonable time from the date of violation of the rights of the petitioner.\n\nQ: What is the fee for filing a Writ Petition?\nA: The fee for filing a Writ Petition varies depending on the court in which it is filed and the nature of the case. It is advisable to consult a lawyer to know the exact fee for filing a Writ Petition.\n\nQ: How long does it take for a Writ Petition to be disposed of?\nA: The time taken for disposal of a Writ Petition depends on the nature of the case and the court in which it is filed. Generally, it may take several months or even years for a Writ Petition to be disposed of.\n\nQ: What is the role of a Lawyer in filing a Writ Petition?\nA: A Lawyer plays a crucial role in filing a Writ Petition. He/she assists the petitioner in drafting the petition, filing it in the appropriate court, and representing the petitioner in court proceedings.\n\nQ: How to choose a Lawyer for filing a Writ Petition?\nA: To choose a Lawyer for filing a Writ Petition, one should consider his/her experience, expertise in the field, success rate in handling similar cases, and fees charged. It is advisable to consult multiple Lawyers and compare their profiles before finalizing one.'
          },
          {
            title: 'Frequently Asked Questions - Public Interest Litigation (PIL)',
            content: 'Q: What is a Public Interest Litigation (PIL)?\nA: A Public Interest Litigation (PIL) is a legal proceeding in India where any individual or organization can approach the court to seek legal remedy on behalf of the general public or a marginalized group for issues that affect the public interest. PILs are usually filed to address matters of social welfare, human rights, corruption, and environmental protection.\n\nQ: Who can file a PIL in India?\nA: Any individual, organization, or group of persons can file a PIL in India. The person filing the PIL does not have to be directly affected by the issue, but must show that the issue affects the larger public interest.\n\nQ: What are the types of PILs that can be filed in India?\nA: There are various types of PILs that can be filed in India, including those related to environmental issues, consumer protection, human rights violations, public health, and corruption.\n\nQ: What is the procedure for filing a PIL?\nA: To file a PIL in India, a person must first draft a petition that outlines the issue affecting the public interest. The petition must then be filed in the relevant court, along with an affidavit supporting the allegations made in the petition. The court will then examine the petition and decide whether to admit it for hearing.\n\nQ: What is the time limit for filing a PIL?\nA: There is no specific time limit for filing a PIL in India. However, it is advisable to file a PIL as soon as possible after the issue arises.\n\nQ: What is the fee for filing a PIL?\nA: The fee for filing a PIL varies depending on the court where the petition is filed. The fee may also be waived in certain cases, such as for persons from economically weaker sections.\n\nQ: How long does it take for a PIL to be disposed of?\nA: The time taken for a PIL to be disposed of varies depending on the complexity of the case and the workload of the court. However, the court will usually take prompt action in cases where there is an urgent need for intervention.\n\nQ: What is the role of a Lawyer in filing a PIL?\nA: A Lawyer plays a crucial role in filing a PIL. They can provide legal advice, draft the petition, and represent the petitioner in court.\n\nQ: How to choose a Lawyer for filing a PIL?\nA: To choose a Lawyer for filing a PIL, it is important to look for a lawyer who has experience in handling PIL cases and has a good track record. It is also important to choose a lawyer who has a good understanding of the issue being addressed in the PIL.'
          }
        ]
      },
      seo: {
        title: 'Writ Petition Lawyer in Delhi – GAG Lawyers',
        description: 'Writ Petition Lawyer in Delhi – GAG Lawyers. Writ Petition Lawyer-Grover & Grover Advocates providing legal representation to individuals who wish to file a writ petition before a court',
        keywords: 'Writ Petition Lawyer fees in Delhi, Best Writ Petition Lawyers near me, Top Writ Petition Lawyer in India, Best Advocates for Writ Petition Cases in Delhi, Best Lawyers for Writ Petition Cases in Delhi, Lawyer for Writ Petition Matters in Delhi, Lawyer for Writ Petition Disputes in Delhi, Writ Petition Lawyer in High Court, Top Writ Petition Lawyer in Supreme Court',
        h1: 'Writ Petition Lawyer in Delhi'
      },
      isActive: true
    };

    if (existingPage) {
      console.log('📝 Updating existing location page...');
      await LocationPage.findByIdAndUpdate(existingPage._id, locationData);
      console.log('✅ Location page updated successfully');
    } else {
      console.log('📝 Creating new location page...');
      await LocationPage.create(locationData);
      console.log('✅ Location page created successfully');
    }

    console.log('\n📊 Summary:');
    console.log(`   Service: ${service.name}`);
    console.log(`   City: Delhi`);
    console.log(`   Slug: writ-petition-lawyer-in-delhi`);
    console.log(`   Sections: ${locationData.content.sections.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importWritPetitionDelhiLocation();
