import React, { useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
import { createTask } from "../redux/slices/taskSlices";
import TitleInput from "../components/Input/TitleInput";
import ScheduleDate from "../components/Task/ScheduleDate";
import MemoInput from "../components/Input/MemoInput";

export default function CreateTaskScreen({ navigation }) {
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [newMemo, setNewMemo] = useState("");
  const [selectedOption, setSelectedOption] = useState();

  async function saveTask() {
    if (new Date(dueDate) < new Date()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    if (!newMemo || !taskTitle) {
      Alert.alert("Error!", "할 일의 제목과 메모를 작성해주세요");

      return;
    }

    Alert.alert("깜빡!", "새로운 일을 생성하시나요?", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "네",
        onPress: () => {
          sendTask();
          navigation.navigate("Tasks");
        },
      },
    ]);

    async function sendTask() {
      const newTask = {
        title: taskTitle,
        memo: {
          description: newMemo,
          due_date: dayjs(dueDate).second(0).millisecond(0),
          repeat: selectedOption,
        },
      };

      dispatch(createTask(newTask));
    }
  }

  return (
    <View>
      <Text>제목</Text>
      <TitleInput title={taskTitle} onChangeText={setTaskTitle} />
      <Text>메모 내용</Text>
      <MemoInput memo={newMemo} onChangeText={setNewMemo} />
      <Text>예정일 설정</Text>
      <ScheduleDate date={dueDate} setDate={setdueDate} />
      <Text>반복 설정</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="안 함" value="0" />
        <Picker.Item label="매 일" value="1" />
        <Picker.Item label="매 주" value="2" />
        <Picker.Item label="매 년" value="3" />
      </Picker>
      <Button title="save" onPress={saveTask} />
    </View>
  );
}
