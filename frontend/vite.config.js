import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_URL || 'http://localhost:5000';
  const isSSR = process.env.SSR === 'true';

  return {
    plugins: [react()],
    build: {
      // SSR-compatible build output
      ssr: isSSR ? 'src/entry-server.jsx' : undefined,
      outDir: 'dist',
      rollupOptions: {
        output: isSSR
          ? {
              // SSR bundle: single server file
              entryFileNames: 'server.js',
              format: 'esm',
            }
          : {
              // Client bundle
              entryFileNames: 'assets/[name]-[hash].js',
              chunkFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash][extname]',
            },
      },
    },
    server: {
      proxy: {
        '/sitemap.xml': apiTarget,
        '/pages-sitemap.xml': apiTarget,
        '/services.xml': apiTarget,
        '/blogs.xml': apiTarget,
        '/locations.xml': apiTarget,
        '/locations-sitemap.xml': apiTarget,
        '/locations-': apiTarget, // Matches /locations-1.xml, /locations-2.xml, etc.
        '/robots.txt': apiTarget,
      },
    },
  };
})
