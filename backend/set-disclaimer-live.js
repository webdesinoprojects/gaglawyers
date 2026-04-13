const dotenv = require('dotenv');

dotenv.config();

const API_BASE = process.env.TARGET_API_URL || `http://localhost:${process.env.PORT || 5000}`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gaglawyers.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const DISCLAIMER_TEXT = [
  'Current rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers to provide information concerning their areas of practice. GAG Lawyers \u2013 Grover & Grover Advocates & Solicitors is, therefore, constrained from providing any further information on this web page.',
  '',
  'The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on "I AGREE", the user acknowledges that:',
  '\u2022 The user wishes to gain more information about GAG Lawyers \u2013 Grover & Grover Advocates & Solicitors, its practice areas and its attorneys, for his/her own information and use',
  "\u2022 The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user's volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship",
  '\u2022 None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.',
  '\u2022 GAG Lawyers \u2013 Grover & Grover Advocates & Solicitors is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.',
].join('\n')
  .replace(/\\u2013/g, '\u2013')
  .replace(/\\u2022/g, '\u2022');

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const msg = data.message || `HTTP ${res.status}`;
    throw new Error(`${path}: ${msg}`);
  }
  return data;
}

async function run() {
  try {
    const login = await api('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    const token = login?.data?.token;
    if (!token) throw new Error('Login succeeded but no token returned');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    await api('/api/settings/disclaimerText', {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        settingValue: DISCLAIMER_TEXT,
        description: 'Disclaimer popup text',
      }),
    });

    await api('/api/settings/disclaimerEnabled', {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        settingValue: true,
        description: 'Enable/disable disclaimer popup',
      }),
    });

    const verify = await api('/api/settings/disclaimerText');
    const value = verify?.data?.settingValue || '';

    console.log('Updated disclaimer via live API successfully.');
    console.log(`API: ${API_BASE}`);
    console.log(`Length: ${value.length}`);
    console.log(`Starts with: ${value.slice(0, 80)}`);
    console.log(`Contains bullet: ${value.includes('\u2022')}`);
  } catch (error) {
    console.error('Failed to update disclaimer via live API:', error.message);
    process.exitCode = 1;
  }
}

run();
