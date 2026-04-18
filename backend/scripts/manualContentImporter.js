/**
 * Manual Content Importer
 * 
 * Paste HTML content from a service page and this will parse it into sections
 * 
 * Usage: 
 * 1. Open a service page in browser
 * 2. Right-click → View Page Source (or Ctrl+U)
 * 3. Copy the entire HTML
 * 4. Save it to a file: backend/scripts/temp-html/service-slug.html
 * 5. Run: node scripts/manualContentImporter.js service-slug
 */

require('dotenv').config();
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const SITE_URL = 'https://www.gaglawyers.com';

// Utility functions
const cleanText = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
};

const getAbsoluteUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return SITE_URL + url;
  return SITE_URL + '/' + url;
};

async function parseHtmlContent(html, serviceName) {
  const $ = cheerio.load(html);
  const sections = [];
  let order = 0;

  // HERO SECTION
  const heroHeading = $('h1').first().text() || serviceName;
  const heroSubheading = $('h1').first().next('p').text() || 
                        $('h1').first().parent().find('p').first().text() ||
                        $('.hero-content p, .banner-content p, .page-header p').first().text();
  
  let heroBgImage = '';
  const heroSection = $('h1').first().closest('section, div[class*="hero"], div[class*="banner"]');
  if (heroSection.length) {
    const bgStyle = heroSection.css('background-image');
    if (bgStyle && bgStyle !== 'none') {
      heroBgImage = bgStyle.replace(/url\(['"]?|['"]?\)/g, '');
    }
  }
  if (!heroBgImage) {
    heroBgImage = $('section img, .hero img, .banner img').first().attr('src') || '';
  }
  
  sections.push({
    type: 'hero',
    heading: cleanText(heroHeading),
    visible: true,
    order: order++,
    background: 'dark',
    content: {
      subheading: cleanText(heroSubheading),
      ctaText: 'Schedule Consultation',
      ctaLink: '/contact',
      backgroundImageUrl: heroBgImage ? getAbsoluteUrl(heroBgImage) : ''
    }
  });

  // OVERVIEW SECTION
  const firstH2 = $('h2').first();
  if (firstH2.length) {
    const overviewHeading = firstH2.text();
    const overviewParagraphs = [];
    
    firstH2.nextUntil('h2, h3, section').filter('p').each((i, elem) => {
      const text = $(elem).text();
      if (text && text.length > 30) {
        overviewParagraphs.push(cleanText(text));
      }
    });

    if (overviewParagraphs.length === 0) {
      firstH2.parent().find('p').each((i, elem) => {
        const text = $(elem).text();
        if (text && text.length > 30 && !overviewParagraphs.includes(cleanText(text))) {
          overviewParagraphs.push(cleanText(text));
        }
      });
    }

    if (overviewParagraphs.length > 0) {
      sections.push({
        type: 'overview',
        heading: cleanText(overviewHeading) || 'Overview',
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
  $('h2, h3').each((i, heading) => {
    const headingText = $(heading).text().toLowerCase();
    if ((headingText.includes('benefit') || headingText.includes('why choose') || 
        headingText.includes('advantage') || headingText.includes('what we offer') ||
        headingText.includes('why hire') || headingText.includes('our expertise')) &&
        !sections.find(s => s.type === 'benefits')) {
      
      const benefitsHeading = $(heading).text();
      const benefitsItems = [];
      
      $(heading).nextUntil('h2, h3').find('ul li, ol li').each((j, item) => {
        const text = $(item).text();
        if (text && text.length > 10) {
          const parts = text.split(':');
          if (parts.length >= 2) {
            benefitsItems.push({
              icon: 'CheckCircle',
              title: cleanText(parts[0]),
              description: cleanText(parts.slice(1).join(':'))
            });
          } else {
            benefitsItems.push({
              icon: 'CheckCircle',
              title: cleanText(text.substring(0, 50)),
              description: cleanText(text)
            });
          }
        }
      });

      if (benefitsItems.length === 0) {
        $(heading).nextUntil('h2, h3').find('.card, .benefit, [class*="benefit"], [class*="feature"]').each((j, item) => {
          const title = $(item).find('h4, h5, strong, .title').first().text();
          const description = $(item).find('p, .description').first().text();
          
          if (title || description) {
            benefitsItems.push({
              icon: 'CheckCircle',
              title: cleanText(title) || cleanText(description.substring(0, 50)),
              description: cleanText(description) || cleanText(title)
            });
          }
        });
      }

      if (benefitsItems.length > 0) {
        sections.push({
          type: 'benefits',
          heading: cleanText(benefitsHeading),
          visible: true,
          order: order++,
          background: 'light',
          content: { items: benefitsItems }
        });
      }
    }
  });

  // PROCESS SECTION
  $('h2, h3').each((i, heading) => {
    const headingText = $(heading).text().toLowerCase();
    if ((headingText.includes('process') || headingText.includes('how it works') || 
        headingText.includes('steps') || headingText.includes('procedure') ||
        headingText.includes('how we') || headingText.includes('our approach')) &&
        !sections.find(s => s.type === 'process')) {
      
      const processHeading = $(heading).text();
      const processSteps = [];
      let stepNumber = 1;
      
      $(heading).nextUntil('h2, h3').find('ol li, ul li, .step, [class*="step"]').each((j, item) => {
        const text = $(item).text();
        if (text && text.length > 10) {
          const parts = text.split(':');
          if (parts.length >= 2) {
            processSteps.push({
              stepNumber: stepNumber++,
              title: cleanText(parts[0]),
              description: cleanText(parts.slice(1).join(':'))
            });
          } else {
            processSteps.push({
              stepNumber: stepNumber++,
              title: cleanText(text.substring(0, 60)),
              description: cleanText(text)
            });
          }
        }
      });

      if (processSteps.length > 0) {
        sections.push({
          type: 'process',
          heading: cleanText(processHeading),
          visible: true,
          order: order++,
          background: 'dark',
          content: { steps: processSteps }
        });
      }
    }
  });

  // FAQ SECTION
  $('h2, h3').each((i, heading) => {
    const headingText = $(heading).text().toLowerCase();
    if ((headingText.includes('faq') || headingText.includes('question') || 
        headingText.includes('q&a') || headingText.includes('q & a') ||
        headingText.includes('commonly asked')) &&
        !sections.find(s => s.type === 'faq')) {
      
      const faqHeading = $(heading).text();
      const faqItems = [];
      
      $(heading).nextUntil('h2, h3').find('.faq-item, .accordion-item, details').each((j, item) => {
        const question = $(item).find('summary, .question, h4, h5').first().text();
        const answer = $(item).find('.answer, p').first().text();
        
        if (question && answer && question.length > 5 && answer.length > 10) {
          faqItems.push({
            question: cleanText(question),
            answer: cleanText(answer)
          });
        }
      });

      if (faqItems.length === 0) {
        $(heading).nextUntil('h2, h3').find('dt').each((j, dt) => {
          const question = $(dt).text();
          const answer = $(dt).next('dd').text();
          
          if (question && answer && question.length > 5 && answer.length > 10) {
            faqItems.push({
              question: cleanText(question),
              answer: cleanText(answer)
            });
          }
        });
      }

      if (faqItems.length > 0) {
        sections.push({
          type: 'faq',
          heading: cleanText(faqHeading),
          visible: true,
          order: order++,
          background: 'light',
          content: { items: faqItems }
        });
      }
    }
  });

  // CTA BANNER
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
  const seo = {
    title: $('title').text() || serviceName,
    metaDescription: $('meta[name="description"]').attr('content') || 
                    $('meta[property="og:description"]').attr('content') || ''
  };

  return { sections, seo };
}

async function importService(slug) {
  try {
    // Find service in database
    const service = await Service.findOne({ slug });
    if (!service) {
      console.error(`❌ Service not found: ${slug}`);
      return;
    }

    console.log(`\n📄 Importing: ${service.name}`);

    // Read HTML file
    const htmlPath = path.join(__dirname, 'temp-html', `${slug}.html`);
    const html = await fs.readFile(htmlPath, 'utf-8');

    console.log(`✅ HTML file loaded (${html.length} characters)`);

    // Parse content
    const { sections, seo } = await parseHtmlContent(html, service.name);

    console.log(`✅ Parsed ${sections.length} sections`);

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Create new sections
    const sectionDocs = sections.map(section => ({
      serviceId: service._id,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    // Update SEO
    await Service.findByIdAndUpdate(service._id, { seo });

    console.log(`✅ Seeded to database`);
    console.log(`\nSections created:`);
    sections.forEach(s => console.log(`   - ${s.type}: ${s.heading}`));

  } catch (error) {
    console.error(`❌ Error:`, error.message);
  }
}

async function main() {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node scripts/manualContentImporter.js <service-slug>');
    console.log('\nExample: node scripts/manualContentImporter.js divorce-lawyer');
    console.log('\nMake sure the HTML file exists at: scripts/temp-html/<service-slug>.html');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await importService(slug);

  await mongoose.connection.close();
  console.log('\n✅ Done!\n');
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
