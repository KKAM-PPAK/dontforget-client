import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notification from "expo-notifications";
import {
  getNotificationPermission,
  triggerNotificationHandler,
} from "./commons/utils/noti";
import COLORS from "./commons/constants/COLORS";
import store from "./redux/store/store";

import AppNavigator from "./navigation/AppNavigator";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function fetchFonts() {
  await Font.loadAsync({
    "noto-regular": require("./assets/fonts/NotoSerifKR-Regular.otf"),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(async () => {
    await getNotificationPermission();
    // 추후 삭제
    // await Notification.cancelAllScheduledNotificationsAsync();
    console.log(
      "현재 작동중인 알림",
      await Notification.getAllScheduledNotificationsAsync(),
    );

    const nightNotification = {
      identifier: "night",
      body: "오늘 기록해야 할 멋진 일이 있나요? 기록",
      date: { hour: 22, minute: 0 },
      repeatType: "1",
      channelId: "main",
    };
    await triggerNotificationHandler(nightNotification);

    // const backgroundSubscription =
    //   Notification.addNotificationResponseReceivedListener((response) => {
    //     console.log("response", response);
    //   });

    // const foregroundSubscription = Notification.addNotificationReceivedListener(
    //   (notification) => {
    //     console.log("notification", notification);
    //   },
    // );

    // return () => {
    //   foregroundSubscription.remove();
    //   backgroundSubscription.remove();
    // };
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={COLORS.ivory} />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
