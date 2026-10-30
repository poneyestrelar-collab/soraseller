import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/style.css':'style.css'};
const types={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
http.createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=files[path];if(!file){res.writeHead(404);res.end('Não encontrado');return;}try{const data=await readFile(root+file);res.writeHead(200,{'Content-Type':types[file.split('.').pop()]});res.end(data);}catch{res.writeHead(500);res.end('Erro ao carregar arquivo');}}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('SoraSeller iniciado na porta '+(process.env.PORT||3000)));
