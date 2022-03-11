import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notification from "expo-notifications";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import {
  backgroundSubscription,
  foregroundSubscription,
  getNotificationPermission,
  triggerNotificationHandler,
} from "./commons/utils/localNotification";
import COLORS from "./commons/constants/COLORS";

import AppNavigator from "./navigation/AppNavigator";
import {
  backgroundLocationUpdate,
  backgroundTaskSetting,
  getPermission,
} from "./commons/utils/location";
import Loading from "./components/Apploading/Loading";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

backgroundTaskSetting();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (getPermission()) {
      setPermission(true);
    }
  }, [permission]);

  useEffect(async () => {
    await setTimeout(() => {
      Font.loadAsync({
        "noto-regular": require("./assets/fonts/NotoSerifKR-Regular.otf"),
        "gowun-regular": require("./assets/fonts/GowunDodum-Regular.ttf"),
      }).then(setFontLoaded(true));
    }, 5000);
  }, []);

  useEffect(() => {
    backgroundLocationUpdate();
  });

  useEffect(() => {
    (async () => {
      await getNotificationPermission();

      const nightNotification = {
        identifier: "night",
        body: "오늘 기록해야 할 멋진 일이 있나요? 기록",
        date: { hour: 22, minute: 0 },
        repeatType: "1",
        channelId: "main",
      };

      await triggerNotificationHandler(nightNotification);

      return () => {
        foregroundSubscription.remove();
        backgroundSubscription.remove();
      };
    })();
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={COLORS.lightgray} />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
