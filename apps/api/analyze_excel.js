const XLSX = require('xlsx');
const path = require('path');

const excelPath = process.argv[2];

if (!excelPath) {
  console.log('Usage: node analyze_excel.js <path-to-excel.xlsx>');
  process.exit(1);
}

console.log(`📊 Analizăm: ${excelPath}\n`);

try {
  const workbook = XLSX.readFile(excelPath, { cellDates: true });
  
  console.log(`✅ Total sheet-uri: ${workbook.SheetNames.length}\n`);
  console.log('═'.repeat(80));
  
  workbook.SheetNames.forEach((sheetName, index) => {
    console.log(`\n${index + 1}. SHEET: "${sheetName}"`);
    console.log('─'.repeat(80));
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.log('   ⚠️  Sheet gol sau invalid');
      return;
    }
    
    // Convertim la JSON pentru analiză
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: null });
    
    if (!data || data.length === 0) {
      console.log('   ⚠️  Sheet gol (0 rânduri)');
      return;
    }
    
    console.log(`   📋 Total rânduri: ${data.length}`);
    
    // Găsim header-ul (primul rând cu date)
    let headerRow = null;
    let headerIndex = -1;
    
    for (let i = 0; i < Math.min(10, data.length); i++) {
      const row = data[i];
      if (row && row.length > 0 && row.some(cell => cell !== null && cell !== undefined)) {
        // Verificăm dacă pare un header (conține cuvinte cheie)
        const firstCell = String(row[0] || '').toLowerCase();
        if (firstCell.includes('model') || firstCell.includes('date') || firstCell.includes('name') || 
            firstCell.includes('platform') || firstCell.includes('time') || firstCell.includes('member')) {
          headerRow = row;
          headerIndex = i;
          break;
        }
      }
    }
    
    if (!headerRow) {
      // Dacă nu găsim header clar, folosim primul rând
      headerRow = data[0];
      headerIndex = 0;
    }
    
    console.log(`   📍 Header la rândul: ${headerIndex + 1}`);
    console.log(`   📊 Coloane (${headerRow.length}):`);
    
    // Afișăm coloanele
    headerRow.forEach((col, idx) => {
      if (col !== null && col !== undefined && String(col).trim() !== '') {
        console.log(`      ${idx + 1}. ${col}`);
      }
    });
    
    // Afișăm 2-3 rânduri exemplu
    console.log(`\n   📄 Rânduri exemplu (primele 2 după header):`);
    for (let i = headerIndex + 1; i < Math.min(headerIndex + 3, data.length); i++) {
      const row = data[i];
      if (!row) continue;
      
      console.log(`\n      Rând ${i + 1}:`);
      row.forEach((cell, idx) => {
        if (cell !== null && cell !== undefined && headerRow[idx]) {
          const colName = String(headerRow[idx]).substring(0, 20).padEnd(20);
          const cellValue = String(cell).substring(0, 50);
          console.log(`         ${colName} = ${cellValue}`);
        }
      });
    }
    
    console.log('\n' + '═'.repeat(80));
  });
  
  console.log('\n✅ Analiză completă!\n');
  
} catch (err) {
  console.error('❌ Eroare la citirea Excel-ului:', err.message);
  console.error(err.stack);
  process.exit(1);
}
