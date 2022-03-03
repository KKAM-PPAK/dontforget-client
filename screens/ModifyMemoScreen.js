import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import MemoInput from "../components/Input/MemoInput";
import ScheduleDate from "../components/Task/ScheduleDate";
import { updateMemo } from "../redux/slices/taskSlices";

export default function ModifyMemoScreen({ navigation, route }) {
  const { memo, taskId } = route.params;
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date(memo.due_date));
  const [currentMemo, setCurrentMemo] = useState(memo.description);

  async function handleAddMemoButton() {
    if (new Date(dueDate) < new Date()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    Alert.alert("깜빡!", "메모를 수정하시나요?", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "네",
        onPress: () => {
          sendMemo();
          navigation.navigate("Tasks");
        },
      },
    ]);
    async function sendMemo() {
      const memoId = memo._id;
      const memoInfo = {
        memo: {
          description: currentMemo,
          due_date: dueDate,
        },
      };
      dispatch(updateMemo({ memoInfo, memoId, taskId }));
    }
  }

  return (
    <View>
      <MemoInput memo={currentMemo} onChangeText={setCurrentMemo} />
      {new Date(memo.due_date) > new Date() ? (
        <ScheduleDate date={dueDate} setDate={setdueDate} />
      ) : (
        <Text>오늘 이전의 작업은 예정일을 수정할 수 없습니다.</Text>
      )}
      <Button title="add" onPress={handleAddMemoButton} />
    </View>
  );
}
