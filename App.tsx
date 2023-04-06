import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import OneSignal from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserEmailCreate } from './src/notifications/notificationsTags'

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.setAppId('87f5490d-7b83-49ce-9432-16b1769d1bf5')
// OneSignal.setEmail('carloseduardoalvesgodoi@hotmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate('carloseduardoalvesgodoi@hotmail.com');

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}