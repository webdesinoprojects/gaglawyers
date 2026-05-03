require('dotenv').config();
const connectDB = require('./config/db');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');
const { generateSlug, generateUniqueSlug } = require('./utils/slugify');

const RAW_ARTICLES = [
  ['Child Custody Disputes', '07-Nov-2023', 'Child custody disputes are a few of the most emotionally charged and complex felony battles, often bobbing up in the legal system.'],
  ['Criminal Forgery', '07-Nov-2023', 'In a world pushed by technology and intricate financial transactions, the prevalence of criminal forgery has increased.'],
  ['Juvenile Criminal Justice', '07-Nov-2023', 'The juvenile criminal justice system plays an important role in shaping the lives of young individuals.'],
  ['Criminal Appeals', '07-Nov-2023', 'The criminal justice system plays a vital role in upholding the rule of law and fairness.'],
  ['Criminal Extradition', '07-Nov-2023', 'In today’s interconnected world, crime knows no borders, and extradition matters are increasingly complex.'],
  ['Criminal Defamation Laws', '07-Nov-2023', 'Criminal defamation laws continue to impact speech, reputation, and legal accountability in India.'],
  ['Child Custody Battles', '06-Nov-2023', 'Child custody battles can be emotionally tough and legally complex, especially in the Indian legal system.'],
  ['Criminal Negligence Laws', '06-Nov-2023', 'Criminal negligence is a legal concept that holds individuals accountable for reckless conduct.'],
  ['Child Custody Agreements', '06-Nov-2023', 'Child custody arrangements are among the most sensitive issues in family disputes.'],
  ['Child Adoption', '06-Nov-2023', 'Child adoption is a noble and heartwarming process that creates families and secures futures.'],
  ['Child Adoption Laws', '06-Nov-2023', 'Adoption laws in India guide families and children through a deeply important legal journey.'],
  ['Child Abduction Laws', '06-Nov-2023', 'Child abduction is a harrowing crime that devastates families and communities.'],
  ['Child Abduction Across Borders', '06-Nov-2023', 'Child abduction across international borders can have severe emotional and legal consequences.'],
  ['Criminal Rehabilitation', '06-Nov-2023', 'Criminal rehabilitation remains central to balancing justice, reform, and public safety.'],
  ['Criminal Conspiracy Laws', '06-Nov-2023', 'Conspiracy laws are a critical aspect of criminal jurisprudence and prosecution strategy.'],
  ['Business Dispute Resolution', '04-Nov-2023', 'Disputes are an inevitable part of business; effective resolution protects continuity and value.'],
  ['Business Contract Disputes', '04-Nov-2023', 'Contracts are the backbone of business, and disputes can significantly affect operations and growth.'],
  ['Criminal Sentencing', '04-Nov-2023', 'Criminal sentencing is a complex and vital part of the justice process in India.'],
  ['Builder-Buyer Disputes', '04-Nov-2023', 'Builder-buyer disputes continue to affect homebuyers amid rapid real estate growth.'],
  ['Bankruptcy Laws', '04-Nov-2023', 'Bankruptcy laws provide legal pathways for debt resolution and financial recovery.'],
  ['Art and Cultural Heritage Repatriation', '04-Nov-2023', 'Art and cultural heritage repatriation raises important legal, diplomatic, and ethical questions.'],
  ['Arbitration and Dispute Resolution', '04-Nov-2023', 'Arbitration and ADR are increasingly preferred for commercial dispute resolution in India.'],
  ['Annulment vs Divorce', '04-Nov-2023', 'Annulment and divorce are distinct legal remedies for dissolution of marriage in India.'],
  ['Alternative Energy Project', '04-Nov-2023', 'Alternative energy projects involve evolving regulatory, compliance, and commercial frameworks.'],
  ['Alimony and Spousal Support', '03-Nov-2023', 'Alimony and spousal support are often significant legal and financial aspects of divorce proceedings.'],
  ['Adverse Possession Laws in India', '03-Nov-2023', 'Adverse possession laws in India shape disputes around long-term occupation and ownership rights.'],
  ['Adoption vs Surrogacy', '03-Nov-2023', 'Adoption and surrogacy are distinct paths to parenthood with important legal implications.'],
  ['Adoption Laws in India', '03-Nov-2023', 'Adoption laws in India support family building while protecting the rights of children.'],
  ['Legal Support for Child Protection Agencies', '03-Nov-2023', 'Legal support for child protection agencies is essential to advancing child welfare and safety.'],
  ['Criminal Plea Bargaining', '03-Nov-2023', 'Plea bargaining plays a strategic role in the administration of criminal justice.'],
  ['Adoption for Expats in India: Navigating', '03-Nov-2023', 'Adoption for expatriates in India requires careful legal navigation and procedural compliance.'],
  ['Adoption by LGBTQ + Couples', '03-Nov-2023', 'Adoption by LGBTQ+ couples is a growing legal and social conversation in India.'],
  ['Estate Disputes Resolution', '02-Nov-2023', 'Estate disputes can create prolonged family conflicts and require structured legal resolution.'],
  ['Environmental Impact Assessment', '02-Nov-2023', 'Environmental Impact Assessment is critical for balancing development with ecological safeguards.'],
  ['Adopting a Child with Special Needs', '02-Nov-2023', 'Adopting a child with special needs is a deeply meaningful path requiring legal preparedness and support.'],
  ['Economic Offenses', '31-Aug-2023', 'Economic offenses involve fraud, misappropriation, and financial misconduct requiring specialist defense.'],
  ['Asset Seizure and Forfeiture', '31-Aug-2023', 'Asset seizure and forfeiture proceedings raise serious questions of property rights and due process.'],
  ['Witness Protection Laws', '13-Sep-2021', 'Witness protection laws are crucial for ensuring testimony integrity and safeguarding justice delivery.'],
];

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

const parseDate = (dateStr) => {
  const [dayRaw, monRaw, yearRaw] = String(dateStr).split('-');
  const day = Number(dayRaw);
  const year = Number(yearRaw);
  const month = MONTHS[monRaw];
  if (!Number.isFinite(day) || !Number.isFinite(year) || month === undefined) return new Date();
  return new Date(Date.UTC(year, month, day, 9, 0, 0));
};

const pickCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('criminal') || t.includes('extradition') || t.includes('forgery') || t.includes('witness')) return 'Criminal Law';
  if (t.includes('child') || t.includes('adoption') || t.includes('custody') || t.includes('alimony') || t.includes('annulment') || t.includes('divorce')) return 'Family Law';
  if (t.includes('business') || t.includes('contract') || t.includes('arbitration') || t.includes('bankruptcy')) return 'Corporate Law';
  if (t.includes('builder') || t.includes('possession') || t.includes('estate')) return 'Real Estate';
  if (t.includes('environment') || t.includes('energy')) return 'Environmental Law';
  return 'Legal News';
};

const buildTags = (title) =>
  Array.from(new Set(
    title
      .toLowerCase()
      .replace(/[+:]/g, ' ')
      .split(/[^a-z0-9]+/)
      .filter((part) => part.length > 2)
      .slice(0, 6)
  ));

const main = async () => {
  try {
    console.log('\nImporting Resource Center articles...\n');
    await connectDB();

    const author =
      (await User.findOne({ role: 'super-admin', isActive: true }).select('_id')) ||
      (await User.findOne({ isActive: true }).select('_id'));

    if (!author) {
      throw new Error('No active user found. Create an admin user first.');
    }

    const deduped = new Map();
    for (const [title, dateStr, excerpt] of RAW_ARTICLES) {
      if (!deduped.has(title)) deduped.set(title, { title, dateStr, excerpt });
    }

    let created = 0;
    let updated = 0;

    for (const article of deduped.values()) {
      const baseSlug = generateSlug(article.title);
      const publishedAt = parseDate(article.dateStr);
      const category = pickCategory(article.title);
      const tags = buildTags(article.title);
      const content = [
        `<h2>${article.title}</h2>`,
        `<p>${article.excerpt}</p>`,
        '<h3>Why This Topic Matters</h3>',
        '<p>Understanding legal rights, procedures, and timelines early helps avoid avoidable disputes and compliance risks.</p>',
        '<h3>Key Considerations</h3>',
        '<ul><li>Applicable legal framework and forum.</li><li>Required records and supporting evidence.</li><li>Risk assessment and practical strategy.</li></ul>',
        '<h3>Need Legal Guidance?</h3>',
        '<p>Our team can help evaluate your facts and suggest the right legal approach.</p>',
      ].join('');

      let post = await BlogPost.findOne({ title: article.title });
      if (!post) {
        post = await BlogPost.findOne({ slug: baseSlug });
      }

      if (!post) {
        const slug = await generateUniqueSlug(BlogPost, baseSlug);
        await BlogPost.create({
          title: article.title,
          slug,
          contentType: 'article',
          excerpt: article.excerpt,
          content,
          externalUrl: '',
          author: author._id,
          category,
          tags,
          isPublished: true,
          publishedAt,
          seo: {
            title: `${article.title} | Grover & Grover Advocates`,
            description: article.excerpt.slice(0, 160),
            keywords: tags.join(', '),
          },
        });
        created += 1;
        console.log(`Created: ${article.title}`);
      } else {
        post.excerpt = article.excerpt;
        post.contentType = 'article';
        post.content = content;
        post.externalUrl = '';
        post.category = post.category || category;
        post.tags = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : tags;
        post.isPublished = true;
        post.publishedAt = post.publishedAt || publishedAt;
        post.seo = {
          title: post.seo?.title || `${article.title} | Grover & Grover Advocates`,
          description: post.seo?.description || article.excerpt.slice(0, 160),
          keywords: post.seo?.keywords || tags.join(', '),
        };
        await post.save();
        updated += 1;
        console.log(`Updated: ${article.title}`);
      }
    }

    console.log(`\nDone. Created: ${created}, Updated: ${updated}, Total processed: ${deduped.size}\n`);
    process.exit(0);
  } catch (error) {
    console.error('\nFailed to import Resource Center articles:', error);
    process.exit(1);
  }
};

main();
