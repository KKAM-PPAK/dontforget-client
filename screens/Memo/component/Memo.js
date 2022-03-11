import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";

export default function Memo({ memo }) {
  const navigation = useNavigation();
  const taskList = useSelector((state) => state.task.taskList);
  const [targetTask, setTargetTask] = useState("");

  useEffect(() => {
    function findTask(memo, taskList) {
      const target = taskList.filter((task) =>
        task.memo.some((item) => item._id === memo._id),
      );

      setTargetTask(target[0]);
    }

    findTask(memo, taskList);
  }, []);

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.memo}
        onPress={() =>
          navigation.navigate("Memo Detail", {
            memo,
            task: targetTask,
          })
        }
      >
        <Text style={styles.memoTitle}>{memo.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: 60,
    marginVertical: 10,
    width: 280,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.blue,
    elevation: 5,
  },
  memo: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  memoTitle: {
    fontFamily: FONTS.gowun,
    fontSize: 15,
  },
});
