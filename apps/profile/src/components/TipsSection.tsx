import React from 'react';
import { Eye, AlignLeft, Sparkles, DollarSign, Share2 } from 'lucide-react';

export const TipsSection: React.FC = () => {
  const tips = [
    {
      title: 'Keep it readable',
      description: 'Choose contrasting colors between text and background for easy reading.',
      icon: <Eye className="w-5 h-5 text-indigo-400" />,
      tag: 'Readability',
    },
    {
      title: 'Be concise',
      description: 'Viewers scan profiles quickly. Use bullet points and short paragraphs.',
      icon: <AlignLeft className="w-5 h-5 text-sky-400" />,
      tag: 'Format',
    },
    {
      title: 'Show personality',
      description: 'Include fun facts, hobbies, and what makes you unique.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      tag: 'Identity',
    },
    {
      title: 'Include a tip menu',
      description: 'Clear pricing helps viewers know what to expect.',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      tag: 'Monetization',
    },
    {
      title: 'Add social links',
      description: 'Connect with fans across platforms to build your following.',
      icon: <Share2 className="w-5 h-5 text-violet-400" />,
      tag: 'Growth',
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Tips for a Great Profile
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Follow these proven recommendations to boost fan retention, increase tips, and stand out in category listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={tip.title}
              className={`bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 hover:border-slate-700 transition-all hover:-translate-y-1 shadow-lg ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                  {tip.icon}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                  {tip.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {tip.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
