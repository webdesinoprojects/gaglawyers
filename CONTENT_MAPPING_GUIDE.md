# Content Mapping Guide - From Your Request to Code

## 🎯 Purpose

This guide shows you **exactly** how to take the content from your original request and transform it into the `servicesData.js` format.

---

## 📖 Example: Adding CRIMINAL LAWYER Service

### Your Original Content Says:

```
### 5. CRIMINAL LAWYER
URL slug: /criminal-lawyer-in-delhi

**Hero:** Top Criminal Defence Lawyers in Delhi | High Court & Supreme Court
**Subtitle:** Experienced criminal defence attorneys protecting your rights...

**About Criminal Law:**
Criminal law in India is governed by the Indian Penal Code (IPC)...

**Types of Criminal Cases:**
- **Cognizable Offences:** Serious crimes...
- **Non-cognizable Offences:** Less serious...
- **Theft (Section 378 IPC):** Imprisonment up to 3 years

**Major Laws:**
- Indian Penal Code, 1860
- Code of Criminal Procedure

**Filing Process:**
1. Complaint / FIR filed
2. Police investigation
3. Charge sheet filed

**Documents Required:**
- FIR / First Information Report
- Charge sheet
- Arrest warrant

**Role of Our Lawyers:**
Represent accused in court...

**How Grover & Grover Helps:**
We represent clients in all criminal proceedings...

**Popular Cases:**
- State of Karnataka vs. Krishnappa (SC)
- State of Uttar Pradesh vs. Ram Chandra (SC)

**FAQ:**
Q: What is criminal law? A: Law dealing with crimes and punishment
Q: Examples of offences? A: Murder, rape, theft, fraud
```

---

### You Convert It To:

```javascript
'criminal-lawyer-in-delhi': {
  // 1. BASIC INFO (from Hero + meta)
  title: 'Top Criminal Defence Lawyers in Delhi',
  subtitle: 'Experienced criminal defence attorneys protecting your rights at every stage.',
  metaTitle: 'Top Criminal Defence Lawyers in Delhi | High Court & Supreme Court',
  metaDescription: 'Expert criminal defence lawyers in Delhi. Representing clients in HC and SC.',
  
  // 2. HERO SECTION (from Hero)
  hero: {
    title: 'Top Criminal Defence Lawyers in Delhi | High Court & Supreme Court',
    subtitle: 'Experienced criminal defence attorneys protecting your rights at every stage of criminal proceedings.',
    cta: 'Get Free Consultation'
  },

  // 3. ABOUT SECTION (from "About Criminal Law")
  about: {
    title: 'About Criminal Law',
    content: 'Criminal law in India is governed by the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), and the Evidence Act. It defines offences and prescribes punishments.'
  },

  // 4. TYPES SECTION (from "Types of Criminal Cases")
  typesOfCases: {
    title: 'Types of Criminal Cases',
    cases: [
      {
        name: 'Cognizable Offences',
        description: 'Serious crimes requiring immediate police action (murder, rape, robbery, kidnapping)'
      },
      {
        name: 'Non-cognizable Offences',
        description: 'Less serious, no immediate police action required'
      },
      {
        name: 'Theft (Section 378 IPC)',
        description: 'Imprisonment up to 3 years + fine'
      }
    ]
  },

  // 5. ACTS & PROVISIONS (from "Major Laws")
  actsProvisions: {
    title: 'Major Laws',
    items: [
      'Indian Penal Code, 1860 (now Bharatiya Nyaya Sanhita, 2023)',
      'Code of Criminal Procedure (now Bharatiya Nagarik Suraksha Sanhita)',
      'Indian Evidence Act (now Bharatiya Sakshya Adhiniyam)',
      'Sexual Harassment of Women at Workplace Act, 2013',
      'NDPS Act, POCSO Act, Prevention of Corruption Act'
    ]
  },

  // 6. FILING PROCEDURE (from "Filing Process")
  filingProcedure: {
    title: 'Filing Process',
    steps: [
      'Complaint / FIR filed at police station',
      'Police investigation',
      'Charge sheet filed in court',
      'Arrest warrant if needed',
      'Bail application',
      'Trial proceedings',
      'Judgment',
      'Appeal (if required)'
    ]
  },

  // 7. DOCUMENTS (from "Documents Required")
  documentsRequired: {
    title: 'Documents Required',
    documents: [
      'FIR / First Information Report',
      'Charge sheet',
      'Arrest warrant (if applicable)',
      'Search and seizure warrant',
      'Bail application',
      'Judgment (for appeals)',
      'Evidence: witness statements, photographs, videos, documents'
    ]
  },

  // 8. ROLE OF LAWYERS (from "Role of Our Lawyers")
  roleOfLawyers: {
    title: 'Role of Our Lawyers',
    description: 'Represent accused in court, provide legal advice, advise on rights and evidence, guide how to handle police interactions, prepare defence strategy, gather evidence, ensure fair trial, reduce severity of punishment, prevent false conviction.'
  },

  // 9. HOW WE HELP (from "How Grover & Grover Helps")
  howWeHelp: {
    title: 'How Grover & Grover Helps',
    description: 'We represent clients in all criminal proceedings from filing to final judgment. We consult on best course of action, appear at pre-trial hearings, negotiate plea deals, handle appeals, parole hearings, post-conviction matters, and ensure client rights are protected throughout.'
  },

  // 10. POPULAR CASES (from "Popular Cases")
  popularCases: {
    title: 'Popular Cases',
    cases: [
      'State of Karnataka vs. Krishnappa (SC) – Conviction without alibi',
      'State of Uttar Pradesh vs. Ram Chandra (SC) – Conviction without presence at scene',
      'Shiv Kumar Yadav vs. State of Uttar Pradesh (HC)',
      'State of Maharashtra vs. Dattatraya (SC)',
      'Ram Narayan vs. State of Rajasthan (HC)'
    ]
  },

  // 11. FAQs (from FAQ section - Q: ... A: ...)
  faqs: [
    {
      question: 'What is criminal law?',
      answer: 'Law dealing with crimes and punishment – defines offences, sets punishments, outlines prosecution procedures.'
    },
    {
      question: 'Examples of criminal offences?',
      answer: 'Murder, rape, theft, fraud, assault, drug trafficking, cybercrime.'
    },
    {
      question: 'Role of criminal defence lawyer?',
      answer: 'Represent accused, provide legal advice, negotiate plea bargains, protect rights, ensure fair trial.'
    },
    {
      question: 'Can someone be charged without evidence?',
      answer: 'No – prosecution must prove guilt beyond reasonable doubt.'
    },
    {
      question: 'Can criminal case be appealed?',
      answer: 'Yes, to a higher court within the specified timeframe.'
    }
  ]
},
```

---

## 🎓 Field Mapping Reference

### From Original → To Data Structure

| Your Content | Data Field | Notes |
|--------------|------------|-------|
| **Hero:** Title | `hero.title` | Use the exact hero title |
| **Subtitle:** Text | `hero.subtitle` | Full subtitle text |
| URL slug | Object key | e.g., `'bail-lawyer-in-delhi'` |
| **About [Service]:** | `about.title` & `about.content` | First paragraph goes in content |
| **Types of [X]:** | `typesOfCases` or `typesOfBail` | Use appropriate name |
| Bullet list under types | `types: [{name, description}]` | Each bullet becomes an object |
| **Acts & Provisions:** | `actsProvisions.items` | Array of strings |
| **Major Laws:** | `majorStatutes.statutes` | Alternative to actsProvisions |
| **Filing Procedure:** | `filingProcedure.steps` | Array of step strings |
| **Documents Required:** | `documentsRequired.documents` | Array of document strings |
| **Role of Our Lawyers:** | `roleOfLawyers.description` | Full paragraph |
| **How Grover & Grover Helps:** | `howWeHelp.description` | Full paragraph |
| **Popular Cases:** | `popularCases.cases` | Array of case strings |
| **FAQ:** Q: ... A: ... | `faqs: [{question, answer}]` | Each Q&A becomes an object |

---

## 🔄 Special Cases & Variations

### Service Has "What to Do" Section (e.g., Cheque Bounce)

**Original:**
```
**What to Do When a Cheque Bounces:**
1. Obtain the bank's memo
2. Send a legal notice
3. Wait 15 days
```

**Convert To:**
```javascript
whatToDo: {
  title: 'What to Do When a Cheque Bounces',
  steps: [
    'Obtain the bank\'s memo/return slip',
    'Send a legal notice to the drawer within 30 days',
    'The drawer has 15 days to make payment'
  ]
},
```

### Service Has "Charges & Penalties" Section

**Original:**
```
**Charges, Penalties & Punishment:**
- Section 138: Imprisonment up to 2 years
- Bank charges a fee
- Negative credit score impact
```

**Convert To:**
```javascript
chargesAndPenalties: {
  title: 'Charges, Penalties & Punishment',
  items: [
    'Section 138: Imprisonment up to 2 years, or fine up to twice cheque amount',
    'The bank may charge a fee for processing returned cheque',
    'A cheque bounce negatively impacts drawer\'s credit score'
  ]
},
```

### Service Has "Legal Remedies" (Simple List)

**Original:**
```
**Legal Remedies:**
- Civil suit for recovery
- Application before DRT
- Criminal complaint under Section 138
```

**Convert To:**
```javascript
legalRemedies: {
  title: 'Legal Remedies',
  remedies: [
    'Civil suit for recovery of money under Civil Procedure Code',
    'Application before the Debt Recovery Tribunal (DRT) under Section 64',
    'Criminal complaint under Section 138 NI Act'
  ]
},
```

### Service Has "Remedies Available" (Detailed)

**Original:**
```
**Remedies Available:**
- **Damages:** Monetary compensation for losses
- **Injunctions:** Court orders restraining action
```

**Convert To:**
```javascript
remediesAvailable: {
  title: 'Remedies Available',
  remedies: [
    {
      name: 'Damages',
      description: 'Monetary compensation for losses'
    },
    {
      name: 'Injunctions',
      description: 'Court orders restraining/compelling action'
    }
  ]
},
```

---

## 📋 Step-by-Step Workflow

### For Each Service (5-10 minutes):

**STEP 1:** Find the service in your original request
**STEP 2:** Copy the slug (e.g., `criminal-lawyer-in-delhi`)
**STEP 3:** Start with this structure:

```javascript
'SERVICE-SLUG-HERE': {
  title: '',
  subtitle: '',
  metaTitle: '',
  metaDescription: '',
  hero: { title: '', subtitle: '', cta: 'Get Free Consultation' },
  
  // Add sections here
  
  faqs: []
},
```

**STEP 4:** Fill in each section from your content:
- Copy "About" section → `about: { ... }`
- Copy "Types" section → `typesOfCases: { ... }`
- Copy "Acts" section → `actsProvisions: { ... }`
- Copy "Filing" section → `filingProcedure: { ... }`
- Copy "Documents" section → `documentsRequired: { ... }`
- Copy "Role" section → `roleOfLawyers: { ... }`
- Copy "How We Help" → `howWeHelp: { ... }`
- Copy "Popular Cases" → `popularCases: { ... }`
- Copy FAQs → `faqs: [ ... ]`

**STEP 5:** Test the page immediately!

---

## 🚀 Batch Processing Strategy

### Batch 1: Family Law Services (Group similar services)
- Divorce Lawyer
- Family Lawyer
- (Similar sections, copy-paste efficiency)

### Batch 2: Court Representation
- Criminal Lawyer
- High Court Lawyer
- AFT Lawyer
- CAT Matters Lawyer

### Batch 3: Business & Corporate
- Corporate Lawyer
- Contract Lawyer (already done ✓)
- Employment Lawyer
- Insolvency & Bankruptcy

### Batch 4: Specialized Services
- Cyber Crime Lawyer
- Immigration Lawyer
- Insurance Lawyer
- DRT Lawyer

### Batch 5: Dispute Resolution
- Mediation & Arbitration
- Landlord-Tenant
- Legal Notice Expertise

**Strategy:** Complete one batch at a time, test all together.

---

## 🎯 Quick Copy-Paste Checklist

For each service, copy these in order:

```
□ Slug (URL)
□ Hero title
□ Hero subtitle  
□ About paragraph
□ Types/Categories list
□ Acts & laws list
□ Filing procedure steps
□ Documents list (6-10 items)
□ Role of lawyers paragraph
□ How we help paragraph
□ Popular cases (3-5 cases)
□ FAQs (5-15 Q&A pairs)
```

**Time per service:** 5-10 minutes  
**Total time for 16 services:** ~2-3 hours

---

## 💡 Pro Tips

### Tip 1: Use Multi-Cursor Editing
In VS Code/Cursor:
1. Select a line
2. Hold Alt (Windows) or Cmd (Mac)
3. Click to add more cursors
4. Type once, edits everywhere!

### Tip 2: Use Format Document
After adding a service:
1. Right-click in `servicesData.js`
2. Select "Format Document"
3. Fixes indentation automatically

### Tip 3: Test Incrementally
Don't add all 16 services then test. Add 2-3, test, repeat.

### Tip 4: Keep Original Content Open
Have your original request open in another window for easy reference.

### Tip 5: Save Frequently
After adding each service, save the file. Don't lose progress!

---

## 🐛 Common Mistakes to Avoid

### ❌ Mistake 1: Missing Comma
```javascript
'service-1': { ... }  // Missing comma here!
'service-2': { ... }
```

**Fix:**
```javascript
'service-1': { ... },  // Add comma!
'service-2': { ... }
```

### ❌ Mistake 2: Apostrophes in Strings
```javascript
content: 'It's a legal process'  // ERROR!
```

**Fix:**
```javascript
content: 'It\'s a legal process'  // Escape with backslash
// OR
content: `It's a legal process`  // Use backticks
```

### ❌ Mistake 3: Forgetting Array Brackets
```javascript
items: 'Item 1', 'Item 2'  // ERROR!
```

**Fix:**
```javascript
items: ['Item 1', 'Item 2']  // Array with brackets!
```

### ❌ Mistake 4: Wrong Field Names
```javascript
faq: [ ... ]  // Should be 'faqs' (plural)
```

**Fix:**
```javascript
faqs: [ ... ]  // Correct field name
```

---

## 📊 Content Statistics

Based on your original request, each service has approximately:

- **Hero content:** 2 lines
- **About section:** 1-2 paragraphs (100-200 words)
- **Types/Categories:** 3-5 items
- **Acts & Laws:** 5-10 items
- **Filing Steps:** 4-8 steps
- **Documents:** 6-10 documents
- **Role description:** 1 paragraph (50-100 words)
- **How we help:** 1 paragraph (50-100 words)
- **Popular cases:** 3-5 cases
- **FAQs:** 10-20 Q&A pairs

**Total content per service:** ~800-1200 words  
**Total for all 20 services:** ~20,000 words

---

## 🎬 Example: Complete Service Addition (7 minutes)

### Minute 1-2: Setup
- Open `servicesData.js`
- Find the end of the last service
- Add comma after closing brace
- Start new service object

### Minute 3-4: Basic Sections
- Copy hero, about, types
- Paste and format
- Quick proofread

### Minute 5-6: Detailed Sections
- Copy acts, filing, documents
- Copy role and how we help
- Copy popular cases

### Minute 7: FAQs & Test
- Copy all Q&A pairs
- Format as array of objects
- Save and test page!

---

## 🎯 Service-Specific Notes

### DIVORCE LAWYER
- Use `typesOfCases` for "Mutual Consent" vs "Contested"
- Emphasize child custody, alimony in howWeHelp
- FAQs should cover: timeline, costs, property, custody

### EMPLOYMENT LAWYER
- Use `actsProvisions` for labour laws
- Include `rightsObligations` section if you want to add it
- FAQs: wrongful termination, wages, unions

### IMMIGRATION LAWYER
- Include countries in howWeHelp (USA, Canada, Australia, UK)
- Focus on visa types in typesOfCases
- FAQs: visa process, citizenship, overstay

### CYBER CRIME LAWYER
- List cybercrime types clearly
- Include IT Act sections
- FAQs: reporting process, penalties, digital forensics

### AFT / CAT LAWYERS
- Focus on tribunal-specific procedures
- Mention specialized jurisdiction
- FAQs: tribunal vs court, eligibility, timeline

---

## 🔍 Quality Check Before Moving to Next Service

After adding each service, verify:

1. **Syntax:** No console errors when you save
2. **Content:** All sections appear on page
3. **Spelling:** No typos in service name
4. **FAQs:** At least 5 questions
5. **Cases:** At least 3 popular cases
6. **CTA:** Button links work

**If all checks pass → Move to next service!**

---

## 🎉 Completion Tracker

Use this to track your progress:

```
Services Added: [ ] [ ] [ ] [ ]    4/20  ✓
                [ ] [ ] [ ] [ ]    8/20
                [ ] [ ] [ ] [ ]   12/20
                [ ] [ ] [ ] [ ]   16/20
                [ ] [ ] [ ] [ ]   20/20  🎉
```

**Mark each box as you complete a service!**

---

## 🏁 Final Push Strategy

### Power Hour (Add 8 services in 1 hour!)

**Set timer: 7 minutes per service**

1. **Minute 0-1:** Copy service content from original request
2. **Minute 1-3:** Format hero, about, types, acts
3. **Minute 3-5:** Format filing, documents, lawyers, help
4. **Minute 5-6:** Format cases and FAQs
5. **Minute 6-7:** Save, test page, check off checklist

**Repeat 8 times = 8 services in 1 hour!**

Then take a break. Do another power hour later.

**2 power hours = 16 services = ALL DONE!** 🚀

---

## 📞 Need Help?

### Stuck on Formatting?
- Check `SERVICE_TEMPLATE.js` for the exact structure
- Look at the 4 completed examples
- Compare your code to working examples

### Stuck on Content?
- Your original request has ALL the content
- Just copy-paste and reformat
- Don't overthink it!

### Technical Errors?
- Check for missing commas
- Check for unescaped apostrophes
- Check bracket matching
- Use Format Document feature

---

## 🎊 Motivation

**You're adding world-class, SEO-optimized service pages!**

Each service page you complete:
- ✅ Increases your site's authority
- ✅ Captures leads 24/7
- ✅ Ranks in Google for keywords
- ✅ Educates potential clients
- ✅ Showcases your expertise

**By the time you finish all 20 services, you'll have one of the most comprehensive legal service websites in Delhi!**

---

## 🚀 Start Now!

1. Open `frontend/src/data/servicesData.js`
2. Find line ~230 (end of contract lawyer section)
3. Add a comma
4. Start with CRIMINAL LAWYER (most common service)
5. Use this guide to map content
6. Test: http://localhost:5173/criminal-lawyer-in-delhi
7. Repeat for next service!

**You've got this!** 💪

---

**Total Time to Complete:** 2-3 hours  
**Difficulty:** Easy (copy-paste-format)  
**Result:** Professional, enterprise-grade service pages

**Let's do this!** 🎯
