import React from 'react';
import { STEP_GUIDE } from '../data/mockData';
import { MousePointerClick, Image, PlusCircle, Palette, FileCode } from 'lucide-react';

interface StepGuideProps {
  onStartDesigning: () => void;
}

export const StepGuide: React.FC<StepGuideProps> = ({ onStartDesigning }) => {
  const stepIcons = [
    <MousePointerClick className="w-5 h-5 text-violet-400" key="1" />,
    <Image className="w-5 h-5 text-indigo-400" key="2" />,
    <PlusCircle className="w-5 h-5 text-teal-400" key="3" />,
    <Palette className="w-5 h-5 text-pink-400" key="4" />,
    <FileCode className="w-5 h-5 text-emerald-400" key="5" />,
  ];

  return (
    <section className="py-20 bg-[#0B0F19] text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            How to Create a Stunning Chaturbate Profile
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Creating an eye-catching profile is essential for standing out on cam sites. A well-designed profile not only attracts more viewers but also helps establish your personal brand. Our free profile designer makes this process simple, even if you have no design or coding experience.
          </p>
        </div>

        {/* Step-by-Step Guide Header */}
        <div className="mb-10 text-center">
          <h3 className="text-xl font-bold uppercase tracking-wider text-violet-400 inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            Step-by-Step Guide
          </h3>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEP_GUIDE.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center font-black text-lg text-violet-300">
                    {step.step}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 font-medium">
                Step {step.step} of 5
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
