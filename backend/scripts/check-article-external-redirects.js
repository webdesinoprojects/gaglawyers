#!/usr/bin/env node

const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
  quiet: true,
});
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const BlogPost = require('../models/BlogPost');

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || '').trim());

const toRow = (post) => ({
  id: String(post._id),
  title: post.title,
  slug: post.slug,
  contentType: post.contentType || 'article',
  isPublished: Boolean(post.isPublished),
  externalUrl: String(post.externalUrl || '').trim(),
});

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI. Expected it in backend/.env');
  }

  await connectDB();

  const posts = await BlogPost.find({
    externalUrl: { $exists: true, $ne: '' },
  })
    .select('title slug externalUrl contentType isPublished')
    .sort({ updatedAt: -1 })
    .lean();

  const redirectingPosts = posts
    .map(toRow)
    .filter((row) => isAbsoluteUrl(row.externalUrl));

  console.log('\n=== Article External Redirect Audit ===');
  console.log(`Total posts with externalUrl set: ${posts.length}`);
  console.log(`Posts that will redirect externally: ${redirectingPosts.length}`);

  if (redirectingPosts.length > 0) {
    console.log('\nAffected posts:\n');
    redirectingPosts.forEach((row, index) => {
      console.log(
        `${index + 1}. ${row.title}\n   slug: ${row.slug}\n   type: ${row.contentType}\n   published: ${row.isPublished}\n   externalUrl: ${row.externalUrl}\n`
      );
    });
  } else {
    console.log('\nNo externally redirecting posts found.');
  }
}

main()
  .catch((error) => {
    console.error('\nAudit failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
