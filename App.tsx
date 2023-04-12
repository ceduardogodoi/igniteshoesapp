import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import OneSignal from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags'

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.setAppId('87f5490d-7b83-49ce-9432-16b1769d1bf5')
// OneSignal.setEmail('carloseduardoalvesgodoi@hotmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler(response => {
      const { actionId } = response.action as any
      switch (actionId) {
        case '1':
          console.log('Ver todas');
          break;
        case '2':
          console.log('Ver pedido');
          break;
        default:
          console.log('Não foi clicado em botão de ação');
      }
    })

    return () => unsubscribe;
  }, [])

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