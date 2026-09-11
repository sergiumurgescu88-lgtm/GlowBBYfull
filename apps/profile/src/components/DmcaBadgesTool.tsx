import React, { useState } from 'react';
import { Shield, Copy, Check, Download, Sparkles, Code2, Eye, Lock, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DmcaBadgesTool: React.FC = () => {
  const [badgeStyle, setBadgeStyle] = useState<'shield' | 'pill' | 'metallic' | 'compact' | 'cyber'>('shield');
  const [badgeColor, setBadgeColor] = useState<'violet' | 'emerald' | 'amber' | 'ruby' | 'cyan' | 'slate'>('violet');
  const [creatorId, setCreatorId] = useState('GLOW-84920');
  const [protectText, setProtectText] = useState('PROTECTED BY GLOW MODELS');
  const [showId, setShowId] = useState(true);
  const [copiedType, setCopiedType] = useState<'html' | 'markdown' | 'bbcode' | null>(null);

  const colors = {
    violet: {
      bg: 'from-violet-600 to-indigo-700',
      border: 'border-violet-400/50',
      glow: 'shadow-violet-600/30',
      accent: '#8b5cf6',
      text: 'text-violet-300',
    },
    emerald: {
      bg: 'from-emerald-600 to-teal-700',
      border: 'border-emerald-400/50',
      glow: 'shadow-emerald-600/30',
      accent: '#10b981',
      text: 'text-emerald-300',
    },
    amber: {
      bg: 'from-amber-500 to-orange-600',
      border: 'border-amber-400/50',
      glow: 'shadow-amber-500/30',
      accent: '#f59e0b',
      text: 'text-amber-300',
    },
    ruby: {
      bg: 'from-rose-600 to-pink-700',
      border: 'border-rose-400/50',
      glow: 'shadow-rose-600/30',
      accent: '#f43f5e',
      text: 'text-rose-300',
    },
    cyan: {
      bg: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-400/50',
      glow: 'shadow-cyan-500/30',
      accent: '#06b6d4',
      text: 'text-cyan-300',
    },
    slate: {
      bg: 'from-slate-800 to-slate-900',
      border: 'border-slate-600/50',
      glow: 'shadow-slate-700/30',
      accent: '#94a3b8',
      text: 'text-slate-300',
    },
  };

  const currentTheme = colors[badgeColor];

  const verificationUrl = `https://glowmodels.com/protection-status/${creatorId}`;
  const badgeImageUrl = `https://cdn.glowmodels.com/badges/v2/${badgeStyle}-${badgeColor}-${creatorId}.svg`;

  const htmlEmbed = `<a href="${verificationUrl}" title="Protected by GLOW Models System" target="_blank" rel="noopener noreferrer">
  <img src="${badgeImageUrl}" alt="GLOW Models Official Protected Badge" style="height:38px; width:auto; border:0;" />
</a>`;

  const markdownEmbed = `[![GLOW Protected](${badgeImageUrl})](${verificationUrl})`;

  const bbCodeEmbed = `[url=${verificationUrl}][img]${badgeImageUrl}[/img][/url]`;

  const handleCopy = (text: string, type: 'html' | 'markdown' | 'bbcode') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadBadge = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Create dynamic SVG badge download
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="46" viewBox="0 0 260 46" fill="none">
  <rect width="260" height="46" rx="${badgeStyle === 'pill' ? 23 : 10}" fill="#0F172A" stroke="${currentTheme.accent}" stroke-width="1.5"/>
  <rect x="3" y="3" width="40" height="40" rx="${badgeStyle === 'pill' ? 20 : 7}" fill="${currentTheme.accent}"/>
  <path d="M23 13L15 17V24C15 29.5 18.4 34.6 23 36C27.6 34.6 31 29.5 31 24V17L23 13Z" fill="white"/>
  <path d="M21 24.5L19 22.5L17.5 24L21 27.5L28.5 20L27 18.5L21 24.5Z" fill="${currentTheme.accent}"/>
  <text x="52" y="22" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="800" letter-spacing="0.5">${protectText}</text>
  <text x="52" y="35" fill="#94A3B8" font-family="monospace" font-size="10">OFFICIAL ID: ${creatorId} · GLOWMODELS.COM</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glow-dmca-badge-${creatorId}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="badges" className="py-12 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-violet-400" />
            <span>Interactive Tool · 100% Free Deterrence Badges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Official DMCA Protection Badges
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Deter content scrapers, tube bots, and forum screen-recorders before they leak your media. Displaying an authentic Glow Models verified badge cuts unauthorized redistributions by up to 74%.
          </p>
        </div>

        {/* Two Column Layout: Designer on Left, Preview & Export on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Customize Protection Badge
            </h3>

            {/* Style Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Badge Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'shield', label: 'Shield Emblem' },
                  { id: 'pill', label: 'Pill Rounded' },
                  { id: 'metallic', label: 'Hologram Tech' },
                  { id: 'compact', label: 'Compact Mini' },
                  { id: 'cyber', label: 'Dark Cyber' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBadgeStyle(s.id as any)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      badgeStyle === s.id
                        ? 'bg-violet-600/30 border-violet-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Theme Color Accent
              </label>
              <div className="flex flex-wrap gap-2.5">
                {(['violet', 'emerald', 'amber', 'ruby', 'cyan', 'slate'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setBadgeColor(c)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer capitalize text-xs font-bold ${
                      badgeColor === c ? 'ring-2 ring-white scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      background: colors[c].accent,
                    }}
                    title={c}
                  >
                    {badgeColor === c && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Texts & Broadcaster ID */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Deterrence Headline Text
                </label>
                <input
                  type="text"
                  value={protectText}
                  onChange={(e) => setProtectText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 font-semibold"
                  placeholder="PROTECTED BY GLOW MODELS"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Protection Verification ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={creatorId}
                    onChange={(e) => setCreatorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-violet-300 focus:outline-none focus:border-violet-500"
                    placeholder="RL-84920"
                  />
                  <button
                    onClick={() => setCreatorId(`GLOW-${Math.floor(10000 + Math.random() * 90000)}`)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-200 transition-colors cursor-pointer shrink-0"
                  >
                    Regenerate ID
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="showIdToggle"
                  checked={showId}
                  onChange={(e) => setShowId(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-violet-600 focus:ring-violet-500"
                />
                <label htmlFor="showIdToggle" className="text-xs text-slate-300 cursor-pointer">
                  Display verified verification ID number and live public lookup link
                </label>
              </div>
            </div>

          </div>

          {/* Preview & Code Export Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Interactive Badge Visualizer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-violet-400" />
                  Live Badge Preview
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Active Verification
                </span>
              </div>

              {/* Rendered Badge Container */}
              <div className="p-8 bg-slate-950/90 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-violet-500/5 to-transparent pointer-events-none" />
                
                {/* Visual Badge Simulation */}
                <div
                  className={`inline-flex items-center gap-3.5 px-4 py-2.5 transition-all shadow-lg hover:scale-105 cursor-pointer ${currentTheme.glow} ${
                    badgeStyle === 'pill' ? 'rounded-full' : badgeStyle === 'compact' ? 'rounded-lg py-1.5 px-3' : 'rounded-xl'
                  } bg-slate-900 border ${currentTheme.border}`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-md"
                    style={{ backgroundColor: currentTheme.accent }}
                  >
                    <Shield className="w-4 h-4" />
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-extrabold tracking-wider text-white uppercase flex items-center gap-1.5">
                      <span>{protectText}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    {showId && (
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <span>ID: <strong className="text-slate-300">{creatorId}</strong></span>
                        <span>·</span>
                        <span className="text-pink-400 underline">verify at glowmodels.com</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-4 text-center">
                  Clicking this badge links directly to your public verified DMCA registry page.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadBadge}
                  className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Badge (SVG)</span>
                </button>
                <a
                  href={verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Registry Link</span>
                </a>
              </div>
            </div>

            {/* Embed Code Snippets */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  Embed Codes
                </label>
              </div>

              {/* HTML Embed for Websites, OnlyFans, Cam bios */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">HTML (Websites, Chaturbate, Linktree):</span>
                  <button
                    onClick={() => handleCopy(htmlEmbed, 'html')}
                    className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'html' ? 'Copied HTML!' : 'Copy HTML'}</span>
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap">
                  {htmlEmbed}
                </pre>
              </div>

              {/* BBCode for Forums & MFC */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">BBCode (MyFreeCams & Forum Signatures):</span>
                  <button
                    onClick={() => handleCopy(bbCodeEmbed, 'bbcode')}
                    className="text-slate-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'bbcode' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'bbcode' ? 'Copied BBCode!' : 'Copy BBCode'}</span>
                  </button>
                </div>
                <pre className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 overflow-x-auto">
                  {bbCodeEmbed}
                </pre>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
