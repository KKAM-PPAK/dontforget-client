import React from "react";
import LottieView from "lottie-react-native";

export default function Splash() {
  return (
    <LottieView source={require("../../assets/logo.json")} autoPlay loop />
  );
}
