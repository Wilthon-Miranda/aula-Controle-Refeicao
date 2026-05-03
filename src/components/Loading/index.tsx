import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from '../../theme';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.COLORS.GREEN_DARK} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.GRAY_7,
  },
});
