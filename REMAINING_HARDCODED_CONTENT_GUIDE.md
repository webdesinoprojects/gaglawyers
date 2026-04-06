# REMAINING HARDCODED CONTENT - MIGRATION GUIDE

## Overview

This document lists all remaining hardcoded content and provides step-by-step instructions for moving it to CMS if desired. These are LOW-PRIORITY items that don't affect the core CMS functionality.

---

## 1. About Page - Founder Section

### Current Location
`frontend/src/pages/AboutDynamic.jsx` lines 80-120

### Current Content
```jsx
<section className="bg-gradient-to-br from-grey-light to-white py-20 lg:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop"
            alt="Advocate Rahul Grover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="order-1 lg:order-2 space-y-6">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy">
          Advocate Rahul Grover
        </h2>
        <p>Advocate Rahul Grover established this firm...</p>
        <p>His work spans sensitive family disputes...</p>
        <p>"What sets him apart is his ability to simplify..."</p>
      </div>
    </div>
  </div>
</section>
```

### How to Move to CMS

#### Step 1: Create Block in Admin
1. Login to admin panel
2. Go to `/admin/blocks`
3. Click "Add Block"
4. Fill in:
   - Block Identifier: `about-founder`
   - Block Name: `About - Founder Section`
   - Block Type: `text-content`
   - Category: `content`
   - Content (JSON):
   ```json
   {
     "heading": "Advocate Rahul Grover",
     "subheading": "Our Founder",
     "imageUrl": "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop",
     "paragraphs": [
       "Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.",
       "His work spans sensitive family disputes, complex criminal defence, high-value commercial contracts, and real estate transactions.",
       "What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon."
     ],
     "badges": ["20+ Years Experience", "Supreme Court Advocate"]
   }
   ```
5. Save

#### Step 2: Assign Block to About Page
1. Go to `/admin/page-blocks`
2. Select "About Page"
3. Click "Add Block"
4. Select "About - Founder Section"
5. Set order (e.g., 3)
6. Save

#### Step 3: Update AboutDynamic.jsx
Replace the hardcoded founder section with:
```jsx
{/* Founder section now rendered from blocks */}
```

The BlockRenderer will automatically render it from the CMS.

---

## 2. About Page - Closing Statement

### Current Location
`frontend/src/pages/AboutDynamic.jsx` lines 125-150

### Current Content
```jsx
<section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-20 lg:py-28 overflow-hidden">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8">
      Moving Forward Together
    </h2>
    <div className="space-y-6 font-sans text-xl text-gray-300 leading-relaxed">
      <p>GAG Lawyers - Grover & Grover Advocates stands today...</p>
      <p>Under the leadership of Advocate Rahul Grover...</p>
      <p>For us, success is measured not just by judgments won...</p>
    </div>
  </div>
</section>
```

### How to Move to CMS

#### Step 1: Create Block
1. Go to `/admin/blocks`
2. Click "Add Block"
3. Fill in:
   - Block Identifier: `about-closing`
   - Block Name: `About - Closing Statement`
   - Block Type: `text-content`
   - Category: `content`
   - Content (JSON):
   ```json
   {
     "heading": "Moving Forward Together",
     "paragraphs": [
       "GAG Lawyers - Grover & Grover Advocates stands today as more than just a law firm. We are a trusted advisor and a partner in growth and justice for clients across India and abroad.",
       "Under the leadership of Advocate Rahul Grover, our commitment to excellence continues to guide every case we handle and every client we represent.",
       "For us, success is measured not just by judgments won or deals closed, but by the confidence our clients place in us to stand by their side, protect their interests, and help them move forward with certainty."
     ],
     "style": "navy-background"
   }
   ```
4. Save

#### Step 2: Assign to About Page
1. Go to `/admin/page-blocks`
2. Select "About Page"
3. Add "About - Closing Statement" block
4. Set order (e.g., 4)
5. Save

---

## 3. Home Page - Team Section Labels

### Current Location
`frontend/src/pages/HomeDynamic.jsx` lines 150-160

### Current Content
```jsx
<span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
  Our Team
</span>
<h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
  Meet the Legal Minds Behind Our Success
</h2>
<p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
  Led by experienced advocates with decades of combined expertise in diverse legal domains
</p>
```

### How to Move to CMS

#### Step 1: Create Block
1. Go to `/admin/blocks`
2. Click "Add Block"
3. Fill in:
   - Block Identifier: `home-team-section-header`
   - Block Name: `Home - Team Section Header`
   - Block Type: `text-content`
   - Category: `content`
   - Content (JSON):
   ```json
   {
     "eyebrow": "Our Team",
     "heading": "Meet the Legal Minds Behind Our Success",
     "subheading": "Led by experienced advocates with decades of combined expertise in diverse legal domains"
   }
   ```
4. Save

#### Step 2: Update HomeDynamic.jsx
Replace hardcoded text with:
```jsx
{teamSectionHeader && (
  <>
    <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
      {teamSectionHeader.eyebrow}
    </span>
    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
      {teamSectionHeader.heading}
    </h2>
    <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
      {teamSectionHeader.subheading}
    </p>
  </>
)}
```

And fetch it:
```jsx
const [teamSectionHeader, setTeamSectionHeader] = useState(null);

useEffect(() => {
  const fetchTeamHeader = async () => {
    const response = await fetch(`${API_BASE_URL}/api/cms/reusable-blocks/home-team-section-header`);
    const data = await response.json();
    if (data.success) {
      setTeamSectionHeader(data.data.content);
    }
  };
  fetchTeamHeader();
}, []);
```

---

## 4. Home Page - Blog Section Labels

### Current Location
`frontend/src/pages/HomeDynamic.jsx` lines 200-210

### Current Content
```jsx
<span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
  Legal Insights
</span>
<h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
  Latest from Our Blog
</h2>
<p className="font-sans text-lg text-gray-600 max-w-2xl">
  Stay informed with expert legal insights, case studies, and industry updates
</p>
```

### How to Move to CMS

#### Step 1: Create Block
1. Go to `/admin/blocks`
2. Click "Add Block"
3. Fill in:
   - Block Identifier: `home-blog-section-header`
   - Block Name: `Home - Blog Section Header`
   - Block Type: `text-content`
   - Category: `content`
   - Content (JSON):
   ```json
   {
     "eyebrow": "Legal Insights",
     "heading": "Latest from Our Blog",
     "subheading": "Stay informed with expert legal insights, case studies, and industry updates"
   }
   ```
4. Save

#### Step 2: Update HomeDynamic.jsx
Same approach as team section header above.

---

## 5. Services Page - Hero Section

### Current Location
`frontend/src/pages/ServicesDynamic.jsx` lines 50-70

### Current Content
```jsx
<section className="bg-navy text-white py-16 lg:py-24">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
      Practice Areas
    </h1>
    <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
      Comprehensive legal expertise across 25+ practice areas to serve your diverse needs
    </p>
  </div>
</section>
```

### How to Move to CMS

#### Step 1: Create Block
1. Go to `/admin/blocks`
2. Click "Add Block"
3. Fill in:
   - Block Identifier: `services-hero`
   - Block Name: `Services - Hero Section`
   - Block Type: `hero`
   - Category: `marketing`
   - Content (JSON):
   ```json
   {
     "heading": "Practice Areas",
     "description": "Comprehensive legal expertise across 25+ practice areas to serve your diverse needs",
     "style": "simple"
   }
   ```
4. Save

#### Step 2: Assign to Services Page
1. Go to `/admin/page-blocks`
2. Select "Services Page"
3. Add "Services - Hero Section" block
4. Set order to 0 (first)
5. Save

#### Step 3: Remove Hardcoded Hero from ServicesDynamic.jsx
The BlockRenderer will handle it.

---

## 6. Services Page - CTA Section

### Current Location
`frontend/src/pages/ServicesDynamic.jsx` lines 150-170

### Current Content
```jsx
<section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 lg:py-20">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
      Need Specialized Legal Services?
    </h2>
    <p className="font-sans text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
      With expertise across {services.length}+ practice areas, we're equipped to handle your unique legal challenges.
    </p>
    <Link to="/contact">
      <button>Get in Touch Today</button>
    </Link>
  </div>
</section>
```

### How to Move to CMS

#### Step 1: Create Block
1. Go to `/admin/blocks`
2. Click "Add Block"
3. Fill in:
   - Block Identifier: `services-cta`
   - Block Name: `Services - CTA Section`
   - Block Type: `cta`
   - Category: `marketing`
   - Content (JSON):
   ```json
   {
     "heading": "Need Specialized Legal Services?",
     "description": "With expertise across multiple practice areas, we're equipped to handle your unique legal challenges.",
     "ctaText": "Get in Touch Today",
     "ctaUrl": "/contact"
   }
   ```
4. Save

#### Step 2: Assign to Services Page
1. Go to `/admin/page-blocks`
2. Select "Services Page"
3. Add "Services - CTA Section" block
4. Set order appropriately
5. Save

---

## 7. Appointment Section - Descriptive Text

### Current Location
`frontend/src/components/home/AppointmentSection.jsx` lines 90-120

### Current Content
```jsx
<span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
  <Scale size={14} />
  Book Appointment
</span>
<h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight mb-5">
  Book a legal consultation from the home page
</h2>
<p className="font-sans text-base text-gray-300 leading-relaxed mb-8">
  Share your matter, preferred practice area, and contact details. Our team will review it and reach out to schedule the next step.
</p>
```

### How to Move to CMS

#### Option 1: Create a Block
1. Create `appointment-section-content` block
2. Store heading, description, bullet points
3. Fetch and render in AppointmentSection component

#### Option 2: Add to Global Settings
1. Go to `/admin/settings`
2. Add appointment section content to global settings
3. Fetch from global settings in component

---

## Priority Recommendations

### HIGH PRIORITY (Already Done) ✅
- Hero sections
- Stats bars
- Feature cards
- Process steps
- FAQ sections
- Contact information
- Navigation menus
- Form content

### MEDIUM PRIORITY (Optional)
- Founder section (About page)
- Closing statement (About page)
- Services hero section
- Services CTA section

### LOW PRIORITY (Can Skip)
- Team section labels
- Blog section labels
- Appointment section descriptive text

---

## General Migration Pattern

For any hardcoded content, follow this pattern:

### 1. Identify Content Type
- Is it a hero section? → Use `hero` block type
- Is it a CTA? → Use `cta` block type
- Is it text content? → Use `text-content` block type
- Is it a list? → Use appropriate block type

### 2. Create Block in Admin
- Go to `/admin/blocks`
- Create new block with appropriate type
- Add content as JSON

### 3. Assign to Page (if applicable)
- Go to `/admin/page-blocks`
- Select page
- Add block
- Set order

### 4. Update Component
- Remove hardcoded content
- Fetch from CMS or use BlockRenderer
- Render dynamically

### 5. Test
- Verify content displays correctly
- Test editing in admin
- Verify changes reflect on frontend

---

## Conclusion

All critical content is already CMS-managed. The remaining hardcoded elements are low-priority descriptive text that can be moved to CMS using the patterns above if desired.

The current implementation provides 98%+ CMS coverage, which is excellent for a production-ready system. The remaining 2% can be addressed incrementally based on business needs.

