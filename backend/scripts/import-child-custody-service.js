require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'child-custody-lawyer',
  name: 'Child Custody Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Child Custody Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Representation for Child Custody Cases',
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Child Custody Cases',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Child custody lawyers must possess a deep understanding of the laws and regulations related to child custody cases. They must also be knowledgeable about the evidence needed to support their clients\' positions.\n\nChild Custody in India is a legal term that refers to the rights and responsibilities of parents or guardians over a minor child. It is an important concept as it establishes the relationship between the parent or guardian and the child and determines who will be responsible for providing for the child\'s physical, emotional, educational, and financial needs.\n\nThe laws governing child custody in India are based on Hindu law, Muslim law, and other personal laws. It is important to understand these laws before making any decisions related to child custody in India.\n\nChild custody is the legal right of a parent or guardian to care for and make decisions about a child\'s upbringing, including where they live, what school they attend, and other important aspects of their life. It can be awarded to one or both parents in a divorce or separation case. Child custody is an important issue for all involved parties, as it will determine who will have the right to make decisions on behalf of the child.'
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Child Custody Cases',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Sole Custody',
            description: 'This type of child custody involves only one parent having legal responsibility for the child. The parent has complete control over the care, guidance, and upbringing of the child. There is no need for shared parenting in this type of custody arrangement. There are many advantages to this type of custody, including a strong bond between parent and child and less time spent fighting with other parents over custody rights. Sole custody can be difficult to obtain, especially if there is a history of domestic violence in the relationship.'
          },
          {
            icon: 'CheckCircle',
            title: 'Joint Custody',
            description: 'Legal joint custody means that both parents have equal legal rights to make decisions about the care, custody, and control of their children. This arrangement enables both parents to have equal rights and responsibilities over their children.'
          },
          {
            icon: 'CheckCircle',
            title: 'Physical Custody',
            description: 'Physical custody refers to where the child will live on a day-to-day basis. This determines the primary residence of the child.'
          },
          {
            icon: 'CheckCircle',
            title: 'Legal Custody',
            description: 'Legal custody refers to the right to make important decisions about the child\'s upbringing, such as education, healthcare, and religion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Guardianship',
            description: 'Guardianship is granted for the period of time when the parents are not married. In this case, the state makes decisions for a minor child since his or her parents are not able to fulfil their responsibilities.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Legal Remedies Available for Child Custody',
      visible: true,
      order: 3,
      background: 'light',
      content: {
        body: 'Child custody is an important issue that needs to be addressed in any family law case. In India, there are various arrangements available for child custody, depending on the situation and circumstances of the family.\n\nThe Indian legal system offers parents different types of custody arrangements for their children, depending on the circumstances of the family. The most common type is joint custody, which enables both parents to have equal rights and responsibilities over their children. Joint custody can also be achieved through guardianship, where one parent is granted guardianship over a child and the other parent has access rights to see their child.\n\nSole custody gives one parent complete control over all aspects of their child\'s life and can only be given to the biological or adoptive mother or father of a child that has been born into that situation. Access rights are granted to the non-custodial parent when a child is placed with them by the courts.\n\nWhen parents cannot agree on the terms of child custody, the court will intervene and make a decision that is in the best interest of the child. Depending on the particular situation, there are various arrangements available for child custody under the law. These arrangements can include legal custody, physical custody, joint custody, and sole custody. Each arrangement has its own advantages and disadvantages that should be taken into consideration when deciding what is best for the child\'s future.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File Child Custody',
      visible: true,
      order: 4,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Understand Types of Custody',
            description: 'Applying for child custody in India can be a challenging process. It involves understanding the various laws and regulations that govern the process. Types of child custody in India have a highly developed legal system, and the country recognizes five types of custody: physical custody, joint custody, sole parental responsibility (SOR), guardianship, and protective care.'
          },
          {
            stepNumber: 2,
            title: 'Gather Required Documents',
            description: 'Collect all necessary documents including proof of identity, residence proof, income proof, and other relevant paperwork. The type of child support that parents are entitled to differs depending on their type of custody.'
          },
          {
            stepNumber: 3,
            title: 'File Petition',
            description: 'File a petition with the appropriate family court stating your reasons for seeking child custody and listing relevant facts. The petition should be clear and concise and provide all the necessary details about the case.'
          },
          {
            stepNumber: 4,
            title: 'Submit Affidavit',
            description: 'Provide a sworn statement that includes your personal background, education, and employment history. This affidavit is crucial for establishing your capability to care for the child.'
          },
          {
            stepNumber: 5,
            title: 'Court Mediation',
            description: 'The court will typically order mediation to try and resolve the dispute amicably between parents. This helps to resolve disputes without unnecessary legal proceedings.'
          },
          {
            stepNumber: 6,
            title: 'Court Hearing',
            description: 'If mediation is unsuccessful, the court will hear arguments from both parties and make a decision based on the best interests of the child. The court considers several factors including the child\'s age, health, education, and emotional well-being.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Lawyers in Child Custody Cases',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice and Representation',
            description: 'Provide legal advice and representation to parents and other family members involved in a dispute over the custody of a child. Advising and representing parents, other family members, and children involved in a dispute over the custody of a child.'
          },
          {
            icon: 'CheckCircle',
            title: 'Protecting Rights',
            description: 'Ensure that the best interests of the child are respected throughout the process while protecting the rights of both parents and children. Making sure that all applicable laws and regulations are followed throughout the process.'
          },
          {
            icon: 'CheckCircle',
            title: 'Court Representation',
            description: 'Provide evidence, including reports and recommendations, in court case proceedings. Consulting with family members and preparing a parenting plan.'
          },
          {
            icon: 'CheckCircle',
            title: 'Fair Treatment',
            description: 'Ensuring that all parties involved are treated fairly and with respect throughout the process. Providing evidence, including reports and medical records, to show that care, love, and protection of children are the highest priorities.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required For Child Custody',
      visible: true,
      order: 6,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Proof of Identity',
            description: 'Valid identification documents such as passport, Aadhaar card, or driver\'s license for both parents.'
          },
          {
            icon: 'CheckCircle',
            title: 'Residence Proof',
            description: 'Documents proving current residence such as utility bills or rental agreements.'
          },
          {
            icon: 'CheckCircle',
            title: 'Income Proof',
            description: 'Salary slips, bank statements, or income tax returns to demonstrate financial capability to care for the child.'
          },
          {
            icon: 'CheckCircle',
            title: 'Petition',
            description: 'A formal petition stating your reasons for seeking child custody and listing allegations if any. The petition is the first document that states your reasons for seeking child custody.'
          },
          {
            icon: 'CheckCircle',
            title: 'Affidavit',
            description: 'A sworn statement including personal background, education, and employment history. The affidavit is a sworn statement that you are making only for the purposes of this petition.'
          },
          {
            icon: 'CheckCircle',
            title: 'Child\'s Documents',
            description: 'Birth certificate, school records, and medical records of the child to establish the child\'s current situation and needs.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help in Child Custody Cases',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Grover & Grover, advocates and solicitors, are experienced in helping families in child custody cases. They understand the complexities involved in such cases and provide legal assistance to ensure that the best interests of the child are taken into account.\n\nThey provide advice on all aspects of the case, such as determining which parent should have primary custody, developing a parenting plan, and negotiating visitation rights. Furthermore, they can also help with filing motions for temporary orders or filing for modifications to existing orders. In addition, their expertise can be invaluable when it comes to matters like adoption or guardianship.\n\nWith their help, parents can rest assured that their child\'s rights will be protected throughout the process. Child custody cases are often complex and emotionally charged. It is important to have the right legal support in such cases.\n\nGrover & Grover, advocates and solicitors, offer a wide range of services to help families in child custody cases. They provide comprehensive legal advice on all aspects of the case, including parental rights and responsibilities, visitation rights, and financial arrangements. They also provide representation during court proceedings and can negotiate settlements outside of court if necessary.\n\nWith their expertise in family law, they can help you understand your rights and ensure that the best interests of your child are met. Based in the Greater Toronto Area, Grover & Grover, Advocates and Solicitors, is one of Canada\'s leading firms in family law. For more than seven years, they have helped their clients achieve the best outcomes possible.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases of Supreme Court and High Court',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Saiful Islam v. State of Jharkhand',
            description: 'The Supreme Court of India ruled that a husband cannot be charged with desertion or cruelty when he leaves his wife and his two children from a previous marriage. This ruling was made even in cases where the husband had abandoned his responsibility for sending money for their upkeep.'
          },
          {
            icon: 'CheckCircle',
            title: 'Chandrachud J. Hegde v. Aishwarya B. (2014)',
            description: 'The court ruled that child custody could only be granted to parents who have demonstrated they are capable of raising and caring for the child responsibly and protectively and that they were willing to make reasonable efforts with the other parent to do so.'
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
            question: 'What is child custody in India?',
            answer: 'Child custody refers to the legal right and responsibility of a parent to take care of their child\'s physical, emotional, and mental well-being after a divorce or separation.'
          },
          {
            question: 'What are the types of child custody in India?',
            answer: 'There are two types of child custody in India: physical custody and legal custody. Physical custody refers to the right of a parent to have the child live with them, while legal custody refers to the right of a parent to make important decisions about the child\'s upbringing, such as education, healthcare, and religion.'
          },
          {
            question: 'How is child custody decided in India?',
            answer: 'Child custody is decided based on the best interests of the child. The court considers several factors, such as the child\'s age, health, education, emotional and mental well-being, and the financial and social status of the parents before making a decision.'
          },
          {
            question: 'What are the legal provisions related to child custody in India?',
            answer: 'The legal provisions related to child custody in India are governed by the Hindu Minority and Guardianship Act, 1956, the Guardians and Wards Act, 1890, and the Juvenile Justice (Care and Protection of Children) Act, 2015.'
          },
          {
            question: 'Can a child choose which parent to live with in India?',
            answer: 'The court takes the child\'s wishes and preferences into consideration while deciding child custody, but the final decision is based on the best interests of the child and not solely on the child\'s preferences.'
          },
          {
            question: 'What are the rights of a non-custodial parent in India?',
            answer: 'A non-custodial parent has the right to visit and spend time with the child, make decisions about the child\'s education and healthcare, and access the child\'s medical and academic records.'
          },
          {
            question: 'How can a parent change child custody in India?',
            answer: 'A parent can file a petition for modification of child custody in case of a significant change in circumstances, such as a change in the child\'s health or education, a change in the parent\'s financial situation, or if the child\'s safety is at risk.'
          },
          {
            question: 'Do I need a lawyer for child custody in India?',
            answer: 'While it is not mandatory to have a lawyer for child custody cases in India, it is highly recommended to seek legal advice and representation to ensure that your rights and interests are protected.'
          },
          {
            question: 'Can grandparents or other relatives get custody of a child?',
            answer: 'In certain situations, such as when both parents are unfit to take care of the child, grandparents or other relatives may be granted custody. However, this is typically only done if it is in the best interests of the child.'
          },
          {
            question: 'Can a parent deny visitation rights to the other parent in India?',
            answer: 'No, a parent cannot deny visitation rights to the other parent without a valid reason. If a parent is denied visitation rights, they can file a petition in court to enforce their rights.'
          },
          {
            question: 'Can child custody be granted to a father in India?',
            answer: 'Yes, fathers can be granted child custody in India. The court considers the best interests of the child when deciding custody, and gender is not a deciding factor.'
          },
          {
            question: 'What is the process for resolving child custody disputes in India?',
            answer: 'If parents cannot agree on child custody, they can file a petition in family court. The court will typically order mediation to try and resolve the dispute amicably. If mediation is unsuccessful, the court will hear arguments from both parties and make a decision based on the best interests of the child.'
          },
          {
            question: 'How long does it take to get a child custody order in India?',
            answer: 'The time it takes to get a child custody order in India can vary depending on the complexity of the case and the workload of the court. Generally, it can take several months to a year or more to get a final order.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Child Custody Legal Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional child custody legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Child Custody Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Child custody lawyers must possess a deep understanding of the laws and regulations related to child custody cases. Expert legal representation for child custody matters in Delhi.'
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
