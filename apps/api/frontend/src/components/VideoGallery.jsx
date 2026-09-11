import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function VideoGallery({ modelId, modelName }) {
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const load = async () => {
    try {
      const res = await axios.get(`/v1/models/${modelId}/media`);
      setVideos(res.data.videos || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [modelId]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    files.forEach(f => fd.append('files', f));
    try {
      await axios.post(`/v1/models/${modelId}/upload-video`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      await load();
    } catch (err) {
      alert('Eroare upload video: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Ștergi acest video?')) return;
    try {
      await axios.delete(`/v1/models/${modelId}/media/videos/${encodeURIComponent(filename)}`);
      await load();
    } catch (err) { alert('Eroare ștergere: ' + (err.response?.data?.error || err.message)); }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🎬 Galerie video — {modelName} ({videos.length})</h2>
        <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
          {uploading ? '⏳ Se urcă...' : '📤 Urcă video'}
          <input ref={inputRef} type="file" accept="video/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {videos.length === 0 ? (
        <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center bg-gray-900">
          <div className="text-5xl mb-3">🎥</div>
          <div className="font-semibold">Niciun video încă</div>
          <p className="text-gray-400 text-sm mt-2">Apasă „📤 Urcă video" pentru a adăuga clipuri pentru {modelName}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map(v => (
            <div key={v.filename} className="relative group bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <video src={v.url} controls preload="metadata" className="w-full h-64 bg-black" />
              <button
                onClick={() => handleDelete(v.filename)}
                className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
              >
                🗑️ Șterge
              </button>
              <div className="px-2 py-1 text-xs text-gray-500 truncate">{v.filename} · {(v.size / 1024 / 1024).toFixed(1)} MB</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
