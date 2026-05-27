/**
 * Upload legacy blog images to Cloudinary and update MongoDB articles.
 *
 * Steps:
 *  1. Find all articles whose featuredImage starts with /blog-images/
 *  2. For each unique image filename, upload to Cloudinary (folder: gaglawyers/blog-images)
 *  3. Update every matching article with the Cloudinary URL + publicId
 *
 * Run: node backend/scripts/upload-blog-images-cloudinary.js
 * Safe to re-run: skips images already on Cloudinary (checks by public_id).
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const fs        = require('fs');
const mongoose  = require('mongoose');
const cloudinary = require('../config/cloudinary');
const BlogPost  = require('../models/BlogPost');

const IMG_DIR = path.join(__dirname, '../../new_article_img');
const FOLDER  = 'gaglawyers/blog-images';
const DELAY_MS = 300; // small delay between uploads to respect rate limits

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function uploadImage(filename) {
  const filePath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  // Derive a clean public_id from the filename (no extension, no special chars)
  const ext      = path.extname(filename);
  const baseName = path.basename(filename, ext);
  const publicId = `${FOLDER}/${baseName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100)}`;

  // Check if already uploaded (avoid duplicate uploads on re-run)
  try {
    const existing = await cloudinary.api.resource(publicId);
    return { url: existing.secure_url, publicId: existing.public_id, cached: true };
  } catch (_) {
    // Not found — upload
  }

  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
    folder: FOLDER,
  });

  return { url: result.secure_url, publicId: result.public_id, cached: false };
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Blog Image Cloudinary Upload + DB Update');
  console.log('═══════════════════════════════════════════════════════\n');

  // Connect
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB\n');

  // Find articles with local image paths
  const articles = await BlogPost.find({
    featuredImage: { $regex: '^/blog-images/' },
  }).lean();

  console.log(`Articles with local /blog-images/ paths: ${articles.length}`);

  // Build map: filename → list of article _ids
  const filenameToIds = {};
  for (const art of articles) {
    const filename = art.featuredImage.replace('/blog-images/', '');
    if (!filenameToIds[filename]) filenameToIds[filename] = [];
    filenameToIds[filename].push(art._id);
  }

  const uniqueFiles = Object.keys(filenameToIds);
  console.log(`Unique image files to upload: ${uniqueFiles.length}\n`);

  let uploaded = 0, cached = 0, failed = 0, dbUpdated = 0;

  for (let i = 0; i < uniqueFiles.length; i++) {
    const filename = uniqueFiles[i];
    const ids      = filenameToIds[filename];

    process.stdout.write(`  [${i + 1}/${uniqueFiles.length}] ${filename.slice(0, 60).padEnd(62)}`);

    try {
      const result = await uploadImage(filename);

      if (!result) {
        process.stdout.write('NOT FOUND in source dir\n');
        failed++;
        continue;
      }

      if (result.cached) {
        process.stdout.write('already on Cloudinary\n');
        cached++;
      } else {
        process.stdout.write('uploaded ✓\n');
        uploaded++;
        await sleep(DELAY_MS);
      }

      // Update all articles that used this local image
      const updateResult = await BlogPost.updateMany(
        { _id: { $in: ids } },
        {
          $set: {
            featuredImage:        result.url,
            featuredImagePublicId: result.publicId,
          },
        }
      );
      dbUpdated += updateResult.modifiedCount;

    } catch (err) {
      process.stdout.write(`FAILED: ${err.message}\n`);
      failed++;
    }
  }

  // Final verification
  const stillLocal = await BlogPost.countDocuments({
    featuredImage: { $regex: '^/blog-images/' },
  });
  const nowCloudinary = await BlogPost.countDocuments({
    featuredImage: { $regex: '^https://res.cloudinary.com' },
  });

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done!`);
  console.log(`  ─────────────────────────────────────────────────────`);
  console.log(`  Uploaded to Cloudinary:   ${uploaded}`);
  console.log(`  Already on Cloudinary:    ${cached}`);
  console.log(`  Not found / failed:       ${failed}`);
  console.log(`  DB articles updated:      ${dbUpdated}`);
  console.log(`  Still on local path:      ${stillLocal}`);
  console.log(`  Now using Cloudinary URL: ${nowCloudinary}`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('\nScript failed:', err.message);
  process.exit(1);
});
