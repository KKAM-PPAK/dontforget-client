import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import COLORS from "../../commons/constants/COLORS";
import { BUTTON, ERROR, INFO, MESSAGE } from "../../commons/constants/MESSAGE";
import REPEATTYPE from "../../commons/constants/REPEATTYPE";
import Button from "../../components/Button/Button";
import InputText from "../../components/Input/InputText";
import { updateMemo } from "../../redux/slices/taskSlices";
import ScheduleDate from "../Task/component/ScheduleDate";

export default function ModifyMemoScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { memo, task } = route.params;
  const [dueDate, setdueDate] = useState(new Date(memo.due_date));
  const [didDate, setDidDate] = useState(new Date(memo.did_date));
  const [currentDescription, setCurrentDescription] = useState(
    memo.description,
  );
  const [currentTitle, setCurrentTitle] = useState(memo.title);
  const [selectedOption, setSelectedOption] = useState(memo.repeat);
  const [isPastMemo, setIsPastMemo] = useState(false);

  useEffect(() => {
    if (selectedOption !== "0" && dayjs() > dayjs(memo.due_date)) {
      setIsPastMemo(true);
    }
  }, []);

  async function handleAddMemoButton() {
    if (!isPastMemo && dayjs(dueDate) < dayjs() && selectedOption !== "0") {
      Alert.alert(ERROR.ERROR, ERROR.DUE_DATE_ERROR);

      return;
    }

    Alert.alert("깜빡!", MESSAGE.MODIFY_MEMO, [
      {
        text: MESSAGE.NO,
        style: "cancel",
      },
      {
        text: MESSAGE.YES,
        onPress: () => {
          sendMemo();
          navigation.navigate("Tasks");
        },
      },
    ]);
    async function sendMemo() {
      const memoId = memo._id;
      const taskId = task._id;
      const memoInfo = {
        memo: {
          title: currentTitle,
          description: currentDescription,
          due_date: dayjs(dueDate).second(0),
          did_date: dayjs(didDate).second(0),
          repeat: selectedOption,
        },
      };
      dispatch(updateMemo({ memoInfo, memoId, taskId }));
    }
  }

  return (
    <View style={styles.memoBackground}>
      <View style={styles.createMemo}>
        <InputText
          title="title"
          inputStyle={styles.titleContainer}
          multiline={false}
          item={currentTitle}
          onChangeText={setCurrentTitle}
        />
        <InputText
          title="description"
          inputStyle={styles.descriptionContainer}
          multiline
          item={currentDescription}
          onChangeText={setCurrentDescription}
        />
        <ScheduleDate type="did" date={didDate} setDate={setDidDate} />
        {!isPastMemo && selectedOption !== "0" ? (
          <>
            {selectedOption !== "0" ? (
              <ScheduleDate type="due" date={dueDate} setDate={setdueDate} />
            ) : (
              <Text> 반복 설정을 켜면 알림일을 지정할 수 있습니다 </Text>
            )}
            <Picker
              style={styles.picker}
              selectedValue={selectedOption}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOption(itemValue)
              }
            >
              <Picker.Item label={REPEATTYPE[0]} value="0" />
              <Picker.Item label={REPEATTYPE[1]} value="1" />
              <Picker.Item label={REPEATTYPE[2]} value="2" />
              <Picker.Item label={REPEATTYPE[3]} value="3" />
              <Picker.Item label={REPEATTYPE[4]} value="4" />
            </Picker>
          </>
        ) : (
          <View>
            <Text style={{ color: COLORS.orange }}>{ERROR.CANNOT_CREATE}</Text>
            <Text>{INFO.DUE_DATE}</Text>
            {memo.repeat === "0" ? (
              <Text style={styles.notiContainer}>알림 없음</Text>
            ) : (
              <Text style={styles.notiContainer}>
                {dayjs(memo.due_date).format("YYYY-MM-DD HH:mm")}
              </Text>
            )}
            <Text>{INFO.REPEAT}</Text>
            <Text style={styles.notiContainer}>{REPEATTYPE[memo.repeat]}</Text>
          </View>
        )}
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.MODIFY}
          onPress={handleAddMemoButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  memoBackground: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  createMemo: {
    flex: 0.9,
    width: "90%",
    borderRadius: 15,
    justifyContent: "space-evenly",
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.blue,
  },
  titleContainer: {
    height: 80,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  descriptionContainer: {
    height: 160,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  notiContainer: {
    marginVertical: 5,
    textAlignVertical: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  picker: {
    elevation: 4,
    backgroundColor: COLORS.lightgray,
  },
  button: {
    height: "8%",
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: COLORS.navy,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
});
