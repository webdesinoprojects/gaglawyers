/**
 * FORM-01 lead attribution.
 *
 * Returns the page a consultation enquiry was submitted from, plus any campaign
 * parameters present on the landing URL, so every lead records its source page.
 *
 * The backend also falls back to the Referer header, so a lead stays traceable
 * even if a form forgets to spread these fields into its payload.
 */
export const getLeadSource = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  return {
    sourcePage: window.location.pathname,
    sourceUrl: window.location.href,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
  };
};

/** Same fields, appended to a FormData payload (used by the multipart career form). */
export const appendLeadSource = (formData) => {
  const src = getLeadSource();
  Object.entries(src).forEach(([k, v]) => {
    if (v) formData.append(k, v);
  });
  return formData;
};

export default getLeadSource;
