import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { render } from '../src/template.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
export async function build() {
  const { default: content } = await import(`../src/content.mjs?v=${Date.now()}`);
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(resolve(root, 'public'), output, { recursive: true });
  await writeFile(resolve(output, 'index.html'), render(content));
  await writeFile(resolve(output, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found</title><link rel="stylesheet" href="/styles.css"><body><main class="not-found"><p class="eyebrow">404</p><h1>Page not found.</h1><p>This page may have moved.</p><a href="/">Return home →</a></main></body></html>');
  await writeFile(resolve(output, 'robots.txt'), content.draft ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n');
  console.log('Built static site → dist/');
}
await build();
