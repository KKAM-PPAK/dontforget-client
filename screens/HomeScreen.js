import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>The HomeScreen</Text>
      <Button
        title="google login"
        onPress={() => navigation.navigate("Auth")}
      />
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
