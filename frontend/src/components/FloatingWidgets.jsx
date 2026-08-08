import React, { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import {
  SETTINGS_REV_KEY,
  WIDGET_SETTINGS_CACHE_KEY,
} from '../utils/widgetSettingsCache';

const TAWK_ENABLED = String(import.meta.env.VITE_TAWK_ENABLED || 'false').toLowerCase() === 'true';
const TAWK_PROPERTY_ID = (import.meta.env.VITE_TAWK_PROPERTY_ID || '').trim();
const TAWK_WIDGET_ID = (import.meta.env.VITE_TAWK_WIDGET_ID || '').trim();
const parseSettingBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    if (v === 'true') return true;
    if (v === 'false') return false;
  }
  if (typeof value === 'number') return value === 1;
  return fallback;
};

const FloatingWidgets = () => {
  const location = useLocation();
  const stableTitleRef = useRef(typeof document !== 'undefined' ? document.title : '');
  const [settings, setSettings] = useState({
    whatsappEnabled: false,
    whatsappNumber: '',
    phoneNumber: '',
    tawkEnabled: null,
    tawkPropertyId: '',
    tawkWidgetId: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [phoneVariant, setPhoneVariant] = useState('dark');
  // Gates only the Tawk *script load* — not hasTawkConfig, so widget positioning
  // is unaffected. See the deferral effect below.
  const [tawkAllowed, setTawkAllowed] = useState(false);
  const resolvedTawkEnabled = parseSettingBoolean(settings.tawkEnabled, TAWK_ENABLED);
  const resolvedTawkPropertyId = (settings.tawkPropertyId || TAWK_PROPERTY_ID || '').trim();
  const resolvedTawkWidgetId = (settings.tawkWidgetId || TAWK_WIDGET_ID || '').trim();
  const hasTawkConfig =
    resolvedTawkEnabled && Boolean(resolvedTawkPropertyId) && Boolean(resolvedTawkWidgetId);
  const hasWhatsApp = settings.whatsappEnabled && settings.whatsappNumber;
  const hasPhone = Boolean(settings.phoneNumber);

  // Don't show widgets in admin panel
  const isAdminPanel = location.pathname.startsWith('/admin');

  const fetchWidgetSettingsFromApi = async () => {
    const [
      whatsappEnabledRes,
      whatsappNumberRes,
      phoneNumberRes,
      tawkEnabledRes,
      tawkPropertyIdRes,
      tawkWidgetIdRes,
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/api/settings/whatsappEnabled`),
      fetch(`${API_BASE_URL}/api/settings/whatsappNumber`),
      fetch(`${API_BASE_URL}/api/settings/phoneNumber`),
      fetch(`${API_BASE_URL}/api/settings/tawkEnabled`),
      fetch(`${API_BASE_URL}/api/settings/tawkPropertyId`),
      fetch(`${API_BASE_URL}/api/settings/tawkWidgetId`),
    ]);

    const whatsappEnabledData = await whatsappEnabledRes.json();
    const whatsappNumberData = await whatsappNumberRes.json();
    const phoneNumberData = await phoneNumberRes.json();
    const tawkEnabledData = await tawkEnabledRes.json();
    const tawkPropertyIdData = await tawkPropertyIdRes.json();
    const tawkWidgetIdData = await tawkWidgetIdRes.json();

    const nextSettings = {
      whatsappEnabled: whatsappEnabledData.success ? whatsappEnabledData.data.settingValue : false,
      whatsappNumber: whatsappNumberData.success ? whatsappNumberData.data.settingValue : '',
      phoneNumber: phoneNumberData.success ? phoneNumberData.data.settingValue : '',
      tawkEnabled: tawkEnabledData.success ? tawkEnabledData.data.settingValue : null,
      tawkPropertyId: tawkPropertyIdData.success ? tawkPropertyIdData.data.settingValue : '',
      tawkWidgetId: tawkWidgetIdData.success ? tawkWidgetIdData.data.settingValue : '',
    };

    try {
      sessionStorage.setItem(WIDGET_SETTINGS_CACHE_KEY, JSON.stringify(nextSettings));
    } catch {
      /* ignore */
    }
    return nextSettings;
  };

  const applyCachedOrFetch = async (preferFresh) => {
    if (!preferFresh) {
      try {
        const cached = sessionStorage.getItem(WIDGET_SETTINGS_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {
        /* ignore invalid cache */
      }
    }
    try {
      return await fetchWidgetSettingsFromApi();
    } catch (error) {
      console.error('Error fetching widget settings:', error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    let visibilityTimer;

    if (!isAdminPanel) {
      applyCachedOrFetch(false).then((nextSettings) => {
        if (isMounted && nextSettings) {
          setSettings(nextSettings);
        }
      });
      visibilityTimer = setTimeout(() => {
        if (isMounted) {
          setIsVisible(true);
        }
      }, 1000);
    }

    return () => {
      isMounted = false;
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
    };
  }, [isAdminPanel]);

  /** Same-tab admin save + other-tab settings updates */
  useEffect(() => {
    const refresh = () => {
      applyCachedOrFetch(true).then((next) => {
        if (next) setSettings(next);
      });
    };

    const onInvalidate = () => refresh();

    const onStorage = (e) => {
      if (e.key === SETTINGS_REV_KEY) {
        refresh();
      }
    };

    window.addEventListener('gag:widget-settings-invalidate', onInvalidate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('gag:widget-settings-invalidate', onInvalidate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    if (!hasPhone || isAdminPanel) return undefined;

    const parseRgb = (color) => {
      if (!color || color === 'transparent') return null;
      const match = color.match(/\d+(\.\d+)?/g);
      if (!match || match.length < 3) return null;
      const r = Number(match[0]);
      const g = Number(match[1]);
      const b = Number(match[2]);
      const a = match[3] ? Number(match[3]) : 1;
      if ([r, g, b, a].some((v) => Number.isNaN(v))) return null;
      return { r, g, b, a };
    };

    const blendOver = (base, top) => {
      const a = Math.max(0, Math.min(1, top.a));
      return {
        r: Math.round(top.r * a + base.r * (1 - a)),
        g: Math.round(top.g * a + base.g * (1 - a)),
        b: Math.round(top.b * a + base.b * (1 - a)),
      };
    };

    const luminance = ({ r, g, b }) => {
      const normalize = (v) => {
        const n = v / 255;
        return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
      };
      const R = normalize(r);
      const G = normalize(g);
      const B = normalize(b);
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };

    const detectBackdropVariant = (x, y) => {
      const stack = document
        .elementsFromPoint(x, y)
        .filter((el) => !(el instanceof HTMLElement && el.closest('[data-floating-widget-root]')));

      const target = stack[0];
      if (!target) return 'dark';

      let node = target;
      let color = { r: 248, g: 250, b: 252 };
      let hasImageLikeBackground = false;
      let passes = 0;

      while (node && node !== document.documentElement && passes < 10) {
        const style = window.getComputedStyle(node);
        if (style.backgroundImage && style.backgroundImage !== 'none') {
          hasImageLikeBackground = true;
        }
        const rgb = parseRgb(style.backgroundColor);
        if (rgb && rgb.a > 0.01) {
          color = blendOver(color, rgb);
          if (rgb.a >= 0.98) break;
        }
        node = node.parentElement;
        passes += 1;
      }

      // Image/gradient-heavy areas are best handled by blend mode for reliable contrast.
      if (hasImageLikeBackground) {
        return 'blend';
      }

      return luminance(color) < 0.34 ? 'light' : 'dark';
    };

    let rafId = 0;
    const updateVariant = () => {
      // Sample just outside the left button so we read page backdrop, not the button itself.
      const x = 96;
      const y = Math.max(0, window.innerHeight - 44);
      const next = detectBackdropVariant(x, y);
      setPhoneVariant((prev) => (prev === next ? prev : next));
    };

    const queueUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateVariant);
    };

    queueUpdate();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
    };
  }, [location.pathname, hasPhone, isAdminPanel]);

  // Defer the Tawk script until the visitor interacts, or an 8s fallback fires.
  // Loading it eagerly cost ~423KB across 27 requests on first paint, and its
  // injected iframe accounted for 98% of the page's cumulative layout shift
  // (0.2829 of 0.2884). Chat behaviour is unchanged — it just starts a moment
  // later, and the fallback timer guarantees it appears even if the visitor
  // never scrolls or clicks.
  useEffect(() => {
    if (isAdminPanel || !hasTawkConfig || tawkAllowed) return undefined;

    let timer;
    let fired = false;
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];

    const trigger = () => {
      if (fired) return;
      fired = true;
      events.forEach((e) => window.removeEventListener(e, trigger));
      window.clearTimeout(timer);
      setTawkAllowed(true);
    };

    events.forEach((e) => window.addEventListener(e, trigger, { passive: true }));
    timer = window.setTimeout(trigger, 8000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      window.clearTimeout(timer);
    };
  }, [isAdminPanel, hasTawkConfig, tawkAllowed]);

  useEffect(() => {
    const desiredSrc =
      hasTawkConfig && tawkAllowed && !isAdminPanel
        ? `https://embed.tawk.to/${resolvedTawkPropertyId}/${resolvedTawkWidgetId}`
        : '';

    if (!desiredSrc) {
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
        window.Tawk_API.hideWidget();
      }
      return undefined;
    }

    const existingScripts = Array.from(
      document.querySelectorAll('script[src*="embed.tawk.to/"]')
    );
    const hasExactScript = existingScripts.some((script) => script.src === desiredSrc);

    if (!hasExactScript && existingScripts.length > 0) {
      existingScripts.forEach((script) => script.remove());
      window.Tawk_API = {};
      window.Tawk_LoadStart = null;
    }

    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function' && hasExactScript) {
      return undefined;
    }

    if (hasExactScript) {
      return undefined;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.id = 'gag-tawk-script';
    script.async = true;
    script.src = desiredSrc;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onload = () => {};
    script.onerror = () => {};

    document.body.appendChild(script);
    return undefined;
  }, [
    hasTawkConfig,
    tawkAllowed,
    isAdminPanel,
    resolvedTawkPropertyId,
    resolvedTawkWidgetId,
  ]);

  useEffect(() => {
    if (!hasTawkConfig || isAdminPanel) return undefined;

    const newMessageTitlePattern = /^\s*(\(?\d+\)?\s*)?new message/i;
    const titleElement = document.querySelector('title');
    if (!titleElement) return undefined;

    stableTitleRef.current = document.title;

    const observer = new MutationObserver(() => {
      const currentTitle = document.title || '';

      if (newMessageTitlePattern.test(currentTitle)) {
        document.title = stableTitleRef.current;
        return;
      }

      // Keep track of the latest valid title set by SEO/route changes.
      stableTitleRef.current = currentTitle;
    });

    observer.observe(titleElement, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
    };
  }, [hasTawkConfig, isAdminPanel, location.pathname]);

  useEffect(() => {
    // Only start polling once the script is actually allowed to load, so we
    // don't run a 700ms interval on every page for a widget that isn't there.
    if (!hasTawkConfig || !tawkAllowed || isAdminPanel) return undefined;

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const normalizeTinyTawkLauncher = () => {
      if (!isMobile()) return;

      const iframes = Array.from(document.querySelectorAll('iframe'));
      iframes.forEach((iframe) => {
        const title = String(iframe.getAttribute('title') || '').toLowerCase();
        const src = String(iframe.getAttribute('src') || '').toLowerCase();
        const style = window.getComputedStyle(iframe);
        const width = parseFloat(style.width || '0');
        const height = parseFloat(style.height || '0');
        const isFixed = style.position === 'fixed';
        const isLikelyTawk = title.includes('tawk') || title.includes('chat widget') || src.includes('embed.tawk.to');
        const isLikelyLauncher = isFixed && width > 0 && height > 0 && width <= 52 && height <= 52;

        if (isLikelyTawk && isLikelyLauncher) {
          iframe.style.width = '64px';
          iframe.style.height = '64px';
          iframe.style.minWidth = '64px';
          iframe.style.minHeight = '64px';
          iframe.style.maxWidth = '64px';
          iframe.style.maxHeight = '64px';
          iframe.style.right = '14px';
          iframe.style.bottom = '14px';
          iframe.style.zIndex = '2000000000';
          iframe.style.borderRadius = '9999px';
        }
      });
    };

    const timer = window.setInterval(normalizeTinyTawkLauncher, 700);
    const observer = new MutationObserver(() => normalizeTinyTawkLauncher());
    observer.observe(document.body, { childList: true, subtree: true });
    normalizeTinyTawkLauncher();

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [hasTawkConfig, tawkAllowed, isAdminPanel]);

  const handleWhatsAppClick = () => {
    if (settings.whatsappNumber) {
      const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
      const message = encodeURIComponent('Hello! I would like to inquire about your legal services.');
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    }
  };

  const handlePhoneClick = () => {
    if (settings.phoneNumber) {
      window.location.href = `tel:${settings.phoneNumber}`;
    }
  };

  // Hide entire widget rail on admin; public site always gets guided assistant
  if (isAdminPanel) {
    return null;
  }

  return (
    <>
      {/* Right Side Widgets Stack - Bottom Right */}
      <div className={`fixed ${hasTawkConfig ? 'bottom-24' : 'bottom-6'} right-6 z-50 flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
        {/* WhatsApp Button */}
        {hasWhatsApp && (
          <button
            onClick={handleWhatsAppClick}
            className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            title="Chat on WhatsApp"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat on WhatsApp
            </span>

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </button>
        )}
      </div>

      {/* Phone Button - Bottom Left */}
      {hasPhone && (
        <div data-floating-widget-root className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <button
            onClick={handlePhoneClick}
            className={`group relative w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 border ${
              phoneVariant === 'blend'
                ? 'bg-white text-black border-white/80 mix-blend-difference shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
                : phoneVariant === 'light'
                  ? 'bg-white/95 hover:bg-white text-navy border-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.28)]'
                  : 'bg-navy hover:bg-navy/90 text-white border-white/60 shadow-[0_10px_24px_rgba(11,31,58,0.42)]'
            }`}
            title="Call Us"
          >
            <Phone className="w-7 h-7" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Call: {settings.phoneNumber}
            </span>

            {/* Pulse Animation */}
            <span
              className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                phoneVariant === 'blend' ? 'bg-white' : phoneVariant === 'light' ? 'bg-white' : 'bg-navy'
              }`}
            ></span>
          </button>
        </div>
      )}

    </>
  );
};

export default FloatingWidgets;
