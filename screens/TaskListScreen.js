import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks } from "../redux/slices/taskSlices";
import TaskList from "../components/Task/TaskList";

import CreateButton from "../components/Button/CreateButton";

export default function TaskListScreen() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);

  useEffect(() => {
    dispatch(getUserTasks());
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => String(item._id)}
        renderItem={(itemData) => <TaskList task={itemData.item} />}
      />
      <CreateButton />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
