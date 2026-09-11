import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onStartDesigning: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartDesigning }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B0F19] to-[#080C14] text-white border-b border-slate-800 text-center relative overflow-hidden">
      {/* Subtle violet blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>No credit card required · 100% Free forever</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5">
          Ready to stand out?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Design a profile that turns viewers into fans - free, in minutes.
        </p>

        <button
          onClick={onStartDesigning}
          className="px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-600/30 active:scale-98 transition-all inline-flex items-center gap-2.5 cursor-pointer"
        >
          <span>Start Designing Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
