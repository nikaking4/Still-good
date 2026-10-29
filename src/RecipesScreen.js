import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { rank } from './core/rank';
import { CATALOG } from './data/catalog';
import { RECIPES } from './data/recipes';

const describe = (m) =>
  m.reason === 'expired' ? `${m.name} (pasibaigęs galiojimas)`
  : m.reason === 'short' ? `${m.name} (nepakanka kiekio: dar ${m.short} ${CATALOG[m.name].unit})`
  : m.name;

// Cards one per screen with vertical paging (the "Reels" swipe), or a plain list as the alternative view.
export default function RecipesScreen({ products, today, onCook, onAddProducts }) {
  const ranked = useMemo(() => rank(products, RECIPES, today, CATALOG), [products, today]);
  const [asList, setAsList] = useState(false);
  const [height, setHeight] = useState(0);
  const listRef = useRef(null);
  // New ranking (product added or cooked): jump back to the first card.
  useEffect(() => listRef.current?.scrollToOffset({ offset: 0, animated: false }), [ranked]);

  if (!ranked.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Receptų nerasta</Text>
        <Text style={styles.muted}>Iš turimų produktų nepavyko rasti recepto, kuriam trūktų ne daugiau kaip 2 produktų.</Text>
        <Pressable style={styles.button} onPress={onAddProducts} accessibilityRole="button">
          <Text style={styles.buttonText}>Pridėti produktų</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Pressable onPress={() => setAsList(!asList)} style={styles.toggle} accessibilityRole="button">
        <Text style={styles.link}>{asList ? 'Rodyti korteles' : 'Rodyti sąrašą'}</Text>
      </Pressable>
      <View style={styles.root} onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
        {height > 0 && (
          <FlatList
            ref={listRef}
            key={asList ? 'list' : 'cards'}
            data={ranked}
            keyExtractor={(r) => r.recipe.name}
            pagingEnabled={!asList}
            showsVerticalScrollIndicator={asList}
            renderItem={({ item, index }) => (
              <View style={asList ? styles.listItem : { height, padding: 16 }}>
                <Card result={item} position={`${index + 1} / ${ranked.length}`} onCook={onCook} fill={!asList} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

function Card({ result: { recipe, score, missing, canMake }, position, onCook, fill }) {
  return (
    <View style={[styles.card, fill && styles.fill]}>
      <Text style={styles.muted}>{position}</Text>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={canMake ? styles.ok : styles.warn}>
        {canMake ? 'Galima pagaminti' : `Trūksta ${missing.length}: ${missing.map(describe).join(', ')}`}
      </Text>
      <Text style={styles.muted}>Skubumo balas {score} · {recipe.minutes} min.</Text>
      <View style={styles.ingredients}>
        {recipe.ingredients.map((i) => (
          <Text key={i.name} style={styles.ingredient}>
            • {i.name} {i.qty} {CATALOG[i.name].unit}{i.optional ? ' (nebūtina)' : ''}
          </Text>
        ))}
      </View>
      <Pressable style={styles.button} onPress={() => onCook(recipe)} accessibilityRole="button">
        <Text style={styles.buttonText}>Pagaminau</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  toggle: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 4 },
  link: { color: '#2f6f4f', fontWeight: '600' },
  listItem: { paddingHorizontal: 16, paddingVertical: 6 },
  fill: { flex: 1 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, gap: 8, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  title: { fontSize: 26, fontWeight: '700' },
  ok: { color: '#2f6f4f', fontWeight: '600' },
  warn: { color: '#9a5b00', fontWeight: '600' },
  muted: { color: '#777' },
  ingredients: { gap: 4, marginVertical: 8 },
  ingredient: { fontSize: 16 },
  button: { backgroundColor: '#2f6f4f', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 'auto' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  empty: { flex: 1, padding: 24, justifyContent: 'center', gap: 12 },
  emptyTitle: { fontSize: 22, fontWeight: '700' },
});
