require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const serviceData = {
  slug: 'media-and-broadcasting-lawyer',
  name: 'Media and Broadcasting Lawyer',
  sections: [
    {
      type: 'hero',
      heading: 'Media and Broadcasting Lawyer',
      visible: true,
      order: 0,
      background: 'dark',
      content: {
        subheading: 'Expert Legal Services for Media and Broadcasting Law',
        ctaText: 'Call Us Now',
        ctaLink: '/contact',
        backgroundImageUrl: ''
      }
    },
    {
      type: 'overview',
      heading: 'Media and Broadcasting Law Services',
      visible: true,
      order: 1,
      background: 'light',
      content: {
        body: 'A Media and Broadcasting lawyer is a legal professional who specializes in providing legal advice and representation on a range of issues related to media and broadcasting, including intellectual property, media regulation, defamation, and content licensing.\n\nMedia and broadcasting law in India is a branch of law that deals with the regulation of the media and broadcasting industries in India. It covers a wide range of topics such as freedom of expression, censorship, copyright, intellectual property, advertising, licensing and regulation, media ownership and control, media ethics and responsibility, telecommunications, digital media, and broadcasting.'
      }
    },
    {
      type: 'overview',
      heading: 'Media and Broadcasting Law in India',
      visible: true,
      order: 2,
      background: 'light',
      content: {
        body: 'The law governing the media and broadcasting industries in India is largely based on the Indian Constitution and the various statutes and regulations that have been enacted over the years. The Constitution guarantees the freedom of speech and expression and places certain restrictions on the state in its regulation of the media and broadcasting industries.\n\nThe primary legislation governing the media and broadcasting industries in India is the Cable Television Networks (Regulation) Act, 1995, which was enacted to regulate the cable television networks in India. In addition, the Information Technology Act, 2000, provides for the regulation of digital media and broadcasting in India. The Copyright Act, 1957, is another important piece of legislation that provides for the protection of copyright and related rights in the media and broadcasting industries.'
      }
    },
    {
      type: 'benefits',
      heading: 'Key Legislation in Media and Broadcasting Law',
      visible: true,
      order: 3,
      background: 'dark',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Copyright Act, 1957',
            description: 'Provides exclusive rights to creators and owners of original works of art, literature, music, films, broadcasts, and other types of works. Protects authors, producers, performers, photographers, sound and video recorders, and broadcast organizations.'
          },
          {
            icon: 'CheckCircle',
            title: 'Cable Television Networks (Regulation) Act, 1995',
            description: 'Governs the regulation of cable networks in India, providing for registration of cable operators, regulation of quality and content of cable services, and payment of license fees for broadcasting signals.'
          },
          {
            icon: 'CheckCircle',
            title: 'Information Technology Act, 2000',
            description: 'Deals with cybercrimes and illegal activities in the digital space, applicable to broadcasting industry for matters such as censorship, copyright infringement, illegal downloading, and related issues.'
          },
          {
            icon: 'CheckCircle',
            title: 'The Cinematograph Act',
            description: 'Provides for the regulation of motion pictures in India, prohibiting exhibition of films not certified by the Central Board of Film Certification, and regulating content of films.'
          },
          {
            icon: 'CheckCircle',
            title: 'The Press and Registration of Books Act',
            description: 'Provides for the registration of newspapers and periodicals in India, regulating content of newspapers and periodicals, and governing registration and inspection of books and publications.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Types of Disputes in Media and Broadcasting Law',
      visible: true,
      order: 4,
      background: 'light',
      content: {
        body: 'Media and broadcasting laws in India regulate the media and broadcasting industries to ensure that content is accurate and not offensive, as well as to protect the rights of individuals in the industry. Several types of disputes may arise:\n\nCopyright Infringement: One of the most common types of disputes occurs when a media entity or individual copies the work of another person without their permission. These disputes can be resolved through arbitration, mediation, or litigation.\n\nContractual Disputes: Involve disagreements between two parties regarding the terms of a contract. These can be resolved through negotiation, arbitration, or litigation.\n\nAdvertising Disputes: Involve disagreements between two parties regarding the use of a product or service in an advertisement. India has very specific advertising regulations that must be followed.'
      }
    },
    {
      type: 'overview',
      heading: 'Charges, Penalties & Punishment',
      visible: true,
      order: 5,
      background: 'light',
      content: {
        body: 'Media and broadcasting laws are in place to ensure that media and broadcasting companies comply with legal regulations. The charges, penalties, and punishments associated with these laws vary depending on the severity of the offense.\n\nThe most common charges are violations of intellectual property rights (IPR) and copyright infringement. If found guilty, the offender may face heavy fines, jail time, and even suspension or revocation of their license. For copyright infringement, penalties may include a fine of up to Rs. 50,000, imprisonment of up to two years, or both.\n\nPunishments may include suspension or revocation of the offender\'s license or even the closure of the media or broadcasting company. In some cases, the offender may be barred from working in the media and broadcasting industries for a certain period of time.'
      }
    },
    {
      type: 'process',
      heading: 'Procedure to File a Media and Broadcasting Case',
      visible: true,
      order: 6,
      background: 'dark',
      content: {
        steps: [
          {
            stepNumber: 1,
            title: 'Understand Applicable Laws',
            description: 'Gain a thorough understanding of the laws and regulations governing the media industry, as media and broadcasting are highly regulated sectors.'
          },
          {
            stepNumber: 2,
            title: 'Identify the Party',
            description: 'Identify the party against whom legal action is to be taken - this may be a media house, a broadcaster, an individual, or any other entity involved in the media and broadcasting sectors.'
          },
          {
            stepNumber: 3,
            title: 'Consult with a Lawyer',
            description: 'Consult with a lawyer who is knowledgeable about media and broadcasting law in India. The lawyer should provide legal advice on the best course of action and help prepare the necessary paperwork.'
          },
          {
            stepNumber: 4,
            title: 'File the Case',
            description: 'File the case in the relevant court - this may be a civil court or a criminal court depending on the nature of the dispute. In some cases, it may also be necessary to file a complaint with the broadcasting regulator.'
          },
          {
            stepNumber: 5,
            title: 'Court Proceedings',
            description: 'Appear in court and present evidence. The court will hear both sides and make a decision based on the evidence presented. The court may order a settlement or award damages.'
          }
        ]
      }
    },
    {
      type: 'benefits',
      heading: 'Documents Required to File a Case',
      visible: true,
      order: 7,
      background: 'light',
      content: {
        items: [
          {
            icon: 'CheckCircle',
            title: 'Letter of Complaint',
            description: 'Should include details of the incident that has occurred and the details of the claim.'
          },
          {
            icon: 'CheckCircle',
            title: 'Notice of Claim',
            description: 'Should contain the details of the claim and the remedies sought.'
          },
          {
            icon: 'CheckCircle',
            title: 'Evidence of Breach',
            description: 'Should be in the form of certified copies of documents, affidavits, recordings, or other evidence that proves the breach of law.'
          },
          {
            icon: 'CheckCircle',
            title: 'Writ of Summons',
            description: 'Should include the name and address of the defendant, details of the claim, the date and time of the hearing, and the name and address of the court.'
          },
          {
            icon: 'CheckCircle',
            title: 'Statement of Claim',
            description: 'Should include the details of the claim, the remedies sought, and the evidence provided.'
          },
          {
            icon: 'CheckCircle',
            title: 'Copy of Law or Regulation',
            description: 'Should include a copy of the law or regulation that has been breached, along with copies of the complaint and notice of claim.'
          }
        ]
      }
    },
    {
      type: 'overview',
      heading: 'Role of Lawyer in Media and Broadcasting Cases',
      visible: true,
      order: 8,
      background: 'light',
      content: {
        body: 'Media and Broadcasting Lawyers play a vital role in this sector as they are knowledgeable about the various legal aspects associated with media and broadcasting law and are able to provide legal advice and guidance to their clients.\n\nMedia and Broadcasting Lawyers provide legal advice to clients involved in media and broadcasting law in India, including advising them on the various aspects of the law and helping them understand the legal implications of their actions. They also provide legal representation in court, if necessary.\n\nThey advise clients on copyright, trademark, and related issues, and provide advice on the various laws applicable to the media and broadcasting industry in India. They help media and broadcasting companies understand the legal implications of their actions and assist them in complying with relevant laws, including advertising, content regulation, and other related matters.'
      }
    },
    {
      type: 'overview',
      heading: 'How Grover & Grover, Advocates Help',
      visible: true,
      order: 9,
      background: 'dark',
      content: {
        body: 'Grover & Grover, Advocates and Solicitors, is a premier law firm in India that specializes in Media and Broadcasting Law. The firm has a team of experienced lawyers who are well versed in the laws and regulations related to media and broadcasting in India.\n\nThe firm provides legal advice and services to its clients in relation to media and broadcasting law in India, including issues such as licensing, content regulation, advertising, digital rights management, and media regulation. The firm also helps its clients in obtaining licenses and other approvals from various regulatory authorities.\n\nGrover & Grover assists its clients in drafting and negotiating contracts related to media and broadcasting, including contracts for production and distribution of content, licensing agreements, copyright and trademark protection, and other related matters. The firm also provides legal advice on matters such as defamation and privacy, and assists its clients in disputes and litigation related to media and broadcasting.'
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
            title: 'Indian Broadcasting Foundation v. The Cricket Association of Bengal',
            description: 'The Supreme Court held that broadcasting rights of a particular match or tournament should not be monopolized and should be available for public access. This ensured public access to important sporting events.'
          },
          {
            icon: 'CheckCircle',
            title: 'Bennett Coleman & Co. v. Union of India',
            description: 'Established the principle of freedom of speech and expression, holding that freedom of press is a fundamental right and should not be subject to any prior restraints.'
          },
          {
            icon: 'CheckCircle',
            title: 'Star India Pvt. Ltd. v. B.A.G Films & Media Ltd.',
            description: 'The Supreme Court held that intellectual property rights are essential to the functioning of the media and broadcasting industry and any infringement should be met with appropriate remedies.'
          },
          {
            icon: 'CheckCircle',
            title: 'All India Radio v. Indian Express Newspapers Ltd.',
            description: 'The Supreme Court held that the right to broadcast news is an exclusive right of the radio broadcaster and that the broadcaster should be given appropriate protection.'
          },
          {
            icon: 'CheckCircle',
            title: 'Prasar Bharati v. Avinash Chander',
            description: 'Established the right to broadcast news as an exclusive right of the broadcaster and the importance of providing appropriate protection to broadcasters in India.'
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
            question: 'What is media law in India?',
            answer: 'Media law in India is a branch of law that governs the regulation, content, ownership, and operation of media outlets, such as newspapers, television channels, radio stations, and online platforms. It includes legal issues such as defamation, privacy, intellectual property, broadcasting regulations, and freedom of speech and expression.'
          },
          {
            question: 'What types of media broadcast cases do media lawyers handle in India?',
            answer: 'Media lawyers handle copyright infringement cases, defamation and libel cases, privacy violations, content licensing disputes, broadcasting license issues, advertising regulation matters, censorship and content regulation cases, intellectual property disputes, contractual disputes between media entities, and regulatory compliance matters.'
          },
          {
            question: 'What are the legal consequences of publishing fake news or misinformation in India?',
            answer: 'Publishing fake news or misinformation can lead to criminal charges under IPC sections for defamation, public mischief, or spreading false information. Consequences include fines, imprisonment up to 3 years, civil liability for damages, suspension or cancellation of broadcasting licenses, and penalties under IT Act for online content. Media entities may also face regulatory action.'
          },
          {
            question: 'What are the restrictions on freedom of speech and expression in India\'s media industry?',
            answer: 'Restrictions include: content that threatens sovereignty, integrity, or security of India; defamatory content; content inciting violence or hatred; obscene or immoral content; contempt of court; content affecting friendly relations with foreign states; and compliance with broadcasting codes and advertising standards. These restrictions are subject to reasonable restrictions under Article 19(2) of the Constitution.'
          },
          {
            question: 'How can media lawyers in India help media companies and journalists protect their rights and interests?',
            answer: 'Media lawyers help by providing legal advice on content compliance, drafting and reviewing contracts, protecting intellectual property rights, defending against defamation claims, obtaining necessary licenses and approvals, representing in regulatory proceedings, advising on privacy and data protection, handling copyright disputes, and providing crisis management support.'
          },
          {
            question: 'What is the impact of social media on media law in India?',
            answer: 'Social media has significantly impacted media law by creating new challenges in content regulation, raising privacy and data protection concerns, increasing instances of online defamation and harassment, requiring new intermediary liability frameworks, necessitating fake news and misinformation regulations, and creating jurisdictional challenges for cross-border content. The IT Rules 2021 specifically address social media regulation.'
          },
          {
            question: 'What ethical considerations are involved in media law in India?',
            answer: 'Ethical considerations include: accuracy and truthfulness in reporting, protecting sources and confidentiality, avoiding conflicts of interest, respecting privacy and dignity of individuals, maintaining editorial independence, avoiding sensationalism, ensuring fair and balanced coverage, protecting vulnerable groups, adhering to professional codes of conduct, and balancing public interest with individual rights.'
          },
          {
            question: 'What are some of the key legal and regulatory challenges facing the media industry in India?',
            answer: 'Key challenges include: navigating complex and evolving regulations, balancing freedom of expression with content restrictions, managing digital transformation and OTT platform regulation, protecting intellectual property in digital age, addressing fake news and misinformation, ensuring data privacy compliance, managing defamation risks, obtaining and maintaining licenses, dealing with government censorship, and adapting to new IT Rules and intermediary guidelines.'
          },
          {
            question: 'How do media lawyers in India assist clients in responding to legal threats or challenges, such as defamation claims or government censorship?',
            answer: 'Media lawyers assist by: evaluating legal risks and providing strategic advice, drafting responses to legal notices, representing clients in negotiations and settlements, defending against defamation claims in court, challenging government censorship orders, filing appeals and writs, advising on content modification or removal, managing public relations during legal disputes, and ensuring compliance with court orders while protecting editorial freedom.'
          },
          {
            question: 'How do media lawyers in India stay up-to-date with changes in laws and regulations that affect their clients?',
            answer: 'Media lawyers stay updated by: regularly monitoring legislative developments and amendments, attending legal seminars and conferences, participating in industry associations and forums, subscribing to legal journals and publications, analyzing court judgments and precedents, engaging with regulatory authorities, networking with other media law practitioners, conducting continuous legal research, and providing regular updates and training to clients on regulatory changes.'
          }
        ]
      }
    },
    {
      type: 'cta_banner',
      heading: 'Need Expert Media and Broadcasting Legal Services?',
      visible: true,
      order: 12,
      background: 'dark',
      content: {
        body: 'Contact GAG Lawyers - Grover and Grover Advocates and Solicitors for professional media and broadcasting legal services in Delhi.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  seo: {
    title: 'Media and Broadcasting Lawyer in Delhi - GAG Lawyers',
    metaDescription: 'Expert media and broadcasting law services in Delhi. Professional legal advice for copyright, defamation, content licensing, and media regulation matters.'
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
