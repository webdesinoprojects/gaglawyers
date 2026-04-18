# Service Pages System - Visual Architecture

## System Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────────┘

PUBLIC USER                                    ADMIN USER
    │                                              │
    │ Visit /services/cheque-bounce-lawyer        │ Visit /admin/services
    │                                              │
    ▼                                              ▼
┌─────────────────────┐                    ┌──────────────────────┐
│ ServicePageDynamic  │                    │  ServiceManager      │
│                     │                    │                      │
│ 1. Fetch service    │                    │ 1. List all services │
│ 2. Render sections  │                    │ 2. Select service    │
│ 3. Show only        │                    │ 3. Edit sections     │
│    visible ones     │                    │ 4. Drag-drop reorder │
└─────────────────────┘                    │ 5. Toggle visibility │
    │                                       │ 6. Save changes      │
    │ GET /api/services/:slug               └──────────────────────┘
    │                                              │
    ▼                                              │ PUT /api/services/:slug
┌─────────────────────────────────────────────────▼──────────────────┐
│                     API LAYER (Express)                             │
│                                                                     │
│  GET    /api/services              → List all (id, name, slug)    │
│  GET    /api/services/:slug        → Full page with sections      │
│  PUT    /api/services/:slug        → Update service + sections    │
│  POST   /api/services/:slug/sections → Add section                │
│  DELETE /api/services/:slug/sections/:id → Remove section         │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     DATABASE (MongoDB)                               │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ services (56 documents)                                      │  │
│  │                                                              │  │
│  │  {                                                           │  │
│  │    _id: "...",                                               │  │
│  │    name: "Cheque Bounce Lawyer",                            │  │
│  │    slug: "cheque-bounce-lawyer",                            │  │
│  │    seo: {                                                    │  │
│  │      title: "Expert Cheque Bounce Lawyers",                 │  │
│  │      metaDescription: "Professional legal assistance..."     │  │
│  │    },                                                        │  │
│  │    globalSettings: {                                         │  │
│  │      primaryColor: "#c9a84c",                                │  │
│  │      defaultCtaLink: "/contact"                              │  │
│  │    }                                                         │  │
│  │  }                                                           │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ servicesections (dynamic, many per service)                  │  │
│  │                                                              │  │
│  │  {                                                           │  │
│  │    _id: "...",                                               │  │
│  │    serviceId: "..." (ref to services),                       │  │
│  │    type: "hero",                                             │  │
│  │    visible: true,                                            │  │
│  │    order: 0,                                                 │  │
│  │    heading: "Expert Cheque Bounce Legal Services",          │  │
│  │    background: "dark",                                       │  │
│  │    content: {                                                │  │
│  │      subheading: "Professional Legal Assistance",            │  │
│  │      ctaText: "Get Free Consultation",                       │  │
│  │      ctaLink: "/contact"                                     │  │
│  │    }                                                         │  │
│  │  }                                                           │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND COMPONENTS                              │
└─────────────────────────────────────────────────────────────────────┘

PUBLIC PAGES
├── ServicePageDynamic.jsx
│   ├── Breadcrumb
│   └── sections.map(section => 
│       └── SectionRenderer
│           ├── HeroSection (if type === 'hero')
│           ├── OverviewSection (if type === 'overview')
│           ├── BenefitsSection (if type === 'benefits')
│           ├── ProcessSection (if type === 'process')
│           ├── FAQSection (if type === 'faq')
│           └── CTABannerSection (if type === 'cta_banner')

ADMIN PAGES
└── ServiceManager.jsx
    ├── Service List (sidebar)
    │   └── services.map(service => Button)
    │
    ├── SEO Editor
    │   ├── Title Input
    │   └── Meta Description Textarea
    │
    ├── Global Settings Editor
    │   ├── Primary Color Input
    │   └── Default CTA Link Input
    │
    └── Section Manager
        └── DragDropContext
            └── sections.map(section =>
                ├── Drag Handle (GripVertical)
                ├── Visibility Toggle (Eye/EyeOff)
                ├── Heading Input
                ├── Type Selector
                ├── Expand/Collapse (ChevronDown/Up)
                ├── Content Editor (JSON textarea)
                └── Delete Button (Trash2)
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ADMIN CREATES CONTENT                            │
└─────────────────────────────────────────────────────────────────────┘

1. Admin selects service
   └─> GET /api/services/:slug
       └─> Returns service + all sections

2. Admin adds/edits sections
   ├─> Add section button
   ├─> Edit heading (free text)
   ├─> Edit content (JSON)
   ├─> Drag to reorder
   └─> Toggle visibility

3. Admin saves
   └─> PUT /api/services/:slug
       ├─> Updates service.seo
       ├─> Updates service.globalSettings
       └─> Replaces all sections
           ├─> DELETE old sections
           └─> INSERT new sections

┌─────────────────────────────────────────────────────────────────────┐
│                     USER VIEWS CONTENT                               │
└─────────────────────────────────────────────────────────────────────┘

1. User visits /services/:slug
   └─> GET /api/services/:slug
       └─> Returns service + visible sections (sorted by order)

2. Frontend renders
   └─> sections.map(section =>
       └─> SectionRenderer
           └─> Renders appropriate component based on section.type
               ├─> Uses section.heading for title
               ├─> Uses section.content for data
               └─> Uses section.background for styling
```

## Section Type Mapping

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SECTION TYPES                                    │
└─────────────────────────────────────────────────────────────────────┘

type: "hero"
├─> Component: HeroSection.jsx
├─> Content: { subheading, ctaText, ctaLink, backgroundImageUrl }
└─> Renders: Full-width hero banner with CTA button

type: "overview"
├─> Component: OverviewSection.jsx
├─> Content: { body }
└─> Renders: Text section with icon

type: "benefits"
├─> Component: BenefitsSection.jsx
├─> Content: { items: [{ icon, title, description }] }
└─> Renders: Grid of benefit cards

type: "process"
├─> Component: ProcessSection.jsx
├─> Content: { steps: [{ stepNumber, title, description }] }
└─> Renders: Numbered step-by-step process

type: "faq"
├─> Component: FAQSection.jsx
├─> Content: { items: [{ question, answer }] }
└─> Renders: Accordion with Q&A

type: "cta_banner"
├─> Component: CTABannerSection.jsx
├─> Content: { body, buttonText, buttonLink }
└─> Renders: Full-width CTA banner

type: "audience"
├─> Component: AudienceSection.jsx (to be created)
├─> Content: { body, tags: [] }
└─> Renders: Target audience section with tags

type: "pricing"
├─> Component: PricingSection.jsx (to be created)
├─> Content: { tiers: [{ name, price, features, highlighted }] }
└─> Renders: Pricing table/cards

type: "testimonials"
├─> Component: TestimonialsSection.jsx (to be created)
├─> Content: { items: [{ name, role, quote, photoUrl }] }
└─> Renders: Testimonial cards/carousel

type: "footer_note"
├─> Component: FooterNoteSection.jsx (to be created)
├─> Content: { text }
└─> Renders: Disclaimer/note at bottom
```

## Admin Panel Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SERVICE MANAGER                                  │
│                                                                      │
│  ┌──────────────┬──────────────────────────────────────────────┐   │
│  │              │                                               │   │
│  │  SERVICES    │              EDITOR                           │   │
│  │              │                                               │   │
│  │ ┌──────────┐ │  ┌─────────────────────────────────────────┐ │   │
│  │ │ Service 1│ │  │ SEO SETTINGS                            │ │   │
│  │ └──────────┘ │  │ ┌─────────────────────────────────────┐ │ │   │
│  │ ┌──────────┐ │  │ │ Title: [                          ] │ │ │   │
│  │ │ Service 2│ │  │ │ Meta: [                           ] │ │ │   │
│  │ └──────────┘ │  │ └─────────────────────────────────────┘ │ │   │
│  │ ┌──────────┐ │  └─────────────────────────────────────────┘ │   │
│  │ │ Service 3│ │                                               │   │
│  │ └──────────┘ │  ┌─────────────────────────────────────────┐ │   │
│  │      ...     │  │ GLOBAL SETTINGS                         │ │   │
│  │ ┌──────────┐ │  │ ┌─────────────────────────────────────┐ │ │   │
│  │ │ Service  │ │  │ │ Primary Color: [#c9a84c           ] │ │ │   │
│  │ │    56    │ │  │ │ Default CTA: [/contact            ] │ │ │   │
│  │ └──────────┘ │  │ └─────────────────────────────────────┘ │ │   │
│  │              │  └─────────────────────────────────────────┘ │   │
│  │              │                                               │   │
│  │              │  ┌─────────────────────────────────────────┐ │   │
│  │              │  │ SECTIONS              [+ Add Section]   │ │   │
│  │              │  │                                         │ │   │
│  │              │  │ ⋮⋮ 👁 [Hero Section        ] [hero ▼] ▼ 🗑│ │   │
│  │              │  │    Heading: Expert Legal Services       │ │   │
│  │              │  │    Content: { ... }                     │ │   │
│  │              │  │                                         │ │   │
│  │              │  │ ⋮⋮ 👁 [Overview           ] [overview▼] ▼ 🗑│ │   │
│  │              │  │                                         │ │   │
│  │              │  │ ⋮⋮ 👁 [Benefits           ] [benefits▼] ▼ 🗑│ │   │
│  │              │  │                                         │ │   │
│  │              │  └─────────────────────────────────────────┘ │   │
│  │              │                                               │   │
│  │              │                    [💾 Save Changes]          │   │
│  └──────────────┴──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

Legend:
⋮⋮ = Drag handle
👁 = Visibility toggle
▼ = Expand/collapse
🗑 = Delete
```

## File Organization

```
project/
│
├── backend/
│   ├── models/
│   │   ├── Service.js ..................... Minimal service model
│   │   └── ServiceSection.js .............. Section model (10 types)
│   │
│   ├── controllers/
│   │   └── serviceController.js ........... 5 API endpoints
│   │
│   ├── routes/
│   │   └── serviceRoutes.js ............... Route definitions
│   │
│   └── migrations/
│       ├── inspect-service-related-collections.js
│       ├── cleanup-services-schema.js
│       └── final-cleanup-services.js
│
└── frontend/
    └── src/
        ├── components/
        │   └── sections/
        │       ├── HeroSection.jsx ......... Hero banner
        │       ├── OverviewSection.jsx ..... Text section
        │       ├── BenefitsSection.jsx ..... Benefit cards
        │       ├── ProcessSection.jsx ...... Step-by-step
        │       ├── FAQSection.jsx .......... FAQ accordion
        │       ├── CTABannerSection.jsx .... CTA banner
        │       └── SectionRenderer.jsx ..... Main renderer
        │
        └── pages/
            ├── ServicePageDynamic.jsx ...... Public service page
            └── admin/
                └── ServiceManager.jsx ...... Admin panel
```

## Key Concepts

### 1. Separation of Concerns
```
Service (Core Data)
├── id, name, slug (preserved from existing)
├── seo (per-service SEO)
└── globalSettings (per-service settings)

ServiceSection (Content)
├── serviceId (links to service)
├── type (determines component)
├── visible (show/hide)
├── order (position)
├── heading (admin-controlled text)
└── content (flexible JSON)
```

### 2. Flexibility
```
Content Field (JSON)
└── Supports ANY structure based on section type
    ├── Hero: { subheading, ctaText, ctaLink, backgroundImageUrl }
    ├── Benefits: { items: [...] }
    ├── Process: { steps: [...] }
    └── FAQ: { items: [...] }
```

### 3. Admin Control
```
Admin Can:
├── Add sections (any type)
├── Remove sections
├── Reorder sections (drag-drop)
├── Toggle visibility (hide/show)
├── Edit headings (free text)
├── Edit content (JSON)
└── Configure SEO per service
```

### 4. Frontend Rendering
```
Render Logic:
├── Fetch service + sections
├── Filter: only visible sections
├── Sort: by order field
├── Map: section.type → Component
└── Render: with section.heading + section.content
```

---

**This architecture ensures:**
- ✅ Zero hardcoded content
- ✅ Full admin control
- ✅ Flexible content structure
- ✅ Easy to extend
- ✅ Works for all 56 services
- ✅ Clean separation of concerns
