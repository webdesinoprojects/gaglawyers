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
  const child = spawn(process.execPath, [scriptPath], {
    stdio: 'ignore',
    detached: true,
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
      console.error(`[sitemap] generator exited with code ${code}`);
    }
  });
}

function scheduleSitemapRegeneration(reason = 'content-change', debounceMs = 5000) {
  if (!isEnabled()) return;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    console.log(`[sitemap] regenerating (${reason})`);
    runGenerator();
  }, debounceMs);
}

module.exports = {
  scheduleSitemapRegeneration,
};

