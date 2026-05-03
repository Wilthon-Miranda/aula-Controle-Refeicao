import { TouchableOpacity, TouchableOpacityProps, Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';

export type OptionType = 'SUCCESS' | 'DANGER';

type Props = TouchableOpacityProps & {
  title: string;
  type: OptionType;
  isActive?: boolean;
};

export function Option({ title, type, isActive = false, style, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && type === 'SUCCESS' && styles.activeSuccess,
        isActive && type === 'DANGER' && styles.activeDanger,
        style
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={[
        styles.status,
        { backgroundColor: type === 'SUCCESS' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK }
      ]} />
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    maxHeight: 50,
    backgroundColor: theme.COLORS.GRAY_6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSuccess: {
    backgroundColor: theme.COLORS.GREEN_LIGHT,
    borderColor: theme.COLORS.GREEN_DARK,
  },
  activeDanger: {
    backgroundColor: theme.COLORS.RED_LIGHT,
    borderColor: theme.COLORS.RED_DARK,
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  },
});
