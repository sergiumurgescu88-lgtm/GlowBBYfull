import React, { useState } from 'react';
import { Layers, Shield, Copy, Check, Sparkles, Code2, Eye, ExternalLink, Plus, Trash2 } from 'lucide-react';

interface FloatingIconItem {
  id: string;
  name: string;
  url: string;
  color: string;
  iconType: 'shield' | 'chaturbate' | 'twitter' | 'onlyfans' | 'fansly' | 'instagram' | 'wishlist';
  enabled: boolean;
}

export const FloatingIconsTool: React.FC = () => {
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [themeGlow, setThemeGlow] = useState<'violet' | 'emerald' | 'rose' | 'cyber'>('violet');
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const [icons, setIcons] = useState<FloatingIconItem[]>([
    { id: '1', name: 'DMCA Protected', url: 'https://glowmodels.com', color: '#ec4899', iconType: 'shield', enabled: true },
    { id: '2', name: 'Live Stream Room', url: 'https://chaturbate.com', color: '#f59e0b', iconType: 'chaturbate', enabled: true },
    { id: '3', name: 'Official OnlyFans', url: 'https://onlyfans.com', color: '#00aff0', iconType: 'onlyfans', enabled: true },
    { id: '4', name: 'Follow on X / Twitter', url: 'https://twitter.com', color: '#ffffff', iconType: 'twitter', enabled: true },
    { id: '5', name: 'Gift Wishlist', url: 'https://throne.com', color: '#ec4899', iconType: 'wishlist', enabled: true },
  ]);

  const toggleIcon = (id: string) => {
    setIcons(icons.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  };

  const updateIconUrl = (id: string, url: string) => {
    setIcons(icons.map((item) => (item.id === id ? { ...item, url } : item)));
  };

  const activeIcons = icons.filter((i) => i.enabled);

  const embedScript = `<!-- GLOW Models Official Floating Shield & Social Hub -->
<div id="glow-floating-widget" style="position:fixed; ${
    position.includes('bottom') ? 'bottom:24px' : 'top:24px'
  }; ${
    position.includes('right') ? 'right:24px' : 'left:24px'
  }; z-index:99999; font-family:system-ui, sans-serif;">
  <a href="https://glowmodels.com" target="_blank" rel="noopener" style="display:flex; align-items:center; gap:8px; padding:10px 16px; background:#0f172a; border:1px solid #ec4899; border-radius:30px; box-shadow:0 8px 24px rgba(236,72,153,0.3); color:#fff; text-decoration:none; font-size:12px; font-weight:700;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <span>DMCA Protected · GLOW</span>
  </a>
</div>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="floating-icons" className="py-12 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Interactive Tool · Social & Protection Overlay</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Floating Protection & Social Icons
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Create an elegant floating drawer for your bio page, Linktree, or website. Combines verified legal DMCA protection with direct links to your fan accounts.
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Widget Configuration
            </h3>

            {/* Position Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Screen Corner Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bottom-right', label: 'Bottom Right (Default)' },
                  { id: 'bottom-left', label: 'Bottom Left' },
                  { id: 'top-right', label: 'Top Right' },
                  { id: 'top-left', label: 'Top Left' },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setPosition(pos.id as any)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      position === pos.id
                        ? 'bg-violet-600/30 border-violet-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Glow Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Aura Glow Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'violet', label: 'Glow Violet', color: 'bg-violet-600' },
                  { id: 'emerald', label: 'Cyber Emerald', color: 'bg-emerald-600' },
                  { id: 'rose', label: 'Neon Pink', color: 'bg-rose-600' },
                  { id: 'cyber', label: 'Deep Blue', color: 'bg-cyan-600' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setThemeGlow(t.id as any)}
                    className={`p-2 text-xs font-semibold rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      themeGlow === t.id
                        ? 'border-violet-500 bg-slate-800 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                    <span className="text-[11px] truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Item List */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Included Links & Icons
              </label>

              {icons.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    item.enabled
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleIcon(item.id)}
                      className="rounded bg-slate-800 border-slate-700 text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                    <div className="truncate flex-1">
                      <span className="text-xs font-bold text-white block">{item.name}</span>
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => updateIconUrl(item.id, e.target.value)}
                        className="w-full text-[11px] bg-transparent text-slate-400 border-0 focus:outline-none focus:text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Interactive Live Preview & Embed Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Screen Sandbox */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-violet-400" />
                  Live Floating Simulation
                </span>
                <span className="text-xs text-slate-400">
                  Click the floating shield to toggle menu
                </span>
              </div>

              {/* Simulated Browser Window */}
              <div className="h-[280px] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden p-4 flex flex-col justify-between">
                
                {/* Simulated Content in Browser */}
                <div className="space-y-2 opacity-30 pointer-events-none">
                  <div className="h-3 w-32 bg-slate-700 rounded-full" />
                  <div className="h-2 w-48 bg-slate-800 rounded-full" />
                  <div className="h-2 w-40 bg-slate-800 rounded-full" />
                  <div className="h-24 w-full bg-slate-900 rounded-xl border border-slate-800 mt-4" />
                </div>

                {/* Floating Widget Positioned inside container */}
                <div
                  className={`absolute z-20 flex flex-col items-end gap-2 transition-all ${
                    position === 'bottom-right'
                      ? 'bottom-4 right-4'
                      : position === 'bottom-left'
                      ? 'bottom-4 left-4 items-start'
                      : position === 'top-right'
                      ? 'top-4 right-4'
                      : 'top-4 left-4 items-start'
                  }`}
                >
                  {/* Expanded Menu Items */}
                  {isExpanded && (
                    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-2 shadow-2xl space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150 min-w-[170px]">
                      {activeIcons.map((i) => (
                        <div
                          key={i.id}
                          className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-xs font-medium text-slate-200 transition-colors"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: i.color }}
                          />
                          <span className="truncate">{i.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Main Trigger Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-4 py-2.5 rounded-full bg-slate-900 border border-violet-500/80 text-white font-bold text-xs shadow-xl shadow-violet-600/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white">
                      <Shield className="w-3 h-3" />
                    </div>
                    <span>DMCA Protected</span>
                  </button>
                </div>

              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center">
                This widget floats seamlessly over your site, Linktree bio, or chat page.
              </p>
            </div>

            {/* Code Export */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  Embed Snippet (HTML / Bio links)
                </label>
                <button
                  onClick={handleCopyCode}
                  className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Snippet!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {embedScript}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
