import { TouchableOpacity, TouchableOpacityProps, Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';

type Props = TouchableOpacityProps & {
  time: string;
  name: string;
  isInsideDiet: boolean;
};

export function MealItem({ time, name, isInsideDiet, ...rest }: Props) {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.time}>{time}</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      
      <View style={[
        styles.status, 
        { backgroundColor: isInsideDiet ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID }
      ]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.COLORS.GRAY_5,
    borderRadius: 6,
    marginBottom: 8,
  },
  time: {
    fontSize: theme.FONT_SIZE.XS,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  },
  divider: {
    height: 14,
    width: 1,
    backgroundColor: theme.COLORS.GRAY_4,
    marginHorizontal: 12,
  },
  name: {
    flex: 1,
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
  },
  status: {
    width: 14,
    height: 14,
    borderRadius: 7,
  }
});
