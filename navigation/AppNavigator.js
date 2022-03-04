import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthScreen from "../screens/AuthScreen";
import { fetchUserInfo } from "../redux/slices/userSlices";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (AsyncStorage.getItem("accessToken")) {
      dispatch(fetchUserInfo());
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {user.email ? <MainNavigator /> : <AuthScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
