const XLSX = require('xlsx');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Găsim și înlocuim endpoint-ul existent
const fs = require('fs');
let serverContent = fs.readFileSync('server.js', 'utf8');

// Ștergem endpoint-ul vechi (totul între comentariile MODULE MODELE)
const startIndex = serverContent.indexOf('// ═══════════════════════════════════════════\n// MODULE MODELE');
const endIndex = serverContent.indexOf('// ═══════════════════════════════════════════\n// MOTOR ANALIZĂ AI');

if (startIndex !== -1 && endIndex !== -1) {
  serverContent = serverContent.substring(0, startIndex) + serverContent.substring(endIndex);
}

// Adăugăm endpoint-ul nou, mai robust
const newEndpoint = `
// ═══════════════════════════════════════════
// MODULE MODELE ȘI IMPORT EXCEL (VERSÎUNE ÎMBUNĂTĂȚITĂ)
// ═══════════════════════════════════════════
const multer = require('multer');
const XLSX = require('xlsx');
const upload = multer({ storage: multer.memoryStorage() });

// POST: Import Excel cu debug și validări
app.post('/v1/models/import', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      console.log('❌ Niciun fișier uploadat');
      return res.status(400).json({ error: 'Niciun fișier uploadat' });
    }

    console.log('📥 Fișier primit:', req.file.originalname, 'Size:', req.file.size, 'bytes');

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    console.log('📊 Sheet-uri găsite:', workbook.sheetNames);

    const results = { 
      models: 0, 
      stats: 0, 
      sheets: [],
      errors: [],
      sampleData: []
    };

    if (workbook.sheetNames.length === 0) {
      return res.status(400).json({ error: 'Fișierul Excel nu conține niciun sheet' });
    }

    workbook.sheetNames.forEach(sheetName => {
      console.log('\\n📄 Procesăm sheet:', sheetName);
      
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      
      console.log('📋 Rânduri găsite:', data.length);
      
      if (!data || data.length === 0) {
        console.log('⚠️ Sheet gol:', sheetName);
        results.errors.push(\`Sheet "\${sheetName}" este gol\`);
        return;
      }

      // Salvăm primele 3 rânduri pentru debug
      results.sampleData.push({
        sheet: sheetName,
        sample: data.slice(0, 3)
      });

      console.log('🔍 Primul rând:', JSON.stringify(data[0], null, 2));

      results.sheets.push({ name: sheetName, rows: data.length });
      
      const insertModel = db.prepare(\`
        INSERT INTO models (name, platform, status, trainer, notes) 
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET 
          platform = excluded.platform,
          trainer = excluded.trainer,
          notes = excluded.notes
      \`);
      
      const insertStats = db.prepare(\`
        INSERT INTO model_stats (model_id, date, tokens, hours, tips, private_shows)
        VALUES (?, ?, ?, ?, ?, ?)
      \`);

      data.forEach((row, index) => {
        try {
          // Debug: logăm fiecare rând
          if (index < 3) {
            console.log(\`\\nRând \${index + 1}:\`, row);
          }

          // Flexibil: acceptăm diverse denumiri de coloane (case-insensitive)
          const rowLower = Object.keys(row).reduce((acc, key) => {
            acc[key.toLowerCase()] = row[key];
            return acc;
          }, {});

          const name = row.Name || row.Nume || row.Model || row['Model Name'] || row.name || row.nume || row.model || sheetName;
          const platform = row.Platform || row.Site || row.platform || row.site || 'unknown';
          const trainer = row.Trainer || row.Manager || row.trainer || row.manager || '';
          const notes = row.Notes || row.Notite || row.notes || row.notite || '';
          
          // Parse numeric values (handle strings, empty, etc)
          const tokens = parseFloat(row.Tokens || row.Tokeni || row.Earnings || row.tokens || row.tokeni || row.earnings || 0) || 0;
          const hours = parseFloat(row.Hours || row.Ore || row['Online Hours'] || row.hours || row.ore || 0) || 0;
          const tips = parseFloat(row.Tips || row.Bacșiș || row.Bacsisi || row.tips || row.bacsis || 0) || 0;
          const privateShows = parseInt(row['Private Shows'] || row.Private || row.private || 0) || 0;
          const date = row.Date || row.Data || row.date || row.data || new Date().toISOString().split('T')[0];
          
          if (!name || name === sheetName) {
            console.log(\`⚠️ Rând \${index + 1} ignorat: nume lipsă\`);
            return;
          }

          if (index < 3) {
            console.log(\`✅ Extras: name="\${name}", platform="\${platform}", tokens=\${tokens}, hours=\${hours}\`);
          }
          
          // Inserează model (sau update)
          const result = insertModel.run(name, platform, 'active', trainer, notes);
          const modelId = result.lastInsertRowid || 
            db.prepare('SELECT id FROM models WHERE name = ?').get(name)?.id;
          
          // Inserează statistici dacă avem date numerice
          if (tokens > 0 || hours > 0 || tips > 0) {
            insertStats.run(modelId, date, tokens, hours, tips, privateShows);
            results.stats++;
          }
          results.models++;
        } catch (rowErr) {
          console.error(\`❌ Eroare la rând \${index + 1}:\`, rowErr.message);
          results.errors.push(\`Rând \${index + 1}: \${rowErr.message}\`);
        }
      });
    });

    console.log('\\n✅ Import complet:', results);

    res.json({ 
      ok: true, 
      message: \`Import reușit! Modele: \${results.models}, Statistici: \${results.stats}\`,
      results
    });
  } catch (err) {
    console.error('❌ Eroare import completă:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ 
      error: 'Eroare la procesare: ' + err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// GET: Lista tuturor modelelor cu statistici agregate
app.get('/v1/models', authenticateToken, (req, res) => {
  const models = db.prepare(\`
    SELECT 
      m.id, m.name, m.platform, m.status, m.trainer, m.notes,
      COALESCE(SUM(s.tokens), 0) as total_tokens,
      COALESCE(SUM(s.hours), 0) as total_hours,
      COALESCE(SUM(s.tips), 0) as total_tips,
      COUNT(s.id) as stats_count
    FROM models m
    LEFT JOIN model_stats s ON m.id = s.model_id
    GROUP BY m.id
    ORDER BY m.name
  \`).all();
  res.json(models);
});

// GET: Statistici agregate pentru dashboard
app.get('/v1/stats/summary', authenticateToken, (req, res) => {
  const totalModels = db.prepare('SELECT COUNT(*) as count FROM models').get().count;
  const totalTokens = db.prepare('SELECT COALESCE(SUM(tokens), 0) as sum FROM model_stats').get().sum;
  const totalHours = db.prepare('SELECT COALESCE(SUM(hours), 0) as sum FROM model_stats').get().sum;
  
  res.json({
    totalModels,
    activeModels: totalModels,
    totalTokens: Math.round(totalTokens),
    totalHours: Math.round(totalHours * 10) / 10,
    avgTokensPerHour: totalHours > 0 ? Math.round(totalTokens / totalHours) : 0
  });
});

`;

// Inserăm noul endpoint
serverContent = serverContent.replace(
  '// ═══════════════════════════════════════════\n// MOTOR ANALIZĂ AI',
  newEndpoint + '\n// ═══════════════════════════════════════════\n// MOTOR ANALIZĂ AI'
);

fs.writeFileSync('server.js', serverContent);
console.log('✅ server.js actualizat cu endpoint îmbunătățit');
