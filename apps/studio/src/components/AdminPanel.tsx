import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PackagePlan,
  DurationTier,
  Platform,
  TrafficType,
} from '../types';
import {
  ShieldAlert,
  BarChart3,
  Radio,
  Receipt,
  Server,
  Package,
  Users,
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Search,
  DollarSign,
  Download,
  AlertTriangle,
  Play,
  Pause,
  Zap,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    packages,
    campaigns,
    orders,
    proxyNodes,
    users,
    formatPrice,
    updateCampaignStatus,
    boostCampaign,
    updateUserBalance,
    updatePackagePrice,
    addPackage,
    deletePackage,
    approvePendingOrder,
    refundOrder,
    toggleProxyNode,
    language,
    setIsAdmin,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<
    'overview' | 'campaigns' | 'orders' | 'nodes' | 'packages' | 'users'
  >('overview');

  // Filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // New package modal state
  const [isAddingPkg, setIsAddingPkg] = useState(false);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgCategory, setNewPkgCategory] = useState<TrafficType>('anonymous');
  const [newPkgViewers, setNewPkgViewers] = useState(250);
  const [newPkgDesc, setNewPkgDesc] = useState('');
  const [newPkgPrice3h, setNewPkgPrice3h] = useState(24.99);

  // User balance adjustment state
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<string | null>(null);
  const [balanceAmountToAdd, setBalanceAmountToAdd] = useState(50);

  // High-level analytics
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const activeCampaignsCount = campaigns.filter((c) => c.status === 'running').length;
  const totalActiveViewers = campaigns
    .filter((c) => c.status === 'running')
    .reduce((acc, curr) => acc + curr.currentViewers, 0);

  const totalProxySessions = proxyNodes.reduce((acc, curr) => acc + curr.activeSessions, 0);
  const totalProxyCapacity = proxyNodes.reduce((acc, curr) => acc + curr.maxCapacity, 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.roomTarget.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName) return;

    const newPlan: PackagePlan = {
      id: `custom-${Date.now()}`,
      name: newPkgName,
      category: newPkgCategory,
      viewers: Number(newPkgViewers),
      description: newPkgDesc || 'Pachet de trafic dedicat creat de administrator.',
      pricing: {
        '3hours': Number(newPkgPrice3h),
        '12hours': Number((newPkgPrice3h * 2.2).toFixed(2)),
        '24hours': Number((newPkgPrice3h * 3.8).toFixed(2)),
        '7days': Number((newPkgPrice3h * 15).toFixed(2)),
        '30days': Number((newPkgPrice3h * 48).toFixed(2)),
      },
      features: [
        `${newPkgViewers} Privitori Reali Garantați`,
        'Instanțe Google Chrome Dedicate',
        'IP-uri Rezidențiale de mare viteză',
        'Protecție Algoritm 2026',
      ],
    };

    addPackage(newPlan);
    setIsAddingPkg(false);
    setNewPkgName('');
  };

  const handleExportOrdersCSV = () => {
    const headers = ['ID,Data,Pachet,Privitori,Cameră,Platformă,Sumă,Metodă,Status,Email\n'];
    const rows = orders.map(
      (o) =>
        `${o.id},${o.date},"${o.planTitle}",${o.viewers},${o.roomTarget},${o.platform},${o.amount},${o.paymentMethod},${o.status},${o.customerEmail}`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glowstudio_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Admin Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/70 border border-amber-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wider">
                  GLOW STUDIO — ADMIN CONSOLE
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  SISTEM ONLINE 99.98%
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Panou centralizat de administrare pentru campanii, comenzi, clusterul de proxy-uri și utilizatori.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdmin(false)}
            className="px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-colors"
          >
            ← Înapoi la Vizualizare Client
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: 'overview', label: 'Overview & Metrici', icon: BarChart3 },
            { id: 'campaigns', label: `Campanii Globale (${campaigns.length})`, icon: Radio },
            { id: 'orders', label: `Comenzi & Plăți (${orders.length})`, icon: Receipt },
            { id: 'nodes', label: `Cluster Proxy-uri (${proxyNodes.length})`, icon: Server },
            { id: 'packages', label: `Pachete & Prețuri (${packages.length})`, icon: Package },
            { id: 'users', label: `Utilizatori (${users.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Venituri Totale Procesate</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono mt-2">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3 h-3" /> +18.4% față de săptămâna trecută
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Campanii Active în Rulare</span>
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-2">
                  {activeCampaignsCount}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {totalActiveViewers.toLocaleString()} privitori conectați acum
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Sesiuni Proxy Active</span>
                  <Server className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono mt-2">
                  {totalProxySessions.toLocaleString()}{' '}
                  <span className="text-xs text-zinc-500 font-normal">/ {totalProxyCapacity.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-amber-300 mt-1">
                  Capacitate rețea: {((totalProxySessions / totalProxyCapacity) * 100).toFixed(1)}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Rată de Conversie & Comenzi</span>
                  <Activity className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono mt-2">
                  {orders.length} comenzi
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  100% plăți procesate securizat
                </div>
              </div>
            </div>

            {/* Quick Summary Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Server Nodes Load */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Stare Cluster Servere
                </h3>
                <div className="space-y-3">
                  {proxyNodes.map((node) => {
                    const pct = Math.round((node.activeSessions / node.maxCapacity) * 100);
                    return (
                      <div key={node.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-white flex items-center gap-1.5">
                            <span>{node.flag}</span>
                            <span>{node.region}</span>
                          </span>
                          <span className="font-mono text-zinc-400">
                            {node.activeSessions} / {node.maxCapacity} ({pct}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct > 85 ? 'bg-amber-500' : 'bg-cyan-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  Ultimele Tranzacții
                </h3>
                <div className="space-y-2.5">
                  {orders.slice(0, 4).map((ord) => (
                    <div
                      key={ord.id}
                      className="p-2.5 rounded-lg bg-black/30 border border-zinc-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white font-mono">{ord.id}</div>
                        <div className="text-[11px] text-zinc-400">
                          {ord.roomTarget} • {ord.planTitle}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400">{formatPrice(ord.amount)}</div>
                        <div className="text-[10px] uppercase font-mono text-zinc-400">{ord.paymentMethod}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GLOBAL CAMPAIGNS */}
        {currentTab === 'campaigns' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Toate Campaniile în Desfășurare</h3>
              <span className="text-xs text-zinc-400 font-mono">
                {activeCampaignsCount} campanii active
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                  <tr>
                    <th className="px-4 py-3">ID & Cameră</th>
                    <th className="px-4 py-3">Platformă</th>
                    <th className="px-4 py-3">Privitori (Curent / Țintă)</th>
                    <th className="px-4 py-3">Proxy-uri</th>
                    <th className="px-4 py-3">Ramp Speed</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Acțiuni Administrator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-zinc-800/30">
                      <td className="px-4 py-3">
                        <div className="font-bold text-white font-mono">{camp.roomName}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{camp.id}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-cyan-400 font-bold">{camp.platform}</td>
                      <td className="px-4 py-3 font-mono">
                        <span className="text-base font-extrabold text-purple-300">
                          {camp.currentViewers}
                        </span>{' '}
                        <span className="text-zinc-500">/ {camp.targetViewers}</span>
                      </td>
                      <td className="px-4 py-3 font-mono">{camp.activeProxies} noduri</td>
                      <td className="px-4 py-3 text-zinc-400">{camp.rampSpeed}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            camp.status === 'running'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : camp.status === 'paused'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {camp.status === 'running' ? (
                            <button
                              onClick={() => updateCampaignStatus(camp.id, 'paused')}
                              className="p-1.5 rounded bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
                              title="Pauză"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => updateCampaignStatus(camp.id, 'running')}
                              className="p-1.5 rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                              title="Reia"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => boostCampaign(camp.id, 50)}
                            className="px-2 py-1 rounded bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 font-mono text-[10px] font-bold"
                            title="Boost +50 privitori"
                          >
                            +50 Boost
                          </button>

                          <button
                            onClick={() => updateCampaignStatus(camp.id, 'completed')}
                            className="p-1.5 rounded bg-rose-500/15 text-rose-300 hover:bg-rose-500/25"
                            title="Oprește campania"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & TRANSACTIONS */}
        {currentTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Caută comandă, email, cameră..."
                    className="pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="all">Toate Statusurile</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <button
                onClick={handleExportOrdersCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                  <tr>
                    <th className="px-4 py-3">Comandă</th>
                    <th className="px-4 py-3">Client Email</th>
                    <th className="px-4 py-3">Pachet</th>
                    <th className="px-4 py-3">Cameră</th>
                    <th className="px-4 py-3">Metodă</th>
                    <th className="px-4 py-3">Sumă</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Acțiuni Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-800/30">
                      <td className="px-4 py-3 font-mono font-bold text-purple-300">{ord.id}</td>
                      <td className="px-4 py-3 text-zinc-300">{ord.customerEmail}</td>
                      <td className="px-4 py-3 text-white font-medium">{ord.planTitle}</td>
                      <td className="px-4 py-3 font-mono text-cyan-400">
                        {ord.platform}/{ord.roomTarget}
                      </td>
                      <td className="px-4 py-3 uppercase font-mono text-[10px] text-zinc-400">
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
                              ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {ord.status === 'pending' && (
                            <button
                              onClick={() => approvePendingOrder(ord.id)}
                              className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold uppercase font-mono flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Aprobă
                            </button>
                          )}
                          {ord.status === 'completed' && (
                            <button
                              onClick={() => refundOrder(ord.id)}
                              className="px-2 py-1 rounded bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 text-[10px] font-semibold"
                            >
                              Rambursează
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PROXY NODES */}
        {currentTab === 'nodes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Cluster Servere & Rețea Proxy Rezidențiale</h3>
                <p className="text-xs text-zinc-400">
                  Control direct asupra rutării sesiunilor Google Chrome și rotației adreselor IP.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {proxyNodes.map((node) => (
                <div
                  key={node.id}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{node.flag}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{node.region}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono">{node.country}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        node.status === 'online'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Tip Conexiune:</span>
                      <span className="text-white font-medium">{node.ipType}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Latență Medie:</span>
                      <span className="text-cyan-400 font-mono font-bold">{node.latency} ms</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Sesiuni Chrome Active:</span>
                      <span className="text-white font-mono font-bold">
                        {node.activeSessions} / {node.maxCapacity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleProxyNode(node.id)}
                    className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors border ${
                      node.status === 'online'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    {node.status === 'online' ? 'Treci în Mentenanță' : 'Activează Serverul'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PACKAGES & PRICING CRUD */}
        {currentTab === 'packages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Catalog Pachete & Configurare Prețuri</h3>
                <p className="text-xs text-zinc-400">
                  Modifică prețurile în timp real sau adaugă noi pachete pentru clienți.
                </p>
              </div>
              <button
                onClick={() => setIsAddingPkg(!isAddingPkg)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                <Plus className="w-4 h-4 fill-white" />
                <span>Adaugă Pachet Nou</span>
              </button>
            </div>

            {/* Add Package Form */}
            {isAddingPkg && (
              <form
                onSubmit={handleCreatePackage}
                className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/40 space-y-4 animate-in fade-in"
              >
                <h4 className="text-sm font-bold text-purple-300">Creează Pachet Nou</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Nume Pachet</label>
                    <input
                      type="text"
                      value={newPkgName}
                      onChange={(e) => setNewPkgName(e.target.value)}
                      placeholder="ex: Mega Studio 500"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Număr Privitori</label>
                    <input
                      type="number"
                      value={newPkgViewers}
                      onChange={(e) => setNewPkgViewers(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Preț Bază 3 Ore ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPkgPrice3h}
                      onChange={(e) => setNewPkgPrice3h(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingPkg(false)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs"
                  >
                    Salvează Pachetul
                  </button>
                </div>
              </form>
            )}

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                      <span className="text-[10px] uppercase font-mono text-purple-400">
                        {pkg.category} • {pkg.viewers} privitori
                      </span>
                    </div>
                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="Șterge pachet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Inline Price Adjusters */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs">
                    <span className="text-[11px] text-zinc-400 font-semibold block mb-1">
                      Prețuri per Durată (USD):
                    </span>
                    {(['3hours', '12hours', '24hours', '7days', '30days'] as DurationTier[]).map((dur) => (
                      <div key={dur} className="flex items-center justify-between">
                        <span className="text-zinc-400 uppercase font-mono text-[10px]">{dur}:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-zinc-500">$</span>
                          <input
                            type="number"
                            step="0.1"
                            defaultValue={pkg.pricing[dur]}
                            onBlur={(e) => updatePackagePrice(pkg.id, dur, Number(e.target.value))}
                            className="w-20 px-2 py-0.5 rounded bg-black/50 border border-zinc-800 text-xs font-mono text-right text-purple-300 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: USERS & WALLETS */}
        {currentTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Management Utilizatori & Balanțe Portofel</h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                  <tr>
                    <th className="px-4 py-3">Utilizator</th>
                    <th className="px-4 py-3">Rol</th>
                    <th className="px-4 py-3">Sold Portofel</th>
                    <th className="px-4 py-3">Total Cheltuit</th>
                    <th className="px-4 py-3">Campanii Rulate</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Ajustează Sold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-zinc-800/30">
                      <td className="px-4 py-3 font-medium text-white">{usr.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            usr.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {usr.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-purple-300">
                        {formatPrice(usr.walletBalance)}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-300">
                        {formatPrice(usr.totalSpent)}
                      </td>
                      <td className="px-4 py-3 font-mono">{usr.activeCampaignsCount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300">
                          {usr.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateUserBalance(usr.id, 50)}
                            className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-mono font-bold"
                          >
                            +50 $
                          </button>
                          <button
                            onClick={() => updateUserBalance(usr.id, -50)}
                            className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[10px] font-mono font-bold"
                          >
                            -50 $
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
