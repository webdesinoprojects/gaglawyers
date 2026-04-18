# Service Scraper Bookmarklet

A one-click bookmarklet to scrape service pages from gaglawyers.com

## 🔖 Installation

### Option 1: Create Bookmarklet (Easiest)

1. Create a new bookmark in your browser
2. Name it: "Scrape Service"
3. For the URL, paste this entire code (it's one long line):

```javascript
javascript:(function(){const e=e=>{if(!e)return"";return e.trim().replace(/\s+/g," ").replace(/\n+/g,"\n")},t=e=>{if(!e)return"";return e.startsWith("http")?e:e.startsWith("//")?`https:${e}`:e.startsWith("/")?`https://gaglawyers.com${e}`:`https://gaglawyers.com/${e}`},n=window.location.href,o=n.split("/"),s=o[o.length-1]||o[o.length-2],r=document.querySelector("h1"),i=r?e(r.textContent):document.title.split("|")[0].trim(),a=[];let c=0;const l=r?e(r.textContent):"";let d="";if(r&&r.nextElementSibling&&"P"===r.nextElementSibling.tagName&&(d=e(r.nextElementSibling.textContent)),l){let n="";const o=document.querySelector(".hero, .banner, header, [class*=\"hero\"], [class*=\"banner\"]");if(o){const e=window.getComputedStyle(o).backgroundImage;e&&"none"!==e&&(n=e.replace(/url\(['"]?|['"]?\)/g,""))}a.push({type:"hero",heading:l,visible:!0,order:c++,background:"dark",content:{subheading:d,ctaText:"Schedule Consultation",ctaLink:"/contact",backgroundImageUrl:n}})}const u=document.querySelectorAll("h2");if(u.length>0){const t=u[0],n=e(t.textContent),o=[];let s=t.nextElementSibling;for(;s&&"H2"!==s.tagName&&"H3"!==s.tagName;)"P"===s.tagName&&s.textContent.trim().length>20&&o.push(e(s.textContent)),s=s.nextElementSibling;o.length>0&&a.push({type:"overview",heading:n||"Overview",visible:!0,order:c++,background:"light",content:{body:o.join("\n\n")}})}const g=document.querySelectorAll("h2, h3");g.forEach((t=>{const n=t.textContent.toLowerCase();if(n.includes("benefit")||n.includes("why choose")||n.includes("advantage")||n.includes("what we offer")){const n=[];let o=t.nextElementSibling;for(;o&&"H2"!==o.tagName&&"H3"!==o.tagName;){if("UL"===o.tagName||"OL"===o.tagName){o.querySelectorAll("li").forEach((t=>{const o=t.querySelector("strong, b, h4, h5"),s=o?e(o.textContent):e(t.textContent.split(".")[0]),r=o?e(t.textContent.replace(o.textContent,"")):e(t.textContent);s&&r&&r.length>10&&n.push({icon:"CheckCircle",title:s,description:r})}))}if(o.classList&&(o.classList.contains("card")||o.classList.contains("benefit")||o.querySelector(".card, .benefit-item"))){o.querySelectorAll(".card, .benefit-item, [class*=\"benefit\"]").forEach((t=>{const n=t.querySelector("h4, h5, strong, b"),o=t.querySelector("p");n&&o&&n.push({icon:"CheckCircle",title:e(n.textContent),description:e(o.textContent)})}))}o=o.nextElementSibling}n.length>0&&a.push({type:"benefits",heading:e(t.textContent),visible:!0,order:c++,background:"light",content:{items:n}})}})),g.forEach((t=>{const n=t.textContent.toLowerCase();if(n.includes("process")||n.includes("how it works")||n.includes("steps")||n.includes("procedure")){const n=[];let o=t.nextElementSibling,s=1;for(;o&&"H2"!==o.tagName&&"H3"!==o.tagName;){if("UL"===o.tagName||"OL"===o.tagName){o.querySelectorAll("li").forEach((t=>{const o=t.querySelector("strong, b, h4, h5"),r=o?e(o.textContent):e(t.textContent.split(".")[0]),i=o?e(t.textContent.replace(o.textContent,"")):e(t.textContent);r&&i&&i.length>10&&n.push({stepNumber:s++,title:r,description:i})}))}if(o.classList&&(o.classList.contains("step")||o.querySelector(".step, [class*=\"step\"]"))){o.querySelectorAll(".step, [class*=\"step\"]").forEach((t=>{const o=t.querySelector("h4, h5, strong, b"),r=t.querySelector("p");o&&r&&n.push({stepNumber:s++,title:e(o.textContent),description:e(r.textContent)})}))}o=o.nextElementSibling}n.length>0&&a.push({type:"process",heading:e(t.textContent),visible:!0,order:c++,background:"dark",content:{steps:n}})}})),g.forEach((t=>{const n=t.textContent.toLowerCase();if(n.includes("faq")||n.includes("question")||n.includes("q&a")||n.includes("q & a")){const n=[];let o=t.nextElementSibling;for(;o&&"H2"!==o.tagName&&"H3"!==o.tagName;){if(o.querySelectorAll(".faq-item, .accordion-item, [class*=\"faq\"], [class*=\"accordion\"]").forEach((t=>{const o=t.querySelector("h4, h5, .question, [class*=\"question\"]"),s=t.querySelector("p, .answer, [class*=\"answer\"]");o&&s&&n.push({question:e(o.textContent),answer:e(s.textContent)})})),"DL"===o.tagName){o.querySelectorAll("dt").forEach((t=>{const o=t.nextElementSibling;o&&"DD"===o.tagName&&n.push({question:e(t.textContent),answer:e(o.textContent)})}))}if("H4"===o.tagName||"H5"===o.tagName){const t=e(o.textContent),s=o.nextElementSibling;s&&"P"===s.tagName&&n.push({question:t,answer:e(s.textContent)})}o=o.nextElementSibling}n.length>0&&a.push({type:"faq",heading:e(t.textContent),visible:!0,order:c++,background:"light",content:{items:n}})}})),a.push({type:"cta_banner",heading:"Ready to Get Started?",visible:!0,order:c++,background:"dark",content:{body:"Contact our expert legal team today for professional assistance",buttonText:"Schedule Consultation",buttonLink:"/contact"}});const m=document.querySelector("title"),p=document.querySelector("meta[name=\"description\"]")||document.querySelector("meta[property=\"og:description\"]"),h={slug:s,name:i,sections:a,seo:{title:m?m.textContent:i,metaDescription:p?p.getAttribute("content"):""}};console.log("✅ Scraping complete!\n"),console.log(`Service: ${i}`),console.log(`Slug: ${s}`),console.log(`Sections found: ${a.length}\n`),console.log("📋 JSON copied to clipboard!"),console.log("\n💾 Paste into a file and import with:"),console.log(`   node scripts/importServiceContent.js single ${s}.json`);const x=JSON.stringify(h,null,2);navigator.clipboard.writeText(x).then((()=>{alert(`✅ Scraped ${i}\n\nSections: ${a.length}\n\nJSON copied to clipboard!\n\nSave to ${s}.json and import.`)})).catch((()=>{prompt("Copy this JSON:",x)}))})();
```

### Option 2: Use Console Script (Alternative)

If bookmarklets don't work, just copy `browser-scraper.js` and paste into console.

## 📖 Usage

### Using the Bookmarklet:

1. Go to any service page: `https://gaglawyers.com/services/bail-lawyer`
2. Click the "Scrape Service" bookmark
3. A popup will show: "✅ Scraped Bail Lawyer - Sections: 6 - JSON copied to clipboard!"
4. Paste into a text editor and save as `bail-lawyer.json`
5. Import: `node scripts/importServiceContent.js single bail-lawyer.json`

### Batch Processing All 56 Services:

1. Create folder: `mkdir backend/scripts/scraped-services`
2. For each service URL:
   - Visit the page
   - Click bookmarklet
   - Save JSON to `scraped-services/[slug].json`
3. Bulk import: `node scripts/importServiceContent.js bulk scripts/scraped-services/`

## 🎯 Service URLs to Scrape

Visit these URLs and click the bookmarklet on each:

```
https://gaglawyers.com/services/agreement-to-sell
https://gaglawyers.com/services/armed-force-tribunal-lawyer
https://gaglawyers.com/services/bail-lawyer
https://gaglawyers.com/services/cat-matters-lawyer
https://gaglawyers.com/services/cheque-bounce-lawyer
https://gaglawyers.com/services/child-custody-lawyer
https://gaglawyers.com/services/civil-lawyer
https://gaglawyers.com/services/consumer-court-lawyer
https://gaglawyers.com/services/contract-lawyer
https://gaglawyers.com/services/corporate-law
https://gaglawyers.com/services/court-marriage-lawyer
https://gaglawyers.com/services/criminal-defense-cases
https://gaglawyers.com/services/cyber-crime
https://gaglawyers.com/services/debt-recovery-lawyer
https://gaglawyers.com/services/divorce-lawyer
https://gaglawyers.com/services/dowry-lawyer
https://gaglawyers.com/services/employment-agreement
https://gaglawyers.com/services/employment-lawyer
https://gaglawyers.com/services/environment-lawyer
https://gaglawyers.com/services/family-law-disputes
https://gaglawyers.com/services/firearms-lawyer
https://gaglawyers.com/services/food-and-drug-lawyer
https://gaglawyers.com/services/franchise-agreement
https://gaglawyers.com/services/high-court-litigation
https://gaglawyers.com/services/human-rights-lawyer
https://gaglawyers.com/services/ip-license-agreement
https://gaglawyers.com/services/immigration-law
https://gaglawyers.com/services/insolvency-bankruptcy-lawyer
https://gaglawyers.com/services/insurance-lawyer
https://gaglawyers.com/services/labour-lawyer
https://gaglawyers.com/services/landlord-tenant-lawyer
https://gaglawyers.com/services/leave-and-license-agreement
https://gaglawyers.com/services/legal-notice
https://gaglawyers.com/services/loan-agreement
https://gaglawyers.com/services/marriage-registration-lawyer
https://gaglawyers.com/services/media-and-broadcasting-lawyer
https://gaglawyers.com/services/mediation-and-arbitration-lawyer
https://gaglawyers.com/services/medical-negligence-lawyer
https://gaglawyers.com/services/memorandum-of-understanding-mou
https://gaglawyers.com/services/military-lawyer
https://gaglawyers.com/services/motor-accident-lawyer
https://gaglawyers.com/services/muslim-lawyer
https://gaglawyers.com/services/non-disclosure-agreement
https://gaglawyers.com/services/partnership-deed
https://gaglawyers.com/services/property-lawyer
https://gaglawyers.com/services/rera-registration
https://gaglawyers.com/services/rent-agreement
https://gaglawyers.com/services/right-to-information-lawyer
https://gaglawyers.com/services/smc-certificate
https://gaglawyers.com/services/sale-deed
https://gaglawyers.com/services/sexual-harassment-lawyer
https://gaglawyers.com/services/sports-lawyer
https://gaglawyers.com/services/succession-certificate
https://gaglawyers.com/services/supreme-court-litigation
https://gaglawyers.com/services/will-lawyer
https://gaglawyers.com/services/writ-petition-lawyer
```

## ✅ Verification

After importing, verify in admin panel:
1. Go to http://localhost:5173/admin/service-manager
2. Click the service in sidebar
3. Check all sections are present
4. Verify content looks correct
5. Check the live page: http://localhost:5173/services/[slug]

## 🐛 Troubleshooting

**Bookmarklet doesn't work:**
- Some browsers block bookmarklets. Use the console script instead.

**JSON not copied to clipboard:**
- The script will show a prompt with the JSON. Copy manually.

**Empty sections:**
- The live site HTML might be different. Check console for errors.
- Adjust selectors in `browser-scraper.js` if needed.

**Import fails:**
- Make sure the service slug exists in database
- Check MongoDB connection
- Verify JSON is valid (use jsonlint.com)
