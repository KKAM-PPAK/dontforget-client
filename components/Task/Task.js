import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Task({ setIsOpen }) {
  const navigation = useNavigation();

  return (
    <View style={styles.taskDetail}>
      <Text>Task Detail</Text>
      <Button title="close" onPress={() => setIsOpen(false)} />
      <Button
        title="modify"
        onPress={() => navigation.navigate("ModifyTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskDetail: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
