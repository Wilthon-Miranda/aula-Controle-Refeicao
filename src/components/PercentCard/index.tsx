import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import { ArrowUpRight } from 'phosphor-react-native';
import theme from '../../theme';

type Props = TouchableOpacityProps & {
  percent: string;
};

export function PercentCard({ percent, ...rest }: Props) {
  const isHealthy = parseFloat(percent.replace(',', '.')) >= 50;

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: isHealthy ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT }
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      <ArrowUpRight 
        size={24} 
        color={isHealthy ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK} 
        style={styles.icon}
      />
      
      <Text style={styles.title}>
        {percent}%
      </Text>
      
      <Text style={styles.subtitle}>
        das refeições dentro da dieta
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  title: {
    fontSize: theme.FONT_SIZE.XXL,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  },
  subtitle: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
  }
});
