/**
 * Pass 2: Insert SQL articles whose slug already exists in DB
 * but whose content is DIFFERENT from the stored version.
 * These get a -v2 / -v3 slug suffix so they coexist without conflict.
 *
 * Run: node backend/scripts/migrate-sql-blogs-pass2.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const fs   = require('fs');
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
const User     = require('../models/User');

// ─── SQL Parser (same as pass 1) ──────────────────────────────────────────────
function parseSQLRow(rawLine) {
  let line = rawLine.trim();
  if (line.startsWith('('))    line = line.slice(1);
  if (line.endsWith(');'))     line = line.slice(0, -2);
  else if (line.endsWith('),')) line = line.slice(0, -2);
  else if (line.endsWith(')')) line = line.slice(0, -1);

  const fields = [];
  let i = 0;
  const len = line.length;
  while (i < len) {
    while (i < len && (line[i] === ' ' || line[i] === '\t')) i++;
    if (i >= len) break;
    if (line[i] === "'") {
      i++;
      let val = '';
      while (i < len) {
        if (line[i] === '\\' && i + 1 < len) {
          const nx = line[i + 1];
          if (nx === "'")  { val += "'";  i += 2; }
          else if (nx === 'n') { val += '\n'; i += 2; }
          else if (nx === 'r') { val += '\r'; i += 2; }
          else if (nx === '\\') { val += '\\'; i += 2; }
          else { val += line[i]; i++; }
        } else if (line[i] === "'") {
          i++; break;
        } else { val += line[i]; i++; }
      }
      fields.push(val);
    } else if (line.slice(i, i + 4) === 'NULL') {
      fields.push(null); i += 4;
    } else {
      let val = '';
      while (i < len && line[i] !== ',') { val += line[i]; i++; }
      fields.push(val.trim());
    }
    while (i < len && (line[i] === ' ' || line[i] === '\t')) i++;
    if (i < len && line[i] === ',') i++;
  }
  return fields;
}

function parseSQLFile(sqlPath) {
  const content = fs.readFileSync(sqlPath, 'latin1');
  const s = content.indexOf('-- Table structure for table `blogs`');
  const e = content.indexOf('-- Table structure for table `career`');
  const section = content.slice(s, e);
  const rows = [];
  for (const line of section.split('\n')) {
    if (/^\(\d+,/.test(line.trim())) {
      const f = parseSQLRow(line);
      if (f.length >= 8) rows.push({
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
  return rows;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildSlug(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
function stripHtml(h) {
  return (h || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function mapCategory(type) {
  const t = (type || '').toUpperCase().trim();
  if (t.includes('CRIMINAL'))     return 'Criminal Law';
  if (t.includes('FAMILY'))       return 'Family Law';
  if (t.includes('CORPORATE') || t.includes('BUSINESS')) return 'Corporate Law';
  if (t.includes('PROPERTY') || t.includes('REAL ESTATE')) return 'Real Estate';
  if (t.includes('IP') || t.includes('INTELLECTUAL') || t.includes('COPYRIGHT')) return 'Intellectual Property';
  if (t.includes('TAX'))          return 'Tax Law';
  if (t.includes('EMPLOYMENT') || t.includes('LABOUR')) return 'Employment Law';
  return 'Legal News';
}
function parseDate(str) {
  const d = new Date(str);
  return isNaN(d.getTime()) ? new Date() : d;
}
function buildExcerpt(html) {
  const text = stripHtml(html);
  return text.length <= 200 ? text : text.slice(0, 197) + '...';
}
function extractSeo(metaHtml, title) {
  const st = (metaHtml.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || title;
  let m = metaHtml.match(/name=["']description["'][^>]*content=["']([^"']{10,})["']/i)
       || metaHtml.match(/content=["']([^"']{10,})["'][^>]*name=["']description["']/i)
       || metaHtml.match(/<meta\s+description=["']([^"']{10,})["']/i);
  return { title: st.trim(), description: m ? m[1].trim() : '' };
}
function buildTags(title, type) {
  const stops = new Set(['with','from','that','this','have','will','your','their','about','when','what','how','for','and','the','in','of','to','a','an','is','are','be','by','on','at','its','vs','india','indian']);
  const tags = [];
  if (type) tags.push(type.toLowerCase().replace(/\s+/g,'-'));
  (title || '').split(/\s+/).filter(w => w.length >= 4 && !stops.has(w.toLowerCase())).slice(0,5).forEach(w => tags.push(w.toLowerCase()));
  return [...new Set(tags)].slice(0, 8);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  SQL Blog Migration — Pass 2 (diff-content extras)');
  console.log('═══════════════════════════════════════════════════\n');

  // 1. Parse all SQL rows
  const SQL_FILE = path.join(__dirname, '../../gagl_gaglawyer.sql');
  const sqlRows = parseSQLFile(SQL_FILE);
  console.log(`Step 1: Parsed ${sqlRows.length} SQL rows`);

  // 2. Connect
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Step 2: Connected to MongoDB');

  // 3. Admin user
  let author = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@gaglawyers.com' });
  if (!author) author = await User.findOne({ role: { $in: ['super-admin', 'admin'] } });
  console.log(`Step 3: Author = ${author.name}`);

  // 4. Load all existing articles (slug → content fingerprint)
  const existing = await BlogPost.find({}, 'slug title content').lean();
  // Map slug → first 300 chars of stripped content for comparison
  const dbBySlug = {};
  for (const doc of existing) {
    dbBySlug[doc.slug] = stripHtml(doc.content).slice(0, 300);
  }
  const dbSlugs = new Set(existing.map(d => d.slug));
  console.log(`Step 4: ${existing.length} articles in DB`);

  // 5. Group SQL rows by base slug
  const bySlug = {};
  for (const row of sqlRows) {
    const slug = buildSlug(row.url) || buildSlug(row.title);
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push(row);
  }

  // 6. Find extras with different content than what's in DB
  const toInsert = [];
  const alreadyMatchedSlugs = new Set(); // track which DB entries we've "consumed"

  for (const [baseSlug, group] of Object.entries(bySlug)) {
    if (group.length <= 1) continue; // no extras

    // For each occurrence after the first, check if content differs from DB version
    // and find a free slug for it
    let versionCounter = 2;

    for (let idx = 0; idx < group.length; idx++) {
      const row = group[idx];
      const rowText = stripHtml(row.content).slice(0, 300);

      // Is this row's content already in DB (either at baseSlug or at a -v* slug)?
      let alreadyStored = false;

      // Check if the base slug in DB has this content
      if (dbBySlug[baseSlug] && similarity(dbBySlug[baseSlug], rowText) > 0.85) {
        alreadyStored = true;
      }

      // Check all -v* variants in DB
      if (!alreadyStored) {
        for (let v = 2; v <= 5; v++) {
          const vs = `${baseSlug}-v${v}`;
          if (dbBySlug[vs] && similarity(dbBySlug[vs], rowText) > 0.85) {
            alreadyStored = true;
            break;
          }
        }
      }

      if (alreadyStored) continue;

      // Find a free slug
      let newSlug = baseSlug;
      if (dbSlugs.has(newSlug)) {
        // Find next free -vN suffix
        while (dbSlugs.has(`${baseSlug}-v${versionCounter}`)) versionCounter++;
        newSlug = `${baseSlug}-v${versionCounter}`;
        versionCounter++;
      }

      if (!row.content || stripHtml(row.content).trim().length < 20) continue;

      const seo = extractSeo(row.meta || '', row.title);
      toInsert.push({
        title:                `${row.title.trim()} (${newSlug.endsWith('-v2') ? 'Alternative' : `Version ${newSlug.slice(-1)}`})`,
        slug:                 newSlug,
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

      dbSlugs.add(newSlug);
    }
  }

  console.log(`\nStep 5: ${toInsert.length} diff-content extras to insert`);

  // 7. Insert
  let inserted = 0, failed = 0;
  const BATCH = 50;
  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH);
    try {
      const res = await BlogPost.insertMany(batch, { ordered: false });
      inserted += res.length;
    } catch (err) {
      if (err.insertedDocs) inserted += err.insertedDocs.length;
      if (err.writeErrors)  {
        failed += err.writeErrors.length;
        err.writeErrors.filter(e => e.code !== 11000).forEach(e => console.log('  Error:', e.errmsg));
      } else if (err.code !== 11000) console.error('  Batch error:', err.message);
    }
  }

  const finalCount = await BlogPost.countDocuments();
  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  Pass 2 Complete!`);
  console.log(`  Inserted:        ${inserted}`);
  console.log(`  Failed:          ${failed}`);
  console.log(`  Total in DB now: ${finalCount}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  await mongoose.disconnect();
}

// Simple Jaccard-like similarity on first N chars
function similarity(a, b) {
  if (!a || !b) return 0;
  const longer  = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1;
  const overlap = shorter.split('').filter((ch, i) => longer[i] === ch).length;
  return overlap / longer.length;
}

main().catch(err => {
  console.error('Pass 2 failed:', err.message);
  process.exit(1);
});
