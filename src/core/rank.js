import { daysLeft } from './products';

export const points = (days) => (days <= 1 ? 3 : days <= 3 ? 2 : days <= 7 ? 1 : 0);

export function rank(products, recipes, today, catalog) {
  const stock = {};
  for (const p of products) {
    const s = (stock[p.name] ??= { valid: false, expired: false, qty: 0, days: Infinity });
    const days = daysLeft(p, today, catalog);
    if (days < 0) {
      s.expired = true;
      continue;
    }
    s.valid = true;
    s.days = Math.min(s.days, days);
    s.qty = p.qty == null || s.qty == null ? null : s.qty + p.qty;
  }

  const results = [];
  for (const recipe of recipes) {
    let score = 0;
    let used = 0;
    const missing = [];
    for (const { name, qty, optional } of recipe.ingredients) {
      if (optional) continue;
      const s = stock[name];
      if (!s?.valid) {
        missing.push({ name, reason: s?.expired ? 'expired' : 'absent' });
        continue;
      }
      score += points(s.days);
      used++;
      if (s.qty != null && s.qty < qty) missing.push({ name, reason: 'short', short: qty - s.qty });
    }
    if (used === 0 || missing.length > 2) continue;
    results.push({ recipe, score, used, missing, canMake: missing.length === 0 });
  }

  return results.sort(
    (a, b) => b.canMake - a.canMake || b.score - a.score || b.used - a.used || a.recipe.minutes - b.recipe.minutes,
  );
}
