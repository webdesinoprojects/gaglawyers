# GAG Lawyers - Production-Grade Full-Stack Law Firm Website

A complete, production-ready MERN stack web application for Grover & Grover Advocates (GAG Lawyers), featuring a modern editorial design, comprehensive CMS, and advanced SEO capabilities.

## Features

### Frontend (React + Tailwind)
- 11+ responsive pages with modern, minimalist design
- Dynamic content powered by backend APIs
- SEO-optimized with meta tags, schema markup, and dynamic sitemap
- Admin panel with full content management
- Disclaimer modal with admin control
- Content protection options (right-click, text selection)
- Image gallery with lightbox
- Blog system with rich content
- Dynamic location pages for SEO (scalable to 50,000+ pages)

### Backend (Node.js + Express + MongoDB)
- RESTful API with JWT authentication
- Role-based access control (super-admin, sub-admin, editor)
- Full CRUD operations for all content types
- Image upload with validation
- Email notifications for contact forms
- Dynamic sitemap and robots.txt generation
- Comprehensive seed data

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Clone and setup**
```bash
cd gaglawyers
```

2. **Backend Setup**
```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and email settings

# Seed database with initial data
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

**Default Admin Credentials:**
- Email: `admin@gaglawyers.com`
- Password: `admin123`

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Access Points
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login

## Project Structure

```
gaglawyers/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Request handlers
│   │   ├── authController.js
│   │   ├── teamController.js
│   │   ├── serviceController.js
│   │   ├── contactController.js
│   │   ├── awardController.js
│   │   ├── galleryController.js
│   │   ├── blogController.js
│   │   ├── reviewController.js
│   │   ├── pageContentController.js
│   │   ├── locationController.js
│   │   ├── settingsController.js
│   │   ├── sitemapController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── auth.js               # JWT protection & role checks
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── TeamMember.js
│   │   ├── Service.js
│   │   ├── Award.js
│   │   ├── GalleryImage.js
│   │   ├── BlogPost.js
│   │   ├── Review.js
│   │   ├── ContactInquiry.js
│   │   ├── PageContent.js
│   │   ├── LocationPage.js
│   │   └── SiteSettings.js
│   ├── routes/                   # API routes
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── imageUpload.js
│   ├── uploads/                  # Uploaded images
│   ├── .env
│   ├── .env.example
│   ├── seed.js                   # Database seeding
│   ├── server.js                 # Express app
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── ContentProtection.jsx
│   │   │   ├── DisclaimerModal.jsx
│   │   │   ├── FAQItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SEOHead.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TeamCard.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ContactForms.jsx
│   │   │   │   ├── TeamManager.jsx
│   │   │   │   └── SiteSettings.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Firm.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Awards.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── LocationPage.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── FEATURES.md                   # This file
├── PROJECT_STRUCTURE.md
└── README.md
```

## Admin Panel Modules

### Implemented
1. **Dashboard** - Overview with statistics
2. **Team Manager** - Add/edit/delete team members
3. **Contact Forms** - View all submissions
4. **Site Settings** - Configure:
   - Disclaimer popup (enable/disable, edit text)
   - WhatsApp integration
   - Content protection
   - Contact information

### Ready for Extension
The architecture supports easy addition of:
- Awards Manager
- Gallery Manager
- Blog Manager
- Reviews Manager
- Location Pages Manager
- Page Content Editor
- SEO Manager

Each follows the same pattern:
1. Create admin page component in `frontend/src/pages/admin/`
2. Add route to `App.jsx`
3. Use existing API endpoints

## API Architecture

All APIs follow a consistent response format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": {},
  "count": 0
}
```

### Authentication
Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Design System

### Colors
- **Navy Blue** (#0B1F3A) - Primary brand color
- **Gold** (#C9A86A) - Accent color
- **White** (#FFFFFF) - Background
- **Light Grey** (#F7F9FC) - Alternate background

### Typography
- **Playfair Display** - Headings (serif)
- **Inter** - Body text (sans-serif)

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## SEO Features

### Implemented
✅ Dynamic meta tags per page
✅ Open Graph tags
✅ Twitter Card tags
✅ Schema.org JSON-LD (LegalService)
✅ Canonical URLs
✅ Dynamic sitemap.xml
✅ robots.txt with admin exclusion
✅ Location pages with SEO optimization

### Location Page SEO Structure
- **URL**: `/:service/:city` (e.g., `/criminal-lawyer/delhi-lawyer`)
- **Title**: Best [Service] in [City] | GAG Lawyers
- **H1**: Includes service + city
- **First paragraph**: Natural keyword integration
- **Scalable**: Support for 50,000+ pages

## Email Notifications

Contact form submissions automatically send email notifications to admin email (configured in `.env`).

## Security Checklist

✅ Environment variables for secrets
✅ Password hashing with bcrypt
✅ JWT token expiration
✅ CORS configured
✅ Input validation
✅ Admin route protection
✅ Role-based permissions

## Development

### Run Development Servers

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Database Seeding

Reset and seed database:
```bash
cd backend
npm run seed
```

This creates:
- Admin user (admin@gaglawyers.com / admin123)
- Sample team members (4)
- Services (6)
- Awards (3)
- Gallery images (3)
- Blog posts (2)
- Reviews (3)
- Site settings

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set strong `JWT_SECRET`
4. Configure email server credentials
5. Set production `SITE_URL`

### Build Frontend
```bash
cd frontend
npm run build
```

### Start Backend
```bash
cd backend
npm start
```

## API Documentation

See `FEATURES.md` for complete API endpoint list.

## Support

For issues or questions, contact the development team.

---

**© 2026 GAG Lawyers. All Rights Reserved.**
