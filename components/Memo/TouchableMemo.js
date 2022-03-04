import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Button from "../Button/Button";

export default function TouchableMemo({ memo, task, deleteButton }) {
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
      <Button title="delete" onPress={deleteButton} />
    </TouchableOpacity>
  );
}
