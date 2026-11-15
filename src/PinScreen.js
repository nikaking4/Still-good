import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, pressable, radius, space, tones, type } from './theme';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export default function PinScreen({ household, onUnlock }) {
  const [digits, setDigits] = useState('');
  const [wrong, setWrong] = useState(false);

  const press = (key) => {
    setWrong(false);
    setDigits((d) => (key === '⌫' ? d.slice(0, -1) : (d + key).slice(0, 4)));
  };

  useEffect(() => {
    if (digits.length < 4) return;
    if (digits === household.pin) return onUnlock();
    setDigits('');
    setWrong(true);
  }, [digits]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{household.name}</Text>
      <Text style={type.small}>Įveskite 4 skaitmenų PIN</Text>
      <View style={styles.dots} accessibilityLabel={`Įvesta ${digits.length} iš 4`}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.dot, i < digits.length && styles.dotFilled]} />
        ))}
      </View>
      <Text style={styles.error} accessibilityLiveRegion="polite">{wrong ? 'Neteisingas PIN' : ' '}</Text>
      <View style={styles.pad}>
        {KEYS.map((key, i) =>
          key ? (
            <Pressable key={i} onPress={() => press(key)} style={pressable(styles.key, styles.keyButton)} accessibilityRole="button"
              accessibilityLabel={key === '⌫' ? 'Ištrinti' : key}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ) : (
            <View key={i} style={styles.key} />
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: space.md },
  title: { ...type.title, fontSize: 24, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: space.lg, marginTop: space.md },
  dot: { width: 16, height: 16, borderRadius: radius.pill, borderWidth: 2, borderColor: colors.primary },
  dotFilled: { backgroundColor: colors.primary },
  error: { color: tones.danger.fg, fontSize: 14, fontWeight: '600' },
  pad: { flexDirection: 'row', flexWrap: 'wrap', width: 3 * 72 + 2 * space.lg, gap: space.lg },
  key: { width: 72, height: 72, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  keyButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  keyText: { fontSize: 26, fontWeight: '600', color: colors.text },
});
