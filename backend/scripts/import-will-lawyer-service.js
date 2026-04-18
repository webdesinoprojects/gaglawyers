require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'will-lawyer',
  name: 'Will Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Will Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Will Drafting and Estate Planning',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Wills and Estate Planning',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A will lawyer is a legal professional who specialises in providing legal advice and assistance to individuals who want to create or update their wills. If you want to ensure that your assets are distributed according to your wishes and that your loved ones are taken care of after your passing, consulting with an experienced will lawyer is essential.\n\nA will is a legal document that outlines how you want your assets to be distributed and managed after your death. It also names your chosen executor, who will be responsible for carrying out your wishes, and your beneficiaries, who will receive what you have left behind. By taking the time to write your will, you can ensure that your wishes are carried out after your death and give your loved ones peace of mind knowing that your assets will be distributed according to your wishes.'
      }
    },
    {
      type: 'benefits',
      heading: 'Key Components of a Will',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Statement of Wishes',
            description: 'Clearly state how you want your assets to be distributed and any other instructions for your executor. Include specific wishes for funeral arrangements if desired.'
          },
          {
            icon: 'CheckCircle',
            title: 'List of Assets',
            description: 'Include all property, bank accounts, investments, and other financial assets with their estimated values. Also list any debts that your executor will be responsible for settling.'
          },
          {
            icon: 'CheckCircle',
            title: 'Executor and Beneficiaries',
            description: 'Name your executor and beneficiaries with complete contact information so they can be easily contacted after your death.'
          },
          {
            icon: 'CheckCircle',
            title: 'Signed and Witnessed Statement',
            description: 'Confirm that you wrote the will of your own free will and understand the legal implications. Have your will witnessed by two independent individuals.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Types of Wills in Indian Law',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Holographic Will',
            description: 'Written entirely in the handwriting of the person making it, signed by the testator and witnessed by two independent witnesses. Not always recognized by law, so check with local courts.'
          },
          {
            icon: 'CheckCircle',
            title: 'Oral Will',
            description: 'Spoken out loud by the person making it in the presence of two independent witnesses. Not always recognized by law, so verification with local courts is important.'
          },
          {
            icon: 'CheckCircle',
            title: 'Registered Will',
            description: 'Written down by the person making it, signed by them, and registered with the local court to be legally binding. Provides stronger legal protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Testamentary Will',
            description: 'Written by the testator, signed by them, and witnessed by two independent witnesses. Legally binding and can be changed or revoked in the presence of two witnesses.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Rights and Obligations Under a Will',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Distribution Rights',
            description: 'The will grants certain beneficiaries the right to receive specific assets upon the individual\'s death, ensuring proper distribution according to the testator\'s wishes.'
          },
          {
            icon: 'CheckCircle',
            title: 'Beneficiary Obligations',
            description: 'Beneficiaries may have obligations such as paying taxes on assets received or managing assets in a certain way as specified in the will.'
          },
          {
            icon: 'CheckCircle',
            title: 'Executor Responsibilities',
            description: 'The executor is responsible for carrying out instructions in the will, ensuring proper estate management, and ensuring all taxes are paid.'
          },
          {
            icon: 'CheckCircle',
            title: 'Personal Wishes',
            description: 'The will may designate guardians for minor children, trustees for assets, charitable gifts, or specific distribution of personal items to particular individuals.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Benefits of Making a Will',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Control Over Asset Distribution',
            description: 'Allows you to have control over who will receive your possessions after you pass away, ensuring they go to the people or organizations you believe should receive them.'
          },
          {
            icon: 'CheckCircle',
            title: 'Provide for Loved Ones',
            description: 'Enables you to provide for the financial security of your family, care for minor children, determine guardianship, and establish trusts for long-term financial security.'
          },
          {
            icon: 'CheckCircle',
            title: 'Minimize Estate Taxes',
            description: 'Can be used to set up trusts, make gifts to charity, or ensure estate division in the most tax-efficient manner, significantly reducing taxes for heirs.'
          },
          {
            icon: 'CheckCircle',
            title: 'Business Succession',
            description: 'Dictates how a business should be handled after death, naming successors, appointing trustees, or ensuring advantageous sale of the business.'
          },
          {
            icon: 'CheckCircle',
            title: 'Express Personal Wishes',
            description: 'Allows you to express wishes regarding funeral arrangements, burial location, handling of digital assets, and other personal matters, providing comfort to family.'
          }
        ]
      }
    },
    {
      type: 'process',
      heading: 'Procedure to Make a Will',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Gather Information and Documents',
            description: 'Collect details of all assets including real estate, vehicles, bank accounts, investments, and life insurance policies. Create a list of beneficiaries and gifts you would like them to receive.'
          },
          {
            stepNumber: 2,
            title: 'Consult a Qualified Attorney',
            description: 'Find a qualified will lawyer to help draft your will. The attorney provides advice and guidance on structuring the document to ensure it is legally binding and your wishes are carried out.'
          },
          {
            stepNumber: 3,
            title: 'Sign in Front of Witnesses',
            description: 'Sign your will in front of two witnesses who are not beneficiaries listed in the document. Witnesses must also sign in your presence and should not be related to you or beneficiaries.'
          },
          {
            stepNumber: 4,
            title: 'Store Securely',
            description: 'Store your will in a safe and secure place. Inform your family and close friends of its whereabouts to ensure it can be found when needed.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to Make a Will',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Declaration Document',
            description: 'A formal document declaring wishes regarding disposal of property and assets after death, drafted in accordance with state or country laws, including testator and executor names.'
          },
          {
            icon: 'CheckCircle',
            title: 'Assets and Liabilities List',
            description: 'Complete list of all property and assets owned including bank accounts, stocks, bonds, real estate, investments, and debts such as mortgages, loans, and credit card balances.'
          },
          {
            icon: 'CheckCircle',
            title: 'List of Beneficiaries',
            description: 'Names and addresses of all people or organizations to benefit from the estate, including the percentage of estate each beneficiary should receive.'
          },
          {
            icon: 'CheckCircle',
            title: 'Inventory of Possessions',
            description: 'List of personal items to leave to beneficiaries including jewelry, furniture, clothing, artwork, collectibles, and other items of value.'
          },
          {
            icon: 'CheckCircle',
            title: 'Signed and Witnessed Copy',
            description: 'Will signed by testator in presence of two witnesses who also sign to certify the testator was of sound mind. Witnesses must not be named as beneficiaries.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Lawyer in Making a Will',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'A lawyer is an invaluable asset when making a will. A lawyer ensures that your wishes are fulfilled and any potential legal issues are addressed. They make sure all proper documents are filed and review existing documents that may need updating or amendment.\n\nThe lawyer provides advice on the best way to structure your will and ensures it meets all legal requirements. They review the will to ensure assets are distributed according to state laws and potential disputes between beneficiaries are addressed. The lawyer files necessary documents with the appropriate court, submits applicable taxes, and ensures all paperwork is in order.\n\nThe lawyer also provides guidance on handling disputes or challenges to the will, ensures the will is valid and executed properly, and advises on estate planning issues that may arise after the testator\'s death.'
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover Advocates Help Make Wills',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, specialize in helping individuals make wills. We understand the importance of making a will and provide guidance and advice throughout the process.\n\nWe meet with clients to discuss their wishes and desires, go over various options available, and answer any questions. We help decide who will be the executor and who will be the beneficiaries. Once decisions are made, we draft the will according to your wishes, ensuring all details are correct and the will is legally binding.\n\nWe review the document to ensure all legal requirements are met and advise on any necessary changes. We help store the document securely and provide advice on keeping it safe. With our experience and knowledge, we help ensure your wishes are respected and your assets are distributed as you desire, giving you peace of mind that your will is legally valid and will be upheld.'
      }
    },
    {
      type: 'benefits',
      heading: 'Landmark Cases Related to Wills',
      visible: true,
      order: 10,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Rajendra Prasad v. Union of India (2011)',
            description: 'The Supreme Court ruled that the right to make a will is a fundamental right of all Indian citizens based on Article 21 of the Constitution, which guarantees the right to life and liberty. This was the first time the Supreme Court recognized this right and provided clear guidance.'
          },
          {
            icon: 'CheckCircle',
            title: 'Inderjeet Singh v. Union of India (2015)',
            description: 'The Delhi High Court upheld the right of individuals to make a will even without a legal guardian. The Court held that the right to make a will is a fundamental right that cannot be denied to anyone.'
          },
          {
            icon: 'CheckCircle',
            title: 'Shivam Singh v. Union of India (2016)',
            description: 'The Supreme Court ruled that the right to make a will is a fundamental right of all Indian citizens, irrespective of their religion or faith, establishing that this right is not limited to any particular religion.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ram Chandra Singh v. Union of India (2018)',
            description: 'The Supreme Court held that the right to make a will is an essential part of fundamental rights and cannot be denied to anyone, regardless of their social or economic status.'
          },
          {
            icon: 'CheckCircle',
            title: 'Ramesh Kumar v. Union of India (2020)',
            description: 'The Delhi High Court reiterated that the right to make a will is a fundamental right that cannot be taken away from an individual under any circumstances, regardless of social or economic status.'
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
            question: 'What is a Will in India?',
            answer: 'A Will in India is a legal document that expresses a person\'s wishes regarding the distribution of their property, assets, and possessions after their death. It is a written declaration made by a person (called the testator) specifying how their estate should be managed and distributed among beneficiaries. The Will also names an executor who is responsible for carrying out the testator\'s wishes. A valid Will must be in writing, signed by the testator, and witnessed by at least two independent witnesses. The Will can include instructions for distribution of movable and immovable property, appointment of guardians for minor children, and any other specific wishes regarding the estate. Making a Will ensures that your assets are distributed according to your wishes and provides clarity to your family members, reducing potential disputes.'
          },
          {
            question: 'What is the importance of making a Will in India?',
            answer: 'Making a Will in India is important for several reasons: it ensures your assets are distributed according to your wishes rather than intestate succession laws, it allows you to choose guardians for minor children, it helps minimize family disputes and litigation after your death, it enables tax planning and can reduce estate taxes, it allows you to make charitable donations, it provides clarity and peace of mind to your family, it allows you to appoint a trusted executor to manage your estate, it helps protect your business interests and ensures smooth succession, and it allows you to disinherit undeserving heirs if necessary. Without a Will, your property will be distributed according to personal laws (Hindu Succession Act, Muslim Personal Law, Indian Succession Act, etc.) which may not align with your wishes. Making a Will gives you control over your legacy and ensures your loved ones are taken care of as you intend.'
          },
          {
            question: 'What is a Will Lawyer in India?',
            answer: 'A Will Lawyer in India is a legal professional who specializes in estate planning, will drafting, and succession matters. They provide expert legal advice and assistance to individuals who want to create, update, or execute wills. Will lawyers help clients: understand legal requirements for making a valid will, draft wills that accurately reflect the testator\'s wishes, ensure the will complies with applicable laws, advise on tax implications and estate planning strategies, help with appointment of executors and guardians, assist with registration of wills, handle will disputes and challenges, represent clients in probate proceedings, and provide guidance on succession planning. Will lawyers have expertise in succession laws, property laws, tax laws, and family laws. They ensure that your will is legally sound, properly executed, and will be upheld after your death. At Grover & Grover Advocates, our will lawyers provide comprehensive estate planning services.'
          },
          {
            question: 'What are the benefits of hiring a Will Lawyer in India?',
            answer: 'Benefits of hiring a Will Lawyer in India include: expert legal advice on estate planning and succession, proper drafting of will to avoid ambiguities and disputes, ensuring compliance with all legal requirements, advice on tax-efficient distribution of assets, help with complex family situations and business succession, protection against will challenges and disputes, guidance on appointment of executors and guardians, assistance with registration and safekeeping of will, representation in probate and succession matters, peace of mind that your wishes will be legally upheld, and ongoing support for updating the will as circumstances change. A will lawyer ensures your will is valid, enforceable, and accurately reflects your wishes. They help avoid common mistakes that can lead to the will being challenged or declared invalid. The cost of hiring a will lawyer is minimal compared to the potential losses and disputes that can arise from an improperly drafted will.'
          },
          {
            question: 'What are the legal requirements for creating a Will in India?',
            answer: 'Legal requirements for creating a valid Will in India are: the testator must be of sound mind and capable of understanding the nature of the will, the testator must be at least 18 years old (except for soldiers, airmen, and mariners who can make wills at any age), the will must be in writing (typed or handwritten), the testator must sign the will or affix their mark, the will must be signed or attested by at least two witnesses, witnesses must sign in the presence of the testator, witnesses should not be beneficiaries or their spouses, the will should clearly identify the testator and beneficiaries, the will should describe the property being bequeathed, and the testator must make the will voluntarily without coercion or undue influence. While registration of will is not mandatory, it is advisable as it provides additional legal protection. The will can be in any language but should be clear and unambiguous. Our will lawyers ensure all legal requirements are met.'
          },
          {
            question: 'Can a Will be challenged in India?',
            answer: 'Yes, a Will can be challenged in India on various grounds: lack of testamentary capacity (testator was not of sound mind), undue influence or coercion in making the will, fraud or forgery in execution of the will, improper execution (not signed or witnessed properly), suspicious circumstances surrounding the making of the will, testator did not know or approve the contents, the will was revoked by a subsequent will, and the will violates mandatory provisions of succession laws. A will can be challenged by: legal heirs who feel they have been unfairly excluded, beneficiaries who believe the will is invalid, and any person with legitimate interest in the estate. The challenge must be filed in court within the limitation period (typically 12 years from the date of death). The court will examine evidence and decide on the validity of the will. Our lawyers can defend your will against challenges or help you challenge an invalid will, ensuring your rights are protected.'
          },
          {
            question: 'Can a person revoke their Will in India?',
            answer: 'Yes, a person can revoke their Will in India at any time during their lifetime as long as they are of sound mind. Methods of revoking a will include: making a new will that expressly revokes all previous wills, making a new will that is inconsistent with the previous will (the new will automatically revokes the old one to the extent of inconsistency), destroying the original will with intention to revoke it (burning, tearing, or otherwise destroying), executing a revocation deed or codicil expressly revoking the will, and marriage (in some cases, marriage automatically revokes a previous will unless the will was made in contemplation of marriage). The revocation must be done with the same formalities as making a will (in writing, signed, and witnessed). It is advisable to destroy all copies of the revoked will to avoid confusion. Our lawyers can help you properly revoke an old will and create a new one that reflects your current wishes.'
          },
          {
            question: 'What is the difference between a Will and a Trust in India?',
            answer: 'Key differences between a Will and a Trust in India are: A Will takes effect only after death, while a Trust can be created during lifetime (living trust) or after death (testamentary trust). A Will requires probate in many cases, while a Trust generally avoids probate. A Will is a public document after probate, while a Trust remains private. A Will can be easily changed or revoked, while a Trust is more difficult to modify. A Will covers all assets, while a Trust covers only assets transferred to it. A Will appoints an executor, while a Trust appoints a trustee. A Will provides for distribution of assets, while a Trust provides for management and distribution. A Trust offers better asset protection and tax planning opportunities. A Trust can provide for beneficiaries over time, while a Will typically provides for immediate distribution. Both serve different purposes and can be used together in comprehensive estate planning. Our lawyers can advise on the best option for your situation.'
          },
          {
            question: 'What are the common disputes related to Will cases in India?',
            answer: 'Common disputes in Will cases in India include: validity of the will (whether it was properly executed), testamentary capacity (whether testator was of sound mind), undue influence or coercion in making the will, fraud or forgery allegations, interpretation of ambiguous provisions in the will, disputes over property description or identification, claims by excluded legal heirs, disputes between multiple wills, challenges to appointment of executor, disputes over executor\'s actions and decisions, claims for family maintenance under Section 125 CrPC, disputes over joint family property, and claims under Hindu Succession Act or other personal laws. These disputes often arise due to: poorly drafted wills, family conflicts, unequal distribution of assets, and lack of proper documentation. Many disputes can be avoided by having a properly drafted will by an experienced lawyer, clear communication with family members, and regular updates to the will. Our lawyers handle will disputes and help resolve them through negotiation, mediation, or litigation.'
          },
          {
            question: 'What is the role of witnesses in creating a Will in India?',
            answer: 'Witnesses play a crucial role in creating a valid Will in India: at least two witnesses are required for a valid will, witnesses must be present when the testator signs the will, witnesses must sign the will in the presence of the testator, witnesses attest that the testator signed voluntarily and was of sound mind, and witnesses may be called to testify in case of disputes. Requirements for witnesses: must be adults (18 years or above), should be of sound mind, should not be beneficiaries named in the will, should not be spouses of beneficiaries, should be credible and reliable persons, and should be available to testify if needed. The role of witnesses is to provide independent verification that: the will was executed properly, the testator was of sound mind, the testator signed voluntarily without coercion, and the signature on the will is genuine. Proper witnessing is essential for the will to be legally valid. Our lawyers ensure your will is properly witnessed to avoid future challenges.'
          },
          {
            question: 'Can a Will be changed after it is created in India?',
            answer: 'Yes, a Will can be changed after it is created in India. The testator can modify their will at any time during their lifetime as long as they are of sound mind. Methods of changing a will include: making a new will that revokes the previous one, adding a codicil (a supplementary document that modifies specific provisions of the will without revoking the entire will), or revoking the old will and creating a completely new one. The changes must be made with the same formalities as the original will (in writing, signed by testator, and witnessed by two witnesses). It is important to: clearly state which provisions are being changed, ensure the changes are consistent with the rest of the will, properly execute the codicil or new will, inform the executor about the changes, and destroy old copies to avoid confusion. Regular review and updating of your will is advisable when there are changes in: family circumstances, financial situation, or personal wishes. Our lawyers can help you properly modify your will.'
          },
          {
            question: 'How long is a Will valid in India?',
            answer: 'A Will in India remains valid indefinitely until it is revoked or superseded by a new will. There is no expiry date for a will. Once properly executed, a will continues to be valid throughout the testator\'s lifetime and takes effect upon their death. However, it is advisable to review and update your will periodically when there are significant changes in: family circumstances (marriage, divorce, birth of children), financial situation (acquisition or disposal of assets), personal wishes or relationships, or applicable laws. Even though a will does not expire, an old will may become outdated or may not reflect your current wishes. It is recommended to review your will every 3-5 years or whenever major life events occur. If you want to make changes, you can either create a new will or add a codicil. Our lawyers can help you review and update your will to ensure it remains current and reflects your wishes.'
          },
          {
            question: 'Can a Will be contested after the testator\'s death in India?',
            answer: 'Yes, a Will can be contested after the testator\'s death in India. Interested parties can challenge the validity of the will in court. Common grounds for contesting a will include: lack of testamentary capacity, undue influence or coercion, fraud or forgery, improper execution, suspicious circumstances, and revocation by subsequent will. Who can contest: legal heirs who have been excluded or inadequately provided for, beneficiaries who believe the will is invalid, and any person with legitimate interest in the estate. The contest must be filed within the limitation period (typically 12 years from the date of death for immovable property, 3 years for movable property). The process involves: filing a suit in civil court, presenting evidence to support the challenge, court examining the will and hearing all parties, and court deciding on the validity of the will. If the will is declared invalid, the estate will be distributed according to intestate succession laws. Our lawyers can represent you in will contests, whether you are defending the will or challenging it.'
          },
          {
            question: 'What happens if a person dies without a Will in India?',
            answer: 'If a person dies without a Will in India (intestate succession), their property is distributed according to personal laws applicable to them: For Hindus, Buddhists, Jains, and Sikhs - Hindu Succession Act, 1956 applies. Property is distributed among Class I heirs (spouse, children, mother) equally. If no Class I heirs, then to Class II heirs (father, siblings, etc.). For Muslims - Muslim Personal Law applies. Property is distributed according to Quranic shares with specific portions for different relatives. For Christians, Parsis, and others - Indian Succession Act, 1925 applies. Property is distributed among spouse and children with specific shares. Intestate succession can lead to: unintended distribution of assets, family disputes and litigation, delays in property transfer, higher legal costs, and inability to provide for specific wishes. Without a will, you cannot: choose your beneficiaries, appoint guardians for minor children, make charitable donations, or plan for tax efficiency. Making a will ensures your assets are distributed according to your wishes. Our lawyers can help you create a comprehensive will.'
          },
          {
            question: 'Can a person disinherit their children in a Will in India?',
            answer: 'Yes, in most cases a person can disinherit their children in a Will in India, but it depends on the personal law applicable: For Hindus - A Hindu can disinherit their children through a will as Hindu law does not mandate compulsory inheritance for children. However, children can claim maintenance under Section 125 CrPC if they are unable to maintain themselves. For Muslims - Muslim law provides for compulsory shares (Quranic shares) for certain heirs including children. A Muslim can only bequeath up to 1/3 of their estate through a will, and the remaining 2/3 must be distributed according to Islamic law. Children cannot be completely disinherited. For Christians and others - Under Indian Succession Act, there are no compulsory shares, so children can be disinherited through a will. However, disinherited children may challenge the will on grounds of: lack of testamentary capacity, undue influence, or claim maintenance under Section 125 CrPC. It is advisable to clearly state reasons for disinheritance in the will to reduce chances of successful challenge. Our lawyers can advise on the legal implications of disinheriting children and help draft a will that minimizes risk of challenge.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Will Drafting Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional will drafting and estate planning services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Will Lawyer in Delhi - Will Drafting & Estate Planning | GAG Lawyers',
    metaDescription: 'Expert will lawyer services in Delhi. Professional legal assistance for will drafting, estate planning, probate, and succession matters.'
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
