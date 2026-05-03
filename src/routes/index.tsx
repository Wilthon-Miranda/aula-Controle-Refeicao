import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import theme from '../theme';

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_7 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
