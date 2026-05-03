import { View, Image, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTextBold}>Daily</Text>
        <Text style={styles.logoText}>Diet</Text>
      </View>
      
      <Image 
        source={{ uri: 'https://github.com/Wilthon-Miranda.png' }} 
        style={styles.profile} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoTextBold: {
    fontSize: 18,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    lineHeight: 18,
  },
  logoText: {
    fontSize: 18,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.COLORS.GRAY_2,
  }
});
