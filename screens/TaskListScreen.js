import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks } from "../redux/slices/taskSlices";

import Button from "../components/Button/Button";
import Task from "../components/Task/Task";

export default function TaskListScreen({ navigation }) {
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
        renderItem={(itemData) => <Task task={itemData.item} />}
      />
      <Button title="create" onPress={() => navigation.navigate("NewTask")} />
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
