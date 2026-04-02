const { locations } = require('./seed-1702-locations');

const unique = [...new Set(locations)];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📍 LOCATION COUNT CHECK');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`Total locations in array: ${locations.length}`);
console.log(`Unique locations: ${unique.length}`);
console.log(`Duplicates: ${locations.length - unique.length}\n`);
console.log(`Expected: 1,702 locations`);
console.log(`Actual: ${unique.length} unique locations`);
console.log(`Missing: ${1702 - unique.length} locations\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (unique.length === 1702) {
  console.log('✅ Perfect! We have exactly 1,702 unique locations');
} else if (unique.length === 1218) {
  console.log('⚠️  We only have 1,218 unique locations (not 1,702)');
  console.log('   This will create: 25 services × 1,218 locations = 30,450 pages');
  console.log('   Expected: 25 services × 1,702 locations = 42,550 pages');
} else {
  console.log(`⚠️  Unexpected count: ${unique.length} locations`);
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
