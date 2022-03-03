import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { createMemo } from "../../redux/slices/taskSlices";
import Button from "../Button/Button";
import MemoInput from "../Input/MemoInput";
import ScheduleDate from "../Task/ScheduleDate";

export default function AddMemo({ visible, setVisible, task }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date());
  const [newMemo, setNewMemo] = useState("");

  async function handleAddMemoButton() {
    if (dueDate < new Date()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    Alert.alert("깜빡!", "새로운 메모를 생성하시나요?", [
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
      const info = {
        task,
        memo: {
          description: newMemo,
          due_date: dueDate,
        },
      };

      dispatch(createMemo(info));
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <Text>모달</Text>
      <MemoInput memo={newMemo} onChangeText={setNewMemo} />
      <ScheduleDate date={dueDate} setDate={setdueDate} />
      <Button title="add" onPress={handleAddMemoButton} />
    </Modal>
  );
}
