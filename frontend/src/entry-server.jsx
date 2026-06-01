import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

/**
 * Server Entry Point for SSR
 * 
 * This renders the React app to a string on the server.
 * The server calls this with the request path.
 * 
 * Returns: { html, helmetContext }
 * The server then extracts SEO tags from helmetContext and
 * injects them into the final HTML response.
 * 
 * Note: This is a minimal SSR implementation. The server-side middleware
 * (ssr-middleware.js) handles fetching page data and injecting SEO tags.
 * React hydrates on the client with hydrateRoot() to preserve interactivity.
 */

export function render(url) {
  const helmetContext = new FilledContext();

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  return { html, helmetContext };
}
