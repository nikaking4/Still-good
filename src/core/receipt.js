const MIN_LETTERS = 4;
const STEM = 5;

const words = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[l1|]/g, 'i')
    .split(/[^a-z]+/).filter(Boolean);

const sameWord = (receiptWord, productWord) =>
  receiptWord.length >= MIN_LETTERS && productWord.startsWith(receiptWord.slice(0, STEM));

function matchLine(line, products) {
  const lineWords = words(line);
  const candidates = products
    .map(({ name, nameWords }) => {
      const found = nameWords.filter((p) => lineWords.some((w) => sameWord(w, p))).length;
      return { name, found, share: found / nameWords.length };
    })
    .filter((c) => c.found > 0)
    .sort((a, b) => b.share - a.share || b.found - a.found);

  const [best, second] = candidates;
  if (!best) return null;
  if (second && second.share === best.share && second.found === best.found) return null;
  return best.name;
}

export function matchReceipt(text, names) {
  const products = names.map((name) => ({ name, nameWords: words(name) }));
  return text
    .split('\n')
    .map((line) => ({ line: line.trim(), name: matchLine(line, products) }))
    .filter((m) => m.name);
}
