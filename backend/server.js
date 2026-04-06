require('dotenv').config();
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
const pageContentRoutes = require('./routes/pageContentRoutes');
const locationRoutes = require('./routes/locationRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const seoRoutes = require('./routes/seoRoutes');
const seoManagementRoutes = require('./routes/seoManagementRoutes');
const cloudinaryRoutes = require('./routes/cloudinaryRoutes');

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

if (process.env.NODE_ENV !== 'production') {
  connectDB().catch(console.error);
}

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

app.get('/', (req, res) => {
  res.json({ message: 'GAG Lawyers API is running' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;
