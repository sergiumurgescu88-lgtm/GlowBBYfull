import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, ShieldCheck, ShieldAlert, ArrowRight, RotateCcw, Lock, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    points: number; // 0 = safest, 25 = highest vulnerability
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you currently protect your uploaded videos and photos from unauthorized re-distribution?',
    subtitle: 'Watermarking and forensic tracing are crucial to deter rip sites.',
    options: [
      {
        label: 'Dynamic/Visible Watermark + Forensic Steganography',
        description: 'Every image and clip contains my stage name and digital timestamp.',
        points: 0,
      },
      {
        label: 'Static Watermark in corner only',
        description: 'Easily cropped or blurred out by auto-cropping bots.',
        points: 15,
      },
      {
        label: 'No watermarks on my content',
        description: 'Rippers and tube bots can download and re-upload with zero friction.',
        points: 30,
      },
    ],
  },
  {
    id: 2,
    question: 'Where do you broadcast or distribute your premium content?',
    subtitle: 'Platforms have differing degrees of DRM and screen recording protections.',
    options: [
      {
        label: 'Single private platform with Strict DRM',
        description: 'Low surface area and single-stream verification.',
        points: 5,
      },
      {
        label: 'Multi-camming across Chaturbate, Stripchat, & MFC',
        description: 'Higher exposure to public auto-recording scraper bots.',
        points: 20,
      },
      {
        label: 'Subscription sites + Cam sites + Social promotional previews',
        description: 'Maximum surface area; frequent screen recording leaks on Telegram and tube mirrors.',
        points: 25,
      },
    ],
  },
  {
    id: 3,
    question: 'Do you use geo-blocking to restrict viewing in specific countries or your hometown?',
    subtitle: 'Geo-blocking protects privacy but can leave vulnerabilities via VPNs.',
    options: [
      {
        label: 'Yes, with active VPN-detection and region restrictions',
        description: 'Blocks viewers from your domestic region.',
        points: 5,
      },
      {
        label: 'Standard platform geo-blocking only',
        description: 'Viewers with basic free VPNs can still bypass your block.',
        points: 15,
      },
      {
        label: 'No geo-blocking enabled at all',
        description: 'Anyone anywhere can record, view, and cross-reference your personal identity.',
        points: 25,
      },
    ],
  },
  {
    id: 4,
    question: 'How do you scrub personal EXIF metadata from uploaded images?',
    subtitle: 'Raw iPhone and Android photos frequently leak exact GPS coordinates and device serials.',
    options: [
      {
        label: 'I always strip EXIF data before uploading anywhere',
        description: 'Zero geolocation or device traces remaining.',
        points: 0,
      },
      {
        label: 'I rely on platforms to strip metadata automatically',
        description: 'Some platforms strip metadata, but cloud caches and preview servers often keep raw headers.',
        points: 15,
      },
      {
        label: 'I didn’t know photos contained GPS location data',
        description: 'High risk of physical location or hometown de-anonymization.',
        points: 30,
      },
    ],
  },
  {
    id: 5,
    question: 'What is your current response protocol when your content is stolen?',
    subtitle: 'Speed of takedown determines whether videos spread to 50+ mirror tube sites.',
    options: [
      {
        label: 'Automated 24/7 DMCA scanning & immediate de-indexing',
        description: 'Leaks are taken down within hours of initial crawler detection.',
        points: 0,
      },
      {
        label: 'I manually file DMCA notices whenever a fan notifies me',
        description: 'By the time someone spots it, dozens of mirror networks have cached it.',
        points: 20,
      },
      {
        label: 'I feel helpless and do nothing',
        description: 'Pirates profit off your paywalled content while you lose paying subscribers.',
        points: 35,
      },
    ],
  },
];

export const ContentSafetyQuizTool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (points: number) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate total risk score out of 100
  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
  const normalizedScore = Math.min(100, Math.round((totalScore / 145) * 100));

  let riskTier = 'Low Risk';
  let riskColor = 'text-emerald-400';
  let riskBg = 'bg-emerald-950/40 border-emerald-800/60';
  let recommendation = 'Your profile safety habits are in the top 10% of broadcasters!';

  if (normalizedScore > 65) {
    riskTier = 'Severe Exposure Risk';
    riskColor = 'text-rose-400';
    riskBg = 'bg-rose-950/40 border-rose-800/60';
    recommendation = 'Your content is vulnerable to automated scraper bots, mirror re-uploads, and personal de-anonymization.';
  } else if (normalizedScore > 35) {
    riskTier = 'Moderate Vulnerability';
    riskColor = 'text-amber-400';
    riskBg = 'bg-amber-950/40 border-amber-800/60';
    recommendation = 'You have good foundational hygiene, but key leak vectors (metadata and tube scraping) remain open.';
  }

  return (
    <div id="quiz" className="py-12 bg-[#0B0F19] text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span>Interactive Tool · 2-Minute Security Audit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Content Safety & Leak Risk Quiz
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Answer 5 quick questions to calculate your leak vulnerability score, discover your risk vectors, and receive a customized defense checklist.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          
          {!isCompleted ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% Completed</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 leading-snug">
                  {QUESTIONS[currentStep].question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(opt.points)}
                    className="w-full text-left p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-violet-500 hover:bg-slate-800/60 transition-all duration-150 flex items-start justify-between gap-4 group cursor-pointer active:scale-[0.99]"
                  >
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 shrink-0 transition-all mt-1" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className={`p-6 rounded-2xl border ${riskBg} flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left`}>
                <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-slate-800 flex flex-col items-center justify-center shrink-0 shadow-xl">
                  <span className="text-2xl font-black text-white font-mono">{normalizedScore}%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Risk Score</span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold">
                    {normalizedScore > 65 ? <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    <span className={riskColor}>{riskTier}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Your Risk Assessment Summary</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              </div>

              {/* Personalized Recommended Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Recommended Action Plan for Your Room
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                      1. Embed Visible DMCA Badge
                    </strong>
                    <p className="text-slate-400">
                      Scrapers and screen-recording bots systematically skip streams with verified deterrence marks to avoid legal liability.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                      2. Clean EXIF Geolocation Tags
                    </strong>
                    <p className="text-slate-400">
                      Strip camera metadata from your promotional photos before posting on Twitter/Reddit to conceal your town.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                      3. Proactive Automated DMCA Scans
                    </strong>
                    <p className="text-slate-400">
                      Do not wait for fans to report leaks. Automated daily tube crawls remove mirrors within hours.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                      4. Watermark Paywalled Archives
                    </strong>
                    <p className="text-slate-400">
                      Add semi-transparent diagonal watermarks containing your broadcast handle to prevent unauthorized sales on forums.
                    </p>
                  </div>
                </div>
              </div>

              {/* Retake Button & Action Links */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <a
                  href="#badges"
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Generate Free Protection Badge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
