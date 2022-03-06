import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function TouchableMemo({ memo, task }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MemoDetail", {
          memo,
          taskId: task._id,
        })
      }
    >
      <Text>{memo.description}</Text>
    </TouchableOpacity>
  );
}
