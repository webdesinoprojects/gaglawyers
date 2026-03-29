# GAG Lawyers - Frontend

Premium, modern frontend web application for GAG Lawyers (Grover & Grover Advocates) built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

## Design System

### Colors

- **Primary (Navy Blue):** `#0B1F3A` - Hero backgrounds, footers, primary buttons
- **Secondary:** `#FFFFFF` (Pure White) and `#F7F9FC` (Light Grey)
- **Accent (Gold):** `#C9A86A` - Active states, subtle highlights

### Typography

- **Headings:** Playfair Display (serif)
- **Body Text:** Inter (sans-serif)

### UI Principles

- Mobile-first responsive design
- Generous whitespace
- Subtle shadows and smooth micro-interactions
- Glassmorphism effects on navbar
- Hover states with gentle Y-axis lift

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will run on `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── FAQItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── StatCard.jsx
│   │   └── TestimonialCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Pages

### Home (/)
- Dramatic hero section with CTA buttons
- Trust/stats bar
- Practice areas preview grid
- Testimonials section

### About (/about)
- Firm overview hero
- Founder's message with split-screen layout
- Team member grid with hover effects
- Awards and affiliations strip

### Services (/services)
- Sticky sidebar navigation
- Dynamic service content area
- FAQ accordion

### Contact (/contact)
- Split layout with contact info and form
- Map placeholder
- API-integrated inquiry form

## Component Architecture

All components follow a modular, reusable pattern:

- **Button** - Configurable button with variants (primary, secondary, gold)
- **ServiceCard** - Practice area display card
- **TeamCard** - Team member profile card with hover reveal
- **TestimonialCard** - Client testimonial display
- **StatCard** - Statistics/metrics display
- **FAQItem** - Accordion item for FAQs
- **Layout** - Wrapper with Navbar and Footer
- **Navbar** - Sticky navigation with glassmorphism
- **Footer** - Deep navy footer with links and contact info

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

## License

ISC
