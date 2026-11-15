import { matchReceipt } from './receipt';
import { NAMES } from '../data/catalog';

const names = (text) => matchReceipt(text, NAMES).map((m) => m.name);

test('usual receipt: product lines matched, totals and payment lines ignored', () => {
  const receipt = `UAB PARDUOTUVE
PIENAS 2,5% 1L      1,29
DUONA RUGINE        1,49
BANANAI 1KG         1,59
SUMA               4,37
PVM 21%            0,76
MOKETI KORTELE ****1234`;
  expect(names(receipt)).toEqual(['pienas', 'duona', 'bananai']);
});

test('shortened names and lost accents still match', () => {
  expect(names('KIAUS. L 10VNT\nSVIEST. 82%\nGRIETINE 30%\nSŪRIS GOUDA\nVIST.KRUTINELE'))
    .toEqual(['kiaušiniai', 'sviestas', 'grietinė', 'sūris', 'vištiena']);
});

test('photo OCR mix-ups of I, l and 1 still match', () => {
  expect(names('PlENAS 2,5% 1L\nP1ENAS 3,2%\nMlLTAI 2KG')).toEqual(['pienas', 'pienas', 'miltai']);
});

test('different word ending matches the same product', () => {
  expect(names('AGURKAS ILGAVAISIS')).toEqual(['agurkai']);
});

test('fresh and canned tomatoes are told apart by the share of the name found', () => {
  expect(names('POMIDORAI 1KG')).toEqual(['pomidorai']);
  expect(names('POMIDORAI KONSERV. 400G')).toEqual(['konservuoti pomidorai']);
});

test('a line that fits several products equally is left out for the user', () => {
  expect(names('KONSERVAI')).toEqual([]);
});

test('each match keeps its receipt line for the confirmation screen', () => {
  expect(matchReceipt('  MILTAI 1KG  \nSUMA 1,00', NAMES)).toEqual([{ line: 'MILTAI 1KG', name: 'miltai' }]);
});
