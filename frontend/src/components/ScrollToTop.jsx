import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Resets scroll position to top (0, 0) on every route change.
 * Behaves like a fresh page load - NO animation, NO smooth scrolling.
 * 
 * Features:
 * - Immediate scroll reset (no visible animation)
 * - Runs synchronously before paint
 * - Preserves hash/anchor navigation (e.g., /page#section)
 * - Works with all navigation types (links, buttons, programmatic)
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Disable native browser restoration so each route change behaves like a fresh page load.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // If there's a hash, handle anchor navigation
    if (hash) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          // Hash exists but element not found - scroll to top
          window.scrollTo(0, 0);
        }
      });
    } else {
      // No hash - immediate scroll to top (no animation)
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
