import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Award, ExternalLink, Plus, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

const MAX_HOME_AWARDS = 16;

const HomeAwardsManager = () => {
  const [awards, setAwards] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const [awardsResponse, settingsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/awards/admin`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/awards/home-settings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const [awardsData, settingsData] = await Promise.all([
          awardsResponse.json(),
          settingsResponse.json(),
        ]);

        if (!awardsResponse.ok || !awardsData.success) {
          throw new Error(awardsData.message || 'Failed to load awards');
        }
        if (!settingsResponse.ok || !settingsData.success) {
          throw new Error(settingsData.message || 'Failed to load homepage settings');
        }

        setAwards(Array.isArray(awardsData.data) ? awardsData.data : []);
        setConfigured(settingsData.data?.configured === true);
        setSelectedIds(
          Array.isArray(settingsData.data?.awardIds)
            ? settingsData.data.awardIds.map((id) => String(id))
            : [],
        );
      } catch (error) {
        setMessage({ type: 'error', text: error.message || 'Failed to load homepage awards' });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const awardsById = useMemo(
    () => new Map(awards.map((awardItem) => [String(awardItem._id), awardItem])),
    [awards],
  );
  const selectedAwards = selectedIds.map((id) => ({ id, award: awardsById.get(id) || null }));
  const availableAwards = awards.filter((awardItem) => !selectedIds.includes(String(awardItem._id)));
  const invalidSelections = selectedAwards.filter(({ award: selectedAward }) => !selectedAward || selectedAward.isPublished === false);

  const addAward = (id) => {
    if (selectedIds.length >= MAX_HOME_AWARDS) {
      setMessage({ type: 'error', text: `A maximum of ${MAX_HOME_AWARDS} awards can appear on the homepage.` });
      return;
    }
    setConfigured(true);
    setSelectedIds((current) => [...current, id]);
    setMessage({ type: '', text: '' });
  };

  const removeAward = (id) => {
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
  };

  const moveAward = (index, direction) => {
    setSelectedIds((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const save = async () => {
    if (configured && invalidSelections.length > 0) {
      setMessage({
        type: 'error',
        text: 'Remove missing awards or publish draft awards before saving this homepage selection.',
      });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/awards/home-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ configured, awardIds: configured ? selectedIds : [] }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Failed to save homepage awards');

      setConfigured(data.data?.configured === true);
      setSelectedIds(Array.isArray(data.data?.awardIds) ? data.data.awardIds.map(String) : []);
      setMessage({ type: 'success', text: data.message || 'Homepage awards saved.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to save homepage awards' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 font-sans text-gray-600">Loading homepage awards...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Home Awards Manager</h1>
          <p className="font-sans text-gray-600">
            Choose and reorder awards for the homepage without changing the complete Awards page.
          </p>
        </div>
        <Link
          to="/admin/awards"
          className="inline-flex items-center gap-2 rounded-lg border border-navy px-4 py-2 font-sans text-sm font-semibold text-navy hover:bg-navy hover:text-white"
        >
          Manage award content <ExternalLink size={16} />
        </Link>
      </div>

      {message.text && (
        <div className={`rounded-lg border p-4 font-sans text-sm ${
          message.type === 'success'
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-red-200 bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-navy">Selection mode</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setConfigured(false)}
            className={`rounded-lg border p-4 text-left ${!configured ? 'border-navy bg-navy/5 ring-2 ring-navy/10' : 'border-gray-200'}`}
          >
            <span className="block font-sans font-semibold text-navy">Automatic</span>
            <span className="mt-1 block font-sans text-sm text-gray-600">
              Preserve the current behavior: show up to 16 latest published awards.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setConfigured(true)}
            className={`rounded-lg border p-4 text-left ${configured ? 'border-navy bg-navy/5 ring-2 ring-navy/10' : 'border-gray-200'}`}
          >
            <span className="block font-sans font-semibold text-navy">Custom selection</span>
            <span className="mt-1 block font-sans text-sm text-gray-600">
              Select and order homepage awards independently from the full Awards page.
            </span>
          </button>
        </div>
      </div>

      {configured && (
        <>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-navy">Homepage order</h2>
                <p className="font-sans text-sm text-gray-600">Selected: {selectedIds.length}/{MAX_HOME_AWARDS}</p>
              </div>
            </div>

            {selectedAwards.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center font-sans text-sm text-gray-500">
                No awards selected. Saving an empty custom selection hides the homepage awards section.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedAwards.map(({ id, award: selectedAward }, index) => (
                  <div key={id} className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-navy/5">
                      {selectedAward?.imageUrl ? (
                        <img src={selectedAward.imageUrl} alt="" className="h-full w-full object-contain" />
                      ) : (
                        <Award className="h-7 w-7 text-gold" />
                      )}
                    </div>
                    <div className="min-w-[180px] flex-1">
                      <p className="font-serif font-semibold text-navy">{selectedAward?.title || 'Missing award'}</p>
                      <p className="font-sans text-xs text-gray-500">
                        {selectedAward ? `${selectedAward.year} · ${selectedAward.issuingBody}` : id}
                      </p>
                      {selectedAward?.isPublished === false && (
                        <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 font-sans text-xs text-amber-800">Draft — not visible publicly</span>
                      )}
                    </div>
                    <button type="button" onClick={() => moveAward(index, -1)} disabled={index === 0} className="p-2 text-gray-500 hover:text-navy disabled:opacity-30" title="Move up"><ArrowUp size={17} /></button>
                    <button type="button" onClick={() => moveAward(index, 1)} disabled={index === selectedAwards.length - 1} className="p-2 text-gray-500 hover:text-navy disabled:opacity-30" title="Move down"><ArrowDown size={17} /></button>
                    <button type="button" onClick={() => removeAward(id)} className="p-2 text-red-500 hover:text-red-700" title="Remove from homepage"><X size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">Available awards</h2>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {availableAwards.map((availableAward) => {
                const isDraft = availableAward.isPublished === false;
                return (
                  <div key={availableAward._id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif font-semibold text-navy">{availableAward.title}</p>
                      <p className="font-sans text-xs text-gray-500">{availableAward.year} · {availableAward.issuingBody}</p>
                      {isDraft && <span className="font-sans text-xs text-amber-700">Draft — publish it before selecting</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => addAward(String(availableAward._id))}
                      disabled={isDraft || selectedIds.length >= MAX_HOME_AWARDS}
                      className="rounded-lg bg-navy p-2 text-white hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-30"
                      title={isDraft ? 'Publish this award first' : 'Add to homepage'}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 font-sans font-semibold text-white hover:bg-navy-dark disabled:opacity-50"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save homepage awards'}
        </button>
      </div>
    </div>
  );
};

export default HomeAwardsManager;
