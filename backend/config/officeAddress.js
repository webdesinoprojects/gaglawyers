/**
 * Canonical office address for Site Settings, Global Settings, seeds, and frontend fallbacks.
 * Keep in sync with frontend/src/constants/officeAddress.js
 */
const OFFICE_ADDRESS_LINE =
  'D-11/104, Sharda Chambers, Central Market, Prashant Vihar, Sector 14, Rohini, New Delhi';

const OFFICE_ADDRESS_MULTILINE = [
  'D-11/104, Sharda Chambers, Central Market',
  'Prashant Vihar, Sector 14, Rohini',
  'New Delhi',
].join('\n');

function getGlobalAddressFields(existing = {}) {
  return {
    street: 'D-11/104, Sharda Chambers, Central Market, Prashant Vihar, Sector 14, Rohini',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    zipCode: existing.zipCode != null ? existing.zipCode : '',
    displayText: OFFICE_ADDRESS_LINE,
    mapEmbedUrl: existing.mapEmbedUrl || '',
  };
}

module.exports = {
  OFFICE_ADDRESS_LINE,
  OFFICE_ADDRESS_MULTILINE,
  getGlobalAddressFields,
};
