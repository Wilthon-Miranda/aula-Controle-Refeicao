import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../theme';

import { Button } from '../../components/Button';

import successImg from '../../../assets/success.png';
import failImg from '../../../assets/fail.png';

type RouteParams = {
  isDieta: boolean;
};

export function Feedback() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDieta } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.title, 
        { color: isDieta ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK }
      ]}>
        {isDieta ? 'Continue assim!' : 'Que pena!'}
      </Text>

      <Text style={styles.subtitle}>
        {isDieta ? (
          <>Você continua <Text style={{ fontFamily: theme.FONT_FAMILY.BOLD }}>dentro da dieta</Text>. Muito bem!</>
        ) : (
          <>Você <Text style={{ fontFamily: theme.FONT_FAMILY.BOLD }}>saiu da dieta</Text> dessa vez, mas continue se esforçando e não desista!</>
        )}
      </Text>

      <Image 
        source={isDieta ? successImg : failImg} 
        style={styles.image}
        resizeMode="contain"
      />

      <Button 
        title="Ir para a página inicial" 
        onPress={() => navigation.navigate('home')}
        style={{ width: 191 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: theme.COLORS.GRAY_7,
  },
  title: {
    fontSize: theme.FONT_SIZE.XL,
    fontFamily: theme.FONT_FAMILY.BOLD,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_1,
    textAlign: 'center',
    marginBottom: 40,
  },
  image: {
    width: 224,
    height: 288,
    marginBottom: 40,
  }
});
