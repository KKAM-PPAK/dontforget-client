import React, { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";
import InputText from "../../components/Input/InputText";
import { updateTask } from "../../redux/slices/taskSlices";

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
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <InputText
          title="Task Title"
          inputStyle={styles.titleContainer}
          multiline={false}
          item={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title="update"
          onPress={saveTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: "90%",
    height: "30%",
    justifyContent: "space-evenly",
    borderRadius: 15,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.blue,
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
  button: {
    height: "30%",
    borderRadius: 15,
    backgroundColor: COLORS.navy,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
});
