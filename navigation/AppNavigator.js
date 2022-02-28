import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator";
import AuthScreen from "../screens/AuthScreen";
import { fetchUserInfo } from "../redux/slices/userSlices";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <NavigationContainer>
      {user.email ? <MainTabNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}
