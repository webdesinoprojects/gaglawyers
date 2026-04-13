const dotenv = require('dotenv');
const connectDB = require('./config/db');
const SiteSettings = require('./models/SiteSettings');
const GlobalSettings = require('./models/GlobalSettings');

dotenv.config();

const DISCLAIMER_TEXT = `Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers – Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.

The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on “I AGREE”, the user acknowledges that:
• The user wishes to gain more information about GAG Lawyers – Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use
• The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user’s volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship
• None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.
• GAG Lawyers – Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.`;

async function run() {
  try {
    await connectDB();

    const setting = await SiteSettings.findOneAndUpdate(
      { settingKey: 'disclaimerText' },
      {
        settingValue: DISCLAIMER_TEXT,
        description: 'Disclaimer popup text',
      },
      { new: true, upsert: true, runValidators: true }
    );

    await SiteSettings.findOneAndUpdate(
      { settingKey: 'disclaimerEnabled' },
      {
        settingValue: true,
        description: 'Enable/disable disclaimer popup',
      },
      { new: true, upsert: true, runValidators: true }
    );

    const global = await GlobalSettings.findOne();
    if (global) {
      global.legal = global.legal || {};
      global.legal.disclaimerText = DISCLAIMER_TEXT;
      await global.save();
      console.log('Updated GlobalSettings.legal.disclaimerText');
    } else {
      console.log('GlobalSettings document not found; skipped global legal disclaimer update.');
    }

    console.log('Updated SiteSettings.disclaimerText successfully.');
    console.log(`Setting id: ${setting._id}`);
  } catch (error) {
    console.error('Failed to update disclaimer text:', error.message);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
