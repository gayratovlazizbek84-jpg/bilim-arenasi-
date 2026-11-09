const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix the corrupted quitBtn in TRANSLATIONS
html = html.replace('quitBtn: "{t.quitBtn || "✕ Quit"}",', 'quitBtn: "✕ Quit",');
html = html.replace('quitBtn: "{t.quitBtn || \'✕ Quit\'}",', 'quitBtn: "✕ Quit",');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed quitBtn');

