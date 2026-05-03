import { StatusBar } from 'expo-status-bar';
import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Loading } from './components/Loading';
import { Routes } from './routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold
  });

  return (
    <SafeAreaProvider>
      <StatusBar 
        style="dark" 
        backgroundColor="transparent" 
        translucent 
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </SafeAreaProvider>
  );
}
