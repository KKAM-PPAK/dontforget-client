import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";

import { createTask } from "../../redux/slices/taskSlices";
import ScheduleDate from "./component/ScheduleDate";
import InputText from "../../components/Input/InputText";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";

export default function CreateTaskScreen({ navigation }) {
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date());
  const [didDate, setDidDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [memoTitle, setMemoTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedOption, setSelectedOption] = useState();

  async function saveTask() {
    if (dayjs(didDate) > dayjs()) {
      Alert.alert("Error!", "실행일을 지금 이전으로 지정해주세요");

      return;
    }

    if (dayjs(dueDate) < dayjs()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    if (!memoTitle || !description || !taskTitle) {
      Alert.alert("Error!", "할 일의 제목과 메모를 모두 채워주세요");

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
          title: memoTitle,
          description,
          due_date: dayjs(dueDate).second(0),
          did_date: dayjs(didDate).second(0),
          repeat: selectedOption,
        },
      };

      dispatch(createTask(newTask));
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.createTask}>
        <InputText
          title="Task Title"
          inputStyle={styles.titleContainer}
          multiline={false}
          item={taskTitle}
          onChangeText={setTaskTitle}
        />
        <InputText
          title="Memo Title"
          inputStyle={styles.titleContainer}
          multiline={false}
          item={memoTitle}
          onChangeText={setMemoTitle}
        />
        <InputText
          title="description"
          inputStyle={styles.descriptionContainer}
          multiline
          item={description}
          onChangeText={setDescription}
        />
        <ScheduleDate type="did" date={didDate} setDate={setDidDate} />
        <ScheduleDate type="due" date={dueDate} setDate={setdueDate} />
        <Picker
          style={styles.picker}
          selectedValue={selectedOption}
          onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="안 함" value="0" />
          <Picker.Item label="매 일" value="1" />
          <Picker.Item label="매 주" value="2" />
          <Picker.Item label="매 년" value="3" />
        </Picker>
        <Button
          buttonStyle={styles.createButton}
          textStyle={styles.buttonText}
          title="생성하기"
          onPress={saveTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.86,
    alignItems: "center",
  },
  createTask: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    elevation: 4,
    padding: 10,
    backgroundColor: COLORS.blue,
  },
  picker: {
    elevation: 4,
    backgroundColor: COLORS.lightgray,
  },
  titleContainer: {
    height: 70,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  descriptionContainer: {
    height: 120,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  createButton: {
    height: "8%",
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: COLORS.navy,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
});
