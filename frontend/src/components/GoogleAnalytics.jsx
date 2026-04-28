import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = ({ measurementId }) => {
  const location = useLocation();

  useEffect(() => {
    // Only load if measurement ID is provided
    if (!measurementId || measurementId === 'YOUR_GA_MEASUREMENT_ID') {
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: location.pathname + location.search,
      send_page_view: true,
    });

    return () => {
      // Cleanup if needed
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
    };
  }, [measurementId]);

  // Track page views on route change
  useEffect(() => {
    if (window.gtag && measurementId && measurementId !== 'YOUR_GA_MEASUREMENT_ID') {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, measurementId]);

  return null;
};

export default GoogleAnalytics;
