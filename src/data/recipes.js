// Quantities use the unit of the product in catalog.js. `optional` ingredients are ignored by matching (rule 1).
// shortcut: 25 starter recipes, the plan (section 7) targets 50.
export const RECIPES = [
  { name: 'Omletas su sūriu', minutes: 10, ingredients: [
    { name: 'kiaušiniai', qty: 3 }, { name: 'sūris', qty: 100 }, { name: 'pienas', qty: 50 },
    { name: 'sviestas', qty: 10, optional: true }, { name: 'druska', qty: 2, optional: true }] },
  { name: 'Kiaušinienė', minutes: 5, ingredients: [
    { name: 'kiaušiniai', qty: 2 }, { name: 'sviestas', qty: 10 }, { name: 'druska', qty: 1, optional: true }] },
  { name: 'Blynai', minutes: 25, ingredients: [
    { name: 'kiaušiniai', qty: 2 }, { name: 'pienas', qty: 500 }, { name: 'miltai', qty: 200 },
    { name: 'cukrus', qty: 20, optional: true }, { name: 'aliejus', qty: 20, optional: true }] },
  { name: 'Makaronai su sūrio padažu', minutes: 20, ingredients: [
    { name: 'makaronai', qty: 200 }, { name: 'sūris', qty: 100 }, { name: 'pienas', qty: 300 },
    { name: 'sviestas', qty: 30 }, { name: 'miltai', qty: 30 }] },
  { name: 'Varškėčiai', minutes: 25, ingredients: [
    { name: 'varškė', qty: 400 }, { name: 'kiaušiniai', qty: 1 }, { name: 'miltai', qty: 60 },
    { name: 'cukrus', qty: 30, optional: true }, { name: 'aliejus', qty: 30, optional: true }] },
  { name: 'Vištiena su ryžiais', minutes: 35, ingredients: [
    { name: 'vištiena', qty: 400 }, { name: 'ryžiai', qty: 200 }, { name: 'svogūnai', qty: 1 },
    { name: 'morkos', qty: 1 }, { name: 'aliejus', qty: 20, optional: true }, { name: 'druska', qty: 3, optional: true }] },
  { name: 'Bulvių košė', minutes: 25, ingredients: [
    { name: 'bulvės', qty: 800 }, { name: 'pienas', qty: 150 }, { name: 'sviestas', qty: 30 },
    { name: 'druska', qty: 3, optional: true }] },
  { name: 'Keptos bulvės su dešrelėmis', minutes: 30, ingredients: [
    { name: 'bulvės', qty: 600 }, { name: 'dešrelės', qty: 300 }, { name: 'svogūnai', qty: 1 },
    { name: 'aliejus', qty: 30, optional: true }] },
  { name: 'Bolonijos makaronai', minutes: 35, ingredients: [
    { name: 'makaronai', qty: 300 }, { name: 'malta mėsa', qty: 400 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'svogūnai', qty: 1 }, { name: 'česnakai', qty: 2, optional: true }] },
  { name: 'Kotletai', minutes: 35, ingredients: [
    { name: 'malta mėsa', qty: 500 }, { name: 'kiaušiniai', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'duona', qty: 50 }, { name: 'pipirai', qty: 1, optional: true }] },
  { name: 'Pomidorų ir agurkų salotos', minutes: 10, ingredients: [
    { name: 'pomidorai', qty: 3 }, { name: 'agurkai', qty: 2 }, { name: 'grietinė', qty: 100 },
    { name: 'svogūnai', qty: 1, optional: true }] },
  { name: 'Karšti sumuštiniai', minutes: 10, ingredients: [
    { name: 'duona', qty: 200 }, { name: 'sūris', qty: 100 }, { name: 'kumpis', qty: 100 },
    { name: 'pomidorai', qty: 1, optional: true }] },
  { name: 'Avižinė košė su obuoliais', minutes: 10, ingredients: [
    { name: 'avižiniai dribsniai', qty: 80 }, { name: 'pienas', qty: 250 }, { name: 'obuoliai', qty: 1 },
    { name: 'cukrus', qty: 10, optional: true }] },
  { name: 'Bananų blynai', minutes: 15, ingredients: [
    { name: 'bananai', qty: 2 }, { name: 'kiaušiniai', qty: 2 }, { name: 'avižiniai dribsniai', qty: 40 }] },
  { name: 'Obuolių pyragas', minutes: 60, ingredients: [
    { name: 'obuoliai', qty: 4 }, { name: 'kiaušiniai', qty: 3 }, { name: 'miltai', qty: 200 },
    { name: 'cukrus', qty: 150 }, { name: 'sviestas', qty: 100 }] },
  { name: 'Kepta lašiša su ryžiais', minutes: 25, ingredients: [
    { name: 'lašiša', qty: 300 }, { name: 'ryžiai', qty: 200 }, { name: 'citrinos', qty: 1 },
    { name: 'sviestas', qty: 20, optional: true }] },
  { name: 'Troškinti kopūstai', minutes: 45, ingredients: [
    { name: 'kopūstai', qty: 800 }, { name: 'morkos', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'dešrelės', qty: 200 }, { name: 'konservuoti pomidorai', qty: 200, optional: true }] },
  { name: 'Cukinijų blynai', minutes: 25, ingredients: [
    { name: 'cukinijos', qty: 2 }, { name: 'kiaušiniai', qty: 2 }, { name: 'miltai', qty: 80 },
    { name: 'česnakai', qty: 1, optional: true }, { name: 'grietinė', qty: 100, optional: true }] },
  { name: 'Ryžiai su grybais', minutes: 30, ingredients: [
    { name: 'ryžiai', qty: 250 }, { name: 'grybai', qty: 300 }, { name: 'svogūnai', qty: 1 },
    { name: 'sviestas', qty: 30 }, { name: 'sūris', qty: 50, optional: true }] },
  { name: 'Tuno salotos', minutes: 10, ingredients: [
    { name: 'konservuotas tunas', qty: 150 }, { name: 'kiaušiniai', qty: 2 }, { name: 'agurkai', qty: 1 },
    { name: 'grietinė', qty: 50 }] },
  { name: 'Pupelių troškinys', minutes: 30, ingredients: [
    { name: 'konservuotos pupelės', qty: 400 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'svogūnai', qty: 1 }, { name: 'paprikos', qty: 1 }, { name: 'česnakai', qty: 2, optional: true }] },
  { name: 'Kiaušiniai su špinatais', minutes: 10, ingredients: [
    { name: 'kiaušiniai', qty: 3 }, { name: 'špinatai', qty: 100 }, { name: 'sviestas', qty: 10 },
    { name: 'sūris', qty: 30, optional: true }] },
  { name: 'Jogurtas su bananais', minutes: 5, ingredients: [
    { name: 'jogurtas', qty: 200 }, { name: 'bananai', qty: 1 },
    { name: 'avižiniai dribsniai', qty: 30, optional: true }] },
  { name: 'Vištienos salotos', minutes: 20, ingredients: [
    { name: 'vištiena', qty: 300 }, { name: 'pomidorai', qty: 2 }, { name: 'agurkai', qty: 1 },
    { name: 'paprikos', qty: 1 }, { name: 'aliejus', qty: 20, optional: true }] },
  { name: 'Įdarytos paprikos', minutes: 50, ingredients: [
    { name: 'paprikos', qty: 4 }, { name: 'malta mėsa', qty: 300 }, { name: 'ryžiai', qty: 100 },
    { name: 'svogūnai', qty: 1 }, { name: 'konservuoti pomidorai', qty: 200 }] },
];
