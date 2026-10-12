import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(root, 'www', 'index.html');
assert(fs.existsSync(htmlPath), 'www/index.html is missing');
const html = fs.readFileSync(htmlPath, 'utf8');
assert(html.length > 100000, `www/index.html looks incomplete (${html.length} bytes)`);
assert(/<title>\s*Kashtbhanjan Motors/i.test(html), 'Kashtbhanjan Motors title missing');
assert(html.toLowerCase().includes('quotation'), 'Quotation feature marker missing from latest app');
assert(html.includes('localStorage'), 'localStorage support missing');
assert(html.includes('popstate'), 'Back/navigation logic missing');
assert(html.includes('wa.me'), 'WhatsApp support marker missing');

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]).filter(s => s.trim());
for (let i = 0; i < scripts.length; i++) {
  new Function(scripts[i]);
}

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
const inline = scripts.join('\n');
const refs = [...inline.matchAll(/\$\(["']([^"']+)["']\)/g)].map(m => m[1]);
const missing = [...new Set(refs.filter(id => !ids.has(id)))];
assert.equal(missing.length, 0, `Missing DOM ids referenced by JS: ${missing.join(', ')}`);

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert.equal(pkg.dependencies['@capacitor/android'], '8.5.2');
assert.equal(pkg.dependencies['@capacitor/core'], '8.5.2');
assert(fs.existsSync(path.join(root, 'capacitor.config.json')), 'capacitor.config.json missing');
assert(fs.existsSync(path.join(root, '.github', 'workflows', 'build-apk.yml')), 'GitHub Actions workflow missing');
console.log(`Validation OK: HTML ${html.length} bytes, scripts ${scripts.length}, DOM refs ${refs.length}, missing ${missing.length}`);
