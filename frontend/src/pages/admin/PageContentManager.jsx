import React, { useEffect, useState } from 'react';
import { Save, FileText, Plus, Trash2, Layers } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import API_BASE_URL from '../../config/api';
import { getDefaultHomeSectionsForAdmin } from '../../data/homePageContentDefaults';

function normalizeHomeSectionsFromApi(raw) {
  const def = getDefaultHomeSectionsForAdmin();
  const s = raw && typeof raw === 'object' ? raw : {};
  const out = { ...def, ...s, carousel: { ...def.carousel, ...s.carousel } };
  if (!Array.isArray(out.carousel?.slides) || out.carousel.slides.length === 0) {
    out.carousel = { ...out.carousel, slides: def.carousel.slides.map((x) => ({ ...x })) };
  }
  if (!Array.isArray(out.carousel?.trustStrip) || out.carousel.trustStrip.length < 3) {
    out.carousel = {
      ...out.carousel,
      trustStrip: def.carousel.trustStrip.map((x) => ({ ...x })),
    };
  }
  out.whyChoose = {
    ...def.whyChoose,
    ...s.whyChoose,
    cards:
      s.whyChoose?.cards?.length > 0 ? s.whyChoose.cards : def.whyChoose.cards.map((c) => ({ ...c })),
  };
  out.howWeWork = {
    ...def.howWeWork,
    ...s.howWeWork,
    steps:
      s.howWeWork?.steps?.length > 0 ? s.howWeWork.steps : def.howWeWork.steps.map((x) => ({ ...x })),
  };
  out.ctaBand = {
    ...def.ctaBand,
    ...s.ctaBand,
    checklist:
      s.ctaBand?.checklist?.length > 0
        ? s.ctaBand.checklist
        : def.ctaBand.checklist.map((x) => ({ ...x })),
  };
  out.consultationForm = {
    ...def.consultationForm,
    ...s.consultationForm,
    placeholders: { ...def.consultationForm.placeholders, ...s.consultationForm?.placeholders },
  };
  out.teamSection = { ...def.teamSection, ...s.teamSection };
  out.blogSection = { ...def.blogSection, ...s.blogSection };
  out.testimonialsIntro = { ...def.testimonialsIntro, ...s.testimonialsIntro };
  out.testimonialsScroll = { ...def.testimonialsScroll, ...s.testimonialsScroll };
  out.testimonials = { ...def.testimonials, ...s.testimonials };
  out.practiceCta = { ...def.practiceCta, ...s.practiceCta };
  out.stats = { ...def.stats, ...s.stats };
  out.practiceAreas = { ...def.practiceAreas, ...s.practiceAreas };
  out.hero = { ...def.hero, ...s.hero };
  return out;
}

/** Section keys managed by the structured Home / About editors — everything else is "custom". */
const RESERVED_SECTION_KEYS = {
  home: new Set([
    'hero',
    'carousel',
    'stats',
    'practiceAreas',
    'practiceCta',
    'testimonials',
    'testimonialsIntro',
    'testimonialsScroll',
    'whyChoose',
    'howWeWork',
    'teamSection',
    'blogSection',
    'consultationForm',
    'ctaBand',
  ]),
  about: new Set(['hero', 'introduction', 'founder', 'mission']),
};

function getReservedSet(pageId) {
  return RESERVED_SECTION_KEYS[pageId] || null;
}

function pickEditableSubset(sections, pageId) {
  const reserved = getReservedSet(pageId);
  const src = sections && typeof sections === 'object' ? sections : {};
  if (!reserved) return { ...src };
  const out = {};
  Object.entries(src).forEach(([k, v]) => {
    if (!reserved.has(k)) out[k] = v;
  });
  return out;
}

function mergeSubsetIntoPageSections(prevSections, pageId, subset) {
  const reserved = getReservedSet(pageId);
  if (!reserved) return { ...subset };
  const out = {};
  Object.entries(prevSections || {}).forEach(([k, v]) => {
    if (reserved.has(k)) out[k] = v;
  });
  Object.assign(out, subset);
  return out;
}

function sanitizeSectionKey(raw) {
  const s = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  return s;
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/**
 * Add / edit / remove page sections with a form UI (all pages, or custom-only for Home & About).
 */
function DynamicSectionsEditor({ sections, onChange, subtitle, pageLabel }) {
  const [newSectionId, setNewSectionId] = useState('');
  const [newFieldSection, setNewFieldSection] = useState(null);
  const [newFieldKey, setNewFieldKey] = useState('');

  const sectionKeys = Object.keys(sections || {}).sort();

  const addSection = () => {
    const base = sanitizeSectionKey(newSectionId);
    if (!base) return;
    let id = base;
    let n = 2;
    while (sections[id] !== undefined) {
      id = `${base}_${n}`;
      n += 1;
    }
    onChange({ ...sections, [id]: { heading: '', content: '' } });
    setNewSectionId('');
  };

  const removeSection = (key) => {
    if (!window.confirm(`Remove section "${key}"?`)) return;
    const next = { ...sections };
    delete next[key];
    onChange(next);
  };

  const setSectionValue = (key, value) => {
    onChange({ ...sections, [key]: value });
  };

  const renameSection = (oldKey, newKeyRaw) => {
    const nk = sanitizeSectionKey(newKeyRaw);
    if (!nk || nk === oldKey) return;
    if (sections[nk] !== undefined) {
      window.alert(`A section named "${nk}" already exists.`);
      return;
    }
    const next = { ...sections };
    next[nk] = next[oldKey];
    delete next[oldKey];
    onChange(next);
  };

  const updateScalarField = (sectionKey, fieldKey, value) => {
    const cur = sections[sectionKey];
    const obj = isPlainObject(cur) ? { ...cur } : {};
    obj[fieldKey] = value;
    onChange({ ...sections, [sectionKey]: obj });
  };

  const removeField = (sectionKey, fieldKey) => {
    const cur = sections[sectionKey];
    if (!isPlainObject(cur)) return;
    const next = { ...cur };
    delete next[fieldKey];
    onChange({ ...sections, [sectionKey]: next });
  };

  const addField = (sectionKey) => {
    const fk = sanitizeSectionKey(newFieldKey);
    if (!fk) return;
    const cur = sections[sectionKey];
    const obj = isPlainObject(cur) ? { ...cur } : {};
    if (Object.prototype.hasOwnProperty.call(obj, fk)) {
      window.alert(`Field "${fk}" already exists.`);
      return;
    }
    obj[fk] = '';
    onChange({ ...sections, [sectionKey]: obj });
    setNewFieldKey('');
    setNewFieldSection(null);
  };

  const renderSectionBody = (key) => {
    const val = sections[key];

    if (val === undefined) return null;

    if (!isPlainObject(val)) {
      return (
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
            Value (JSON)
          </label>
          <textarea
            value={(() => {
              try {
                return JSON.stringify(val, null, 2);
              } catch {
                return String(val);
              }
            })()}
            onChange={(e) => {
              const t = e.target.value;
              try {
                const parsed = JSON.parse(t);
                setSectionValue(key, parsed);
              } catch {
                /* incomplete JSON */
              }
            }}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm font-mono text-xs focus:ring-2 focus:ring-navy/20"
          />
          <p className="mt-1 text-xs text-gray-500 font-sans">Arrays and nested data: edit as JSON.</p>
        </div>
      );
    }

    const entries = Object.entries(val);
    if (entries.length === 0) {
      return (
        <p className="text-sm text-gray-500 font-sans">
          Empty section — add fields below or paste JSON after switching type.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {entries.map(([fk, fv]) => (
          <div key={fk} className="flex gap-2 items-start">
            <div className="flex-1 min-w-0">
              <label className="block font-sans text-xs font-medium text-gray-600 mb-1">{fk}</label>
              {typeof fv === 'string' ? (
                (fv.length > 140 || /[\n\r]/.test(fv)) ? (
                  <textarea
                    value={fv}
                    onChange={(e) => updateScalarField(key, fk, e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans text-sm focus:ring-2 focus:ring-navy/20"
                  />
                ) : (
                  <input
                    type="text"
                    value={fv}
                    onChange={(e) => updateScalarField(key, fk, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans text-sm focus:ring-2 focus:ring-navy/20"
                  />
                )
              ) : typeof fv === 'number' ? (
                <input
                  type="number"
                  value={fv}
                  onChange={(e) => updateScalarField(key, fk, e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm font-sans text-sm focus:ring-2 focus:ring-navy/20"
                />
              ) : typeof fv === 'boolean' ? (
                <label className="inline-flex items-center gap-2 font-sans text-sm">
                  <input
                    type="checkbox"
                    checked={fv}
                    onChange={(e) => updateScalarField(key, fk, e.target.checked)}
                  />
                  {fv ? 'true' : 'false'}
                </label>
              ) : (
                <textarea
                  value={JSON.stringify(fv, null, 2)}
                  onChange={(e) => {
                    try {
                      updateScalarField(key, fk, JSON.parse(e.target.value));
                    } catch {
                      /* ignore */
                    }
                  }}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm font-mono text-xs focus:ring-2 focus:ring-navy/20"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => removeField(key, fk)}
              className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-sm"
              title="Remove field"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div className="flex flex-wrap items-end gap-2 pt-2 border-t border-gray-100">
          {newFieldSection === key ? (
            <>
              <input
                type="text"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                placeholder="field_key"
                className="px-3 py-2 border border-gray-300 rounded-sm font-sans text-sm w-40"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => addField(key)}>
                Add field
              </Button>
              <button
                type="button"
                className="font-sans text-xs text-gray-600 underline"
                onClick={() => {
                  setNewFieldSection(null);
                  setNewFieldKey('');
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setNewFieldSection(key)}
              className="inline-flex items-center gap-1 font-sans text-xs font-medium text-navy hover:text-gold"
            >
              <Plus size={14} /> Add field
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      id="page-custom-sections"
      className="bg-white rounded-lg shadow-sm p-6 border-2 border-gold/35 ring-1 ring-navy/10 scroll-mt-24"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0 border border-gold/30">
            <Layers className="text-navy" size={22} />
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gold mb-0.5">
              Section builder
            </p>
            <h3 className="font-serif text-xl font-semibold text-navy">
              Add &amp; manage sections{pageLabel ? ` — ${pageLabel}` : ''}
            </h3>
            {subtitle && <p className="font-sans text-sm text-gray-600 mt-1 max-w-3xl">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-stretch sm:items-center">
        <input
          type="text"
          value={newSectionId}
          onChange={(e) => setNewSectionId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSection())}
          placeholder="New section ID (e.g. intro_banner, office_cta)"
          className="flex-1 min-w-[220px] px-4 py-3 border-2 border-navy/15 rounded-sm font-sans text-sm focus:ring-2 focus:ring-gold/40 focus:border-navy/30"
        />
        <Button type="button" variant="gold" size="md" onClick={addSection} className="sm:self-stretch">
          <Plus className="inline mr-1" size={18} /> Add section
        </Button>
      </div>

      {sectionKeys.length === 0 && (
        <p className="font-sans text-sm text-gray-700 py-6 px-4 text-center border-2 border-dashed border-navy/15 rounded-lg bg-grey-light/80">
          <span className="font-semibold text-navy">No custom sections yet.</span>{' '}
          Type an ID above and click <strong>Add section</strong> — then add fields inside each block. For Home/About,
          fixed blocks (carousel, etc.) are in the structured editor below; this area is for <em>extra</em> keys saved on
          the same page.
        </p>
      )}

      <div className="space-y-4">
        {sectionKeys.map((key) => (
          <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50/80">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <label className="font-sans text-xs text-gray-500 uppercase tracking-wide">Section key</label>
              <input
                type="text"
                defaultValue={key}
                key={key}
                onBlur={(e) => renameSection(key, e.target.value)}
                className="flex-1 min-w-[8rem] px-2 py-1 border border-gray-300 rounded-sm font-mono text-sm font-medium text-navy"
              />
              <button
                type="button"
                onClick={() => removeSection(key)}
                className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 rounded-sm font-sans"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
            {renderSectionBody(key)}
          </div>
        ))}
      </div>
    </div>
  );
}

const PageContentManager = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const pages = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'firm', label: 'The Firm' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'awards', label: 'Awards Page' },
    { id: 'gallery', label: 'Gallery Page' },
  ];

  useEffect(() => {
    fetchPageContent(selectedPage);
  }, [selectedPage]);

  const fetchPageContent = async (pageName) => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${pageName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.success) {
        const doc = data.data;
        const raw = doc.sections;
        const sectionsObj =
          pageName === 'home'
            ? normalizeHomeSectionsFromApi(raw)
            : raw && typeof raw === 'object' && !Array.isArray(raw)
              ? { ...raw }
              : {};
        setPageData({ ...doc, sections: sectionsObj });
      } else {
        setPageData(getDefaultPageStructure(pageName));
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      setPageData(getDefaultPageStructure(pageName));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPageStructure = (pageName) => {
    const defaults = {
      home: {
        pageName: 'home',
        sections: getDefaultHomeSectionsForAdmin(),
        seo: {
          title: 'GAG Lawyers - Premier Legal Services in India',
          description: 'Expert legal services in corporate law, civil litigation, real estate, and family law.',
          keywords: 'lawyers in delhi, advocates in india, corporate law firm',
        },
        isPublished: true,
      },
      about: {
        pageName: 'about',
        sections: {
          hero: {
            heading: 'GAG Lawyers',
            subheading: 'Grover & Grover Advocates',
            tagline: 'Law is not only about interpreting statutes but also about offering guidance, clarity, and support during some of life\'s most critical moments.',
          },
          introduction: {
            text: 'At GAG Lawyers - Grover & Grover Advocates, whether it is a business transaction, a personal dispute, or a cross-border matter, our focus remains the same – to provide solutions that are practical, reliable, and aligned with our clients\' goals.',
          },
          founder: {
            name: 'Advocate Rahul Grover',
            imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop',
            bio: 'Advocate Rahul Grover established this firm with a clear vision: to create a practice that values professionalism, client trust, and results above all. With years of experience in litigation and advisory work, he has appeared before courts, tribunals, and regulatory authorities across the country.',
            quote: 'What sets him apart is his ability to simplify the most complicated legal issues into strategies that clients can understand and act upon.',
          },
          mission: {
            heading: 'Our Mission and Values',
            description: 'We approach every matter with the belief that the client\'s interest is paramount.',
          },
        },
        seo: {
          title: 'About Us - The Firm | GAG Lawyers',
          description: 'Founded by Advocate Rahul Grover, GAG Lawyers provides high-quality legal services across India and abroad.',
          keywords: 'about gag lawyers, rahul grover advocate, law firm india',
        },
        isPublished: true,
      },
    };

    return defaults[pageName] || {
      pageName,
      sections: {},
      seo: { title: '', description: '', keywords: '' },
      isPublished: true,
    };
  };

  const handleSectionChange = (sectionKey, field, value) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          [field]: value,
        },
      },
    }));
  };

  const handleSEOChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const patchCarousel = (fn) => {
    setPageData((prev) => {
      const cur = prev.sections?.carousel || {};
      const nextCarousel = fn({
        slides: Array.isArray(cur.slides) ? [...cur.slides] : [],
        trustStrip: Array.isArray(cur.trustStrip) ? [...cur.trustStrip] : [],
      });
      return {
        ...prev,
        sections: { ...prev.sections, carousel: nextCarousel },
      };
    });
  };

  const patchWhyChooseCard = (index, field, value) => {
    setPageData((prev) => {
      const wc = { ...prev.sections?.whyChoose, cards: [...(prev.sections?.whyChoose?.cards || [])] };
      wc.cards[index] = { ...wc.cards[index], [field]: value };
      return { ...prev, sections: { ...prev.sections, whyChoose: wc } };
    });
  };

  const patchHowStep = (index, field, value) => {
    setPageData((prev) => {
      const hw = { ...prev.sections?.howWeWork, steps: [...(prev.sections?.howWeWork?.steps || [])] };
      hw.steps[index] = { ...hw.steps[index], [field]: value };
      return { ...prev, sections: { ...prev.sections, howWeWork: hw } };
    });
  };

  const patchCtaChecklist = (index, field, value) => {
    setPageData((prev) => {
      const band = { ...prev.sections?.ctaBand, checklist: [...(prev.sections?.ctaBand?.checklist || [])] };
      band.checklist[index] = { ...band.checklist[index], [field]: value };
      return { ...prev, sections: { ...prev.sections, ctaBand: band } };
    });
  };

  const patchConsultationPlaceholders = (key, value) => {
    setPageData((prev) => {
      const cf = {
        ...prev.sections?.consultationForm,
        placeholders: { ...prev.sections?.consultationForm?.placeholders, [key]: value },
      };
      return { ...prev, sections: { ...prev.sections, consultationForm: cf } };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Page content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving page content');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setMessage('Error saving page content');
    } finally {
      setIsSaving(false);
    }
  };

  const renderHomePageEditor = () => {
    if (!pageData?.sections) return null;
    const sections = pageData.sections;
    const slides = sections.carousel?.slides?.length ? sections.carousel.slides : getDefaultHomeSectionsForAdmin().carousel.slides;
    const trustStrip =
      sections.carousel?.trustStrip?.length >= 3
        ? sections.carousel.trustStrip
        : getDefaultHomeSectionsForAdmin().carousel.trustStrip;
    const whyCards = sections.whyChoose?.cards?.length ? sections.whyChoose.cards : getDefaultHomeSectionsForAdmin().whyChoose.cards;
    const howSteps = sections.howWeWork?.steps?.length ? sections.howWeWork.steps : getDefaultHomeSectionsForAdmin().howWeWork.steps;
    const ctaItems = sections.ctaBand?.checklist?.length ? sections.ctaBand.checklist : getDefaultHomeSectionsForAdmin().ctaBand.checklist;

    const newSlideTemplate = () => ({
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
      tagline: '',
      heading: '',
      headingAccent: '',
      description: '',
      ctaPrimaryText: 'Learn more',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Services',
      ctaSecondaryLink: '/services',
    });

    return (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 font-sans text-sm text-amber-900">
          All fields below map directly to the public Home page (carousel, strips, sections, and consultation form). Save after edits.
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-2">Hero carousel (main slideshow)</h3>
          <p className="text-sm text-gray-600 font-sans mb-4">
            Each slide rotates on the homepage. Use full image URLs (or upload elsewhere and paste).
          </p>
          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <span className="font-sans font-semibold text-navy">Slide {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() =>
                      patchCarousel((c) => {
                        const next = c.slides.filter((_, i) => i !== idx);
                        return { ...c, slides: next.length ? next : [newSlideTemplate()] };
                      })
                    }
                    className="text-red-600 text-sm font-sans hover:underline"
                  >
                    Remove slide
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Background image URL"
                  value={slide.image || ''}
                  onChange={(e) =>
                    patchCarousel((c) => {
                      const s = [...c.slides];
                      s[idx] = { ...s[idx], image: e.target.value };
                      return { ...c, slides: s };
                    })
                  }
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                />
                <input
                  type="text"
                  placeholder="Tagline (small gold text)"
                  value={slide.tagline || ''}
                  onChange={(e) =>
                    patchCarousel((c) => {
                      const s = [...c.slides];
                      s[idx] = { ...s[idx], tagline: e.target.value };
                      return { ...c, slides: s };
                    })
                  }
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                />
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Heading (white)"
                    value={slide.heading || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], heading: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Heading accent (gold)"
                    value={slide.headingAccent || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], headingAccent: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={slide.description || ''}
                  onChange={(e) =>
                    patchCarousel((c) => {
                      const s = [...c.slides];
                      s[idx] = { ...s[idx], description: e.target.value };
                      return { ...c, slides: s };
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                />
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Primary button text"
                    value={slide.ctaPrimaryText || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], ctaPrimaryText: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Primary link (e.g. /contact)"
                    value={slide.ctaPrimaryLink || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], ctaPrimaryLink: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Secondary button text"
                    value={slide.ctaSecondaryText || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], ctaSecondaryText: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Secondary link"
                    value={slide.ctaSecondaryLink || ''}
                    onChange={(e) =>
                      patchCarousel((c) => {
                        const s = [...c.slides];
                        s[idx] = { ...s[idx], ctaSecondaryLink: e.target.value };
                        return { ...c, slides: s };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => patchCarousel((c) => ({ ...c, slides: [...c.slides, newSlideTemplate()] }))}
            >
              <Plus className="inline mr-1" size={16} /> Add carousel slide
            </Button>
          </div>

          <h4 className="font-serif text-lg font-semibold text-navy mt-8 mb-3">Carousel trust strip (3 stats over image)</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 border border-gray-100 p-3 rounded-sm">
                <label className="text-xs font-sans text-gray-600">Stat {i + 1} value</label>
                <input
                  type="text"
                  value={trustStrip[i]?.value || ''}
                  onChange={(e) =>
                    patchCarousel((c) => {
                      const ts = [...(c.trustStrip.length >= 3 ? c.trustStrip : [...getDefaultHomeSectionsForAdmin().carousel.trustStrip])];
                      ts[i] = { ...ts[i], value: e.target.value };
                      return { ...c, trustStrip: ts };
                    })
                  }
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                />
                <label className="text-xs font-sans text-gray-600">Label</label>
                <input
                  type="text"
                  value={trustStrip[i]?.label || ''}
                  onChange={(e) =>
                    patchCarousel((c) => {
                      const ts = [...(c.trustStrip.length >= 3 ? c.trustStrip : [...getDefaultHomeSectionsForAdmin().carousel.trustStrip])];
                      ts[i] = { ...ts[i], label: e.target.value };
                      return { ...c, trustStrip: ts };
                    })
                  }
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Consultation form (in hero)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-1">Form title</label>
              <input
                type="text"
                value={sections.consultationForm?.title || ''}
                onChange={(e) => handleSectionChange('consultationForm', 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={sections.consultationForm?.subtitle || ''}
                onChange={(e) => handleSectionChange('consultationForm', 'subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
            </div>
          </div>
          <p className="font-sans text-xs text-gray-500 mt-3 mb-2">Placeholders</p>
          <div className="grid md:grid-cols-2 gap-2">
            {['name', 'email', 'phone', 'service', 'description'].map((k) => (
              <input
                key={k}
                type="text"
                placeholder={k}
                value={sections.consultationForm?.placeholders?.[k] || ''}
                onChange={(e) => patchConsultationPlaceholders(k, e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              placeholder="Submit button label"
              value={sections.consultationForm?.submitLabel || ''}
              onChange={(e) => handleSectionChange('consultationForm', 'submitLabel', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            />
            <input
              type="text"
              placeholder="Submitting label"
              value={sections.consultationForm?.submittingLabel || ''}
              onChange={(e) => handleSectionChange('consultationForm', 'submittingLabel', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            />
          </div>
          <div className="mt-3">
            <label className="block font-sans text-sm font-medium text-gray-700 mb-1">Success message</label>
            <textarea
              value={sections.consultationForm?.successMessage || ''}
              onChange={(e) => handleSectionChange('consultationForm', 'successMessage', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6 border border-dashed border-gray-200">
          <h3 className="font-serif text-xl font-semibold text-navy mb-2">Legacy hero block (optional)</h3>
          <p className="text-xs text-gray-500 font-sans mb-3">Not shown on the live carousel; kept for reference or future use.</p>
          <div className="space-y-3">
            <input
              type="text"
              value={sections.hero?.heading || ''}
              onChange={(e) => handleSectionChange('hero', 'heading', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="Heading"
            />
            <textarea
              value={sections.hero?.subheading || ''}
              onChange={(e) => handleSectionChange('hero', 'subheading', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="Subheading"
            />
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Statistics bar (below carousel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['casesRepresented', 'casesRepresentedLabel', 'Value', 'Label'],
              ['criminalMatters', 'criminalMattersLabel', 'Value', 'Label'],
              ['familyMatters', 'familyMattersLabel', 'Value', 'Label'],
              ['civilMatters', 'civilMattersLabel', 'Value', 'Label'],
            ].map(([vk, lk]) => (
              <div key={vk} className="space-y-2 border border-gray-100 p-3 rounded-sm">
                <input
                  type="text"
                  value={sections.stats?.[vk] || ''}
                  onChange={(e) => handleSectionChange('stats', vk, e.target.value)}
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  placeholder="5000+"
                />
                <input
                  type="text"
                  value={sections.stats?.[lk] || ''}
                  onChange={(e) => handleSectionChange('stats', lk, e.target.value)}
                  className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">&ldquo;Why GAG Lawyers&rdquo; section</h3>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={sections.whyChoose?.eyebrow || ''}
              onChange={(e) => handleSectionChange('whyChoose', 'eyebrow', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="Eyebrow"
            />
            <input
              type="text"
              value={sections.whyChoose?.title || ''}
              onChange={(e) => handleSectionChange('whyChoose', 'title', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="Title"
            />
            <textarea
              value={sections.whyChoose?.subtitle || ''}
              onChange={(e) => handleSectionChange('whyChoose', 'subtitle', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="Subtitle"
            />
          </div>
          {whyCards.map((card, idx) => (
            <div key={idx} className="border border-gray-100 p-3 rounded-sm mb-3 space-y-2">
              <input
                type="text"
                placeholder="Icon: Shield, Users, Award, TrendingUp, Scale, FileText, CheckCircle"
                value={card.icon || ''}
                onChange={(e) => patchWhyChooseCard(idx, 'icon', e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
              <input
                type="text"
                placeholder="Card title"
                value={card.title || ''}
                onChange={(e) => patchWhyChooseCard(idx, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
              <textarea
                placeholder="Card body"
                value={card.body || ''}
                onChange={(e) => patchWhyChooseCard(idx, 'body', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">&ldquo;How we work&rdquo; (4 steps)</h3>
          <input
            type="text"
            value={sections.howWeWork?.eyebrow || ''}
            onChange={(e) => handleSectionChange('howWeWork', 'eyebrow', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
            placeholder="Eyebrow"
          />
          <input
            type="text"
            value={sections.howWeWork?.title || ''}
            onChange={(e) => handleSectionChange('howWeWork', 'title', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
            placeholder="Title"
          />
          <textarea
            value={sections.howWeWork?.subtitle || ''}
            onChange={(e) => handleSectionChange('howWeWork', 'subtitle', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-4"
            placeholder="Subtitle"
          />
          {howSteps.map((step, idx) => (
            <div key={idx} className="border border-gray-100 p-3 rounded-sm mb-3 space-y-2">
              <div className="grid md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={step.number || ''}
                  onChange={(e) => patchHowStep(idx, 'number', e.target.value)}
                  className="px-3 py-2 border rounded-sm font-sans text-sm"
                  placeholder="1"
                />
                <select
                  value={step.variant || 'light'}
                  onChange={(e) => patchHowStep(idx, 'variant', e.target.value)}
                  className="px-3 py-2 border rounded-sm font-sans text-sm md:col-span-2"
                >
                  <option value="navy">Style: Navy</option>
                  <option value="light">Style: Light</option>
                  <option value="gold">Style: Gold</option>
                </select>
              </div>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => patchHowStep(idx, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                placeholder="Step title"
              />
              <textarea
                value={step.body || ''}
                onChange={(e) => patchHowStep(idx, 'body', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
                placeholder="Step description"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Practice areas section</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={sections.practiceAreas?.heading || ''}
              onChange={(e) => handleSectionChange('practiceAreas', 'heading', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            />
            <input
              type="text"
              value={sections.practiceAreas?.subheading || ''}
              onChange={(e) => handleSectionChange('practiceAreas', 'subheading', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            />
            <input
              type="text"
              value={sections.practiceCta?.viewAllServicesText || ''}
              onChange={(e) => handleSectionChange('practiceCta', 'viewAllServicesText', e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
              placeholder="View all services button text"
            />
            <p className="text-sm text-gray-500 font-sans">Service cards come from Services Manager.</p>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Team section (headings only)</h3>
          <p className="text-xs text-gray-500 font-sans mb-2">People come from Team Manager; this controls labels and CTA.</p>
          {['eyebrow', 'title', 'subtitle', 'founderBadge', 'badgeA', 'badgeB', 'ctaText'].map((f) => (
            <input
              key={f}
              type="text"
              value={sections.teamSection?.[f] || ''}
              onChange={(e) => handleSectionChange('teamSection', f, e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
              placeholder={f}
            />
          ))}
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Blog section (headings)</h3>
          {['eyebrow', 'title', 'subtitle', 'viewAllText'].map((f) => (
            <input
              key={f}
              type="text"
              value={sections.blogSection?.[f] || ''}
              onChange={(e) => handleSectionChange('blogSection', f, e.target.value)}
              className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
              placeholder={f}
            />
          ))}
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Testimonials section</h3>
          <input
            type="text"
            value={sections.testimonialsIntro?.eyebrow || ''}
            onChange={(e) => handleSectionChange('testimonialsIntro', 'eyebrow', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
            placeholder="Small eyebrow above testimonials title"
          />
          <input
            type="text"
            value={sections.testimonials?.heading || ''}
            onChange={(e) => handleSectionChange('testimonials', 'heading', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
          />
          <input
            type="text"
            value={sections.testimonials?.subheading || ''}
            onChange={(e) => handleSectionChange('testimonials', 'subheading', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
          />
          <input
            type="text"
            value={sections.testimonialsScroll?.hint || ''}
            onChange={(e) => handleSectionChange('testimonialsScroll', 'hint', e.target.value)}
            className="w-full px-3 py-2 border rounded-sm font-sans text-sm"
            placeholder="Scroll hint text"
          />
          <p className="text-xs text-gray-500 font-sans mt-2">Review cards: Reviews Manager.</p>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Bottom CTA band</h3>
          {['eyebrow', 'title', 'subtitle', 'primaryCtaText', 'primaryCtaLink', 'phoneDisplay', 'secondaryCtaText', 'sidebarTitle'].map(
            (f) => (
              <input
                key={f}
                type="text"
                value={sections.ctaBand?.[f] || ''}
                onChange={(e) => handleSectionChange('ctaBand', f, e.target.value)}
                className="w-full px-3 py-2 border rounded-sm font-sans text-sm mb-2"
                placeholder={f}
              />
            )
          )}
          <p className="font-sans text-sm text-gray-600 mb-2">Checklist (3 items)</p>
          {ctaItems.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => patchCtaChecklist(idx, 'title', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-sm font-sans text-sm"
                placeholder="Title"
              />
              <input
                type="text"
                value={item.body || ''}
                onChange={(e) => patchCtaChecklist(idx, 'body', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-sm font-sans text-sm"
                placeholder="Body"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAboutPageEditor = () => {
    if (!pageData?.sections) return null;
    const sections = pageData.sections;

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={sections.hero?.heading || ''}
                onChange={(e) => handleSectionChange('hero', 'heading', e.target.value)}
                placeholder="e.g., GAG Lawyers"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <input
                type="text"
                value={sections.hero?.subheading || ''}
                onChange={(e) => handleSectionChange('hero', 'subheading', e.target.value)}
                placeholder="e.g., Grover & Grover Advocates"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <textarea
                value={sections.hero?.tagline || ''}
                onChange={(e) => handleSectionChange('hero', 'tagline', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Introduction</h3>
          <textarea
            value={sections.introduction?.text || ''}
            onChange={(e) => handleSectionChange('introduction', 'text', e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
          />
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Founder Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Founder Name
              </label>
              <input
                type="text"
                value={sections.founder?.name || ''}
                onChange={(e) => handleSectionChange('founder', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <ImageUploader
                label="Founder Photo"
                currentImage={sections.founder?.imageUrl || ''}
                onImageUploaded={(url, publicId) => {
                  handleSectionChange('founder', 'imageUrl', url);
                  handleSectionChange('founder', 'cloudinaryPublicId', publicId);
                }}
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={sections.founder?.bio || ''}
                onChange={(e) => handleSectionChange('founder', 'bio', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Quote
              </label>
              <textarea
                value={sections.founder?.quote || ''}
                onChange={(e) => handleSectionChange('founder', 'quote', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">Mission Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <input
                type="text"
                value={sections.mission?.heading || ''}
                onChange={(e) => handleSectionChange('mission', 'heading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={sections.mission?.description || ''}
                onChange={(e) => handleSectionChange('mission', 'description', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!pageData) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Page Content Manager</h1>
        <p className="font-sans text-gray-600">Edit page content and SEO settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-sm ${message.includes('success') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <p className="font-sans text-sm">{message}</p>
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="bg-white rounded-sm shadow-sm mb-6 p-2 flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setSelectedPage(page.id)}
            className={`px-6 py-3 rounded-sm font-sans text-sm font-medium transition-all ${
              selectedPage === page.id
                ? 'bg-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="inline mr-2" size={16} />
            {page.label}
          </button>
        ))}
      </div>

      {/* Content Editor — section builder first so “add sections” is visible on every page */}
      <div className="space-y-6 mb-6">
        <DynamicSectionsEditor
          pageLabel={pages.find((p) => p.id === selectedPage)?.label || selectedPage}
          sections={pickEditableSubset(pageData?.sections, selectedPage)}
          onChange={(subset) =>
            setPageData((prev) => ({
              ...prev,
              sections: mergeSubsetIntoPageSections(prev?.sections, selectedPage, subset),
            }))
          }
          subtitle={
            getReservedSet(selectedPage)
              ? 'Optional extra section keys for this page (stored in CMS and returned by /api/pages/{name}). Fixed layout blocks for this page are in the structured fields below.'
              : 'All section keys for this page. Add new blocks with the field above, or edit existing ones. Use simple fields, or JSON for lists and nested objects.'
          }
        />

        {selectedPage === 'home' && renderHomePageEditor()}
        {selectedPage === 'about' && renderAboutPageEditor()}

        {/* SEO Section - Common for all pages */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-navy mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Page Title <span className="text-xs text-gray-500">(appears in browser tab)</span>
              </label>
              <input
                type="text"
                value={pageData.seo?.title || ''}
                onChange={(e) => handleSEOChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
              <p className="mt-1 text-xs text-gray-500 font-sans">
                {pageData.seo?.title?.length || 0} characters (recommended: 50-60)
              </p>
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={pageData.seo?.description || ''}
                onChange={(e) => handleSEOChange('description', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
              <p className="mt-1 text-xs text-gray-500 font-sans">
                {pageData.seo?.description?.length || 0} characters (recommended: 150-160)
              </p>
            </div>
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Keywords <span className="text-xs text-gray-500">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={pageData.seo?.keywords || ''}
                onChange={(e) => handleSEOChange('keywords', e.target.value)}
                placeholder="law firm, legal services, corporate law"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>
            <div>
              <ImageUploader
                label="Open Graph Image (for social media sharing)"
                currentImage={pageData.seo?.ogImage || ''}
                onImageUploaded={(url, publicId) => {
                  handleSEOChange('ogImage', url);
                  handleSEOChange('ogImagePublicId', publicId);
                }}
              />
            </div>
          </div>
        </div>

        {/* Publish Status */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={pageData.isPublished}
              onChange={(e) => setPageData(prev => ({ ...prev, isPublished: e.target.checked }))}
              className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
            />
            <label htmlFor="isPublished" className="font-sans text-sm font-medium text-gray-700">
              Page is Published (visible to public)
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-gray-50 py-4 border-t border-gray-200">
        <Button variant="primary" size="lg" onClick={handleSave} disabled={isSaving}>
          <Save className="inline mr-2" size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default PageContentManager;
