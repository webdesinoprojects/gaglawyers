require('dotenv').config();
const mongoose = require('mongoose');
const ContactInquiry = require('./models/ContactInquiry');

const sampleContacts = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-99962-63370',
    serviceOfInterest: 'Bail & Anticipatory Bail Cases',
    message: 'I need urgent legal assistance for an anticipatory bail application. The matter is related to a cheque bounce case. Please contact me as soon as possible.',
    status: 'new'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@business.com',
    phone: '+91-87654-32109',
    serviceOfInterest: 'Divorce & Matrimonial Cases',
    message: 'Looking for legal consultation regarding divorce proceedings. Need advice on custody and property settlement matters. Prefer to schedule a meeting this week.',
    status: 'in-progress'
  },
  {
    name: 'Amit Verma',
    email: 'amit.v@email.com',
    phone: '+91-76543-21098',
    serviceOfInterest: 'Property Law & Real Estate Disputes',
    message: 'I have a property dispute with my neighbor regarding boundary issues. Need legal representation for filing a case in civil court. Please provide consultation details.',
    status: 'new'
  }
];

async function addContactForms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing contact forms (optional)
    await ContactInquiry.deleteMany({});
    console.log('Cleared existing contact forms');

    // Add new contact forms
    const contacts = await ContactInquiry.insertMany(sampleContacts);
    console.log(`Added ${contacts.length} contact form submissions`);
    
    contacts.forEach(contact => {
      console.log(`- ${contact.name} (${contact.serviceOfInterest}) - Status: ${contact.status}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error adding contact forms:', error);
    process.exit(1);
  }
}

addContactForms();
