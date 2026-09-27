import { access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import content from '../src/content.mjs';

const publicDir = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const assets = [
  ['portrait', content.portrait?.src],
  ...content.research.flatMap(project => [
    [`${project.id} media`, project.media?.src],
    [`${project.id} poster`, project.media?.poster],
  ]),
  ...[...content.experience, ...content.education].map(item => [`${item.institution} logo`, item.logo]),
  ...content.links.map(item => [`${item.label} link`, item.url]),
  ...content.research.flatMap(project => (project.links || []).map(item => [`${project.id} ${item.label}`, item.url])),
];

const ids = content.research.map(project => project.id);
if (ids.some(id => !id) || new Set(ids).size !== ids.length) {
  throw new Error('Every project needs a unique, non-empty id.');
}

for (const [label, url] of assets) {
  if (!url || /^(?:https?:|mailto:|#)/i.test(url)) continue;
  const path = resolve(publicDir, url);
  if (!path.startsWith(`${publicDir}${sep}`)) throw new Error(`Invalid local path for ${label}: ${url}`);
  try {
    await access(path);
  } catch {
    throw new Error(`Missing local asset for ${label}: ${url}`);
  }
}

console.log('Content and local assets OK');
