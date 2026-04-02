const { locations } = require('./seed-1702-locations');

console.log('Total locations:', locations.length);
console.log('Unique locations:', [...new Set(locations)].length);
console.log('Duplicates:', locations.length - [...new Set(locations)].length);
