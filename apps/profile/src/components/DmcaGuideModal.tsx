import React from 'react';
import { X, BookOpen, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Scale, AlertCircle } from 'lucide-react';

interface DmcaGuideModalProps {
  guideTitle: string | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTakedown: () => void;
}

const GUIDE_CONTENT: Record<
  string,
  {
    summary: string;
    keyPoints: string[];
    statutoryRule: string;
    actionPlan: string[];
  }
> = {
  'What is DMCA?': {
    summary:
      'The Digital Millennium Copyright Act (DMCA) is a 1998 United States copyright law that implements two 1996 treaties of the World Intellectual Property Organization (WIPO). It provides a legal framework for content owners to demand the swift removal of copyrighted material hosted without authorization on any internet server or search engine.',
    keyPoints: [
      'Applies to digital media: live cam recordings, private photos, videos, and artistic graphics.',
      'Safe Harbor (Section 512): Web hosts and platforms (like Reddit, Google, Tube sites) are shielded from liability ONLY if they remove infringing content expeditiously upon receiving a formal notice.',
      'No formal registration required to file: As the author of the stream or photo, you automatically hold the copyright the moment it is created.',
    ],
    statutoryRule: 'Title 17 United States Code Section 512(c)(3) requires 6 elements for an enforceable notice.',
    actionPlan: [
      'Locate the exact URLs where your unauthorized media is being displayed or downloaded.',
      'Use the Glow Models DMCA Takedown Generator to draft a compliant notice.',
      'Send to the designated agent listed in the platform terms or US Copyright Office directory.',
    ],
  },
  'DMCA Takedown': {
    summary:
      'A DMCA Takedown is a formal legal notification sent to a service provider, search engine, or website hosting unauthorized media demanding its immediate removal under penalty of perjury.',
    keyPoints: [
      'Standard turnaround time for compliant sites is 24 to 72 hours.',
      'Web hosts face severe financial liability if they ignore verified takedown notices.',
      'Search engines like Google, Bing, and Yandex de-index the URLs so they no longer appear in search results.',
    ],
    statutoryRule: 'Expeditious removal mandate under 17 U.S.C. § 512(c)(1)(C).',
    actionPlan: [
      'Document evidence with screenshots and timestamps.',
      'Generate a verified 512(c) letter with your signature.',
      'Track takedown status and escalate to domain registrar or upstream CDN if host is unresponsive.',
    ],
  },
  'Cam Model Protection': {
    summary:
      'Webcam performers face unique vulnerabilities from unauthorized recording bots ("rippers") that screen-capture broadcasts and mirror them across tube sites, forums, and cloud lockers.',
    keyPoints: [
      'Broadcasters own the broadcast stream rights under international copyright law.',
      'Embedding verified DMCA badges in your bio and stream overlay cuts automated scraping significantly.',
      'Automated daily crawler scans prevent leaked recordings from propagating across dozens of mirror tube networks.',
    ],
    statutoryRule: 'Performers hold exclusive audiovisual broadcasting and distribution rights.',
    actionPlan: [
      'Add a Glow Models DMCA Deterrence Badge to your Chaturbate / MFC bio.',
      'Run regular reverse image and keyword scans on your broadcast handle.',
      'File automated DMCA de-indexing notices immediately upon leak discovery.',
    ],
  },
  'OnlyFans DMCA': {
    summary:
      'OnlyFans creators frequently have paywalled PPV and feed content ripped and posted to forums (SimpCity, Thothub) and cyberlockers (Mega, Bunkr). DMCA notices force file hosts and search engines to purge these files.',
    keyPoints: [
      'File lockers must delete the underlying master file from their clusters upon notice.',
      'Google de-indexes leaked Reddit threads and scraper forum index pages.',
      'Persistent scrapers risk domain seizure and payment processor termination.',
    ],
    statutoryRule: 'Digital Millenium Copyright Act § 512(d) Information Location Tools de-indexing.',
    actionPlan: [
      'Submit direct notices to cyberlocker abuse emails (Mega, Cyberdrop, Bunkr).',
      'Submit Google Search Removal notices to wipe search visibility.',
    ],
  },
  'Google DMCA': {
    summary:
      'Google removes infringing URLs from its global search results within 6 to 24 hours of receiving a valid DMCA de-indexing submission via Lumen Database.',
    keyPoints: [
      'Wipes search rankings: pirates can no longer gain traffic from your stage name.',
      'Google shares notices with the Lumen Database as proof of verified copyright enforcement.',
      'Protects your public reputation when potential fans or acquaintances search your handle.',
    ],
    statutoryRule: 'Google Legal Removal Protocol 17 U.S.C. § 512(d).',
    actionPlan: [
      'Collect all Google search result URLs showing stolen previews or thumbnails.',
      'Submit via Google Search Console Copyright Removal or Glow Models automated de-indexing.',
    ],
  },
};

export const DmcaGuideModal: React.FC<DmcaGuideModalProps> = ({
  guideTitle,
  isOpen,
  onClose,
  onOpenTakedown,
}) => {
  if (!isOpen || !guideTitle) return null;

  const content = GUIDE_CONTENT[guideTitle] || {
    summary: `Comprehensive legal guidelines and creator protection procedures for ${guideTitle}. Protect your digital assets, eliminate piracy mirrors, and enforce your statutory rights.`,
    keyPoints: [
      'Every digital photo and broadcast is protected automatically under the Berne Convention.',
      'Filing a formal DMCA notice triggers safe harbor obligations for web hosts and search engines.',
      'Prompt legal notices prevent stolen media from spreading into permanent tube archives.',
    ],
    statutoryRule: 'Enforced under Title 17 U.S. Code and international copyright treaties.',
    actionPlan: [
      'Gather the infringing URL links.',
      'Generate a formal legal DMCA notice using our free generator.',
      'Issue the notice to the hosting provider and request search de-indexing.',
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{guideTitle}</h3>
              <p className="text-[11px] text-slate-400">Official Glow Models DMCA & IP Legal Resource</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-800/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300 uppercase tracking-wider">
              <Scale className="w-4 h-4 text-violet-400" />
              Overview & Legal Basis
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {content.summary}
            </p>
          </div>

          {/* Key Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Key Rules & Creator Rights
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {content.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Rule Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-slate-200">Legal Reference:</strong> {content.statutoryRule}</span>
          </div>

          {/* Action Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recommended Action Steps
            </h4>
            <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside pl-1">
              {content.actionPlan.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenTakedown();
            }}
            className="w-full sm:w-auto px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Open DMCA Takedown Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
