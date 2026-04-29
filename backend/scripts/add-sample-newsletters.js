require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const { generateSlug } = require('../utils/slugify');

const SAMPLE_NEWSLETTERS = [
  {
    title: 'Legal Brief: Key Compliance Deadlines for Indian Businesses (Q2 2026)',
    excerpt:
      'A concise monthly digest of important statutory filings, labor compliance checkpoints, and practical risk alerts for management teams.',
    content: `
<p>Welcome to this month’s legal brief from GAG Lawyers.</p>
<p><strong>What to watch this month:</strong></p>
<ul>
  <li>Corporate secretarial filing timelines and board documentation hygiene.</li>
  <li>Employment policy housekeeping, including leave and termination process notes.</li>
  <li>Contract renewal review for limitation of liability and dispute clauses.</li>
</ul>
<p>For organizations scaling quickly, small procedural gaps become expensive disputes later. A quarterly legal housekeeping cycle can materially reduce that risk.</p>
    `.trim(),
    category: 'newsletter',
    tags: ['newsletter', 'compliance', 'corporate'],
  },
  {
    title: 'Litigation Update: Documentation Practices That Improve Court Readiness',
    excerpt:
      'This issue covers practical evidence and document-management habits that strengthen litigation strategy before a dispute escalates.',
    content: `
<p>Litigation outcomes often depend on preparation quality rather than last-minute drafting.</p>
<p><strong>Recommended internal practices:</strong></p>
<ol>
  <li>Preserve original contract trails and signed annexures in one indexed repository.</li>
  <li>Maintain communication timelines with date-wise summaries.</li>
  <li>Capture payment and performance records contemporaneously.</li>
</ol>
<p>When records are structured early, response time improves and legal costs are better controlled.</p>
    `.trim(),
    category: 'newsletter',
    tags: ['newsletter', 'litigation', 'documentation'],
  },
  {
    title: 'Employment Law Notes: HR Risk Signals and Policy Refresh Checklist',
    excerpt:
      'A practical HR-oriented legal note covering onboarding controls, disciplinary process consistency, and termination documentation.',
    content: `
<p>Employment disputes frequently arise from inconsistent internal process execution.</p>
<p><strong>This month’s checklist:</strong></p>
<ul>
  <li>Offer letter and appointment terms consistency review.</li>
  <li>Role clarity, reporting-line communication, and KPI documentation.</li>
  <li>Disciplinary escalation matrix and written notice format standardization.</li>
</ul>
<p>Clear procedure and communication significantly reduce avoidable employment claims.</p>
    `.trim(),
    category: 'newsletter',
    tags: ['newsletter', 'employment', 'hr'],
  },
  {
    title: 'Property & Agreements Bulletin: Drafting Clauses Clients Commonly Miss',
    excerpt:
      'A quick bulletin on high-impact contract and property clauses that are frequently overlooked in negotiations and documentation.',
    content: `
<p>Many preventable disputes come from gaps in drafting detail.</p>
<p><strong>Commonly missed clauses:</strong></p>
<ul>
  <li>Specific performance milestones and measurable acceptance criteria.</li>
  <li>Well-defined default cure periods and remedy sequencing.</li>
  <li>Jurisdiction, arbitration seat, and notice mechanism clarity.</li>
</ul>
<p>Even a short legal review before execution can avoid prolonged commercial friction.</p>
    `.trim(),
    category: 'newsletter',
    tags: ['newsletter', 'contracts', 'property'],
  },
  {
    title: 'GAG Monthly Legal Digest: Regulatory, Courts, and Practice Insights',
    excerpt:
      'A consolidated monthly digest summarizing relevant legal trends, practical advisory notes, and readiness actions for businesses and individuals.',
    content: `
<p>Thank you for reading the GAG Monthly Legal Digest.</p>
<p><strong>Highlights in this edition:</strong></p>
<ul>
  <li>Regulatory watchpoints that may affect operating businesses.</li>
  <li>Litigation management tips for response speed and evidence control.</li>
  <li>Contract and governance checks for ongoing risk reduction.</li>
</ul>
<p>If your team needs a tailored legal checklist for the next quarter, our office can help structure one based on your business profile.</p>
    `.trim(),
    category: 'newsletter',
    tags: ['newsletter', 'legal-updates', 'advisory'],
  },
];

async function resolveAuthor() {
  const fromEnv = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (fromEnv) {
    const byEmail = await User.findOne({ email: fromEnv, isActive: true }).select('_id');
    if (byEmail) return byEmail._id;
  }
  const fallback = await User.findOne({ isActive: true })
    .sort({ role: 1, createdAt: 1 })
    .select('_id');
  return fallback?._id || null;
}

async function run() {
  await connectDB();

  const authorId = await resolveAuthor();
  if (!authorId) {
    throw new Error('No active author found. Please create an admin/editor user first.');
  }

  let created = 0;
  let skipped = 0;

  for (const item of SAMPLE_NEWSLETTERS) {
    const slug = generateSlug(item.title);
    const exists = await BlogPost.findOne({ slug }).select('_id').lean();
    if (exists) {
      skipped += 1;
      continue;
    }

    await BlogPost.create({
      ...item,
      slug,
      author: authorId,
      contentType: 'newsletter',
      isPublished: true,
      publishedAt: new Date(),
      seo: {
        title: item.title,
        description: item.excerpt,
        keywords: (item.tags || []).join(', '),
      },
    });
    created += 1;
  }

  console.log('\n=== Sample Newsletter Seed ===');
  console.log(`Created: ${created}`);
  console.log(`Skipped (already exists): ${skipped}`);

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nSample newsletter seed failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});

