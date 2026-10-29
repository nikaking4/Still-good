// Core module: recipe selection and ranking (design doc section 3, rules 1-7).
import { daysLeft } from './products';

// Rule 3: urgency points by remaining days.
export const points = (days) => (days <= 1 ? 3 : days <= 3 ? 2 : days <= 7 ? 1 : 0);

// Returns [{ recipe, score, used, missing: [{ name, reason: 'absent'|'expired'|'short', short? }], canMake }],
// makeable recipes first. `today` is a parameter so results don't depend on the run date.
export function rank(products, recipes, today, catalog) {
  // Per product name: summed quantity of valid entries (null = unknown, counts as enough) and earliest expiry.
  const stock = {};
  for (const p of products) {
    const s = (stock[p.name] ??= { valid: false, expired: false, qty: 0, days: Infinity });
    const days = daysLeft(p, today, catalog);
    if (days < 0) {
      s.expired = true; // rule 6: flagged, but treated as not in the list
      continue;
    }
    s.valid = true;
    s.days = Math.min(s.days, days); // rule 7: score by the earliest-expiring entry
    s.qty = p.qty == null || s.qty == null ? null : s.qty + p.qty;
  }

  const results = [];
  // shortcut: linear scan over every recipe, fine for hundreds; add an ingredient→recipes index if it gets slow.
  for (const recipe of recipes) {
    let score = 0;
    let used = 0;
    const missing = [];
    for (const { name, qty, optional } of recipe.ingredients) {
      if (optional) continue; // rule 1
      const s = stock[name];
      if (!s?.valid) {
        missing.push({ name, reason: s?.expired ? 'expired' : 'absent' });
        continue;
      }
      score += points(s.days); // counted even when short: the recipe would use all of it (rule 3)
      used++;
      if (s.qty != null && s.qty < qty) missing.push({ name, reason: 'short', short: qty - s.qty });
    }
    if (used === 0 || missing.length > 2) continue; // rule 2
    results.push({ recipe, score, used, missing, canMake: missing.length === 0 });
  }

  // Rules 2 and 5: makeable group first, then score, then more products used, then shorter cooking time.
  return results.sort(
    (a, b) => b.canMake - a.canMake || b.score - a.score || b.used - a.used || a.recipe.minutes - b.recipe.minutes,
  );
}
