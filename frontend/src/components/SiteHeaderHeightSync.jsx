import { useLayoutEffect } from 'react';

const HEADER_ID = 'site-header';

/**
 * Measures the sticky site header (TopBar + nav) and exposes its height as
 * --site-header-height on :root for scroll-padding, scroll-margin, and calcs.
 */
export default function SiteHeaderHeightSync() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const el = document.getElementById(HEADER_ID);
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      root.style.setProperty('--site-header-height', `${h}px`);
    };

    apply();

    const el = document.getElementById(HEADER_ID);
    if (!el) return undefined;

    const ro = new ResizeObserver(() => apply());
    ro.observe(el);
    window.addEventListener('resize', apply);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return null;
}
