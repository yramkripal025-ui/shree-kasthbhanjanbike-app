import fs from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('.', import.meta.url).pathname;
const htmlPath = `${root}www/index.html`;
assert(fs.existsSync(htmlPath), 'www/index.html is missing');
const html = fs.readFileSync(htmlPath, 'utf8');
assert(html.length > 100000, `www/index.html looks incomplete (${html.length} bytes)`);
assert(/<title>Kashtbhanjan Motors/i.test(html), 'Kashtbhanjan Motors title missing');
assert(html.includes('localStorage'), 'localStorage support missing');
assert(html.includes('popstate'), 'Android back/navigation logic missing');
assert(html.includes('window.open("https://wa.me/'), 'WhatsApp support missing');
assert(html.includes('html2canvas'), 'Invoice image library integration missing');
assert(html.includes('jspdf'), 'PDF library integration missing');
assert(html.includes('Filesystem'), 'Native file save integration missing');
assert(html.includes('Share'), 'Native share integration missing');

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const inline = scripts.at(-1) || '';
assert(inline.length > 100000, 'main inline JavaScript is missing/incomplete');
new Function(inline);

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
const refs = [...inline.matchAll(/\$\(["']([^"']+)["']\)/g)].map(m => m[1]);
const missing = [...new Set(refs.filter(id => !ids.has(id)))];
assert.equal(missing.length, 0, `Missing DOM ids referenced by JS: ${missing.join(', ')}`);

const pkg = JSON.parse(fs.readFileSync(`${root}package.json`, 'utf8'));
assert.equal(pkg.dependencies['@capacitor/android'], '8.5.2');
assert.equal(pkg.dependencies['@capacitor/core'], '8.5.2');
assert.equal(pkg.dependencies['html2canvas'], '1.4.1');
assert.equal(pkg.dependencies['jspdf'], '2.5.2');
assert(fs.existsSync(`${root}capacitor.config.json`), 'capacitor.config.json missing');
assert(fs.existsSync(`${root}.github/workflows/build-apk.yml`), 'GitHub Actions workflow missing');

console.log(`Validation OK: HTML ${html.length} bytes, inline JS ${inline.length} chars, DOM refs ${refs.length}, missing ${missing.length}`);
