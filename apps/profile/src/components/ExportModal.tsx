import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X, Copy, Check, Download, ExternalLink, Code2, Sparkles, Shield, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, profile }) => {
  const [copiedType, setCopiedType] = useState<'html' | 'bbcode' | 'url' | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  // Generated simulated hosted image URL for the broadcaster
  const simulatedImageUrl = `https://cdn.glowmodels.com/profiles/${encodeURIComponent(
    profile.stageName.toLowerCase().replace(/\s+/g, '-')
  )}-profile.png`;

  const htmlCode = `<div align="center">
  <!-- GLOW Models Cam Profile Bio for ${profile.stageName} -->
  <a href="https://glowmodels.com" target="_blank" rel="noopener noreferrer">
    <img src="${simulatedImageUrl}" alt="${profile.stageName} Official Bio" style="max-width:100%; height:auto; border-radius:${profile.borderRadius}px; box-shadow:0 10px 25px rgba(0,0,0,0.5);" />
  </a>
  <br />
  <small style="color:#ec4899; font-size:10px;">Protected by GLOW Models Automated Shield</small>
</div>`;

  const bbCode = `[center]
[url=https://glowmodels.com]
[img]${simulatedImageUrl}[/img]
[/url]
[/center]`;

  const handleCopy = (text: string, type: 'html' | 'bbcode' | 'url') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Download high-resolution rendered graphic
  const handleDownloadImage = () => {
    setIsDownloading(true);

    try {
      // Trigger celebratory confetti
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });

      // We create a canvas representing the design to trigger a real PNG download
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1100;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, 800, 1100);
        grad.addColorStop(0, profile.customBgColor || '#1e1035');
        grad.addColorStop(0.5, '#0f172a');
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 800, 1100);

        // Header card
        ctx.fillStyle = `rgba(15, 23, 42, ${profile.cardOpacity})`;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(30, 30, 740, 150, 16);
        ctx.fill();
        ctx.stroke();

        // Stage Name Text
        ctx.fillStyle = profile.titleColor;
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(profile.stageName || 'Cam Broadcaster', 160, 95);

        // Tagline
        ctx.fillStyle = profile.textColor;
        ctx.font = '16px sans-serif';
        ctx.fillText(profile.tagline || 'Welcome to my room!', 160, 130);

        // Simulated Avatar placeholder circle
        ctx.fillStyle = profile.accentColor;
        ctx.beginPath();
        ctx.arc(90, 105, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(profile.stageName.charAt(0) || 'L', 80, 115);

        // About me block
        ctx.fillStyle = `rgba(15, 23, 42, ${profile.cardOpacity})`;
        ctx.beginPath();
        ctx.roundRect(30, 200, 740, 170, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = profile.titleColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('About Me', 50, 240);

        ctx.fillStyle = profile.textColor;
        ctx.font = '15px sans-serif';
        const words = profile.aboutMeText.split(' ');
        let line = '';
        let y = 275;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 680 && n > 0) {
            ctx.fillText(line, 50, y);
            line = words[n] + ' ';
            y += 24;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 50, y);

        // Tip Menu Block
        ctx.fillStyle = `rgba(15, 23, 42, ${profile.cardOpacity})`;
        ctx.beginPath();
        ctx.roundRect(30, 390, 740, 260, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = profile.titleColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('Tip Menu', 50, 430);

        profile.tipItems.slice(0, 5).forEach((item, idx) => {
          const rowY = 475 + idx * 38;
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          ctx.beginPath();
          ctx.roundRect(50, rowY - 22, 700, 32, 6);
          ctx.fill();

          ctx.fillStyle = profile.textColor;
          ctx.font = '14px sans-serif';
          ctx.fillText(item.description, 65, rowY);

          ctx.fillStyle = profile.titleColor;
          ctx.font = 'bold 14px sans-serif';
          ctx.fillText(`${item.tokens} tokens`, 660, rowY);
        });

        // Rules block
        ctx.fillStyle = `rgba(15, 23, 42, ${profile.cardOpacity})`;
        ctx.beginPath();
        ctx.roundRect(30, 670, 740, 220, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = profile.titleColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('Room Rules', 50, 710);

        profile.rules.slice(0, 4).forEach((r, idx) => {
          ctx.fillStyle = profile.textColor;
          ctx.font = '14px sans-serif';
          ctx.fillText(`•  ${r.text}`, 50, 750 + idx * 30);
        });

        // Footer DMCA badge
        ctx.fillStyle = 'rgba(10, 15, 30, 0.9)';
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.beginPath();
        ctx.roundRect(30, 910, 740, 60, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('DMCA PROTECTED · glowmodels.com', 50, 946);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText('Content theft is automatically detected and removed', 380, 946);

        // Export as download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${profile.stageName.toLowerCase().replace(/\s+/g, '-')}-cam-profile.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Canvas export error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Profile Ready to Export</h3>
              <p className="text-xs text-slate-400">Embed directly into Chaturbate, MFC, Stripchat, or Bongacams</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Quick Download Button Card */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-emerald-300 mb-0.5">
                Download High-Resolution PNG Graphic
              </h4>
              <p className="text-xs text-slate-300">
                Ready to upload to your profile image hosting or cam bio media.
              </p>
            </div>
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating...' : 'Download Image (PNG)'}</span>
            </button>
          </div>

          {/* HTML Embed Code for Chaturbate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                HTML Code (For Chaturbate & Stripchat "About Me")
              </label>
              <button
                onClick={() => handleCopy(htmlCode, 'html')}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'html' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {htmlCode}
              </pre>
            </div>
          </div>

          {/* BBCode for Forums & MFC */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                BBCode (For MyFreeCams & Forum Signatures)
              </label>
              <button
                onClick={() => handleCopy(bbCode, 'bbcode')}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'bbcode' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy BBCode</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 overflow-x-auto">
              {bbCode}
            </pre>
          </div>

          {/* Platform Setup Instructions */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-violet-400" />
              How to Add to Chaturbate
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Log into your Chaturbate broadcaster account.</li>
              <li>Go to <strong className="text-white">Bio / About Me</strong> in your profile settings.</li>
              <li>Paste the copied HTML code directly into the box.</li>
              <li>Save changes — your new graphic bio is live for all fans!</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
