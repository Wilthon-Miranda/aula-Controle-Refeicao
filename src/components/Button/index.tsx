import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, View } from 'react-native';
import theme from '../../theme';

type Props = TouchableOpacityProps & {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
  icon?: React.ReactNode;
};

export function Button({ title, type = 'PRIMARY', icon, style, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'PRIMARY' ? styles.primaryContainer : styles.secondaryContainer,
        style
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.title,
          type === 'PRIMARY' ? styles.primaryTitle : styles.secondaryTitle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 6,
    minHeight: 56,
    width: '100%',
  },
  primaryContainer: {
    backgroundColor: theme.COLORS.GRAY_2,
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.COLORS.GRAY_1,
  },
  title: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  primaryTitle: {
    color: theme.COLORS.WHITE,
  },
  secondaryTitle: {
    color: theme.COLORS.GRAY_1,
  },
  icon: {
    marginRight: 12,
  },
});
