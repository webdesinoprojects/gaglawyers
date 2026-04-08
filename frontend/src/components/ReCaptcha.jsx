import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

/**
 * ReCaptcha Component
 * 
 * A reusable Google reCAPTCHA v2 component for form validation
 * 
 * @param {function} onChange - Callback when captcha is completed (receives token)
 * @param {function} onExpired - Callback when captcha expires
 * @param {function} onError - Callback when captcha encounters an error
 * @param {string} theme - 'light' or 'dark' (default: 'light')
 * @param {string} size - 'normal' or 'compact' (default: 'normal')
 */
const ReCaptcha = forwardRef(({ 
  onChange, 
  onExpired, 
  onError,
  theme = 'light',
  size = 'normal'
}, ref) => {
  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        ref={ref}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onChange}
        onExpired={onExpired}
        onErrored={onError}
        theme={theme}
        size={size}
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
