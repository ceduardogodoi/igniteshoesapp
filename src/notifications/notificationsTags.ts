import OneSignal from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: 'Carlos',
    user_email: 'carloseduardoalvesgodoi@hotmail.com',
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount);
}
