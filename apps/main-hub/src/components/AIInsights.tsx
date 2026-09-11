import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, TrendingUp } from 'lucide-react';

export const AIInsights: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState('');

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('glowbby_token');
      const mockStats = {
        totalTokens: 1250,
        topTippers: ['UserVIP (500tk)', 'RegularFan (200tk)'],
        peakHours: ['21:00 - 23:00'],
        recentTips: 15
      };

      const response = await fetch('https://glowbby.online/v1/bot/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (token || '')
        },
        body: JSON.stringify({ stats: mockStats })
      });

      const data = await response.json();
      if (data.success) {
        setInsights(data.insights);
      } else {
        setError(data.error || 'Eroare la obținerea insight-urilor.');
      }
    } catch (err) {
      setError('Eroare de rețea. Verifică conexiunea la server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Strategic Insights</h3>
            <p className="text-xs text-indigo-200">Recomandări personalizate pentru creșterea veniturilor</p>
          </div>
        </div>
        <button
          onClick={fetchInsights}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
          {loading ? 'Se analizează datele...' : 'Generează Recomandări'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-300 bg-red-950/50 border border-red-500/30 p-4 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {insights.length > 0 && !loading && (
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-4 text-gray-100 text-sm bg-white/5 p-4 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-colors">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center text-sm font-bold border border-indigo-500/30">
                {index + 1}
              </span>
              <span className="leading-relaxed pt-1">{insight}</span>
            </li>
          ))}
        </ul>
      )}
      
      {insights.length === 0 && !loading && !error && (
        <div className="text-center py-8 border-2 border-dashed border-indigo-500/30 rounded-lg">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-50" />
          <p className="text-indigo-200 text-sm">Apasă butonul pentru a primi recomandări bazate pe AI.</p>
        </div>
      )}
    </div>
  );
};
