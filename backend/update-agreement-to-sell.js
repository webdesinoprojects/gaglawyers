require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const updateAgreementToSell = async () => {
  try {
    await connectDB();

    const serviceData = {
      name: 'Agreement to Sell',
      slug: 'agreement-to-sell',
      category: 'property',
      shortDescription: 'Expert legal services for drafting and reviewing agreements to sell property, flats, vehicles, and other assets. Protect your interests with comprehensive legal documentation.',
      overview: 'An agreement to sell property is the first and most important document for any real estate transaction. This legally binding document stipulates the terms and conditions under which a property would be transferred from the seller to the buyer. Whether you\'re dealing with an agreement to sell flat, land, or even an agreement to sell vehicle, what\'s placed on that document should accurately represent the transaction duly in order to have a more healthy land deal.',
      
      // Hero image for consistent layout
      heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
      
      typesOfCases: [
        'Agreement to Sell Flat',
        'Agreement to Sell for Resale Flat',
        'Agreement to Sell for Under Construction Property',
        'Agreement to Sell Immovable Property',
        'Agreement to Sell Vehicle',
        'Draft Agreement to Sell Property',
        'Draft Agreement to Sell a Car'
      ],

      process: [
        {
          step: 1,
          title: 'Initial Consultation',
          description: 'We discuss your property transaction requirements and understand the specific details of your agreement needs.'
        },
        {
          step: 2,
          title: 'Document Review',
          description: 'Our experts review all relevant documents including property papers, previous agreements, and ownership records.'
        },
        {
          step: 3,
          title: 'Agreement Drafting',
          description: 'We draft a comprehensive agreement to sell that includes all necessary clauses, terms, and conditions specific to your transaction.'
        },
        {
          step: 4,
          title: 'Legal Compliance Check',
          description: 'We ensure the agreement complies with all applicable laws, stamp duty requirements, and registration norms.'
        },
        {
          step: 5,
          title: 'Finalization & Execution',
          description: 'After your approval, we facilitate the execution of the agreement and guide you through stamp duty payment and registration.'
        }
      ],

      keyPoints: [
        'Compliance with property laws and regulations',
        'Protection of financial interests for both parties',
        'Prevention of future disputes through clear terms',
        'Expert navigation of complex property laws',
        'Customized agreements for different property types',
        'Transparent legal fee structure',
        'Guidance on stamp duty and registration',
        'Review of existing agreements',
        'Specialized formats for resale and under-construction properties',
        'Protection against legal risks and liabilities'
      ],

      // Content blocks for detailed information
      contentBlocks: [
        {
          heading: 'Types of Agreements We Handle',
          paragraphs: [
            'With this complex world of transactions involved in real estate, it is not only helpful but quite crucial to have a knowledgeable lawyer for agreement to sell property. GAG Lawyers - Grover and Grover Advocates and Solicitors understand the complexities of property law and just how important a good agreement can be in protecting your interests.',
            'Our lawyer specializing in agreements to sell property brings years of experience to the fight to protect your rights and interests through the process. From drafting and reviewing agreements to expert legal advice, we guide you through each step of your property transaction.'
          ]
        },
        {
          heading: 'The Importance of Legal Expertise',
          paragraphs: [
            'There are several reasons why you need to engage a lawyer for agreement to sell property: Compliance with the law, Protection of the financial interests, Avoid future disputes, Navigating complex laws surrounding property, and Guaranteeing a smooth transaction process.',
            'Our best lawyer for property disputes can really help you turn safety corners while ensuring the effectiveness and enforceability of your agreement.'
          ]
        },
        {
          heading: 'Agreement Formats and Considerations',
          paragraphs: [
            'A total sales agreement usually contains the following: Parties\' details, Accurate description of the property, Amount and payment terms, Date of possession, Responsibilities of both parties, Effect of breach, and Redress mechanism for disputes.',
            'Our real estate attorney will make sure that all the requirements are followed in an agreement to sell format that is prepared for you.'
          ]
        },
        {
          heading: 'Stamp Duty Considerations in Agreements to Sell',
          paragraphs: [
            'Stamp duty is a significant tax aspect when it comes to any sale. Stamp duty is more commonly associated with final sale deeds; however, the agreement to sell may attract the stamp duty charge in many jurisdictions.',
            'Our experts can help you with: What rate of stamp duty applies to your transaction, What varies between states in terms of computation of stamp duty, How you can make lesser payments on stamp duty, and How to comply with the local regulations related to stamp duty.'
          ]
        },
        {
          heading: 'Landmark Cases in Property Law',
          paragraphs: [
            'The legal precedents form a strong basis for robust agreement drafting. Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2012) gave significant importance at the Supreme Court levels to registered sales deeds rather than general power of attorney sales.',
            'Narne Construction P. Ltd. v. Union of India (2012) deals with the issues of homebuyers in delayed projects. K.P. Varghese v. Income Tax Officer (1981) set important precedents for interpreting property sale agreements.'
          ]
        }
      ],

      // Document checklist
      documentChecklist: [
        'Identity and address proof of buyer and seller',
        'Property title chain and ownership documents',
        'Accurate property description with survey/flat details',
        'Consideration amount terms, payment schedule, and receipts',
        'Possession timeline and obligation clauses',
        'Existing occupancy and previous transaction details (for resale)',
        'Fixtures and fittings list (where applicable)',
        'Draft cancellation, default, and dispute-resolution clauses',
        'Stamp duty and registration-related supporting records'
      ],

      // Popular cases
      popularCases: [
        'Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2012)',
        'Narne Construction P. Ltd. v. Union of India (2012)',
        'K.P. Varghese v. Income Tax Officer (1981)'
      ],

      // FAQs
      faqs: [
        {
          question: 'What is the difference between an agreement to sell and a sale deed?',
          answer: 'An agreement to sell creates a promise to transfer property in the future, while a sale deed is the final instrument that completes legal transfer.'
        },
        {
          question: 'How is stamp duty calculated for an agreement to sell?',
          answer: 'Stamp duty varies by state and is usually linked to property value/consideration and local rules. A location-specific legal check is recommended before execution.'
        },
        {
          question: 'Can an agreement to sell be cancelled?',
          answer: 'Yes, cancellation can be done under agreed contractual conditions and applicable law, subject to drafted cancellation/default clauses.'
        },
        {
          question: 'Is an agreement to sell legally binding?',
          answer: 'Yes, it is a legally binding contract, though enforcement may require further legal steps depending on breach and relief sought.'
        },
        {
          question: 'How long is an agreement to sell valid?',
          answer: 'Validity is generally based on timelines written in the agreement, including performance deadlines and long-stop dates.'
        }
      ],

      // SEO Keywords
      seoKeywords: [
        'Agreement to Sell',
        'Lawyer for agreement to sell property',
        'Agreement to sell flat lawyer',
        'Agreement to sell resale flat',
        'Agreement to sell under construction property',
        'Agreement to sell immovable property',
        'Agreement to sell vehicle',
        'Property agreement lawyer',
        'Draft agreement to sell property',
        'Draft agreement to sell a car',
        'Property lawyer fee',
        'Stamp duty on agreement to sell',
        'Property lawyer near me'
      ],

      longDescription: `
<h2>Types of Agreements We Handle</h2>
<p>With this complex world of transactions involved in real estate, it is not only helpful but quite crucial to have a knowledgeable lawyer for agreement to sell property. GAG Lawyers - Grover and Grover Advocates and Solicitors understand the complexities of property law and just how important a good agreement can be in protecting your interests.</p>

<p>Our lawyer specializing in agreements to sell property brings years of experience to the fight to protect your rights and interests through the process. From drafting and reviewing agreements to expert legal advice, we guide you through each step of your property transaction.</p>

<ol>
<li><strong>Agreement to Sell Flat:</strong> Our advocate for agreement to sell flat ensures that all aspects of apartment transactions are agreed on.</li>
<li><strong>Agreement to Sell for Resale Flat:</strong> This organization deals with specific issues relating to resale properties and provides protection to both the buyer and seller.</li>
<li><strong>Agreement to Sell for Under Construction Property:</strong> Our experts manage the risks associated with projects under construction, thus securing one's investment.</li>
<li><strong>Agreement to Sell Immovable Property:</strong> We provide legal services for every type of real estate, including land and buildings.</li>
<li><strong>Agreement to Sell Vehicle:</strong> Our services extend the movable property to facilitate the smooth sale of vehicles.</li>
</ol>

<h2>The Importance of Legal Expertise</h2>
<p>There are several reasons why you need to engage a lawyer for agreement to sell property, such as the following:</p>
<ul>
<li>Compliance with the law</li>
<li>Protection of the financial interests</li>
<li>Avoid future disputes</li>
<li>Navigating complex laws surrounding property</li>
<li>Guaranteeing a smooth transaction process</li>
</ul>
<p>Our best lawyer for property disputes can really help you turn safety corners while ensuring the effectiveness and enforceability of your agreement.</p>

<h2>Agreement Formats and Considerations</h2>

<h3>Agreement to Sell Format</h3>
<p>A total sales agreement usually contains the following:</p>
<ul>
<li>Parties' details</li>
<li>Accurate description of the property</li>
<li>Amount and payment terms</li>
<li>Date of possession</li>
<li>Responsibilities of both parties</li>
<li>Effect of breach</li>
<li>Redress mechanism for disputes</li>
</ul>
<p>Our real estate attorney will make sure that all the requirements are followed in an agreement to sell format that is prepared for you.</p>

<h3>Agreement to Sell Format for Resale Flat</h3>
<p>Other factors that can be involved in dealing with resale properties are:</p>
<ul>
<li>Current status of occupancy</li>
<li>Details of earlier transactions</li>
<li>Specific provisions about the existing fixtures and fittings</li>
</ul>
<p>Our advocate for agreement to sell property tailors the format to address the unique aspects of resale transactions.</p>

<h2>Drafting Specialized Agreements</h2>
<p>Our expertise extends to drafting various types of agreements:</p>
<ul>
<li><strong>Draft agreement to sell property:</strong> Our drafting lawyer for agreement to sell flat or other types of properties prepares case-specific documents.</li>
<li><strong>Draft Agreement to sell a car:</strong> We address the particularities of selling a vehicle through a very smooth legal process.</li>
</ul>

<h2>Legal Fees and Consultation</h2>
<p>We make sure that the legal fees involved in property lawyer services are transparent. Property lawyer fee bases include the following:</p>
<ul>
<li>Type and value of the property</li>
<li>Complexity of the transaction</li>
<li>Level of customisation required</li>
<li>Degree of legal representation necessary</li>
</ul>
<p>For a detailed quote, contact our property lawyer near me service for a personalized consultation.</p>

<h2>Stamp Duty Considerations in Agreements to Sell</h2>
<p>Stamp duty is a significant tax aspect when it comes to any sale. Stamp duty is more commonly associated with final sale deeds; however, the agreement to sell may attract the stamp duty charge in many jurisdictions. Our experts can help you with:</p>
<ul>
<li>What rate of stamp duty applies to your transaction</li>
<li>What varies between states in terms of computation of stamp duty</li>
<li>How you can make lesser payments on stamp duty</li>
<li>How to comply with the local regulations related to stamp duty</li>
</ul>
<p>We also guide you regarding matters like leave and license agreement stamp duty, so that no point of tax and duty concern with regard to your property transaction goes un-noticed.</p>

<h2>Landmark Cases in Property Law</h2>
<p>The legal precedents form a strong basis for robust agreement drafting. Some of the significant landmark cases include:</p>

<ol>
<li><strong>Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2012):</strong> This case gave significant importance at the Supreme Court levels to registered sales deeds rather than general power of attorney sales, thus governing the construction of agreements to sell.</li>
<li><strong>Narne Construction P. Ltd. v. Union of India (2012):</strong> It deals with the issues of homebuyers in delayed projects, which had a huge impact on agreements related to under-construction properties.</li>
<li><strong>K.P. Varghese v. Income Tax Officer, 1981:</strong> While primarily a tax case, it set important precedents for interpreting property sale agreements, influencing how our lawyers draft these documents.</li>
</ol>

<p>These cases underscore the importance of engaging the best lawyer for property transactions to ensure your agreement stands up to legal scrutiny.</p>

<h2>Contact Us for Expert Property Transaction Assistance</h2>
<p>Whether you require a lawyer for agreement to sell property or need the deep scrutiny of an already existing agreement, GAG Lawyers - Grover and Grover Advocates and Solicitors are ready for you.</p>

<p>Do not let your property transactions fall into the hands of fate. Consult with one of the best lawyer for property who can work on property matters and book a consultation appointment with our seasoned lawyer team.</p>

<p>Allow our experienced lawyers to walk you through all the intricate details of property law and protect your interest in every deed involving a property sale.</p>
      `.trim()
    };

    const result = await Service.findOneAndUpdate(
      { slug: 'agreement-to-sell' },
      serviceData,
      { new: true, upsert: false }
    );

    if (result) {
      console.log('✅ Successfully updated "Agreement to Sell" service with new fields');
      console.log('\n📋 Updated Details:');
      console.log('   Name:', result.name);
      console.log('   Slug:', result.slug);
      console.log('   Hero Image:', result.heroImage ? 'Set' : 'Not set');
      console.log('   Content Blocks:', result.contentBlocks?.length || 0);
      console.log('   Document Checklist:', result.documentChecklist?.length || 0);
      console.log('   Popular Cases:', result.popularCases?.length || 0);
      console.log('   FAQs:', result.faqs?.length || 0);
      console.log('   SEO Keywords:', result.seoKeywords?.length || 0);
    } else {
      console.log('❌ Service not found');
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

updateAgreementToSell();
