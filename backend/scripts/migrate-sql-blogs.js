/**
 * Migrate SQL blog articles to MongoDB
 * - Reads 319 articles from gagl_gaglawyer.sql
 * - Deduplicates against existing MongoDB articles (by slug + title)
 * - Copies article images to frontend/public/blog-images/
 * - Inserts new articles as published
 *
 * Run from project root: node backend/scripts/migrate-sql-blogs.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const fs = require('fs');
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

// ─── Paths ────────────────────────────────────────────────────────────────────
const SQL_FILE   = path.join(__dirname, '../../gagl_gaglawyer.sql');
const IMG_SRC    = path.join(__dirname, '../../new_article_img');
const IMG_DEST   = path.join(__dirname, '../../frontend/public/blog-images');

// ─── SQL Row Parser ───────────────────────────────────────────────────────────
// Handles: integers, single-quoted strings with \' escapes, NULL, empty strings
function parseSQLRow(rawLine) {
  let line = rawLine.trim();
  if (line.startsWith('('))  line = line.slice(1);
  if (line.endsWith(');'))   line = line.slice(0, -2);
  else if (line.endsWith('),')) line = line.slice(0, -2);
  else if (line.endsWith(')'))  line = line.slice(0, -1);

  const fields = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // skip whitespace
    while (i < len && (line[i] === ' ' || line[i] === '\t')) i++;
    if (i >= len) break;

    if (line[i] === "'") {
      // quoted string
      i++;
      let val = '';
      while (i < len) {
        const ch = line[i];
        if (ch === '\\' && i + 1 < len) {
          const nx = line[i + 1];
          if (nx === "'")  { val += "'";  i += 2; }
          else if (nx === 'n')  { val += '\n'; i += 2; }
          else if (nx === 'r')  { val += '\r'; i += 2; }
          else if (nx === '\\') { val += '\\'; i += 2; }
          else                  { val += ch;   i++; }
        } else if (ch === "'") {
          i++; // closing quote
          break;
        } else {
          val += ch;
          i++;
        }
      }
      fields.push(val);
    } else if (line.slice(i, i + 4) === 'NULL') {
      fields.push(null);
      i += 4;
    } else {
      // numeric or bare token
      let val = '';
      while (i < len && line[i] !== ',') { val += line[i]; i++; }
      fields.push(val.trim());
    }

    // consume separator comma
    while (i < len && (line[i] === ' ' || line[i] === '\t')) i++;
    if (i < len && line[i] === ',') i++;
  }

  return fields;
}

// Columns: id(0) title(1) date(2) type(3) image(4) des(5) status(6) url(7) meta(8)
function parseSQLFile(sqlPath) {
  const content = fs.readFileSync(sqlPath, 'latin1');
  const blogsStart = content.indexOf('-- Table structure for table `blogs`');
  const blogsEnd   = content.indexOf('-- Table structure for table `career`');
  const section    = content.slice(blogsStart, blogsEnd);

  const rows = [];
  for (const line of section.split('\n')) {
    if (/^\(\d+,/.test(line.trim())) {
      const f = parseSQLRow(line);
      if (f.length >= 8) {
        rows.push({
          id:      parseInt(f[0], 10),
          title:   f[1] || '',
          date:    f[2] || '',
          type:    f[3] || '',
          image:   f[4] || '',
          content: f[5] || '',
          status:  f[6] || '',
          url:     f[7] || '',
          meta:    f[8] || '',
        });
      }
    }
  }
  return rows;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapCategory(type) {
  const t = (type || '').toUpperCase().trim();
  if (t.includes('CRIMINAL'))                        return 'Criminal Law';
  if (t.includes('FAMILY'))                          return 'Family Law';
  if (t.includes('CORPORATE') || t.includes('BUSINESS')) return 'Corporate Law';
  if (t.includes('PROPERTY') || t.includes('REAL ESTATE')) return 'Real Estate';
  if (t.includes('IP') || t.includes('INTELLECTUAL') || t.includes('COPYRIGHT')) return 'Intellectual Property';
  if (t.includes('TAX'))                             return 'Tax Law';
  if (t.includes('EMPLOYMENT') || t.includes('LABOUR')) return 'Employment Law';
  return 'Legal News';
}

function parseDate(str) {
  if (!str) return new Date();
  const d = new Date(str);
  return isNaN(d.getTime()) ? new Date() : d;
}

function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildExcerpt(html) {
  const text = stripHtml(html);
  return text.length <= 200 ? text : text.slice(0, 197) + '...';
}

function extractSeo(metaHtml, title) {
  const seoTitle = (() => {
    const m = metaHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
    return m ? m[1].trim() : title;
  })();
  const seoDesc = (() => {
    let m = metaHtml.match(/name=["']description["'][^>]*content=["']([^"']{10,})["']/i);
    if (!m) m = metaHtml.match(/content=["']([^"']{10,})["'][^>]*name=["']description["']/i);
    if (!m) m = metaHtml.match(/<meta\s+description=["']([^"']{10,})["']/i);
    return m ? m[1].trim() : '';
  })();
  return { title: seoTitle, description: seoDesc };
}

function buildSlug(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildTags(title, type) {
  const stops = new Set(['with','from','that','this','have','will','your','their','about','when','what','how','for','and','the','in','of','to','a','an','is','are','be','by','on','at','its','vs','india','indian']);
  const tags = [];
  if (type) tags.push(type.toLowerCase().replace(/\s+/g,'-'));
  (title || '').split(/\s+/)
    .filter(w => w.length >= 4 && !stops.has(w.toLowerCase()))
    .slice(0, 5)
    .forEach(w => tags.push(w.toLowerCase()));
  return [...new Set(tags)].slice(0, 8);
}

// ─── Image Copy ───────────────────────────────────────────────────────────────

function copyImages(rows) {
  if (!fs.existsSync(IMG_DEST)) {
    fs.mkdirSync(IMG_DEST, { recursive: true });
    console.log(`  Created: ${IMG_DEST}`);
  }

  let copied = 0, already = 0, missing = 0;
  for (const row of rows) {
    if (!row.image) continue;
    const src  = path.join(IMG_SRC,  row.image);
    const dest = path.join(IMG_DEST, row.image);
    if (fs.existsSync(dest))      { already++; continue; }
    if (fs.existsSync(src))       { fs.copyFileSync(src, dest); copied++; }
    else                          { missing++; }
  }
  console.log(`  Images: ${copied} copied, ${already} already present, ${missing} not found in source`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  GAG Lawyers — SQL Blog Migration');
  console.log('═══════════════════════════════════════════════════\n');

  // 1. Parse SQL
  console.log('Step 1: Parsing SQL file...');
  const sqlRows = parseSQLFile(SQL_FILE);
  console.log(`  Found ${sqlRows.length} blog rows in SQL dump`);

  // 2. Copy images
  console.log('\nStep 2: Copying article images to frontend/public/blog-images...');
  copyImages(sqlRows);

  // 3. Connect DB
  console.log('\nStep 3: Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('  Connected');

  // 4. Admin user
  console.log('\nStep 4: Resolving author...');
  let author = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@gaglawyers.com' });
  if (!author) author = await User.findOne({ role: { $in: ['super-admin', 'admin'] } });
  if (!author) {
    author = await User.create({
      name: 'GAG Lawyers',
      email: 'admin@gaglawyers.com',
      password: 'ChangeMe@123',
      role: 'super-admin',
      isActive: true,
    });
    console.log('  Created default admin user');
  } else {
    console.log(`  Author: ${author.name} (${author.email})`);
  }

  // 5. Existing articles
  console.log('\nStep 5: Loading existing articles for deduplication...');
  const existing = await BlogPost.find({}, 'slug title').lean();
  const knownSlugs  = new Set(existing.map(d => d.slug));
  const knownTitles = new Set(existing.map(d => d.title.toLowerCase().trim()));
  console.log(`  Existing articles in DB: ${existing.length}`);

  // 6. Build insert list
  console.log('\nStep 6: Deduplicating...');
  const toInsert = [];
  const dupes    = [];

  for (const row of sqlRows) {
    const slug       = buildSlug(row.url) || buildSlug(row.title);
    const titleNorm  = (row.title || '').toLowerCase().trim();

    if (!row.title || !row.content || row.content.replace(/<[^>]*>/g,'').trim().length < 20) {
      dupes.push(`${row.title} [empty content]`);
      continue;
    }

    if (knownSlugs.has(slug) || knownTitles.has(titleNorm)) {
      dupes.push(row.title);
      continue;
    }

    const seo = extractSeo(row.meta || '', row.title);

    toInsert.push({
      title:                row.title.trim(),
      slug,
      excerpt:              buildExcerpt(row.content),
      content:              row.content,
      externalUrl:          '',
      featuredImage:        row.image ? `/blog-images/${row.image}` : '',
      featuredImagePublicId:'',
      author:               author._id,
      contentType:          'article',
      category:             mapCategory(row.type),
      tags:                 buildTags(row.title, row.type),
      seo: {
        title:       seo.title  || row.title,
        description: seo.description || buildExcerpt(row.content).slice(0, 160),
        keywords:    '',
      },
      isPublished:  row.status === 'Active',
      publishedAt:  row.status === 'Active' ? parseDate(row.date) : undefined,
      views:        0,
    });

    // Track for intra-batch dedup
    knownSlugs.add(slug);
    knownTitles.add(titleNorm);
  }

  console.log(`  New to insert:    ${toInsert.length}`);
  console.log(`  Skipped (dupes):  ${dupes.length}`);

  // 7. Insert in batches of 50
  console.log('\nStep 7: Inserting articles...');
  const BATCH = 50;
  let inserted = 0, failed = 0;

  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH);
    try {
      const res = await BlogPost.insertMany(batch, { ordered: false });
      inserted += res.length;
    } catch (err) {
      if (err.insertedDocs) inserted += err.insertedDocs.length;
      if (err.writeErrors)  {
        failed += err.writeErrors.length;
        err.writeErrors
          .filter(e => e.code !== 11000)
          .forEach(e => console.log(`  Write error: ${e.errmsg}`));
      } else if (err.code !== 11000) {
        console.error('  Batch error:', err.message);
      }
    }
    process.stdout.write(`  Progress: ${Math.min(i + BATCH, toInsert.length)}/${toInsert.length}\r`);
  }

  // 8. Final report
  const finalCount = await BlogPost.countDocuments();

  console.log(`\n\n═══════════════════════════════════════════════════`);
  console.log(`  Migration Complete!`);
  console.log(`  ─────────────────────────────────────────────────`);
  console.log(`  SQL rows parsed:    ${sqlRows.length}`);
  console.log(`  Inserted:           ${inserted}`);
  console.log(`  Skipped (dupes):    ${dupes.length}`);
  console.log(`  Failed (errors):    ${failed}`);
  console.log(`  Total in DB now:    ${finalCount}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  if (dupes.length > 0) {
    console.log('Skipped duplicates:');
    dupes.forEach(t => console.log(`  - ${t}`));
  }

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});
