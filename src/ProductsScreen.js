import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CATALOG, FREQUENT, NAMES } from './data/catalog';
import { createEntry, daysLeft } from './core/products';
import { pickImage } from './ocr';
import ReceiptScreen from './ReceiptScreen';
import { colors, pressable, radius, shadow, space, tones, type } from './theme';

const toneOf = (days) => (days < 0 ? tones.danger : days <= 3 ? tones.warn : tones.ok);

const SORTS = [
  ['days', 'Galiojimas', (a, b) => a.days - b.days],
  ['name', 'Pavadinimas', (a, b) => a.name.localeCompare(b.name, 'lt')],
  ['newest', 'Naujausi', (a, b) => b.added.localeCompare(a.added) || b.order - a.order],
];

export default function ProductsScreen({ products, onChange, today }) {
  const [search, setSearch] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [sort, setSort] = useState('days');
  const [receipt, setReceipt] = useState(null);

  const query = search.trim().toLowerCase();
  const choices = query ? NAMES.filter((n) => n.includes(query)) : FREQUENT;

  const add = (name) => {
    const { entry, error: problem } = createEntry(name, { qty, date }, today, CATALOG);
    if (problem) return setError(problem);
    onChange((list) => [...list, entry]);
    setSearch('');
    setQty('');
    setDate('');
    setError('');
  };

  const addFromReceipt = (names) => {
    const entries = names.map((name) => createEntry(name, {}, today, CATALOG).entry);
    onChange((list) => [...list, ...entries]);
    setReceipt(null);
  };

  const compare = SORTS.find(([key]) => key === sort)[2];
  const sorted = products
    .map((p, order) => ({ ...p, days: daysLeft(p, today, CATALOG), order }))
    .sort(compare);

  return (
    <View style={styles.fill}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pridėti produktą</Text>
          <Pressable onPress={async () => setReceipt(await pickImage())} style={pressable(styles.scan)}
            accessibilityRole="button">
            <Text style={styles.scanText}>Nuskaityti čekį</Text>
          </Pressable>
          <TextInput style={styles.input} placeholder="Ieškoti produkto" placeholderTextColor={colors.muted}
            value={search} onChangeText={setSearch} />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.half]} placeholder="Kiekis" placeholderTextColor={colors.muted}
              value={qty} onChangeText={setQty} keyboardType="decimal-pad" />
            <TextInput style={[styles.input, styles.half]} placeholder="Galioja iki" placeholderTextColor={colors.muted}
              value={date} onChangeText={setDate} />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : <Text style={type.small}>Kiekis ir data nebūtini; data – MMMM-MM-DD.</Text>}

          <Text style={styles.heading}>{query ? 'Rasti produktai' : 'Dažniausi produktai'}</Text>
          <View style={styles.chips}>
            {choices.map((name) => (
              <Pressable key={name} style={pressable(styles.chip)} onPress={() => add(name)} accessibilityRole="button"
                accessibilityLabel={`Pridėti ${name}`}>
                <Text style={styles.chipText}>+ {name}</Text>
              </Pressable>
            ))}
            {!choices.length && <Text style={type.small}>Tokio produkto sąraše nėra.</Text>}
          </View>
        </View>

        <Text style={styles.heading}>Mano produktai ({products.length})</Text>
        {products.length > 1 && (
          <View style={styles.sorts} accessibilityRole="radiogroup" accessibilityLabel="Rikiuoti">
            {SORTS.map(([key, label]) => (
              <Pressable key={key} onPress={() => setSort(key)} accessibilityRole="radio"
                accessibilityState={{ checked: sort === key }} style={pressable(styles.sort, sort === key && styles.sortActive)}>
                <Text style={[styles.sortText, sort === key && styles.sortTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {!products.length && (
          <View style={styles.empty}>
            <Text style={type.small}>Sąrašas tuščias. Paspauskite produktą viršuje.</Text>
          </View>
        )}
        {sorted.map((p) => {
          const tone = toneOf(p.days);
          const details = [p.qty != null && `${p.qty} ${CATALOG[p.name].unit}`, !p.expires && 'numatytasis terminas']
            .filter(Boolean).join(' · ');
          return (
            <View key={p.id} style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.itemName}>{p.name}</Text>
                {!!details && <Text style={type.small}>{details}</Text>}
              </View>
              <View style={[styles.badge, { backgroundColor: tone.bg }]}>
                <Text style={[styles.badgeText, { color: tone.fg }]}>
                  {p.days < 0 ? 'Pasibaigęs' : `Liko ${p.days} d.`}
                </Text>
              </View>
              <Pressable onPress={() => onChange((list) => list.filter((x) => x.id !== p.id))} style={pressable(styles.remove)}
                hitSlop={6} accessibilityRole="button" accessibilityLabel={`Pašalinti ${p.name}`}>
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      {receipt && <ReceiptScreen image={receipt} onAdd={addFromReceipt} onClose={() => setReceipt(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: space.lg, paddingTop: space.sm, gap: space.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: space.lg, gap: space.sm, ...shadow },
  fill: { flex: 1 },
  scan: { backgroundColor: colors.primary, paddingVertical: space.md, borderRadius: radius.pill, alignItems: 'center' },
  scanText: { color: colors.onPrimary, fontSize: 16, fontWeight: '700' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: space.xs },
  sorts: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginBottom: space.xs },
  sort: { paddingVertical: 6, paddingHorizontal: space.md, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border },
  sortActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  sortText: { fontSize: 14, fontWeight: '600', color: colors.muted },
  sortTextActive: { color: colors.onPrimary },
  input: { ...type.body, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: space.md },
  row: { flexDirection: 'row', gap: space.sm },
  half: { flex: 1, minWidth: 0 },
  error: { color: tones.danger.fg, fontSize: 14 },
  heading: { ...type.label, marginTop: space.md, marginBottom: space.xs },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  chip: { backgroundColor: colors.primarySoft, paddingVertical: 9, paddingHorizontal: 14, borderRadius: radius.pill },
  chipText: { fontSize: 15, fontWeight: '600', color: colors.primaryDark },
  empty: { padding: space.lg, borderRadius: radius.md, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border },
  item: { flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.surface,
    borderRadius: radius.md, paddingVertical: space.md, paddingLeft: space.lg, paddingRight: space.sm, ...shadow },
  itemText: { flex: 1, gap: 2 },
  itemName: { ...type.body, fontWeight: '600' },
  badge: { paddingVertical: space.xs, paddingHorizontal: 10, borderRadius: radius.pill },
  badgeText: { fontSize: 13, fontWeight: '700' },
  remove: { width: 36, height: 36, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  removeText: { fontSize: 16, color: colors.muted },
});
