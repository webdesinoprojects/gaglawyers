import { useCallback, useMemo, useState } from 'react';

export const DISCLAIMER_SESSION_KEY = 'gag_disclaimer_accepted';
export const DISCLAIMER_BOT_REGEX = /bot|crawler|spider|crawling/i;

const readInitialVisibility = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  if (DISCLAIMER_BOT_REGEX.test(navigator.userAgent || '')) {
    return false;
  }

  return true;
};

export default function useDisclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(readInitialVisibility);

  const agree = useCallback(() => {
    try {
      sessionStorage.setItem(DISCLAIMER_SESSION_KEY, 'true');
    } catch {
      // no-op; allow UI to continue even if storage is blocked
    }
    setShowDisclaimer(false);
  }, []);

  const decline = useCallback(() => {
    window.location.href = 'https://www.google.com';
  }, []);

  return useMemo(
    () => ({
      showDisclaimer,
      agree,
      decline,
      botRegex: DISCLAIMER_BOT_REGEX,
    }),
    [showDisclaimer, agree, decline]
  );
}
