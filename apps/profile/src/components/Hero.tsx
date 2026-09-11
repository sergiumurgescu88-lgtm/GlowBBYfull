import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Lock, Bot, Palette, Award, Users, Headphones } from 'lucide-react';

interface HeroProps {
  onStartDesigning: () => void;
  onOpenScanner?: () => void;
  onApplyClick?: () => void;
  onOpenAiDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartDesigning,
  onOpenScanner,
  onApplyClick,
  onOpenAiDemo,
}) => {
  const stats = [
    {
      value: '10+',
      label: 'Ani de Activitate',
      desc: 'Experiență solidă în industria de streaming & management',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      value: '200+',
      label: 'Colaborări Reușite',
      desc: 'Modele care au atins independența financiară totală',
      icon: Users,
      color: 'text-pink-400',
    },
    {
      value: '24/7',
      label: 'Suport Dedicat',
      desc: 'Echipa tehnică, psihologică și management mereu alături',
      icon: Headphones,
      color: 'text-violet-400',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0E1527] to-[#0B0F19] pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80">
      {/* Background glow subtle effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-r from-violet-600/20 via-pink-600/20 to-amber-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* 100% Confidentiality Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>🔒 100% Confidențialitate Garantată</span>
        </div>

        {/* Main Title: GLOW MODELS */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            GLOW
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-amber-300">
            MODELS
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Transformă-ți personalitatea în independență financiară cu ajutorul{' '}
          <span className="text-violet-300 font-semibold underline decoration-violet-500/50 underline-offset-4">
            Inteligenței Artificiale
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            id="hero-apply-glow"
            onClick={onApplyClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 hover:from-pink-500 hover:via-fuchsia-500 hover:to-violet-500 active:scale-[0.98] shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span>Vreau să Strălucesc ✨</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            id="hero-start-designing"
            onClick={onStartDesigning}
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-violet-500/50 active:scale-[0.98] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Palette className="w-5 h-5 text-violet-400" />
            <span>GLOW Profile Designer</span>
          </button>

          {onOpenAiDemo && (
            <button
              id="hero-ai-demo"
              onClick={onOpenAiDemo}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-fuchsia-500/40 active:scale-[0.98] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Bot className="w-5 h-5 text-fuchsia-400" />
              <span>GlowBBY Live Demo</span>
            </button>
          )}
        </div>

        {/* 3 Key Stats requested by user */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto pt-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className={`text-4xl sm:text-5xl font-black ${stat.color} tracking-tight`}>
                    {stat.value}
                  </div>
                </div>
                <div className="text-base font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{stat.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
