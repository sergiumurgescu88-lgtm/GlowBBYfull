import React, { useState } from 'react';
import { Award, CheckCircle, Calculator, ExternalLink, Shield, HelpCircle, FileCheck, ArrowRight } from 'lucide-react';

export const CopyrightRegistrationTool: React.FC = () => {
  const [workType, setWorkType] = useState<'photos' | 'video' | 'stream' | 'all'>('stream');
  const [itemsCount, setItemsCount] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  // US Copyright Office (eCO) statutory fee estimations
  let estimatedFee = 45;
  let categoryLabel = 'Single Work (One recording or set)';
  let advice = 'Registering a single live broadcast recording with the US Copyright Office.';

  if (workType === 'photos') {
    estimatedFee = 55;
    categoryLabel = 'Group of Unpublished Photographs (GRPPH)';
    advice = 'Bundle up to 750 promotional or fan photos under a single $55 application fee.';
  } else if (workType === 'stream' || workType === 'video') {
    if (itemsCount > 1) {
      estimatedFee = 85;
      categoryLabel = 'Group Registration of Works (GRUW)';
      advice = 'Register up to 10 broadcast video sessions together under one application.';
    } else {
      estimatedFee = 45;
      categoryLabel = 'Standard Electronic Application (Single Author)';
      advice = 'Standard registration for a single cam show or exclusive video.';
    }
  } else if (workType === 'all') {
    estimatedFee = 140;
    categoryLabel = 'Comprehensive Portfolio Catalog';
    advice = 'Combines photo bundles and video recordings for complete legal coverage.';
  }

  return (
    <div id="copyright" className="py-12 bg-[#0B0F19] text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-violet-400" />
            <span>Interactive Tool · Official IP & Copyright Office Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Copyright Registration Assistant & Fee Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Registering your digital broadcasts and photosets unlocks statutory damages up to $150,000 per willful infringement and provides irrefutable proof in DMCA counter-notice disputes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Estimator */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-violet-400" />
              Statutory Fee & Application Estimator
            </h3>

            {/* Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Type of Content to Register
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'stream', label: 'Cam Stream VOD' },
                  { id: 'video', label: 'Produced Clips' },
                  { id: 'photos', label: 'Photo Sets (up to 750)' },
                  { id: 'all', label: 'Full Library Bundle' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setWorkType(t.id as any)}
                    className={`p-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                      workType === t.id
                        ? 'bg-violet-600/30 border-violet-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Approximate Number of Works / Shows: <strong className="text-white">{itemsCount}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={itemsCount}
                onChange={(e) => setItemsCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1 Show</span>
                <span>10 Shows (Group Bundle)</span>
                <span>25+ Shows</span>
              </div>
            </div>

            {/* Fee Output Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-slate-950 border border-violet-800/40 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-violet-400 tracking-wider block mb-0.5">
                  Official Registration Tier
                </span>
                <h4 className="text-base font-bold text-white mb-1">
                  {categoryLabel}
                </h4>
                <p className="text-xs text-slate-300">
                  {advice}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ${estimatedFee}
                </span>
                <span className="text-[10px] text-slate-400 block">USCO Filing Fee</span>
              </div>
            </div>

            {/* Direct Official Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://www.copyright.gov/eco/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch US Copyright Office Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs text-slate-400">
                Protected worldwide under the Berne Convention in 181 countries.
              </span>
            </div>

          </div>

          {/* Legal Checklist & Benefits */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" />
                Why Register Your Cam Shows?
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">$150,000 Statutory Damages</strong>
                    <span className="text-slate-400">You do not have to prove exact financial losses; courts award statutory damages per infringed title.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Court Attorney Fees Recovery</strong>
                    <span className="text-slate-400">Pirate tube operators must pay your legal representation fees upon judgment.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Instant Overrule on Counter-Notices</strong>
                    <span className="text-slate-400">An official certificate number stops bogus counter-notices from tube web hosts immediately.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-violet-400" />
                Registration Checklist Before Filing
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Exact broadcast date and platform stream log</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Unedited digital master copy (MP4 / original photos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Legal name or registered pseudonym / LLC entity</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
