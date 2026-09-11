import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Play,
  Pause,
  Clock,
  Radio,
  ExternalLink,
  Plus,
  RotateCw,
  Wallet,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Receipt,
  Eye,
  Layers,
  BarChart3,
} from 'lucide-react';
import { RoomTrafficAnalytics } from './RoomTrafficAnalytics';

interface ClientDashboardProps {
  onOpenWalletModal: () => void;
  onExplorePlans: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  onOpenWalletModal,
  onExplorePlans,
}) => {
  const {
    campaigns,
    orders,
    currentUser,
    updateCampaignStatus,
    boostCampaign,
    formatPrice,
    language,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'campaigns' | 'analytics' | 'orders'>('campaigns');

  const runningCount = campaigns.filter((c) => c.status === 'running').length;
  const totalViewersDelivered = campaigns.reduce(
    (acc, curr) => (curr.status === 'running' ? acc + curr.currentViewers : acc),
    0
  );

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header & Stats Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold uppercase mb-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>{language === 'ro' ? 'Panou Client & Control Campanii' : 'Client Operations Center'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'ro' ? 'Monitorizare & Campanii Active' : 'Live Campaign Monitor'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {language === 'ro'
              ? 'Controlează privitorii în timp real, verifică logurile proxy și istoricul tranzacțiilor.'
              : 'Control your real-time viewer delivery, monitor proxy logs, and manage invoices.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenWalletModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/30 text-xs font-semibold text-white hover:border-purple-400 transition-all shadow-lg"
          >
            <Wallet className="w-4 h-4 text-purple-400" />
            <span>Sold: {formatPrice(currentUser.walletBalance)}</span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">+ Alimentează</span>
          </button>

          <button
            onClick={onExplorePlans}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-purple-900/30"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>{language === 'ro' ? 'Campanie Nouă' : 'New Campaign'}</span>
          </button>
        </div>
      </div>

      {/* KPI Ticker Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Campanii în Rulare</span>
            <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
            {runningCount} <span className="text-xs text-purple-400 font-normal">active</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Privitori Livrați Acum</span>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-2">
            {totalViewersDelivered.toLocaleString()}{' '}
            <span className="text-xs text-zinc-400 font-normal">live streams</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Comenzi Finalizate</span>
            <Receipt className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
            {orders.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Securitate Proxy</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono mt-2">
            100% <span className="text-xs text-zinc-400 font-normal">rezidențial</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800/80 pb-4 mb-6">
        <button
          id="client-tab-campaigns"
          onClick={() => setActiveSubTab('campaigns')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'campaigns'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>{language === 'ro' ? 'Campanii în Timp Real' : 'Active Live Campaigns'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-400/20 text-purple-300 text-[10px] font-mono">
            {campaigns.length}
          </span>
        </button>

        <button
          id="client-tab-analytics"
          onClick={() => setActiveSubTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'analytics'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>{language === 'ro' ? 'Grafic Creștere 30 Zile (Recharts)' : '30-Day Growth Analytics'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono">
            30Z
          </span>
        </button>

        <button
          id="client-tab-orders"
          onClick={() => setActiveSubTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'orders'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>{language === 'ro' ? 'Istoric Plăți & Facturi' : 'Invoices & Payments'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
            {orders.length}
          </span>
        </button>
      </div>

      {/* 1. Campaigns List & Analytics */}
      {activeSubTab === 'campaigns' && (
        <div className="space-y-6">
          {campaigns.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Nu ai nicio campanie activă</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Lansează un test gratuit de 50 de privitori sau achiziționează un pachet pentru a urca pe prima pagină.
              </p>
              <button
                onClick={onExplorePlans}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30"
              >
                Alege un Pachet de Trafic
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((camp) => {
                const isRunning = camp.status === 'running';
                const isPaused = camp.status === 'paused';

                return (
                  <div
                    key={camp.id}
                    className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-sm transition-all space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Platform & Status badge */}
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <Radio className="w-5 h-5" />
                          </div>
                          <span
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${
                              isRunning
                                ? 'bg-emerald-400 animate-pulse'
                                : isPaused
                                ? 'bg-amber-400'
                                : 'bg-zinc-500'
                            }`}
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white font-mono">{camp.roomName}</h4>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-purple-300 font-mono">
                              {camp.platform}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                isRunning
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : isPaused
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {camp.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {camp.planName} • Regiune: <span className="text-zinc-300">{camp.geoRegion}</span>
                          </p>
                        </div>
                      </div>

                      {/* Quick Action Controls */}
                      <div className="flex items-center gap-2">
                        {isRunning ? (
                          <button
                            onClick={() => updateCampaignStatus(camp.id, 'paused')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pauză</span>
                          </button>
                        ) : isPaused ? (
                          <button
                            onClick={() => updateCampaignStatus(camp.id, 'running')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Reia</span>
                          </button>
                        ) : null}

                        {/* Boost +25 button */}
                        {isRunning && (
                          <button
                            onClick={() => boostCampaign(camp.id, 25)}
                            className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Adaugă 25 privitori suplimentari"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+25 Boost</span>
                          </button>
                        )}

                        {/* View 30-Day analytics button */}
                        <button
                          onClick={() => setActiveSubTab('analytics')}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Deschide graficele de evoluție pe 30 de zile"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Grafic 30Z</span>
                        </button>

                        <a
                          href={camp.roomUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="Deschide camera pe platformă"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-black/40 border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-400 block">Privitori Curenți:</span>
                        <span className="text-xl font-mono font-extrabold text-purple-400">
                          {camp.currentViewers}
                          <span className="text-xs text-zinc-500 font-normal"> / {camp.targetViewers}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-zinc-400 block">Proxy-uri Active:</span>
                        <span className="text-sm font-mono font-bold text-white">
                          {camp.activeProxies} conexiuni
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-zinc-400 block">Ramp Speed:</span>
                        <span className="text-sm font-semibold text-zinc-200">{camp.rampSpeed}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-zinc-400 block">Expiră la:</span>
                        <span className="text-xs font-mono text-zinc-300">
                          {new Date(camp.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Real-time Socket Logs Box */}
                    <div className="p-3 rounded-xl bg-black/80 border border-zinc-800 font-mono text-[11px] text-purple-300/90 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center justify-between pb-1 border-b border-zinc-800">
                        <span>Live Socket Telemetry</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Online
                        </span>
                      </div>
                      {camp.logs.slice(-2).map((log) => (
                        <div key={log.id} className="flex items-start gap-1.5 text-[10px] sm:text-[11px]">
                          <span className="text-zinc-500">{log.timestamp}:</span>
                          <span className={log.level === 'success' ? 'text-emerald-400' : 'text-purple-300'}>
                            {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Embedded 30-Day Traffic Growth Section in Dashboard */}
          <div className="pt-4">
            <RoomTrafficAnalytics
              campaigns={campaigns}
              orders={orders}
              language={language}
            />
          </div>
        </div>
      )}

      {/* 2. Standalone 30-Day Growth Analytics Tab */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-4">
          <RoomTrafficAnalytics
            campaigns={campaigns}
            orders={orders}
            language={language}
          />
        </div>
      )}

      {/* 2. Orders History & Invoices */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-800/50 border-b border-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Comandă</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Pachet</th>
                  <th className="px-4 py-3">Cameră</th>
                  <th className="px-4 py-3">Metodă Plată</th>
                  <th className="px-4 py-3">Sumă</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-mono font-bold text-purple-300">{ord.id}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      {new Date(ord.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{ord.planTitle}</td>
                    <td className="px-4 py-3 font-mono text-cyan-400">
                      {ord.platform}/{ord.roomTarget}
                    </td>
                    <td className="px-4 py-3 uppercase font-mono text-[11px] text-zinc-400">
                      {ord.paymentMethod}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-white">
                      {formatPrice(ord.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          ord.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : ord.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
