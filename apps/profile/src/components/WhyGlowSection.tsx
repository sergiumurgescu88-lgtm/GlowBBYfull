import React from 'react';
import { ShieldCheck, Bot, TrendingUp, Trophy, DollarSign, HeartHandshake, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhyGlowSectionProps {
  onApplyClick?: () => void;
}

export const WhyGlowSection: React.FC<WhyGlowSectionProps> = ({ onApplyClick }) => {
  const pillars = [
    {
      id: 'fortareata',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      badge: 'Securitate Maximă',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      title: 'Fortăreață Digitală',
      description:
        'Geoblocare totală (inclusiv România), NDA legal strict și protecție avansată anti-screenshot. Identitatea ta reală rămâne 100% a ta. Zero risc de a fi recunoscută.',
      details: ['Geoblocare IP România & rețele selectate', 'Acord legal NDA semnat la colaborare', 'Sisteme automate anti-leak & DMCA takedown'],
    },
    {
      id: 'ai',
      icon: Bot,
      iconColor: 'text-violet-400',
      badge: 'Tehnologie Propulsivă',
      badgeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      title: 'GlowBBY AI Intelligence',
      description:
        'AI-ul nostru gestionează 80% din chat-uri, adaptându-se psihologic la fiecare fan. Tu creezi conținut, AI-ul vinde. Câștigi bani chiar și când dormi. Zero burnout.',
      details: ['Răspunsuri psihologice instant în limba engleză', 'Monetizare automată a fiecărui fan & tips', 'Tu doar transmiți live, fără epuizare pe mesaje'],
    },
    {
      id: 'branding',
      icon: TrendingUp,
      iconColor: 'text-sky-400',
      badge: 'Trafic Garantat',
      badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      title: 'Branding & Creștere Explozivă',
      description:
        'Nu lăsăm nimic la întâmplare. Optimizăm algoritmii, hashtag-urile și SEO-ul pe toate platformele (OF, Fansly, IG, TikTok) pentru a-ți aduce trafic constant și fani noi.',
      details: ['Optimizare algoritmică pe cam platforms & OF', 'Echipa dedicată de social media & TikTok/IG', 'Promovare direcționată către fani plătitori din US/EU'],
    },
    {
      id: 'premii',
      icon: Trophy,
      iconColor: 'text-amber-400',
      badge: 'Recompense Reale',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      title: 'Recompense & Premii de Lux',
      description:
        'La fiecare 2 luni, top modelele primesc premii cash substanțiale, gadget-uri premium, vacanțe sau sesiuni foto de lux. Performanța ta este răsplătită imediat și vizibil.',
      details: ['Bonusuri cash la fiecare 60 de zile', 'Ultimele iPhone-uri, MacBook-uri & setup-uri 4K', 'Ședințe foto profesionale & city-break-uri'],
    },
    {
      id: 'transparenta',
      icon: DollarSign,
      iconColor: 'text-teal-400',
      badge: '0 Taxe Ascunse',
      badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      title: 'Transparență Financiară Totală',
      description:
        'Rapoarte clare, la zi, accesibile oricând. Fără taxe ascunse, fără "eroare de sistem". Îți primești banii săptămânal, direct în cont. Știi exact cât câștigi din fiecare fan.',
      details: ['Plăți săptămânale garantate fără întârzieri', 'Panou de raportare transparent cu tokeni & fani', 'Comisioane avantajoase și contracte clare'],
    },
    {
      id: 'flexibilitate',
      icon: HeartHandshake,
      iconColor: 'text-pink-400',
      badge: 'Zero Presiune',
      badgeColor: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
      title: 'Flexibilitate & Fără Burnout',
      description:
        'Programul îl stabilești 100% tu. Nu ai cote obligatorii stresante. Ai acces la suport dedicat pentru sănătatea mintală și o comunitate privată care te susține necondiționat.',
      details: ['Tu decizi când și cât vrei să lucrezi', 'Fără targete obligatorii sau penalizări', 'Consiliere prietenoasă & comunitate exclusivă'],
    },
  ];

  return (
    <section id="why-glow" className="py-20 bg-[#0B0F19] relative overflow-hidden border-b border-slate-800">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Avantajul Glow Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
            De Ce <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300">Glow Models</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Nu suntem un simplu studio. Suntem o agenție de management propulsată de tehnologie, construită special pentru a-ți maximiza veniturile și a-ți proteja viața privată.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-slate-900/70 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  {pillar.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-950/60 via-slate-900/90 to-fuchsia-950/60 border border-violet-700/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              100% Confidențialitate Garantată la Glow Models
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Contracte NDA, blocare geografică automată și independență financiară reală.
            </p>
          </div>
          {onApplyClick && (
            <button
              onClick={onApplyClick}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 shadow-lg shadow-violet-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Vreau să Strălucesc ✨
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
