// Inlines the photos into game.html -> SungkunBirthday.html (one file, works offline-ish, easy to send)
// Usage: node build.js
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const assets = {};
for (const f of ['1.webp', '2.webp', '3.webp', '4.webp', '5.png', '6.png', '7.png']) {
  const b = fs.readFileSync(path.join(dir, 'assets', f));
  const [n, ext] = f.split('.');
  assets['p' + n] = 'data:image/' + ext + ';base64,' + b.toString('base64');
}
const html = fs.readFileSync(path.join(dir, 'game.html'), 'utf8');
const out = html.replace('/*__ASSETS__*/', 'window.ASSETS=' + JSON.stringify(assets) + ';');
fs.writeFileSync(path.join(dir, 'SungkunBirthday.html'), out);
console.log('Built SungkunBirthday.html', (out.length / 1024 / 1024).toFixed(2) + ' MB');
