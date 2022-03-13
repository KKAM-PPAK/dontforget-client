import * as Location from "expo-location";
import { Alert } from "react-native";
import * as TaskManager from "expo-task-manager";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../redux/store/store";
import { addTimeline } from "../../redux/slices/timeLineSlices";

export async function getPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status === "granted") {
    console.log("Foreground permission granted");

    const backgroundPermission =
      await Location.requestBackgroundPermissionsAsync();

    if (backgroundPermission.status === "granted") {
      console.log("Background permission granted");
      return true;
    }
    Alert.alert("위치 정보를 허용하지 않으면 일부 기능을 이용할 수 없습니다.");
  }
  return false;
}

export async function getCurrentPostiion() {
  const currentLocation = await Location.getCurrentPositionAsync({});

  const locationData = {
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  return locationData;
}

export async function backgroundLocationUpdate() {
  await Location.startLocationUpdatesAsync("background-location-task", {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 5 * 60 * 1000,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "깜빡!",
      notificationBody: "백그라운드에서 위치를 측정 중입니다...",
      notificationColor: "#fff",
    },
  });
}

export function backgroundTaskSetting() {
  const LOCATION_BACKGROUND = "background-location-task";

  TaskManager.defineTask(LOCATION_BACKGROUND, async ({ data, error }) => {
    if (error) {
      console.error("error", error.message);

      return;
    }

    if (data) {
      const { locations } = data;
      const location = locations[0];

      if (location) {
        const today = dayjs().format("YYYY-MM-DD");
        const backgroundLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const locationBefore = await AsyncStorage.getItem(today);

        if (!locationBefore) {
          store.dispatch(addTimeline());
          const initLoc = [];
          initLoc.push(backgroundLocation);
          await AsyncStorage.setItem(today, JSON.stringify(initLoc));

          return;
        }

        const item = JSON.parse(locationBefore);
        item.push(backgroundLocation);
        console.log("background tracking");
        await AsyncStorage.setItem(today, JSON.stringify(item));
      }
    }
  });
}
