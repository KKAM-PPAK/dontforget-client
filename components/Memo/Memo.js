import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import TouchableMemo from "./TouchableMemo";

export default function Memo({ memo, task }) {
  const taskList = useSelector((state) => state.task.taskList);
  const [targetTask, setTargetTask] = useState("");

  useEffect(() => {
    function findTask(memo, taskList) {
      const targetTask = taskList.filter((task) =>
        task.memo.some((item) => item._id === memo._id),
      );

      setTargetTask(targetTask[0]);
    }

    findTask(memo, taskList);
  }, [memo]);

  return (
    <View style={styles.screen}>
      <View style={styles.memoInfo}>
        <TouchableMemo memo={memo} task={targetTask} />
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
