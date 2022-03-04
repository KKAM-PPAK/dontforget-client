import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeMemo } from "../../redux/slices/taskSlices";
import TouchableMemo from "./TouchableMemo";

export default function Memo({ memo, task }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const [targetTask, setTargetTask] = useState("");

  useEffect(() => {
    function findTask(memo, taskList) {
      const targetTask = taskList.filter((task) =>
        task.memo.map((item) => item._id === memo._id),
      );

      setTargetTask(targetTask);
    }

    findTask(memo, taskList);
  }, [memo]);

  function handleDeleteMemoButton() {
    Alert.alert("깜빡!", "메모를 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          const memoId = memo._id;
          const taskId = targetTask._id || task._id;

          dispatch(removeMemo({ memoId, taskId }));
          navigation.navigate("Tasks");
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.memoInfo}>
        <TouchableMemo
          memo={memo}
          task={task || targetTask}
          deleteButton={handleDeleteMemoButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  memoInfo: {
    flex: 0.5,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 5,
  },
});
