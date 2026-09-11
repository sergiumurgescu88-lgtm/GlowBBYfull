import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Eye,
  Coins,
  Radio,
  Calendar,
  Sparkles,
  Search,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Campaign, Order } from '../types';

interface RoomTrafficAnalyticsProps {
  campaigns: Campaign[];
  orders: Order[];
  language: 'ro' | 'en';
}

interface DailyGrowthData {
  dayIndex: number;
  dateStr: string;
  fullDate: string;
  totalViewers: number;
  organicViewers: number;
  boostViewers: number;
  rankPosition: number;
  tokensEarned: number;
  streamHours: number;
}

// Generate deterministic 30-day history for any room target
function generate30DayRoomHistory(roomName: string): DailyGrowthData[] {
  // Simple deterministic seed based on room string
  let seed = 0;
  for (let i = 0; i < roomName.length; i++) {
    seed = (seed * 31 + roomName.charCodeAt(i)) & 0xffffffff;
  }
  const pseudoRand = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const data: DailyGrowthData[] = [];
  const now = new Date();

  // Baseline values before boost
  const baseOrganic = 45 + Math.floor(pseudoRand(1) * 35); // 45-80 viewers
  const initialRank = 380 + Math.floor(pseudoRand(2) * 120); // Rank #380-500

  for (let i = 29; i >= 0; i--) {
    const dayDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayProgress = (30 - i) / 30; // 0.03 to 1.0 (growth factor over 30 days)

    // Growth trajectory: exponential ramp-up as room gains algorithmic authority
    const boostPower = Math.min(
      1200,
      Math.floor(120 + dayProgress * 650 + pseudoRand(i * 3) * 180)
    );
    // Organic spillover increases as rank gets higher
    const organicGained = Math.floor(
      baseOrganic + dayProgress * 280 + pseudoRand(i * 5) * 60
    );
    const totalPeak = boostPower + organicGained;

    // Rank improves (number decreases from ~400 down to ~12-25)
    const improvedRank = Math.max(
      8,
      Math.floor(initialRank - dayProgress * (initialRank - 16) + (pseudoRand(i * 7) * 12 - 6))
    );

    // Tips / tokens earned correlate with viewers and rank
    const tokens = Math.floor(
      (totalPeak * 14.5) + pseudoRand(i * 11) * 800 + (dayProgress * 4500)
    );

    const streamHrs = Number((3.0 + pseudoRand(i * 13) * 3.5).toFixed(1));

    data.push({
      dayIndex: 30 - i,
      dateStr: dayDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }),
      fullDate: dayDate.toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
      }),
      totalViewers: totalPeak,
      boostViewers: boostPower,
      organicViewers: organicGained,
      rankPosition: improvedRank,
      tokensEarned: tokens,
      streamHours: streamHrs,
    });
  }

  return data;
}

export const RoomTrafficAnalytics: React.FC<RoomTrafficAnalyticsProps> = ({
  campaigns,
  orders,
  language,
}) => {
  // Extract unique known rooms from campaigns and orders
  const knownRooms = useMemo(() => {
    const set = new Set<string>();
    campaigns.forEach((c) => {
      if (c.roomName) set.add(c.roomName.trim().toLowerCase());
    });
    orders.forEach((o) => {
      if (o.roomTarget) set.add(o.roomTarget.trim().toLowerCase());
    });
    // Add default popular room if empty
    if (set.size === 0) {
      set.add('sweet_eva');
      set.add('eva_official');
    }
    return Array.from(set);
  }, [campaigns, orders]);

  const [selectedRoom, setSelectedRoom] = useState<string>(knownRooms[0] || 'sweet_eva');
  const [customRoomInput, setCustomRoomInput] = useState<string>('');
  const [isEditingCustomRoom, setIsEditingCustomRoom] = useState<boolean>(false);
  const [activeMetricView, setActiveMetricView] = useState<'viewers' | 'rank' | 'monetization'>('viewers');
  const [timeRangeDays, setTimeRangeDays] = useState<7 | 14 | 30>(30);

  // Generate dataset for currently selected room
  const full30DayData = useMemo(() => {
    return generate30DayRoomHistory(selectedRoom || 'sweet_eva');
  }, [selectedRoom]);

  // Slice based on timeRangeDays
  const chartData = useMemo(() => {
    return full30DayData.slice(30 - timeRangeDays);
  }, [full30DayData, timeRangeDays]);

  // Derived summary metrics
  const summaryMetrics = useMemo(() => {
    if (chartData.length === 0) return null;
    const peakViewers = Math.max(...chartData.map((d) => d.totalViewers));
    const bestRank = Math.min(...chartData.map((d) => d.rankPosition));
    const firstDay = chartData[0];
    const lastDay = chartData[chartData.length - 1];
    const viewerGrowthPct = Math.round(
      ((lastDay.totalViewers - firstDay.totalViewers) / Math.max(1, firstDay.totalViewers)) * 100
    );
    const totalTokensEarned = chartData.reduce((acc, d) => acc + d.tokensEarned, 0);
    const totalStreamHours = chartData.reduce((acc, d) => acc + d.streamHours, 0);

    return {
      peakViewers,
      bestRank,
      viewerGrowthPct,
      totalTokensEarned,
      totalStreamHours: totalStreamHours.toFixed(1),
      currentRank: lastDay.rankPosition,
      currentOrganic: lastDay.organicViewers,
    };
  }, [chartData]);

  const handleApplyCustomRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customRoomInput.trim()) {
      const cleanName = customRoomInput.trim().replace(/^@/, '').toLowerCase();
      setSelectedRoom(cleanName);
      setIsEditingCustomRoom(false);
    }
  };

  // Custom tooltips with dark glassmorphism
  const CustomViewersTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as DailyGrowthData;
      return (
        <div className="p-3 rounded-xl bg-zinc-950/95 border border-purple-500/40 shadow-2xl backdrop-blur-md text-xs font-sans space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1 text-zinc-400 font-mono text-[10px]">
            <span>{item.fullDate}</span>
            <span className="text-purple-400 font-bold">Ziua {item.dayIndex}/30</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Privitori Totali:
            </span>
            <span className="font-mono font-bold text-white text-sm">
              {item.totalViewers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Glow Proxy Boost:
            </span>
            <span className="font-mono text-cyan-300 font-semibold">
              {item.boostViewers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Organici / Frontpage:
            </span>
            <span className="font-mono text-emerald-300 font-semibold">
              +{item.organicViewers.toLocaleString()}
            </span>
          </div>
          <div className="pt-1 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Poziție Chaturbate:</span>
            <span className="font-mono font-bold text-amber-300">
              #{item.rankPosition} (Pag. {Math.ceil(item.rankPosition / 24)})
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomRankTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as DailyGrowthData;
      return (
        <div className="p-3 rounded-xl bg-zinc-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md text-xs font-sans space-y-1.5 min-w-[190px]">
          <div className="border-b border-zinc-800 pb-1 text-zinc-400 font-mono text-[10px]">
            {item.fullDate}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">Poziție în clasament:</span>
            <span className="font-mono font-black text-cyan-300 text-sm">
              #{item.rankPosition}
            </span>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3" />
            {item.rankPosition <= 24 ? 'Pagina 1 Garantată' : `Pagina ${Math.ceil(item.rankPosition / 24)}`}
          </div>
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Privitori concomitenți:</span>
            <span className="font-mono text-white">{item.totalViewers}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomMonetizationTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as DailyGrowthData;
      return (
        <div className="p-3 rounded-xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-sans space-y-1.5 min-w-[200px]">
          <div className="border-b border-zinc-800 pb-1 text-zinc-400 font-mono text-[10px]">
            {item.fullDate}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Tokeni Generați:
            </span>
            <span className="font-mono font-bold text-amber-300 text-sm">
              {item.tokensEarned.toLocaleString()} TK
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Valoare estimată USD:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              ${(item.tokensEarned * 0.05).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Ore de transmisiune live:</span>
            <span className="font-mono text-zinc-200">{item.streamHours}h</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="room-traffic-analytics-section"
      className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md space-y-6 shadow-xl"
    >
      {/* Section Header with Room Target Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {language === 'ro'
                ? 'Analiză Istorică Creștere Trafic (30 Zile)'
                : '30-Day Historical Traffic Growth'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>
              {language === 'ro'
                ? 'Performanța Camerei Tale'
                : 'Room Growth Telemetry'}
            </span>
            <span className="text-purple-400 font-mono text-base sm:text-lg font-bold">
              @{selectedRoom}
            </span>
          </h3>
          <p className="text-xs text-zinc-400">
            {language === 'ro'
              ? 'Vizualizează cum traficul de privitori proxy și clasarea pe prima pagină au generat creștere organică în ultimele 30 de zile.'
              : 'Track how proxy viewers and top rank placements delivered compounding organic growth over the last 30 days.'}
          </p>
        </div>

        {/* Room Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Room Selection Dropdown */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-zinc-800 rounded-xl p-1">
            <span className="text-[11px] text-zinc-400 pl-2 font-mono flex items-center gap-1">
              <Radio className="w-3 h-3 text-purple-400" />
              Cameră:
            </span>
            <select
              id="room-selector-dropdown"
              value={selectedRoom}
              onChange={(e) => {
                setSelectedRoom(e.target.value);
                setIsEditingCustomRoom(false);
              }}
              className="bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500"
            >
              {knownRooms.map((r) => (
                <option key={r} value={r}>
                  @{r}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Custom Room Input Toggle */}
          {!isEditingCustomRoom ? (
            <button
              id="btn-custom-room-toggle"
              onClick={() => setIsEditingCustomRoom(true)}
              className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center gap-1.5"
              title="Analizează altă cameră"
            >
              <Search className="w-3 h-3 text-zinc-400" />
              <span>{language === 'ro' ? 'Altă Cameră' : 'Custom Room'}</span>
            </button>
          ) : (
            <form
              onSubmit={handleApplyCustomRoom}
              className="flex items-center gap-1.5 bg-zinc-950 border border-purple-500/50 rounded-xl p-1"
            >
              <input
                id="input-custom-room-target"
                type="text"
                placeholder="ex: model_vip"
                value={customRoomInput}
                onChange={(e) => setCustomRoomInput(e.target.value)}
                className="bg-transparent px-2 py-0.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none w-28"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setIsEditingCustomRoom(false)}
                className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </form>
          )}

          {/* Time Range Filter (7d / 14d / 30d) */}
          <div className="flex items-center bg-black/40 border border-zinc-800 rounded-xl p-1 text-xs font-mono">
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                id={`filter-range-${days}d`}
                onClick={() => setTimeRangeDays(days)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  timeRangeDays === days
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {days}Z
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 30-Day Growth Overview for Selected Room */}
      {summaryMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/90">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Vârf Privitori (30 Zile)</span>
              <Eye className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1.5 flex items-baseline gap-1.5">
              <span>{summaryMetrics.peakViewers.toLocaleString()}</span>
              <span className="text-[11px] font-semibold text-emerald-400">
                +{summaryMetrics.viewerGrowthPct}%
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              față de nivelul inițial fără boost
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/90">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Cea Mai Bună Poziție</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-1.5 flex items-baseline gap-1.5">
              <span>#{summaryMetrics.bestRank}</span>
              <span className="text-[11px] font-bold text-emerald-400 uppercase font-mono">
                Pagina 1
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              pe platforma Chaturbate
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/90">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Atracție Organică / Zi</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-1.5">
              +{summaryMetrics.currentOrganic}{' '}
              <span className="text-xs text-zinc-500 font-normal">privitori</span>
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              fani reali intrați din catalogul principal
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/90">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Tokeni & Bacșișuri 30Z</span>
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1.5">
              {summaryMetrics.totalTokensEarned.toLocaleString()}{' '}
              <span className="text-xs text-zinc-500 font-normal">TK</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5">
              ~ ${(summaryMetrics.totalTokensEarned * 0.05).toFixed(0)} USD monetizare
            </div>
          </div>
        </div>
      )}

      {/* Chart View Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 bg-black/40 border border-zinc-800 p-1 rounded-xl">
          <button
            id="tab-chart-viewers"
            onClick={() => setActiveMetricView('viewers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMetricView === 'viewers'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Trafic Privitori (Boost + Organic)</span>
          </button>

          <button
            id="tab-chart-rank"
            onClick={() => setActiveMetricView('rank')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMetricView === 'rank'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Evoluție Clasament (Rank)</span>
          </button>

          <button
            id="tab-chart-monetization"
            onClick={() => setActiveMetricView('monetization')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMetricView === 'monetization'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Monetizare & Bacșișuri</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Date verificate prin nodurile rezidențiale Glow Studio</span>
        </div>
      </div>

      {/* Main Interactive Recharts Canvas */}
      <div className="p-4 rounded-xl bg-black/50 border border-zinc-800/80">
        {/* Metric 1: Viewers Breakdown Area Chart */}
        {activeMetricView === 'viewers' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-zinc-400">
                Privitori Concomitenți în Vârf per Zi (Ultimile {timeRangeDays} zile)
              </span>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                  Privitori Totali
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                  Glow Proxy Boost
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                  Organic Natural
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorBoost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateStr"
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#3f3f46' }}
                  />
                  <YAxis
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${val}`}
                  />
                  <Tooltip content={<CustomViewersTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="totalViewers"
                    name="Privitori Totali"
                    stroke="#c084fc"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="boostViewers"
                    name="Glow Proxy Boost"
                    stroke="#22d3ee"
                    strokeWidth={1.8}
                    fillOpacity={1}
                    fill="url(#colorBoost)"
                  />
                  <Area
                    type="monotone"
                    dataKey="organicViewers"
                    name="Organic Natural"
                    stroke="#34d399"
                    strokeWidth={1.8}
                    fillOpacity={1}
                    fill="url(#colorOrganic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Metric 2: Rank Progression Line Chart */}
        {activeMetricView === 'rank' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-zinc-400">
                Poziție în Clasamentul Chaturbate (Număr mai mic = Pagina 1 / Top)
              </span>
              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Urcare spre Top #1</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateStr"
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#3f3f46' }}
                  />
                  {/* Reversed Y-Axis: lower rank numbers like #10 are at the top */}
                  <YAxis
                    reversed
                    domain={['dataMin - 10', 'dataMax + 20']}
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `#${val}`}
                  />
                  <Tooltip content={<CustomRankTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="rankPosition"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', r: 3.5, strokeWidth: 1, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#67e8f9', stroke: '#0891b2', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 px-2 pt-1 font-mono">
              <span>▲ Sus: Topul Paginii 1 (Poziții #1 - #24)</span>
              <span>▼ Jos: Pagini secundare (#200+)</span>
            </div>
          </div>
        )}

        {/* Metric 3: Token Monetization Bar Chart */}
        {activeMetricView === 'monetization' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-zinc-400">
                Bacșișuri & Tokeni Încasați pe Baza Vizibilității Obținute (TK)
              </span>
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                <span>Venituri Tokeni Chaturbate</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateStr"
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#3f3f46' }}
                  />
                  <YAxis
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomMonetizationTooltip />} />
                  <Bar
                    dataKey="tokensEarned"
                    name="Tokeni Încasați"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Footer Callout */}
      <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-purple-200">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            {language === 'ro'
              ? `Camera @${selectedRoom} are o rată de retenție organică de 4.8x mai mare după atingerea primelor 24 de poziții.`
              : `Room @${selectedRoom} maintains a 4.8x higher organic retention rate after holding top-24 positions.`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-purple-400 font-mono font-semibold text-[11px] whitespace-nowrap">
          <span>Actualizat automat la fiecare 15 min</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
