require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('./config/cloudinary');
const GalleryImage = require('./models/GalleryImage');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_TEMP_DIR = path.join(PROJECT_ROOT, 'temp');
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const CATEGORY_PLAN = [
  {
    key: 'courtroom',
    titlePrefix: 'Courtroom Advocacy',
    description: 'Professional courtroom representation by the firm.',
  },
  {
    key: 'client',
    titlePrefix: 'Client Engagement',
    description: 'Client consultation and legal advisory moments.',
  },
  {
    key: 'events',
    titlePrefix: 'Legal Event',
    description: 'Workshops, seminars, and legal community events.',
  },
  {
    key: 'milestones',
    titlePrefix: 'Firm Milestone',
    description: 'Achievements and growth milestones of the firm.',
  },
  {
    key: 'community',
    titlePrefix: 'Community Outreach',
    description: 'Community programs and outreach initiatives.',
  },
];

function usage() {
  console.log('Usage: node replace-gallery-from-temp.js [--temp-dir <path>] [--dry-run]');
}

function parseArgs(argv) {
  const args = argv.slice(2);
  let tempDir = DEFAULT_TEMP_DIR;
  let dryRun = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      usage();
      process.exit(0);
    }
    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (arg === '--temp-dir') {
      const dir = args[i + 1];
      if (!dir) {
        throw new Error('Missing value for --temp-dir');
      }
      tempDir = path.resolve(process.cwd(), dir);
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return { tempDir, dryRun };
}

function detectImageType(fileBuffer) {
  if (fileBuffer.length < 12) return null;

  if (
    fileBuffer[0] === 0x89 &&
    fileBuffer[1] === 0x50 &&
    fileBuffer[2] === 0x4e &&
    fileBuffer[3] === 0x47
  ) {
    return 'png';
  }

  if (fileBuffer[0] === 0xff && fileBuffer[1] === 0xd8 && fileBuffer[2] === 0xff) {
    return 'jpg';
  }

  if (
    fileBuffer[0] === 0x47 &&
    fileBuffer[1] === 0x49 &&
    fileBuffer[2] === 0x46 &&
    fileBuffer[3] === 0x38
  ) {
    return 'gif';
  }

  if (
    fileBuffer[0] === 0x52 &&
    fileBuffer[1] === 0x49 &&
    fileBuffer[2] === 0x46 &&
    fileBuffer[3] === 0x46 &&
    fileBuffer[8] === 0x57 &&
    fileBuffer[9] === 0x45 &&
    fileBuffer[10] === 0x42 &&
    fileBuffer[11] === 0x50
  ) {
    return 'webp';
  }

  return null;
}

function extractNumericSortKey(filename) {
  const galleryMatch = filename.match(/photo_gallery_(\d+)/i);
  if (galleryMatch && galleryMatch[1]) {
    return Number.parseInt(galleryMatch[1], 10);
  }

  const fallbackMatch = filename.match(/(\d+)/);
  if (!fallbackMatch) return Number.MAX_SAFE_INTEGER;
  return Number.parseInt(fallbackMatch[1], 10);
}

function getCategoryAssignment(index, total) {
  const bucketSize = Math.max(1, Math.ceil(total / CATEGORY_PLAN.length));
  const bucket = Math.min(Math.floor(index / bucketSize), CATEGORY_PLAN.length - 1);
  return CATEGORY_PLAN[bucket];
}

async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGO_URI or MONGODB_URI in environment.');
  }
  await mongoose.connect(uri);
}

async function scanTempImages(tempDir) {
  if (!fs.existsSync(tempDir)) {
    throw new Error(`Temp directory does not exist: ${tempDir}`);
  }

  const entries = fs
    .readdirSync(tempDir)
    .map((name) => path.join(tempDir, name))
    .filter((fullPath) => fs.statSync(fullPath).isFile())
    .map((fullPath) => ({
      fullPath,
      filename: path.basename(fullPath),
      ext: path.extname(fullPath).toLowerCase(),
      size: fs.statSync(fullPath).size,
    }))
    .sort((a, b) => {
      const numA = extractNumericSortKey(a.filename);
      const numB = extractNumericSortKey(b.filename);
      if (numA !== numB) return numA - numB;
      return a.filename.localeCompare(b.filename);
    });

  const valid = [];
  const invalid = [];

  for (const file of entries) {
    if (!ALLOWED_EXTENSIONS.has(file.ext)) {
      invalid.push({ ...file, reason: `Unsupported extension: ${file.ext}` });
      continue;
    }

    if (file.size <= 0) {
      invalid.push({ ...file, reason: 'File is empty' });
      continue;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      invalid.push({ ...file, reason: `File too large (${file.size} bytes)` });
      continue;
    }

    const descriptor = fs.openSync(file.fullPath, 'r');
    const headerBuffer = Buffer.alloc(16);
    fs.readSync(descriptor, headerBuffer, 0, 16, 0);
    fs.closeSync(descriptor);

    const detectedType = detectImageType(headerBuffer);
    if (!detectedType) {
      invalid.push({ ...file, reason: 'File signature is not a supported image type' });
      continue;
    }

    valid.push({ ...file, detectedType });
  }

  return { valid, invalid };
}

async function removeExistingGalleryImages() {
  const existing = await GalleryImage.find({});
  let deletedCloudinary = 0;
  let cloudinaryFailures = 0;

  for (const image of existing) {
    if (!image.cloudinaryPublicId) continue;
    try {
      await cloudinary.uploader.destroy(image.cloudinaryPublicId);
      deletedCloudinary += 1;
    } catch (error) {
      cloudinaryFailures += 1;
      console.error(`Cloudinary delete failed for ${image.cloudinaryPublicId}: ${error.message}`);
    }
  }

  const deleteResult = await GalleryImage.deleteMany({});
  return {
    existingCount: existing.length,
    deletedDbCount: deleteResult.deletedCount || 0,
    deletedCloudinary,
    cloudinaryFailures,
  };
}

async function uploadAndInsertGalleryImages(validFiles) {
  const created = [];
  const failedUploads = [];

  for (let i = 0; i < validFiles.length; i += 1) {
    const file = validFiles[i];
    const assignment = getCategoryAssignment(i, validFiles.length);
    const withinCategoryIndex =
      created.filter((entry) => entry.category === assignment.key).length + 1;

    try {
      const uploadResult = await cloudinary.uploader.upload(file.fullPath, {
        folder: 'gaglawyers/gallery',
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        transformation: [
          { width: 2200, height: 2200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      });

      const payload = {
        title: `${assignment.titlePrefix} ${withinCategoryIndex}`,
        imageUrl: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,
        category: assignment.key,
        description: assignment.description,
        order: i + 1,
        isPublished: true,
      };

      const doc = await GalleryImage.create(payload);
      created.push(doc);

      console.log(
        `  [+] Inserted ${file.filename} -> ${payload.title} (${payload.category})`
      );
    } catch (error) {
      failedUploads.push({
        filename: file.filename,
        reason: error.message,
      });
      console.error(`  [!] Upload failed for ${file.filename}: ${error.message}`);
    }
  }

  return { created, failedUploads };
}

async function run() {
  const { tempDir, dryRun } = parseArgs(process.argv);
  console.log('\n=== Gallery Replacement Script ===');
  console.log(`Temp directory: ${tempDir}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE RUN'}`);

  const { valid, invalid } = await scanTempImages(tempDir);
  console.log(`Scanned files: ${valid.length + invalid.length}`);
  console.log(`Valid images: ${valid.length}`);
  console.log(`Invalid files: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log('\nInvalid files:');
    for (const file of invalid) {
      console.log(`  [!] ${file.filename} - ${file.reason}`);
    }
  }

  if (valid.length === 0) {
    throw new Error('No valid image files found. Aborting.');
  }

  if (dryRun) {
    console.log('\nDry run complete. No database or Cloudinary changes were made.');
    return;
  }

  await connectDB();
  console.log('\nConnected to MongoDB.');

  const removal = await removeExistingGalleryImages();
  console.log('\nRemoved old gallery data:');
  console.log(`  Existing gallery records: ${removal.existingCount}`);
  console.log(`  Deleted DB records: ${removal.deletedDbCount}`);
  console.log(`  Deleted Cloudinary assets: ${removal.deletedCloudinary}`);
  console.log(`  Cloudinary delete failures: ${removal.cloudinaryFailures}`);

  console.log('\nUploading and inserting new gallery images...');
  const { created, failedUploads } = await uploadAndInsertGalleryImages(valid);
  if (created.length === 0) {
    throw new Error('No images were inserted. Gallery remains empty.');
  }

  const finalCount = await GalleryImage.countDocuments({});
  const publishedCount = await GalleryImage.countDocuments({ isPublished: true });
  const categories = await GalleryImage.distinct('category');

  console.log('\nReplacement complete:');
  console.log(`  Total gallery images: ${finalCount}`);
  console.log(`  Published images: ${publishedCount}`);
  console.log(`  Categories: ${categories.join(', ')}`);
  console.log(`  Failed uploads: ${failedUploads.length}`);
  if (failedUploads.length > 0) {
    for (const failure of failedUploads) {
      console.log(`    - ${failure.filename}: ${failure.reason}`);
    }
  }
  console.log('\nAdmin panel will now show this updated gallery data.');
}

run()
  .catch((error) => {
    console.error('\nScript failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
