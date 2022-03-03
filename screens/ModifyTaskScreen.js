import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import TitleInput from "../components/Input/TitleInput";
import { updateTask } from "../redux/slices/taskSlices";

export default function ModifyTask({ route, navigation }) {
  const { task } = route.params;
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState(task.title);

  async function saveTask() {
    Alert.alert("깜빡!", "태스크 제목을 수정하시겠습니까?", [
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
        taskId: task._id,
        title: taskTitle,
      };

      dispatch(updateTask(newTask));
    }
  }

  return (
    <View>
      <Text>제목</Text>
      <TitleInput title={taskTitle} onChangeText={setTaskTitle} />
      <Button title="update" onPress={saveTask} />
    </View>
  );
}
