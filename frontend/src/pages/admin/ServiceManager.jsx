import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Briefcase,
  Building,
  Building2,
  Coins,
  Factory,
  FileText,
  Gavel,
  Globe,
  Grid3X3,
  GripVertical,
  Handshake,
  Heart,
  Landmark,
  LayoutList,
  Loader2,
  Pencil,
  Plus,
  Save,
  Scale,
  Search,
  Shield,
  Sparkles,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import API_BASE_URL from '../../config/api';

const PRACTICE_AREAS = [
  { value: 'military', label: 'Military Law' },
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'administrative', label: 'Administrative Law' },
  { value: 'civil', label: 'Civil Law' },
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'family', label: 'Family Law' },
  { value: 'labour', label: 'Labour Law' },
  { value: 'property', label: 'Property Law' },
  { value: 'litigation', label: 'Litigation' },
  { value: 'immigration', label: 'Immigration Law' },
  { value: 'adr', label: 'ADR' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently Updated' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'order', label: 'Display Order' },
];

const ICON_MAP = {
  Briefcase,
  Building2,
  Scale,
  Home: Building,
  Users,
  FileText,
  Shield,
  TrendingUp,
  Globe,
  Heart,
  Gavel,
  Landmark,
  UserCheck,
  Building,
  Handshake,
  HandshakeIcon: Handshake,
  Coins,
  Factory,
  Wallet,
};

const displayName = (service) => service?.title || service?.name || 'Untitled Service';
const descriptionText = (service) =>
  service?.shortDescription || service?.description || service?.longDescription || 'No description provided yet.';
const practiceLabel = (value) => PRACTICE_AREAS.find((item) => item.value === value)?.label || 'General Law';

const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalize = (service) => {
  const title = displayName(service);
  const description = descriptionText(service);
  return {
    ...service,
    title,
    name: service?.name || title,
    category: service?.category || 'litigation',
    shortDescription: service?.shortDescription || description,
    longDescription: service?.longDescription || description,
    description,
    iconName: ICON_MAP[service?.iconName] ? service.iconName : 'Briefcase',
    order: Number.isFinite(service?.order) ? service.order : 0,
    updatedAt: service?.updatedAt || service?.createdAt || new Date().toISOString(),
  };
};

const baseForm = {
  name: '',
  category: 'litigation',
  shortDescription: '',
  longDescription: '',
  iconName: 'Briefcase',
  order: 0,
};

const formFromService = (service) => {
  if (!service) {
    return { ...baseForm };
  }
  const normalized = normalize(service);
  return {
    name: normalized.name,
    category: normalized.category,
    shortDescription: normalized.shortDescription,
    longDescription: normalized.longDescription,
    iconName: normalized.iconName,
    order: normalized.order,
  };
};

const HeaderBar = ({ onCreate }) => (
  <header className="sticky top-[5.5rem] z-30 mb-6 rounded-3xl border border-white/45 bg-white/55 px-6 py-5 shadow-[0_22px_42px_-28px_rgba(15,23,42,0.85)] backdrop-blur-xl sm:px-8 dark:border-slate-700/70 dark:bg-slate-900/55">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Legal Tech Console</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-100">Service Manager</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Manage your legal services and practice areas</p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_-14px_rgba(37,99,235,0.9)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_36px_-12px_rgba(37,99,235,0.88)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50"
      >
        <Plus size={17} />
        Add Service
      </button>
    </div>
  </header>
);

const FilterBar = ({
  searchTerm,
  onSearch,
  selectedPractice,
  onPractice,
  sortBy,
  onSort,
  viewMode,
  onViewMode,
}) => (
  <section className="sticky top-[13.5rem] z-20 mb-8 rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_20px_36px_-25px_rgba(15,23,42,0.65)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search services"
          className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white pl-11 pr-4 text-sm text-slate-800 shadow-sm transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-900/50"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[26rem]">
        <label className="relative">
          <span className="sr-only">Practice area</span>
          <select
            value={selectedPractice}
            onChange={(event) => onPractice(event.target.value)}
            className="h-11 w-full appearance-none rounded-2xl border border-slate-200/80 bg-white px-4 pr-10 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200 dark:focus:ring-blue-900/50"
          >
            <option value="all">Practice Area</option>
            {PRACTICE_AREAS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        </label>

        <label className="relative">
          <span className="sr-only">Sort services</span>
          <select
            value={sortBy}
            onChange={(event) => onSort(event.target.value)}
            className="h-11 w-full appearance-none rounded-2xl border border-slate-200/80 bg-white px-4 pr-10 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200 dark:focus:ring-blue-900/50"
          >
            {SORT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        </label>
      </div>

      <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50/70 p-1 dark:border-slate-700 dark:bg-slate-800/80">
        <button
          type="button"
          onClick={() => onViewMode('grid')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ease-out ${
            viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Grid3X3 size={16} />
          Grid
        </button>
        <button
          type="button"
          onClick={() => onViewMode('list')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ease-out ${
            viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <LayoutList size={16} />
          List
        </button>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const Icon = ICON_MAP[service.iconName] || Briefcase;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_22px_40px_-26px_rgba(15,23,42,0.72)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-300/65 hover:shadow-[0_32px_46px_-24px_rgba(30,64,175,0.5)] dark:border-slate-700/80 dark:from-slate-900 dark:to-slate-900/80">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:to-indigo-500/10" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/30">
          <Icon size={21} />
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-500">
          <GripVertical size={12} />
          Reorder
        </div>
      </div>

      <div className="relative mt-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{service.title}</h3>
        <span className="mt-2 inline-flex rounded-full border border-blue-200/70 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {practiceLabel(service.category)}
        </span>
        <p className="mt-3 h-10 overflow-hidden text-sm leading-5 text-slate-500 dark:text-slate-400">{service.description}</p>
      </div>

      <div className="relative mt-5 flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(service)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-out hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <Pencil size={15} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(service)}
          className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-600 transition-all duration-200 ease-out hover:bg-red-100"
          aria-label={`Delete ${service.title}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
};

const ServiceListRow = ({
  service,
  isInlineEditing,
  inlineValues,
  onInlineChange,
  onStartInlineEdit,
  onCancelInline,
  onSaveInline,
  onEdit,
  onDelete,
}) => {
  const Icon = ICON_MAP[service.iconName] || Briefcase;

  return (
    <tr className="group border-b border-slate-200/70 transition-colors duration-200 ease-out hover:bg-blue-50/45 dark:border-slate-700/70 dark:hover:bg-slate-800/55">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <Icon size={17} />
          </div>
          <div className="min-w-0">
            {isInlineEditing ? (
              <input
                value={inlineValues.title}
                onChange={(event) => onInlineChange('title', event.target.value)}
                className="h-9 w-full rounded-lg border border-slate-300 px-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70"
              />
            ) : (
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{service.title}</p>
            )}
            <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {practiceLabel(service.category)}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 sm:px-6">
        {isInlineEditing ? (
          <input
            value={inlineValues.shortDescription}
            onChange={(event) => onInlineChange('shortDescription', event.target.value)}
            className="h-9 w-full rounded-lg border border-slate-300 px-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70"
          />
        ) : (
          <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">{service.description}</p>
        )}
      </td>
      <td className="px-4 py-4 text-right sm:px-6">
        <div className="inline-flex items-center gap-2">
          {isInlineEditing ? (
            <>
              <button
                type="button"
                onClick={onSaveInline}
                className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-600 transition-all duration-200 ease-out hover:bg-blue-100"
                aria-label="Save row"
              >
                <Save size={15} />
              </button>
              <button
                type="button"
                onClick={onCancelInline}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition-all duration-200 ease-out hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                aria-label="Cancel"
              >
                <X size={15} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onStartInlineEdit}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-all duration-200 ease-out hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                aria-label="Inline edit"
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                onClick={() => onEdit(service)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-all duration-200 ease-out hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                aria-label="Open drawer edit"
              >
                <Sparkles size={15} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(service)}
                className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition-all duration-200 ease-out hover:bg-red-100"
                aria-label="Delete"
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const DrawerForm = ({ open, editingService, formData, isSaving, onChange, onClose, onSubmit }) => {
  const Icon = ICON_MAP[formData.iconName] || Briefcase;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out dark:border-slate-700 dark:bg-slate-900/95 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-slate-200/70 px-6 py-5 dark:border-slate-700/70">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{editingService ? 'Edit Service' : 'New Service'}</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-slate-100">{editingService ? 'Update Service' : 'Create Service'}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition-all duration-200 ease-out hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form className="flex-1 space-y-5 overflow-y-auto px-6 py-6" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Service Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              placeholder="Ex: Corporate Litigation"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Practice Area</label>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              >
                {PRACTICE_AREAS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Display Order</label>
              <input
                type="number"
                name="order"
                min="0"
                value={formData.order}
                onChange={onChange}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={onChange}
              required
              rows={5}
              placeholder="Concise summary for cards and lists"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Icon</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <Icon size={18} />
              </div>
              <select
                name="iconName"
                value={formData.iconName}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {Object.keys(ICON_MAP).map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Details (Optional)</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={onChange}
              rows={6}
              placeholder="Optional long form details"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            />
          </div>
        </form>

        <div className="sticky bottom-0 mt-auto border-t border-slate-200/70 bg-white/95 px-6 py-4 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 ease-out hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSaving}
              className="inline-flex min-w-[8.2rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_34px_-18px_rgba(37,99,235,0.95)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Service
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
    <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-4 space-y-2">
      <div className="h-3.5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3.5 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

const EmptyState = ({ onCreate }) => (
  <section className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-20 text-center shadow-[0_20px_40px_-28px_rgba(15,23,42,0.6)] backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/80">
    <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-blue-500/15 text-blue-700">
      <Briefcase size={28} />
    </div>
    <h3 className="mt-5 text-2xl font-semibold text-slate-950 dark:text-slate-100">No services yet</h3>
    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">Start by adding your first service</p>
    <button
      type="button"
      onClick={onCreate}
      className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_-14px_rgba(37,99,235,0.9)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_30px_-14px_rgba(37,99,235,0.85)]"
    >
      <Plus size={16} />
      Add Service
    </button>
  </section>
);

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ ...baseForm });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [inlineEditId, setInlineEditId] = useState(null);
  const [inlineValues, setInlineValues] = useState({ title: '', shortDescription: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setServices(data.data.map((item) => normalize(item)));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibleServices = useMemo(() => {
    const filtered = services.filter((service) => {
      const byPractice = selectedPractice === 'all' || service.category === selectedPractice;
      const text = `${service.title} ${service.description}`.toLowerCase();
      const bySearch = text.includes(searchTerm.toLowerCase());
      return byPractice && bySearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'order') {
        return a.order - b.order;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [services, selectedPractice, searchTerm, sortBy]);

  const openCreate = () => {
    setEditingService(null);
    setFormData({ ...baseForm });
    setDrawerOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setFormData(formFromService(service));
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingService(null);
    setFormData({ ...baseForm });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value,
    }));
  };

  const saveService = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    const token = localStorage.getItem('adminToken');
    const serviceName = formData.name.trim();
    const shortDescription = formData.shortDescription.trim();
    if (!serviceName || !shortDescription) {
      return;
    }

    const payload = {
      name: serviceName,
      title: serviceName,
      slug: makeSlug(serviceName),
      category: formData.category,
      shortDescription,
      longDescription: formData.longDescription.trim() || shortDescription,
      description: shortDescription,
      iconName: formData.iconName,
      order: Number.isFinite(formData.order) ? formData.order : 0,
    };

    setIsSaving(true);
    try {
      const endpoint = editingService
        ? `${API_BASE_URL}/api/services/${editingService._id}`
        : `${API_BASE_URL}/api/services`;
      const method = editingService ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchServices();
        closeDrawer();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (service) => {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) {
      return;
    }
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${service._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setServices((prev) => prev.filter((item) => item._id !== service._id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const startInlineEdit = (service) => {
    setInlineEditId(service._id);
    setInlineValues({
      title: service.title,
      shortDescription: service.shortDescription,
    });
  };

  const cancelInlineEdit = () => {
    setInlineEditId(null);
    setInlineValues({ title: '', shortDescription: '' });
  };

  const saveInlineEdit = async (service) => {
    const nextTitle = inlineValues.title.trim();
    const nextDescription = inlineValues.shortDescription.trim();
    if (!nextTitle || !nextDescription) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    const payload = {
      ...service,
      name: nextTitle,
      title: nextTitle,
      slug: makeSlug(nextTitle),
      shortDescription: nextDescription,
      description: nextDescription,
      longDescription: service.longDescription || nextDescription,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${service._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setServices((prev) =>
          prev.map((item) =>
            item._id === service._id
              ? normalize({ ...item, ...payload, updatedAt: new Date().toISOString() })
              : item
          )
        );
        cancelInlineEdit();
      }
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  return (
    <div className="relative -m-8 min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1221] via-[#0F1A2F] to-[#111827] px-4 pb-10 pt-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
      <div className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <HeaderBar onCreate={openCreate} />

        <FilterBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedPractice={selectedPractice}
          onPractice={setSelectedPractice}
          sortBy={sortBy}
          onSort={setSortBy}
          viewMode={viewMode}
          onViewMode={setViewMode}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : visibleServices.length === 0 ? (
          <EmptyState onCreate={openCreate} />
        ) : viewMode === 'grid' ? (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visibleServices.map((service) => (
              <ServiceCard key={service._id} service={service} onEdit={openEdit} onDelete={deleteService} />
            ))}
          </section>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_20px_40px_-26px_rgba(15,23,42,0.7)] dark:border-slate-700/70 dark:bg-slate-900/90">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-200/80 bg-slate-50/90 dark:border-slate-700/70 dark:bg-slate-800/70">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:px-6">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:px-6">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleServices.map((service) => (
                    <ServiceListRow
                      key={service._id}
                      service={service}
                      isInlineEditing={inlineEditId === service._id}
                      inlineValues={inlineValues}
                      onInlineChange={(field, value) => setInlineValues((prev) => ({ ...prev, [field]: value }))}
                      onStartInlineEdit={() => startInlineEdit(service)}
                      onCancelInline={cancelInlineEdit}
                      onSaveInline={() => saveInlineEdit(service)}
                      onEdit={openEdit}
                      onDelete={deleteService}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <DrawerForm
        open={drawerOpen}
        editingService={editingService}
        formData={formData}
        isSaving={isSaving}
        onChange={handleFormChange}
        onClose={closeDrawer}
        onSubmit={saveService}
      />
    </div>
  );
};

export default ServiceManager;
