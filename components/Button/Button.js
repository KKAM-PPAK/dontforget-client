import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../../commons/constants/COLORS";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.create} onPress={onPress}>
      <Text style={styles.createText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  create: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    width: "30%",
    elevation: 5,
    borderRadius: 15,
  },
  createText: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLORS.white,
  },
});
