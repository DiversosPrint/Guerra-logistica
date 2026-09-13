const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { readState, writeState } = require('./server-db');
const port = Number(process.env.PORT || 3011);
const root = path.join(__dirname, 'static');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
const sessions = new Set();
function cookie(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('guerra_session='))?.split('=')[1]}
function authed(req){return sessions.has(cookie(req))}
http.createServer((req, res) => {
  if(req.url==='/api/login'&&req.method==='POST'){let body='';req.on('data',c=>body+=c);return req.on('end',()=>{try{const {password}=JSON.parse(body);if(!process.env.APP_PASSWORD||password!==process.env.APP_PASSWORD)return res.writeHead(401).end('Senha inválida');const token=crypto.randomBytes(32).toString('hex');sessions.add(token);res.writeHead(200,{'Content-Type':'application/json','Set-Cookie':`guerra_session=${token}; HttpOnly; SameSite=Lax; Path=/`}).end(JSON.stringify({ok:true}))}catch{res.writeHead(400).end('Dados inválidos')}})}
  if(req.url==='/api/session'&&req.method==='GET'){if(!process.env.APP_PASSWORD||!process.env.DATABASE_URL)return res.writeHead(204).end();return res.writeHead(authed(req)?200:401).end();}
  if(req.url==='/api/state'&&req.method==='GET'){if(!authed(req))return res.writeHead(401).end('Não autenticado');return readState().then(data=>{if(!data)return res.writeHead(204).end();res.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify(data))}).catch(()=>res.writeHead(500).end('Erro no banco'))}
  if(req.url==='/api/state'&&req.method==='PUT'){if(!authed(req))return res.writeHead(401).end('Não autenticado');let body='';req.on('data',c=>body+=c);return req.on('end',async()=>{try{if(!await writeState(JSON.parse(body)))return res.writeHead(503).end('DATABASE_URL não configurada');res.writeHead(204).end()}catch{res.writeHead(400).end('Dados inválidos')}})}
  let file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  if (file === '/app.js') file = '/app2.js';
  if (file === '/logo-guerra.png' && fs.existsSync(path.join(__dirname, 'public', 'logo-guerra.png'))) file = '/logo-guerra.png';
  const full = file === '/logo-guerra.png' ? path.join(__dirname, 'public', 'logo-guerra.png') : path.join(root, path.normalize(file));
  if (!full.startsWith(root) && !full.startsWith(path.join(__dirname, 'public'))) return res.writeHead(403).end();
  fs.readFile(full, (err, data) => { if (err) return res.writeHead(404).end('Not found'); if (file === '/styles.css') { try { data = Buffer.concat([data, fs.readFileSync(path.join(root,'overrides.css'))]); } catch {} } if (file === '/index.html') { data=Buffer.from(data.toString().replace('</head>','<link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0c1118"><script>if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js")</script></head>')); } res.writeHead(200, {'Content-Type': mime[path.extname(full)] || 'application/octet-stream'}); res.end(data); });
}).listen(port, '127.0.0.1', () => console.log(`Guerra Logística em http://127.0.0.1:${port}`));
