require('dotenv').config();
const connectDB = require('./config/db');
const Review = require('./models/Review');

const FALLBACK_NAMES = [
  'Arjun Malhotra',
  'Neha Kapoor',
  'Rohan Batra',
  'Meera Nair',
  'Karan Sethi',
  'Ishita Verma',
  'Nitin Khanna',
  'Pooja Bansal',
  'Siddharth Arora',
  'Tanvi Joshi',
  'Aditya Rao',
  'Shreya Menon',
  'Varun Ahuja',
  'Nisha Talwar',
  'Yash Oberoi',
  'Aarav Bedi',
  'Ritika Khurana',
  'Devansh Mallick',
  'Maya Krishnan',
  'Kunal Chawla',
];

const dedupeReviewerNames = async () => {
  try {
    console.log('\nDeduplicating review client names...\n');
    await connectDB();

    const reviews = await Review.find()
      .sort({ createdAt: 1, _id: 1 })
      .select('_id clientName');

    if (reviews.length === 0) {
      console.log('No reviews found. Nothing to update.');
      process.exit(0);
    }

    const seenOriginal = new Map();
    const usedNames = new Set(
      reviews
        .map((r) => (r.clientName || '').trim())
        .filter(Boolean)
    );
    let fallbackIndex = 0;
    let updates = 0;

    for (const review of reviews) {
      const original = (review.clientName || '').trim() || 'Client';
      const count = seenOriginal.get(original) || 0;
      seenOriginal.set(original, count + 1);

      if (count === 0) {
        continue;
      }

      while (
        fallbackIndex < FALLBACK_NAMES.length &&
        usedNames.has(FALLBACK_NAMES[fallbackIndex])
      ) {
        fallbackIndex += 1;
      }

      let replacement =
        fallbackIndex < FALLBACK_NAMES.length
          ? FALLBACK_NAMES[fallbackIndex]
          : `${original} ${count + 1}`;

      while (usedNames.has(replacement)) {
        replacement = `${original} ${count + 1}-${fallbackIndex + 1}`;
      }

      fallbackIndex += 1;
      await Review.updateOne({ _id: review._id }, { $set: { clientName: replacement } });
      usedNames.add(replacement);
      updates += 1;
      console.log(`Updated ${review._id}: "${original}" -> "${replacement}"`);
    }

    console.log(`\nDone. Updated ${updates} review name(s).`);
    process.exit(0);
  } catch (error) {
    console.error('\nFailed to deduplicate review names:', error);
    process.exit(1);
  }
};

dedupeReviewerNames();
