import { rank } from './rank';
import { consume } from './products';
import { CATALOG } from '../data/catalog';
import { RECIPES } from '../data/recipes';

const TODAY = '2026-10-06';
const catalog = {
  kiaušiniai: { unit: 'vnt', days: 21 },
  sūris: { unit: 'g', days: 14 },
  pienas: { unit: 'ml', days: 5 },
  miltai: { unit: 'g', days: 180 },
  a: { unit: 'g', days: 365 }, b: { unit: 'g', days: 365 }, c: { unit: 'g', days: 365 },
  d: { unit: 'g', days: 365 }, e: { unit: 'g', days: 365 }, f: { unit: 'g', days: 365 },
  g: { unit: 'g', days: 365 }, h: { unit: 'g', days: 365 },
};
const item = (name, expires, qty) => ({ name, added: '2026-10-01', expires, qty });
const recipe = (name, ingredients, minutes = 10) => ({
  name, minutes, ingredients: ingredients.map(([n, qty = 1]) => ({ name: n, qty })),
});
// Compact view of a ranked result, close to how the design doc writes expected outcomes.
const view = (list) => list.map((r) => [r.recipe.name, r.score, r.missing.map((m) => `${m.name}:${m.reason}${m.short ?? ''}`)]);

test('scenario: usual case', () => {
  const products = [
    item('kiaušiniai', '2026-10-07'), item('sūris', '2026-10-09'), item('pienas', '2026-10-30'), item('miltai', '2027-03-01'),
    ...'abcdefgh'.split('').map((n) => item(n, '2027-01-01')),
  ];
  const recipes = [recipe('Blynai', [['kiaušiniai'], ['pienas'], ['miltai']]), recipe('Omletas su sūriu', [['kiaušiniai'], ['sūris']])];
  const result = rank(products, recipes, TODAY, catalog);
  expect(view(result)).toEqual([['Omletas su sūriu', 5, []], ['Blynai', 3, []]]);
  expect(result.every((r) => r.canMake)).toBe(true);
});

test('scenario: equal score → more products used first (rule 5)', () => {
  const products = [item('kiaušiniai', '2026-10-07'), ...'abcd'.split('').map((n) => item(n, '2027-01-01'))];
  const recipes = [recipe('Trys', [['kiaušiniai'], ['a'], ['b']]), recipe('Penki', [['kiaušiniai'], ['a'], ['b'], ['c'], ['d']])];
  expect(view(rank(products, recipes, TODAY, catalog)).map((r) => r[0])).toEqual(['Penki', 'Trys']);
});

test('equal score and products → shorter cooking time first (rule 5)', () => {
  const products = [item('kiaušiniai', '2026-10-07')];
  const recipes = [recipe('Ilgas', [['kiaušiniai']], 40), recipe('Trumpas', [['kiaušiniai']], 5)];
  expect(view(rank(products, recipes, TODAY, catalog)).map((r) => r[0])).toEqual(['Trumpas', 'Ilgas']);
});

test('scenario: nothing within two missing → empty result', () => {
  const products = [item('a', '2027-01-01'), item('b', '2027-01-01'), item('c', '2027-01-01')];
  const recipes = [recipe('Toli', [['a'], ['d'], ['e'], ['f']]), recipe('Nieko', [['g'], ['h']])];
  expect(rank(products, recipes, TODAY, catalog)).toEqual([]);
});

test('scenario: expired product', () => {
  const products = [
    item('kiaušiniai', '2026-10-05', 6), item('sūris', '2026-10-08', 200),
    item('pienas', '2026-10-20', 1000), item('miltai', '2027-03-01', 1000),
  ];
  const recipes = [
    recipe('Omletas su sūriu', [['kiaušiniai', 3], ['sūris', 100]]),
    recipe('Sūrio padažas', [['sūris', 100], ['pienas', 300], ['miltai', 30]]),
  ];
  const result = rank(products, recipes, TODAY, catalog);
  expect(view(result)).toEqual([['Sūrio padažas', 2, []], ['Omletas su sūriu', 2, ['kiaušiniai:expired']]]);
  expect(result.map((r) => r.canMake)).toEqual([true, false]);
});

test('scenario: valid until today (0 days) still counts', () => {
  const products = [item('kiaušiniai', '2026-10-06', 4), item('sūris', '2026-10-05', 200)];
  const recipes = [recipe('Omletas su sūriu', [['kiaušiniai', 3], ['sūris', 100]]), recipe('Kiaušinienė', [['kiaušiniai', 2]])];
  expect(view(rank(products, recipes, TODAY, catalog))).toEqual([
    ['Kiaušinienė', 3, []],
    ['Omletas su sūriu', 3, ['sūris:expired']],
  ]);
});

test('scenario: not enough quantity', () => {
  const products = [item('kiaušiniai', '2026-10-07', 2), item('sūris', '2026-10-09', 200)];
  const recipes = [recipe('Omletas su sūriu', [['kiaušiniai', 3], ['sūris', 100]]), recipe('Kiaušinienė', [['kiaušiniai', 2]])];
  expect(view(rank(products, recipes, TODAY, catalog))).toEqual([
    ['Kiaušinienė', 3, []],
    ['Omletas su sūriu', 5, ['kiaušiniai:short1']],
  ]);
});

test('scenario: several entries, one expired', () => {
  const products = [
    item('kiaušiniai', '2026-10-05', 2), item('kiaušiniai', '2026-10-07', 1), item('kiaušiniai', '2026-10-15', 1),
    item('pienas', '2026-10-20', 1000), item('miltai', '2027-03-01', 1000),
  ];
  const recipes = [recipe('Blynai', [['kiaušiniai', 3], ['pienas', 500], ['miltai', 200]])];
  expect(view(rank(products, recipes, TODAY, catalog))).toEqual([['Blynai', 3, ['kiaušiniai:short1']]]);
});

test('rule 4: default term counted from the day added, and it can expire', () => {
  const fresh = { name: 'pienas', added: '2026-10-02' }; // +5 → 10-07, 1 day left → 3 points
  const old = { name: 'pienas', added: '2026-09-25' }; // +5 → 09-30, expired
  const recipes = [recipe('Pienas', [['pienas']])];
  expect(view(rank([fresh], recipes, TODAY, catalog))).toEqual([['Pienas', 3, []]]);
  expect(view(rank([old], recipes, TODAY, catalog))).toEqual([]);
});

test('rule 7: one valid entry without quantity means enough', () => {
  const products = [item('kiaušiniai', '2026-10-07', 1), item('kiaušiniai', '2026-10-10')];
  const result = rank(products, [recipe('Omletas', [['kiaušiniai', 3]])], TODAY, catalog);
  expect(result[0].canMake).toBe(true);
});

test('rules 1-2: optional ignored, absent listed, three missing hidden', () => {
  const products = [item('a', '2027-01-01')];
  const recipes = [
    { name: 'Du trūksta', minutes: 5, ingredients: [{ name: 'a', qty: 1 }, { name: 'b', qty: 1 }, { name: 'c', qty: 1 }, { name: 'd', qty: 1, optional: true }] },
    recipe('Trys trūksta', [['a'], ['b'], ['c'], ['d']]),
  ];
  expect(view(rank(products, recipes, TODAY, catalog))).toEqual([['Du trūksta', 0, ['b:absent', 'c:absent']]]);
});

test('consume: takes from earliest valid entry, skips expired, removes entries without quantity', () => {
  const products = [
    { id: 1, ...item('kiaušiniai', '2026-10-05', 2) },
    { id: 2, ...item('kiaušiniai', '2026-10-07', 2) },
    { id: 3, ...item('kiaušiniai', '2026-10-15', 4) },
    { id: 4, ...item('sūris', '2026-10-09') },
    { id: 5, ...item('pienas', '2026-10-20', 1000) },
  ];
  const cooked = { name: 'X', minutes: 5, ingredients: [
    { name: 'kiaušiniai', qty: 3 }, { name: 'sūris', qty: 100 }, { name: 'pienas', qty: 50, optional: true }] };
  expect(consume(products, cooked, TODAY, catalog).map((p) => [p.id, p.qty])).toEqual([[1, 2], [3, 3], [5, 1000]]);
});

test('data: every recipe ingredient is in the closed product list with a quantity', () => {
  for (const r of RECIPES) {
    for (const i of r.ingredients) {
      expect([r.name, i.name, i.name in CATALOG, i.qty > 0]).toEqual([r.name, i.name, true, true]);
    }
  }
});
