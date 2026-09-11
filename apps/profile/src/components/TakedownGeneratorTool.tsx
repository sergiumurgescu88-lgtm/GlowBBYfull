import React, { useState } from 'react';
import { FileText, Copy, Check, Mail, Download, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AbuseTarget {
  name: string;
  email: string;
  portalUrl?: string;
}

const ABUSE_TARGETS: AbuseTarget[] = [
  { name: 'Google Search De-indexing', email: 'removals@google.com', portalUrl: 'https://support.google.com/legal/troubleshooter/1114905' },
  { name: 'Cloudflare Abuse (CDN Proxy)', email: 'abuse@cloudflare.com', portalUrl: 'https://abuse.cloudflare.com' },
  { name: 'Pornhub / Aylo / MindGeek', email: 'dmca@mindgeek.com' },
  { name: 'SpankBang', email: 'dmca@spankbang.com' },
  { name: 'Eporner', email: 'dmca@eporner.com' },
  { name: 'Reddit Abuse', email: 'legal@reddit.com' },
  { name: 'Telegram Abuse', email: 'dmca@telegram.org' },
  { name: 'Mega.nz Cloud Locker', email: 'copyright@mega.nz' },
  { name: 'CyberDrop / Bunkr', email: 'abuse@cyberdrop.me' },
  { name: 'X / Twitter Copyright', email: 'copyright@x.com', portalUrl: 'https://help.twitter.com/forms/dmca' },
];

interface TakedownGeneratorToolProps {
  initialInfringingUrl?: string;
  initialStageName?: string;
}

export const TakedownGeneratorTool: React.FC<TakedownGeneratorToolProps> = ({
  initialInfringingUrl = '',
  initialStageName = '',
}) => {
  const [targetPlatform, setTargetPlatform] = useState<string>(ABUSE_TARGETS[0].name);
  const [recipientEmail, setRecipientEmail] = useState<string>(ABUSE_TARGETS[0].email);
  const [copyrightOwner, setCopyrightOwner] = useState<string>(initialStageName || 'Cam Broadcaster');
  const [ownerEmail, setOwnerEmail] = useState<string>('creator@legal-protection.com');
  const [infringingUrl, setInfringingUrl] = useState<string>(
    initialInfringingUrl || 'https://pirate-tube-leaks.example/video/849204'
  );
  const [originalWorkUrl, setOriginalWorkUrl] = useState<string>('https://chaturbate.com/my-broadcaster-room/');
  const [description, setDescription] = useState<string>(
    'Exclusive live cam stream recording and photos created by me and broadcast on my verified channel.'
  );
  const [copied, setCopied] = useState(false);

  // Handle target change
  const handleSelectTarget = (targetName: string) => {
    setTargetPlatform(targetName);
    const found = ABUSE_TARGETS.find((t) => t.name === targetName);
    if (found) {
      setRecipientEmail(found.email);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Legally compliant 17 U.S.C. 512(c)(3) notice
  const noticeBody = `DMCA COPYRIGHT INFRINGEMENT NOTICE
Pursuant to Title 17, United States Code, Section 512(c)(3)

DATE: ${currentDate}
TO: DMCA Designated Copyright Agent / Abuse Team (${targetPlatform})
EMAIL: ${recipientEmail}

I, ${copyrightOwner}, am the sole copyright holder and author of the copyrighted intellectual property identified below.

1. IDENTIFICATION OF COPYRIGHTED WORK:
${description}
Original Author Profile & Verified Source:
${originalWorkUrl}

2. IDENTIFICATION OF INFRINGING MATERIAL TO BE REMOVED:
The following unauthorized URL(s) are displaying, hosting, or linking to my copyrighted media without permission or license:
${infringingUrl}

3. STATEMENT OF GOOD FAITH BELIEF:
I have a good faith belief that use of the copyrighted materials described above on the infringing web pages is not authorized by the copyright owner, its agent, or the law.

4. STATEMENT OF ACCURACY UNDER PENALTY OF PERJURY:
I swear, under penalty of perjury under the laws of the United States and the Berne Convention, that the information in this notification is accurate and that I am the copyright owner authorized to enforce these rights.

5. CONTACT INFORMATION:
Copyright Owner: ${copyrightOwner}
Email: ${ownerEmail}
Agent Platform: Glow Models Legal & Protection Services (glowmodels.com)

ELECTRONIC SIGNATURE:
/s/ ${copyrightOwner}
Date: ${currentDate}
`;

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(noticeBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadNotice = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    const blob = new Blob([noticeBody], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DMCA-Notice-${copyrightOwner.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `URGENT DMCA Copyright Infringement Notice - ${copyrightOwner}`
  )}&body=${encodeURIComponent(noticeBody)}`;

  return (
    <div id="takedown" className="py-12 bg-[#0F172A] text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-violet-400" />
            <span>Interactive Tool · Official Legal 512(c)(3) Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            DMCA Takedown Notice & Template Generator
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Generate enforceable, legally certified DMCA takedown notices with recipient abuse database lookup for tube websites, Google de-indexing, cyberlockers, and web hosts.
          </p>
        </div>

        {/* Two Column Layout: Notice Form & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Controls Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Notice Details
            </h3>

            {/* Target Provider Preset */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Infringing Platform / Abuse Recipient
              </label>
              <select
                value={targetPlatform}
                onChange={(e) => handleSelectTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 font-semibold cursor-pointer"
              >
                {ABUSE_TARGETS.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} ({t.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Abuse Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Designated Agent Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            {/* Stolen Content URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Stolen / Infringing URL to Remove
              </label>
              <input
                type="text"
                value={infringingUrl}
                onChange={(e) => setInfringingUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-rose-900/60 focus:border-rose-500 rounded-xl text-xs text-rose-200 focus:outline-none font-mono"
                placeholder="https://..."
              />
            </div>

            {/* Copyright Owner Name & Verified Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Performer / Owner Name
                </label>
                <input
                  type="text"
                  value={copyrightOwner}
                  onChange={(e) => setCopyrightOwner(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Contact Email
                </label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 font-medium"
                />
              </div>
            </div>

            {/* Original Source URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Original Verified Content Source (Chaturbate/OnlyFans URL)
              </label>
              <input
                type="text"
                value={originalWorkUrl}
                onChange={(e) => setOriginalWorkUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            {/* Description of Original Work */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Description of Copyrighted Content
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-violet-500"
              />
            </div>

          </div>

          {/* Rendered Notice & Dispatch Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-violet-400" />
                  Certified Legal Notice Draft
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                  17 U.S.C. § 512(c)(3) Valid
                </span>
              </div>

              {/* Scrollable Notice Document */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 font-mono text-[11px] leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap select-text">
                {noticeBody}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={handleCopyNotice}
                  className="py-2.5 px-3 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Notice!' : 'Copy Notice'}</span>
                </button>

                <a
                  href={mailtoLink}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span>Send via Email</span>
                </a>

                <button
                  onClick={handleDownloadNotice}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 text-center">
                Under the DMCA Safe Harbor law, service providers must remove content expeditiously upon receipt of this notice to retain immunity.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
