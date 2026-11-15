// Put the photos in receipts/ (01.jpg, 02.jpg, …). Next to each photo add a text file with the same
// name (01.txt) listing the products really on that receipt, one product-list name per line;
// leave out items that are not in the product list. Run: npm run receipts
import fs from 'node:fs';
import path from 'node:path';
import Tesseract from 'tesseract.js';
import { CATALOG } from '../src/data/catalog.js';
import { matchReceipt } from '../src/core/receipt.js';

const DIR = process.argv[2] ?? 'receipts';
const CACHE = 'receipts';
const TARGET = 70;

const photos = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort() : [];
if (!photos.length) {
  console.log(`No receipt photos in ${DIR}/. Add them as described at the top of this file.`);
  process.exit(1);
}

fs.mkdirSync(CACHE, { recursive: true });
const worker = await Tesseract.createWorker('lit', undefined, { cachePath: CACHE });
let expectedTotal = 0;
let foundTotal = 0;

for (const photo of photos) {
  const base = path.join(DIR, path.parse(photo).name);
  if (!fs.existsSync(`${base}.txt`)) {
    console.log(`${photo}: skipped, no ${base}.txt listing its products`);
    continue;
  }
  const expected = fs.readFileSync(`${base}.txt`, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const unknown = expected.filter((name) => !CATALOG[name]);
  if (unknown.length) throw new Error(`${base}.txt: not in the product list: ${unknown.join(', ')}`);

  const { data } = await worker.recognize(path.join(DIR, photo));
  fs.writeFileSync(`${base}.ocr.txt`, data.text);
  const matched = new Set(matchReceipt(data.text, Object.keys(CATALOG)).map((m) => m.name));

  const found = expected.filter((name) => matched.has(name));
  const wrong = [...matched].filter((name) => !expected.includes(name));
  expectedTotal += expected.length;
  foundTotal += found.length;
  console.log(`${photo}: ${found.length}/${expected.length} found`
    + (wrong.length ? `; wrongly found (user would untick): ${wrong.join(', ')}` : ''));
}
await worker.terminate();

if (!expectedTotal) {
  console.log('No receipt had a product list, nothing to score.');
  process.exit(1);
}
const percent = Math.round((100 * foundTotal) / expectedTotal);
console.log(`\nTotal: ${foundTotal}/${expectedTotal} = ${percent} % (target ${TARGET} %): ${percent >= TARGET ? 'PASSED' : 'FAILED'}`);
