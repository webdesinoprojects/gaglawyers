import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/sitemap.xml': apiTarget,
        '/pages-sitemap.xml': apiTarget,
        '/services.xml': apiTarget,
        '/blogs.xml': apiTarget,
        '/locations.xml': apiTarget,
        '/robots.txt': apiTarget,
      },
    },
  };
})
