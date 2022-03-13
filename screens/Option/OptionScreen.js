import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { initUserInfo } from "../../redux/slices/userSlices";
import COLORS from "../../commons/constants/COLORS";
import FONTS from "../../commons/constants/FONTS";
import { BUTTON, MESSAGE } from "../../commons/constants/MESSAGE";

export default function OptionScreen() {
  const dispatch = useDispatch();

  async function handleLogoutButton() {
    Alert.alert("깜빡!", MESSAGE.LOGOUT, [
      {
        text: MESSAGE.YES,
        onPress: async () => {
          await AsyncStorage.removeItem("accessToken");
          await dispatch(initUserInfo());
        },
      },
      {
        text: MESSAGE.NO,
        style: "cancel",
      },
    ]);
  }

  async function handleNotificationButton() {
    Alert.alert("깜빡!", MESSAGE.GO_DEVICE_SETTING, [
      {
        text: MESSAGE.YES,
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: MESSAGE.NO,
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>option</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.LOGOUT}
          onPress={handleLogoutButton}
        />
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.NOTI_LOCA}
          onPress={handleNotificationButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.lightgreen,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.08,
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  title: {
    fontFamily: FONTS.gowun,
    fontSize: 23,
    textAlignVertical: "center",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    height: "8%",
    width: 300,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    flex: 1,
    fontFamily: FONTS.gowun,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
});
