import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Palette, Wand2, Rocket, Bot, Sparkles, FileSpreadsheet, 
  ChevronDown, ChevronUp, Users, Briefcase, Building2, LogOut, ExternalLink 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const apps = [
    {
      id: 'messages',
      title: '💬 Send Messages',
      shortDesc: 'Automatizează comunicarea și gestionează fanii eficient.',
      href: 'https://chat.glowbby.online',
      icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
      gradient: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/50',
      benefits: {
        model: 'Răspunde automat fanilor și menține conexiunea chiar și când ești offline, crescând veniturile pasive.',
        trainer: 'Monitorizează rata de conversie, optimizează scripturile de vânzare și gestionează crizele rapid.',
        studio: 'Gestionează comunicarea pentru sute de conturi dintr-un singur panou centralizat.'
      }
    },
    {
      id: 'content',
      title: '🎨 Creează Content',
      shortDesc: 'Editor foto/video AI și library media pentru conținut viral.',
      href: 'https://media.glowbby.online',
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/50',
      benefits: {
        model: 'Editează foto/video rapid cu filtre trending și efecte AI, fără skill-uri avansate.',
        trainer: 'Asigură o calitate vizuală constantă, aprobă materialele ușor și menține branding-ul.',
        studio: 'Centralizează biblioteca media, protejează asset-urile și reutilizează conținutul eficient.'
      }
    },
    {
      id: 'profile',
      title: '🖌️ Profile Designer',
      shortDesc: 'Optimizare profil, SEO și design pentru vizibilitate maximă.',
      href: 'https://profile.glowbby.online',
      icon: <Wand2 className="w-8 h-8 text-emerald-400" />,
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/50',
      benefits: {
        model: 'Atrage mai mulți fani organic cu un profil optimizat, bio captivant și tag-uri strategice.',
        trainer: 'Setează standarde de calitate, fă A/B testing pe descrieri și monitorizează impactul.',
        studio: 'Uniformizează prezența online a tuturor modelelor și crește autoritatea brandului.'
      }
    },
    {
      id: 'traffic',
      title: '🚀 Get Traffic',
      shortDesc: 'Unelte de promovare, link-uri și strategii de creștere.',
      href: 'https://studio.glowbby.online',
      icon: <Rocket className="w-8 h-8 text-indigo-400" />,
      gradient: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/20 hover:border-indigo-500/50',
      benefits: {
        model: 'Crește-ți baza de fani rapid cu link-uri inteligente și integrări social media.',
        trainer: 'Dezvoltă strategii de creștere bazate pe date și analizează sursele de trafic.',
        studio: 'Expandează reach-ul studio-ului, cucerește nișe noi și diversifică audiența.'
      }
    },
    {
      id: 'glowbot',
      title: '🤖 GlowBot',
      shortDesc: 'AI Insights, automatizări smart și dashboard live.',
      href: 'https://app.glowbby.online',
      icon: <Bot className="w-8 h-8 text-fuchsia-400" />,
      gradient: 'from-fuchsia-500/10 to-violet-500/10 border-fuchsia-500/20 hover:border-fuchsia-500/50',
      benefits: {
        model: 'Generează venituri pasive prin automatizări, raffle-uri și loializarea fanilor.',
        trainer: 'Primește date în timp real, predicții de venituri și alerte de oportunități.',
        studio: 'Control total prin KPIs live, monitorizare 24/7 și rapoarte automate de performanță.'
      }
    },
    {
      id: 'glow',
      title: '✨ I want to Glow',
      shortDesc: 'Recrutare, training și obiective de carieră.',
      href: 'https://jobs.glowbby.online',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/50',
      benefits: {
        model: 'Accesează cursuri, mentorat și planuri de carieră pentru a-ți maximiza potențialul.',
        trainer: 'Gestionează talent pool-ul, setează obiective și monitorizează progresul echipei.',
        studio: 'Optimizează resursele umane, recrutează talent proaspăt și crește organic.'
      }
    },
    {
      id: 'excel',
      title: '📊 Analiză Excel Modele',
      shortDesc: 'Rapoarte financiare, KPIs și vizualizare date avansată.',
      href: '/analiza',
      icon: <FileSpreadsheet className="w-8 h-8 text-rose-400" />,
      gradient: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 hover:border-rose-500/50',
      benefits: {
        model: 'Transparență totală: vezi exact câți bani faci, unde și cum să îmbunătățești.',
        trainer: 'Evaluează performanța individuală, calculează bonusuri și identifică trendurile.',
        studio: 'Contabilitate simplificată, forecast-uri financiare și rapoarte de profitabilitate.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090b10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                ✨ Glowbby CRM
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300 hidden md:block">Bun venit, Oana</span>
              <button 
                onClick={() => { localStorage.removeItem('glowbby_token'); navigate('/'); }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Deconectare</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Centrul de Comandă Glowbby</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Accesează toate uneltele studio-ului tău dintr-un singur loc. 
            Fiecare aplicație este optimizată pentru a crește veniturile și eficiența.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div 
              key={app.id}
              className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br ${app.gradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                    {app.icon}
                  </div>
                  {/* BUTONUL VIZIBIL PENTRU DETALII */}
                  <button 
                    onClick={() => toggleExpand(app.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border ${
                      expandedId === app.id 
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20' 
                        : 'bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700 hover:text-white hover:border-slate-500'
                    }`}
                  >
                    {expandedId === app.id ? 'Ascunde' : 'Vezi Detalii'}
                    {expandedId === app.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                  {app.shortDesc}
                </p>

                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedId === app.id ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <BenefitItem icon={<Users className="w-4 h-4 text-blue-400" />} role="Pentru Modele" text={app.benefits.model} />
                    <BenefitItem icon={<Briefcase className="w-4 h-4 text-emerald-400" />} role="Pentru Traineri" text={app.benefits.trainer} />
                    <BenefitItem icon={<Building2 className="w-4 h-4 text-purple-400" />} role="Pentru Studio" text={app.benefits.studio} />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black/20 border-t border-white/5">
                <a 
                  href={app.href}
                  target={app.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-all group-hover:bg-white/10"
                >
                  {app.href.startsWith('http') ? <ExternalLink className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                  Deschide Aplicația
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function BenefitItem({ icon, role, text }) {
  return (
    <div className="flex gap-3 text-sm">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <span className="font-semibold text-slate-200 block text-xs uppercase tracking-wider mb-0.5">{role}</span>
        <p className="text-slate-400 leading-snug">{text}</p>
      </div>
    </div>
  );
}
