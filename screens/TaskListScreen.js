import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/Button/Button";
import Task from "../components/Task/Task";

export default function TaskListScreen({ navigation }) {
  const taskList = useSelector((state) => state.task.taskList);

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={styles.taskList}
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
  taskList: {
    justifyContent: "space-around",
  },
});
