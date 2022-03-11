import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({
  icon,
  title,
  onPress,
  buttonStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icon || null}
      {title && <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}
