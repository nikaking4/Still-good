import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsScreen from './src/ProductsScreen';
import RecipesScreen from './src/RecipesScreen';
import { consume } from './src/core/products';
import { CATALOG } from './src/data/catalog';

const KEY = 'products';
// Local date as 'YYYY-MM-DD' (toISOString alone would give the UTC date).
const localToday = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('products');
  const [undo, setUndo] = useState(null); // product list before the last "cooked", for one-step undo
  const today = localToday();

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((json) => json && setProducts(JSON.parse(json)))
      .catch(() => {}) // corrupt or unreadable storage: start with an empty list
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(products)); // not before load, or [] would overwrite saved data
  }, [products, loaded]);

  const update = (next) => {
    setUndo(null);
    setProducts(next);
  };
  const cook = (recipe) => {
    setUndo({ products, name: recipe.name });
    setProducts(consume(products, recipe, today, CATALOG));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View style={styles.tabs}>
          {[['products', 'Produktai'], ['recipes', 'Receptai']].map(([key, label]) => (
            <Pressable key={key} onPress={() => setTab(key)} style={[styles.tab, tab === key && styles.tabActive]}
              accessibilityRole="tab" accessibilityState={{ selected: tab === key }}>
              <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>
        {tab === 'products' ? (
          <ProductsScreen products={products} onChange={update} today={today} />
        ) : (
          <RecipesScreen products={products} today={today} onCook={cook} onAddProducts={() => setTab('products')} />
        )}
        {undo && (
          <View style={styles.undo}>
            <Text style={styles.undoText}>Pagaminta: {undo.name}</Text>
            <Pressable onPress={() => { setProducts(undo.products); setUndo(null); }} accessibilityRole="button">
              <Text style={styles.undoButton}>Atšaukti</Text>
            </Pressable>
          </View>
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fafaf7' },
  tabs: { flexDirection: 'row', padding: 8, gap: 8 },
  tab: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', backgroundColor: '#eceae4' },
  tabActive: { backgroundColor: '#2f6f4f' },
  tabText: { fontSize: 16, color: '#333' },
  tabTextActive: { color: '#fff', fontWeight: '600' },
  undo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: '#333' },
  undoText: { color: '#fff', flexShrink: 1 },
  undoButton: { color: '#9fe0b8', fontWeight: '700', marginLeft: 12 },
});
