import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Task from "./Task";
import COLORS from "../../commons/constants/COLORS";
import CreateButton from "../Button/CreateButton";

export default function TaskList({ task }) {
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  return (
    <>
      <Modal
        visible={showTaskDetail}
        animationType="fade"
        onRequestClose={() => setShowTaskDetail(false)}
      >
        <Task setIsOpen={setShowTaskDetail} />
      </Modal>
      <TouchableOpacity onPress={() => setShowTaskDetail(true)}>
        <View style={styles.task}>
          <Text>{task.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  task: {
    justifyContent: "center",
    width: 300,
    height: 80,
    borderRadius: 30,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1.3,
    backgroundColor: COLORS.ivory,
  },
});
