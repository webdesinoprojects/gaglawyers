/** Session cache key for FloatingWidgets + disclaimer-related fetches */
export const WIDGET_SETTINGS_CACHE_KEY = 'gag-widget-settings-v2';

/** Bump so other tabs can refetch widget settings (sessionStorage is per-tab). */
export const SETTINGS_REV_KEY = 'gag-settings-rev';

/**
 * Call after Site Settings (or any) save so the public site shows new phone/WhatsApp immediately.
 */
export function invalidatePublicWidgetSettingsCache() {
  try {
    sessionStorage.removeItem(WIDGET_SETTINGS_CACHE_KEY);
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(SETTINGS_REV_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new Event('gag:widget-settings-invalidate'));
  } catch {
    /* ignore */
  }
}
