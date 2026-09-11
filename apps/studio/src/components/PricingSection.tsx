import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackagePlan, DurationTier, TrafficType } from '../types';
import { DURATION_OPTIONS } from '../data/mockData';
import {
  Check,
  Zap,
  Flame,
  ShieldCheck,
  Sparkles,
  Bot,
  Users,
  Eye,
  ArrowRight,
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PackagePlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const {
    packages,
    selectedDuration,
    setSelectedDuration,
    formatPrice,
    language,
    selectedPlatform,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<'all' | TrafficType>('all');

  const filteredPackages = packages.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  return (
    <section id="pricing-section" className="py-20 border-b border-zinc-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider font-mono uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>{language === 'ro' ? 'Pachete & Prețuri Transparente' : 'Transparent Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ro' ? (
              <>
                Alege Pachetele de Creștere pentru{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {selectedPlatform}
                </span>
              </>
            ) : (
              <>
                Select Growth Plans for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {selectedPlatform}
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            {language === 'ro'
              ? 'Toate pachetele includ conexiuni prin browsere Chrome reale, IP-uri rezidențiale de mare viteză și protecție 100% anti-detecție.'
              : 'All plans include authentic Chrome browser sessions, high-speed residential proxies, and 100% algorithm safety.'}
          </p>

          {/* Duration Selector Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 max-w-2xl mx-auto backdrop-blur-sm">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedDuration(opt.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDuration === opt.key
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-900/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-purple-500/20 text-purple-200 border-purple-500/40'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              {language === 'ro' ? 'Toate Categoriile' : 'All Categories'}
            </button>
            <button
              onClick={() => setCategoryFilter('anonymous')}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                categoryFilter === 'anonymous'
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Eye className="w-3 h-3 text-cyan-400" />
              {language === 'ro' ? 'Trafic Anonim' : 'Anonymous Traffic'}
            </button>
            <button
              onClick={() => setCategoryFilter('authenticated')}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                categoryFilter === 'authenticated'
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/40'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Users className="w-3 h-3 text-purple-400" />
              {language === 'ro' ? 'Conturi Autentificate' : 'Logged-in Accounts'}
            </button>
            <button
              onClick={() => setCategoryFilter('ai_chat')}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                categoryFilter === 'ai_chat'
                  ? 'bg-pink-500/15 text-pink-300 border-pink-500/40'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Bot className="w-3 h-3 text-pink-400" />
              {language === 'ro' ? 'Roboți Chat AI' : 'AI Chat Bots'}
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((plan) => {
            const price = plan.pricing[selectedDuration] || plan.pricing['3hours'];
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                id={`card-plan-${plan.id}`}
                className={`relative flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 backdrop-blur-sm group ${
                  isPopular
                    ? 'bg-gradient-to-b from-zinc-900/90 to-[#0c0d12] border border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.15)] hover:border-purple-400'
                    : 'bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 hover:bg-zinc-900/60'
                }`}
              >
                {/* Radial accent blur for immersive depth */}
                <div className="absolute -right-4 -top-4 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

                {/* Popular or Custom Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-[10px] font-black tracking-wider text-white uppercase font-mono shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Category Pill & Viewer Counter */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md font-mono ${
                        plan.category === 'authenticated'
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : plan.category === 'ai_chat'
                          ? 'bg-pink-500/15 text-pink-300 border border-pink-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {plan.category === 'authenticated'
                        ? 'Conturi Reale'
                        : plan.category === 'ai_chat'
                        ? 'AI Chat & Tip'
                        : 'Anonim Rezidențial'}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/60">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>{plan.viewers} Privitori</span>
                    </div>
                  </div>

                  {/* Plan Name & Description */}
                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{plan.description}</p>

                  {/* Price Tag */}
                  <div className="my-5 p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                        {formatPrice(price)}
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        {language === 'ro' ? 'Plată unică fără abonament ascuns' : 'One-time, no hidden recurring fees'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-cyan-400 font-mono font-bold">
                        {DURATION_OPTIONS.find((d) => d.key === selectedDuration)?.label.split(' ')[0]}{' '}
                        {DURATION_OPTIONS.find((d) => d.key === selectedDuration)?.label.split(' ')[1]}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-1 border-t border-zinc-800/80">
                    <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      {language === 'ro' ? 'Ce primești inclus:' : 'Included features:'}
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="pt-6 mt-4">
                  <button
                    id={`btn-select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 hover:scale-[1.01]'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${isPopular ? 'fill-white' : 'fill-black'}`} />
                    <span>{language === 'ro' ? 'Activează Trafic Acum' : 'Start Campaign Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
