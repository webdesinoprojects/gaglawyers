const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

const verifyRecaptcha = async (token, remoteIp = '') => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret || !token) {
    return false;
  }

  try {
    const payload = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      payload.append('remoteip', remoteIp);
    }

    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    const isValid = Boolean(result?.success);
    if (!isValid) {
      const errorCodes = Array.isArray(result?.['error-codes']) ? result['error-codes'].join(', ') : 'unknown';
      console.warn(`reCAPTCHA rejected: ${errorCodes}`);
    }
    return isValid;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

module.exports = {
  verifyRecaptcha,
};
