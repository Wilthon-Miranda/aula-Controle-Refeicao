import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { NovaRefeicao } from '../screens/NovaRefeicao';
import { Feedback } from '../screens/Feedback';
import { Refeicao } from '../screens/Refeicao';
import { EditarRefeicao } from '../screens/EditarRefeicao';
import { Statistics } from '../screens/Statistics';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="home"
        component={Home}
      />
      <Screen 
        name="new"
        component={NovaRefeicao}
      />
      <Screen 
        name="feedback"
        component={Feedback}
      />
      <Screen 
        name="refeicao"
        component={Refeicao}
      />
      <Screen 
        name="editar"
        component={EditarRefeicao}
      />
      <Screen 
        name="statistics"
        component={Statistics}
      />
    </Navigator>
  );
}
