require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'sports-lawyer',
  name: 'Sports Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Sports Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Sports Law and Athletic Disputes',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Understanding Sports Law in India',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'Sports lawyers are required to have a comprehensive understanding of sports law and possess the expertise to gather and analyze the evidence required to build a strong sports case for their clients.\n\nSports law in India is the branch of law that deals with criminal troubles and disputes associated with sports activities. It is a surprisingly new area that has been gaining momentum in recent years due to the rise of professional sports activities in India. Sports law in India is a extensive subject and consists of a range of various areas such as contracts, torts, labor law, doping, and sports governance.\n\nThe primary cause of sports activities regulation in India is to make sure that the rules and policies governing sports activities activities are accompanied and respected by using all stakeholders, inclusive of gamers, coaches, proprietors, sponsors, and other parties. This ensures that every one events are handled pretty and that the sport remains unfastened from any shape of corruption or manipulation.'
      }
    },
    {
      type: 'overview',
      heading: 'Key Areas of Sports Law',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'Sports regulation in India is likewise involved with the safety of athletes and the prevention of unfair practices collectively with doping and healthy-fixing. The Indian government has taken some steps to ensure that athletes are blanketed from unfair practices, including the implementation of the National Anti-Doping Agency (NADA) and the Sports Authority of India (SAI). These companies are responsible for monitoring and imposing anti-doping and match-fixing guidelines.\n\nAnother important problem of sports activities law in India is the protection of intellectual belongings rights. This includes the protection of trademarks, copyrights, and other intellectual property associated with sports activities. The Sports Broadcasting Act of 2007 gives a criminal framework for the broadcast of sports in India. The Act moreover gives for the safety of the rights of sports commentators, athletes, and other stakeholders in the broadcasting of sports activities.'
      }
    },
    {
      type: 'benefits',
      heading: 'Acts and Provisions in Sports Law',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Breach of Contract',
            description: 'Breach of contract is one of the most common kinds of acts and provisions involved in contract disputes in India. It happens when one or both parties to the agreement fail to meet the terms and conditions of the contract. The aggrieved party may be entitled to compensation or other relief in the event of a breach.'
          },
          {
            icon: 'CheckCircle',
            title: 'Non-performance of Contract',
            description: 'Non-performance occurs when one or both parties fail to perform their obligations as per the contract. This may arise due to various reasons, including failure to provide goods or services as per the agreed terms, refusal to deliver, or failure to make payment according to the terms of the contract.'
          },
          {
            icon: 'CheckCircle',
            title: 'Misrepresentation',
            description: 'Misrepresentation occurs when one or both parties to the contract make a false statement or promise that affects the other party and induces them to enter into a contract. Misrepresentation may occur through silence or through the acts, words, or conduct of a party.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unfair Contract Terms',
            description: 'These are contract terms that are oppressive and unfairly favor one party over the other. For example, a contract term that limits the ability of the other party to pursue their legal rights or a contract term that is unduly harsh or oppressive.'
          },
          {
            icon: 'CheckCircle',
            title: 'Unconscionable Contracts',
            description: 'These are contracts which are so unfair or one-sided that they are deemed unconscionable. For example, a contract that is so one-sided that it results in one party taking advantage of the other\'s vulnerability or lack of knowledge.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment in Sports Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        body: 'Sports law in India covers a huge range of legal troubles that rise up from sporting activities. When it comes to expenses, consequences, and punishments in sports law in India, there are several regions in which these are relevant.\n\nAthletes may face disciplinary movement from their respective sports activities governing bodies if they breach the regulations and guidelines of their sport. This could consist of suspensions, fines, or maybe bans from collaborating in the sport. In some cases, criminal court cases may be introduced towards athletes if they may be located to have dedicated a crime.\n\nPenalties and punishments may also be imposed by sports activities governing bodies if an athlete is found to have engaged in doping or match-fixing. This may want to encompass a suspension from the sport and/or a ban from taking part in the sport. Athletes may face civil consequences in the event that they breach their contracts with a sport\'s governing frame. Finally, athletes might also face criminal prices if they may be discovered to have dedicated a criminal offense, together with bribery or fraud.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Sports Law Case',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Consult a Legal Expert',
            description: 'Visit a criminal expert who can provide steering at the unique legal guidelines that observe to the case and how to successfully pursue a criminal remedy. This session must include a evaluate of the applicable files and contracts related to the dispute.'
          },
          {
            stepNumber: 2,
            title: 'Prepare Necessary Paperwork',
            description: 'Draft a complaint or petition, as well as any other documents that may be applicable to the case. Ensure that the files are accurate and entire, and that they follow the desired criminal format.'
          },
          {
            stepNumber: 3,
            title: 'File with Appropriate Court',
            description: 'File the case with the correct court docket. Depending at the character of the dispute, this could be a district or national court. The filing must include the perfect expenses, in addition to any assisting documents that can be required.'
          },
          {
            stepNumber: 4,
            title: 'Attend First Hearing',
            description: 'At the first hearing, the court will review the case and make a selection on whether or not the case should continue to trial. During the hearing, each parties will be given the opportunity to offer their arguments and proof.'
          },
          {
            stepNumber: 5,
            title: 'Court Ruling',
            description: 'After the listening to, the court docket will trouble a ruling on the case. Depending at the final outcomes, the case can be omitted or it may continue to trial.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Role of Sports Lawyer',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Legal Advice and Services',
            description: 'Sports lawyers provide criminal advice and offerings to athletes, groups, sports activities agencies, and different entities associated with sports activities. They are accountable for defending the criminal rights of athletes, groups, and agencies.'
          },
          {
            icon: 'CheckCircle',
            title: 'Contract Drafting and Review',
            description: 'Sports lawyers draft contracts, along with sponsorship agreements, endorsement contracts, and merchandise offers. They also assist in the negotiation of contracts and help athletes, groups, and organizations apprehend the terms and situations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Dispute Mediation',
            description: 'Sports attorneys act as mediators in disputes between athletes, groups, and organizations, and that they often constitute customers in courtroom complaints.'
          },
          {
            icon: 'CheckCircle',
            title: 'Compliance and Ethics',
            description: 'Sports lawyers provide advice and help to athletes, teams, and companies in disputes associated with doping, discrimination, and other ethical troubles in sports activities. They help understand rights and responsibilities underneath the law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Event Legal Support',
            description: 'Sports lawyers offer advice at the criminal aspects of hosting sports activities activities, along with licensing, safety, and crowd manipulate.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Grover & Grover Advocates Help in Sports Law',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is one of the main sports activities law companies in India. The company gives complete felony services to athletes, groups, leagues, clubs, sports activities entities, sponsors, investors, and different associated entities within the place of sports law.\n\nThe company has a team of skilled and knowledgeable legal professionals who are well-versed in the legal guidelines, policies, and processes associated with sports activities law. We provide a wide variety of felony services, inclusive of the drafting and evaluate of contracts for athletes and clubs, advising at the prison and contractual framework of sports activities leagues and tournaments, presenting recommendation on policies and compliance problems, and representing customers in disputes related to sports activities law.\n\nThe company additionally offers services related to the safety of intellectual property rights, such as logos and copyrights. We additionally present criminal recommendation on the formation and functioning of sports activities federations and institutions, contract negotiation, and dispute decision. We provide felony recommendation on anti-doping laws as well as guidelines and policies governing using performance-improving tablets.'
      }
    },
    {
      type: 'benefits',
      heading: 'Popular Cases Related to Sports Law',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'BCCI vs. Cricket Association of Bihar (CAB) - 2014',
            description: 'The case revolved around the issue of the Board of Control for Cricket in India (BCCI) not recognizing the Cricket Association of Bihar (CAB) as a state cricket association. The Supreme Court of India ruled in favor of the CAB and granted them recognition.'
          },
          {
            icon: 'CheckCircle',
            title: 'BCCI vs. Kochi Cricket Pvt. Ltd. - 2011',
            description: 'The case was brought to the Supreme Court by the BCCI, which was protesting against Kochi Cricket Pvt. Ltd.\'s bid to own a cricket team in the Indian Premier League (IPL). The Supreme Court ruled in favor of Kochi Cricket Pvt. Ltd. and allowed the team to be a part of the IPL.'
          },
          {
            icon: 'CheckCircle',
            title: 'DDCA vs. BCCI - 2005',
            description: 'The High Court of Delhi heard the case of the Delhi and District Cricket Association (DDCA) vs. The Board of Control for Cricket in India (BCCI). The case was related to the issue of the BCCI not giving the DDCA status as a state cricket association. The High Court ruled in favor of the DDCA and granted them recognition.'
          },
          {
            icon: 'CheckCircle',
            title: 'KSCA vs. BCCI - 2003',
            description: 'The High Court of Karnataka heard a case between the Karnataka State Cricket Association (KSCA) and the BCCI. The KSCA had filed the case against the BCCI for not giving them the status of a state cricket association. The High Court ruled in favor of the KSCA and granted them recognition.'
          },
          {
            icon: 'CheckCircle',
            title: 'HCA vs. BCCI - 2006',
            description: 'The High Court of Andhra Pradesh heard a case between the Hyderabad Cricket Association (HCA) and the BCCI. The HCA had filed a case against BCCI for not giving them recognition. The High Court ruled in favor of the HCA and granted them the recognition of a state cricket association.'
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
            question: 'What is sports law in India?',
            answer: 'Sports law in India refers to the legal rules and regulations that govern the conduct of sports activities in the country. It encompasses various aspects such as athlete contracts, sports governance, doping, intellectual property rights, broadcasting rights, sponsorship agreements, anti-doping regulations, match-fixing prevention, athlete rights and welfare, sports arbitration and dispute resolution, and compliance with national and international sports regulations. Sports law ensures that all stakeholders including players, coaches, owners, sponsors, and governing bodies are treated fairly and that sports remain free from corruption or manipulation.'
          },
          {
            question: 'What does a sports lawyer do in India?',
            answer: 'A sports lawyer in India provides comprehensive legal services to athletes, teams, leagues, clubs, sports entities, sponsors, and investors. Their responsibilities include: drafting and reviewing contracts (sponsorship, endorsement, employment), advising on sports governance and regulatory compliance, representing clients in disputes and arbitration, protecting intellectual property rights (trademarks, copyrights), negotiating athlete contracts and transfers, handling doping and disciplinary matters, advising on anti-corruption and match-fixing issues, structuring sports investments and transactions, providing legal support for sports events, and ensuring compliance with national and international sports regulations. Sports lawyers must be well-versed in sports-specific laws as well as general contract, tort, and labor laws.'
          },
          {
            question: 'How are disputes resolved in sports in India?',
            answer: 'Sports disputes in India are resolved through multiple mechanisms: Internal Dispute Resolution by sports governing bodies and federations through their disciplinary committees, Arbitration through sports arbitration panels or the Court of Arbitration for Sport (CAS), Mediation where parties attempt to reach amicable settlement with a neutral mediator, Civil Courts for contractual disputes, breach of contract, and civil wrongs, Criminal Courts for serious offenses like match-fixing, doping, fraud, and corruption, and National Anti-Doping Agency (NADA) for doping-related disputes. Most sports contracts include arbitration clauses requiring disputes to be resolved through arbitration rather than courts. This provides faster, specialized, and confidential dispute resolution. Our sports lawyers represent clients in all these forums.'
          },
          {
            question: 'What is the role of the National Anti-Doping Agency (NADA) in India?',
            answer: 'The National Anti-Doping Agency (NADA) is India\'s apex body responsible for promoting and coordinating anti-doping activities in the country. NADA\'s roles include: implementing the World Anti-Doping Code in India, conducting doping tests on athletes (in-competition and out-of-competition), maintaining a list of prohibited substances and methods, educating athletes and support personnel about anti-doping, investigating doping violations and conducting hearings, imposing sanctions on athletes found guilty of doping, maintaining therapeutic use exemption (TUE) procedures, coordinating with international anti-doping organizations, and promoting clean sport and fair play. NADA has the authority to suspend athletes, impose fines, and ban them from competition if found guilty of doping violations. Athletes have the right to appeal NADA decisions to the National Anti-Doping Disciplinary Panel and subsequently to CAS.'
          },
          {
            question: 'What is sports arbitration?',
            answer: 'Sports arbitration is a specialized form of alternative dispute resolution designed specifically for sports-related disputes. It involves: resolution of disputes by neutral arbitrators with sports law expertise, faster resolution compared to traditional court litigation, confidential proceedings protecting parties\' privacy, specialized knowledge of sports rules and regulations, and enforceability of awards internationally. In India, sports arbitration can be conducted through: sports federations\' arbitration panels, ad-hoc arbitration tribunals, institutional arbitration (like ICC, CAS), or general arbitration institutions. The Court of Arbitration for Sport (CAS) in Switzerland is the highest international sports arbitration body, and its decisions are binding on parties. Sports arbitration is preferred because it provides expert, efficient, and sport-specific dispute resolution. Our lawyers represent clients in sports arbitration proceedings.'
          },
          {
            question: 'How can athletes protect their intellectual property rights in India?',
            answer: 'Athletes can protect their intellectual property rights in India through: Trademark Registration for their name, nickname, signature, logo, or brand, Copyright Protection for original creative works like autobiographies, photographs, videos, Personality Rights protection against unauthorized commercial use of their name, image, or likeness, Licensing Agreements controlling how their IP is used commercially, Endorsement Contracts specifying terms of brand associations, Merchandising Agreements for products bearing their name or image, and Social Media Rights management and monetization. Athletes should register trademarks with the Indian Trademark Registry, include IP clauses in all contracts, monitor unauthorized use of their IP, take legal action against infringement, and work with sports lawyers to develop comprehensive IP protection strategies. Our firm helps athletes identify, protect, and monetize their intellectual property rights.'
          },
          {
            question: 'What are the legal implications of match-fixing in sports in India?',
            answer: 'Match-fixing in sports in India has serious legal implications: Criminal Liability under Indian Penal Code for cheating, fraud, criminal conspiracy, and corruption, potential imprisonment and heavy fines, Disciplinary Action by sports governing bodies including lifetime bans from the sport, forfeiture of prize money and earnings, Civil Liability for breach of contract and damages to sponsors and stakeholders, Reputation Damage affecting future career prospects, and International Bans preventing participation in international competitions. The Prevention of Corruption Act and various state gambling laws also apply to match-fixing cases. Law enforcement agencies like police and CBI investigate match-fixing allegations. Recent cases have resulted in criminal prosecutions and lengthy prison sentences. Sports governing bodies have zero-tolerance policies and impose severe sanctions. Our lawyers defend athletes accused of match-fixing and help sports organizations prevent and address match-fixing.'
          },
          {
            question: 'What is the role of sports agents in India?',
            answer: 'Sports agents in India play a crucial role in athletes\' careers by: negotiating contracts with teams, leagues, and sponsors, securing endorsement and sponsorship deals, managing athletes\' financial affairs and investments, providing career guidance and planning, handling media relations and public image, resolving disputes with teams or sponsors, coordinating with lawyers and accountants, and protecting athletes\' interests in all transactions. Sports agents must be registered with relevant sports federations and comply with agent regulations. They typically earn a commission (usually 10-20%) on contracts they negotiate. Athletes should carefully select agents with good reputation, experience, and ethical standards. Agent contracts should clearly specify services, commission rates, and termination terms. Our lawyers help athletes negotiate agent agreements, resolve disputes with agents, and ensure agents comply with their obligations.'
          },
          {
            question: 'What is the significance of sports insurance in India?',
            answer: 'Sports insurance is crucial for athletes and sports organizations in India because it provides: Personal Accident Coverage for injuries during training or competition, Medical Expense Coverage for treatment and rehabilitation, Disability Insurance for career-ending injuries, Life Insurance for athletes in high-risk sports, Liability Insurance for sports organizations against claims, Event Cancellation Insurance for sports events, Equipment Insurance for expensive sports equipment, and Loss of Income Coverage during injury periods. The Sports Injury Insurance Act of 2017 provides a legal framework for protecting athletes\' rights to insurance coverage. Many sports federations mandate insurance for athletes. Insurance helps athletes focus on performance without financial worry about injuries. Our lawyers help athletes understand insurance policies, file claims, and resolve insurance disputes.'
          },
          {
            question: 'How are disputes related to sports broadcasting rights resolved in India?',
            answer: 'Disputes related to sports broadcasting rights in India are resolved through: Contractual Dispute Resolution mechanisms specified in broadcasting agreements, Arbitration as most broadcasting contracts include arbitration clauses, Civil Courts for breach of contract and intellectual property infringement, Sports Governing Bodies for disputes involving their broadcasting rights, Regulatory Authorities like TRAI for broadcasting regulation issues, and Mediation for amicable settlement. The Sports Broadcasting Act of 2007 provides the legal framework for sports broadcasting in India. Common disputes involve: unauthorized broadcasting, breach of exclusivity, payment disputes, territorial rights violations, and signal piracy. Broadcasting rights are valuable assets, and disputes can involve large sums. Our lawyers represent broadcasters, sports organizations, and rights holders in broadcasting disputes, ensuring their rights are protected and contracts are enforced.'
          },
          {
            question: 'What are the legal implications of athlete endorsement contracts in India?',
            answer: 'Athlete endorsement contracts in India have significant legal implications: Contractual Obligations requiring athletes to promote products/services as specified, Exclusivity Clauses preventing endorsement of competing brands, Morality Clauses allowing termination if athlete\'s conduct damages brand image, Intellectual Property Rights regarding use of athlete\'s name, image, and likeness, Payment Terms specifying fees, royalties, and payment schedules, Duration and Termination provisions, Non-compete Restrictions during and after contract period, and Performance Requirements for appearances, social media posts, etc. Legal issues can arise from: breach of exclusivity, failure to perform obligations, disputes over payment, termination disputes, and unauthorized use of athlete\'s image. Athletes should carefully review endorsement contracts with legal counsel before signing. Our lawyers negotiate favorable endorsement terms, protect athletes\' rights, and resolve endorsement disputes.'
          },
          {
            question: 'How can sports organizations in India ensure compliance with anti-doping regulations?',
            answer: 'Sports organizations in India can ensure compliance with anti-doping regulations by: implementing comprehensive anti-doping policies aligned with WADA Code, conducting regular education programs for athletes and support staff, establishing testing programs (in-competition and out-of-competition), maintaining whereabouts systems for athlete location tracking, implementing therapeutic use exemption (TUE) procedures, establishing disciplinary procedures for violations, cooperating with NADA and international anti-doping agencies, maintaining confidentiality of testing and results, providing athletes with updated prohibited substance lists, and establishing results management procedures. Organizations should appoint anti-doping officers, conduct regular audits, and stay updated on WADA Code changes. Non-compliance can result in sanctions against the organization and loss of recognition. Our lawyers help sports organizations develop and implement anti-doping compliance programs.'
          },
          {
            question: 'What are the legal implications of sports betting in India?',
            answer: 'Sports betting in India has complex legal implications: Most forms of sports betting are illegal under the Public Gambling Act, 1867, State laws vary with some states allowing certain forms of betting, Online sports betting legality is unclear and subject to debate, Horse racing betting is legal in most states as a "game of skill", Fantasy sports are generally considered legal as games of skill, Illegal betting can result in criminal prosecution, fines, and imprisonment, Match-fixing related to betting is a serious criminal offense, and Offshore betting sites operate in legal grey areas. Recent discussions about legalizing and regulating sports betting continue. Athletes and sports officials are strictly prohibited from betting on their own sports. Our lawyers advise on sports betting legality, represent clients in betting-related cases, and help sports organizations prevent betting-related corruption.'
          },
          {
            question: 'What is the role of the Court of Arbitration for Sport (CAS) in sports disputes in India?',
            answer: 'The Court of Arbitration for Sport (CAS) based in Switzerland plays an important role in Indian sports disputes: CAS is the highest international sports arbitration body, Indian athletes and sports organizations can appeal to CAS against decisions of national sports federations, CAS decisions are final and binding on parties, CAS provides specialized sports law expertise, CAS handles disputes related to: doping violations, disciplinary sanctions, eligibility disputes, contract disputes, and Olympic/international competition matters. CAS operates through: Ordinary Arbitration Division for contractual disputes, Appeals Arbitration Division for appeals against federation decisions, and Ad Hoc Division for disputes during major events like Olympics. CAS awards are enforceable in India under the New York Convention. Many Indian sports federations\' rules provide for CAS appeals. Our lawyers represent Indian athletes and organizations in CAS proceedings, ensuring their rights are protected at the international level.'
          },
          {
            question: 'How can sports organizations in India address issues related to discrimination and harassment?',
            answer: 'Sports organizations in India can address discrimination and harassment by: implementing comprehensive anti-discrimination and anti-harassment policies, establishing clear complaint mechanisms and reporting procedures, conducting regular training and awareness programs, appointing dedicated officers to handle complaints, ensuring prompt and fair investigation of complaints, imposing appropriate sanctions on violators, providing support and protection to complainants, complying with Sexual Harassment of Women at Workplace Act, 2013, establishing Internal Complaints Committees (ICC) as required by law, promoting diversity and inclusion in sports, and creating safe and respectful sporting environments. Organizations should have zero-tolerance policies for discrimination based on gender, caste, religion, disability, or sexual orientation. Harassment includes sexual harassment, bullying, and abuse. Our lawyers help sports organizations develop policies, conduct investigations, and handle discrimination and harassment cases in compliance with law.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Sports Law Services?',
      visible: true,
      order: 10,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional sports law legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Sports Lawyer in Delhi - Sports Law & Athletic Disputes | GAG Lawyers',
    metaDescription: 'Expert sports law services in Delhi. Professional legal assistance for athletes, contracts, doping, disputes, and sports governance matters.'
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
