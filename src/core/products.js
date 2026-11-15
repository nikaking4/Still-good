const DAY = 86400000;

export const addDays = (date, n) => new Date(Date.parse(date) + n * DAY).toISOString().slice(0, 10);

export const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const isDate = (s) =>
  /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)) && new Date(Date.parse(s)).toISOString().startsWith(s);

export const ERRORS = {
  unknown: 'Tokio produkto sąraše nėra.',
  qty: 'Kiekis turi būti teigiamas skaičius.',
  date: 'Data turi būti formatu MMMM-MM-DD.',
};

export function createEntry(name, { qty = '', date = '' }, today, catalog) {
  if (!catalog[name]) return { error: ERRORS.unknown };
  const qtyText = String(qty).trim();
  const amount = Number(qtyText.replace(',', '.'));
  if (qtyText && !(Number.isFinite(amount) && amount > 0)) return { error: ERRORS.qty };
  const dateText = String(date).trim();
  if (dateText && !isDate(dateText)) return { error: ERRORS.date };
  const entry = { id: newId(), name, added: today };
  if (qtyText) entry.qty = amount;
  if (dateText) entry.expires = dateText;
  return { entry };
}

const expiryOf = (entry, catalog) => entry.expires ?? addDays(entry.added, catalog[entry.name].days);

export const daysLeft = (entry, today, catalog) =>
  Math.round((Date.parse(expiryOf(entry, catalog)) - Date.parse(today)) / DAY);

export function consume(products, recipe, today, catalog) {
  const left = products.map((p) => ({ ...p }));
  for (const { name, qty, optional } of recipe.ingredients) {
    if (optional) continue;
    let need = qty;
    const entries = left
      .filter((p) => p.name === name && daysLeft(p, today, catalog) >= 0)
      .sort((a, b) => daysLeft(a, today, catalog) - daysLeft(b, today, catalog));
    for (const p of entries) {
      if (need <= 0) break;
      if (p.qty == null) {
        p.qty = 0;
        break;
      }
      const take = Math.min(p.qty, need);
      p.qty -= take;
      need -= take;
    }
  }
  return left.filter((p) => p.qty !== 0);
}
