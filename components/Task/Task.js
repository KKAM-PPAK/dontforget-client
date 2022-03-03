import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../commons/constants/COLORS";

export default function Task({ task, setIsOpen }) {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskDetail", { task })}
      >
        <View style={styles.task}>
          <Text>{task.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  task: {
    justifyContent: "center",
    width: 300,
    height: 80,
    borderRadius: 30,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1.3,
    backgroundColor: COLORS.ivory,
  },
});
