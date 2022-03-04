import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import COLORS from "./commons/constants/COLORS";
import store from "./redux/store/store";

import AppNavigator from "./navigation/AppNavigator";

async function fetchFonts() {
  await Font.loadAsync({
    "noto-regular": require("./assets/fonts/NotoSerifKR-Regular.otf"),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

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
