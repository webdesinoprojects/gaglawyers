#!/usr/bin/env node

const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
  quiet: true,
});
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const BlogPost = require('../models/BlogPost');

const args = process.argv.slice(2);
const shouldApply = args.includes('--apply');
const onlyGaglawyers = args.includes('--only-gaglawyers');

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || '').trim());

const isGaglawyersHost = (urlValue) => {
  try {
    const hostname = new URL(urlValue).hostname.toLowerCase();
    return hostname === 'gaglawyers.com' || hostname === 'www.gaglawyers.com';
  } catch {
    return false;
  }
};

const splitWords = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const buildKeywords = (post) => {
  const words = new Set([...splitWords(post.title), ...splitWords(post.category)].filter((w) => w.length > 2));
  return Array.from(words).slice(0, 10).join(', ');
};

const buildTags = (post) => {
  const existing = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
  if (existing.length > 0) return existing;
  return splitWords(`${post.title} ${post.category}`).filter((w) => w.length > 2).slice(0, 6);
};

const ensureExcerpt = (post) => {
  const raw = String(post.excerpt || '').trim();
  if (raw.length >= 80) return raw;
  return `Understand ${post.title} in India: legal framework, practical steps, documentation, and strategy from the GAG Lawyers team.`;
};

const buildArticleHtml = (post, excerpt) => {
  const safeTitle = String(post.title || 'Legal Article');
  const safeCategory = String(post.category || 'Legal News');
  return [
    `<h2>${safeTitle}</h2>`,
    `<p>${excerpt}</p>`,
    '<h3>Why This Topic Matters</h3>',
    `<p>${safeCategory} issues can affect rights, timelines, and financial outcomes. Early legal clarity helps avoid avoidable disputes and procedural delays.</p>`,
    '<h3>Key Legal Considerations</h3>',
    '<ul>',
    '<li>Applicable statutes, procedural rules, and jurisdiction-specific requirements.</li>',
    '<li>Essential documentation and factual evidence required for a strong case.</li>',
    '<li>Risk assessment, available remedies, and realistic timeline planning.</li>',
    '</ul>',
    '<h3>How We Approach Such Matters</h3>',
    '<p>Our team evaluates facts, identifies the right legal forum, and builds a practical strategy aligned to your objective while maintaining compliance at every stage.</p>',
    '<h3>Need Guidance?</h3>',
    '<p>If you need case-specific advice, connect with GAG Lawyers for a tailored consultation.</p>',
  ].join('\n');
};

const contentNeedsRewrite = (content) => {
  const text = String(content || '').trim().toLowerCase();
  if (!text) return true;
  if (text.length < 200) return true;
  return text.includes('read full article on gag lawyers resource center');
};

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI. Expected it in backend/.env');
  }

  await connectDB();

  const filter = {
    externalUrl: { $exists: true, $ne: '' },
  };

  const posts = await BlogPost.find(filter).sort({ updatedAt: -1 });

  const candidates = posts.filter((post) => {
    const externalUrl = String(post.externalUrl || '').trim();
    if (!isAbsoluteUrl(externalUrl)) return false;
    if (!onlyGaglawyers) return true;
    return isGaglawyersHost(externalUrl);
  });

  console.log('\n=== Fix External Redirecting Articles ===');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`Candidates: ${candidates.length}`);

  let updated = 0;
  for (const post of candidates) {
    const excerpt = ensureExcerpt(post);
    const nextContent = contentNeedsRewrite(post.content) ? buildArticleHtml(post, excerpt) : post.content;
    const nextSeoKeywords = String(post.seo?.keywords || '').trim() || buildKeywords(post);
    const nextSeoDescription = String(post.seo?.description || '').trim() || excerpt.slice(0, 160);
    const nextSeoTitle = String(post.seo?.title || '').trim() || `${post.title} | GAG Lawyers`;
    const nextTags = buildTags(post);

    console.log(
      `- ${post.title} (${post.slug})\n  externalUrl: ${post.externalUrl}\n  action: clear externalUrl + ${
        contentNeedsRewrite(post.content) ? 'rewrite content' : 'keep content'
      }`
    );

    if (!shouldApply) continue;

    post.externalUrl = '';
    post.excerpt = excerpt;
    post.content = nextContent;
    post.tags = nextTags;
    post.seo = {
      ...(post.seo || {}),
      title: nextSeoTitle,
      description: nextSeoDescription,
      keywords: nextSeoKeywords,
    };
    await post.save();
    updated += 1;
  }

  console.log(`\nDone. ${shouldApply ? `Updated: ${updated}` : 'No DB changes made (dry-run).'}`);
  if (!shouldApply) {
    console.log('Run with --apply to perform updates.');
  }
}

main()
  .catch((error) => {
    console.error('\nFix script failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
