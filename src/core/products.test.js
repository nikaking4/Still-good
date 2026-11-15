import { createEntry, ERRORS } from './products';

const TODAY = '2026-10-06';
const catalog = { pienas: { unit: 'ml', days: 5 }, kiaušiniai: { unit: 'vnt', days: 21 } };

test('valid input: entry with quantity and expiry date', () => {
  const { entry, error } = createEntry('pienas', { qty: '1000', date: '2026-10-10' }, TODAY, catalog);
  expect(error).toBeUndefined();
  expect(entry).toMatchObject({ name: 'pienas', added: TODAY, qty: 1000, expires: '2026-10-10' });
  expect(typeof entry.id).toBe('string');
});

test('quantity and date are optional; a decimal comma is accepted', () => {
  const plain = createEntry('pienas', {}, TODAY, catalog).entry;
  expect(['qty' in plain, 'expires' in plain]).toEqual([false, false]);
  expect(createEntry('pienas', { qty: '0,5' }, TODAY, catalog).entry.qty).toBe(0.5);
});

test('error: product not in the closed list', () => {
  expect(createEntry('kefyras', {}, TODAY, catalog)).toEqual({ error: ERRORS.unknown });
});

test('error: quantity must be a positive number', () => {
  for (const qty of ['-1', '0', 'abc', 'Infinity']) {
    expect([qty, createEntry('pienas', { qty }, TODAY, catalog)]).toEqual([qty, { error: ERRORS.qty }]);
  }
});

test('error: date must be a real calendar day in YYYY-MM-DD form', () => {
  for (const date of ['2026-13-40', '2026-02-30', '10/06/2026']) {
    expect([date, createEntry('pienas', { date }, TODAY, catalog)]).toEqual([date, { error: ERRORS.date }]);
  }
});

test('each new entry gets its own id', () => {
  const a = createEntry('kiaušiniai', {}, TODAY, catalog).entry;
  const b = createEntry('kiaušiniai', {}, TODAY, catalog).entry;
  expect(a.id).not.toBe(b.id);
});
