import React from "react";
import { View } from "react-native";
import Button from "../components/Button/Button";
import MemoDetail from "../components/Memo/MemoDetail";

export default function MemoDetailScreen({ route, navigation }) {
  const { memo, taskId } = route.params;

  return (
    <View>
      <MemoDetail memo={memo} />
      <Button
        title="memo 수정"
        onPress={() => navigation.navigate("ModifyMemo", { memo, taskId })}
      />
    </View>
  );
}
