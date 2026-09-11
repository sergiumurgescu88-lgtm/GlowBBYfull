import React, { useState } from 'react';
import { ProfileData, ProfileLayoutTemplate } from '../types';
import { PROFILE_TEMPLATES } from '../data/templatesData';
import {
  Sparkles,
  X,
  Check,
  Zap,
  Palette,
  Layout,
  Radio,
  Clock,
  Gift,
  Shield,
  Search,
  ArrowRight,
  Eye,
  Flame,
  Globe
} from 'lucide-react';

interface TemplatesLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: ProfileLayoutTemplate, mode: 'full' | 'style') => void;
  currentProfile: ProfileData;
}

export const TemplatesLibraryModal: React.FC<TemplatesLibraryModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
  currentProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<ProfileLayoutTemplate | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Layouts', count: PROFILE_TEMPLATES.length },
    { id: 'gaming', label: 'Gaming & Tech', count: PROFILE_TEMPLATES.filter((t) => t.category === 'gaming').length },
    { id: 'luxury', label: 'VIP & Luxury', count: PROFILE_TEMPLATES.filter((t) => t.category === 'luxury').length },
    { id: 'cozy', label: 'Cozy & Anime', count: PROFILE_TEMPLATES.filter((t) => t.category === 'cozy').length },
    { id: 'party', label: 'Party & Dance', count: PROFILE_TEMPLATES.filter((t) => t.category === 'party').length },
    { id: 'minimal', label: 'Minimalist', count: PROFILE_TEMPLATES.filter((t) => t.category === 'minimal').length },
  ];

  const filteredTemplates = PROFILE_TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div
      id="templates-library-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="templates-library-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Professional Profile Templates Library
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {PROFILE_TEMPLATES.length} Pre-built Layouts
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Click any layout to instantly transform your canvas with ready-to-use tip menus, goals, rules, and color palettes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Templates Grid Content */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-medium">No templates match your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-violet-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTemplates.map((template) => {
                const isCurrentActive =
                  currentProfile.stageName === template.fullProfile.stageName;

                return (
                  <div
                    key={template.id}
                    className={`bg-slate-950/70 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between hover:border-violet-500/80 group ${
                      isCurrentActive
                        ? 'border-violet-500 ring-1 ring-violet-500 shadow-xl shadow-violet-500/10'
                        : 'border-slate-800'
                    }`}
                  >
                    {/* Visual Card Header Preview */}
                    <div
                      className="h-32 p-4 relative flex flex-col justify-between overflow-hidden"
                      style={{ background: template.previewBg }}
                    >
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

                      {/* Top Badges */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
                          style={{
                            backgroundColor: `${template.accentColor}dd`,
                            color: '#ffffff',
                          }}
                        >
                          {template.badge}
                        </span>

                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: template.titleColor }}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: template.accentColor }}
                          />
                          <span className="text-[10px] text-slate-300 ml-1 font-mono uppercase">
                            {template.fontFamily}
                          </span>
                        </div>
                      </div>

                      {/* Broadcaster Mini Avatar & Name */}
                      <div className="relative z-10 flex items-center gap-3">
                        <img
                          src={template.fullProfile.avatarUrl}
                          alt={template.fullProfile.stageName}
                          className="w-12 h-12 rounded-full object-cover border-2 shadow-lg"
                          style={{ borderColor: template.accentColor }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4
                              className="text-base font-extrabold truncate"
                              style={{ color: template.titleColor }}
                            >
                              {template.fullProfile.stageName}
                            </h4>
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          </div>
                          <p className="text-[11px] text-slate-200/90 truncate font-medium">
                            {template.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                            {template.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {template.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {template.description}
                        </p>

                        {/* Highlights Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {template.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-300"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {/* Apply Full Profile */}
                        <button
                          onClick={() => {
                            onApplyTemplate(template, 'full');
                            onClose();
                          }}
                          className="flex-1 py-2 px-3 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md shadow-violet-600/30 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Apply Full Profile</span>
                        </button>

                        {/* Apply Style Only */}
                        <button
                          onClick={() => {
                            onApplyTemplate(template, 'style');
                            onClose();
                          }}
                          className="py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                          title="Apply colors, background, and fonts without replacing your custom bio text"
                        >
                          <Palette className="w-3.5 h-3.5 text-pink-400" />
                          <span>Theme Only</span>
                        </button>

                        {/* Inspect Preview */}
                        <button
                          onClick={() => setPreviewTemplate(template)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-800 flex items-center justify-center transition-colors"
                          title="Inspect template details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              Tip: Choosing <strong>"Apply Full Profile"</strong> gives you complete curated text and tip items, while <strong>"Theme Only"</strong> preserves your custom text.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Sub-modal: Quick Detail Inspector */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-violet-400 font-bold uppercase tracking-wider">
                  Template Details
                </span>
                <h3 className="text-lg font-bold text-white">{previewTemplate.name}</h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sample Bio & Goal */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Sample Broadcaster Tagline & Bio
                </span>
                <p className="text-sm font-semibold text-white">{previewTemplate.fullProfile.tagline}</p>
                <p className="text-slate-300 leading-relaxed">{previewTemplate.fullProfile.aboutMeText}</p>
              </div>

              {/* Sample Tip Menu */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-violet-400" />
                  Pre-configured Tip Menu ({previewTemplate.fullProfile.tipItems.length} items)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewTemplate.fullProfile.tipItems.map((tip) => (
                    <div
                      key={tip.id}
                      className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-slate-300">{tip.description}</span>
                      <span className="font-bold text-violet-400">{tip.tokens} tk</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Rules */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Room Rules Included
                </span>
                <ul className="space-y-1 text-slate-300">
                  {previewTemplate.fullProfile.rules.map((rule) => (
                    <li key={rule.id} className="flex items-start gap-2">
                      <span className="text-violet-400 font-bold">•</span>
                      <span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onApplyTemplate(previewTemplate, 'style');
                  setPreviewTemplate(null);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl"
              >
                Apply Theme Only
              </button>
              <button
                onClick={() => {
                  onApplyTemplate(previewTemplate, 'full');
                  setPreviewTemplate(null);
                  onClose();
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg shadow-violet-600/30 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Apply Full Profile to Canvas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
