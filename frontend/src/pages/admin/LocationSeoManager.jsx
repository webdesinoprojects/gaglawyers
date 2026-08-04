import React, { useEffect, useState } from 'react';
import { Save, Eye, Rocket } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const auth = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}` });

const LocationSeoManager = () => {
  const [services, setServices] = useState([]);
  const [slug, setSlug] = useState('');
  const [tpl, setTpl] = useState({ title: '', description: '', keywords: '' });
  const [meta, setMeta] = useState({ pageCount: 0, isDefault: true, serviceName: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then((r) => r.json())
      .then((d) => setServices((d?.data || d || []).filter((s) => s.slug).map((s) => ({ slug: s.slug, name: s.name }))))
      .catch(() => {});
  }, []);

  const loadTemplate = async (s) => {
    setSlug(s); setPreview(null); setMsg({ type: '', text: '' });
    if (!s) return;
    const r = await fetch(`${API_BASE_URL}/api/cms/services/${s}/location-seo-template`, { headers: auth() });
    const d = await r.json();
    if (d.success) { setTpl(d.data.template); setMeta({ pageCount: d.data.pageCount, isDefault: d.data.isDefault, serviceName: d.data.serviceName }); }
  };

  const save = async () => {
    setBusy(true); setMsg({ type: '', text: '' });
    const r = await fetch(`${API_BASE_URL}/api/cms/services/${slug}/location-seo-template`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify(tpl) });
    const d = await r.json();
    setMsg(d.success ? { type: 'success', text: 'Template saved.' } : { type: 'error', text: d.message || 'Save failed' });
    setBusy(false);
  };

  const runApply = async (dryRun) => {
    if (!dryRun && !window.confirm(`Apply this template to ALL ${meta.pageCount} "${meta.serviceName}" city pages? Existing meta for any blank field is kept.`)) return;
    setBusy(true); setMsg({ type: '', text: '' }); setPreview(null);
    const r = await fetch(`${API_BASE_URL}/api/cms/services/${slug}/location-seo-template/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ dryRun }) });
    const d = await r.json();
    if (!d.success) { setMsg({ type: 'error', text: d.message || 'Failed' }); setBusy(false); return; }
    if (dryRun) { setPreview(d.samples); setMsg({ type: 'success', text: `Dry-run: ${d.total} pages would update. Nothing written yet — review the preview below.` }); }
    else setMsg({ type: 'success', text: `Applied to ${d.updated} pages. Live within ~1 min / after cache.` });
    setBusy(false);
  };

  const field = (k, label, rows) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-navy mb-1">{label}</label>
      <textarea rows={rows} value={tpl[k]} onChange={(e) => setTpl({ ...tpl, [k]: e.target.value })}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm font-mono" placeholder={`Leave blank to keep existing ${label.toLowerCase()}`} />
    </div>
  );

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-serif font-bold text-navy mb-1">Location Page SEO — per service</h1>
      <p className="text-gray-600 text-sm mb-4">Edit one template per service, then apply it to <b>all that service's city pages</b> at once. Placeholders: <code>{'{service}'}</code> (e.g. Criminal Lawyer), <code>{'{base}'}</code> (Criminal), <code>{'{city}'}</code>. A <b>blank</b> field keeps the existing meta. Only this service's city pages change.</p>

      <select value={slug} onChange={(e) => loadTemplate(e.target.value)} className="mb-4 rounded border border-gray-300 px-3 py-2 text-sm">
        <option value="">— pick a service —</option>
        {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
      </select>

      {slug && (
        <>
          <p className="text-xs text-gray-500 mb-3">{meta.pageCount} city pages · {meta.isDefault ? 'showing the current default pattern (edit & save to customise)' : 'custom template saved'}</p>
          {field('title', 'Meta Title', 2)}
          {field('description', 'Meta Description', 4)}
          {field('keywords', 'Meta Keywords', 5)}

          {msg.text && <div className={`mb-3 rounded p-3 text-sm ${msg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{msg.text}</div>}

          <div className="flex flex-wrap gap-3">
            <button disabled={busy} onClick={save} className="flex items-center gap-1 rounded border border-navy px-3 py-1.5 text-sm text-navy hover:bg-navy hover:text-white disabled:opacity-50"><Save size={16} /> Save template</button>
            <button disabled={busy} onClick={() => runApply(true)} className="flex items-center gap-1 rounded border border-blue-600 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50"><Eye size={16} /> Preview (dry-run)</button>
            <button disabled={busy} onClick={() => runApply(false)} className="flex items-center gap-1 rounded bg-navy px-4 py-1.5 text-sm text-white hover:bg-navy-dark disabled:opacity-50"><Rocket size={16} /> Apply to all city pages</button>
          </div>

          {preview && (
            <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-3 text-xs">
              <p className="font-semibold mb-2">Preview (first 3 pages):</p>
              {preview.map((p, i) => (
                <div key={i} className="mb-2">
                  <div className="text-gray-500">/{p.slug}</div>
                  <div><b>title:</b> {p.title}</div>
                  <div><b>keywords:</b> {p.keywords}…</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSeoManager;
