import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Platform } from '../types';
import {
  Zap,
  Play,
  ShieldCheck,
  Flame,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenTrialModal: (room: string, platform: Platform) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTrialModal }) => {
  const { language, setActiveTab, selectedPlatform, setSelectedPlatform } = useApp();
  const [inputRoom, setInputRoom] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const platforms: Platform[] = ['Chaturbate', 'Stripchat', 'BongaCams', 'Cam4', 'LiveJasmin'];

  const handleLaunchTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoom.trim()) {
      setErrorMsg(language === 'ro' ? 'Te rugăm să introduci link-ul sau numele camerei!' : 'Please enter your room URL or username!');
      return;
    }
    setErrorMsg('');
    onOpenTrialModal(inputRoom.trim(), selectedPlatform);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-zinc-800/50">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-purple-600/15 via-cyan-500/10 to-transparent blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-purple-900/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>
              {language === 'ro'
                ? 'Platformă #1 de Trafic Rezidențial & Roboți Reali'
                : '#1 Residential Traffic & Authentic Bots Network'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            {language === 'ro' ? (
              <>
                Domină Prima Pagină pe{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  Chaturbate
                </span>{' '}
                și Cam Platforms
              </>
            ) : (
              <>
                Dominate the Front Page on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  Chaturbate
                </span>{' '}
                & Cam Sites
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {language === 'ro'
              ? 'Generează privitori reali folosind sesiuni autentice de Google Chrome și IP-uri rezidențiale unice. Fără roboți ieftini de datacenter, fără riscuri. Compatibil 100% cu algoritmul 2026.'
              : 'Generate real room traffic utilizing genuine headless Chrome sessions and residential IPs. No cheap datacenter bots, no shadowbans. 100% compliant with the 2026 platform algorithms.'}
          </p>

          {/* Platform Selector Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedPlatform === p
                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Interactive Free Trial Bar */}
          <div className="pt-3 max-w-xl mx-auto">
            <form
              onSubmit={handleLaunchTrial}
              className="p-2 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputRoom}
                  onChange={(e) => {
                    setInputRoom(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder={
                    language === 'ro'
                      ? `Ex: ${selectedPlatform.toLowerCase()}.com/amber_glow sau amber_glow`
                      : `e.g. ${selectedPlatform.toLowerCase()}.com/room_name or username`
                  }
                  className="w-full h-12 px-4 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                id="btn-hero-launch-trial"
                className="h-12 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/25 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>
                  {language === 'ro' ? 'Lansează Test (50 Privitori)' : 'Launch Free Trial (50 Bots)'}
                </span>
              </button>
            </form>

            {errorMsg && (
              <p className="text-xs text-rose-400 text-left mt-2 pl-2">{errorMsg}</p>
            )}

            <div className="flex items-center justify-between px-2 pt-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ro' ? '15 Min Gratuit (Fără Card)' : '15 Mins Free (No Card)'}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                {language === 'ro' ? 'Proxy Rezidențial Reale' : '100% Real Residential IPs'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('pricing');
                  const el = document.getElementById('pricing-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-0.5 font-medium"
              >
                {language === 'ro' ? 'Vezi pachete complete' : 'View full plans'}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {language === 'ro' ? 'Sesiuni Chrome' : 'Chrome Sessions'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">48,250+</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                {language === 'ro' ? 'Active simultan în cluster' : 'Active concurrent streams'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/40 transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {language === 'ro' ? 'IP-uri Rezidențiale' : 'Residential IPs'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">100% Reale</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                {language === 'ro' ? 'Zero detecție datacenter' : 'Zero datacenter flag rate'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {language === 'ro' ? 'Creștere Medie' : 'Rank Velocity'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">+32 Poziții</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                {language === 'ro' ? 'Urcare în categoria live' : 'Average category jump'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {language === 'ro' ? 'Rată de Ban' : 'Ban Incident'}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono">0.00%</div>
              <p className="text-[11px] text-zinc-500 mt-1">
                {language === 'ro' ? 'Din 2021 până în prezent' : 'Zero penalties since 2021'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
