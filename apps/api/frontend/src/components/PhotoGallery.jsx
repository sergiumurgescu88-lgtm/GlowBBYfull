import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function PhotoGallery({ modelId, modelName }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const load = async () => {
    try {
      const res = await axios.get(`/v1/models/${modelId}/media`);
      setPhotos(res.data.photos || []);
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
      await axios.post(`/v1/models/${modelId}/upload-photo`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      await load();
    } catch (err) {
      alert('Eroare upload poze: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Ștergi această poză?')) return;
    try {
      await axios.delete(`/v1/models/${modelId}/media/photos/${encodeURIComponent(filename)}`);
      await load();
    } catch (err) { alert('Eroare ștergere: ' + (err.response?.data?.error || err.message)); }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🖼️ Galerie poze — {modelName} ({photos.length})</h2>
        <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
          {uploading ? '⏳ Se urcă...' : '📤 Urcă poze'}
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {photos.length === 0 ? (
        <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center bg-gray-900">
          <div className="text-5xl mb-3">📷</div>
          <div className="font-semibold">Nicio poză încă</div>
          <p className="text-gray-400 text-sm mt-2">Apasă „📤 Urcă poze" pentru a adăuga fotografii pentru {modelName}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map(p => (
            <div key={p.filename} className="relative group bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <img src={p.url} alt={p.filename} className="w-full h-48 object-cover" />
              <button
                onClick={() => handleDelete(p.filename)}
                className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
              >
                🗑️ Șterge
              </button>
              <div className="px-2 py-1 text-xs text-gray-500 truncate">{p.filename}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
