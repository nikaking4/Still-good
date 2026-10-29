// Product list logic. Entry: { id, name, added: 'YYYY-MM-DD', expires?: 'YYYY-MM-DD', qty?: number }.
// Catalog: { [name]: { unit, days } }. No UI or library imports, so it runs under plain Jest.

const DAY = 86400000;

export const addDays = (date, n) => new Date(Date.parse(date) + n * DAY).toISOString().slice(0, 10);

// Rule 4: no date given → default term for the product type, counted from the day it was added.
export const expiryOf = (entry, catalog) => entry.expires ?? addDays(entry.added, catalog[entry.name].days);

// Rule 3: remaining days = expiry date minus today. Negative means expired (rule 6).
export const daysLeft = (entry, today, catalog) =>
  Math.round((Date.parse(expiryOf(entry, catalog)) - Date.parse(today)) / DAY);

// Write off a cooked recipe: take the recipe amount from valid entries, earliest expiry first.
// Entries without a quantity are written off whole (section 7). Expired entries are left alone.
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
        p.qty = 0; // unknown amount: assume the recipe used it all
        break;
      }
      const take = Math.min(p.qty, need);
      p.qty -= take;
      need -= take;
    }
  }
  return left.filter((p) => p.qty !== 0);
}
