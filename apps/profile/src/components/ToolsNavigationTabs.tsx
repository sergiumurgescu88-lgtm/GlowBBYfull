import React from 'react';
import { Palette, Shield, HelpCircle, Layers, FileText, Award, Search, Sparkles } from 'lucide-react';

interface ToolsNavigationTabsProps {
  activeTool: string;
  onSelectTool: (toolId: string) => void;
}

export const ToolsNavigationTabs: React.FC<ToolsNavigationTabsProps> = ({
  activeTool,
  onSelectTool,
}) => {
  const tools = [
    { id: 'designer', name: 'Profile Designer', icon: Palette, badge: 'Popular', color: 'text-violet-400' },
    { id: 'scanner', name: 'Free Leak Scanner', icon: Search, badge: 'Instant', color: 'text-rose-400' },
    { id: 'badges', name: 'DMCA Badges', icon: Shield, badge: 'Free', color: 'text-emerald-400' },
    { id: 'quiz', name: 'Content Safety Quiz', icon: HelpCircle, badge: 'Audit', color: 'text-amber-400' },
    { id: 'floating-icons', name: 'Floating Icons', icon: Layers, badge: 'Social', color: 'text-cyan-400' },
    { id: 'takedown', name: 'Takedown Notice', icon: FileText, badge: 'Legal', color: 'text-indigo-400' },
    { id: 'copyright', name: 'Copyright Guide', icon: Award, badge: 'USCO', color: 'text-yellow-400' },
  ];

  return (
    <section className="bg-[#0B0F19] border-b border-slate-800/80 sticky top-18 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 shrink-0 mr-1 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-400" />
            Tools:
          </span>

          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : t.color}`} />
                <span>{t.name}</span>
                {t.badge && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
