// Default shelf life in days per product type (rule 4).
// shortcut: guessed values, check against real package dates (section 7 risk) and adjust here.
const CATEGORY_DAYS = {
  pienas: 5,
  mėsa: 3,
  žuvis: 2,
  konservai: 365,
  kiaušiniai: 21,
  sūris: 14,
  riebalai: 30,
  daržovės: 7,
  šakniavaisiai: 30,
  vaisiai: 7,
  duona: 4,
  sausi: 180,
  prieskoniai: 730,
};

// Closed product list: one name and one unit per product, shared by recipes (rule 7).
const PRODUCTS = [
  ['pienas', 'ml', 'pienas'],
  ['grietinė', 'g', 'pienas'],
  ['jogurtas', 'g', 'pienas'],
  ['varškė', 'g', 'pienas'],
  ['sviestas', 'g', 'riebalai'],
  ['sūris', 'g', 'sūris'],
  ['kiaušiniai', 'vnt', 'kiaušiniai'],
  ['vištiena', 'g', 'mėsa'],
  ['malta mėsa', 'g', 'mėsa'],
  ['kumpis', 'g', 'mėsa'],
  ['dešrelės', 'g', 'mėsa'],
  ['lašiša', 'g', 'žuvis'],
  ['bulvės', 'g', 'šakniavaisiai'],
  ['svogūnai', 'vnt', 'šakniavaisiai'],
  ['morkos', 'vnt', 'šakniavaisiai'],
  ['česnakai', 'vnt', 'šakniavaisiai'],
  ['pomidorai', 'vnt', 'daržovės'],
  ['agurkai', 'vnt', 'daržovės'],
  ['paprikos', 'vnt', 'daržovės'],
  ['kopūstai', 'g', 'daržovės'],
  ['cukinijos', 'vnt', 'daržovės'],
  ['grybai', 'g', 'daržovės'],
  ['špinatai', 'g', 'daržovės'],
  ['obuoliai', 'vnt', 'vaisiai'],
  ['bananai', 'vnt', 'vaisiai'],
  ['citrinos', 'vnt', 'vaisiai'],
  ['duona', 'g', 'duona'],
  ['miltai', 'g', 'sausi'],
  ['ryžiai', 'g', 'sausi'],
  ['makaronai', 'g', 'sausi'],
  ['avižiniai dribsniai', 'g', 'sausi'],
  ['cukrus', 'g', 'sausi'],
  ['aliejus', 'ml', 'sausi'],
  ['konservuoti pomidorai', 'g', 'konservai'],
  ['konservuotos pupelės', 'g', 'konservai'],
  ['konservuotas tunas', 'g', 'konservai'],
  ['druska', 'g', 'prieskoniai'],
  ['pipirai', 'g', 'prieskoniai'],
];

// { name: { unit, days } } — the shape the core module expects.
export const CATALOG = Object.fromEntries(
  PRODUCTS.map(([name, unit, category]) => [name, { unit, days: CATEGORY_DAYS[category] }]),
);

export const NAMES = PRODUCTS.map(([name]) => name);

// One-tap grid on the products screen (section 4).
// shortcut: guessed list, replace with real usage counts once there is data.
export const FREQUENT = [
  'pienas', 'kiaušiniai', 'duona', 'sviestas', 'sūris', 'vištiena',
  'bulvės', 'svogūnai', 'pomidorai', 'obuoliai', 'bananai', 'makaronai',
];
