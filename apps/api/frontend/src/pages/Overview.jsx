import { useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Overview() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('/v1/overview-all').then(r => setRows(r.data)).catch(console.error);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-purple-400 hover:text-purple-300">← Dashboard</button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📋 Analiză Studio</h1>
            </div>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg text-sm">Deconectare</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-3 py-3 text-left text-xs text-gray-400 uppercase">#</th>
                <th className="px-3 py-3 text-left text-xs text-gray-400 uppercase">Model</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">Income</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">$/h Efectiv</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">Ore</th>
                <th className="px-3 py-3 text-left text-xs text-gray-400 uppercase">Site Principal</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">Share</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">Best Hour</th>
                <th className="px-3 py-3 text-right text-xs text-gray-400 uppercase">Repeat</th>
                <th className="px-3 py-3 text-left text-xs text-gray-400 uppercase">Retenție</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {rows.map(r => (
                <Fragment key={r.model_name}>
                  <tr className="hover:bg-gray-700/50 cursor-pointer" onClick={() => setExpanded(expanded === r.model_name ? null : r.model_name)}>
                    <td className="px-3 py-3 font-bold">{r.rank}</td>
                    <td className="px-3 py-3">
                      {r.model_id ? (
                        <Link to={`/model/${r.model_id}`} onClick={e => e.stopPropagation()} className="text-purple-400 hover:text-purple-300 font-semibold">{r.model_name}</Link>
                      ) : r.model_name}
                      {r.concentration_risk === 1 && <span className="ml-2 text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded">⚠️ concentrare</span>}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-green-400">${(r.income_usd || 0).toLocaleString()}</td>
                    <td className="px-3 py-3 text-right font-semibold text-yellow-400">${(r.effective_usd_per_h || 0).toFixed(2)}</td>
                    <td className="px-3 py-3 text-right text-gray-300">{(r.real_hours || 0).toFixed(0)}</td>
                    <td className="px-3 py-3">{r.primary_site}</td>
                    <td className="px-3 py-3 text-right">{(r.primary_share || 0).toFixed(0)}%</td>
                    <td className="px-3 py-3 text-right text-blue-300">{r.best_hour || '-'}</td>
                    <td className="px-3 py-3 text-right">{r.repeat_rate != null ? r.repeat_rate + '%' : '-'}</td>
                    <td className="px-3 py-3">
                      {r.retention === 'buna' ? <span className="text-green-400">✅ bună</span> : r.retention === 'slaba' ? <span className="text-red-400">❌ slabă</span> : '-'}
                    </td>
                  </tr>
                  {expanded === r.model_name && (
                    <tr className="bg-gray-900/60">
                      <td colSpan="10" className="px-6 py-4">
                        <div className="text-xs text-gray-400 uppercase mb-1">📝 Trainer Readout</div>
                        <p className="text-sm text-gray-200 whitespace-pre-wrap">{r.trainer_readout}</p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-sm mt-3">💡 Click pe un rând pentru a vedea Trainer Readout-ul complet.</p>
      </main>
    </div>
  );
}
