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
const { createSSRMiddleware } = require('./ssr-middleware');

// CMS Routes
const globalSettingsRoutes = require('./routes/globalSettingsRoutes');
const navigationRoutes = require('./routes/navigationRoutes');
const mediaLibraryRoutes = require('./routes/mediaLibraryRoutes');
const pageRoutes = require('./routes/pageRoutes');
const contentBlockRoutes = require('./routes/contentBlockRoutes');
const reusableBlockRoutes = require('./routes/reusableBlockRoutes');
const pageBlockRoutes = require('./routes/pageBlockRoutes');
const formContentRoutes = require('./routes/formContentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to database at startup (all environments)
connectDB().catch(console.error);

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
app.use('/api/cms/navigation', navigationRoutes);
app.use('/api/cms/media', mediaLibraryRoutes);
app.use('/api/cms/pages', pageRoutes);
app.use('/api/cms/blocks', contentBlockRoutes);
app.use('/api/cms/reusable-blocks', reusableBlockRoutes);
app.use('/api/cms/page-blocks', pageBlockRoutes);
app.use('/api/cms/forms', formContentRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);

app.use('/', seoRoutes);

// ─── Serve built React frontend with Server-Side Rendering (SSR) ────────────────
// Serves the frontend with per-page SEO tags injected server-side.
// Each request fetches page data and injects correct title, meta, canonical, schema.
// React hydrates on client for full interactivity.
const FRONTEND_DIST = path.join(__dirname, '../frontend/dist');
const frontendDistExists = fs.existsSync(path.join(FRONTEND_DIST, 'index.html'));

if (frontendDistExists) {
  // Serve static assets (JS, CSS, images) directly — no SSR processing needed
  app.use(express.static(FRONTEND_DIST, { index: false }));
  
  // SSR middleware: fetch page data, inject SEO tags, render with content
  const ssrMiddleware = createSSRMiddleware(
    process.env.SITE_URL || 'https://gaglawyers.com',
    FRONTEND_DIST
  );
  app.use(ssrMiddleware);
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

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
