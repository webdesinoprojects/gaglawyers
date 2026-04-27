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
        otherOffices: DEFAULT_OTHER_OFFICES,
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
