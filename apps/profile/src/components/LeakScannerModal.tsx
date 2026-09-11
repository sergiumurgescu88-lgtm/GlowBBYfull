import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle, Search, Lock, ExternalLink, ShieldCheck, RefreshCw, Upload, Image, FileText, ArrowRight } from 'lucide-react';

interface LeakScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNavigateToDesigner: () => void;
  onSendTakedown?: (leakUrl: string) => void;
}

export const LeakScannerModal: React.FC<LeakScannerModalProps> = ({
  isOpen,
  onClose,
  initialQuery = 'Creator_Official',
  onNavigateToDesigner,
  onSendTakedown,
}) => {
  const [scanMode, setScanMode] = useState<'handle' | 'image'>('handle');
  const [query, setQuery] = useState(initialQuery);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [activeStep, setActiveStep] = useState('Initializing search bots...');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      runScan();
    } else {
      setScanning(false);
      setProgress(0);
      setScanComplete(false);
    }
  }, [isOpen, scanMode]);

  const runScan = () => {
    setScanning(true);
    setProgress(0);
    setScanComplete(false);

    const steps = scanMode === 'handle' ? [
      { p: 15, text: 'Querying 100,000+ indexed piracy databases & tube scrapers...' },
      { p: 40, text: 'Scanning cyberlocker file-sharing hosts & mega repositories...' },
      { p: 68, text: 'Auditing Google Cache, Yandex & Bing scraped images...' },
      { p: 88, text: 'Checking unauthorized Telegram channels & leak forums...' },
      { p: 100, text: 'Scan Complete! Aggregating security report...' },
    ] : [
      { p: 20, text: 'Extracting biometric & facial perceptual hashes from image...' },
      { p: 50, text: 'Matching against 250,000+ tube video thumbnail clusters...' },
      { p: 75, text: 'Searching cyberdrop, bunkr, and simpcity attachment archives...' },
      { p: 90, text: 'Verifying de-indexed search mirror entries...' },
      { p: 100, text: 'Reverse Image Scan Complete! Identified matches...' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setProgress(steps[current].p);
        setActiveStep(steps[current].text);
        current++;
      } else {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
      }
    }, 400);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImagePreview(url);
      runScan();
    }
  };

  const detectedLeaks = [
    {
      source: 'SpankBang Tube Mirror',
      url: 'https://spankbang.com/video/stream-rec-8492041',
      views: '14,280 views',
      risk: 'High',
    },
    {
      source: 'SimpCity Leak Thread',
      url: 'https://simpcity.su/threads/cam-archive-creator-mega.4920/',
      views: '2,400 downloads',
      risk: 'Severe',
    },
    {
      source: 'Google Search Cached Thumbnail',
      url: 'https://google.com/search?q=cached-pirate-image-8492',
      views: 'Indexed in Search',
      risk: 'Medium',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Free Piracy & Leak Scanner</h3>
              <p className="text-[11px] text-slate-400">Real-time web crawl across 100k+ tube sites & cyberlockers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Mode Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-1">
          <button
            onClick={() => setScanMode('handle')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              scanMode === 'handle' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-violet-400" />
            <span>Broadcaster Handle Search</span>
          </button>
          <button
            onClick={() => setScanMode('image')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              scanMode === 'image' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reverse Image / Media Audit</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Query Bar */}
          {scanMode === 'handle' ? (
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400 shrink-0">Broadcaster:</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runScan()}
                  className="text-xs font-mono font-bold text-violet-300 bg-transparent border-0 focus:outline-none w-full"
                  placeholder="Enter stage name..."
                />
              </div>
              <button
                onClick={runScan}
                disabled={scanning}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
                <span>Re-scan</span>
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer flex-1">
                <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">
                  {uploadedImagePreview ? 'Image loaded (Click to upload different photo)' : 'Upload photo or screenshot to reverse scan'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={runScan}
                disabled={scanning}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
                <span>Scan Image</span>
              </button>
            </div>
          )}

          {/* Scanning Progress */}
          {scanning && (
            <div className="py-6 text-center space-y-3">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-mono text-slate-300 animate-pulse">{activeStep}</p>
            </div>
          )}

          {/* Scan Results */}
          {scanComplete && (
            <div className="space-y-4">
              
              {/* Alert Status Card */}
              <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-4 flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-300 mb-1">
                    Unauthorized Content Matches Detected
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Found <strong className="text-rose-300">3 active piracy URLs</strong> streaming or distributing your broadcast content without authorization.
                  </p>
                </div>
              </div>

              {/* Detected Leak Links with Direct Takedown Button */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Infringing Material Detected:
                </label>
                {detectedLeaks.map((leak, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-white truncate">{leak.source}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-rose-950 text-rose-400 border border-rose-800">
                          {leak.risk} Risk
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">{leak.url}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{leak.views}</div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        if (onSendTakedown) {
                          onSendTakedown(leak.url);
                        }
                      }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] rounded-lg shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Take Down</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* How Glow Models Protects */}
              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-800/30 space-y-2">
                <h5 className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  Fortăreață Digitală · 24/7 Protection
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Glow Models automated crawlers monitor Google, Bing, Telegram, and tube sites around the clock, issuing DMCA notices within hours to keep your content secure.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigateToDesigner();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer text-center"
          >
            Open Profile Designer
          </button>

          <a
            href="#pricing"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md shadow-rose-600/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
          >
            <span>Activate 24/7 Automated Protection</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
