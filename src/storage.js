import * as SQLite from 'expo-sqlite';
import { HOUSEHOLDS, sampleProducts } from './data/households';

const VERSION = 2;

const SCHEMA = `
  CREATE TABLE households (id TEXT PRIMARY KEY, name TEXT NOT NULL);
  CREATE TABLE products (household_id TEXT NOT NULL REFERENCES households(id), id TEXT NOT NULL,
    name TEXT NOT NULL, added TEXT NOT NULL, expires TEXT, qty REAL, PRIMARY KEY (household_id, id));
  CREATE TABLE cooked (household_id TEXT NOT NULL REFERENCES households(id), id TEXT NOT NULL,
    recipe TEXT NOT NULL, date TEXT NOT NULL, PRIMARY KEY (household_id, id));`;

const insertProduct = (db, householdId, p) =>
  db.runAsync('INSERT INTO products (household_id, id, name, added, expires, qty) VALUES (?, ?, ?, ?, ?, ?)',
    householdId, p.id, p.name, p.added, p.expires ?? null, p.qty ?? null);

let opening;
const open = (today) => (opening ??= (async () => {
  const db = await SQLite.openDatabaseAsync('still-good.db');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  const [{ user_version: version }] = await db.getAllAsync('PRAGMA user_version');
  if (version < VERSION) {
    await db.execAsync(`DROP TABLE IF EXISTS cooked; DROP TABLE IF EXISTS products; DROP TABLE IF EXISTS households;
      ${SCHEMA} PRAGMA user_version = ${VERSION};`);
  }
  await db.withTransactionAsync(async () => {
    for (const h of HOUSEHOLDS) {
      const { changes } = await db.runAsync('INSERT OR IGNORE INTO households (id, name) VALUES (?, ?)', h.id, h.name);
      if (changes) for (const p of sampleProducts(h.id, today)) await insertProduct(db, h.id, p);
    }
  });
  return db;
})().catch((e) => {
  opening = null;
  throw e;
}));

let queue = Promise.resolve();
const enqueue = (task, what) => {
  const run = queue.then(task);
  queue = run.catch((e) => console.warn(`${what} failed`, e));
  return run;
};

const withoutNulls = (row) => Object.fromEntries(Object.entries(row).filter(([, v]) => v != null));

export async function openHousehold(householdId, today) {
  const db = await open(today);
  const [found] = await db.getAllAsync('SELECT id FROM households WHERE id = ?', householdId);
  if (!found) throw new Error(`Unknown household: ${householdId}`);

  return Object.freeze({
    id: householdId,

    loadProducts: async () =>
      (await db.getAllAsync(
        'SELECT id, name, added, expires, qty FROM products WHERE household_id = ? ORDER BY rowid', householdId,
      )).map(withoutNulls),

    saveProducts: (products) => enqueue(() => db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM products WHERE household_id = ?', householdId);
      for (const p of products) await insertProduct(db, householdId, p);
    }), 'Saving products'),

    loadHistory: () =>
      db.getAllAsync('SELECT id, recipe, date FROM cooked WHERE household_id = ? ORDER BY date DESC, rowid DESC', householdId),

    addCooked: (entry) => enqueue(() => db.runAsync(
      'INSERT INTO cooked (household_id, id, recipe, date) VALUES (?, ?, ?, ?)', householdId, entry.id, entry.recipe, entry.date,
    ), 'Saving history'),

    removeCooked: (id) => enqueue(() => db.runAsync(
      'DELETE FROM cooked WHERE household_id = ? AND id = ?', householdId, id,
    ), 'Removing history'),
  });
}
