import React from "react";
import { Alert, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import MemoInfo from "../components/Memo/MemoInfo";
import { removeMemo } from "../redux/slices/taskSlices";

export default function MemoDetailScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { memo, taskId } = route.params;

  function handleDeleteMemoButton() {
    Alert.alert("깜빡!", "메모를 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          const memoId = memo._id;

          dispatch(removeMemo({ memoId, taskId }));
          navigation.navigate("Calendar");
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }
  return (
    <View>
      <MemoInfo memo={memo} />
      {new Date(memo.due_date) < new Date() ? (
        <Text>지난 메모는 수정할 수 없습니다.</Text>
      ) : (
        <Button
          title="memo 수정"
          onPress={() => navigation.navigate("ModifyMemo", { memo, taskId })}
        />
      )}
      <Button title="delete" onPress={handleDeleteMemoButton} />
    </View>
  );
}
