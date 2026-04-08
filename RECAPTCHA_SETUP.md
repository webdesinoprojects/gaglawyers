# Google reCAPTCHA v2 Setup Guide

## Overview

All public-facing forms on the GAG Lawyers website now include Google reCAPTCHA v2 for enhanced security against spam and bot submissions.

## Forms with reCAPTCHA

1. **Contact Page** (`/contact`) - Main contact form
2. **Consultation Form** - Service page sidebar form
3. **Dynamic Forms** - CMS-managed forms (appointment, CTA forms, etc.)
4. **Home Page Forms** - Appointment and CTA forms

## Setup Instructions

### 1. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Fill in the details:
   - **Label**: GAG Lawyers Website
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `gaglawyers.com` (production)
     - `www.gaglawyers.com` (production)
     - Your Vercel deployment domain (e.g., `gaglawyers.vercel.app`)
   - Accept the reCAPTCHA Terms of Service
4. Click "Submit"
5. Copy the **Site Key** and **Secret Key**

### 2. Configure Environment Variables

#### Frontend (Vite)

**Local Development** (`.env.local`):
```env
VITE_RECAPTCHA_SITE_KEY=your-site-key-here
```

**Production** (Vercel Dashboard):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - Name: `VITE_RECAPTCHA_SITE_KEY`
   - Value: Your production site key
   - Environment: Production

#### Backend (Node.js/Express)

**Local Development** (`.env`):
```env
RECAPTCHA_SECRET_KEY=your-secret-key-here
```

**Production** (Vercel Dashboard):
1. Go to your backend Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - Name: `RECAPTCHA_SECRET_KEY`
   - Value: Your production secret key
   - Environment: Production

### 3. Backend Verification (Required)

Update your contact controller to verify the captcha token:

```javascript
// backend/controllers/contactController.js
const axios = require('axios');

const verifyCaptcha = async (token) => {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );
    return response.data.success;
  } catch (error) {
    console.error('Captcha verification error:', error);
    return false;
  }
};

const createContactInquiry = async (req, res) => {
  try {
    const { captchaToken, ...formData } = req.body;

    // Verify captcha
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification required'
      });
    }

    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification failed'
      });
    }

    // Continue with form submission...
    // Your existing contact form logic here
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install axios
```

## Testing

### Development Testing

For development, you can use Google's test keys:

**Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
**Secret Key**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

These test keys will always pass validation and show a warning message in the reCAPTCHA widget.

### Production Testing

1. Test form submission with captcha completed
2. Test form submission without completing captcha (should show error)
3. Test captcha expiration (wait 2 minutes after completing captcha)
4. Verify backend logs show successful captcha verification

## Customization

### Theme

Change the captcha theme in each form component:

```jsx
<ReCaptcha
  theme="light"  // or "dark"
  // ...
/>
```

### Size

Change the captcha size:

```jsx
<ReCaptcha
  size="normal"  // or "compact"
  // ...
/>
```

## Troubleshooting

### Captcha not showing

1. Check that `VITE_RECAPTCHA_SITE_KEY` is set correctly
2. Verify the domain is added in reCAPTCHA admin console
3. Check browser console for errors
4. Clear browser cache and reload

### Captcha verification failing

1. Verify `RECAPTCHA_SECRET_KEY` is set in backend
2. Check backend logs for verification errors
3. Ensure the secret key matches the site key
4. Verify network connectivity to Google's servers

### "Invalid domain" error

1. Add your domain to the reCAPTCHA admin console
2. For localhost, add `localhost` (without port)
3. For production, add both `domain.com` and `www.domain.com`

## Security Best Practices

1. **Never expose the secret key** - Keep it only on the backend
2. **Always verify on the backend** - Never trust client-side validation alone
3. **Use HTTPS in production** - reCAPTCHA requires HTTPS for production domains
4. **Monitor failed attempts** - Set up logging for failed captcha verifications
5. **Rate limiting** - Implement rate limiting in addition to captcha

## Resources

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [react-google-recaptcha Documentation](https://github.com/dozoisch/react-google-recaptcha)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google reCAPTCHA documentation
3. Check browser console and backend logs
4. Verify all environment variables are set correctly
