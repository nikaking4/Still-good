import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, FlatList, Image, PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { rank } from './core/rank';
import { CATALOG } from './data/catalog';
import { RECIPES } from './data/recipes';
import { colors, pressable, radius, shadow, space, tones, type } from './theme';

const SWIPE = 110;

const reason = (m) =>
  m.reason === 'expired' ? 'pasibaigęs galiojimas'
  : m.reason === 'short' ? `nepakanka kiekio: dar ${m.short} ${CATALOG[m.name].unit}`
  : 'neturite';

const MARKS = {
  have: { mark: '✓', color: tones.ok.fg },
  missing: { mark: '!', color: tones.warn.fg },
  optional: { mark: '·', color: colors.muted },
};

export default function RecipesScreen({ products, today, onCook, onAddProducts }) {
  const ranked = useMemo(() => rank(products, RECIPES, today, CATALOG), [products, today]);
  const [asList, setAsList] = useState(false);
  const [openName, setOpenName] = useState(null);
  const open = ranked.find((r) => r.recipe.name === openName);
  const close = useCallback(() => setOpenName(null), []);

  if (!ranked.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Receptų nerasta</Text>
        <Text style={[type.body, styles.emptyText]}>
          Iš turimų produktų nepavyko rasti recepto, kuriam trūktų ne daugiau kaip 2 produktų.
        </Text>
        <Pressable style={pressable(styles.button, styles.emptyButton)} onPress={onAddProducts} accessibilityRole="button">
          <Text style={styles.buttonText}>Pridėti produktų</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Pressable onPress={() => setAsList(!asList)} style={pressable(styles.toggle)} accessibilityRole="button">
        <Text style={styles.toggleText}>{asList ? 'Rodyti korteles' : 'Rodyti sąrašą'}</Text>
      </Pressable>
      {asList ? (
        <FlatList
          data={ranked}
          keyExtractor={(r) => r.recipe.name}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <Card result={item} position={`${index + 1} / ${ranked.length}`} onOpen={setOpenName} />
          )}
        />
      ) : (
        <Deck ranked={ranked} onOpen={setOpenName} />
      )}
      {open && <RecipePage result={open} onClose={close} onCook={(recipe) => { close(); onCook(recipe); }} />}
    </View>
  );
}

function Deck({ ranked, onOpen }) {
  const [index, setIndex] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => setIndex(0), [ranked]);
  useLayoutEffect(() => x.setValue(0), [index, x]);
  const openCurrent = useRef();
  openCurrent.current = () => onOpen(ranked[index].recipe.name);

  const flyOut = (dir, done) =>
    Animated.timing(x, { toValue: dir * Dimensions.get('window').width * 1.5, duration: 200, useNativeDriver: false })
      .start(done);
  const skip = () => flyOut(-1, () => setIndex((i) => i + 1));
  const pick = () => flyOut(1, () => {
    openCurrent.current();
    x.setValue(0);
  });
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy),
    onPanResponderMove: Animated.event([null, { dx: x }], { useNativeDriver: false }),
    onPanResponderRelease: (_, g) => {
      if (g.dx < -SWIPE || g.vx < -0.6) skip();
      else if (g.dx > SWIPE || g.vx > 0.6) pick();
      else Animated.spring(x, { toValue: 0, useNativeDriver: false }).start();
    },
    onPanResponderTerminate: () => Animated.spring(x, { toValue: 0, useNativeDriver: false }).start(),
  })).current;

  if (index >= ranked.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Peržiūrėjote visus receptus</Text>
        <Pressable style={pressable(styles.button, styles.emptyButton)} onPress={() => setIndex(0)} accessibilityRole="button">
          <Text style={styles.buttonText}>Pradėti iš naujo</Text>
        </Pressable>
      </View>
    );
  }

  const rotate = x.interpolate({ inputRange: [-300, 0, 300], outputRange: ['-10deg', '0deg', '10deg'] });
  const position = (i) => `${i + 1} / ${ranked.length}`;
  const next = ranked[index + 1];
  return (
    <View style={styles.root}>
      <View style={styles.deck}>
        {next && (
          <View style={[StyleSheet.absoluteFill, styles.behind]} importantForAccessibility="no-hide-descendants">
            <Card result={next} position={position(index + 1)} fill />
          </View>
        )}
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX: x }, { rotate }] }]} {...pan.panHandlers}
          accessibilityActions={[{ name: 'skip', label: 'Praleisti' }, { name: 'pick', label: 'Rinktis' }]}
          onAccessibilityAction={(e) => (e.nativeEvent.actionName === 'skip' ? skip() : pick())}>
          <Card result={ranked[index]} position={position(index)} fill />
          <Animated.View pointerEvents="none" style={[styles.stamp, styles.stampPick,
            { opacity: x.interpolate({ inputRange: [0, SWIPE], outputRange: [0, 1], extrapolate: 'clamp' }) }]}>
            <Text style={[styles.stampText, { color: tones.ok.fg }]}>RINKTIS</Text>
          </Animated.View>
          <Animated.View pointerEvents="none" style={[styles.stamp, styles.stampSkip,
            { opacity: x.interpolate({ inputRange: [-SWIPE, 0], outputRange: [1, 0], extrapolate: 'clamp' }) }]}>
            <Text style={[styles.stampText, { color: tones.danger.fg }]}>PRALEISTI</Text>
          </Animated.View>
        </Animated.View>
      </View>
      <Text style={styles.hint} importantForAccessibility="no">← braukite praleisti · rinktis →</Text>
    </View>
  );
}

function Card({ result, position, onOpen, fill }) {
  const { recipe, score } = result;
  return (
    <View style={[styles.card, fill && styles.fill]}>
      <View style={fill ? styles.photoTall : styles.photo}>
        {recipe.image && <Image source={recipe.image} style={styles.photoImg} alt={recipe.name} />}
        <View style={styles.chips}>
          <Text style={styles.chip}>{recipe.minutes} min.</Text>
          <Text style={styles.chip}>Skubumas {score}</Text>
          <Text style={[styles.chip, styles.chipEnd]}>{position}</Text>
        </View>
      </View>
      <View style={[styles.cardBody, fill && styles.fill]}>
        <Text style={styles.title} numberOfLines={2}>{recipe.name}</Text>
        <Status result={result} />
        <Ingredients result={result} scroll={fill} />
        {onOpen && (
          <Pressable style={pressable(styles.button)} onPress={() => onOpen(recipe.name)} accessibilityRole="button">
            <Text style={styles.buttonText}>Žiūrėti receptą</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function Status({ result: { missing, canMake } }) {
  const tone = canMake ? tones.ok : tones.warn;
  return (
    <View style={[styles.status, { backgroundColor: tone.bg }]}>
      <Text style={[styles.statusText, { color: tone.fg }]}>
        {canMake ? 'Galima pagaminti' : `Trūksta ${missing.length}`}
      </Text>
    </View>
  );
}

function Ingredients({ result: { recipe, missing }, scroll }) {
  const missingBy = Object.fromEntries(missing.map((m) => [m.name, m]));
  const required = recipe.ingredients.filter((i) => !i.optional).length;
  const List = scroll ? ScrollView : View;
  return (
    <>
      <View style={styles.sectionHead}>
        <Text style={type.label}>Ingredientai</Text>
        <Text style={type.small}>Turite {required - missing.length} iš {required}</Text>
      </View>
      <List style={scroll && styles.fill}>
        {recipe.ingredients.map((i) => {
          const m = missingBy[i.name];
          const state = m ? 'missing' : i.optional ? 'optional' : 'have';
          return (
            <View key={i.name} style={styles.ingredient}>
              <Text style={[styles.mark, { color: MARKS[state].color }]}>{MARKS[state].mark}</Text>
              <View style={styles.ingredientName}>
                <Text style={[type.body, m && { color: tones.warn.fg, fontWeight: '600' }]}>{i.name}</Text>
                {(m || i.optional) && (
                  <Text style={[type.small, m && { color: tones.warn.fg }]}>{m ? reason(m) : 'nebūtina'}</Text>
                )}
              </View>
              <Text style={type.small}>{i.qty} {CATALOG[i.name].unit}</Text>
            </View>
          );
        })}
      </List>
    </>
  );
}

function RecipePage({ result, onClose, onCook }) {
  const { recipe, score } = result;
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { onClose(); return true; });
    return () => sub.remove();
  }, [onClose]);
  return (
    <View style={[StyleSheet.absoluteFill, styles.page]}>
      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.pagePhoto}>
          {recipe.image && <Image source={recipe.image} style={styles.photoImg} alt={recipe.name} />}
          <View style={styles.chips}>
            <Pressable onPress={onClose} style={pressable()} accessibilityRole="button" accessibilityLabel="Atgal" hitSlop={8}>
              <Text style={styles.chip}>‹ Atgal</Text>
            </Pressable>
            <Text style={[styles.chip, styles.chipEnd]}>{recipe.minutes} min.</Text>
            <Text style={styles.chip}>Skubumas {score}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.title} accessibilityRole="header">{recipe.name}</Text>
          <Status result={result} />
          <Ingredients result={result} />
          <Text style={[type.label, styles.stepsHead]}>Gaminimas</Text>
          {recipe.steps.map((s, i) => (
            <View key={i} style={styles.step}>
              <Text style={styles.stepNo}>{i + 1}</Text>
              <Text style={[type.body, styles.stepText]}>{s}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.pageFooter}>
        <Pressable style={pressable(styles.button)} onPress={() => onCook(recipe)} accessibilityRole="button">
          <Text style={styles.buttonText}>Pagaminau</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  toggle: { alignSelf: 'flex-end', marginRight: space.lg, marginTop: space.xs, paddingVertical: 6, paddingHorizontal: space.md,
    borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  toggleText: { color: colors.primaryDark, fontWeight: '600', fontSize: 14 },
  list: { padding: space.lg, gap: space.md },
  deck: { flex: 1, margin: space.lg, marginBottom: space.sm },
  behind: { transform: [{ scale: 0.95 }, { translateY: 12 }], opacity: 0.7 },
  fill: { flex: 1 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, overflow: 'hidden', userSelect: 'none', ...shadow },
  photo: { width: '100%', height: 190, overflow: 'hidden', backgroundColor: colors.track },
  photoTall: { width: '100%', height: '42%', overflow: 'hidden', backgroundColor: colors.track },
  photoImg: { width: '100%', height: '100%' },
  chips: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', gap: space.sm, padding: space.md },
  chip: { paddingVertical: 5, paddingHorizontal: space.md, borderRadius: radius.pill, overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.92)', color: colors.text, fontSize: 13, fontWeight: '700' },
  chipEnd: { marginLeft: 'auto' },
  cardBody: { padding: space.xl, paddingTop: space.lg, gap: space.md },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, lineHeight: 29, color: colors.text },
  status: { alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: space.md, borderRadius: radius.pill },
  statusText: { fontWeight: '700', fontSize: 13 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: space.xs },
  ingredient: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  mark: { width: 16, textAlign: 'center', fontSize: 15, fontWeight: '800' },
  ingredientName: { flex: 1 },
  page: { backgroundColor: colors.bg },
  pageContent: { paddingBottom: space.xl },
  pagePhoto: { width: '100%', height: 240, overflow: 'hidden', backgroundColor: colors.track },
  stepsHead: { marginTop: space.sm },
  step: { flexDirection: 'row', gap: space.md, alignItems: 'flex-start' },
  stepNo: { width: 26, height: 26, lineHeight: 26, borderRadius: radius.pill, overflow: 'hidden', textAlign: 'center',
    backgroundColor: colors.primarySoft, color: colors.primaryDark, fontWeight: '800', fontSize: 13 },
  stepText: { flex: 1, lineHeight: 23 },
  pageFooter: { padding: space.lg, paddingTop: space.md, borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border, backgroundColor: colors.surface },
  hint: { ...type.small, textAlign: 'center', paddingBottom: space.md },
  stamp: { position: 'absolute', top: 64, paddingVertical: space.xs, paddingHorizontal: space.md,
    borderWidth: 3, borderRadius: radius.md, backgroundColor: colors.surface },
  stampPick: { left: space.xl, borderColor: tones.ok.fg, transform: [{ rotate: '-12deg' }] },
  stampSkip: { right: space.xl, borderColor: tones.danger.fg, transform: [{ rotate: '12deg' }] },
  stampText: { fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  button: { backgroundColor: colors.primary, paddingVertical: space.lg, borderRadius: radius.pill, alignItems: 'center' },
  buttonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '700' },
  empty: { flex: 1, padding: space.xl, justifyContent: 'center', gap: space.md },
  emptyTitle: { ...type.title, fontSize: 24 },
  emptyText: { color: colors.muted },
  emptyButton: { marginTop: space.sm },
});
