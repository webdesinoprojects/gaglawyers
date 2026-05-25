/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');

let timer = null;
let running = false;
let pending = false;

function isEnabled() {
  const raw = String(process.env.ENABLE_SITEMAP_REGEN || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

function runGenerator() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;

  const scriptPath = path.resolve(__dirname, '../scripts/generateSitemap.js');
  
  // ===== CRITICAL FIX #2: Set explicit cwd for child process =====
  const backendDir = path.resolve(__dirname, '../');
  
  console.log('[sitemap-regen] Spawning sitemap generator');
  console.log('[sitemap-regen] Parent cwd:', process.cwd());
  console.log('[sitemap-regen] Setting child cwd:', backendDir);
  console.log('[sitemap-regen] Script path:', scriptPath);
  
  const child = spawn(process.execPath, [scriptPath], {
    stdio: ['ignore', 'inherit', 'inherit'],  // Changed to 'inherit' to see child output
    detached: true,
    cwd: backendDir,  // ✅ Set working directory to backend/
    env: process.env,
  });

  child.unref();

  child.on('exit', (code) => {
    running = false;
    if (pending) {
      pending = false;
      scheduleSitemapRegeneration('pending');
    }
    if (code !== 0) {
      console.error(`[sitemap-regen] generator exited with code ${code}`);
    } else {
      console.log('[sitemap-regen] generator completed successfully');
    }
  });

  child.on('error', (err) => {
    running = false;
    console.error('[sitemap-regen] generator error:', err);
  });
}

function scheduleSitemapRegeneration(reason = 'content-change', debounceMs = 5000) {
  if (!isEnabled()) return;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    console.log(`[sitemap-regen] regenerating (${reason})`);
    runGenerator();
  }, debounceMs);
}

module.exports = {
  scheduleSitemapRegeneration,
};

