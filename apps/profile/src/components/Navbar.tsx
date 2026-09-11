import React, { useState } from 'react';
import { ChevronDown, Gift, Shield, Sparkles, Menu, X, ArrowRight, Bot, Lock, Palette } from 'lucide-react';

interface NavbarProps {
  onOpenGift: () => void;
  onOpenScanner: () => void;
  onStartDesigning: () => void;
  onSelectTool: (toolId: string) => void;
  onSelectGuide: (guideTitle: string) => void;
  onOpenAiDemo?: () => void;
  onApplyClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGift,
  onOpenScanner,
  onStartDesigning,
  onSelectTool,
  onSelectGuide,
  onOpenAiDemo,
  onApplyClick,
}) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toolsList = [
    { id: 'designer', name: 'GLOW Profile Designer', desc: 'Custom cam bios without code', badge: 'Popular' },
    { id: 'badges', name: 'Glow DMCA Badges', desc: 'Display deterrence shields on site', badge: 'Free' },
    { id: 'quiz', name: 'Content Safety Quiz', desc: 'Assess your leak risk level', badge: 'Interactive' },
    { id: 'scanner', name: 'Free Leak Scanner', desc: 'Audit piracy sites for stolen media', badge: 'Instant' },
    { id: 'floating-icons', name: 'Floating Icons', desc: 'Social & protection overlays', badge: 'New' },
    { id: 'takedown', name: 'DMCA Takedown Generator', desc: '512(c)(3) legal notices & mailer', badge: 'Legal' },
    { id: 'copyright', name: 'Copyright Registration', desc: 'Official IP & USCO filing guide', badge: 'Guide' },
  ];

  const handleToolClick = (toolId: string) => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
    if (toolId === 'scanner') {
      onOpenScanner();
    } else {
      onSelectTool(toolId);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80 text-white">
      {/* Top micro-bar: 100% Confidentiality Guarantee */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950 to-emerald-950/60 border-b border-emerald-900/40 py-1 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-semibold tracking-wide">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>🔒 100% Confidențialitate Garantată · Geoblocare România Activă · NDA Legal</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo: GLOW MODELS */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
                    GLOW
                  </span>
                  <span className="text-xl font-light tracking-widest text-pink-400 uppercase font-sans">
                    MODELS
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-violet-400 -mt-1">
                  GLOW Profile Platform
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <a
                href="#why-glow"
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                De Ce Glow?
              </a>

              <a
                href="#glowbby-ai"
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4 text-violet-400" />
                <span>GlowBBY AI</span>
              </a>

              <a
                href="https://profile.glowbby.online"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
              >
                <Palette className="w-4 h-4 text-pink-400" />
                <span>GLOW Profile Designer</span>
              </a>

              {/* Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <button
                  id="nav-tools-button"
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Unelte & Securitate</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-violet-400' : ''}`} />
                </button>

                {toolsOpen && (
                  <div className="absolute top-full left-0 w-84 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-slate-900 border border-slate-700/70 rounded-xl shadow-2xl p-2.5 space-y-1">
                      {toolsList.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          className="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-slate-800/70 transition-colors group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-violet-300 flex items-center gap-2">
                              {tool.name}
                              {tool.badge && (
                                <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{tool.desc}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#apply-form"
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-scanner-btn"
              onClick={onOpenScanner}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Leak Scanner</span>
            </button>

            <a
              href="https://profile.glowbby.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 active:scale-95 rounded-lg shadow-md shadow-violet-600/25 transition-all duration-150 flex items-center gap-1.5"
            >
              <span>🎨</span>
              <span>Profile Designer</span>
            </a>
            <button
              id="nav-get-started-button"
              onClick={onApplyClick || onStartDesigning}
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 hover:from-pink-500 hover:via-fuchsia-500 hover:to-violet-500 active:scale-95 rounded-lg shadow-md shadow-pink-600/25 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Vreau să Strălucesc ✨</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-400 px-3">
            GLOW MODELS Navigation
          </div>
          <div className="space-y-1">
            <a
              href="#why-glow"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 rounded-md"
            >
              De Ce Glow Models?
            </a>
            <a
              href="#glowbby-ai"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 rounded-md"
            >
              GlowBBY Live AI Demo
            </a>
            <button
              onClick={() => {
                onStartDesigning();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 rounded-md"
            >
              GLOW Profile Designer
            </button>
            <a
              href="#apply-form"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 rounded-md"
            >
              Aplicație & Contact
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                if (onApplyClick) onApplyClick();
                else onStartDesigning();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center font-bold text-white bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg text-sm"
            >
              Vreau să Strălucesc ✨
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
