import React from "react";
import { View } from "react-native";
import Button from "../components/Button/Button";
import MemoInfo from "../components/Memo/MemoInfo";

export default function MemoDetailScreen({ route, navigation }) {
  const { memo, taskId } = route.params;

  return (
    <View>
      <MemoInfo memo={memo} />
      <Button
        title="memo 수정"
        onPress={() => navigation.navigate("ModifyMemo", { memo, taskId })}
      />
    </View>
  );
}
