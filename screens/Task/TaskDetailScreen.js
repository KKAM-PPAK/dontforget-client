import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import AddMemo from "../Memo/component/AddMemo";
import Memo from "../Memo/component/Memo";
import { deleteTask } from "../../redux/slices/taskSlices";
import COLORS from "../../commons/constants/COLORS";
import FONTS from "../../commons/constants/FONTS";
import { BUTTON, ERROR, MESSAGE } from "../../commons/constants/MESSAGE";

export default function TaskDetailScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { task } = route.params;
  const [showAddMemo, setShowAddMemo] = useState(false);
  const latestMemo = task.memo[task.memo.length - 1];

  function handleDeleteTaskButton() {
    Alert.alert("깜빡", MESSAGE.DELETE_TASK, [
      {
        text: MESSAGE.YES,
        onPress: () => {
          dispatch(deleteTask(task._id));
          navigation.goBack();
        },
      },
      {
        text: MESSAGE.NO,
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.taskDetailContainer}>
      <View style={styles.memoList}>
        {task.memo.length ? (
          <FlatList
            contentContainerStyle={styles.taskList}
            data={task.memo}
            keyExtractor={(item) => String(item._id)}
            renderItem={(itemData) => <Memo memo={itemData.item} task={task} />}
          />
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{MESSAGE.EMPTY_MEMO}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!task.memo.length || new Date(latestMemo.due_date) < new Date() ? (
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title={BUTTON.CREATE}
            onPress={() => setShowAddMemo(true)}
          />
        ) : (
          <Text style={styles.message}>{ERROR.MEMO_EXIST}</Text>
        )}
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.MODIFY}
          onPress={() => navigation.navigate("ModifyTask", { task })}
        />
        <Button
          buttonStyle={styles.deleteButton}
          textStyle={styles.buttonText}
          title={BUTTON.DELETE}
          onPress={handleDeleteTaskButton}
        />
      </View>
      <AddMemo visible={showAddMemo} setVisible={setShowAddMemo} task={task} />
    </View>
  );
}

const styles = StyleSheet.create({
  taskDetailContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.lightgray,
    alignItems: "center",
    padding: 10,
  },
  memoList: {
    fontFamily: FONTS.gowun,
    position: "absolute",
    marginTop: 10,
    width: "90%",
    height: "70%",
    borderRadius: 15,
    elevation: 3,
    borderWidth: 2,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
  },
  messageContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  message: {
    fontFamily: FONTS.gowun,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "90%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    height: "25%",
    width: "75%",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    elevation: 5,
    backgroundColor: COLORS.blue,
  },
  deleteButton: {
    height: "25%",
    width: "75%",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    elevation: 5,
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    flex: 1,
    fontFamily: FONTS.gowun,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
  taskList: {
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    marginVertical: 5,
    textAlignVertical: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  descriptionContainer: {
    marginVertical: 5,
    textAlignVertical: "center",
    height: 160,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  notiContainer: {
    marginVertical: 5,
    textAlignVertical: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
});
