const envApiUrl = (import.meta.env.VITE_API_URL || '').trim();

let API_BASE_URL = envApiUrl;

if (!API_BASE_URL) {
  const isBrowser = typeof window !== 'undefined';
  const hostname = isBrowser ? window.location.hostname : '';
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  API_BASE_URL = isLocalhost ? 'http://localhost:5000' : (isBrowser ? window.location.origin : '');
}

API_BASE_URL = API_BASE_URL.replace(/\/+$/, '');

export default API_BASE_URL;
