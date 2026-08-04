const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ===== DEBUG: Server startup =====
console.log('[server] Startup');
console.log('[server] cwd:', process.cwd());
console.log('[server] __dirname:', __dirname);
console.log('[server] .env path:', path.join(__dirname, '.env'));
console.log('[server] NODE_ENV:', process.env.NODE_ENV);
console.log('[server] MONGO_URI available:', !!process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const awardRoutes = require('./routes/awardRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const careerRoutes = require('./routes/careerRoutes');
const pageContentRoutes = require('./routes/pageContentRoutes');
const locationRoutes = require('./routes/locationRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const seoRoutes = require('./routes/seoRoutes');
const seoManagementRoutes = require('./routes/seoManagementRoutes');
const cloudinaryRoutes = require('./routes/cloudinaryRoutes');
const { seoInjectionMiddleware, FRONTEND_DIST } = require('./middleware/seoInjection');

// CMS Routes
const globalSettingsRoutes = require('./routes/globalSettingsRoutes');
const locationSeoRoutes = require('./routes/locationSeoRoutes');
const navigationRoutes = require('./routes/navigationRoutes');
const mediaLibraryRoutes = require('./routes/mediaLibraryRoutes');
const pageRoutes = require('./routes/pageRoutes');
const contentBlockRoutes = require('./routes/contentBlockRoutes');
const reusableBlockRoutes = require('./routes/reusableBlockRoutes');
const pageBlockRoutes = require('./routes/pageBlockRoutes');
const formContentRoutes = require('./routes/formContentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Behind the Hostinger VPS reverse proxy, the real client IP is in
// X-Forwarded-For. Trust the first proxy hop so the rate limiter keys on the
// actual visitor IP (not the proxy's single IP). One hop only — do not trust
// the whole chain.
app.set('trust proxy', 1);

// Brute-force protection for login ONLY. Scoped to the auth route so normal
// site/API browsing and the sitemap routes (mounted at '/') are never affected.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max login attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
});

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.SITE_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/pages', pageContentRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/seo', seoManagementRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);

// CMS Routes
app.use('/api/cms/global-settings', globalSettingsRoutes);
app.use('/api/cms/services', locationSeoRoutes);
app.use('/api/cms/navigation', navigationRoutes);
app.use('/api/cms/media', mediaLibraryRoutes);
app.use('/api/cms/pages', pageRoutes);
app.use('/api/cms/blocks', contentBlockRoutes);
app.use('/api/cms/reusable-blocks', reusableBlockRoutes);
app.use('/api/cms/page-blocks', pageBlockRoutes);
app.use('/api/cms/forms', formContentRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);

app.use('/', seoRoutes);

// ─── Serve built React frontend with server-side SEO injection ────────────────
// When the frontend dist is co-deployed with the backend, this serves the SPA
// with correct per-page title / description / canonical in the raw HTML source
// (no prerendering needed — scales to any number of pages).
const frontendDistExists = fs.existsSync(path.join(FRONTEND_DIST, 'index.html'));
if (frontendDistExists) {
  // Serve static assets (JS, CSS, images) directly — no SEO injection needed
  app.use(express.static(FRONTEND_DIST, { index: false, redirect: false }));
  // All remaining HTML requests go through SEO injection then serve index.html
  app.use(seoInjectionMiddleware);
} else {
  // Frontend not co-deployed — keep the old health-check response
  app.get('/', (req, res) => {
    res.json({ message: 'GAG Lawyers API is running' });
  });
}

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  // Connect at startup only for the long-running Node server. Serverless entrypoints
  // handle connection lifecycle before forwarding requests to this app.
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      });
    })
    .catch(console.error);
}

module.exports = app;
