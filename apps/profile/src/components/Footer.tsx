import React from 'react';
import { Shield, Sparkles, Lock, MapPin, Heart, Bot, Trophy, DollarSign } from 'lucide-react';

interface FooterProps {
  onSelectTool?: (toolId: string) => void;
  onSelectGuide?: (guide: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onSelectGuide }) => {
  return (
    <footer className="bg-[#060911] text-slate-400 text-xs border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Company Info & Address */}
          <div className="md:col-span-1 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black tracking-wider text-white">GLOW</span>
                  <span className="text-lg font-light tracking-widest text-pink-400">MODELS</span>
                </div>
              </div>
            </a>

            <p className="text-slate-300 text-xs leading-relaxed">
              Transformă-ți personalitatea în independență financiară cu ajutorul Inteligenței Artificiale. Agenție de management propulsată de tehnologie.
            </p>

            <div className="text-slate-300 space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2 text-white font-medium">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Strada Cuza Vodă, Sector 4, București</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>🔒 100% Confidențialitate Garantată</span>
              </div>
            </div>
          </div>

          {/* Column 2: De Ce Glow Models & Tehnologie */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
              Glow Tehnologie
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#why-glow" className="hover:text-white transition-colors">
                  De Ce Glow Models?
                </a>
              </li>
              <li>
                <a href="#glowbby-ai" className="hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-violet-400" />
                  GlowBBY Live AI Demo
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool?.('designer')}
                  className="text-pink-400 font-medium hover:text-pink-300 transition-colors text-left cursor-pointer"
                >
                  GLOW Profile Designer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool?.('badges')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Glow DMCA Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool?.('scanner')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Leak Scanner
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Beneficii Modele */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
              Beneficii Modele
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fortăreață Digitală & NDA Legal</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Transparență Financiară Totală</span>
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Recompense & Premii de Lux</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>Flexibilitate & Fără Burnout</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Aplică */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
              Alătură-te Echipei
            </h4>
            <div className="space-y-3">
              <a
                href="#apply-form"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 transition-all shadow-md shadow-pink-600/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Vreau să Strălucesc ✨</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Strada Cuza Vodă, Sector 4, București
              </p>
              <p className="text-[11px] text-slate-500">
                24/7 Suport Dedicat · 10+ Ani Experiență
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Glow Models Studio. Toate drepturile rezervate.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="text-emerald-400 font-medium">🔒 100% Confidențialitate Garantată</span>
            <span>·</span>
            <span>📍 Sector 4, București</span>
            <span>·</span>
            <span>Geoblocare România Activă</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
