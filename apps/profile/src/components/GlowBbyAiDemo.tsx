import React, { useState } from 'react';
import { Bot, Sparkles, Copy, Check, Send, Brain, Zap, MessageSquare, Flame, Crown, Heart, Smile, UserCheck } from 'lucide-react';

export const GlowBbyAiDemo: React.FC = () => {
  const [tone, setTone] = useState<string>('playful');
  const [fanType, setFanType] = useState<string>('newbie');
  const [chatLog, setChatLog] = useState<string>(
`👤 Fan: "might drip all over our deal" [Tipped 25 tokens]
👤 Fan: "ohhh fuckk lion... u re trying to get me wet and crazy for you"
👤 Model: "hmmm damn if i knew u would do like that, would ve send u more"
👤 Fan: "I looked at the pic again so I had to tip... holly molly lion, I can feel my juice already"`
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [strategyGenerated, setStrategyGenerated] = useState<boolean>(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toneOptions = [
    { id: 'playful', label: '😏 Jucăuș', desc: 'Flirt lejer, teasere dulci și glumețe' },
    { id: 'vip', label: '👑 Dominant & VIP', desc: 'Prețios, inaccesibil, ton de regină' },
    { id: 'sweet', label: '💖 Dulce & Empatic', desc: 'Girlfriend Experience, cald și atent' },
    { id: 'tease', label: '🔥 Teasing & Sensual', desc: 'Îndrăzneț, provocator, impuls de tokeni' },
  ];

  const fanTypeOptions = [
    { id: 'newbie', label: '🌱 Newbie', desc: 'Fan nou, entuziasmat, vrea validare rapidă' },
    { id: 'whale', label: '🐋 Whale / High Roller', desc: 'Buget mare, caută exclusivitate și atenție 1-la-1' },
    { id: 'lurker', label: '🤫 Lurker / Timid', desc: 'Tipă ocazional, are nevoie de încurajare blândă' },
    { id: 'regular', label: '💬 Romantic Regular', desc: 'Atașat emoțional, apreciază conversația intimă' },
  ];

  // Generated strategies based on selected tone and fan type
  const getStrategyOutputs = () => {
    if (tone === 'playful') {
      return {
        psychology: 'Fanul simte deja o atracție fizică puternică și impulsivă. Răspunde pozitiv la provocări și vrea să vadă mai mult. Are o stare de exaltare ("crazy for you") ușor de transformat în tips mai mari pentru un video privat.',
        upsellTactic: 'Oferă un mic teaser dinamic și condiționează următorul pas printr-un mini-goal de 100-200 tokeni sau o invitație directă în C2C Spy/Private.',
        responses: [
          {
            title: 'Opțiunea 1: Tease & Tipping Trigger (Recomandat)',
            text: "Hehe you can't handle me yet baby! 😉 If just one pic got you this crazy, imagine what happens in my VIP private show... Send 150 tokens and let me show you the rest right now 💕",
            goal: '+150 Tokens',
          },
          {
            title: 'Opțiunea 2: Playful Challenge',
            text: "Naughty boy... and you didn't even see the video clip that goes with that pic! 😈 Tip my goal of 100 tokens and I'll send it straight to your DMs.",
            goal: '+100 Tokens',
          },
          {
            title: 'Opțiunea 3: Flirty Escalation to C2C',
            text: "Mmm you're sweet when you're dripping for me babe. Take me to private for 5 mins and let's see how crazy we can get together! 💋",
            goal: 'Private Show',
          },
        ],
      };
    }

    if (tone === 'vip') {
      return {
        psychology: 'Fanul caută aprobare și vrea să simtă că a câștigat atenția unei femei de neatins. Tonul VIP îl provoacă să investească generos pentru a merita timpul tău.',
        upsellTactic: 'Menține standardul ridicat: 25 de tokeni este doar un aperitiv. Cere un tribut VIP pentru a-i acorda atenție exclusivă.',
        responses: [
          {
            title: 'Opțiunea 1: High-Class Tease',
            text: "25 tokens is cute darling, but a queen requires real dedication. Drop 300 tokens if you want me to keep you in this state all night long 👑",
            goal: '+300 Tokens',
          },
          {
            title: 'Opțiunea 2: Exclusive Private Demand',
            text: "You can feel it because I'm unmatched. If you want my full attention, hit that private button right now before another tipper steals me 💎",
            goal: 'VIP Private',
          },
          {
            title: 'Opțiunea 3: Secret Tease Gallery',
            text: "That was just a tiny glimpse. My private premium vault is 500 tokens — are you man enough to unlock it? ✨",
            goal: '+500 Tokens',
          },
        ],
      };
    }

    if (tone === 'sweet') {
      return {
        psychology: 'Fanul are nevoie de căldură și complicitate intimă. Reacționează cel mai bine la conexiune emoțională și zâmbete complice.',
        upsellTactic: 'Fă-l să se simtă special, ca și cum această conversație este secretul vostru împărtășit.',
        responses: [
          {
            title: 'Opțiunea 1: Sweet & Intimate',
            text: "Aww you are making me blush so much! 🥰 I love knowing you feel so close to me... tip 75 tokens and let's do our private kiss countdown on cam! 💖",
            goal: '+75 Tokens',
          },
          {
            title: 'Opțiunea 2: Gentle Temptation',
            text: "You're my favorite sweet boy today! Want to see the behind-the-scenes selfie I took just for you? Tip 100 tokens and check your inbox ✨",
            goal: '+100 Tokens',
          },
          {
            title: 'Opțiunea 3: Cozy Private Invite',
            text: "I want to whisper in your ear where nobody else can hear us... let's hop into a cozy private session together babe 💕",
            goal: 'Private Session',
          },
        ],
      };
    }

    // Default 'tease'
    return {
      psychology: 'Fanul este într-un moment de vârf de excitabilitate. Fiecare secundă de așteptare crește disponibilitatea lui de a cheltui, dacă primește o direcție clară.',
      upsellTactic: 'Profită de impulsul fierbinte: cere tokeni imediați pentru o acțiune senzuală specifică.',
      responses: [
        {
          title: 'Opțiunea 1: Direct Sensual Trigger',
          text: "Mmm, don't stop now lion! 🫦 Send 200 tokens right now and I'll bite my lip and show you the exact angle that drove you wild...",
          goal: '+200 Tokens',
        },
        {
          title: 'Opțiunea 2: Flash Show Urgency',
          text: "You think you're wet now? Wait until you see what I'm wearing underneath! 150 tokens to the goal or let's go private instantly 🔥",
          goal: '+150 Tokens',
        },
        {
          title: 'Opțiunea 3: Intimate Video Offer',
          text: "If that photo did that to you, the 2-minute HD clip I made will completely finish you off. Tip 250 tokens for the link! 😈",
          goal: '+250 Tokens',
        },
      ],
    };
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStrategyGenerated(true);
    }, 600);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const strategy = getStrategyOutputs();

  return (
    <section id="glowbby-ai" className="py-20 bg-[#080C16] relative overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-violet-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-semibold mb-4">
            <Bot className="w-4 h-4 text-violet-400 animate-pulse" />
            <span>🧠 Live AI Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            GlowBBY <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300">Intelligence Platform</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Vezi cum AI-ul nostru analizează conversațiile reale și generează răspunsuri perfect adaptate (în limba engleză).
          </p>
        </div>

        {/* Interactive Playground Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input & Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center justify-between">
                <span>Alege Atitudinea / Tonul</span>
                <span className="text-violet-400 font-normal lowercase text-[11px]">4 stiluri disponibile</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toneOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      tone === t.id
                        ? 'bg-violet-600/20 border-violet-500 text-white shadow-md shadow-violet-600/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{t.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fan Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center justify-between">
                <span>Tipul Fanului</span>
                <span className="text-fuchsia-400 font-normal lowercase text-[11px]">psihologie adaptivă</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fanTypeOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFanType(f.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      fanType === f.id
                        ? 'bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-md shadow-fuchsia-600/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{f.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Log Input (Simulat) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                  <span>📝 Chat Log Input (Simulat)</span>
                </label>
                <button
                  onClick={() =>
                    setChatLog(
`👤 Fan: "might drip all over our deal" [Tipped 25 tokens]
👤 Fan: "ohhh fuckk lion... u re trying to get me wet and crazy for you"
👤 Model: "hmmm damn if i knew u would do like that, would ve send u more"
👤 Fan: "I looked at the pic again so I had to tip... holly molly lion, I can feel my juice already"`
                    )
                  }
                  className="text-[10px] text-violet-400 hover:text-violet-300 underline cursor-pointer"
                >
                  Reset text inițial
                </button>
              </div>
              <textarea
                value={chatLog}
                onChange={(e) => setChatLog(e.target.value)}
                rows={5}
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-violet-500 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Introdu replicile conversației..."
              />
            </div>

            {/* Action Button */}
            <button
              id="generate-ai-strategy-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 active:scale-[0.98] shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-amber-300 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'GlowBBY analizează conversația...' : '✨ Generate AI Strategy'}</span>
            </button>
          </div>

          {/* Right Column: AI Output & Strategy Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Strategie Generată de GlowBBY AI
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Analysis Active
              </span>
            </div>

            {/* Psychology & Tactic Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Analiză Psihologică Fan
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {strategy.psychology}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Tactică de Monetizare & Upsell
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {strategy.upsellTactic}
                </p>
              </div>
            </div>

            {/* 3 High-Converting English Responses */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                <span>Răspunsuri Optimizate în Limba Engleză</span>
                <span className="text-xs text-slate-500 font-normal">Gata de copiat</span>
              </div>

              <div className="space-y-3">
                {strategy.responses.map((resp, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 rounded-xl p-3.5 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-violet-300">
                        {resp.title}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        {resp.goal}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-3 select-all bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      "{resp.text}"
                    </p>

                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleCopy(resp.text, idx)}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copiat!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiază răspunsul</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note about 24/7 AI chat management */}
            <div className="p-3 bg-violet-950/30 border border-violet-800/40 rounded-xl flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-[11px] text-slate-300 leading-snug">
                <strong>La Glow Models:</strong> Nu trebuie să scrii tu aceste mesaje manual! Tehnologia GlowBBY preia 80% din conversații în mod autonom și îți aduce bani în timp real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
