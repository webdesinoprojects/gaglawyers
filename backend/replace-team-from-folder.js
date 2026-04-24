require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('./config/cloudinary');
const TeamMember = require('./models/TeamMember');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_TEAM_DIR = path.join(PROJECT_ROOT, 'team');
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const TEAM_PROFILES = [
  {
    name: 'Adv. Rahul Grover',
    designation: 'Founder & Owner',
    bio: 'Founder of Grover & Grover Advocates & Solicitors - GAG Lawyers, Adv. Rahul Grover is a seasoned legal practitioner with over 6 years of experience in civil and commercial litigation, arbitration, and high-value dispute resolution. He specializes in writ jurisdiction, contractual and shareholder disputes, recovery proceedings, and strategic advisory for complex legal matters.\n\nHe has represented clients before the various High Courts, District Courts, and Tribunals, handling a diverse portfolio of high-stakes matters including execution proceedings and commercial conflicts. Known for his sharp procedural command and solution-oriented advocacy, he regularly advises clients on litigation strategy, risk mitigation, and enforcement actions. His leadership continues to drive the firm\'s commitment to precision, professionalism, and effective legal outcomes.',
    matchTokens: ['rahul', 'gag'],
    order: 1,
  },
  {
    name: 'Adv. Rahul Bharat',
    designation: 'Associate Partner',
    bio: 'Associate Partner at Grover & Grover Advocates & Solicitors - GAG Lawyers, Adv. Rahul Bharat brings over 6 years of experience in litigation and dispute resolution, with a well-rounded practice spanning civil, criminal, and regulatory matters. He specializes in drafting, pleadings, and court representation, and has been actively involved in managing complex disputes across multiple forums.\n\nHe has appeared before High Courts, District Courts, and various quasi-judicial authorities, handling matters relating to recovery proceedings, criminal complaints, regulatory actions, and civil disputes. With a strong focus on case strategy and execution, he plays a key role in ensuring efficient conduct of proceedings and delivering practical, client-focused solutions.',
    // Temporary fallback until client photo arrives.
    fallbackImageUrl:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900&q=80',
    order: 2,
  },
  {
    name: 'Neetu Thakur',
    designation: 'Associate',
    bio: 'Associate at GAG Lawyers, specializing in civil and commercial litigation, writ petitions, and dispute resolution. She is adept at court procedure, drafting pleadings, and assisting in complex litigation matters.',
    matchTokens: ['neetu', 'gag'],
    order: 3,
  },
  {
    name: 'Komal Garg',
    designation: 'Associate',
    bio: 'Associate at GAG Lawyers, specializing in corporate advisory, contract drafting and vetting, and legal research. She supports transactional and compliance matters with a detail-oriented and analytical approach.',
    matchTokens: ['komal', 'gag'],
    order: 4,
  },
  {
    name: 'Somya Pandey',
    designation: 'Associate',
    bio: 'Associate at GAG Lawyers, specializing in litigation support, documentation, and case management across civil and regulatory matters, with strong proficiency in drafting and procedural coordination.',
    matchTokens: ['somya', 'gag'],
    order: 5,
  },
];

function parseArgs(argv) {
  const args = argv.slice(2);
  let teamDir = DEFAULT_TEAM_DIR;
  let dryRun = false;

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (args[i] === '--team-dir') {
      const value = args[i + 1];
      if (!value) throw new Error('Missing value for --team-dir');
      teamDir = path.resolve(process.cwd(), value);
      i += 1;
      continue;
    }
    if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage: node replace-team-from-folder.js [--team-dir <path>] [--dry-run]');
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${args[i]}`);
  }

  return { teamDir, dryRun };
}

function normalize(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function detectImageType(fileBuffer) {
  if (fileBuffer.length < 12) return null;
  if (
    fileBuffer[0] === 0x89 &&
    fileBuffer[1] === 0x50 &&
    fileBuffer[2] === 0x4e &&
    fileBuffer[3] === 0x47
  ) return 'png';
  if (fileBuffer[0] === 0xff && fileBuffer[1] === 0xd8 && fileBuffer[2] === 0xff) return 'jpg';
  if (
    fileBuffer[0] === 0x47 &&
    fileBuffer[1] === 0x49 &&
    fileBuffer[2] === 0x46 &&
    fileBuffer[3] === 0x38
  ) return 'gif';
  if (
    fileBuffer[0] === 0x52 &&
    fileBuffer[1] === 0x49 &&
    fileBuffer[2] === 0x46 &&
    fileBuffer[3] === 0x46 &&
    fileBuffer[8] === 0x57 &&
    fileBuffer[9] === 0x45 &&
    fileBuffer[10] === 0x42 &&
    fileBuffer[11] === 0x50
  ) return 'webp';
  return null;
}

async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGO_URI or MONGODB_URI in environment.');
  await mongoose.connect(uri);
}

function scanTeamFolder(teamDir) {
  if (!fs.existsSync(teamDir)) throw new Error(`Team folder not found: ${teamDir}`);

  const files = fs
    .readdirSync(teamDir)
    .map((name) => path.join(teamDir, name))
    .filter((fullPath) => fs.statSync(fullPath).isFile())
    .map((fullPath) => ({
      fullPath,
      filename: path.basename(fullPath),
      normalizedName: normalize(path.basename(fullPath, path.extname(fullPath))),
      size: fs.statSync(fullPath).size,
      ext: path.extname(fullPath).toLowerCase(),
    }));

  const valid = [];
  const invalid = [];

  for (const file of files) {
    if (!ALLOWED_EXTENSIONS.has(file.ext)) {
      invalid.push({ filename: file.filename, reason: `Unsupported extension ${file.ext}` });
      continue;
    }
    if (file.size <= 0) {
      invalid.push({ filename: file.filename, reason: 'File is empty' });
      continue;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      invalid.push({ filename: file.filename, reason: `File too large (${file.size} bytes)` });
      continue;
    }

    const fd = fs.openSync(file.fullPath, 'r');
    const header = Buffer.alloc(16);
    fs.readSync(fd, header, 0, 16, 0);
    fs.closeSync(fd);

    const detectedType = detectImageType(header);
    if (!detectedType) {
      invalid.push({ filename: file.filename, reason: 'Invalid image signature' });
      continue;
    }

    valid.push({ ...file, detectedType });
  }

  return { valid, invalid };
}

function mapProfileToImage(profile, validFiles, usedFilePaths) {
  if (!profile.matchTokens || profile.matchTokens.length === 0) return null;

  for (const file of validFiles) {
    if (usedFilePaths.has(file.fullPath)) continue;
    const isMatch = profile.matchTokens.every((token) => file.normalizedName.includes(token));
    if (isMatch) {
      usedFilePaths.add(file.fullPath);
      return file;
    }
  }
  return null;
}

async function removeExistingTeamMembers() {
  const existing = await TeamMember.find({});
  let deletedCloudinary = 0;
  let cloudinaryFailures = 0;

  for (const member of existing) {
    if (!member.cloudinaryPublicId) continue;
    try {
      await cloudinary.uploader.destroy(member.cloudinaryPublicId);
      deletedCloudinary += 1;
    } catch (error) {
      cloudinaryFailures += 1;
      console.error(`Cloudinary delete failed (${member.cloudinaryPublicId}): ${error.message}`);
    }
  }

  const dbDelete = await TeamMember.deleteMany({});
  return {
    existingCount: existing.length,
    deletedDbCount: dbDelete.deletedCount || 0,
    deletedCloudinary,
    cloudinaryFailures,
  };
}

async function uploadAndCreateMember(profile, localFile) {
  if (localFile) {
    const upload = await cloudinary.uploader.upload(localFile.fullPath, {
      folder: 'gaglawyers/team',
      resource_type: 'image',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      transformation: [
        { width: 1600, height: 2000, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return TeamMember.create({
      name: profile.name,
      designation: profile.designation,
      bio: profile.bio,
      imageUrl: upload.secure_url,
      cloudinaryPublicId: upload.public_id,
      order: profile.order,
    });
  }

  if (!profile.fallbackImageUrl) {
    throw new Error(`No local image or fallback image for ${profile.name}`);
  }

  const upload = await cloudinary.uploader.upload(profile.fallbackImageUrl, {
    folder: 'gaglawyers/team',
    resource_type: 'image',
    use_filename: false,
    unique_filename: true,
    overwrite: false,
    transformation: [
      { width: 1600, height: 2000, crop: 'limit' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });

  return TeamMember.create({
    name: profile.name,
    designation: profile.designation,
    bio: profile.bio,
    imageUrl: upload.secure_url,
    cloudinaryPublicId: upload.public_id,
    order: profile.order,
  });
}

async function run() {
  const { teamDir, dryRun } = parseArgs(process.argv);
  console.log('\n=== Team Replacement Script ===');
  console.log(`Team directory: ${teamDir}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE RUN'}`);

  const { valid, invalid } = scanTeamFolder(teamDir);
  console.log(`Scanned files: ${valid.length + invalid.length}`);
  console.log(`Valid files: ${valid.length}`);
  console.log(`Invalid files: ${invalid.length}`);
  if (invalid.length > 0) {
    console.log('Invalid files:');
    for (const item of invalid) {
      console.log(`  [!] ${item.filename} - ${item.reason}`);
    }
  }

  const used = new Set();
  const plan = TEAM_PROFILES.map((profile) => ({
    profile,
    file: mapProfileToImage(profile, valid, used),
  }));

  console.log('\nImport plan:');
  for (const item of plan) {
    const source = item.file ? item.file.filename : 'fallback image URL';
    console.log(`  - ${item.profile.name}: ${source}`);
  }

  if (dryRun) {
    console.log('\nDry run complete. No database or Cloudinary changes were made.');
    return;
  }

  await connectDB();
  console.log('\nConnected to MongoDB.');

  const cleanup = await removeExistingTeamMembers();
  console.log('Removed old team data:');
  console.log(`  Existing records: ${cleanup.existingCount}`);
  console.log(`  Deleted DB records: ${cleanup.deletedDbCount}`);
  console.log(`  Deleted Cloudinary assets: ${cleanup.deletedCloudinary}`);
  console.log(`  Cloudinary delete failures: ${cleanup.cloudinaryFailures}`);

  console.log('\nUploading images and creating team members...');
  for (const item of plan) {
    const created = await uploadAndCreateMember(item.profile, item.file);
    console.log(`  [+] ${created.name} created`);
  }

  const total = await TeamMember.countDocuments({});
  console.log(`\nTeam replacement complete. Total team members: ${total}`);
  console.log('Admin panel /admin/team now reflects this updated list.');
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
