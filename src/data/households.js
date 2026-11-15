import { addDays } from '../core/products';

export const HOUSEHOLDS = [
  { id: 'dominyk', name: 'Dominyk', pin: '1111' },
  { id: 'ferdinando', name: 'Ferdinando', pin: '2222' },
];

const SAMPLES = {
  dominyk: [
    ['kiaušiniai', 1, 3], ['sūris', 3, 200], ['pienas', null, 1000],
    ['miltai', null, 1000], ['sviestas', null, 200], ['bulvės', null, 1000],
  ],
  ferdinando: [
    ['makaronai', null, 500], ['malta mėsa', 2, 500], ['pomidorai', 4, null], ['svogūnai', null, null],
  ],
};

export const sampleProducts = (householdId, today) =>
  SAMPLES[householdId].map(([name, days, qty]) => {
    const product = { id: `${householdId}-${name}`, name, added: today };
    if (days != null) product.expires = addDays(today, days);
    if (qty != null) product.qty = qty;
    return product;
  });
