import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function LoadingScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>The LoadingScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
