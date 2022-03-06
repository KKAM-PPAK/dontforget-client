import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
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
  const [selectedOption, setSelectedOption] = useState(memo.repeat);

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
          due_date: dayjs(dueDate).second(0).millisecond(0),
          repeat: selectedOption,
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
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="안 함" value="0" />
        <Picker.Item label="매 일" value="1" />
        <Picker.Item label="매 주" value="2" />
        <Picker.Item label="매 년" value="3" />
      </Picker>
      <Button title="add" onPress={handleAddMemoButton} />
    </View>
  );
}
