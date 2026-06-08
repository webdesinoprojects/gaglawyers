import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

/**
 * Client Entry Point for SSR Hydration
 * 
 * This runs in the browser after the server has sent HTML with:
 * - Initial React component tree already rendered
 * - Page-specific SEO tags injected
 * - Content already in the DOM
 * 
 * hydrateRoot() reuses the existing DOM and attaches React's event handlers,
 * rather than replacing it (which would cause duplicate content).
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

const hasSeoFallback = rootElement.querySelector('[data-seo-fallback="true"]');

if (hasSeoFallback || !rootElement.hasChildNodes()) {
  createRoot(rootElement).render(app);
} else {
  hydrateRoot(rootElement, app);
}
