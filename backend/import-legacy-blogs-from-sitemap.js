#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');

const DEFAULT_INPUT = path.join(__dirname, 'legacy-sitemap.xml');

const parseArgs = (argv) => {
  const args = {
    dryRun: true,
    apply: false,
    input: DEFAULT_INPUT,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--apply') {
      args.apply = true;
      args.dryRun = false;
    } else if (token === '--dry-run') {
      args.apply = false;
      args.dryRun = true;
    } else if (token === '--input') {
      const next = argv[i + 1];
      if (!next) throw new Error('Missing value for --input');
      args.input = path.resolve(process.cwd(), next);
      i += 1;
    } else if (token === '--help' || token === '-h') {
      console.log('Usage:');
      console.log('  node import-legacy-blogs-from-sitemap.js --dry-run --input ./legacy-sitemap.xml');
      console.log('  node import-legacy-blogs-from-sitemap.js --apply --input ./legacy-sitemap.xml');
      console.log('  cat legacy-sitemap.xml | node import-legacy-blogs-from-sitemap.js --apply');
      process.exit(0);
    }
  }

  return args;
};

const readInputXml = (inputPath) => {
  if (!process.stdin.isTTY) {
    const stdin = fs.readFileSync(0, 'utf8');
    if (stdin.trim()) return stdin;
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input sitemap file not found: ${inputPath}`);
  }
  return fs.readFileSync(inputPath, 'utf8');
};

const extractLocValues = (xml) => {
  const locRegex = /<loc>([\s\S]*?)<\/loc>/gi;
  const values = [];
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const raw = String(match[1] || '').trim();
    if (raw) values.push(raw);
  }
  return values;
};

const slugFromLoc = (loc) => {
  try {
    const url = new URL(loc);
    const pathname = decodeURIComponent(url.pathname || '');
    const marker = '/blogs/';
    const idx = pathname.toLowerCase().indexOf(marker);
    if (idx === -1) return '';
    let slug = pathname.slice(idx + marker.length);
    slug = slug.replace(/^\/+|\/+$/g, '').trim();
    slug = slug.replace(/[.,:;!?]+$/g, '');
    slug = slug.replace(/\s+/g, '-');
    return slug.toLowerCase();
  } catch {
    return '';
  }
};

const titleFromSlug = (slug) =>
  String(slug)
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const buildExcerpt = (title) =>
  `${title}: key legal insights, practical considerations, and guidance for informed decision-making.`;

const buildContent = (title) => `
  <h2>${title}</h2>
  <p>This article is part of our legacy content import from the previous website sitemap.</p>
  <p>Our legal team shares practical guidance, process clarity, and strategic considerations for this topic.</p>
  <h3>How This Helps</h3>
  <p>Understanding the legal framework, documentation requirements, and likely timelines helps in better case preparation.</p>
  <h3>Need Legal Guidance?</h3>
  <p>Contact GAG Lawyers for tailored advice based on your specific facts and jurisdiction.</p>
`;

const tagsFromSlug = (slug) =>
  String(slug)
    .split('-')
    .filter(Boolean)
    .slice(0, 6);

const ensureAdminAuthor = async () => {
  let admin = await User.findOne({ email: 'admin@gaglawyers.com' });
  if (!admin) {
    admin = await User.create({
      name: 'Admin User',
      email: 'admin@gaglawyers.com',
      password: 'admin123',
      role: 'admin',
    });
  }
  return admin;
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  const xml = readInputXml(args.input);
  const locs = extractLocValues(xml);

  const totalLocs = locs.length;
  const allSlugs = locs.map(slugFromLoc).filter(Boolean);
  const uniqueSlugs = Array.from(new Set(allSlugs));
  const duplicateInInput = allSlugs.length - uniqueSlugs.length;
  const invalidLocs = totalLocs - allSlugs.length;

  await connectDB();

  const existing = await BlogPost.find({ slug: { $in: uniqueSlugs } }).select('slug').lean();
  const existingSet = new Set(existing.map((b) => b.slug));
  const missingSlugs = uniqueSlugs.filter((slug) => !existingSet.has(slug));

  let created = 0;
  if (args.apply && missingSlugs.length > 0) {
    const admin = await ensureAdminAuthor();
    const docs = missingSlugs.map((slug) => {
      const title = titleFromSlug(slug);
      const excerpt = buildExcerpt(title);
      return {
        title,
        slug,
        excerpt,
        content: buildContent(title),
        author: admin._id,
        category: 'legal-news',
        tags: tagsFromSlug(slug),
        seo: {
          title: `${title} | GAG Lawyers`,
          description: excerpt,
          keywords: tagsFromSlug(slug).join(', '),
        },
        isPublished: true,
        publishedAt: new Date(),
      };
    });

    if (docs.length > 0) {
      const result = await BlogPost.insertMany(docs, { ordered: false });
      created = result.length;
    }
  } else if (args.dryRun) {
    created = missingSlugs.length;
  }

  console.log('\n=== Legacy Blog Sitemap Import ===');
  console.log(`mode: ${args.dryRun ? 'DRY_RUN' : 'APPLY'}`);
  console.log(`total <loc> entries read: ${totalLocs}`);
  console.log(`invalid/non-blog loc entries skipped: ${invalidLocs}`);
  console.log(`unique blog slugs parsed: ${uniqueSlugs.length}`);
  console.log(`duplicates inside sitemap input: ${duplicateInInput}`);
  console.log(`already existing blog slugs: ${existingSet.size}`);
  console.log(`blogs ${args.dryRun ? 'to create' : 'created'}: ${created}`);

  if (missingSlugs.length > 0) {
    console.log('\nSample slugs to import:');
    missingSlugs.slice(0, 20).forEach((slug) => console.log(`- ${slug}`));
    if (missingSlugs.length > 20) {
      console.log(`...and ${missingSlugs.length - 20} more`);
    }
  }

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error('\nImport failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});

