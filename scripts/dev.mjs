import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
let building = false;
let pending = false;
function rebuild() {
  if (building) { pending = true; return; }
  building = true;
  const child = spawn(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });
  child.on('exit', () => { building = false; if (pending) { pending = false; rebuild(); } });
}
await import('./build.mjs');
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(dist, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!path.startsWith(`${dist}${sep}`)) { res.writeHead(403); res.end(); return; }
    if (!(await stat(path)).isFile()) throw new Error('Not a file');
    const body = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    const fallback = '<!doctype html><html lang="en"><title>Page unavailable</title><p>The page is unavailable or rebuilding. Please refresh.</p><a href="/">Return home</a></html>';
    res.end(await readFile(resolve(dist, '404.html')).catch(() => fallback));
  }
}).listen(Number(process.env.PORT) || 4173, '0.0.0.0', () => console.log(`Preview at http://localhost:${Number(process.env.PORT) || 4173}`));
let timer;
for (const dir of ['src', 'public']) watch(resolve(root, dir), { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(rebuild, 120); });
