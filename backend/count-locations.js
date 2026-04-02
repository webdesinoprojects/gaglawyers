const fs = require('fs');

// Read the generate-all-location-pages.js file
const content = fs.readFileSync('generate-all-location-pages.js', 'utf8');

// Extract the locations array
const startMarker = 'const locations1702 = [';
const endMarker = '];';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('❌ Could not find locations array');
  process.exit(1);
}

const arrayContent = content.substring(startIndex + startMarker.length, endIndex);
const locations = arrayContent
  .split(',')
  .map(s => s.trim().replace(/["']/g, ''))
  .filter(s => s.length > 0);

console.log('📊 Location Count Analysis:\n');
console.log(`Total locations in array: ${locations.length}`);
console.log(`Expected: 1702`);
console.log(`Difference: ${1702 - locations.length}`);

if (locations.length < 1702) {
  console.log('\n⚠️  Missing locations! The array is incomplete.');
} else if (locations.length > 1702) {
  console.log('\n⚠️  Extra locations! The array has duplicates or extras.');
} else {
  console.log('\n✅ Perfect! Array has exactly 1702 locations.');
}

console.log('\nFirst 10 locations:');
locations.slice(0, 10).forEach((loc, i) => console.log(`  ${i + 1}. ${loc}`));

console.log('\nLast 10 locations:');
locations.slice(-10).forEach((loc, i) => console.log(`  ${locations.length - 9 + i}. ${loc}`));
