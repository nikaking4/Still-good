import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, space, type } from './theme';

export default function HistoryScreen({ history }) {
  if (!history.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Dar nieko nepagaminote</Text>
        <Text style={[type.body, styles.emptyText]}>
          Recepto puslapyje paspaudus „Pagaminau“, receptas atsiras čia.
        </Text>
      </View>
    );
  }

  const times = {};
  for (const e of history) times[e.recipe] = (times[e.recipe] ?? 0) + 1;

  return (
    <FlatList
      data={history}
      keyExtractor={(e) => e.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.heading}>Pagaminti receptai ({history.length})</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{item.recipe}</Text>
            {times[item.recipe] > 1 && <Text style={type.small}>Iš viso pagaminta {times[item.recipe]} k.</Text>}
          </View>
          <Text style={type.small}>{item.date}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: space.lg, paddingTop: space.sm, gap: space.sm },
  heading: { ...type.label, marginTop: space.sm, marginBottom: space.xs },
  item: { flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.surface,
    borderRadius: radius.md, paddingVertical: space.md, paddingHorizontal: space.lg, ...shadow },
  itemText: { flex: 1, gap: 2 },
  itemName: { ...type.body, fontWeight: '600' },
  empty: { flex: 1, padding: space.xl, justifyContent: 'center', gap: space.md },
  emptyTitle: { ...type.title, fontSize: 24 },
  emptyText: { color: colors.muted },
});
