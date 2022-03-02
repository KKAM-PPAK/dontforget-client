import React from "react";
import { TextInput, View } from "react-native";

export default function TitleInput({ title, onChangeText }) {
  return (
    <View>
      <TextInput
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={onChangeText}
      />
    </View>
  );
}
