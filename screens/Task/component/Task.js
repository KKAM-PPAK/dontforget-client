import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";

export default function Task({ task, setIsOpen }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.task}
      onPress={() => navigation.navigate("TaskDetail", { task })}
    >
      <Text style={styles.title}>{task.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    width: 300,
    height: 60,
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  title: {
    fontFamily: FONTS.gowun,
    paddingHorizontal: 15,
  },
});
