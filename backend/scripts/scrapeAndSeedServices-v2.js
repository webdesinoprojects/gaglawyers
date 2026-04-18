/**
 * Service Content Scraper & Seeder - Version 2
 * 
 * Uses existing service slugs from database to construct URLs
 * Scrapes content and updates sections
 * 
 * Usage: node scripts/scrapeAndSeedServices-v2.js
 */

require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// Import models
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const SITE_URL = 'https://www.gaglawyers.com';
const DELAY_MS = 2000; // 2 seconds between requests (be more respectful)

// Utility: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Clean text
const cleanText = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
};

// Utility: Extract absolute URL
const getAbsoluteUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return SITE_URL + url;
  return SITE_URL + '/' + url;
};

/**
 * STEP 1: Get all services from database
 */
async function getServicesFromDatabase() {
  console.log('\n📋 STEP 1: Loading services from database...\n');
  
  const services = await Service.find({}).select('_id name slug').sort('name');
  console.log(`✅ Found ${services.length} services in database\n`);
  
  return services;
}

/**
 * STEP 2: Scrape a single service page
 */
async function scrapeServicePage(url, serviceName) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://www.gaglawyers.com/',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin'
  };

  try {
    const response = await axios.get(url, {
      timeout: 20000,
      headers,
      maxRedirects: 5
    });

    const $ = cheerio.load(response.data);
    
    const sections = [];
    let order = 0;

    // HERO SECTION - Look for main heading and intro
    const heroHeading = $('h1').first().text() || serviceName;
    const heroSubheading = $('h1').first().next('p').text() || 
                          $('h1').first().parent().find('p').first().text() ||
                          $('.hero-content p, .banner-content p, .page-header p').first().text();
    
    // Try to find hero background image
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

    // OVERVIEW SECTION - First content section after hero
    const firstH2 = $('h2').first();
    if (firstH2.length) {
      const overviewHeading = firstH2.text();
      const overviewParagraphs = [];
      
      // Get all paragraphs until next h2
      firstH2.nextUntil('h2, h3, section').filter('p').each((i, elem) => {
        const text = $(elem).text();
        if (text && text.length > 30) {
          overviewParagraphs.push(cleanText(text));
        }
      });

      // Also check if paragraphs are in a container
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

    // BENEFITS SECTION - Look for benefits, advantages, why choose us
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if ((headingText.includes('benefit') || headingText.includes('why choose') || 
          headingText.includes('advantage') || headingText.includes('what we offer') ||
          headingText.includes('why hire') || headingText.includes('our expertise')) &&
          !sections.find(s => s.type === 'benefits')) {
        
        const benefitsHeading = $(heading).text();
        const benefitsItems = [];
        
        // Look for list items
        $(heading).nextUntil('h2, h3').find('ul li, ol li').each((j, item) => {
          const text = $(item).text();
          if (text && text.length > 10) {
            // Try to split into title and description
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

        // Look for card-style benefits
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

    // PROCESS SECTION - Look for process, steps, how it works
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if ((headingText.includes('process') || headingText.includes('how it works') || 
          headingText.includes('steps') || headingText.includes('procedure') ||
          headingText.includes('how we') || headingText.includes('our approach')) &&
          !sections.find(s => s.type === 'process')) {
        
        const processHeading = $(heading).text();
        const processSteps = [];
        let stepNumber = 1;
        
        // Look for numbered or ordered list items
        $(heading).nextUntil('h2, h3').find('ol li, ul li, .step, [class*="step"]').each((j, item) => {
          const text = $(item).text();
          if (text && text.length > 10) {
            // Try to split into title and description
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

    // FAQ SECTION - Look for FAQs
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if ((headingText.includes('faq') || headingText.includes('question') || 
          headingText.includes('q&a') || headingText.includes('q & a') ||
          headingText.includes('commonly asked')) &&
          !sections.find(s => s.type === 'faq')) {
        
        const faqHeading = $(heading).text();
        const faqItems = [];
        
        // Look for accordion items or Q&A pairs
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

        // Try dt/dd pairs
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

    // CTA BANNER (always add at end)
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

    return {
      sections,
      seo,
      success: true
    };

  } catch (error) {
    return {
      error: error.message,
      success: false
    };
  }
}

/**
 * STEP 3: Seed into MongoDB
 */
async function seedService(serviceId, serviceData) {
  try {
    const { sections, seo } = serviceData;

    // Delete existing sections for this service
    await ServiceSection.deleteMany({ serviceId });

    // Create new sections
    const sectionDocs = sections.map(section => ({
      serviceId,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    // Update service SEO
    await Service.findByIdAndUpdate(serviceId, {
      seo: {
        title: seo.title,
        metaDescription: seo.metaDescription
      }
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Service Content Scraper & Seeder v2\n');
  console.log('=' .repeat(60));

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }

  // Step 1: Get services from database
  const services = await getServicesFromDatabase();
  
  if (services.length === 0) {
    console.error('❌ No services found in database. Exiting.');
    process.exit(1);
  }

  // Step 2 & 3: Scrape and seed each service
  const results = {
    total: services.length,
    succeeded: 0,
    failed: 0,
    failedServices: []
  };

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const url = `${SITE_URL}/services/${service.slug}`;
    
    console.log(`\n[${i + 1}/${services.length}] ${service.name}`);
    console.log(`   URL: ${url}`);

    // Scrape
    const serviceData = await scrapeServicePage(url, service.name);
    
    if (!serviceData.success) {
      console.log(`   ❌ Scraping failed: ${serviceData.error}`);
      results.failed++;
      results.failedServices.push({ 
        name: service.name,
        slug: service.slug,
        url, 
        error: serviceData.error 
      });
      await sleep(DELAY_MS);
      continue;
    }

    console.log(`   ✅ Scraped ${serviceData.sections.length} sections`);

    // Seed
    const seedResult = await seedService(service._id, serviceData);
    
    if (!seedResult.success) {
      console.log(`   ❌ Seeding failed: ${seedResult.error}`);
      results.failed++;
      results.failedServices.push({ 
        name: service.name,
        slug: service.slug,
        url, 
        error: seedResult.error 
      });
    } else {
      console.log(`   ✅ Seeded to database`);
      results.succeeded++;
    }

    // Delay between requests
    await sleep(DELAY_MS);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SUMMARY\n');
  console.log(`Total services: ${results.total}`);
  console.log(`✅ Succeeded: ${results.succeeded}`);
  console.log(`❌ Failed: ${results.failed}`);

  // Save failed services
  if (results.failedServices.length > 0) {
    const failedPath = path.join(__dirname, 'failed-services.json');
    await fs.writeFile(failedPath, JSON.stringify(results.failedServices, null, 2));
    console.log(`\n⚠️  Failed services saved to: ${failedPath}`);
    console.log('\nFailed services:');
    results.failedServices.forEach(({ name, slug, error }) => {
      console.log(`   - ${name} (${slug}): ${error}`);
    });
  }

  console.log('\n✅ Script completed!\n');

  // Close connection
  await mongoose.connection.close();
  process.exit(0);
}

// Run script
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { scrapeServicePage, seedService };
