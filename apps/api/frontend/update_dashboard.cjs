const fs = require('fs');
const path = 'src/pages/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('/analiza')) {
  const analizaCard = \`            <a href="/analiza" className="group relative flex flex-col p-6 rounded-2xl border bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-spreadsheet w-8 h-8 text-emerald-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                📊 Analiză Excel Modele
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Încarcă raportul Excel pentru a vizualiza și analiza rapid performanța.
              </p>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Deschide analizorul
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>\`;
  
  content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">',
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n' + analizaCard
  );
  
  fs.writeFileSync(path, content);
  console.log('✅ Dashboard.jsx actualizat cu cardul de Analiză');
} else {
  console.log('ℹ️ Cardul de Analiză este deja în Dashboard.jsx');
}
