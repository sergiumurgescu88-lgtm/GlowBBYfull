import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, Upload, ArrowLeft, AlertCircle, CheckCircle, 
  XCircle, TrendingUp, Users, Activity 
} from 'lucide-react';

export default function ExcelAnalysis() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setFileName(file.name);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary', cellDates: true });
        
        const techCheckSheet = wb.Sheets['TECHNICAL DATA CHECK - API'];
        const modelPlatformSheet = wb.Sheets['MODEL x PLATFORM DETAIL'];
        
        let techCheckData = [];
        let modelPlatformData = [];

        if (techCheckSheet) {
          techCheckData = XLSX.utils.sheet_to_json(techCheckSheet, { defval: '' });
        }
        if (modelPlatformSheet) {
          modelPlatformData = XLSX.utils.sheet_to_json(modelPlatformSheet, { defval: '' });
        }

        // Fallback: dacă sheet-urile nu au numele exact, luăm primul sheet disponibil
        if (techCheckData.length === 0 && modelPlatformData.length === 0) {
           const firstSheetName = wb.SheetNames[0];
           modelPlatformData = XLSX.utils.sheet_to_json(wb.Sheets[firstSheetName], { defval: '' });
        }

        // Analizăm sănătatea tehnică (căutăm erori)
        const apiErrors = techCheckData.filter(row => row.Status === 'ERROR' || (row.Message && String(row.Message).includes('Error')));
        const apiOkCount = techCheckData.filter(row => row.Status === 'OK' || row.Status === 'OK_FULL').length;

        setData({
          techCheck: techCheckData,
          apiErrors,
          apiOkCount,
          modelPlatform: modelPlatformData,
          totalRecords: modelPlatformData.length + techCheckData.length
        });
      } catch (err) {
        console.error(err);
        setError('Eroare la procesarea fișierului. Asigură-te că este un raport Glow valid (.xlsx).');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
            Analiză Detaliată Raport Glow
          </h1>
          <p className="text-slate-400">
            Încarcă fișierul Excel exportat pentru a vizualiza performanța, sănătatea API-ului și detaliile pe platforme.
          </p>
        </div>

        {!data ? (
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-emerald-500/50 transition-colors bg-slate-900/50">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-300">Se procesează raportul complex...</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Trage fișierul Glow Report aici</h3>
                <p className="text-slate-400 mb-6">Format acceptat: .xlsx (Raport complet cu sheet-uri multiple)</p>
                <label className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors">
                  <FileSpreadsheet className="w-5 h-5" />
                  Selectează Fișierul Excel
                  <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
                </label>
                {error && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-red-400 bg-red-950/30 border border-red-500/30 p-4 rounded-lg max-w-md mx-auto">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* 1. CARDURI REZUMAT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SummaryCard icon={<Activity className="w-5 h-5 text-blue-400" />} label="Total Înregistrări Procesate" value={data.totalRecords.toLocaleString()} />
              <SummaryCard icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} label="Endpoint-uri API OK" value={data.apiOkCount.toLocaleString()} />
              <SummaryCard icon={<XCircle className="w-5 h-5 text-red-400" />} label="Erori API Detectate" value={data.apiErrors.length} highlight={data.apiErrors.length > 0} />
              <SummaryCard icon={<Users className="w-5 h-5 text-purple-400" />} label="Modele în Raport" value={data.modelPlatform.length > 0 ? 'Detaliat' : 'N/A'} />
            </div>

            {/* 2. ALERTĂ ERORI API (dacă există) */}
            {data.apiErrors.length > 0 && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Atenție: Erori de Conexiune API Detectate
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-red-900/20 text-red-200 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Model</th>
                        <th className="px-4 py-3">Platformă</th>
                        <th className="px-4 py-3">Endpoint</th>
                        <th className="px-4 py-3">Mesaj Eroare</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-500/20">
                      {data.apiErrors.map((err, idx) => (
                        <tr key={idx} className="text-red-300">
                          <td className="px-4 py-3 font-medium">{err.Model || '-'}</td>
                          <td className="px-4 py-3">{err.Platform || '-'}</td>
                          <td className="px-4 py-3">{err.Endpoint || '-'}</td>
                          <td className="px-4 py-3 text-red-400">{err.Message || 'Eroare necunoscută'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. TABEL DETALIAT MODEL x PLATFORMĂ */}
            {data.modelPlatform.length > 0 && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Detalii Model x Platformă
                  </h3>
                  <button 
                    onClick={() => { setData(null); setFileName(''); }}
                    className="text-sm text-slate-400 hover:text-white underline"
                  >
                    Încarcă alt raport
                  </button>
                </div>
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900/80 text-slate-300 uppercase text-xs sticky top-0 z-10">
                      <tr>
                        {Object.keys(data.modelPlatform[0]).map((key, i) => (
                          <th key={i} className="px-6 py-4 font-semibold whitespace-nowrap">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {data.modelPlatform.slice(0, 100).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-700/30 transition-colors">
                          {Object.values(row).map((val, colIndex) => (
                            <td key={colIndex} className="px-6 py-3 text-slate-300 whitespace-nowrap">
                              {val !== undefined && val !== null && val !== '' ? String(val) : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {data.modelPlatform.length > 100 && (
                  <div className="p-4 text-center text-sm text-slate-400 border-t border-slate-700 bg-slate-900/50">
                    Se afișează doar primele 100 de rânduri pentru performanță optimă. Total: {data.modelPlatform.length} rânduri.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, highlight = false }) {
  return (
    <div className={`rounded-xl p-4 flex flex-col items-center text-center border transition-colors ${highlight ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
      <div className={`mb-2 p-2 rounded-lg ${highlight ? 'bg-red-500/20' : 'bg-slate-900/50'}`}>{icon}</div>
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-lg font-bold ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}
