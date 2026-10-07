import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.md')) files.push(path);
  }
}
walk(root);
const errors = [];
const clean = text => text.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, '');
const slug = text => text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}_\-\s]/gu, '').replace(/\s/g, '-');
const summary = readFileSync(resolve(root, 'SUMMARY.md'), 'utf8');
for (const file of files) {
  const name = relative(root, file).split(sep).join('/');
  const raw = readFileSync(file, 'utf8');
  const body = clean(raw);
  if (!/^# .+/m.test(body)) errors.push(`${name}: missing page title`);
  if ((raw.match(/{% hint\b/g) || []).length !== (raw.match(/{% endhint %}/g) || []).length) errors.push(`${name}: unbalanced GitBook hints`);
  const links = [...body.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)|href="([^"]+)"/g)];
  for (const match of links) {
    const url = match[1] || match[2];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(url) || url.includes('<')) continue;
    const target = decodeURIComponent(url.split('#')[0]);
    const anchor = url.split('#')[1];
    const dest = target ? resolve(dirname(file), target) : file;
    if (!dest.startsWith(root + sep) || !existsSync(dest)) errors.push(`${name}: broken local link ${url}`);
    else if (statSync(dest).isDirectory() && !existsSync(resolve(dest, 'README.md'))) errors.push(`${name}: directory link has no landing page ${url}`);
    else if (anchor && dest.endsWith('.md')) {
      const content = clean(readFileSync(dest, 'utf8'));
      const anchors = [...content.matchAll(/^#{1,6} (.+)$/gm)].map(match => slug(match[1]));
      if (!anchors.includes(decodeURIComponent(anchor)) && !content.includes(`id="${anchor}"`)) errors.push(`${name}: missing heading anchor ${url}`);
    }
  }
  if (name !== 'SUMMARY.md' && !summary.includes(`](${name})`)) errors.push(`${name}: missing from SUMMARY.md`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Checked ${files.length} Markdown files: local links, heading anchors, navigation, titles, and GitBook hints passed.`);
