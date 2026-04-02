# Legal Services Pages Implementation Guide

## Overview

I've created a **data-driven, scalable system** for implementing all 20 legal service pages for Grover & Grover Advocates. The system uses:

- ✅ **Reusable Components** - No code duplication
- ✅ **Dynamic Routing** - One page template for all services
- ✅ **Centralized Data** - Easy to manage and update
- ✅ **Professional UI** - Navy (#1a2744) + Gold (#c9a84c) color scheme
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **SEO Ready** - Structured data and meta tags

---

## 🎯 Current Status

### ✅ Completed (3 Services):
1. **Bail Lawyer** - `/bail-lawyer-in-delhi`
2. **Cheque Bounce Lawyer** - `/cheque-bounce-lawyer-in-delhi`
3. **Civil Lawyer** - `/civil-lawyer-in-delhi`

### 📝 Remaining (17 Services):
4. Contract Dispute Lawyer
5. Criminal Lawyer
6. Divorce Lawyer
7. Employment Lawyer
8. Immigration Lawyer
9. Legal Notice Expertise
10. Armed Forces Tribunal (AFT) Lawyer
11. CAT Matters Lawyer
12. Corporate Lawyer
13. Cyber Crime Lawyer
14. DRT Lawyer (Debt Recovery)
15. Family Lawyer
16. High Court Lawyer
17. Insolvency & Bankruptcy Lawyer
18. Insurance Lawyer
19. Landlord-Tenant Lawyer
20. Mediation & Arbitration Lawyer

---

## 📁 File Structure

```
frontend/src/
├── components/
│   └── service/
│       ├── FAQAccordion.jsx          # Collapsible FAQ component
│       ├── DocumentChecklist.jsx     # Document requirements with checkboxes
│       ├── CaseCard.jsx              # Popular cases display
│       └── ConsultationForm.jsx      # Sticky sidebar form
├── data/
│   └── servicesData.js               # ALL service content (main data file)
├── pages/
│   └── ServiceDetail.jsx             # Dynamic page template
└── App.jsx                           # Routing configuration
```

---

## 🚀 How to Add Remaining Services

### Step 1: Add Service Data

Open `frontend/src/data/servicesData.js` and add each service following this template:

```javascript
'service-slug-here': {
  title: 'Page Title',
  subtitle: 'Short description',
  metaTitle: 'SEO Meta Title',
  metaDescription: 'SEO Meta Description',
  
  hero: {
    title: 'Hero Title',
    subtitle: 'Hero Subtitle',
    cta: 'Get Free Consultation'
  },

  about: {
    title: 'About [Service Name]',
    content: 'Main description paragraph...',
    sections: [
      {
        heading: 'Section Heading',
        points: [
          'Point 1',
          'Point 2'
        ]
      }
    ]
  },

  typesOfBail: {  // or typesOfCases depending on service
    title: 'Types Title',
    description: 'Description text',
    types: [
      {
        name: 'Type Name',
        description: 'Type description'
      }
    ]
  },

  actsProvisions: {
    title: 'Acts & Provisions',
    items: [
      'Act/Provision 1',
      'Act/Provision 2'
    ]
  },

  filingProcedure: {
    title: 'Filing Procedure',
    steps: [
      'Step 1',
      'Step 2'
    ]
  },

  documentsRequired: {
    title: 'Documents Required',
    documents: [
      'Document 1',
      'Document 2'
    ]
  },

  roleOfLawyers: {
    title: 'Role of Our Lawyers',
    description: 'Description of what lawyers do...'
  },

  howWeHelp: {
    title: 'How Grover & Grover Helps',
    description: 'Firm-specific help description...'
  },

  popularCases: {
    title: 'Popular Cases',
    cases: [
      'Case Name 1 (Year) - Description',
      'Case Name 2 (Year) - Description'
    ]
  },

  faqs: [
    {
      question: 'Question 1?',
      answer: 'Answer 1.'
    },
    {
      question: 'Question 2?',
      answer: 'Answer 2.'
    }
  ]
}
```

### Step 2: That's It!

The routing is already configured in `App.jsx`. Once you add the data, the page automatically works.

---

## 🎨 Components Explained

### 1. **FAQAccordion** (`FAQAccordion.jsx`)
- Collapsible FAQ section
- Click to expand/collapse
- Animated transitions
- Gold accent on hover

**Usage in data:**
```javascript
faqs: [
  { question: '...', answer: '...' }
]
```

### 2. **DocumentChecklist** (`DocumentChecklist.jsx`)
- Displays required documents
- Checkmark icons
- Clean, professional layout

**Usage in data:**
```javascript
documentsRequired: {
  title: 'Documents Required',
  documents: ['Doc 1', 'Doc 2']
}
```

### 3. **CaseCard** (`CaseCard.jsx`)
- Displays popular court cases
- Numbered cards
- Hover effects

**Usage in data:**
```javascript
popularCases: {
  title: 'Popular Cases',
  cases: ['Case 1', 'Case 2']
}
```

### 4. **ConsultationForm** (`ConsultationForm.jsx`)
- Sticky sidebar form
- Submits to your existing contact API
- Office details included
- Quick links section

---

## 🔧 Customization Guide

### Update Contact Information

Edit `ConsultationForm.jsx`:

```javascript
// Line 95-115
<MapPin /> Address: "Your actual address"
<Phone /> Phone: "+91 YOUR-NUMBER"
<Mail /> Email: "your-email@domain.com"
```

### Update Color Scheme

Current colors in all components:
- **Navy:** `#1a2744` (Primary)
- **Gold:** `#c9a84c` (Accent)
- **Light Gray:** `#f5f5f5` (Background)

To change: Find and replace hex codes in:
- `ServiceDetail.jsx`
- `FAQAccordion.jsx`
- `DocumentChecklist.jsx`
- `CaseCard.jsx`
- `ConsultationForm.jsx`

### Add More Sections

To add custom sections, edit `ServiceDetail.jsx` around line 150-200 and add your section rendering logic.

Example:
```javascript
{service.yourNewSection && (
  <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
    <h2>{service.yourNewSection.title}</h2>
    <p>{service.yourNewSection.content}</p>
  </section>
)}
```

---

## 📊 Data Structure Flexibility

### Optional Fields

All fields are optional. The page only renders sections that have data. This means you can have different content for different services:

- Service A: Has `typesOfBail` ✅
- Service B: Has `typesOfCases` ✅
- Service C: Has neither ✅

### Adding New Service Types

Some services need different structures (like "What to Do When Cheque Bounces"). Add them to your service data:

```javascript
whatToDo: {
  title: 'What to Do When...',
  steps: ['Step 1', 'Step 2']
}
```

Then add rendering logic in `ServiceDetail.jsx`:

```javascript
{service.whatToDo && (
  <section>
    <h2>{service.whatToDo.title}</h2>
    {service.whatToDo.steps.map((step, i) => (
      <div key={i}>{step}</div>
    ))}
  </section>
)}
```

---

## 🧪 Testing Your Service Pages

### 1. Navigate to the URL
```
http://localhost:5173/bail-lawyer-in-delhi
http://localhost:5173/cheque-bounce-lawyer-in-delhi
http://localhost:5173/civil-lawyer-in-delhi
```

### 2. Test Responsiveness
- Desktop (1920px)
- Tablet (768px)
- Mobile (375px)

### 3. Test Form Submission
- Fill consultation form
- Check backend receives data

### 4. Test FAQ Accordion
- Click to expand/collapse
- Verify smooth animations

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- 2-column layout (content 2/3, sidebar 1/3)
- Sticky sidebar
- Full-width hero

### Tablet (768px-1024px)
- 2-column layout
- Sidebar stacks below on smaller tablets

### Mobile (<768px)
- Single column
- Form appears inline
- Touch-friendly buttons

---

## 🔍 SEO Configuration

Each service has:

```javascript
metaTitle: 'Best [Service] Lawyers in Delhi | Grover & Grover'
metaDescription: 'Expert [service] lawyers. [Key benefits]. Call now!'
```

### To Add Schema Markup

Add to `ServiceDetail.jsx` in the `<head>`:

```javascript
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": service.title,
  "description": service.metaDescription,
  "provider": {
    "@type": "Attorney",
    "name": "Grover & Grover Advocates"
  }
})}
</script>
```

---

## 🚀 Quick Start Checklist

- [ ] 1. Review the 3 completed examples
- [ ] 2. Copy content from your original request
- [ ] 3. Add service data to `servicesData.js` (one at a time)
- [ ] 4. Test each service page
- [ ] 5. Update contact information in `ConsultationForm.jsx`
- [ ] 6. Add meta tags for SEO
- [ ] 7. Test all responsive breakpoints
- [ ] 8. Verify form submissions work

---

## 💡 Pro Tips

1. **Start with one service at a time** - Don't try to add all 17 at once
2. **Test immediately** - After adding each service, test the page
3. **Keep formatting consistent** - Follow the example structure exactly
4. **Use real content** - The content from your original request is ready to paste
5. **Proofread** - Check for typos before adding to data file

---

## 🆘 Troubleshooting

### "Service Not Found" Error
- Check slug matches route in `App.jsx`
- Verify slug exists in `servicesData.js`
- Ensure no typos in slug

### Sidebar Not Sticky
- Check CSS classes on sidebar wrapper
- Verify `sticky top-24` classes are present

### Form Not Submitting
- Check API_BASE_URL in `config/api.js`
- Verify backend contact endpoint is working
- Check browser console for errors

### Content Not Showing
- Verify field names match exactly
- Check for missing commas in data object
- Ensure JSON structure is valid

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify all imports are correct
3. Ensure backend API is running
4. Check network tab for failed requests

---

## 🎉 You're All Set!

The system is designed to be:
- ✅ Easy to maintain
- ✅ Scalable
- ✅ Professional
- ✅ SEO-friendly
- ✅ Mobile-responsive

Just add your content to `servicesData.js` and the pages will work automatically!

---

**Created by:** Cursor AI Assistant  
**Date:** April 2026  
**Version:** 1.0
