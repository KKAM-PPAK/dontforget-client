import React, { useState } from "react";
import { View, Alert, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";

import { createTask } from "../../redux/slices/taskSlices";
import ScheduleDate from "./component/ScheduleDate";
import InputText from "../../components/Input/InputText";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";
import { BUTTON, ERROR, INFO, MESSAGE } from "../../commons/constants/MESSAGE";
import REPEATTYPE from "../../commons/constants/REPEATTYPE";

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
      Alert.alert(ERROR.ERROR, ERROR.DID_DATE_ERROR);

      return;
    }

    if (dayjs(dueDate) < dayjs()) {
      Alert.alert(ERROR.ERROR, ERROR.DUE_DATE_ERROR);

      return;
    }

    if (!memoTitle || !description || !taskTitle) {
      Alert.alert(ERROR.ERROR, ERROR.INFO_ERROR);

      return;
    }

    Alert.alert("깜빡!", MESSAGE.CREATE_NEW_MEMO, [
      {
        text: MESSAGE.NO,
        style: "cancel",
      },
      {
        text: MESSAGE.YES,
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
          title={`Task ${INFO.TITLE}`}
          inputStyle={styles.titleContainer}
          multiline={false}
          item={taskTitle}
          onChangeText={setTaskTitle}
        />
        <InputText
          title={`Memo ${INFO.TITLE}`}
          inputStyle={styles.titleContainer}
          multiline={false}
          item={memoTitle}
          onChangeText={setMemoTitle}
        />
        <InputText
          title={INFO.DESCRIPTION}
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
          <Picker.Item label={REPEATTYPE[0]} value="0" />
          <Picker.Item label={REPEATTYPE[1]} value="1" />
          <Picker.Item label={REPEATTYPE[2]} value="2" />
          <Picker.Item label={REPEATTYPE[3]} value="3" />
        </Picker>
        <Button
          buttonStyle={styles.createButton}
          textStyle={styles.buttonText}
          title={BUTTON.CREATE}
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
