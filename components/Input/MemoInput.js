import React from "react";
import { TextInput, View } from "react-native";

export default function MemoInput({ newMemo, onChangeText }) {
  return (
    <View>
      <TextInput
        multiline
        placeholder="메모를 입력하세요"
        value={newMemo}
        onChangeText={onChangeText}
      />
    </View>
  );
}
