# Quick Commands Reference

## 🚀 Setup & Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

# Setup environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and other settings
```

## 📦 Database Seeding

```bash
cd backend

# Seed all services (25 practice areas)
node seed-25-services.js

# Seed blogs and testimonials (5 blogs + 3 testimonials)
node seed-blogs-testimonials.js

# Generate location pages
node fix-everything.js

# Verify all data is ready
node verify-api-data.js
```

## 🏃 Running the Application

```bash
# Run backend (from backend directory)
cd backend
npm run dev
# Backend runs on http://localhost:5000

# Run frontend (from frontend directory - new terminal)
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔧 Development Commands

```bash
# Backend
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests (if configured)

# Frontend
cd frontend
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🗄️ Database Management

```bash
cd backend

# Check database content
node verify-api-data.js

# Count location pages
node count-locations.js

# Inspect database details
node detailed-db-check.js

# Find duplicate locations
node find-duplicate-locations.js

# Clean and regenerate everything
node fix-everything.js
```

## 🔐 Admin Access

```
URL: http://localhost:5173/admin/login
Email: admin@gaglawyers.com
Password: admin123

⚠️ Change password after first login!
```

## 📊 Testing Endpoints

```bash
# Test blog API
curl http://localhost:5000/api/blog?published=true

# Test services API
curl http://localhost:5000/api/services

# Test reviews API
curl http://localhost:5000/api/reviews?featured=true

# Test location pages API
curl http://localhost:5000/api/locations?limit=10

# Test specific blog post
curl http://localhost:5000/api/blog/understanding-criminal-defense-rights-india
```

## 🌐 Important URLs

### Frontend
- Homepage: `http://localhost:5173/`
- Blog: `http://localhost:5173/blog`
- Services: `http://localhost:5173/services`
- Contact: `http://localhost:5173/contact`
- Admin Login: `http://localhost:5173/admin/login`
- Admin Dashboard: `http://localhost:5173/admin/dashboard`

### Backend API
- Health Check: `http://localhost:5000/api/health`
- Services: `http://localhost:5000/api/services`
- Blog: `http://localhost:5000/api/blog`
- Reviews: `http://localhost:5000/api/reviews`
- Locations: `http://localhost:5000/api/locations`

## 🐛 Debugging

```bash
# Check if MongoDB is running
mongosh

# Check backend logs
cd backend
npm run dev
# Watch console output

# Check frontend logs
cd frontend
npm run dev
# Watch console output and browser console

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# Clear localStorage (in browser console)
localStorage.clear()
```

## 📝 Common Tasks

### Add New Blog Post
1. Go to Admin Panel → Blog Manager
2. Click "Create New Post"
3. Fill in details and content
4. Upload featured image
5. Click "Create Post"

### Add New Testimonial
1. Go to Admin Panel → Reviews
2. Click "Add Review"
3. Fill in client details
4. Upload client image
5. Check "Featured" if needed
6. Click "Add Review"

### Add New Service
1. Go to Admin Panel → Services
2. Click "Add Service"
3. Fill in service details
4. Select category and icon
5. Click "Add Service"

### Generate Location Pages
```bash
cd backend
node fix-everything.js
```

## 🔄 Reset Database

```bash
# ⚠️ WARNING: This will delete all data!

# In MongoDB shell
mongosh
use gaglawyers
db.dropDatabase()

# Then re-seed
cd backend
node seed-25-services.js
node seed-blogs-testimonials.js
node fix-everything.js
```

## 📦 Production Build

```bash
# Build frontend
cd frontend
npm run build
# Output in frontend/dist

# Build backend (if needed)
cd backend
# Backend doesn't need building, just ensure .env is configured

# Deploy
# - Upload backend to your server
# - Upload frontend/dist to your hosting
# - Configure environment variables
# - Start backend with: npm start
```

## 🔍 Verification Checklist

```bash
# 1. Check database content
cd backend
node verify-api-data.js

# 2. Test backend APIs
curl http://localhost:5000/api/health
curl http://localhost:5000/api/services
curl http://localhost:5000/api/blog

# 3. Open frontend
# Visit http://localhost:5173/
# Check homepage loads
# Check blog page loads
# Check services page loads

# 4. Test admin panel
# Visit http://localhost:5173/admin/login
# Login with admin credentials
# Check all admin pages work
```

## 💡 Tips

- Always run `verify-api-data.js` after seeding
- Keep backend and frontend running in separate terminals
- Check browser console for frontend errors
- Check terminal for backend errors
- Clear browser cache if changes don't appear
- Use MongoDB Compass for visual database inspection
- Backup database before running cleanup scripts

## 🆘 Getting Help

If you encounter issues:

1. Check `DATA_SEEDING_GUIDE.md` for detailed instructions
2. Check `backend/SEED_BLOGS_TESTIMONIALS_README.md` for blog/testimonial seeding
3. Check `CMS_QUICK_START.md` for admin panel guide
4. Run `node verify-api-data.js` to check database status
5. Check browser console and terminal for error messages
