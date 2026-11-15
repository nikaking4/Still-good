import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OcrRunner } from './ocr';
import { matchReceipt } from './core/receipt';
import { NAMES } from './data/catalog';
import { colors, pressable, radius, shadow, space, type } from './theme';

export default function ReceiptScreen({ image, onAdd, onClose }) {
  const [progress, setProgress] = useState(0);
  const [items, setItems] = useState(null);
  const [failed, setFailed] = useState(false);
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);

  const onText = (read) => {
    setText(read);
    setItems(matchReceipt(read, NAMES).map((m) => ({ ...m, checked: true })));
  };
  const onError = (e) => {
    console.warn('Receipt OCR failed', e);
    setFailed(true);
  };

  const toggle = (i) => setItems((list) => list.map((it, j) => (j === i ? { ...it, checked: !it.checked } : it)));
  const chosen = items?.filter((it) => it.checked) ?? [];

  let body;
  if (failed) {
    body = <Message title="Nepavyko nuskaityti čekio" text="Patikrinkite interneto ryšį (pirmą kartą atsisiunčiami kalbos duomenys) ir bandykite dar kartą." />;
  } else if (!items) {
    body = (
      <View style={styles.top}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={type.body}>Nuskaitoma… {Math.round(progress * 100)} %</Text>
        <Text style={[type.small, styles.centerText]}>Pirmą kartą tai užtrunka ilgiau: atsisiunčiami lietuvių kalbos duomenys.</Text>
      </View>
    );
  } else if (showText) {
    body = (
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={type.small}>Taip OCR perskaitė nuotrauką:</Text>
        <Text style={styles.raw} selectable>{text.trim() || '(tuščia)'}</Text>
      </ScrollView>
    );
  } else if (!items.length) {
    body = <Message title="Produktų neatpažinta" text="Čekyje nerasta nė vieno produkto iš sąrašo. Pridėkite juos ranka mygtukais." />;
  } else {
    body = (
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={type.small}>Rasta {items.length}. Atžymėkite klaidingai atpažintus, trūkstamus pridėkite ranka.</Text>
        {items.map((it, i) => (
          <Pressable key={i} onPress={() => toggle(i)} style={pressable(styles.item)} accessibilityRole="checkbox"
            accessibilityState={{ checked: it.checked }}>
            <View style={[styles.box, it.checked && styles.boxOn]}>
              {it.checked && <Text style={styles.tick}>✓</Text>}
            </View>
            <View style={styles.itemText}>
              <Text style={[styles.name, !it.checked && styles.off]}>{it.name}</Text>
              <Text style={type.small}>{it.line}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.page]}>
      {!items && !failed && <OcrRunner image={image} onProgress={setProgress} onText={onText} onError={onError} />}
      <Text style={styles.title} accessibilityRole="header">Čekio nuskaitymas</Text>
      <View style={styles.fill}>{body}</View>
      {items && (
        <Pressable onPress={() => setShowText(!showText)} style={pressable(styles.link)} accessibilityRole="button">
          <Text style={styles.linkText}>{showText ? 'Rodyti rastus produktus' : 'Rodyti nuskaitytą tekstą'}</Text>
        </Pressable>
      )}
      <View style={styles.footer}>
        <Pressable onPress={onClose} style={pressable(styles.button, styles.secondary)} accessibilityRole="button">
          <Text style={styles.secondaryText}>{items?.length ? 'Atšaukti' : 'Uždaryti'}</Text>
        </Pressable>
        {!!items?.length && (
          <Pressable onPress={() => onAdd(chosen.map((it) => it.name))} disabled={!chosen.length}
            style={pressable(styles.button, styles.primary, !chosen.length && styles.disabled)} accessibilityRole="button">
            <Text style={styles.primaryText}>Pridėti ({chosen.length})</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const Message = ({ title, text }) => (
  <View style={styles.center}>
    <Text style={styles.messageTitle}>{title}</Text>
    <Text style={[type.body, styles.centerText]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: { backgroundColor: colors.bg, padding: space.lg, gap: space.md },
  title: { ...type.title, fontSize: 24 },
  fill: { flex: 1 },
  top: { alignItems: 'center', gap: space.md, paddingTop: space.xl, paddingHorizontal: space.lg },
  raw: { fontFamily: 'monospace', fontSize: 13, color: colors.text, backgroundColor: colors.surface,
    borderRadius: radius.md, padding: space.md },
  link: { alignSelf: 'center', paddingVertical: space.xs },
  linkText: { color: colors.primaryDark, fontWeight: '700', fontSize: 14, textDecorationLine: 'underline' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, padding: space.lg },
  centerText: { textAlign: 'center', color: colors.muted },
  messageTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  list: { gap: space.sm, paddingBottom: space.lg },
  item: { flexDirection: 'row', alignItems: 'center', gap: space.md, backgroundColor: colors.surface,
    borderRadius: radius.md, paddingVertical: space.md, paddingHorizontal: space.lg, ...shadow },
  box: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center' },
  boxOn: { backgroundColor: colors.primary },
  tick: { color: colors.onPrimary, fontWeight: '800', fontSize: 14 },
  itemText: { flex: 1, gap: 2 },
  name: { ...type.body, fontWeight: '700' },
  off: { color: colors.muted, textDecorationLine: 'line-through' },
  footer: { flexDirection: 'row', gap: space.md },
  button: { flex: 1, paddingVertical: space.lg, borderRadius: radius.pill, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  primaryText: { color: colors.onPrimary, fontSize: 16, fontWeight: '700' },
  secondary: { backgroundColor: colors.primarySoft },
  secondaryText: { color: colors.primaryDark, fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.4 },
});
