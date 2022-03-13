import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";
import Task from "./component/Task";
import FONTS from "../../commons/constants/FONTS";
import { INFO } from "../../commons/constants/MESSAGE";

export default function TaskListScreen({ navigation }) {
  const taskList = useSelector((state) => state.task.taskList);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{INFO.LIST_TODO}</Text>
      </View>
      <View style={styles.taskListContainer}>
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.taskList}
            data={taskList}
            keyExtractor={(item) => String(item._id)}
            renderItem={(itemData) => <Task task={itemData.item} />}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={<FontAwesome name="plus" size={20} color={COLORS.white} />}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("NewTask")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskListContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightgray,
  },
  titleContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.08,
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  title: {
    fontFamily: FONTS.gowun,
    fontSize: 23,
    textAlignVertical: "center",
    textAlign: "center",
  },
  taskList: {
    width: Dimensions.get("window").width,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "3%",
    right: "5%",
  },
  buttonStyle: {
    backgroundColor: COLORS.blue,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 30,
    elevation: 8,
  },
});
