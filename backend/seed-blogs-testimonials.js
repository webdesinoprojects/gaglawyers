require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const Review = require('./models/Review');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const blogPosts = [
  {
    title: 'Understanding Criminal Defense Rights in India',
    slug: 'understanding-criminal-defense-rights-india',
    excerpt: 'A comprehensive guide to your fundamental rights when facing criminal charges in India, including the right to legal representation and fair trial.',
    content: `
      <h2>Your Constitutional Rights</h2>
      <p>Every person accused of a crime in India has fundamental rights protected under the Constitution. Understanding these rights is crucial for ensuring fair treatment in the legal system.</p>
      
      <h3>Right to Legal Representation</h3>
      <p>Article 22 of the Indian Constitution guarantees the right to consult and be defended by a legal practitioner of your choice. This is a fundamental right that cannot be denied.</p>
      
      <h3>Right Against Self-Incrimination</h3>
      <p>Article 20(3) protects you from being compelled to be a witness against yourself. You have the right to remain silent during police interrogation.</p>
      
      <h3>Right to Bail</h3>
      <p>In most cases, you have the right to apply for bail. The courts consider various factors including the nature of the offense, severity of punishment, and likelihood of the accused fleeing.</p>
      
      <h3>Right to a Fair Trial</h3>
      <p>You are entitled to a fair, speedy, and public trial. This includes the right to examine witnesses, present evidence, and appeal against conviction.</p>
      
      <h2>How We Can Help</h2>
      <p>At GAG Lawyers, our experienced criminal defense team ensures your rights are protected at every stage. We provide expert legal representation and strategic defense planning.</p>
      
      <blockquote>Justice delayed is justice denied. We work tirelessly to ensure your case moves forward efficiently while protecting your constitutional rights.</blockquote>
      
      <h3>Contact Our Criminal Defense Team</h3>
      <p>If you or a loved one is facing criminal charges, contact us immediately for a confidential consultation. Early legal intervention can make a significant difference in the outcome of your case.</p>
    `,
    category: 'Criminal Law',
    tags: ['criminal defense', 'legal rights', 'constitution', 'bail', 'fair trial'],
    isPublished: true,
    publishedAt: new Date('2024-03-15'),
    views: 245,
    featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  },
  {
    title: 'Real Estate Law: Key Changes in 2026',
    slug: 'real-estate-law-changes-2026',
    excerpt: 'Important updates to real estate regulations that property buyers, sellers, and developers need to know about in 2026.',
    content: `
      <h2>Major Regulatory Updates</h2>
      <p>The real estate sector in India has witnessed significant regulatory changes in 2026, aimed at increasing transparency and protecting consumer interests.</p>
      
      <h3>RERA Amendments</h3>
      <p>The Real Estate (Regulation and Development) Act has been amended to include stricter penalties for non-compliance and enhanced buyer protection mechanisms.</p>
      
      <h3>Digital Documentation</h3>
      <p>New provisions mandate digital documentation for all property transactions, making the process more transparent and reducing the scope for fraud.</p>
      
      <h3>Stamp Duty Reforms</h3>
      <p>Several states have revised stamp duty rates and introduced online payment systems to streamline property registration.</p>
      
      <h2>Impact on Stakeholders</h2>
      
      <h3>For Buyers</h3>
      <ul>
        <li>Enhanced protection against project delays</li>
        <li>Mandatory disclosure of all project details</li>
        <li>Easier access to grievance redressal mechanisms</li>
      </ul>
      
      <h3>For Developers</h3>
      <ul>
        <li>Stricter compliance requirements</li>
        <li>Mandatory project insurance</li>
        <li>Regular audit and reporting obligations</li>
      </ul>
      
      <h3>For Investors</h3>
      <ul>
        <li>Clearer title verification processes</li>
        <li>Reduced transaction timelines</li>
        <li>Better dispute resolution mechanisms</li>
      </ul>
      
      <h2>Expert Legal Guidance</h2>
      <p>Navigating these changes requires expert legal advice. Our real estate law team stays updated with all regulatory developments to provide you with accurate, timely counsel.</p>
      
      <blockquote>Whether you're buying your first home or developing a large project, understanding these legal changes is crucial for protecting your investment.</blockquote>
    `,
    category: 'Real Estate Law',
    tags: ['real estate', 'RERA', 'property law', 'regulations', '2026'],
    isPublished: true,
    publishedAt: new Date('2024-03-10'),
    views: 189,
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  },
  {
    title: 'Corporate Compliance: Essential Checklist for 2026',
    slug: 'corporate-compliance-checklist-2026',
    excerpt: 'A comprehensive checklist to ensure your company remains compliant with all corporate laws and regulations in 2026.',
    content: `
      <h2>Annual Compliance Requirements</h2>
      <p>Corporate compliance is critical for maintaining good standing and avoiding penalties. Here's your essential checklist for 2026.</p>
      
      <h3>Companies Act Compliance</h3>
      <ul>
        <li>Annual General Meeting (AGM) within statutory timelines</li>
        <li>Filing of Annual Returns (Form MGT-7)</li>
        <li>Filing of Financial Statements (Form AOC-4)</li>
        <li>Board Meetings - minimum four per year</li>
        <li>Maintenance of statutory registers</li>
      </ul>
      
      <h3>Tax Compliance</h3>
      <ul>
        <li>Income Tax Return filing</li>
        <li>GST Returns - monthly/quarterly</li>
        <li>TDS Returns and payments</li>
        <li>Transfer Pricing documentation</li>
      </ul>
      
      <h3>Labour Law Compliance</h3>
      <ul>
        <li>PF and ESI registrations and returns</li>
        <li>Professional Tax compliance</li>
        <li>Shops and Establishment Act registration</li>
        <li>Contract Labour Act compliance</li>
      </ul>
      
      <h2>New Compliance Requirements in 2026</h2>
      
      <h3>Data Protection</h3>
      <p>The Digital Personal Data Protection Act requires companies to implement robust data protection measures and appoint Data Protection Officers.</p>
      
      <h3>ESG Reporting</h3>
      <p>Environmental, Social, and Governance (ESG) reporting is now mandatory for companies above certain thresholds.</p>
      
      <h3>Cybersecurity Compliance</h3>
      <p>New cybersecurity norms require companies to report data breaches within 72 hours and maintain incident response plans.</p>
      
      <h2>Consequences of Non-Compliance</h2>
      <p>Non-compliance can result in:</p>
      <ul>
        <li>Heavy monetary penalties</li>
        <li>Director disqualification</li>
        <li>Prosecution of key managerial personnel</li>
        <li>Reputational damage</li>
        <li>Difficulty in raising funds</li>
      </ul>
      
      <h2>How We Help</h2>
      <p>Our corporate law team provides comprehensive compliance services including:</p>
      <ul>
        <li>Compliance audits and gap analysis</li>
        <li>Annual compliance calendar preparation</li>
        <li>Filing and documentation support</li>
        <li>Board and shareholder meeting management</li>
        <li>Regulatory liaison and representation</li>
      </ul>
      
      <blockquote>Proactive compliance management is far more cost-effective than dealing with penalties and legal issues. Let us help you stay ahead.</blockquote>
    `,
    category: 'Corporate Law',
    tags: ['corporate compliance', 'companies act', 'regulations', 'checklist', 'business law'],
    isPublished: true,
    publishedAt: new Date('2024-03-05'),
    views: 312,
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
  },
  {
    title: 'Family Law: Understanding Child Custody Rights',
    slug: 'understanding-child-custody-rights',
    excerpt: 'A detailed guide on child custody laws in India, factors considered by courts, and how to protect your parental rights.',
    content: `
      <h2>Types of Child Custody</h2>
      <p>Understanding the different types of custody arrangements is crucial when navigating family law matters.</p>
      
      <h3>Physical Custody</h3>
      <p>Physical custody determines where the child will live. It can be sole (with one parent) or joint (shared between both parents).</p>
      
      <h3>Legal Custody</h3>
      <p>Legal custody involves the right to make important decisions about the child's upbringing, including education, healthcare, and religious training.</p>
      
      <h3>Joint Custody</h3>
      <p>Joint custody arrangements allow both parents to share responsibilities and time with the child, promoting the child's relationship with both parents.</p>
      
      <h2>Factors Courts Consider</h2>
      <p>Indian courts prioritize the child's best interests when determining custody. Key factors include:</p>
      
      <ul>
        <li><strong>Age of the Child:</strong> Young children typically stay with the mother, but this is not absolute</li>
        <li><strong>Child's Preference:</strong> Older children's wishes are given consideration</li>
        <li><strong>Parent's Ability:</strong> Financial stability, emotional support, and caregiving capacity</li>
        <li><strong>Child's Welfare:</strong> Educational opportunities, healthcare, and overall well-being</li>
        <li><strong>Moral Character:</strong> Each parent's conduct and lifestyle</li>
        <li><strong>Continuity:</strong> Maintaining stability in the child's life</li>
      </ul>
      
      <h2>Custody Under Different Laws</h2>
      
      <h3>Hindu Law</h3>
      <p>Under the Hindu Minority and Guardianship Act, 1956, the father is the natural guardian, but courts prioritize the child's welfare above all.</p>
      
      <h3>Muslim Law</h3>
      <p>Muslim personal law provides for 'Hizanat' (custody), with mothers typically having custody of young children.</p>
      
      <h3>Christian and Parsi Law</h3>
      <p>The Guardians and Wards Act, 1890 applies, with courts having wide discretion to decide based on the child's best interests.</p>
      
      <h2>Visitation Rights</h2>
      <p>The non-custodial parent is entitled to visitation rights to maintain a relationship with the child. Courts can order:</p>
      <ul>
        <li>Regular scheduled visits</li>
        <li>Holiday and vacation time</li>
        <li>Phone and video call access</li>
        <li>Supervised visitation if necessary</li>
      </ul>
      
      <h2>Modifying Custody Orders</h2>
      <p>Custody orders can be modified if there's a significant change in circumstances affecting the child's welfare.</p>
      
      <h2>Our Family Law Services</h2>
      <p>We provide compassionate yet strong legal representation in custody matters:</p>
      <ul>
        <li>Custody petition filing and representation</li>
        <li>Mediation and settlement negotiations</li>
        <li>Modification of existing custody orders</li>
        <li>Enforcement of visitation rights</li>
        <li>International child custody cases</li>
      </ul>
      
      <blockquote>Child custody cases require sensitivity and expertise. We work to protect your parental rights while prioritizing your child's best interests.</blockquote>
    `,
    category: 'Family Law',
    tags: ['family law', 'child custody', 'parental rights', 'divorce', 'guardianship'],
    isPublished: true,
    publishedAt: new Date('2024-03-01'),
    views: 278,
    featuredImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
  },
  {
    title: 'Intellectual Property: Protecting Your Brand in the Digital Age',
    slug: 'protecting-brand-digital-age',
    excerpt: 'Essential strategies for protecting your intellectual property rights in an increasingly digital marketplace.',
    content: `
      <h2>The Importance of IP Protection</h2>
      <p>In today's digital economy, intellectual property (IP) is often a company's most valuable asset. Protecting your brand, innovations, and creative works is crucial for business success.</p>
      
      <h3>Types of Intellectual Property</h3>
      
      <h4>Trademarks</h4>
      <p>Trademarks protect your brand identity - logos, names, slogans, and distinctive features that identify your products or services.</p>
      
      <h4>Copyrights</h4>
      <p>Copyrights protect original creative works including software, content, designs, and artistic expressions.</p>
      
      <h4>Patents</h4>
      <p>Patents protect inventions and innovative processes, giving you exclusive rights to use and commercialize your innovation.</p>
      
      <h4>Trade Secrets</h4>
      <p>Confidential business information that provides competitive advantage, such as formulas, processes, or customer lists.</p>
      
      <h2>Digital Age Challenges</h2>
      
      <h3>Online Brand Infringement</h3>
      <p>The internet has made it easier for infringers to copy brands, sell counterfeit products, and misuse trademarks across multiple platforms.</p>
      
      <h3>Domain Name Disputes</h3>
      <p>Cybersquatting and domain name disputes are common issues requiring swift legal action to protect your online presence.</p>
      
      <h3>Social Media Impersonation</h3>
      <p>Fake accounts and brand impersonation on social media platforms can damage reputation and mislead customers.</p>
      
      <h3>Content Piracy</h3>
      <p>Digital content is easily copied and distributed, making copyright enforcement more challenging.</p>
      
      <h2>Protection Strategies</h2>
      
      <h3>1. Register Your IP Rights</h3>
      <ul>
        <li>File trademark applications for your brand elements</li>
        <li>Register copyrights for original works</li>
        <li>Apply for patents for innovations</li>
        <li>Document trade secrets with proper confidentiality measures</li>
      </ul>
      
      <h3>2. Monitor and Enforce</h3>
      <ul>
        <li>Implement brand monitoring systems</li>
        <li>Use online tools to detect infringement</li>
        <li>Send cease and desist notices promptly</li>
        <li>Take legal action when necessary</li>
      </ul>
      
      <h3>3. Secure Digital Assets</h3>
      <ul>
        <li>Register relevant domain names</li>
        <li>Verify social media accounts</li>
        <li>Use digital rights management (DRM) tools</li>
        <li>Implement watermarking and tracking</li>
      </ul>
      
      <h3>4. Employee and Contractor Agreements</h3>
      <ul>
        <li>Include IP assignment clauses</li>
        <li>Implement non-disclosure agreements</li>
        <li>Establish clear ownership policies</li>
        <li>Conduct IP awareness training</li>
      </ul>
      
      <h2>International Protection</h2>
      <p>If you operate globally, consider:</p>
      <ul>
        <li>Madrid Protocol for international trademark registration</li>
        <li>Patent Cooperation Treaty (PCT) for patent protection</li>
        <li>Country-specific registrations in key markets</li>
      </ul>
      
      <h2>Our IP Services</h2>
      <p>We provide comprehensive intellectual property services:</p>
      <ul>
        <li>IP portfolio development and management</li>
        <li>Trademark, copyright, and patent registration</li>
        <li>IP due diligence for transactions</li>
        <li>Infringement litigation and enforcement</li>
        <li>Licensing and technology transfer agreements</li>
        <li>Brand protection strategies</li>
      </ul>
      
      <blockquote>Your intellectual property is your competitive advantage. Protect it proactively before infringement occurs.</blockquote>
      
      <h2>Take Action Today</h2>
      <p>Don't wait until your IP is infringed. Contact our IP team for a comprehensive audit and protection strategy tailored to your business needs.</p>
    `,
    category: 'Intellectual Property',
    tags: ['intellectual property', 'trademark', 'copyright', 'patent', 'brand protection', 'digital'],
    isPublished: true,
    publishedAt: new Date('2024-02-25'),
    views: 198,
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  },
];

const testimonials = [
  {
    clientName: 'Rajesh Kumar',
    designation: 'CEO, TechVision Solutions',
    content: 'GAG Lawyers provided exceptional legal support during our company merger. Their expertise in corporate law and attention to detail ensured a smooth transaction. The team was always available to address our concerns and provided strategic advice that protected our interests throughout the process.',
    rating: 5,
    isFeatured: true,
    isPublished: true,
    order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    clientName: 'Priya Sharma',
    designation: 'Real Estate Developer',
    content: 'I was facing a complex property dispute that had been dragging on for years. The team at GAG Lawyers took charge immediately, developed a clear strategy, and resolved the matter within six months. Their knowledge of real estate law and negotiation skills are outstanding. Highly recommended!',
    rating: 5,
    isFeatured: true,
    isPublished: true,
    order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    clientName: 'Amit Patel',
    designation: 'Business Owner',
    content: 'When I needed legal representation for a criminal case, GAG Lawyers stood by me every step of the way. Their criminal defense team is not only highly knowledgeable but also compassionate and understanding. They fought tirelessly for my rights and achieved the best possible outcome. Forever grateful!',
    rating: 5,
    isFeatured: true,
    isPublished: true,
    order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Find or create admin user for blog posts
    let adminUser = await User.findOne({ email: 'admin@gaglawyers.com' });
    
    if (!adminUser) {
      console.log('Creating admin user for blog posts...');
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@gaglawyers.com',
        password: 'admin123', // This will be hashed by the model
        role: 'admin',
      });
      console.log('✓ Admin user created');
    }

    // Seed Blog Posts
    console.log('\n📝 Seeding Blog Posts...');
    
    for (const blogData of blogPosts) {
      const existingBlog = await BlogPost.findOne({ slug: blogData.slug });
      
      if (existingBlog) {
        console.log(`  ⊘ Blog "${blogData.title}" already exists, skipping...`);
      } else {
        await BlogPost.create({
          ...blogData,
          author: adminUser._id,
        });
        console.log(`  ✓ Created blog: "${blogData.title}"`);
      }
    }

    // Seed Testimonials
    console.log('\n💬 Seeding Testimonials...');
    
    for (const testimonialData of testimonials) {
      const existingTestimonial = await Review.findOne({ 
        clientName: testimonialData.clientName,
        content: testimonialData.content 
      });
      
      if (existingTestimonial) {
        console.log(`  ⊘ Testimonial from "${testimonialData.clientName}" already exists, skipping...`);
      } else {
        await Review.create(testimonialData);
        console.log(`  ✓ Created testimonial from: "${testimonialData.clientName}"`);
      }
    }

    // Summary
    const totalBlogs = await BlogPost.countDocuments();
    const totalTestimonials = await Review.countDocuments();
    const publishedBlogs = await BlogPost.countDocuments({ isPublished: true });
    const featuredTestimonials = await Review.countDocuments({ isFeatured: true });

    console.log('\n' + '='.repeat(60));
    console.log('✓ SEEDING COMPLETED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log(`📊 Database Summary:`);
    console.log(`   • Total Blog Posts: ${totalBlogs} (${publishedBlogs} published)`);
    console.log(`   • Total Testimonials: ${totalTestimonials} (${featuredTestimonials} featured)`);
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
