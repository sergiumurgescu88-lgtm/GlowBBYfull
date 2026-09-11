import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Cpu,
  Globe2,
  MousePointerClick,
  Sparkles,
  Lock,
  Layers,
  CheckCircle,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { language } = useApp();

  const features = [
    {
      icon: Cpu,
      title: language === 'ro' ? 'Sesiuni Google Chrome Reale' : 'Genuine Chrome Browser Sessions',
      desc:
        language === 'ro'
          ? 'Nu folosim socket-uri simulate sau scripturi Python ușor de detectat. Fiecare privitor rulează într-o instanță Chrome reală pe serverele noastre, cu motor V8 complet și WebGL activ.'
          : 'No lightweight simulated sockets or basic Python scripts. Every viewer is an authentic headless Chrome session rendering DOM and executing JavaScript identical to human visitors.',
    },
    {
      icon: Globe2,
      title: language === 'ro' ? '100% IP-uri Rezidențiale Reale' : '100% Real Residential Proxies',
      desc:
        language === 'ro'
          ? 'Traficul provine din rețele de internet casnice (Comcast, Vodafone, Deutsche Telekom, Orange) și 4G/5G mobile, imposibil de blocat de sistemele Cloudflare sau Chaturbate.'
          : 'Connections originate from authentic home broadband and mobile ISP networks worldwide, ensuring zero datacenter subnet penalties or Cloudflare challenges.',
    },
    {
      icon: MousePointerClick,
      title: language === 'ro' ? 'Comportament Uman Simulat' : 'Human Dwell & Cursor Emulation',
      desc:
        language === 'ro'
          ? 'Roboții simulează mișcări naturale ale cursorului, scroll lent în chat, timpi variabili de vizionare (dwell time) și interacțiuni reale pentru a crește scorul calității camerei.'
          : 'Natural cursor movements, random scrolling pauses, realistic watch session lengths, and room interaction patterns emulate authentic viewer behavior flawlessly.',
    },
    {
      icon: ShieldCheck,
      title: language === 'ro' ? 'Conformitate Algoritm 2026' : '2026 Algorithmic Anti-Ban Shield',
      desc:
        language === 'ro'
          ? 'Algoritmul Chaturbate actual penalizează traficul brusc și fals. Tehnologia Glow Studio oferă o curbă de creștere organică (Organic Ramp) cu 0% risc de penalizare din 2021.'
          : 'Modern cam algorithms penalize sudden unnatural spikes. Our organic ramp algorithms ensure smooth growth curves with a verified 0% ban rate since 2021.',
    },
  ];

  return (
    <section id="features-section" className="py-20 border-b border-zinc-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{language === 'ro' ? 'Tehnologie de Vârf' : 'Next-Gen Architecture'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ro'
              ? 'De Ce Glow Studio Este Diferit de Roboții Ieftini?'
              : 'Why Glow Studio Outperforms Generic Bots'}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400">
            {language === 'ro'
              ? 'Construit de la zero pentru performanță maximă, discreție totală și rezultate palpabile pe prima pagină.'
              : 'Engineered from the ground up for maximum algorithmic authority, total discretion, and verified ranking results.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/50 transition-all backdrop-blur-sm relative overflow-hidden group space-y-3"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-purple-400 group-hover:border-purple-500/40 transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
