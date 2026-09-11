import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Platform } from '../types';
import {
  Search,
  Zap,
  TrendingUp,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Radio,
  CheckCircle,
} from 'lucide-react';

interface RankCheckerProps {
  onApplyBoostForRoom: (room: string, suggestedPlanId: string) => void;
}

export const RankChecker: React.FC<RankCheckerProps> = ({ onApplyBoostForRoom }) => {
  const { language, selectedPlatform, setSelectedPlatform, packages } = useApp();
  const [roomInput, setRoomInput] = useState('amber_glow');
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const platforms: Platform[] = ['Chaturbate', 'Stripchat', 'BongaCams', 'Cam4', 'LiveJasmin'];

  const handleInspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomInput.trim()) return;

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setHasResult(true);
    }, 1200);
  };

  const cleanRoom = roomInput.replace(/https?:\/\/(www\.)?(chaturbate|stripchat|bongacams|cam4|livejasmin)\.com\//gi, '').replace(/\//g, '').trim() || 'stream_room';

  return (
    <section id="inspector-section" className="py-20 border-b border-zinc-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span>{language === 'ro' ? 'Instrument Gratuit de Analiză' : 'Free Analysis Tool'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ro' ? (
              <>
                Verifică Poziția & Scorul Algoritmic al Camerei pe{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{selectedPlatform}</span>
              </>
            ) : (
              <>
                Check Your Room Rank & Algorithmic Score on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{selectedPlatform}</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400">
            {language === 'ro'
              ? 'Introdu numele sau URL-ul camerei pentru a estima poziția actuală, numărul de privitori necesar pentru Top 15 Front Page și scorul de vizibilitate.'
              : 'Enter your broadcast username or link to analyze organic ranking, viewers needed for Top 15, and platform score.'}
          </p>

          {/* Search Form */}
          <form onSubmit={handleInspect} className="pt-4 max-w-xl mx-auto">
            <div className="p-2 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm flex flex-col sm:flex-row gap-2 shadow-2xl">
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="Introdu numele camerei (ex: amber_glow)"
                className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
                required
              />
              <button
                type="submit"
                disabled={analyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/30 shrink-0"
              >
                {analyzing ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin text-white" />
                    <span>Se analizează...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analizează Camera</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Card */}
        {hasResult && (
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-sm animate-in fade-in space-y-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{cleanRoom}</h3>
                  <p className="text-xs text-zinc-400">
                    Platformă: <span className="text-cyan-400 font-bold">{selectedPlatform}</span> • Status: Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-semibold">Scor Sănătate Algoritm:</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-sm border border-emerald-500/40">
                  98 / 100
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-xs text-zinc-400 block">Poziție Actuală Estimată:</span>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  #78 <span className="text-xs text-zinc-500 font-normal">în categorie</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Aproximativ Pagina 4</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-xs text-zinc-400 block">Necesar pentru Front Page Top 15:</span>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                  +250 - 300 <span className="text-xs text-zinc-400 font-normal">privitori</span>
                </div>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Urcare garantată cu 60+ poziții
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-xs text-zinc-400 block">Ore de Vârf Recomandate:</span>
                <div className="text-lg font-bold text-white font-mono mt-1">
                  21:00 - 03:00 UTC
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Rată maximă de donatori SUA / Europa</p>
              </div>
            </div>

            {/* Suggested Action */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  Pachet Recomandat de Algoritm
                </div>
                <div className="text-sm font-semibold text-white">
                  Pro Performer (300 Privitori Rezidențiali)
                </div>
              </div>

              <button
                onClick={() => onApplyBoostForRoom(cleanRoom, 'pro-300')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Aplică Boost pentru Această Cameră</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
