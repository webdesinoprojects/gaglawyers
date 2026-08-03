import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = ({ measurementId }) => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const lastTrackedPath = useRef(currentPath);

  // The initial page view is sent by the Google tag in index.html. Only send
  // subsequent client-side route changes here so the first view is not counted twice.
  useEffect(() => {
    if (currentPath !== lastTrackedPath.current) {
      lastTrackedPath.current = currentPath;
    } else {
      return;
    }

    if (typeof window.gtag === 'function' && measurementId) {
      window.gtag('config', measurementId, {
        page_path: currentPath,
      });
    }
  }, [currentPath, measurementId]);

  return null;
};

export default GoogleAnalytics;
