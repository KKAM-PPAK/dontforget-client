import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GOOGLE_WEBCLIENT_ID_ANDROID,
  GOOGLE_WEBCLIENT_ID_EXPO,
  GOOGLE_WEBCLIENT_ID_IOS,
  GOOGLE_WEBCLIENT_ID_WEB,
} from "@env";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../redux/slices/userSlices";
import logo from "../../assets/logo_name.png";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: GOOGLE_WEBCLIENT_ID_ANDROID,
    iosClientId: GOOGLE_WEBCLIENT_ID_IOS,
    expoClientId: GOOGLE_WEBCLIENT_ID_EXPO,
    webClientId: GOOGLE_WEBCLIENT_ID_WEB,
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
      <View style={styles.logo}>
        <Image source={logo} />
      </View>
      <View>
        <Button
          title="Google Login"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={() => promptAsync()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: COLORS.orange,
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
