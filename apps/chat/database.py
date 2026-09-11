import sqlite3
import re
from datetime import datetime

class KnowledgeBase:
    def __init__(self, db_path='knowledge.db'):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                member_id INTEGER,
                platform TEXT,
                raw_text TEXT,
                language TEXT,
                context_tags TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS members (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                platform TEXT,
                member_type TEXT,
                spending_history REAL DEFAULT 0,
                preferred_language TEXT,
                successful_strategies TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                conversation_id INTEGER,
                sender TEXT,
                text TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                conversion_result TEXT,
                effectiveness_score INTEGER DEFAULT 0,
                FOREIGN KEY (conversation_id) REFERENCES conversations(id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS personas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                style TEXT,
                voice_examples TEXT,
                pricing_strategy TEXT,
                cultural_notes TEXT,
                rules TEXT
            )
        ''')

        self.conn.commit()

    # ─────────────────────────────
    # MEMBRI
    # ─────────────────────────────
    def get_or_create_member(self, username, platform='onlyfans'):
        """Găsește membrul sau îl creează dacă e prima interacțiune."""
        if not username:
            return None
        cursor = self.conn.cursor()
        cursor.execute('SELECT id FROM members WHERE username = ?', (username,))
        row = cursor.fetchone()
        if row:
            return row['id']
        cursor.execute('''
            INSERT INTO members (username, platform, member_type, preferred_language)
            VALUES (?, ?, 'nou', 'auto')
        ''', (username, platform))
        self.conn.commit()
        return cursor.lastrowid

    def get_member_context(self, username):
        if not username:
            return None
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM members WHERE username = ?', (username,))
        return cursor.fetchone()

    # ─────────────────────────────
    # CONVERSAȚII & MESAJE
    # ─────────────────────────────
    def add_conversation(self, member_id, platform, raw_text, language='auto'):
        cursor = self.conn.cursor()
        if language == 'auto':
            language = self.detect_language(raw_text)
        cursor.execute('''
            INSERT INTO conversations (member_id, platform, raw_text, language)
            VALUES (?, ?, ?, ?)
        ''', (member_id, platform, raw_text, language))
        conv_id = cursor.lastrowid
        self.conn.commit()
        return conv_id

    def add_message(self, conversation_id, sender, text, conversion_result=None, score=0):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO messages (conversation_id, sender, text, conversion_result, effectiveness_score)
            VALUES (?, ?, ?, ?, ?)
        ''', (conversation_id, sender, text, conversion_result, score))
        self.conn.commit()
        return cursor.lastrowid

    def get_successful_examples(self, language, limit=3):
        """Exemple de mesaje AI cu scor mare, filtrate după limba conversației.
        (fix: căuta anterior în coloana greșită context_tags în loc de language)"""
        cursor = self.conn.cursor()
        cursor.execute('''
            SELECT m.text, m.effectiveness_score, m.conversion_result
            FROM messages m
            JOIN conversations c ON m.conversation_id = c.id
            WHERE m.effectiveness_score > 70
            AND c.language = ?
            ORDER BY m.effectiveness_score DESC
            LIMIT ?
        ''', (language, limit))
        return cursor.fetchall()

    def detect_language(self, text):
        italian_words = ['ciao', 'bella', 'tesoro', 'amore', 'sei', 'che', 'molto']
        spanish_words = ['hola', 'bonita', 'amor', 'eres', 'que', 'mucho']
        text_lower = text.lower()
        it_count = sum(1 for w in italian_words if w in text_lower)
        es_count = sum(1 for w in spanish_words if w in text_lower)
        if it_count > es_count and it_count > 0:
            return 'italian'
        elif es_count > it_count and es_count > 0:
            return 'spanish'
        return 'english'

    # ─────────────────────────────
    # FEEDBACK / SCORING
    # ─────────────────────────────
    def _extract_amount(self, conversion_result):
        if not conversion_result or conversion_result == 'no_sale':
            return 0.0
        m = re.search(r'(\d+(\.\d+)?)', conversion_result)
        return float(m.group(1)) if m else 0.0

    def update_member_score(self, conversation_id, message_id, score, conversion_result):
        """Actualizează scorul mesajului + agregă statisticile membrului asociat."""
        cursor = self.conn.cursor()
        cursor.execute('''
            UPDATE messages SET effectiveness_score = ?, conversion_result = ?
            WHERE id = ?
        ''', (score, conversion_result, message_id))
        self.conn.commit()

        cursor.execute('''
            SELECT c.member_id, m.text
            FROM messages m
            JOIN conversations c ON m.conversation_id = c.id
            WHERE m.id = ?
        ''', (message_id,))
        row = cursor.fetchone()
        if not row or not row['member_id']:
            return

        member_id = row['member_id']
        amount = self._extract_amount(conversion_result)
        if amount > 0:
            cursor.execute(
                'UPDATE members SET spending_history = spending_history + ? WHERE id = ?',
                (amount, member_id)
            )

        if score and int(score) > 70:
            cursor.execute('SELECT successful_strategies FROM members WHERE id = ?', (member_id,))
            existing = cursor.fetchone()
            existing_text = existing['successful_strategies'] if existing and existing['successful_strategies'] else ''
            snippet = row['text'][:200]
            updated = f'{existing_text} | {snippet}' if existing_text else snippet
            cursor.execute(
                'UPDATE members SET successful_strategies = ? WHERE id = ?',
                (updated, member_id)
            )

        self.conn.commit()
