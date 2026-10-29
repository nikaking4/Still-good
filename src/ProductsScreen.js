import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CATALOG, FREQUENT, NAMES } from './data/catalog';
import { daysLeft } from './core/products';

const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)) && new Date(Date.parse(s)).toISOString().startsWith(s);

// One tap on a product adds it (section 4). Quantity and date are optional and apply to the next tap.
export default function ProductsScreen({ products, onChange, today }) {
  const [search, setSearch] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const query = search.trim().toLowerCase();
  const choices = query ? NAMES.filter((n) => n.includes(query)) : FREQUENT;

  const add = (name) => {
    const amount = Number(qty.replace(',', '.'));
    if (qty && !(amount > 0)) return setError('Kiekis turi būti teigiamas skaičius.');
    if (date && !isDate(date)) return setError('Data turi būti formatu MMMM-MM-DD.');
    const entry = { id: `${Date.now()}-${Math.random()}`, name, added: today };
    if (qty) entry.qty = amount;
    if (date) entry.expires = date;
    onChange([...products, entry]);
    setSearch('');
    setQty('');
    setDate('');
    setError('');
  };

  const sorted = products
    .map((p) => ({ ...p, days: daysLeft(p, today, CATALOG) }))
    .sort((a, b) => a.days - b.days);

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <TextInput style={styles.input} placeholder="Ieškoti produkto" value={search} onChangeText={setSearch} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.half]} placeholder="Kiekis (nebūtina)" value={qty}
          onChangeText={setQty} keyboardType="decimal-pad" />
        <TextInput style={[styles.input, styles.half]} placeholder="Galioja iki (nebūtina)" value={date}
          onChangeText={setDate} />
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.heading}>{query ? 'Rasti produktai' : 'Dažniausi produktai'}</Text>
      <View style={styles.chips}>
        {choices.map((name) => (
          <Pressable key={name} style={styles.chip} onPress={() => add(name)} accessibilityRole="button"
            accessibilityLabel={`Pridėti ${name}`}>
            <Text style={styles.chipText}>+ {name}</Text>
          </Pressable>
        ))}
        {!choices.length && <Text style={styles.muted}>Tokio produkto sąraše nėra.</Text>}
      </View>

      <Text style={styles.heading}>Mano produktai ({products.length})</Text>
      {!products.length && <Text style={styles.muted}>Sąrašas tuščias. Paspauskite produktą viršuje.</Text>}
      {sorted.map((p) => (
        <View key={p.id} style={styles.item}>
          <View style={styles.itemText}>
            <Text style={styles.itemName}>
              {p.name}{p.qty != null ? ` · ${p.qty} ${CATALOG[p.name].unit}` : ''}
            </Text>
            <Text style={p.days < 0 ? styles.expired : styles.muted}>
              {p.days < 0 ? 'Pasibaigęs galiojimas' : `Liko ${p.days} d.`}
              {p.expires ? '' : ' (numatytasis terminas)'}
            </Text>
          </View>
          <Pressable onPress={() => onChange(products.filter((x) => x.id !== p.id))} style={styles.remove}
            accessibilityRole="button" accessibilityLabel={`Pašalinti ${p.name}`}>
            <Text style={styles.removeText}>✕</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1, minWidth: 0 },
  error: { color: '#b3261e' },
  heading: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#e3efe7', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
  chipText: { fontSize: 16, color: '#1f4d36' },
  muted: { color: '#777' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  itemText: { flex: 1 },
  itemName: { fontSize: 16 },
  expired: { color: '#b3261e', fontWeight: '600' },
  remove: { padding: 8 },
  removeText: { fontSize: 18, color: '#777' },
});
