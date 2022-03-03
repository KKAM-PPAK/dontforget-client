import React from "react";
import { Text, View } from "react-native";

export default function MemoDetail({ memo }) {
  return (
    <View>
      <Text>{memo.description}</Text>
      <Text>{memo.due_date}</Text>
    </View>
  );
}
