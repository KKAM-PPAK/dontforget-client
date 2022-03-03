import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { removeMemo } from "../../redux/slices/taskSlices";

export default function Memo({ memo, task }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { _id, create_at, description, due_date } = memo.item;

  function handleDeleteMemoButton() {
    Alert.alert("깜빡!", "메모를 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          const memoId = memo.item._id;
          const taskId = task._id;

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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MemoDetail", {
              memo: memo.item,
              taskId: task._id,
            })
          }
        >
          <Text>{description}</Text>
          <Button title="delete" onPress={handleDeleteMemoButton} />
        </TouchableOpacity>
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
