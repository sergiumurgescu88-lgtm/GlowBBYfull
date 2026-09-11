import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Shield,
  Wallet,
  Globe,
  Sliders,
  Menu,
  X,
  PlusCircle,
  Activity,
  Layers,
  Search,
} from 'lucide-react';

interface HeaderProps {
  onOpenWalletModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWalletModal }) => {
  const {
    isAdmin,
    setIsAdmin,
    currentUser,
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    language,
    setLanguage,
    campaigns,
    formatPrice,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const runningCampaignsCount = campaigns.filter((c) => c.status === 'running').length;

  const navLinks = [
    { id: 'home', label: language === 'ro' ? 'Acasă' : 'Home' },
    { id: 'pricing', label: language === 'ro' ? 'Pachete & Tarife' : 'Packages & Pricing' },
    { id: 'inspector', label: language === 'ro' ? 'Inspector Camere' : 'Room Inspector' },
    {
      id: 'dashboard',
      label: language === 'ro' ? 'Campaniile Mele' : 'My Campaigns',
      badge: runningCampaignsCount > 0 ? runningCampaignsCount : undefined,
    },
    { id: 'features', label: language === 'ro' ? 'Cum Funcționează' : 'How It Works' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/50 bg-black/40 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="header-brand-logo"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_22px_rgba(34,211,238,0.5)] transition-all">
            <Zap className="w-4 h-4 text-white fill-white/80 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tighter text-white uppercase italic">
                GLOW <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-sans">STUDIO</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 -mt-1 tracking-wide font-mono">
              Chaturbate Automation & Traffic
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/40 p-1.5 rounded-full border border-zinc-800/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id && !isAdmin;
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => {
                  setIsAdmin(false);
                  setActiveTab(link.id);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {link.label}
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-cyan-400 text-black font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Currency Toggle */}
          <div className="flex items-center bg-zinc-900/80 border border-zinc-800 rounded-lg p-0.5 text-xs">
            {(['EUR', 'USD', 'RON'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-1 rounded font-mono text-[11px] font-semibold transition-colors ${
                  currency === c
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            id="btn-language-toggle"
            onClick={() => setLanguage(language === 'ro' ? 'en' : 'ro')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 hover:border-zinc-700 transition-all"
            title="Schimbă limba / Change language"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="uppercase text-[11px] font-mono">{language}</span>
          </button>

          {/* Wallet Balance Pill - Immersive UI design */}
          <button
            id="btn-header-wallet"
            onClick={onOpenWalletModal}
            className="bg-zinc-900/80 px-3.5 py-1.5 rounded-full border border-zinc-800 hover:border-purple-500/50 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono text-cyan-100 font-semibold">{formatPrice(currentUser.walletBalance)}</span>
            <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
          </button>

          {/* Admin Panel Toggle Switch */}
          <button
            id="btn-admin-toggle"
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) {
                setActiveTab('admin');
              } else {
                setActiveTab('home');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              isAdmin
                ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-purple-300 hover:border-purple-500/30'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isAdmin ? 'text-purple-400' : 'text-zinc-400'}`} />
            <span>{isAdmin ? 'Admin [ACTIV]' : 'Admin Panel'}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenWalletModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{formatPrice(currentUser.walletBalance)}</span>
          </button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800/80 bg-[#070708]/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsAdmin(false);
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-medium text-left ${
                  activeTab === link.id && !isAdmin
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                    : 'bg-zinc-900/50 text-zinc-300 border border-zinc-800/80'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-400 text-black font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {(['EUR', 'USD', 'RON'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                    currency === c ? 'bg-purple-500/20 text-purple-300' : 'text-zinc-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setLanguage(language === 'ro' ? 'en' : 'ro');
              }}
              className="flex items-center gap-1 text-xs text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span className="uppercase font-mono">{language}</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) {
                setActiveTab('admin');
              } else {
                setActiveTab('home');
              }
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40 text-purple-300"
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>{isAdmin ? 'Ieși din Panoul de Administrare' : 'Deschide Panou Administrare (Admin)'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
