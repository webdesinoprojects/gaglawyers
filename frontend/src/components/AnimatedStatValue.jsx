import { useEffect, useRef, useState } from 'react';

function parseStatString(str) {
  const s = String(str ?? '').trim();
  if (!s) return { type: 'raw', text: '—' };
  if (/^[\d,.]+%$/.test(s.replace(/\s/g, ''))) {
    const n = parseFloat(s.replace(/%/g, '').replace(/,/g, ''));
    if (Number.isFinite(n)) {
      const decimals = Number.isInteger(n) ? 0 : Math.min(2, (n.toString().split('.')[1] || '').length);
      return { type: 'number', target: n, suffix: '%', decimals };
    }
  }
  const m = s.match(/^([\d,]+)(\D*)$/);
  if (m) {
    const n = parseInt(m[1].replace(/,/g, ''), 10);
    if (Number.isFinite(n)) return { type: 'number', target: n, suffix: m[2] || '', decimals: 0 };
  }
  return { type: 'raw', text: s };
}

function formatNumber(n, decimals) {
  if (decimals > 0) return n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return Math.round(n).toLocaleString('en-IN');
}

/**
 * Counts up to a numeric stat when scrolled into view (e.g. "5000+", "98%").
 * Non-numeric values render as static text.
 */
export default function AnimatedStatValue({ value, className = '', duration = 1700 }) {
  const ref = useRef(null);
  const [text, setText] = useState(() => {
    const p = parseStatString(value);
    if (p.type === 'raw') return p.text;
    return `${formatNumber(0, p.decimals)}${p.suffix}`;
  });

  useEffect(() => {
    const p = parseStatString(value);
    if (p.type === 'raw') {
      setText(p.text);
      return;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion) {
      setText(`${formatNumber(p.target, p.decimals)}${p.suffix}`);
      return;
    }

    const { target, suffix, decimals } = p;
    setText(`${formatNumber(0, decimals)}${suffix}`);

    let cancelled = false;
    let rafId = 0;

    const runAnimation = () => {
      const start = performance.now();
      const tick = (now) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        const current = target * eased;
        const shown = decimals > 0
          ? Math.min(target, parseFloat(current.toFixed(decimals)))
          : Math.min(target, Math.round(current));
        setText(`${formatNumber(shown, decimals)}${suffix}`);
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setText(`${formatNumber(target, decimals)}${suffix}`);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const el = ref.current;
    if (!el) {
      runAnimation();
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        runAnimation();
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
