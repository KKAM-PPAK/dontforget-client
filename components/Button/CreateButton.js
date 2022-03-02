import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../../commons/constants/COLORS";

export default function CreateButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.create}
      onPress={() => navigation.navigate("NewTask")}
    >
      <Text style={styles.createText}>create</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  create: {
    backgroundColor: COLORS.green,
    position: "absolute",
    elevation: 5,
    bottom: 30,
    right: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  createText: {
    fontSize: 20,
    paddingHorizontal: 5,
    paddingBottom: 5,
    color: COLORS.white,
  },
});
