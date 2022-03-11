import React from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import MemoInfo from "./component/MemoInfo";
import { removeMemo } from "../../redux/slices/taskSlices";
import COLORS from "../../commons/constants/COLORS";
import FONTS from "../../commons/constants/FONTS";

export default function MemoDetailScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { memo, task } = route.params;

  function handleDeleteMemoButton() {
    Alert.alert("깜빡!", "메모를 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          const memoId = memo._id;
          const taskId = task._id;

          dispatch(removeMemo({ memoId, taskId }));
          navigation.navigate("Calendar");
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <MemoInfo memo={memo} />
      <Button
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        title="memo 수정"
        onPress={() => navigation.navigate("ModifyMemo", { memo, task })}
      />
      <Button
        buttonStyle={styles.deleteButton}
        textStyle={styles.buttonText}
        title="삭제"
        onPress={handleDeleteMemoButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: COLORS.lightgreen,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: 350,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    elevation: 8,
    borderColor: COLORS.white,
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    flex: 1,
    fontFamily: FONTS.gowun,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.black,
  },
  deleteButton: {
    height: 40,
    width: 350,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.orange,
  },
});
