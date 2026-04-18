/**
 * Service Content Scraper & Seeder
 * 
 * Scrapes all 56 service pages from gaglawyers.com
 * Parses content into section structure
 * Seeds directly into MongoDB
 * 
 * Usage: node scripts/scrapeAndSeedServices.js
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
const SITEMAP_URL = 'https://www.gaglawyers.com/services.xml';
const DELAY_MS = 1000; // 1 second between requests

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
 * STEP 1: Discover all service URLs
 */
async function discoverServiceUrls() {
  console.log('\n📋 STEP 1: Discovering service URLs...\n');

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  };

  try {
    // Try sitemap first
    console.log('Checking services.xml sitemap...');
    const sitemapResponse = await axios.get(SITEMAP_URL, {
      timeout: 10000,
      headers
    });

    const $ = cheerio.load(sitemapResponse.data, { xmlMode: true });
    const urls = [];

    $('url loc').each((i, elem) => {
      const url = $(elem).text();
      // Match service URLs
      if (url.includes('/services/') || url.includes('/practice-areas/')) {
        urls.push(url);
      }
    });

    if (urls.length > 0) {
      console.log(`✅ Found ${urls.length} service URLs from sitemap\n`);
      return urls;
    }
  } catch (error) {
    console.log('⚠️  Sitemap not available, trying services page...');
  }

  // Fallback: Scrape services page
  try {
    const servicesResponse = await axios.get(`${SITE_URL}/services`, {
      timeout: 10000,
      headers
    });

    const $ = cheerio.load(servicesResponse.data);
    const urls = [];

    // Find all service links
    $('a[href*="/services/"], a[href*="/practice-areas/"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && !href.includes('#')) {
        const fullUrl = getAbsoluteUrl(href);
        if (!urls.includes(fullUrl)) {
          urls.push(fullUrl);
        }
      }
    });

    console.log(`✅ Found ${urls.length} service URLs from services page\n`);
    return urls;
  } catch (error) {
    console.error('❌ Failed to discover service URLs:', error.message);
    return [];
  }
}

/**
 * STEP 2: Scrape a single service page
 */
async function scrapeServicePage(url) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  };

  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers
    });

    const $ = cheerio.load(response.data);
    
    // Extract slug from URL
    const urlParts = url.split('/');
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

    // Extract name (h1 or title)
    let name = $('h1').first().text();
    if (!name) {
      name = $('title').text().split('|')[0].split('-')[0];
    }
    name = cleanText(name);

    const sections = [];
    let order = 0;

    // HERO SECTION
    const heroHeading = $('h1').first().text();
    const heroSubheading = $('h1').first().next('p').text() || 
                          $('.hero p, .banner p').first().text();
    const heroBgImage = $('.hero, .banner, header').first().css('background-image') ||
                       $('.hero img, .banner img').first().attr('src');
    
    if (heroHeading) {
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
          backgroundImageUrl: heroBgImage ? getAbsoluteUrl(heroBgImage.replace(/url\(['"]?|['"]?\)/g, '')) : ''
        }
      });
    }

    // OVERVIEW SECTION
    const overviewHeading = $('h2').first().text();
    const overviewBody = [];
    $('h2').first().nextUntil('h2, h3').filter('p').each((i, elem) => {
      const text = $(elem).text();
      if (text && text.length > 20) {
        overviewBody.push(cleanText(text));
      }
    });

    if (overviewBody.length > 0) {
      sections.push({
        type: 'overview',
        heading: cleanText(overviewHeading) || 'Overview',
        visible: true,
        order: order++,
        background: 'light',
        content: {
          body: overviewBody.join('\n\n')
        }
      });
    }

    // BENEFITS SECTION
    const benefitsItems = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('benefit') || headingText.includes('why choose') || 
          headingText.includes('advantage') || headingText.includes('what we offer')) {
        
        const benefitsHeading = $(heading).text();
        
        // Look for list items or cards
        $(heading).nextUntil('h2, h3').find('li, .card, .benefit-item').each((j, item) => {
          const title = $(item).find('h4, h5, strong, b').first().text() || 
                       $(item).contents().first().text();
          const description = $(item).find('p').text() || 
                            $(item).text().replace(title, '');
          
          if (title && description) {
            benefitsItems.push({
              icon: 'CheckCircle',
              title: cleanText(title),
              description: cleanText(description)
            });
          }
        });

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
    const processSteps = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('process') || headingText.includes('how it works') || 
          headingText.includes('steps') || headingText.includes('procedure')) {
        
        const processHeading = $(heading).text();
        let stepNumber = 1;
        
        // Look for numbered items or steps
        $(heading).nextUntil('h2, h3').find('li, .step, .process-item').each((j, item) => {
          const title = $(item).find('h4, h5, strong, b').first().text() || 
                       $(item).contents().first().text();
          const description = $(item).find('p').text() || 
                            $(item).text().replace(title, '');
          
          if (title && description) {
            processSteps.push({
              stepNumber: stepNumber++,
              title: cleanText(title),
              description: cleanText(description)
            });
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
    const faqItems = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('faq') || headingText.includes('question') || 
          headingText.includes('q&a') || headingText.includes('q & a')) {
        
        const faqHeading = $(heading).text();
        
        // Look for accordion or Q&A pairs
        $(heading).nextUntil('h2, h3').find('.faq-item, .accordion-item, dt, h4, h5').each((j, item) => {
          const question = $(item).text();
          const answer = $(item).next('dd, p, .answer').text() || 
                        $(item).nextUntil('dt, h4, h5').filter('p').first().text();
          
          if (question && answer && question.length > 10 && answer.length > 10) {
            faqItems.push({
              question: cleanText(question),
              answer: cleanText(answer)
            });
          }
        });

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
      title: $('title').text() || name,
      metaDescription: $('meta[name="description"]').attr('content') || 
                      $('meta[property="og:description"]').attr('content') || ''
    };

    return {
      slug,
      name,
      sections,
      seo,
      success: true
    };

  } catch (error) {
    return {
      slug: url.split('/').pop(),
      error: error.message,
      success: false
    };
  }
}

/**
 * STEP 3: Seed into MongoDB
 */
async function seedService(serviceData) {
  try {
    const { slug, name, sections, seo } = serviceData;

    // Find existing service by slug
    const existingService = await Service.findOne({ slug });

    if (!existingService) {
      console.log(`⚠️  Service not found in DB: ${slug}`);
      return { success: false, error: 'Service not found in database' };
    }

    // Delete existing sections for this service
    await ServiceSection.deleteMany({ serviceId: existingService._id });

    // Create new sections
    const sectionDocs = sections.map(section => ({
      serviceId: existingService._id,
      type: section.type,
      visible: section.visible,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    // Update service SEO
    await Service.findByIdAndUpdate(existingService._id, {
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
  console.log('🚀 Service Content Scraper & Seeder\n');
  console.log('=' .repeat(50));

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }

  // Step 1: Discover URLs
  const urls = await discoverServiceUrls();
  
  if (urls.length === 0) {
    console.error('❌ No service URLs found. Exiting.');
    process.exit(1);
  }

  console.log('📋 Discovered URLs:');
  urls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
  console.log('');

  // Step 2 & 3: Scrape and seed each service
  const results = {
    total: urls.length,
    succeeded: 0,
    failed: 0,
    failedServices: []
  };

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const slug = url.split('/').pop() || url.split('/').slice(-2)[0];
    
    console.log(`\n[${i + 1}/${urls.length}] Scraping: ${slug}...`);

    // Scrape
    const serviceData = await scrapeServicePage(url);
    
    if (!serviceData.success) {
      console.log(`   ❌ Scraping failed: ${serviceData.error}`);
      results.failed++;
      results.failedServices.push({ url, slug, error: serviceData.error });
      await sleep(DELAY_MS);
      continue;
    }

    console.log(`   ✅ Scraped ${serviceData.sections.length} sections`);

    // Seed
    const seedResult = await seedService(serviceData);
    
    if (!seedResult.success) {
      console.log(`   ❌ Seeding failed: ${seedResult.error}`);
      results.failed++;
      results.failedServices.push({ url, slug, error: seedResult.error });
    } else {
      console.log(`   ✅ Seeded to database`);
      results.succeeded++;
    }

    // Delay between requests
    await sleep(DELAY_MS);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
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
    results.failedServices.forEach(({ slug, error }) => {
      console.log(`   - ${slug}: ${error}`);
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
