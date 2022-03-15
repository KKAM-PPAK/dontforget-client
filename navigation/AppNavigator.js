import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import dayjs from "dayjs";
import AuthScreen from "../screens/Auth/AuthScreen";
import { fetchUserInfo } from "../redux/slices/userSlices";
import MainNavigator from "./MainNavigator";
import { addTimeline } from "../redux/slices/timeLineSlices";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        dispatch(fetchUserInfo());
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 6 * 10000,
        },
        async (location) => {
          const today = dayjs().format("YYYY-MM-DD");
          const backgroundLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          const locationBefore = await AsyncStorage.getItem(today);

          if (!locationBefore) {
            const initLoc = [];
            initLoc.push(backgroundLocation);
            await AsyncStorage.setItem(today, JSON.stringify(initLoc));

            dispatch(addTimeline());

            return;
          }

          const item = JSON.parse(locationBefore);
          item.push(backgroundLocation);

          await AsyncStorage.setItem(today, JSON.stringify(item));
        },
      );
    })();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {user.email ? <MainNavigator /> : <AuthScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
