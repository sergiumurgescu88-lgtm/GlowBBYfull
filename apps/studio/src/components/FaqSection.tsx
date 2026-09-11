import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { language } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: language === 'ro' ? 'Este contul meu Chaturbate sau Stripchat în siguranță?' : 'Is my broadcast account safe from suspension?',
      a: language === 'ro'
        ? 'Da, 100%. Serviciul nostru folosește exclusiv adrese IP rezidențiale unice și instanțe reale de Google Chrome. Deoarece privitorii par 100% organici, platforma nu poate face distincția între un utilizator obișnuit și un vizitator direcționat de noi. Avem 0 cazuri de suspendare din 2021.'
        : 'Yes, 100%. We route traffic exclusively through genuine residential ISPs and real Chrome instances. Platforms perceive the visits as entirely authentic, with zero ban incidents recorded since 2021.',
    },
    {
      q: language === 'ro' ? 'Cât de repede apar privitorii după efectuarea plății?' : 'How quickly do viewers connect after payment?',
      a: language === 'ro'
        ? 'Aproape instantaneu! În momentul confirmării plății (prin Card bancar, Crypto instant sau Sold portofel), campania pornește în 30-90 de secunde. Privitorii încep să intre conform opțiunii tale de viteză (ramp-up organic sau instant).'
        : 'Almost instantly! Upon payment confirmation, your campaign initiates within 30-90 seconds. Viewers ramp up smoothly based on your selected delivery curve.',
    },
    {
      q: language === 'ro' ? 'Cum funcționează plata integrată cu criptomonede (USDT, BTC)?' : 'How does integrated crypto payment work?',
      a: language === 'ro'
        ? 'Sistemul generează o adresă de portofel unică și cod QR pentru USDT (TRC20 & ERC20), Bitcoin, Ethereum sau Solana. Imediat ce transferul este detectat pe blockchain sau după introducerea TxID-ului, campania este activată automat fără asistență manuală.'
        : 'Our gateway generates dedicated addresses and QR codes for USDT, Bitcoin, Ethereum, and Solana. Once detected on-chain, campaigns activate automatically without delay.',
    },
    {
      q: language === 'ro' ? 'Ce diferență este între Privitorii Anonimi și Conturile Autentificate?' : 'What is the difference between Anonymous and Authenticated bots?',
      a: language === 'ro'
        ? 'Privitorii anonimi sporesc numărul total de utilizatori din cameră pentru a urca pe prima pagină. Conturile autentificate sunt utilizatori înregistrați cu istoric, care adaugă camera la favorite și oferă un scor de greutate mult mai mare în algoritmul Chaturbate.'
        : 'Anonymous viewers boost raw room headcount to climb frontpage rankings. Authenticated bots are registered accounts with viewing histories that favorite the room and boost algorithmic weighting.',
    },
    {
      q: language === 'ro' ? 'Oferiți suport tehnic dacă am întrebări?' : 'Is customer support available 24/7?',
      a: language === 'ro'
        ? 'Da, echipa noastră oferă asistență tehnică 24/7 prin Telegram (@glowstudio_vip) și panoul de asistență dedicat clienților.'
        : 'Yes, our engineering team provides round-the-clock priority support via Telegram and our dashboard.',
    },
  ];

  return (
    <section id="faq-section" className="py-20 border-b border-zinc-800/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {language === 'ro' ? 'Întrebări Frecvente' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/30 overflow-hidden transition-all backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed border-t border-zinc-800/60 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
