import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import PhotoGallery from '../components/PhotoGallery';
import VideoGallery from '../components/VideoGallery';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [model, setModel] = useState(null);
  const [history, setHistory] = useState([]);
  const [topMembers, setTopMembers] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [tab, setTab] = useState('overview');

  // Filtru Perioadă (Calendar)
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const [startDate, setStartDate] = useState(thirtyDaysAgo.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

  useEffect(() => { loadData(); }, [id, startDate, endDate]);

  const loadData = async () => {
    try {
      const params = { start_date: startDate, end_date: endDate };
      const [modelRes, membersRes, hourlyRes] = await Promise.all([
        axios.get(`/v1/models/${id}`, { params }),
        axios.get(`/v1/models/${id}/top-members`, { params }),
        axios.get(`/v1/models/${id}/hourly`, { params })
      ]);
      setModel(modelRes.data.model);
      setHistory(modelRes.data.history);
      setTopMembers(membersRes.data);
      setHourly(hourlyRes.data);
    } catch (err) {
      console.error("Eroare la încărcarea datelor:", err);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await axios.post(`/v1/models/${id}/analyze`);
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  if (!model) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Se încarcă...</div>;
  }

  const avgPerHour = model.total_hours > 0 ? Math.round(model.total_tokens / model.total_hours) : 0;
  const avgUSDPerHour = model.total_hours > 0 ? (model.total_usd / model.total_hours).toFixed(2) : 0;
  const chartData = history.slice().reverse();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-purple-400 hover:text-purple-300">← Înapoi</button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ✨ {model.name}
              </h1>
              <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded text-xs">{model.platform || 'N/A'}</span>
            </div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm">Deconectare</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* FILTRU PERIOADĂ (CALENDAR) - AȘEZAT EXACT AICI, ÎNAINTE DE EVOLUȚIE */}
        <div className="bg-gray-800 rounded-xl p-5 mb-6 border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-base font-bold text-white">Filtrare Perioadă Analiză:</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-xs text-gray-400 mb-1">Data Start</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
              <span className="text-gray-500 hidden sm:block mt-5">→</span>
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-xs text-gray-400 mb-1">Data End</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
              <button 
                onClick={loadData}
                className="mt-5 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm px-6 py-2.5 transition flex items-center justify-center gap-2 shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Aplică Filtrul
              </button>
            </div>
          </div>
        </div>

        {/* Carduri statistici */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Total Tokens</p>
            <p className="text-2xl font-bold text-white">{model.total_tokens?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Total USD</p>
            <p className="text-2xl font-bold text-green-400">${model.total_usd?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Total Ore</p>
            <p className="text-2xl font-bold text-white">{model.total_hours?.toFixed(1) || 0}h</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Medie / Oră (Tok)</p>
            <p className="text-2xl font-bold text-purple-400">{avgPerHour}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Medie / Oră (USD)</p>
            <p className="text-2xl font-bold text-green-400">${avgUSDPerHour}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6 overflow-x-auto border border-gray-700">
          <button onClick={() => setTab('overview')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'overview' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>📈 Evoluție</button>
          <button onClick={() => setTab('members')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'members' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>💎 Top Membri</button>
          <button onClick={() => setTab('hourly')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'hourly' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>⏰ Hourly Heatmap</button>
          <button onClick={() => setTab('schedule')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'schedule' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>📅 Program</button>
          <button onClick={() => setTab('photos')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'photos' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>🖼️ Poze</button>
          <button onClick={() => setTab('videos')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'videos' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>🎬 Video</button>
          <button onClick={() => setTab('ai')} className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${tab === 'ai' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>🤖 Sugestii AI</button>
        </div>

        {/* Conținut Tab-uri */}
        {tab === 'overview' && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
            <h3 className="text-lg font-bold mb-4">📈 Evoluție Venituri (Perioada Selectată)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                  <Line type="monotone" dataKey="tokens" stroke="#A855F7" strokeWidth={2} />
                  <Line type="monotone" dataKey="usd" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === 'members' && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
            <h3 className="text-lg font-bold mb-4">💎 Top Membri (Perioada Selectată)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-900">
                  <tr>
                    <th className="px-4 py-3">Membru</th>
                    <th className="px-4 py-3">Tokens</th>
                    <th className="px-4 py-3">USD</th>
                  </tr>
                </thead>
                <tbody>
                  {topMembers.map((m, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-medium text-white">{m.username}</td>
                      <td className="px-4 py-3 text-purple-400">{m.tokens?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-green-400">${m.usd?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'hourly' && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
            <h3 className="text-lg font-bold mb-4">⏰ Hourly Heatmap (Perioada Selectată)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                  <Bar dataKey="tokens" fill="#A855F7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">🤖 Sugestii AI pentru Creștere</h3>
              <button 
                onClick={handleAnalyze} 
                disabled={analyzing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {analyzing ? 'Se analizează...' : 'Generează Sugestii'}
              </button>
            </div>
            {suggestions.length > 0 ? (
              <ul className="space-y-3">
                {suggestions.map((s, i) => (
                  <li key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-gray-300 flex items-start gap-3">
                    <span className="text-purple-400 mt-1">💡</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">Apasă butonul pentru a genera sugestii bazate pe datele din perioada selectată.</p>
            )}
          </div>
        )}

        {(tab === 'photos' || tab === 'videos' || tab === 'schedule') && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 text-center text-gray-400">
            Secțiune în curs de dezvoltare pentru perioada selectată.
          </div>
        )}

      </main>
    </div>
  );
}
