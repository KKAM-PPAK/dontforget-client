import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import Memo from "../components/Memo/Memo";
import AddMemo from "../components/Memo/AddMemo";
import { deleteTask } from "../redux/slices/taskSlices";

export default function TaskDetailScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { task } = route.params;
  const [showAddMemo, setShowAddMemo] = useState(false);

  function handleDeleteTaskButton() {
    Alert.alert("깜빡", "태스크를 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          dispatch(deleteTask(task._id));
          navigation.goBack();
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }

  return (
    <View>
      <AddMemo visible={showAddMemo} setVisible={setShowAddMemo} task={task} />
      <FlatList
        data={task.memo}
        keyExtractor={(item) => String(item._id)}
        renderItem={(itemData) => <Memo memo={itemData} task={task} />}
      />
      <View>
        <Button title="메모 추가" onPress={() => setShowAddMemo(true)} />
        <Button
          title="task 수정"
          onPress={() => navigation.navigate("ModifyTask", { task })}
        />
        <Button title="delete" onPress={handleDeleteTaskButton} />
      </View>
    </View>
  );
}
