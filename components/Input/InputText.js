import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FONTS from "../../commons/constants/FONTS";

export default function InputText({
  title,
  inputStyle,
  multiline,
  item,
  onChangeText,
}) {
  return (
    <View style={inputStyle}>
      <Text style={styles.name}>{title}</Text>
      <TextInput
        style={styles.input}
        multiline={multiline}
        placeholder={`input ${title}`}
        value={item}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 30,
    paddingHorizontal: 5,
    marginTop: 30,
  },
  input: {
    width: "100%",
    height: "80%",
    paddingHorizontal: 5,
    marginTop: 30,
  },
  name: {
    fontFamily: FONTS.gowun,
    position: "absolute",
    top: 5,
    left: 10,
    textAlignVertical: "center",
    marginLeft: 5,
    marginTop: 5,
    fontSize: 15,
  },
});
