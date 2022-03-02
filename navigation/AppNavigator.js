import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../screens/AuthScreen";
import { fetchUserInfo } from "../redux/slices/userSlices";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [user]);

  return (
    <NavigationContainer>
      {user.email ? <MainNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}
