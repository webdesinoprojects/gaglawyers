/**
 * SMART SERVICE SCRAPER BOOKMARKLET
 * 
 * Click ONCE on gaglawyers.com to scrape all 56 services automatically
 * 
 * HOW TO INSTALL:
 * 1. Create a new bookmark in your browser
 * 2. Name it: "Scrape All Services"
 * 3. For the URL, use the minified version from smart-bookmarklet-minified.js
 * 
 * HOW TO USE:
 * 1. Go to https://gaglawyers.com (any page)
 * 2. Click the "Scrape All Services" bookmark
 * 3. Wait 1-2 minutes while it processes all 56 services
 * 4. Click "Copy All JSON" button
 * 5. Paste into admin panel at /admin/services/import
 * 6. Click "Import All"
 * 7. Done!
 */

(function() {
  'use strict';

  // Configuration
  const BASE_URL = window.location.origin;
  const SERVICES_LIST_URL = '/services';
  const DELAY_BETWEEN_REQUESTS = 500; // ms

  // Utility: Clean text
  const cleanText = (text) => {
    if (!text) return '';
    return text.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
  };

  // Utility: Sleep
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Create floating UI
  const createUI = () => {
    const container = document.createElement('div');
    container.id = 'service-scraper-ui';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      background: white;
      border: 2px solid #2563eb;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
    `;

    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 16px; font-weight: 600; font-size: 16px;">
        🚀 Service Scraper
      </div>
      <div style="padding: 20px;">
        <div id="scraper-status" style="margin-bottom: 16px; font-size: 14px; color: #374151;">
          Initializing...
        </div>
        <div id="scraper-progress-container" style="display: none; margin-bottom: 16px;">
          <div style="display: flex; justify-content: between; margin-bottom: 8px; font-size: 13px; color: #6b7280;">
            <span id="scraper-progress-text">0/0</span>
            <span id="scraper-progress-percent">0%</span>
          </div>
          <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
            <div id="scraper-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 100%); transition: width 0.3s;"></div>
          </div>
        </div>
        <div id="scraper-results" style="max-height: 200px; overflow-y: auto; font-size: 12px; color: #6b7280; margin-bottom: 16px; display: none;">
        </div>
        <div id="scraper-actions" style="display: none;">
          <button id="scraper-copy-btn" style="width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; margin-bottom: 8px;">
            📋 Copy All JSON
          </button>
          <button id="scraper-close-btn" style="width: 100%; padding: 12px; background: #6b7280; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
            Close
          </button>
        </div>
        <div id="scraper-error" style="display: none; padding: 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #991b1b; font-size: 13px;">
        </div>
      </div>
    `;

    document.body.appendChild(container);

    return {
      setStatus: (text) => {
        document.getElementById('scraper-status').textContent = text;
      },
      showProgress: () => {
        document.getElementById('scraper-progress-container').style.display = 'block';
      },
      updateProgress: (current, total) => {
        const percent = Math.round((current / total) * 100);
        document.getElementById('scraper-progress-text').textContent = `${current}/${total}`;
        document.getElementById('scraper-progress-percent').textContent = `${percent}%`;
        document.getElementById('scraper-progress-bar').style.width = `${percent}%`;
      },
      addResult: (text, success = true) => {
        const results = document.getElementById('scraper-results');
        results.style.display = 'block';
        const item = document.createElement('div');
        item.style.cssText = `padding: 6px; margin-bottom: 4px; border-radius: 4px; background: ${success ? '#f0fdf4' : '#fef2f2'}; color: ${success ? '#166534' : '#991b1b'};`;
        item.textContent = `${success ? '✅' : '❌'} ${text}`;
        results.appendChild(item);
        results.scrollTop = results.scrollHeight;
      },
      showActions: () => {
        document.getElementById('scraper-actions').style.display = 'block';
      },
      showError: (text) => {
        const error = document.getElementById('scraper-error');
        error.textContent = text;
        error.style.display = 'block';
      },
      remove: () => {
        container.remove();
      }
    };
  };

  // Discover all service URLs
  const discoverServiceUrls = async (ui) => {
    ui.setStatus('🔍 Finding all service pages...');

    try {
      const response = await fetch(SERVICES_LIST_URL);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const urls = new Set();
      
      // Find all links that point to service pages
      doc.querySelectorAll('a[href*="/services/"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#') && href !== '/services' && href !== '/services/') {
          // Convert to absolute URL
          const url = href.startsWith('http') ? href : BASE_URL + (href.startsWith('/') ? href : '/' + href);
          urls.add(url);
        }
      });

      const urlArray = Array.from(urls);
      ui.setStatus(`✅ Found ${urlArray.length} service pages`);
      return urlArray;

    } catch (error) {
      ui.showError(`Failed to discover service URLs: ${error.message}`);
      throw error;
    }
  };

  // Extract content from a single service page
  const extractServiceContent = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract slug from URL
    const urlParts = url.split('/');
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

    // Extract name (h1 or title)
    let name = doc.querySelector('h1')?.textContent || '';
    if (!name) {
      name = doc.querySelector('title')?.textContent.split('|')[0].split('-')[0] || '';
    }
    name = cleanText(name);

    const sections = [];
    let order = 0;

    // HERO SECTION
    const h1 = doc.querySelector('h1');
    if (h1) {
      const heroHeading = cleanText(h1.textContent);
      let heroSubheading = '';
      
      if (h1.nextElementSibling && h1.nextElementSibling.tagName === 'P') {
        heroSubheading = cleanText(h1.nextElementSibling.textContent);
      }

      // Try to find hero background image
      let heroBgImage = '';
      const heroSection = doc.querySelector('.hero, .banner, header, [class*="hero"], [class*="banner"]');
      if (heroSection) {
        const bgStyle = window.getComputedStyle(heroSection).backgroundImage;
        if (bgStyle && bgStyle !== 'none') {
          heroBgImage = bgStyle.replace(/url\(['"]?|['"]?\)/g, '');
        }
      }

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
    const h2Elements = doc.querySelectorAll('h2');
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
    const allHeadings = doc.querySelectorAll('h2, h3');
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
    const titleTag = doc.querySelector('title');
    const metaDesc = doc.querySelector('meta[name="description"]') || 
                     doc.querySelector('meta[property="og:description"]');

    return {
      slug: slug,
      name: name,
      sections: sections,
      seo: {
        title: titleTag ? titleTag.textContent : name,
        metaDescription: metaDesc ? metaDesc.getAttribute('content') : ''
      }
    };
  };

  // Main execution
  const main = async () => {
    // Check if already running
    if (document.getElementById('service-scraper-ui')) {
      alert('Scraper is already running!');
      return;
    }

    const ui = createUI();
    const allServices = [];
    const failedServices = [];

    try {
      // Step 1: Discover all service URLs
      const urls = await discoverServiceUrls(ui);

      if (urls.length === 0) {
        ui.showError('No service URLs found. Make sure you are on gaglawyers.com');
        return;
      }

      // Step 2: Process each service
      ui.setStatus('🚀 Scraping services...');
      ui.showProgress();

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        ui.updateProgress(i + 1, urls.length);

        try {
          const serviceData = await extractServiceContent(url);
          allServices.push(serviceData);
          ui.addResult(`${serviceData.name} (${serviceData.sections.length} sections)`, true);
        } catch (error) {
          failedServices.push({ url, error: error.message });
          ui.addResult(`Failed: ${url}`, false);
        }

        // Delay between requests
        if (i < urls.length - 1) {
          await sleep(DELAY_BETWEEN_REQUESTS);
        }
      }

      // Step 3: Show results
      ui.setStatus(`✅ Complete! ${allServices.length} succeeded, ${failedServices.length} failed`);
      ui.showActions();

      // Store data globally for copy button
      window.__scraped_services_data = allServices;

      // Copy button handler
      document.getElementById('scraper-copy-btn').onclick = () => {
        const json = JSON.stringify(allServices, null, 2);
        navigator.clipboard.writeText(json).then(() => {
          alert(`✅ Copied JSON for ${allServices.length} services!\n\nNow paste into admin panel at:\n/admin/services/import`);
        }).catch(() => {
          // Fallback: show in prompt
          prompt('Copy this JSON:', json);
        });
      };

      // Close button handler
      document.getElementById('scraper-close-btn').onclick = () => {
        ui.remove();
      };

    } catch (error) {
      ui.showError(`Fatal error: ${error.message}`);
      console.error('Scraper error:', error);
    }
  };

  // Run
  main();
})();
