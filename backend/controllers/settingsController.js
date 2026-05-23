const SiteSettings = require('../models/SiteSettings');
const { OFFICE_ADDRESS_LINE } = require('../config/officeAddress');

const DEFAULT_OTHER_OFFICES = [
  {
    heading: 'Mumbai Office',
    address: 'Maker Chamber VI, Nariman Point, Mumbai, Maharashtra 400021',
    email: 'mumbai@gaglawyers.com',
    phone: '+91 22 4012 3456',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Nariman%20Point%2C%20Mumbai&output=embed',
  },
  {
    heading: 'Chandigarh Office',
    address: 'SCO 17, Sector 17-C, Chandigarh, 160017',
    email: 'chandigarh@gaglawyers.com',
    phone: '+91 172 405 8899',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Sector%2017%20Chandigarh&output=embed',
  },
];

const DEFAULT_MAIN_OFFICE_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6998.3752460208125!2d77.13081933769948!3d28.71393836202312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d010b75f3e47d%3A0x4e92383cc436853f!2sGAG%20Lawyers%20-%20Grover%20%26%20Grover%2C%20Advocates%20%7C%20Best%20Divorce%20Lawyer%20in%20Delhi%2C%20Property%20Lawyer%20in%20Delhi%2C%20Civil%20%26%20Criminal%20Lawyers!5e0!3m2!1sen!2sin!4v1775508641842!5m2!1sen!2sin';

const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await SiteSettings.findOne({ settingKey: key });

    if (!setting) {
      const defaultValues = {
        disclaimerEnabled: true,
        disclaimerText: `Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers – Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.

The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on “I AGREE”, the user acknowledges that:
• The user wishes to gain more information about GAG Lawyers – Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use
• The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user’s volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship
• None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.
• GAG Lawyers – Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.`,
        rightClickDisabled: false,
        copyProtectionEnabled: false,
        whatsappEnabled: true,
        whatsappNumber: '+919996263370',
        tawkEnabled: false,
        tawkPropertyId: '',
        tawkWidgetId: '',
        phoneNumber: '+919996263370',
        email: 'contact@gaglawyers.com',
        address: OFFICE_ADDRESS_LINE,
        contactEmails: ['contact@gaglawyers.com'],
        contactPhones: ['+91 99962 63370'],
        officeAddresses: [OFFICE_ADDRESS_LINE],
        mainOfficeMapEmbedUrl: DEFAULT_MAIN_OFFICE_MAP_EMBED_URL,
        otherOffices: DEFAULT_OTHER_OFFICES,
        footerLocationsLimit: 200,
        footerLocationSlugs: [],
      };

      return res.status(200).json({
        success: true,
        data: {
          settingKey: key,
          settingValue: defaultValues[key] || null,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getAllSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.find();
    res.status(200).json({
      success: true,
      count: settings.length,
      data: settings,
    });
  } catch (error) {
    console.error('Get all settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { settingValue, description } = req.body;

    const setting = await SiteSettings.findOneAndUpdate(
      { settingKey: key },
      { settingValue, description },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getSetting,
  getAllSettings,
  updateSetting,
};
