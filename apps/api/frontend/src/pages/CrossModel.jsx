import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function CrossModel() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tab, setTab] = useState('cross');
  const [crossSpenders, setCrossSpenders] = useState([]);
  const [loyalSpenders, setLoyalSpenders] = useState([]);
  const [stats, setStats] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [memberModels, setMemberModels] = useState([]);
  const [minModels, setMinModels] = useState(2);

  useEffect(() => {
    axios.get('/v1/cross-vs-loyal-stats').then(r => setStats(r.data)).catch(console.error);
    loadLoyal();
  }, []);

  useEffect(() => {
    loadCross();
  }, [minModels]);

  const loadCross = async () => {
    try {
      const res = await axios.get(`/v1/cross-model-spenders?minModels=${minModels}`);
      setCrossSpenders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadLoyal = async () => {
    try {
      const res = await axios.get('/v1/loyal-spenders');
      setLoyalSpenders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpand = async (member) => {
    if (expanded === member) {
      setExpanded(null);
      return;
    }
    try {
      const res = await axios.get(`/v1/member/${encodeURIComponent(member)}/models`);
      setMemberModels(res.data);
      setExpanded(member);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const crossCount = stats.cross_model?.members || 0;
  const loyalCount = stats.loyal?.members || 0;
  const totalMembers = crossCount + loyalCount;
  const crossPercent = totalMembers > 0 ? ((crossCount / totalMembers) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-purple-400 hover:text-purple-300">← Dashboard</button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎯 Analiză Cross-Model
              </h1>
            </div>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg text-sm">Deconectare</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Carduri statistici */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-green-200 text-xs font-medium uppercase">Membri Cross-Model</h3>
            <p className="text-3xl font-bold mt-2">{crossCount}</p>
            <p className="text-green-300 text-sm mt-1">{crossPercent}% din total</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-purple-200 text-xs font-medium uppercase">Membri Loiali (1 model)</h3>
            <p className="text-3xl font-bold mt-2">{loyalCount}</p>
            <p className="text-purple-300 text-sm mt-1">{(100 - crossPercent).toFixed(1)}% din total</p>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-pink-200 text-xs font-medium uppercase">Total cheltuit cross</h3>
            <p className="text-3xl font-bold mt-2">${(stats.cross_model?.total_spend || 0).toLocaleString()}</p>
            <p className="text-pink-300 text-sm mt-1">Medie: ${(stats.cross_model?.avg_spend || 0).toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-indigo-200 text-xs font-medium uppercase">Total cheltuit loial</h3>
            <p className="text-3xl font-bold mt-2">${(stats.loyal?.total_spend || 0).toLocaleString()}</p>
            <p className="text-indigo-300 text-sm mt-1">Medie: ${(stats.loyal?.avg_spend || 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Alertă strategică */}
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h3 className="font-semibold text-yellow-300">Strategie recomandată</h3>
              <p className="text-sm text-yellow-200 mt-1">
                Membrii <strong>cross-model</strong> sunt valoroși - pot fi direcționați către modele noi sau sub-performante.
                Membrii <strong>loiali unui singur model</strong> sunt un risc - dacă modelul pleacă, pierzi și membrul.
                Consideră să "deturnezi" strategic membrii loiali către alte modele din studio.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setTab('cross')}
            className={`px-4 py-2 font-medium transition ${tab === 'cross' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
          >
            🎯 Cross-Model ({crossCount})
          </button>
          <button
            onClick={() => setTab('loyal')}
            className={`px-4 py-2 font-medium transition ${tab === 'loyal' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            🔒 Loiali (1 model) ({loyalCount})
          </button>
        </div>

        {/* Tab Cross-Model */}
        {tab === 'cross' && (
          <>
            <div className="mb-4 flex items-center space-x-3">
              <label className="text-sm text-gray-400">Minim modele:</label>
              <select
                value={minModels}
                onChange={(e) => setMinModels(parseInt(e.target.value))}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm"
              >
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
              <span className="text-sm text-gray-500">Afișate: {crossSpenders.length}</span>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Membru</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase"># Modele</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase">Total USD</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase">Tips</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Modele</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {crossSpenders.map((s, idx) => (
                    <Fragment key={s.member}>
                      <tr className="hover:bg-gray-700/50 cursor-pointer" onClick={() => handleExpand(s.member)}>
                        <td className="px-4 py-3">
                          <span className="font-bold text-gray-500 mr-2">{idx + 1}</span>
                          <span className="font-semibold">{s.member}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded text-sm font-semibold">
                            {s.models_count}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-green-400">${(s.total_spend || 0).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-pink-400">{s.total_tips || 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {s.models.slice(0, 4).map(m => (
                              <span key={m} className="bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded text-xs">{m}</span>
                            ))}
                            {s.models.length > 4 && (
                              <span className="text-xs text-gray-500">+{s.models.length - 4}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expanded === s.member && (
                        <tr className="bg-gray-900/60">
                          <td colSpan="5" className="px-6 py-4">
                            <div className="text-xs text-gray-400 uppercase mb-2">Detalii per model:</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {memberModels.map(m => (
                                <div key={m.model_name} className="bg-gray-800 rounded p-3 border border-gray-700">
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-purple-300">{m.model_name}</span>
                                    <span className="text-green-400 font-bold">${(m.total_spend || 0).toFixed(2)}</span>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    Tips: {m.total_tips} · Zile: {m.active_days} · {m.scope}/{m.type}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab Loiali */}
        {tab === 'loyal' && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Membru</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Model (unic)</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase">Total USD</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase">Tips</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase">Zile</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Tip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loyalSpenders.slice(0, 100).map((s, idx) => (
                  <tr key={s.member} className="hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-500 mr-2">{idx + 1}</span>
                      <span className="font-semibold">{s.member}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-sm">{s.model_name}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-purple-400">${(s.total_spend || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-pink-400">{s.total_tips || 0}</td>
                    <td className="px-4 py-3 text-right text-gray-300">{s.active_days || 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        s.type === 'regular' ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'
                      }`}>{s.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
