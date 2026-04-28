require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');
const { buildLocationPageSlug, generateSlug } = require('../utils/slugify');

const APPLY = process.argv.includes('--apply');

const DEFAULT_RAW_LOCATIONS = `
Ladakh region
Kashmir
Agra
Netaji Subhash Place
Preet Vihar
Laxmi Nagar
Chandni Chowk
Nirman Vihar
Patel Nagar
Karkarduma
Kaushambi
Pitampura
Rithala
Raipur
Motihari
Chhapra
Katihar
Begusarai
Arrah
Darbhanga
Muzaffarpur
Bhagalpur
Gaya
Patna
Goalpara
North Lakhimpur
Sivasagar
Diphu
Karimganj
Gujarat
Surendranagar
Tezpur
Godhra
Bongaigaon
Porbandar
Tinsukia
Gandhidham
Valsad
Nagaon
Jorhat
Dibrugarh
Silchar
Guwahati
Nizamabad
Arunachal Pradesh
Warangal
Banderdewa
Hyderabad
Tamil Nadu
Kanchipuram
Cuddalore
Bharuch
Nadiad
Tiruppur
Morbi
Namsai
Anand Vihar
Ziro
Malappuram
Wokha
Junagadh
Tuensang
Mokokchung
Naharlagun
Kohima
Gandhinagar
Dimapur
Thanjavur
Pasighat
Champhai
Itanagar
Lunglei
Aizawl
Thoothukudi
Mizoram
Jamnagar
Meghalaya
Andhra Pradesh
Vellore
Bhavnagar
Gudivada
Tura
Shillong
Rajkot
Williamnagar
Tirunelveli
Nongstoin
Manipur
Hindupur
Wangjing
Salem
Narasaraopet
Vadodara
Adoni
Jiribam
Tiruchirappalli
Thoubal
Proddatur
Surat
Imphal
Madurai
Maharashtra
Tenali
Ahmedabad
Vizianagaram
Ahmednagar
Dhule
Coimbatore
Latur
Gao
Akola
Calangute
Sangli
Eluru
Canacona
Jalgaon
Quepem
Chennai
Nanded
Ongole
Amravati
Kolhapur
Solapur
Navi Mumbai
Gangtok
Chittoor
Sikkim
Aurangabad
Vasai-Virar
Bicholim
Kalyan-Dombivli
Nashik
Valpoi
Thane
Machilipatnam
Nagpur
Pune
Mumbai
Odisha
Kadapa
Sancoale
Anantapur
Madhya Pradesh
Mandsaur
Shivpuri
Kakinada
Chhindwara
Khandwa
Rajahmundry
Rewa
Ratlam
Balasore
Satna
Mormugao
Dewas
Sagar
Ponda
Ujjain
Gwalior
Puri
Jabalpur
Tirupati
Mapusa
Bhopal
Indore
Sambalpur
Karnataka
Nellore
Margao
Brahmapur
Guntur
Panaji
Udupi
Bidar
Raichur
Rourkela
Tumkur
Vijayawada
Shimoga
Cuttack
Bijapur
Bellary
Davanagere
Visakhapatnam
Bhubaneswar
Gulbarga
Belgaum
Pushkar
Mangalore
Chhattisgarh
Bharatpur
Mysuru
Hubli-Dharwad
Bengaluru
Mount Abu
Jagdalpur
Kerala
Idukki
Nagaland
Jaipur
Ambikapur
Wayanad
Rajasthan
Raigarh
Vaishali
Green Park
Hauz Khas
Malviya Nagar
Badarpur
Sarita Vihar
Jasola
Okhla
Nehru Place
Lajpat Nagar
Khan Market
Janpath
Kalkaji
Shalimar Bagh
Saket
Dilshad Garden
Shahdara
Pratap Nagar
Azadpur
Shastri Nagar
Adarsh Nagar
Inderlok
NSP
Alwar
Ranikhet
Chamoli
Ladakh
Jammu and Kashmir
Uttarakhand
Kashmir region
Moradabad
Gangotri
Udhampur
Aligarh
Kargil
Leh
Pulwama
Baramulla
Muzaffarnagar
Jhansi
Saharanpur
Chittorgarh
Mathura
Srinagar
Bareilly
Meerut
Allahabad
Lucknow
Hanumangarh
Jodhpur
Bikaner
Patiala
Jaisalmer
Kota
Udaipur
Ajmer
Mussoorie
Nainital
Hoshiarpur
Bathinda
Almora
Jalandhar
Rishikesh
Ludhiana
Haridwar
Dehradun
Dalhousie
Kasauli
Kinnaur
Solan
Mandi
Kullu
Dharamshala
Manali
Shimla
Fatehgarh Sahib
Faridkot
Sangrur
Gurdaspur
Kapurthala
Moga
Mohali
Pathankot
Faridabad
Sonipat
Gurugram
Ghaziabad
Noida
Delhi
`;

const LOCATIONS_FILE_ARG_INDEX = process.argv.findIndex((arg) => arg === '--locations-file');
const LOCATIONS_FILE =
  LOCATIONS_FILE_ARG_INDEX !== -1 && process.argv[LOCATIONS_FILE_ARG_INDEX + 1]
    ? path.resolve(process.cwd(), process.argv[LOCATIONS_FILE_ARG_INDEX + 1])
    : path.resolve(__dirname, '..', 'location-list-user.txt');

function toTitleFromSlug(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function makeContent(serviceName, city) {
  const lowered = String(serviceName || '').toLowerCase();
  return {
    heading: `${serviceName} in ${city}`,
    intro: `Need ${lowered} assistance in ${city}? Our legal team provides focused guidance and representation.`,
    sections: [
      {
        title: `${serviceName} Support in ${city}`,
        content: `We handle ${lowered} matters in ${city} with practical strategy and clear communication.`,
      },
    ],
  };
}

function makeSeo(serviceName, city) {
  const lowered = String(serviceName || '').toLowerCase();
  return {
    title: `${serviceName} in ${city} | GAG Lawyers`,
    description: `Professional ${lowered} support in ${city}. Speak with our team for case-focused legal guidance.`,
    keywords: `${lowered}, ${city.toLowerCase()}, legal services`,
    h1: `${serviceName} in ${city}`,
  };
}

function parseAndDedupeLocations(raw) {
  const lines = String(raw || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);

  const deduped = [];
  const seenSlugs = new Set();

  for (const name of lines) {
    const slug = generateSlug(name);
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    deduped.push({ inputName: name, slug, city: toTitleFromSlug(slug) });
  }
  return deduped;
}

async function run() {
  await connectDB();
  const RAW_LOCATIONS = fs.existsSync(LOCATIONS_FILE)
    ? fs.readFileSync(LOCATIONS_FILE, 'utf8')
    : DEFAULT_RAW_LOCATIONS;

  const services = await Service.find({}).select('_id slug name title').sort({ name: 1 }).lean();
  if (!services.length) {
    throw new Error('No services found in database.');
  }

  const locations = parseAndDedupeLocations(RAW_LOCATIONS);
  const expectedTotal = services.length * locations.length;

  const existingSlugs = new Set(
    (await LocationPage.find({}).select('slug').lean()).map((doc) => String(doc.slug || '').toLowerCase())
  );

  const toInsert = [];
  let existingCount = 0;
  for (const service of services) {
    const serviceName = service.name || service.title || service.slug;
    for (const loc of locations) {
      const pageSlug = buildLocationPageSlug(service.slug, loc.city).toLowerCase();
      if (existingSlugs.has(pageSlug)) {
        existingCount += 1;
        continue;
      }
      toInsert.push({
        service: service._id,
        serviceName,
        city: loc.city,
        slug: pageSlug,
        content: makeContent(serviceName, loc.city),
        seo: makeSeo(serviceName, loc.city),
        isActive: true,
      });
    }
  }

  console.log('\n=== Create Location Pages For All 56 Services ===');
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Location source: ${fs.existsSync(LOCATIONS_FILE) ? LOCATIONS_FILE : 'embedded default list'}`);
  console.log(`Services found: ${services.length}`);
  console.log(`Input locations: ${RAW_LOCATIONS.split('\n').map((x) => x.trim()).filter(Boolean).length}`);
  console.log(`Unique locations by slug: ${locations.length}`);
  console.log(`Expected combinations: ${expectedTotal}`);
  console.log(`Already existing (skipped): ${existingCount}`);
  console.log(`To insert: ${toInsert.length}`);

  if (!APPLY) {
    console.log('Dry run complete. Re-run with --apply to insert.');
    await mongoose.disconnect();
    return;
  }

  let inserted = 0;
  const chunkSize = 500;
  for (let i = 0; i < toInsert.length; i += chunkSize) {
    const chunk = toInsert.slice(i, i + chunkSize);
    await LocationPage.insertMany(chunk, { ordered: false });
    inserted += chunk.length;
  }

  const finalTotal = await LocationPage.countDocuments();
  console.log(`Inserted: ${inserted}`);
  console.log(`Final total location pages: ${finalTotal}`);

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('\nScript failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
