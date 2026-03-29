# GAG Lawyers - Complete Feature List

## Frontend Pages

### Public Pages
1. **Home (/)** - Hero, stats, practice areas, testimonials, blog preview
2. **About (/about)** - Company overview with founder message and team preview
3. **The Firm (/firm)** - History, mission, vision, core values
4. **Our Team (/team)** - Complete team grid with bios
5. **Awards (/awards)** - Awards and affiliations showcase
6. **Gallery (/gallery)** - Image gallery with lightbox and category filtering
7. **Services (/services)** - Practice areas with sticky sidebar and FAQ
8. **Blog (/blog)** - Blog listing with featured images
9. **Blog Post (/blog/:slug)** - Single blog post view
10. **Contact (/contact)** - Contact form with map and info
11. **Location Pages (/:service/:city)** - Dynamic SEO-optimized location pages

### Admin Portal (/admin)
1. **Login** - Secure JWT-based authentication
2. **Dashboard** - Statistics and quick actions
3. **Team Manager** - Full CRUD for team members
4. **Contact Forms** - View all contact submissions
5. **Site Settings** - Global settings management
   - Disclaimer popup toggle and text editor
   - WhatsApp integration settings
   - Content protection (right-click, text selection)
   - Contact information

## Backend API Endpoints

### Public APIs
- `GET /api/team` - Fetch all team members
- `GET /api/services` - Fetch all services
- `POST /api/contact` - Submit contact form (sends email notification)
- `GET /api/awards` - Fetch all awards
- `GET /api/gallery` - Fetch gallery images (with category filter)
- `GET /api/blog` - Fetch all published blog posts
- `GET /api/blog/:slug` - Fetch single blog post
- `GET /api/reviews` - Fetch reviews (with featured filter)
- `GET /api/locations/:slug` - Fetch location page by slug
- `GET /api/pages/:pageName` - Fetch page content
- `GET /api/settings/:key` - Fetch setting by key
- `GET /sitemap.xml` - Dynamic sitemap generation
- `GET /robots.txt` - Robots.txt file

### Admin APIs (Protected)
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current admin user

- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member

- `GET /api/contact` - Get all contact submissions (admin)

- `POST /api/awards` - Create award
- `PUT /api/awards/:id` - Update award
- `DELETE /api/awards/:id` - Delete award

- `POST /api/gallery` - Create gallery image
- `PUT /api/gallery/:id` - Update gallery image
- `DELETE /api/gallery/:id` - Delete gallery image

- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

- `POST /api/locations` - Create location page
- `PUT /api/locations/:id` - Update location page
- `PATCH /api/locations/:id/toggle` - Toggle location page active status
- `DELETE /api/locations/:id` - Delete location page

- `PUT /api/pages/:pageName` - Update page content

- `GET /api/settings` - Get all settings (admin)
- `PUT /api/settings/:key` - Update setting

- `POST /api/upload` - Upload image (returns URL)

## Database Models

1. **User** - Admin authentication and role management
   - Fields: name, email, password (hashed), role (super-admin/sub-admin/editor), isActive

2. **TeamMember** - Law firm team members
   - Fields: name, designation, bio, imageUrl, order

3. **Service** - Practice areas
   - Fields: title, description, iconName

4. **Award** - Awards and recognitions
   - Fields: title, description, year, issuingBody, imageUrl, order, isPublished

5. **GalleryImage** - Image gallery
   - Fields: title, imageUrl, category, description, order, isPublished

6. **BlogPost** - Blog articles
   - Fields: title, slug, excerpt, content, featuredImage, author (ref User), category, tags, seo, isPublished, publishedAt, views

7. **Review** - Client testimonials
   - Fields: clientName, designation, content, rating, imageUrl, order, isPublished, isFeatured

8. **ContactInquiry** - Contact form submissions
   - Fields: name, email, phone, serviceOfInterest, message

9. **PageContent** - Dynamic page content management
   - Fields: pageName, sections (Map), seo, isPublished

10. **LocationPage** - Dynamic location-based SEO pages
    - Fields: service (ref), serviceName, city, slug, content, seo, isActive, views

11. **SiteSettings** - Global website settings
    - Fields: settingKey, settingValue, description

## Key Features

### SEO Optimization
- Dynamic meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Schema.org JSON-LD markup (LegalService)
- Canonical URLs
- Dynamic sitemap.xml generation
- robots.txt with admin exclusion
- Location pages with city + service keywords

### Security
- JWT-based authentication
- Role-based access control (super-admin, sub-admin, editor)
- Password hashing with bcrypt
- Protected admin routes
- CORS enabled

### Admin Features
- Full CMS for all content
- Image upload with validation
- Toggle disclaimer popup
- WhatsApp integration settings
- Content protection (disable right-click, text selection)
- Email notifications for contact forms
- Dynamic sitemap regeneration

### UI/UX
- Fully responsive (320px - 1440px)
- Tailwind CSS with custom design system
- Glassmorphism effects
- Smooth animations and micro-interactions
- Lazy loading for images
- Lightbox for gallery
- Modern editorial design

### Performance
- Optimized image loading
- Lazy loading
- Clean component architecture
- Efficient API calls

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run seed  # Creates admin user and sample data
npm run dev   # Start backend server
```

Default admin credentials: `admin@gaglawyers.com` / `admin123`

### Frontend
```bash
cd frontend
npm install
npm run dev   # Start frontend server
```

Access admin panel at: `http://localhost:5173/admin/login`

## Environment Variables

Copy `.env.example` to `.env` and configure:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_*` - Email configuration for notifications
- `SITE_URL` - Production site URL

## Technology Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Bcrypt
- Multer (file uploads)
- Nodemailer (email)

## Scalability

The location pages system is designed to handle up to 50,000+ dynamically generated pages for SEO purposes, with each page optimized for specific service + city combinations.
