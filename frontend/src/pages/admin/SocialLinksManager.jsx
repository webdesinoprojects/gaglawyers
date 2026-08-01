import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import API_BASE_URL from '../../config/api';
import { SOCIAL_PLATFORM_OPTIONS, ADMIN_DEFAULT_LINKS } from '../../constants/socialLinks';

const blank = () => ({ platform: 'facebook', url: '', showInHeader: true, showInFooter: true, order: 0 });

const SocialLinksManager = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cms/global-settings`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    })
      .then((r) => r.json())
      .then((d) => {
        const arr = d && d.success && Array.isArray(d.data?.socialLinks) ? d.data.socialLinks : [];
        setLinks(arr.length ? arr.map((l, i) => ({ ...l, order: l.order ?? i + 1 })) : ADMIN_DEFAULT_LINKS.map((l) => ({ ...l })));
      })
      .catch(() => setLinks(ADMIN_DEFAULT_LINKS.map((l) => ({ ...l }))))
      .finally(() => setLoading(false));
  }, []);

  const update = (i, field, value) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  const remove = (i) => setLinks((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setLinks((prev) => [...prev, { ...blank(), order: prev.length + 1 }]);
  const move = (i, dir) => setLinks((prev) => {
    const next = [...prev];
    const j = i + dir;
    if (j < 0 || j >= next.length) return prev;
    [next[i], next[j]] = [next[j], next[i]];
    return next.map((l, idx) => ({ ...l, order: idx + 1 }));
  });

  const save = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    const payload = links
      .filter((l) => l.platform && l.url && l.url.trim())
      .map((l, idx) => ({
        platform: String(l.platform).trim().toLowerCase(),
        url: l.url.trim(),
        showInHeader: !!l.showInHeader,
        showInFooter: !!l.showInFooter,
        order: idx + 1,
      }));
    try {
      const res = await fetch(`${API_BASE_URL}/api/cms/global-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ socialLinks: payload }),
      });
      const d = await res.json();
      if (d.success) setMessage({ type: 'success', text: 'Saved! Changes appear in the header/footer within ~1 min (or after cache refresh).' });
      else setMessage({ type: 'error', text: d.message || 'Failed to save' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-serif font-bold text-navy mb-1">Social Links (Follow Us)</h1>
      <p className="text-gray-600 mb-6 text-sm">Add, edit, remove or reorder the social links shown in the header top-bar and the footer. Leave a URL blank to skip a row.</p>

      {message.text && (
        <div className={`mb-4 rounded p-3 text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>
      )}

      <div className="space-y-3">
        {links.map((l, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <select value={SOCIAL_PLATFORM_OPTIONS.includes((l.platform || '').toLowerCase()) ? l.platform.toLowerCase() : 'custom'}
              onChange={(e) => update(i, 'platform', e.target.value === 'custom' ? '' : e.target.value)}
              className="rounded border border-gray-300 px-2 py-1.5 text-sm">
              {SOCIAL_PLATFORM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              <option value="custom">custom…</option>
            </select>
            {!SOCIAL_PLATFORM_OPTIONS.includes((l.platform || '').toLowerCase()) && (
              <input value={l.platform} onChange={(e) => update(i, 'platform', e.target.value)} placeholder="platform name"
                className="w-28 rounded border border-gray-300 px-2 py-1.5 text-sm" />
            )}
            <input value={l.url} onChange={(e) => update(i, 'url', e.target.value)} placeholder="https://…"
              className="flex-1 min-w-[200px] rounded border border-gray-300 px-2 py-1.5 text-sm" />
            <label className="flex items-center gap-1 text-xs text-gray-700"><input type="checkbox" checked={!!l.showInHeader} onChange={(e) => update(i, 'showInHeader', e.target.checked)} /> Header</label>
            <label className="flex items-center gap-1 text-xs text-gray-700"><input type="checkbox" checked={!!l.showInFooter} onChange={(e) => update(i, 'showInFooter', e.target.checked)} /> Footer</label>
            <button onClick={() => move(i, -1)} className="p-1 text-gray-400 hover:text-navy" title="Move up"><ArrowUp size={16} /></button>
            <button onClick={() => move(i, 1)} className="p-1 text-gray-400 hover:text-navy" title="Move down"><ArrowDown size={16} /></button>
            <button onClick={() => remove(i)} className="p-1 text-red-400 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={add} className="flex items-center gap-1 rounded border border-navy px-3 py-1.5 text-sm text-navy hover:bg-navy hover:text-white"><Plus size={16} /> Add link</button>
        <button onClick={save} disabled={saving} className="flex items-center gap-1 rounded bg-navy px-4 py-1.5 text-sm text-white hover:bg-navy-dark disabled:opacity-50"><Save size={16} /> {saving ? 'Saving…' : 'Save'}</button>
      </div>
    </div>
  );
};

export default SocialLinksManager;
