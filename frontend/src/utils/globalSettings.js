import API_BASE_URL from '../config/api';

// Fetch the public global settings once and share the promise across components
// (footer + top-bar). Returns the settings object, or null on any failure so
// callers can fall back to their hardcoded defaults.
let cache = null;

export const getGlobalSettings = () => {
  if (!cache) {
    cache = fetch(`${API_BASE_URL}/api/cms/global-settings`)
      .then((r) => r.json())
      .then((d) => (d && d.success ? d.data : null))
      .catch(() => null);
  }
  return cache;
};
