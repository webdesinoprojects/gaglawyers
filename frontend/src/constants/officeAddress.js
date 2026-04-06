/**
 * Canonical office address (fallbacks & static copy).
 * DB values are updated by: backend npm run set-office-address
 */
export const OFFICE_ADDRESS_LINE =
  'D-11/104, Sharda Chambers, Central Market, Prashant Vihar, Sector 14, Rohini, New Delhi';

/** Lines for <br /> or whitespace-pre-line layouts */
export const OFFICE_ADDRESS_LINES = [
  'D-11/104, Sharda Chambers, Central Market',
  'Prashant Vihar, Sector 14, Rohini',
  'New Delhi',
];

export const OFFICE_ADDRESS_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS_LINE)}`;
