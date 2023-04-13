import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import OneSignal, { OSNotification } from 'react-native-onesignal';
// import * as Linking from 'expo-linking';

import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['com.rocketseat.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId(productId: string) {
            return productId;
          }
        }
      },
    },
  },
};

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // const deepLinking = Linking.createURL('details', {
  //   queryParams: {
  //     productId: '7',
  //   },
  // });
  // console.log(deepLinking);

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);
      })

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}