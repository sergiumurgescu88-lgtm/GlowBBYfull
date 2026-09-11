
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new Database('glowbby.db');

const users = [
    { username: 'Andrei', password: 'Andrei' },
    { username: 'Oana', password: 'Oana' },
    { username: 'Tavi', password: 'Tavi' }
];

const stmt = db.prepare('INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)');

for (const u of users) {
    const hash = bcrypt.hashSync(u.password, 10);
    const result = stmt.run(u.username, hash);
    console.log(`User ${u.username}:`, result.changes > 0 ? '✅ Adaugat cu succes!' : '⚠️ Exista deja.');
}
