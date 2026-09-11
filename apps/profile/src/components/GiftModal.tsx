import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose, onClaim }) => {
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
    setClaimed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Gift className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Special Creator Gift</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-bold text-white">
            1 Month Free DMCA Monitoring
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            As a gift to our cam broadcasters, claim 30 days of proactive piracy takedowns and high-priority search engine de-indexing on us!
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unlimited automated DMCA takedown notices</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google, Bing, & Tube mirror removal</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official verified deterrence shield badges</span>
            </div>
          </div>

          {claimed ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded-xl font-medium">
              🎉 Gift applied! Your account is unlocked for free priority scans and profile hosting.
            </div>
          ) : (
            <button
              onClick={handleClaim}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Claim Your Free Creator Gift Now
            </button>
          )}
        </div>

        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
