import React, { useState } from 'react';
import { ShieldAlert, Search, Zap, UserCheck, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface LeakScannerProps {
  onOpenScannerWithQuery: (query: string) => void;
}

export const LeakScanner: React.FC<LeakScannerProps> = ({ onOpenScannerWithQuery }) => {
  const [handleInput, setHandleInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenScannerWithQuery(handleInput.trim() || 'lunastarlight');
  };

  return (
    <section id="leak-scanner" className="py-20 bg-gradient-to-b from-[#090D16] via-[#111827] to-[#090D16] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Red ambient warning glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-rose-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Column: Stat callout & text */}
            <div className="flex-1 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-5">
                <ShieldAlert className="w-4 h-4" />
                <span>Free Leak Scanner</span>
              </div>

              <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-rose-500 tracking-tight">
                  89%
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-200">
                  of creators have leaks
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Your Content Could Be Everywhere
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                While you're reading this, bots could be spreading your content across 100k+ piracy sites. Don't guess. Know for sure.
              </p>

              {/* 4 Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Instant results</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <UserCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>100% anonymous</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Completely free</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Clock className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Takes only 2 minutes</span>
                </div>
              </div>

            </div>

            {/* Right Column: Search Box CTA card */}
            <div className="w-full lg:w-[380px] bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h4 className="text-base font-bold text-white mb-1">
                Scan Your Creator Handle
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Enter your cam username or handle to inspect search engines, tube sites & leak forums:
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    placeholder="e.g. LunaStar or Chaturbate username"
                    className="w-full pl-9.5 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Start Free Scan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-3.5 text-center">
                <span className="text-[11px] text-slate-500">
                  🔒 No registration needed · Strictly confidential
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
