import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../theme';

type Props = {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY' | 'OCCUPY';
};

export function Header({ title, type = 'PRIMARY' }: Props) {
  const navigation = useNavigation();

  const backgroundColor = 
    type === 'PRIMARY' ? theme.COLORS.GRAY_5 : 
    type === 'SECONDARY' ? theme.COLORS.GREEN_LIGHT : 
    theme.COLORS.RED_LIGHT;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft 
          size={24} 
          color={theme.COLORS.GRAY_2} 
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  backButton: {
    position: 'absolute',
    left: 24,
    bottom: 24,
  },
  title: {
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  }
});
