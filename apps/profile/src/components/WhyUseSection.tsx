import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Zap, Clock, Users, TrendingUp } from 'lucide-react';

export const WhyUseSection: React.FC = () => {
  const benefits = [
    {
      title: 'Stand out from the crowd',
      desc: "Most performers use plain text profiles. A custom design immediately catches attention and shows you're serious about your brand.",
      icon: <Award className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Build trust with viewers',
      desc: "A polished profile signals professionalism. Viewers are more likely to tip and become regulars when they see you've invested in your presentation.",
      icon: <HeartHandshake className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Communicate clearly',
      desc: 'Organized sections for tip menus, rules, and info help viewers find what they need quickly, leading to more engagement.',
      icon: <Zap className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Express your personality',
      desc: 'Custom colors, backgrounds, and layouts let you create a unique aesthetic that reflects who you are.',
      icon: <Users className="w-5 h-5 text-violet-400" />,
    },
    {
      title: 'Save time',
      desc: 'Instead of struggling with HTML code, create beautiful designs in minutes with our intuitive editor.',
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Why Use a Profile Designer?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            In the competitive world of cam streaming, first impressions matter. Your profile is often the first thing potential viewers see, and a professional-looking design can make the difference between gaining a new fan or being scrolled past.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            Benefits of a Professional Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={b.title}
                className={`bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 transition-all hover:border-slate-700 hover:-translate-y-1 shadow-md ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {b.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Attract More Viewers Callout */}
        <div className="bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-slate-900 border border-violet-800/40 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <TrendingUp className="w-8 h-8 text-violet-400" />
            </div>

            <div className="space-y-3 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white">
                Attract More Viewers
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Studies show that profiles with custom designs receive significantly more profile views and engagement. When viewers browse model listings, thumbnails and profile quality influence click-through rates. A well-designed profile converts casual browsers into loyal fans.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you're new to camming or a seasoned performer looking to refresh your brand, our free profile designer gives you the tools to create something amazing. No design skills required - just creativity and a few minutes of your time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
