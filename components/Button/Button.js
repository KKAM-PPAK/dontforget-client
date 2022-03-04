import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ title, onPress, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
