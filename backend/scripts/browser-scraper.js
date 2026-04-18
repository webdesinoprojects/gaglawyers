/**
 * BROWSER-BASED SERVICE SCRAPER
 * 
 * This script runs in your browser console while visiting gaglawyers.com service pages
 * It extracts content and generates JSON that can be imported into the database
 * 
 * HOW TO USE:
 * 1. Open https://gaglawyers.com/services/[service-slug] in your browser
 * 2. Open DevTools Console (F12)
 * 3. Paste this entire script and press Enter
 * 4. Copy the JSON output
 * 5. Save to a file or use the bulk import script
 */

(function() {
  console.log('🔍 Scraping service page...\n');

  // Utility: Clean text
  const cleanText = (text) => {
    if (!text) return '';
    return text.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
  };

  // Extract slug from URL
  const url = window.location.href;
  const urlParts = url.split('/');
  const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

  // Extract name
  const h1 = document.querySelector('h1');
  const name = h1 ? cleanText(h1.textContent) : document.title.split('|')[0].trim();

  const sections = [];
  let order = 0;

  // HERO SECTION
  const heroHeading = h1 ? cleanText(h1.textContent) : '';
  let heroSubheading = '';
  
  if (h1 && h1.nextElementSibling && h1.nextElementSibling.tagName === 'P') {
    heroSubheading = cleanText(h1.nextElementSibling.textContent);
  }

  // Try to find hero background image
  let heroBgImage = '';
  const heroSection = document.querySelector('.hero, .banner, header, [class*="hero"], [class*="banner"]');
  if (heroSection) {
    const bgStyle = window.getComputedStyle(heroSection).backgroundImage;
    if (bgStyle && bgStyle !== 'none') {
      heroBgImage = bgStyle.replace(/url\(['"]?|['"]?\)/g, '');
    }
  }

  if (heroHeading) {
    sections.push({
      type: 'hero',
      heading: heroHeading,
      visible: true,
      order: order++,
      background: 'dark',
      content: {
        subheading: heroSubheading,
        ctaText: 'Schedule Consultation',
        ctaLink: '/contact',
        backgroundImageUrl: heroBgImage
      }
    });
  }

  // OVERVIEW SECTION
  const h2Elements = document.querySelectorAll('h2');
  if (h2Elements.length > 0) {
    const firstH2 = h2Elements[0];
    const overviewHeading = cleanText(firstH2.textContent);
    const overviewParagraphs = [];
    
    let nextEl = firstH2.nextElementSibling;
    while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
      if (nextEl.tagName === 'P' && nextEl.textContent.trim().length > 20) {
        overviewParagraphs.push(cleanText(nextEl.textContent));
      }
      nextEl = nextEl.nextElementSibling;
    }

    if (overviewParagraphs.length > 0) {
      sections.push({
        type: 'overview',
        heading: overviewHeading || 'Overview',
        visible: true,
        order: order++,
        background: 'light',
        content: {
          body: overviewParagraphs.join('\n\n')
        }
      });
    }
  }

  // BENEFITS SECTION
  const allHeadings = document.querySelectorAll('h2, h3');
  allHeadings.forEach(heading => {
    const headingText = heading.textContent.toLowerCase();
    
    if (headingText.includes('benefit') || headingText.includes('why choose') || 
        headingText.includes('advantage') || headingText.includes('what we offer')) {
      
      const benefitsItems = [];
      let nextEl = heading.nextElementSibling;
      
      while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
        // Look for list items
        if (nextEl.tagName === 'UL' || nextEl.tagName === 'OL') {
          const listItems = nextEl.querySelectorAll('li');
          listItems.forEach(li => {
            const strongEl = li.querySelector('strong, b, h4, h5');
            const title = strongEl ? cleanText(strongEl.textContent) : cleanText(li.textContent.split('.')[0]);
            const description = strongEl ? 
              cleanText(li.textContent.replace(strongEl.textContent, '')) : 
              cleanText(li.textContent);
            
            if (title && description && description.length > 10) {
              benefitsItems.push({
                icon: 'CheckCircle',
                title: title,
                description: description
              });
            }
          });
        }
        
        // Look for card/grid items
        if (nextEl.classList && (nextEl.classList.contains('card') || 
            nextEl.classList.contains('benefit') || 
            nextEl.querySelector('.card, .benefit-item'))) {
          const cards = nextEl.querySelectorAll('.card, .benefit-item, [class*="benefit"]');
          cards.forEach(card => {
            const titleEl = card.querySelector('h4, h5, strong, b');
            const descEl = card.querySelector('p');
            
            if (titleEl && descEl) {
              benefitsItems.push({
                icon: 'CheckCircle',
                title: cleanText(titleEl.textContent),
                description: cleanText(descEl.textContent)
              });
            }
          });
        }
        
        nextEl = nextEl.nextElementSibling;
      }

      if (benefitsItems.length > 0) {
        sections.push({
          type: 'benefits',
          heading: cleanText(heading.textContent),
          visible: true,
          order: order++,
          background: 'light',
          content: { items: benefitsItems }
        });
      }
    }
  });

  // PROCESS SECTION
  allHeadings.forEach(heading => {
    const headingText = heading.textContent.toLowerCase();
    
    if (headingText.includes('process') || headingText.includes('how it works') || 
        headingText.includes('steps') || headingText.includes('procedure')) {
      
      const processSteps = [];
      let nextEl = heading.nextElementSibling;
      let stepNumber = 1;
      
      while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
        // Look for list items
        if (nextEl.tagName === 'UL' || nextEl.tagName === 'OL') {
          const listItems = nextEl.querySelectorAll('li');
          listItems.forEach(li => {
            const strongEl = li.querySelector('strong, b, h4, h5');
            const title = strongEl ? cleanText(strongEl.textContent) : cleanText(li.textContent.split('.')[0]);
            const description = strongEl ? 
              cleanText(li.textContent.replace(strongEl.textContent, '')) : 
              cleanText(li.textContent);
            
            if (title && description && description.length > 10) {
              processSteps.push({
                stepNumber: stepNumber++,
                title: title,
                description: description
              });
            }
          });
        }
        
        // Look for step cards
        if (nextEl.classList && (nextEl.classList.contains('step') || 
            nextEl.querySelector('.step, [class*="step"]'))) {
          const steps = nextEl.querySelectorAll('.step, [class*="step"]');
          steps.forEach(step => {
            const titleEl = step.querySelector('h4, h5, strong, b');
            const descEl = step.querySelector('p');
            
            if (titleEl && descEl) {
              processSteps.push({
                stepNumber: stepNumber++,
                title: cleanText(titleEl.textContent),
                description: cleanText(descEl.textContent)
              });
            }
          });
        }
        
        nextEl = nextEl.nextElementSibling;
      }

      if (processSteps.length > 0) {
        sections.push({
          type: 'process',
          heading: cleanText(heading.textContent),
          visible: true,
          order: order++,
          background: 'dark',
          content: { steps: processSteps }
        });
      }
    }
  });

  // FAQ SECTION
  allHeadings.forEach(heading => {
    const headingText = heading.textContent.toLowerCase();
    
    if (headingText.includes('faq') || headingText.includes('question') || 
        headingText.includes('q&a') || headingText.includes('q & a')) {
      
      const faqItems = [];
      let nextEl = heading.nextElementSibling;
      
      while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
        // Look for accordion items
        const accordionItems = nextEl.querySelectorAll('.faq-item, .accordion-item, [class*="faq"], [class*="accordion"]');
        accordionItems.forEach(item => {
          const questionEl = item.querySelector('h4, h5, .question, [class*="question"]');
          const answerEl = item.querySelector('p, .answer, [class*="answer"]');
          
          if (questionEl && answerEl) {
            faqItems.push({
              question: cleanText(questionEl.textContent),
              answer: cleanText(answerEl.textContent)
            });
          }
        });
        
        // Look for dt/dd pairs
        if (nextEl.tagName === 'DL') {
          const dts = nextEl.querySelectorAll('dt');
          dts.forEach(dt => {
            const dd = dt.nextElementSibling;
            if (dd && dd.tagName === 'DD') {
              faqItems.push({
                question: cleanText(dt.textContent),
                answer: cleanText(dd.textContent)
              });
            }
          });
        }
        
        // Look for h4/h5 followed by p
        if (nextEl.tagName === 'H4' || nextEl.tagName === 'H5') {
          const question = cleanText(nextEl.textContent);
          const answerEl = nextEl.nextElementSibling;
          if (answerEl && answerEl.tagName === 'P') {
            faqItems.push({
              question: question,
              answer: cleanText(answerEl.textContent)
            });
          }
        }
        
        nextEl = nextEl.nextElementSibling;
      }

      if (faqItems.length > 0) {
        sections.push({
          type: 'faq',
          heading: cleanText(heading.textContent),
          visible: true,
          order: order++,
          background: 'light',
          content: { items: faqItems }
        });
      }
    }
  });

  // CTA BANNER (always add)
  sections.push({
    type: 'cta_banner',
    heading: 'Ready to Get Started?',
    visible: true,
    order: order++,
    background: 'dark',
    content: {
      body: 'Contact our expert legal team today for professional assistance',
      buttonText: 'Schedule Consultation',
      buttonLink: '/contact'
    }
  });

  // Extract SEO
  const titleTag = document.querySelector('title');
  const metaDesc = document.querySelector('meta[name="description"]') || 
                   document.querySelector('meta[property="og:description"]');

  const result = {
    slug: slug,
    name: name,
    sections: sections,
    seo: {
      title: titleTag ? titleTag.textContent : name,
      metaDescription: metaDesc ? metaDesc.getAttribute('content') : ''
    }
  };

  console.log('✅ Scraping complete!\n');
  console.log(`Service: ${name}`);
  console.log(`Slug: ${slug}`);
  console.log(`Sections found: ${sections.length}\n`);
  console.log('📋 Copy the JSON below:\n');
  console.log(JSON.stringify(result, null, 2));
  console.log('\n💾 To save, run: copy(scraped_data)');
  
  // Make it available globally
  window.scraped_data = result;
  
  return result;
})();
