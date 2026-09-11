const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3005;
const DIR = '/var/www/jobs.glowbby.online';

const TG_TOKEN = '8756084741:AAHgsYj8xY2agLABst-fS1hmSiEGrnzICNU';
const TG_CHAT_ID = '7758960424'; // ID-ul tau personal corect

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(DIR, 'public')));

app.post('/submit-lead', (req, res) => {
    const { nume, telefon, email, motivatie } = req.body;
    const ts = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });
    const txt = `[${ts}] Nume: ${nume} | Tel: ${telefon} | Email: ${email || 'N/A'} | Motivatie: ${motivatie}\n`;

    fs.appendFile(path.join(DIR, 'leads.txt'), txt, (err) => {
        if (err) console.error('Eroare scriere fisier:', err);
    });

    const mesaj = `🔔 LEAD NOU GLOW MODELS\n\n👤 Nume: ${nume}\n📞 Telefon: ${telefon}\n✉️ Email: ${email || 'N/A'}\n🎯 Motivație: ${motivatie}\n⏰ Data: ${ts}\n\n📲 Sună acum pe WhatsApp!`;
    
    const postData = JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: mesaj,
        parse_mode: 'HTML'
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TG_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        },
        family: 4 // Fortam IPv4
    };

    const reqTg = https.request(options, (resTg) => {
        let data = '';
        resTg.on('data', (chunk) => { data += chunk; });
        resTg.on('end', () => {
            console.log('✅ Telegram trimis cu succes! Status:', resTg.statusCode);
        });
    });

    reqTg.on('error', (e) => {
        console.error('⚠️ Eroare Telegram:', e.message);
    });

    reqTg.write(postData);
    reqTg.end();

    res.json({ success: true, message: 'Multumim!' });
});

app.listen(PORT, () => {
    console.log('✅ Server Glow Models rulează pe portul', PORT);
});
