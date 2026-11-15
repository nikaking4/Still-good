import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProductsScreen from './src/ProductsScreen';
import RecipesScreen from './src/RecipesScreen';
import HistoryScreen from './src/HistoryScreen';
import PinScreen from './src/PinScreen';
import { consume, newId } from './src/core/products';
import { CATALOG } from './src/data/catalog';
import { HOUSEHOLDS } from './src/data/households';
import { colors, pressable, radius, shadow, space, type } from './src/theme';
import { openHousehold } from './src/storage';

const localToday = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export default function App() {
  const [household, setHousehold] = useState(HOUSEHOLDS[0].id);
  const [unlocked, setUnlocked] = useState(null);
  const choose = (id) => {
    if (id === household) return;
    setHousehold(id);
    setUnlocked(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.brand}>Still Good</Text>
            <Text style={styles.greeting} accessibilityRole="header" numberOfLines={2}>
              {unlocked ? `Labas, ${HOUSEHOLDS.find((h) => h.id === unlocked).name}!` : 'Kas naudojasi?'}
            </Text>
          </View>
          {unlocked && (
            <Pressable onPress={() => setUnlocked(null)} style={pressable(styles.lock)} accessibilityRole="button" hitSlop={8}>
              <Text style={styles.lockText}>Užrakinti</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.households} accessibilityRole="radiogroup" accessibilityLabel="Namų ūkis">
          {HOUSEHOLDS.map((h) => (
            <Pressable key={h.id} onPress={() => choose(h.id)} accessibilityRole="radio"
              accessibilityState={{ checked: household === h.id }}
              style={[styles.household, household === h.id && styles.householdActive]}>
              <Text style={[styles.householdText, household === h.id && styles.householdTextActive]}>{h.name}</Text>
            </Pressable>
          ))}
        </View>
        {unlocked === household ? (
          <Pantry key={household} householdId={household} />
        ) : (
          <PinScreen key={household} household={HOUSEHOLDS.find((h) => h.id === household)}
            onUnlock={() => setUnlocked(household)} />
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Pantry({ householdId }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('products');
  const [history, setHistory] = useState([]);
  const [undo, setUndo] = useState(null);
  const [store, setStore] = useState(null);
  const [failed, setFailed] = useState(false);
  const today = localToday();

  useEffect(() => {
    openHousehold(householdId, today)
      .then(async (opened) => {
        const [saved, cooked] = await Promise.all([opened.loadProducts(), opened.loadHistory()]);
        setProducts(saved);
        setHistory(cooked);
        setStore(opened);
        setLoaded(true);
      })
      .catch((e) => {
        console.warn('Opening household failed', e);
        setFailed(true);
      });
  }, []);

  useEffect(() => {
    if (loaded) store.saveProducts(products).catch(() => {});
  }, [products, loaded]);

  const update = (next) => {
    setUndo(null);
    setProducts(next);
  };
  const cook = (recipe) => {
    const entry = { id: newId(), recipe: recipe.name, date: today };
    setUndo({ products, entry });
    setProducts(consume(products, recipe, today, CATALOG));
    setHistory((h) => [entry, ...h]);
    store.addCooked(entry).catch(() => {});
  };
  const undoCook = () => {
    setProducts(undo.products);
    setHistory((h) => h.filter((e) => e.id !== undo.entry.id));
    store.removeCooked(undo.entry.id).catch(() => {});
    setUndo(null);
  };

  if (failed) {
    return (
      <View style={styles.message}>
        <Text style={styles.messageTitle}>Nepavyko atverti duomenų</Text>
        <Text style={type.body}>Uždarykite ir vėl atverkite programą. Naršyklėje galite išvalyti svetainės duomenis.</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.tabs} accessibilityRole="tablist">
        {[['products', 'Produktai'], ['recipes', 'Receptai'], ['history', 'Istorija']].map(([key, label]) => (
          <Pressable key={key} onPress={() => setTab(key)} style={[styles.tab, tab === key && styles.tabActive]}
            accessibilityRole="tab" accessibilityState={{ selected: tab === key }}>
            <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      {tab === 'products' ? (
        <ProductsScreen products={products} onChange={update} today={today} />
      ) : tab === 'recipes' ? (
        <RecipesScreen products={products} today={today} onCook={cook} onAddProducts={() => setTab('products')} />
      ) : (
        <HistoryScreen history={history} />
      )}
      {undo && (
        <View style={styles.undo}>
          <Text style={styles.undoText}>Pagaminta: {undo.entry.recipe}</Text>
          <Pressable onPress={undoCook} accessibilityRole="button"
            style={pressable()} hitSlop={8}>
            <Text style={styles.undoButton}>Atšaukti</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingHorizontal: space.lg,
    paddingTop: space.lg, paddingBottom: space.sm },
  headerText: { flex: 1 },
  brand: { ...type.label, color: colors.primary },
  greeting: { ...type.title, marginTop: 2 },
  lock: { paddingVertical: 6, paddingHorizontal: space.md, borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  lockText: { color: colors.primaryDark, fontWeight: '600', fontSize: 14 },
  households: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginHorizontal: space.lg, marginBottom: space.md },
  household: { paddingVertical: 6, paddingHorizontal: space.md, borderRadius: radius.pill, borderWidth: 1,
    borderColor: colors.border },
  householdActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  householdText: { fontSize: 14, fontWeight: '600', color: colors.muted },
  householdTextActive: { color: colors.onPrimary },
  message: { flex: 1, padding: space.xl, justifyContent: 'center', gap: space.md },
  messageTitle: { ...type.title, fontSize: 24 },
  tabs: { flexDirection: 'row', marginHorizontal: space.lg, marginBottom: space.sm, padding: space.xs,
    borderRadius: radius.pill, backgroundColor: colors.track },
  tab: { flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary, ...shadow },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.muted },
  tabTextActive: { color: colors.onPrimary },
  undo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: space.lg,
    paddingVertical: space.md, paddingHorizontal: space.lg, borderRadius: radius.md, backgroundColor: colors.inverse, ...shadow },
  undoText: { color: colors.onInverse, flexShrink: 1, fontSize: 15 },
  undoButton: { color: colors.accentOnInverse, fontWeight: '700', marginLeft: space.md, fontSize: 15 },
});
