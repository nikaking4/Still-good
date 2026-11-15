// expo-sqlite is native, so tests run the same SQL on sql.js (real SQLite compiled to wasm) behind the same API.
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: async () => {
    const SQL = await require('sql.js')();
    const db = new SQL.Database();
    const flat = (params) => (params.length === 1 && Array.isArray(params[0]) ? params[0] : params);
    const all = (sql, params) => {
      const st = db.prepare(sql);
      st.bind(flat(params));
      const rows = [];
      while (st.step()) rows.push(st.getAsObject());
      st.free();
      return rows;
    };
    return {
      execAsync: async (sql) => db.exec(sql),
      runAsync: async (sql, ...params) => {
        db.run(sql, flat(params));
        return { changes: db.getRowsModified() };
      },
      getAllAsync: async (sql, ...params) => all(sql, params),
      withTransactionAsync: async (task) => {
        db.exec('BEGIN');
        try {
          await task();
          db.exec('COMMIT');
        } catch (e) {
          db.exec('ROLLBACK');
          throw e;
        }
      },
    };
  },
}));

const TODAY = '2026-10-06';
let openHousehold;
beforeEach(() => {
  jest.resetModules();
  ({ openHousehold } = require('./storage'));
});
const names = (list) => list.map((p) => p.name).sort();
const both = async () => [await openHousehold('dominyk', TODAY), await openHousehold('ferdinando', TODAY)];

test('read: each household sees only its own sample products', async () => {
  const [dominyk, ferdinando] = await both();
  expect(names(await dominyk.loadProducts())).toEqual(['bulvės', 'kiaušiniai', 'miltai', 'pienas', 'sviestas', 'sūris']);
  expect(names(await ferdinando.loadProducts())).toEqual(['makaronai', 'malta mėsa', 'pomidorai', 'svogūnai']);
});

test("read: a store ignores another household's id passed to it", async () => {
  const [dominyk] = await both();
  expect(names(await dominyk.loadProducts('ferdinando'))).toEqual(names(await dominyk.loadProducts()));
});

test('change: saving in one household does not change the other', async () => {
  const [dominyk, ferdinando] = await both();
  const before = await ferdinando.loadProducts();
  await dominyk.saveProducts([{ id: 'x', name: 'duona', added: TODAY }]);

  expect(await dominyk.loadProducts()).toEqual([{ id: 'x', name: 'duona', added: TODAY }]);
  expect(await ferdinando.loadProducts()).toEqual(before);
});

test('change: the same product id in two households stays two separate rows', async () => {
  const [dominyk, ferdinando] = await both();
  await dominyk.saveProducts([{ id: 'same', name: 'pienas', added: TODAY, qty: 1 }]);
  await ferdinando.saveProducts([{ id: 'same', name: 'duona', added: TODAY }]);
  await dominyk.saveProducts([]);

  expect(await dominyk.loadProducts()).toEqual([]);
  expect(await ferdinando.loadProducts()).toEqual([{ id: 'same', name: 'duona', added: TODAY }]);
});

test('an unknown household cannot be opened', async () => {
  await expect(openHousehold('svetimas', TODAY)).rejects.toThrow('Unknown household: svetimas');
});

test('cooked history is kept per household, newest first', async () => {
  const [dominyk, ferdinando] = await both();
  await dominyk.addCooked({ id: 'c1', recipe: 'Blynai', date: '2026-10-05' });
  await dominyk.addCooked({ id: 'c2', recipe: 'Omletas su sūriu', date: TODAY });
  await ferdinando.addCooked({ id: 'c3', recipe: 'Bolonijos makaronai', date: TODAY });

  expect((await dominyk.loadHistory()).map((e) => e.id)).toEqual(['c2', 'c1']);
  expect(await ferdinando.loadHistory()).toEqual([{ id: 'c3', recipe: 'Bolonijos makaronai', date: TODAY }]);
});

test("change: undo removes only the household's own history entry", async () => {
  const [dominyk, ferdinando] = await both();
  await dominyk.addCooked({ id: 'c1', recipe: 'Blynai', date: TODAY });
  await ferdinando.addCooked({ id: 'c1', recipe: 'Blynai', date: TODAY });

  await dominyk.removeCooked('c1');
  expect(await dominyk.loadHistory()).toEqual([]);
  expect(await ferdinando.loadHistory()).toEqual([{ id: 'c1', recipe: 'Blynai', date: TODAY }]);
});
