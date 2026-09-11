import React, { useState } from 'react';
import { ProfileData, TipItem, RuleItem, SocialLinkItem, ProfileLayoutTemplate } from '../types';
import { TEMPLATE_PRESETS, BACKGROUND_PRESETS } from '../data/mockData';
import { PROFILE_TEMPLATES } from '../data/templatesData';
import { DesignerPreview } from './DesignerPreview';
import { TemplatesLibraryModal } from './TemplatesLibraryModal';
import {
  Wand2,
  Download,
  RotateCcw,
  Palette,
  Layout,
  Type,
  Plus,
  Trash2,
  Sparkles,
  Shield,
  Eye,
  Monitor,
  Smartphone,
  Check,
  Layers,
  Sliders,
  Share2,
  Zap,
  Undo2,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

interface ProfileDesignerProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  onFinalize: () => void;
}

export const ProfileDesigner: React.FC<ProfileDesignerProps> = ({
  profile,
  setProfile,
  onFinalize,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'presets'>('content');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState<boolean>(false);
  const [inlineCategory, setInlineCategory] = useState<string>('all');
  const [toastNotification, setToastNotification] = useState<{ message: string; templateName: string } | null>(null);
  const [previousProfile, setPreviousProfile] = useState<ProfileData | null>(null);

  // Random background generator (Step 2 in prompt)
  const handleRandomBackground = () => {
    const randomPreset = BACKGROUND_PRESETS[Math.floor(Math.random() * BACKGROUND_PRESETS.length)];
    setProfile((prev) => ({
      ...prev,
      backgroundPreset: randomPreset.id,
    }));
  };

  // Apply complete pre-built layout or style only
  const handleApplyTemplateLayout = (template: ProfileLayoutTemplate, mode: 'full' | 'style' = 'full') => {
    setPreviousProfile(profile);
    if (mode === 'full') {
      setProfile({
        ...template.fullProfile,
        targetPlatform: profile.targetPlatform || template.fullProfile.targetPlatform,
      });
      setToastNotification({
        message: `Applied full "${template.name}" layout to canvas!`,
        templateName: template.name,
      });
    } else {
      setProfile((prev) => ({
        ...prev,
        ...template.styleOnly,
      }));
      setToastNotification({
        message: `Applied theme & styling from "${template.name}"!`,
        templateName: template.name,
      });
    }

    setTimeout(() => {
      setToastNotification((curr) => (curr?.templateName === template.name ? null : curr));
    }, 5000);
  };

  // Revert template application
  const handleUndoTemplate = () => {
    if (previousProfile) {
      setProfile(previousProfile);
      setPreviousProfile(null);
      setToastNotification({
        message: 'Reverted canvas to previous state',
        templateName: '',
      });
      setTimeout(() => setToastNotification(null), 3000);
    }
  };

  // Legacy quick color preset applicator
  const handleApplyTemplate = (templateId: string) => {
    const template = TEMPLATE_PRESETS.find((t) => t.id === templateId);
    if (!template) return;
    setProfile((prev) => ({
      ...prev,
      ...template.data,
    }));
  };

  // Add tip item
  const handleAddTip = () => {
    const newTip: TipItem = {
      id: Date.now().toString(),
      tokens: 50,
      description: 'New tip perk',
    };
    setProfile((prev) => ({
      ...prev,
      tipItems: [...prev.tipItems, newTip],
    }));
  };

  // Remove tip item
  const handleRemoveTip = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      tipItems: prev.tipItems.filter((t) => t.id !== id),
    }));
  };

  // Add rule item
  const handleAddRule = () => {
    const newRule: RuleItem = {
      id: Date.now().toString(),
      text: 'Be polite and respectful in chat',
    };
    setProfile((prev) => ({
      ...prev,
      rules: [...prev.rules, newRule],
    }));
  };

  // Remove rule item
  const handleRemoveRule = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      rules: prev.rules.filter((r) => r.id !== id),
    }));
  };

  return (
    <section id="designer" className="relative py-12 bg-[#090D16] text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Target Cam Site:
            </span>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              {(['chaturbate', 'mfc', 'stripchat', 'bongacams', 'cam4'] as const).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setProfile((prev) => ({ ...prev, targetPlatform: plat }))}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all capitalize ${
                    profile.targetPlatform === plat
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {plat === 'mfc' ? 'MyFreeCams' : plat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Templates Library button */}
            <button
              id="designer-open-templates-btn"
              onClick={() => setIsLibraryModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold bg-gradient-to-r from-violet-600/25 to-fuchsia-600/25 hover:from-violet-600/40 hover:to-fuchsia-600/40 text-violet-200 rounded-xl border border-violet-500/50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md shadow-violet-900/20"
              title="Browse 5 pre-built professional profile templates"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>Templates Library</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-violet-500 text-white">
                5
              </span>
            </button>

            {/* Random Background button */}
            <button
              id="designer-random-bg-btn"
              onClick={handleRandomBackground}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700/80 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              title="Change to a random inspirational background"
            >
              <Wand2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Random Background</span>
            </button>

            {/* Finalize button */}
            <button
              id="designer-finalize-btn"
              onClick={onFinalize}
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Finalize & Export</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace: Sidebar Controls & Center Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Configuration Panels (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Tab Navigation */}
            <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/60 p-1">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'content'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-violet-400" />
                Components
              </button>

              <button
                onClick={() => setActiveTab('design')}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'design'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                Theme & Colors
              </button>

              <button
                onClick={() => setActiveTab('presets')}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'presets'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Templates</span>
                <span className="text-[10px] bg-violet-500/30 text-violet-300 px-1.5 py-0.2 rounded-full font-bold">
                  5
                </span>
              </button>
            </div>

            {/* Tab Contents Container */}
            <div className="p-5 max-h-[750px] overflow-y-auto space-y-6">
              
              {/* TAB 1: CONTENT & COMPONENTS */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  
                  {/* Broadcaster Profile */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                      Broadcaster Info
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Stage Name
                      </label>
                      <input
                        type="text"
                        value={profile.stageName}
                        onChange={(e) => setProfile({ ...profile, stageName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                        placeholder="e.g. Luna Starlight"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Tagline / Room Intro
                      </label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                        placeholder="e.g. ✨ Cozy vibes & fun shows"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Avatar Image URL
                      </label>
                      <input
                        type="text"
                        value={profile.avatarUrl}
                        onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500 truncate"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Token Goal */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                        Token Goal Bar
                      </h4>
                      <input
                        type="checkbox"
                        checked={profile.showGoal}
                        onChange={(e) => setProfile({ ...profile, showGoal: e.target.checked })}
                        className="w-4 h-4 rounded text-violet-600 bg-slate-800 border-slate-700 focus:ring-violet-500"
                      />
                    </div>
                    {profile.showGoal && (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={profile.goalTitle}
                          onChange={(e) => setProfile({ ...profile, goalTitle: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          placeholder="Goal Description"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400">Current</label>
                            <input
                              type="number"
                              value={profile.goalCurrent}
                              onChange={(e) => setProfile({ ...profile, goalCurrent: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400">Target</label>
                            <input
                              type="number"
                              value={profile.goalTarget}
                              onChange={(e) => setProfile({ ...profile, goalTarget: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* About Me Section */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                        About Me
                      </h4>
                      <input
                        type="checkbox"
                        checked={profile.showAboutMe}
                        onChange={(e) => setProfile({ ...profile, showAboutMe: e.target.checked })}
                        className="w-4 h-4 rounded text-violet-600 bg-slate-800 border-slate-700 focus:ring-violet-500"
                      />
                    </div>
                    {profile.showAboutMe && (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={3}
                          value={profile.aboutMeText}
                          onChange={(e) => setProfile({ ...profile, aboutMeText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          placeholder="Tell fans about yourself..."
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={profile.age}
                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            placeholder="Age"
                          />
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            placeholder="Location"
                          />
                          <input
                            type="text"
                            value={profile.languages}
                            onChange={(e) => setProfile({ ...profile, languages: e.target.value })}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            placeholder="Languages"
                          />
                          <input
                            type="text"
                            value={profile.zodiac}
                            onChange={(e) => setProfile({ ...profile, zodiac: e.target.value })}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                            placeholder="Zodiac"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tip Menu */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                        Tip Menu
                      </h4>
                      <input
                        type="checkbox"
                        checked={profile.showTipMenu}
                        onChange={(e) => setProfile({ ...profile, showTipMenu: e.target.checked })}
                        className="w-4 h-4 rounded text-violet-600 bg-slate-800 border-slate-700 focus:ring-violet-500"
                      />
                    </div>
                    {profile.showTipMenu && (
                      <div className="space-y-2 pt-1">
                        {profile.tipItems.map((tip, idx) => (
                          <div key={tip.id} className="flex items-center gap-2">
                            <input
                              type="number"
                              value={tip.tokens}
                              onChange={(e) => {
                                const newItems = [...profile.tipItems];
                                newItems[idx].tokens = Number(e.target.value);
                                setProfile({ ...profile, tipItems: newItems });
                              }}
                              className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                              placeholder="Tokens"
                            />
                            <input
                              type="text"
                              value={tip.description}
                              onChange={(e) => {
                                const newItems = [...profile.tipItems];
                                newItems[idx].description = e.target.value;
                                setProfile({ ...profile, tipItems: newItems });
                              }}
                              className="flex-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                              placeholder="Action / Reward"
                            />
                            <button
                              onClick={() => handleRemoveTip(tip.id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                              title="Delete row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={handleAddTip}
                          className="w-full py-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 bg-violet-950/30 hover:bg-violet-950/50 border border-violet-800/40 rounded-lg flex items-center justify-center gap-1 mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Tip Item
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Room Rules */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                        Room Rules
                      </h4>
                      <input
                        type="checkbox"
                        checked={profile.showRules}
                        onChange={(e) => setProfile({ ...profile, showRules: e.target.checked })}
                        className="w-4 h-4 rounded text-violet-600 bg-slate-800 border-slate-700 focus:ring-violet-500"
                      />
                    </div>
                    {profile.showRules && (
                      <div className="space-y-2 pt-1">
                        {profile.rules.map((rule, idx) => (
                          <div key={rule.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={rule.text}
                              onChange={(e) => {
                                const newRules = [...profile.rules];
                                newRules[idx].text = e.target.value;
                                setProfile({ ...profile, rules: newRules });
                              }}
                              className="flex-1 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                            />
                            <button
                              onClick={() => handleRemoveRule(rule.id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={handleAddRule}
                          className="w-full py-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 bg-violet-950/30 hover:bg-violet-950/50 border border-violet-800/40 rounded-lg flex items-center justify-center gap-1 mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Rule
                        </button>
                      </div>
                    )}
                  </div>

                  {/* GLOW Models Protection Badge */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-pink-400" />
                        GLOW Models DMCA Shield
                      </h4>
                      <p className="text-[11px] text-slate-400">Deter pirate recorders and leak bots</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.showDmcaBadge}
                      onChange={(e) => setProfile({ ...profile, showDmcaBadge: e.target.checked })}
                      className="w-4 h-4 rounded text-violet-600 bg-slate-800 border-slate-700 focus:ring-violet-500"
                    />
                  </div>

                </div>
              )}

              {/* TAB 2: DESIGN & THEME */}
              {activeTab === 'design' && (
                <div className="space-y-6">
                  
                  {/* Background Presets */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-violet-400 mb-2.5">
                      Choose Your Background
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {BACKGROUND_PRESETS.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setProfile({ ...profile, backgroundPreset: bg.id })}
                          className={`h-16 rounded-xl border text-[11px] font-semibold flex items-end p-2 transition-all text-white relative overflow-hidden ${
                            profile.backgroundPreset === bg.id
                              ? 'border-violet-400 ring-2 ring-violet-500/50 scale-102'
                              : 'border-slate-700 hover:border-slate-500'
                          }`}
                          style={{ background: bg.css }}
                        >
                          <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] truncate">
                            {bg.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Controls */}
                  <div className="space-y-3.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-violet-400">
                      Customize Colors & Fonts
                    </label>

                    {/* Title Color */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>Title / Heading Color</span>
                        <span className="font-mono text-[11px] text-slate-400">{profile.titleColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={profile.titleColor}
                          onChange={(e) => setProfile({ ...profile, titleColor: e.target.value })}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-slate-800 border border-slate-700"
                        />
                        <div className="flex gap-1.5 flex-1">
                          {['#f43f5e', '#fb7185', '#22d3ee', '#34d399', '#f59e0b', '#a855f7', '#ffffff'].map((c) => (
                            <button
                              key={c}
                              onClick={() => setProfile({ ...profile, titleColor: c })}
                              className="w-6 h-6 rounded-full border border-white/20"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>Accent & Highlights</span>
                        <span className="font-mono text-[11px] text-slate-400">{profile.accentColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={profile.accentColor}
                          onChange={(e) => setProfile({ ...profile, accentColor: e.target.value })}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-slate-800 border border-slate-700"
                        />
                        <div className="flex gap-1.5 flex-1">
                          {['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#eab308', '#6366f1'].map((c) => (
                            <button
                              key={c}
                              onClick={() => setProfile({ ...profile, accentColor: c })}
                              className="w-6 h-6 rounded-full border border-white/20"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-xs text-slate-300 mb-1.5">
                        Font Family
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['sans', 'serif', 'display', 'mono'] as const).map((font) => (
                          <button
                            key={font}
                            onClick={() => setProfile({ ...profile, fontFamily: font })}
                            className={`py-1.5 text-xs rounded-lg border capitalize ${
                              profile.fontFamily === font
                                ? 'bg-violet-600 border-violet-400 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {font}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card Opacity Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>Card Background Opacity</span>
                        <span>{Math.round(profile.cardOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="1"
                        step="0.05"
                        value={profile.cardOpacity}
                        onChange={(e) => setProfile({ ...profile, cardOpacity: parseFloat(e.target.value) })}
                        className="w-full accent-violet-500"
                      />
                    </div>

                    {/* Card Blur Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>Backdrop Blur Effect</span>
                        <span>{profile.cardBlur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        step="2"
                        value={profile.cardBlur}
                        onChange={(e) => setProfile({ ...profile, cardBlur: parseInt(e.target.value) })}
                        className="w-full accent-violet-500"
                      />
                    </div>

                    {/* Border Radius */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>Corner Radius</span>
                        <span>{profile.borderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="24"
                        step="2"
                        value={profile.borderRadius}
                        onChange={(e) => setProfile({ ...profile, borderRadius: parseInt(e.target.value) })}
                        className="w-full accent-violet-500"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: TEMPLATES LIBRARY */}
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  {/* Header with Explainer and Full Gallery button */}
                  <div className="bg-gradient-to-r from-violet-950/40 via-slate-950/60 to-fuchsia-950/40 p-3.5 rounded-xl border border-violet-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Pre-built Professional Layouts
                      </span>
                      <button
                        onClick={() => setIsLibraryModalOpen(true)}
                        className="text-[11px] text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        Expanded Gallery
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Click any layout to instantly adopt complete broadcaster setups: tailored tip menus, token goals, room rules, schedules, and custom color themes.
                    </p>
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'all', label: 'All (5)' },
                      { id: 'gaming', label: 'Gaming' },
                      { id: 'luxury', label: 'VIP Luxury' },
                      { id: 'cozy', label: 'Cozy Anime' },
                      { id: 'party', label: 'Party' },
                      { id: 'minimal', label: 'Minimal' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setInlineCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          inlineCategory === cat.id
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Template Cards List */}
                  <div className="space-y-3.5 pt-1">
                    {PROFILE_TEMPLATES
                      .filter((t) => inlineCategory === 'all' || t.category === inlineCategory)
                      .map((tmpl) => {
                        const isCurrentActive = profile.stageName === tmpl.fullProfile.stageName;

                        return (
                          <div
                            key={tmpl.id}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden bg-slate-950/60 ${
                              isCurrentActive
                                ? 'border-violet-500 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/50'
                                : 'border-slate-800/90 hover:border-slate-700'
                            }`}
                          >
                            {/* Header Preview Banner */}
                            <div
                              className="h-24 p-3 relative flex flex-col justify-between overflow-hidden"
                              style={{ background: tmpl.previewBg }}
                            >
                              <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
                              <div className="relative z-10 flex items-center justify-between">
                                <span
                                  className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                                  style={{ backgroundColor: `${tmpl.accentColor}e6` }}
                                >
                                  {tmpl.badge}
                                </span>
                                {isCurrentActive && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-md">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" /> Active on Canvas
                                  </span>
                                )}
                              </div>

                              <div className="relative z-10 flex items-center gap-2.5">
                                <img
                                  src={tmpl.fullProfile.avatarUrl}
                                  alt={tmpl.fullProfile.stageName}
                                  className="w-9 h-9 rounded-full object-cover border-2 shadow-md shrink-0"
                                  style={{ borderColor: tmpl.accentColor }}
                                />
                                <div className="min-w-0">
                                  <h5
                                    className="text-xs font-black truncate"
                                    style={{ color: tmpl.titleColor }}
                                  >
                                    {tmpl.fullProfile.stageName}
                                  </h5>
                                  <p className="text-[10px] text-slate-200/90 truncate">
                                    {tmpl.categoryLabel} · {tmpl.tagline}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-3.5 space-y-3">
                              <p className="text-[11px] text-slate-300 leading-snug">
                                {tmpl.description}
                              </p>

                              {/* Inclusion chips */}
                              <div className="flex flex-wrap gap-1">
                                {tmpl.highlights.map((h, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-900 border border-slate-800 text-slate-300"
                                  >
                                    ✓ {h}
                                  </span>
                                ))}
                              </div>

                              {/* Apply Buttons */}
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                  onClick={() => handleApplyTemplateLayout(tmpl, 'full')}
                                  className="py-1.5 px-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                                  title="Apply complete profile content, tip menu, rules and styling"
                                >
                                  <Zap className="w-3 h-3 text-amber-300" />
                                  <span>Apply Layout</span>
                                </button>

                                <button
                                  onClick={() => handleApplyTemplateLayout(tmpl, 'style')}
                                  className="py-1.5 px-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                                  title="Adopt colors and styles without overwriting your custom text"
                                >
                                  <Palette className="w-3 h-3 text-pink-400" />
                                  <span>Theme Only</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT: Live Preview Canvas (7 cols) */}
          <div className="lg:col-span-7 sticky top-24">
            {/* Toast feedback when a template is applied */}
            {toastNotification && (
              <div className="mb-3 bg-violet-950/90 border border-violet-500/80 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium">{toastNotification.message}</span>
                </div>
                {previousProfile && (
                  <button
                    onClick={handleUndoTemplate}
                    className="px-2.5 py-1 text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center gap-1 text-white transition-colors cursor-pointer"
                    title="Undo template application"
                  >
                    <Undo2 className="w-3 h-3" />
                    <span>Undo</span>
                  </button>
                )}
              </div>
            )}

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl">
              
              {/* Preview Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-400 ml-2">
                    Live Cam Profile Preview ({profile.targetPlatform})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 px-1.5 py-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded text-xs ${previewDevice === 'desktop' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Desktop View"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded text-xs ${previewDevice === 'mobile' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Canvas Box */}
              <div className="max-h-[720px] overflow-y-auto rounded-xl border border-slate-800/80 bg-slate-950/70 p-2 sm:p-4 flex justify-center">
                <div className={`transition-all duration-300 w-full ${previewDevice === 'mobile' ? 'max-w-[390px]' : 'max-w-full'}`}>
                  <DesignerPreview profile={profile} />
                </div>
              </div>

              {/* Quick helper tip */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Everything saves automatically to your browser</span>
                <button
                  onClick={onFinalize}
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export HTML / Image
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Templates Library Modal */}
      <TemplatesLibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
        onApplyTemplate={handleApplyTemplateLayout}
        currentProfile={profile}
      />
    </section>
  );
};

