/**
 * Compress and upload oversized images (>10MB) to Cloudinary.
 * Uses sharp to resize to max 1920px wide / JPEG quality 75 before uploading.
 * Only targets articles still using /blog-images/ local paths.
 *
 * Run: node backend/scripts/upload-large-images-cloudinary.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const fs        = require('fs');
const os        = require('os');
const sharp     = require('sharp');
const mongoose  = require('mongoose');
const cloudinary = require('../config/cloudinary');
const BlogPost  = require('../models/BlogPost');

const IMG_DIR  = path.join(__dirname, '../../new_article_img');
const FOLDER   = 'gaglawyers/blog-images';
const TMP_DIR  = os.tmpdir();
const DELAY_MS = 300;
const MAX_BYTES = 9 * 1024 * 1024; // stay under 10MB

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function compressToTmp(filename) {
  const srcPath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(srcPath)) return null;

  const stat = fs.statSync(srcPath);
  const ext  = path.extname(filename).toLowerCase();
  const tmpPath = path.join(TMP_DIR, `_cld_${Date.now()}_${path.basename(filename)}.jpg`);

  // Try progressively lower quality until file is small enough
  let quality = 75;
  let width   = 1920;

  while (quality >= 30) {
    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(tmpPath);

    const tmpStat = fs.statSync(tmpPath);
    if (tmpStat.size < MAX_BYTES) break;

    // Reduce further
    quality -= 10;
    if (quality < 50) width = Math.round(width * 0.8);
  }

  return tmpPath;
}

async function uploadImage(filename) {
  const filePath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const ext      = path.extname(filename);
  const baseName = path.basename(filename, ext);
  const publicId = `${FOLDER}/${baseName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100)}`;

  // Check if already uploaded
  try {
    const existing = await cloudinary.api.resource(publicId);
    return { url: existing.secure_url, publicId: existing.public_id, cached: true };
  } catch (_) {}

  const fileSize = fs.statSync(filePath).size;
  let uploadPath = filePath;
  let tmpPath    = null;

  if (fileSize > MAX_BYTES) {
    tmpPath = await compressToTmp(filename);
    if (!tmpPath) return null;
    uploadPath = tmpPath;
  }

  try {
    const result = await cloudinary.uploader.upload(uploadPath, {
      public_id: publicId,
      overwrite: false,
      resource_type: 'image',
      folder: FOLDER,
    });
    return { url: result.secure_url, publicId: result.public_id, cached: false };
  } finally {
    if (tmpPath && fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Upload Large Blog Images (with compression)');
  console.log('═══════════════════════════════════════════════════════\n');

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB\n');

  // Find articles still on local paths
  const articles = await BlogPost.find({
    featuredImage: { $regex: '^/blog-images/' },
  }).lean();

  console.log(`Articles still with local paths: ${articles.length}`);

  const filenameToIds = {};
  for (const art of articles) {
    const filename = art.featuredImage.replace('/blog-images/', '');
    if (!filenameToIds[filename]) filenameToIds[filename] = [];
    filenameToIds[filename].push(art._id);
  }

  const uniqueFiles = Object.keys(filenameToIds);
  console.log(`Unique files to process: ${uniqueFiles.length}\n`);

  let uploaded = 0, cached = 0, failed = 0, notFound = 0, dbUpdated = 0;

  for (let i = 0; i < uniqueFiles.length; i++) {
    const filename = uniqueFiles[i];
    const ids      = filenameToIds[filename];

    process.stdout.write(`  [${i + 1}/${uniqueFiles.length}] ${filename.slice(0, 55).padEnd(57)}`);

    try {
      const srcPath = path.join(IMG_DIR, filename);
      if (!fs.existsSync(srcPath)) {
        process.stdout.write('NOT FOUND\n');
        notFound++;
        continue;
      }

      const sizeMB = (fs.statSync(srcPath).size / 1024 / 1024).toFixed(1);
      const result = await uploadImage(filename);

      if (!result) {
        process.stdout.write(`FAILED (${sizeMB}MB)\n`);
        failed++;
        continue;
      }

      if (result.cached) {
        process.stdout.write('already on Cloudinary ✓\n');
        cached++;
      } else {
        process.stdout.write(`compressed+uploaded ✓  (was ${sizeMB}MB)\n`);
        uploaded++;
        await sleep(DELAY_MS);
      }

      const updateResult = await BlogPost.updateMany(
        { _id: { $in: ids } },
        { $set: { featuredImage: result.url, featuredImagePublicId: result.publicId } }
      );
      dbUpdated += updateResult.modifiedCount;

    } catch (err) {
      process.stdout.write(`ERROR: ${err.message.slice(0, 60)}\n`);
      failed++;
    }
  }

  const stillLocal    = await BlogPost.countDocuments({ featuredImage: { $regex: '^/blog-images/' } });
  const nowCloudinary = await BlogPost.countDocuments({ featuredImage: { $regex: '^https://res.cloudinary.com' } });

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done!`);
  console.log(`  ─────────────────────────────────────────────────────`);
  console.log(`  Compressed + uploaded: ${uploaded}`);
  console.log(`  Already on Cloudinary: ${cached}`);
  console.log(`  Not found in source:   ${notFound}`);
  console.log(`  Failed:                ${failed}`);
  console.log(`  DB articles updated:   ${dbUpdated}`);
  console.log(`  Still local path:      ${stillLocal}`);
  console.log(`  On Cloudinary now:     ${nowCloudinary}`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('\nScript failed:', err.message);
  process.exit(1);
});
