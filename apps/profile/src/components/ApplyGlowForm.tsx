import React, { useState } from 'react';
import { Sparkles, Heart, Shield, Lock, MapPin, Phone, User, CheckCircle2, MessageCircle, Send } from 'lucide-react';

export const ApplyGlowForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [desire, setDesire] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="apply-form" className="py-20 bg-[#0B0F19] relative overflow-hidden border-b border-slate-800">
      {/* Background glow styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-pink-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle top decoration bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-semibold mb-4">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Hai în Echipa Glow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              I want to Glow <span className="text-pink-400">💖</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Fă primul pas către independența ta financiară. Conversație 100% confidențială, fără nicio obligație.
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Felicitări, {fullName}!</h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Cererea ta a fost înregistrată în deplină siguranță. Un manager dedicat <span className="text-violet-400 font-semibold">Glow Models</span> te va contacta confidențial prin telefon/WhatsApp în cel mai scurt timp.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhoneNumber('');
                    setDesire('');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Trimite alt mesaj
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
              {/* Numele Tău */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-violet-400" />
                  <span>Numele Tău</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Elena / Maya"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Număr de Telefon */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>Număr de Telefon</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="07xx xxx xxx (apel sau WhatsApp)"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  Numărul tău nu va fi niciodată partajat sau făcut public.
                </p>
              </div>

              {/* Ce îți dorești cel mai mult? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ce îți dorești cel mai mult?</span>
                </label>
                <textarea
                  value={desire}
                  onChange={(e) => setDesire(e.target.value)}
                  rows={3}
                  placeholder="ex: Caut independență financiară rapidă, confidențialitate absolută cu geoblocare România și program flexibil..."
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="apply-form-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-violet-600 via-pink-600 to-fuchsia-600 hover:from-violet-500 hover:via-pink-500 hover:to-fuchsia-500 active:scale-[0.98] shadow-xl shadow-pink-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Se trimite cererea...' : 'Vreau să fiu contactată'}</span>
              </button>

              {/* Trust badges */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Confidențialitate Garantată</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-violet-400" />
                  <span>NDA Legal Strict</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>Strada Cuza Vodă, Sector 4, București</span>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
