import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Platform } from '../types';
import {
  Zap,
  CheckCircle,
  Loader2,
  X,
  ExternalLink,
  ShieldCheck,
  Radio,
  Terminal,
  ArrowRight,
} from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  platform: Platform;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  roomName,
  platform,
}) => {
  const { startTrial, setActiveTab, language } = useApp();
  const [step, setStep] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setTerminalLogs([]);
      setTimeLeft(900);
      return;
    }

    // Step progression
    const timer1 = setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[00:01] ⚡ Conectare la socket-ul camerei ${platform}/${roomName}...`,
      ]);
      setStep(1);
    }, 600);

    const timer2 = setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[00:03] 🌐 Alocare 50 IP-uri rezidențiale unice din clusterul Frankfurt & US-East...`,
      ]);
      setStep(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[00:05] 🛡️ Generare amprente de browser Chrome (WebGL, Canvas, AudioContext)...`,
      ]);
      setStep(3);
    }, 2400);

    const timer4 = setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[00:07] ✅ Succes: 50 privitori anonimi conectați la fluxul live!`,
      ]);
      setStep(4);
      startTrial(roomName, platform);
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, roomName, platform, startTrial]);

  // Countdown timer for running trial
  useEffect(() => {
    if (step < 4) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const cleanRoom = roomName.replace(/https?:\/\/(www\.)?(chaturbate|stripchat|bongacams|cam4|livejasmin)\.com\//gi, '').replace(/\//g, '').trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0d111a] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                {language === 'ro' ? 'Activare Test Gratuit' : 'Free Trial Activation'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {platform} • <span className="text-cyan-400 font-mono font-medium">{cleanRoom}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {step < 4 ? (
            <div className="space-y-4 text-center py-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin opacity-40" />
                <Radio className="w-7 h-7 text-cyan-400 absolute" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {step === 0 && (language === 'ro' ? 'Inițiere conexiune...' : 'Initializing connection...')}
                  {step === 1 && (language === 'ro' ? 'Interogare cameră...' : 'Querying target stream...')}
                  {step === 2 && (language === 'ro' ? 'Alocare proxy-uri rezidențiale...' : 'Allocating residential proxies...')}
                  {step === 3 && (language === 'ro' ? 'Pornire instanțe Chrome...' : 'Starting Chrome browser sessions...')}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ro'
                    ? 'Sistemul pregătește cele 50 de conexiuni securizate'
                    : 'System is preparing 50 authentic secured connections'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 ease-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>

              {/* Terminal Logs Box */}
              <div className="text-left p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-cyan-300/90 space-y-1 max-h-32 overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-1">
                    <span className="text-slate-500 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Success Banner */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">
                    {language === 'ro' ? 'Trafic de Test Activ în Cameră!' : 'Trial Traffic Active in Stream!'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {language === 'ro'
                      ? '50 de privitori rezidențiali sunt conectați acum în camera ta. Deschide pagina de live pentru a verifica numărătorul.'
                      : '50 residential viewers are now watching your live room. Check your broadcast dashboard to verify.'}
                  </p>
                </div>
              </div>

              {/* Active Trial Stats Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {language === 'ro' ? 'Timp Rămas Test' : 'Trial Time Left'}
                  </div>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
                    {formattedTime}
                  </div>
                  <div className="text-[10px] text-slate-500">15 min sesiune</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {language === 'ro' ? 'Privitori Livrați' : 'Delivered Viewers'}
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-1">
                    50 <span className="text-xs text-emerald-400 font-normal">/ 50</span>
                  </div>
                  <div className="text-[10px] text-slate-500">IP-uri Rezidențiale</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'ro' ? 'Cameră Țintă:' : 'Target Room:'}</span>
                  <a
                    href={`https://${platform.toLowerCase()}.com/${cleanRoom}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{cleanRoom}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'ro' ? 'Securitate Algoritm:' : 'Algorithm Safe:'}</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Protejat
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  id="btn-trial-upgrade"
                  onClick={() => {
                    onClose();
                    setActiveTab('pricing');
                    const el = document.getElementById('pricing-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>
                    {language === 'ro'
                      ? 'Upgradează la 300 - 700 Privitori (Front Page)'
                      : 'Upgrade to 300 - 700 Bots (Front Page)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('dashboard');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <span>{language === 'ro' ? 'Mergi la Panoul de Campanii Active' : 'View in Campaigns Dashboard'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
