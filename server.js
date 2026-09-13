const http = require('http');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 3011);
const root = path.join(__dirname, 'static');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  if (file === '/app.js') file = '/app2.js';
  if (file === '/logo-guerra.png' && fs.existsSync(path.join(__dirname, 'public', 'logo-guerra.png'))) file = '/logo-guerra.png';
  const full = file === '/logo-guerra.png' ? path.join(__dirname, 'public', 'logo-guerra.png') : path.join(root, path.normalize(file));
  if (!full.startsWith(root) && !full.startsWith(path.join(__dirname, 'public'))) return res.writeHead(403).end();
  fs.readFile(full, (err, data) => { if (err) return res.writeHead(404).end('Not found'); if (file === '/styles.css') { try { data = Buffer.concat([data, fs.readFileSync(path.join(root,'overrides.css'))]); } catch {} } if (file === '/index.html') { data=Buffer.from(data.toString().replace('</head>','<link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0c1118"><script>if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js")</script></head>')); } res.writeHead(200, {'Content-Type': mime[path.extname(full)] || 'application/octet-stream'}); res.end(data); });
}).listen(port, '127.0.0.1', () => console.log(`Guerra Logística em http://127.0.0.1:${port}`));
