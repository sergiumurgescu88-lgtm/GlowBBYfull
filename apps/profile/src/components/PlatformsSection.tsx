import React from 'react';
import { PLATFORMS_DATA } from '../data/mockData';
import { CheckCircle2, ArrowUpRight, Video, Radio } from 'lucide-react';

interface PlatformsSectionProps {
  onSelectPlatform: (platform: 'chaturbate' | 'mfc' | 'stripchat' | 'bongacams' | 'cam4') => void;
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ onSelectPlatform }) => {
  const getPlatformKey = (name: string): 'chaturbate' | 'mfc' | 'stripchat' | 'bongacams' | 'cam4' => {
    if (name === 'MyFreeCams') return 'mfc';
    return name.toLowerCase() as any;
  };

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Supported Platforms
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our profile designer creates image-based profiles that work with all major cam sites. Here's how each platform handles profile customization:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORMS_DATA.map((plat) => {
            const key = getPlatformKey(plat.name);
            return (
              <div
                key={plat.name}
                className="bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                        style={{ backgroundColor: plat.iconColor }}
                      >
                        <Radio className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                          {plat.name}
                        </h3>
                        <span className="text-xs text-slate-400">Cam Site Network</span>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-violet-300 bg-violet-950/40 border border-violet-800/40 px-2 py-1 rounded">
                      {plat.tag}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {plat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Compatible
                  </span>

                  <button
                    onClick={() => onSelectPlatform(key)}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Design for {plat.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-violet-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
