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
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

connectDB();

app.use(cors());
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
app.use('/api/upload', uploadRoutes);
app.use('/', seoRoutes);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'GAG Lawyers API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
