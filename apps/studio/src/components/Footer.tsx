import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Heart, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAdmin, language } = useApp();

  return (
    <footer className="bg-[#050507] border-t border-zinc-800/80 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <Zap className="w-4 h-4 text-white fill-white/80" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white uppercase italic">
                GLOW <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-sans">STUDIO</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {language === 'ro'
                ? 'Platformă premium de creștere a audienței, generare de trafic rezidențial real și roboți inteligenți pentru modelele de pe Chaturbate, Stripchat și platforme cam.'
                : 'Next-generation residential traffic network & intelligent bot architecture engineered specifically for live cam performers.'}
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-cyan-400 font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Cluster Servere Online • Uptime 99.98%</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Navigare Rapidă</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setActiveTab('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors"
                >
                  Pachete Trafic & Prețuri
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setActiveTab('inspector');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors"
                >
                  Inspector Camere & Rank
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors"
                >
                  Campanii Active & Comenzi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdmin(true);
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors text-purple-400/90"
                >
                  Panou Administrare (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Suport 24/7 VIP</h4>
            <p className="text-xs text-zinc-400">
              Asistență tehnică dedicată pentru configurarea campaniilor și plăți cripto.
            </p>
            <div className="pt-1">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-purple-900/30 text-purple-300 border border-zinc-800 hover:border-purple-500/40 text-xs font-semibold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: @glowstudio_vip</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Glow Studio. Toate drepturile rezervate. Discreție garantată.
          </div>
          <div className="flex items-center gap-4">
            <span>Termeni & Condiții</span>
            <span>Politica de Confidențialitate</span>
            <span>Garanție Livrare 100%</span>
          </div>
        </div>
      </div>

      {/* Immersive UI Bottom Telemetry Strip */}
      <div className="h-10 bg-black border-t border-zinc-800 flex items-center px-4 sm:px-8 justify-between">
        <div className="flex gap-4">
          <span className="text-[10px] text-zinc-600 font-mono">v2.0.44-STABLE</span>
          <span className="text-[10px] text-zinc-600 font-mono hidden sm:inline">API LATENCY: 24ms</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-mono">All Systems Functional</span>
        </div>
      </div>
    </footer>
  );
};
