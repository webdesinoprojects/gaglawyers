# GAG Lawyers - Complete Project Structure

## Directory Tree

```
gaglawyers/
│
├── backend/                                    # Express.js Backend API
│   ├── config/
│   │   └── db.js                              # MongoDB connection configuration
│   ├── controllers/
│   │   ├── contactController.js               # Contact inquiry logic
│   │   ├── serviceController.js               # Service/practice area logic
│   │   └── teamController.js                  # Team member logic
│   ├── models/
│   │   ├── ContactInquiry.js                  # Contact schema (name, email, phone, service, message)
│   │   ├── Service.js                         # Service schema (title, description, icon)
│   │   └── TeamMember.js                      # Team schema (name, designation, bio, image)
│   ├── routes/
│   │   ├── contactRoutes.js                   # POST /api/contact
│   │   ├── serviceRoutes.js                   # GET /api/services
│   │   └── teamRoutes.js                      # GET /api/team
│   ├── .env                                   # Environment variables
│   ├── .env.example                           # Environment template
│   ├── .gitignore                             # Git ignore rules
│   ├── package.json                           # Dependencies & scripts
│   ├── README.md                              # Backend documentation
│   ├── seed.js                                # Database seeding script
│   └── server.js                              # Main entry point
│
├── frontend/                                   # React + Vite Frontend
│   ├── public/                                # Static assets
│   ├── src/
│   │   ├── components/                        # Reusable UI components
│   │   │   ├── Button.jsx                     # Configurable button (3 variants)
│   │   │   ├── FAQItem.jsx                    # Accordion FAQ item
│   │   │   ├── Footer.jsx                     # Global footer (navy, links, social)
│   │   │   ├── Layout.jsx                     # Shared layout wrapper
│   │   │   ├── Navbar.jsx                     # Sticky navbar with glassmorphism
│   │   │   ├── ServiceCard.jsx                # Practice area card
│   │   │   ├── StatCard.jsx                   # Statistics display
│   │   │   └── TestimonialCard.jsx            # Client testimonial card
│   │   ├── pages/                             # Route page components
│   │   │   ├── About.jsx                      # /about - Firm info & team
│   │   │   ├── Contact.jsx                    # /contact - Form & contact info
│   │   │   ├── Home.jsx                       # / - Landing page
│   │   │   └── Services.jsx                   # /services - Practice areas
│   │   ├── App.jsx                            # Main app with routing
│   │   ├── index.css                          # Tailwind CSS imports
│   │   └── main.jsx                           # React entry point
│   ├── index.html                             # HTML entry with Google Fonts
│   ├── tailwind.config.js                     # Tailwind configuration
│   ├── postcss.config.js                      # PostCSS configuration
│   ├── vite.config.js                         # Vite configuration
│   ├── .gitignore                             # Git ignore rules
│   ├── package.json                           # Dependencies & scripts
│   └── README.md                              # Frontend documentation
│
├── .gitignore                                 # Root git ignore
├── GETTING_STARTED.md                         # Setup instructions
├── PROJECT_STRUCTURE.md                       # This file
├── PROJECT_SUMMARY.md                         # Project overview
└── README.md                                  # Main documentation
```

## Design System Details

### Color Palette
- **Navy Blue:** `#0B1F3A` (Primary - hero, footer, buttons)
- **Navy Dark:** `#081629` (Hover states)
- **Gold:** `#C9A86A` (Accent - active states, highlights)
- **Gold Light:** `#E6D5B8` (Subtle accents)
- **White:** `#FFFFFF` (Backgrounds, text on dark)
- **Light Grey:** `#F7F9FC` (Section backgrounds)

### Typography System
- **Headings:** Playfair Display (serif) - Elegant, authoritative
- **Body/UI:** Inter (sans-serif) - Modern, highly legible
- Configured in Tailwind as `font-serif` and `font-sans`

### Component Patterns

#### Button Variants
```jsx
<Button variant="primary">   // Solid navy
<Button variant="secondary"> // Outline navy
<Button variant="gold">      // Solid gold
```

#### Hover Effects
- Y-axis lift: `-translate-y-1` or `-translate-y-2`
- Shadow transitions: `shadow-sm` → `shadow-md` → `shadow-xl`
- Color transitions: Smooth 300ms duration

### Responsive Breakpoints
- **Mobile:** 320px - 767px (default)
- **Tablet:** 768px+ (`md:`)
- **Desktop:** 1024px+ (`lg:`)
- **Large Desktop:** 1440px+ (`xl:`)

## Page-by-Page Breakdown

### 1. Home Page (/)

**Sections:**
1. Hero Section
   - Navy background with white text
   - Large Playfair heading with gold accent
   - Two CTA buttons (gold + outline)
   - Fully responsive

2. Trust Bar
   - White background
   - 3 stat cards: "25+ Years", "1000+ Cases Won", "Top Rated"
   - Divided layout on desktop, stacked on mobile

3. Practice Areas Preview
   - Light grey background
   - 4-column grid (responsive: 1/2/4 columns)
   - ServiceCard components with icons
   - "View All Services" CTA

4. Testimonials
   - White background
   - 3-column grid (responsive: 1/3 columns)
   - Quote icon, content, author info

### 2. About Page (/about)

**Sections:**
1. Hero Banner
   - Navy background
   - "The Firm" heading

2. Founder's Message
   - Split-screen layout
   - Left: Professional image
   - Right: Blockquote, bio text, signature
   - Stacks vertically on mobile

3. Team Grid
   - Light grey background
   - 4-column grid (responsive: 1/2/4 columns)
   - Grayscale images → color on hover
   - "Read Bio" reveal on hover

4. Awards Strip
   - White background
   - Horizontal logo/badge layout
   - Grayscale with reduced opacity

### 3. Services Page (/services)

**Layout:**
- Two-column grid (collapses to single column on mobile)
- Left sidebar (sticky on desktop)
  - Vertical list of 6 services
  - Active state highlighting
  - Icon + text for each
- Right content area
  - Dynamic service details
  - Icon header
  - Description paragraph
  - Bulleted service list
  - "Consult a Lawyer" CTA

**FAQ Section:**
- Below main content
- 5 FAQ items in accordion
- Smooth expand/collapse animation

**Services Included:**
1. Corporate Law (Building2 icon)
2. Civil Litigation (Scale icon)
3. Real Estate Law (Home icon)
4. Family Law (Users icon)
5. Criminal Defense (Shield icon)
6. Intellectual Property (Lightbulb icon)

### 4. Contact Page (/contact)

**Layout:**
- Two-column split (stacks on mobile)

**Left Column:**
- Contact information cards:
  - Email: contact@gaglawyers.com
  - Phone: +91 98765 43210 (WhatsApp)
  - Address: New Delhi
- Dark-themed map placeholder (navy background)

**Right Column:**
- Polished inquiry form in white card
- Fields:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (required)
  - Practice Area dropdown (required)
  - Message textarea (required)
- Submit button with loading state
- Success/error message display
- **Full API integration** - POSTs to `http://localhost:5000/api/contact`

## API Endpoints Documentation

### GET /api/team
**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "...",
      "name": "Advocate Rajesh Grover",
      "designation": "Senior Partner & Founder",
      "bio": "...",
      "imageUrl": "...",
      "order": 1
    }
  ]
}
```

### GET /api/services
**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "...",
      "title": "Corporate Law",
      "description": "...",
      "iconName": "Building2",
      "order": 1
    }
  ]
}
```

### POST /api/contact
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "serviceOfInterest": "Corporate Law",
  "message": "I need consultation..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": { /* inquiry object */ }
}
```

## Technology Stack Summary

### Frontend
- **React** 18.3.1 - UI library
- **Vite** 8.0.3 - Build tool & dev server
- **React Router DOM** 7.x - Client-side routing
- **Tailwind CSS** 3.x - Utility-first styling
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - Runtime
- **Express.js** 5.2.1 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 9.3.3 - ODM
- **CORS** - Cross-origin support
- **dotenv** - Environment management
- **Nodemon** - Development auto-restart

## Testing Checklist

- ✅ Backend starts without errors
- ✅ MongoDB connects successfully
- ✅ Frontend builds and serves
- ✅ All pages load correctly
- ✅ Navigation works (all links)
- ✅ Mobile menu functions
- ✅ Contact form submits to API
- ✅ Responsive on all breakpoints
- ✅ Hover effects work smoothly
- ✅ No console errors

## Performance Features

- Vite HMR for instant development feedback
- Lazy loading potential for images
- Optimized React components
- Minimal CSS footprint with Tailwind
- Fast MongoDB queries with Mongoose

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Focus states on interactive elements
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support

---

**Project Status:** ✅ Complete and Production-Ready

All requirements met. Application is fully functional with both frontend and backend running successfully.
