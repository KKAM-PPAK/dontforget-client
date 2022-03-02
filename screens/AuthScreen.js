import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GOOGLE_WEBCLIENT_ID_ANDROID,
  GOOGLE_WEBCLIENT_ID_EXPO,
  GOOGLE_WEBCLIENT_ID_IOS,
} from "@env";
import { useDispatch } from "react-redux";
import { userSignIn } from "../redux/slices/userSlices";
import logo from "../assets/logo_big.png";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen({ navigation }) {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_WEBCLIENT_ID_ANDROID,
    iosClientId: GOOGLE_WEBCLIENT_ID_IOS,
    expoClientId: GOOGLE_WEBCLIENT_ID_EXPO,
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      dispatch(userSignIn(id_token));
    }
  }, [response]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Login 하세요!</Text>
      <Image source={logo} style={styles.logo} />
      <Button
        style={styles.googleLogin}
        title="Login via Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "noto-regular",
  },
  text: {
    flex: 0.1,
  },
  googleLogin: {
    flex: 0.7,
  },
  logo: {
    flex: 0.2,
    width: "50%",
  },
});
