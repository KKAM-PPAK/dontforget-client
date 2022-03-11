import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import COLORS from "../../commons/constants/COLORS";
import REAPEATTYPE from "../../commons/constants/REPEATTYPE";
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
    if (dayjs() > dayjs(memo.due_date)) {
      setIsPastMemo(true);
    }
  }, []);

  async function handleAddMemoButton() {
    if (!isPastMemo && dayjs(dueDate) < dayjs()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    Alert.alert("깜빡!", "메모를 수정하시나요?", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "네",
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
        {!isPastMemo ? (
          <>
            <ScheduleDate type="due" date={dueDate} setDate={setdueDate} />
            <Picker
              style={styles.picker}
              selectedValue={selectedOption}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOption(itemValue)
              }
            >
              <Picker.Item label="안 함" value="0" />
              <Picker.Item label="매 일" value="1" />
              <Picker.Item label="매 주" value="2" />
              <Picker.Item label="매 년" value="3" />
            </Picker>
          </>
        ) : (
          <View>
            <Text style={{ color: COLORS.orange }}>
              오늘 이전의 작업은 예정일을 수정할 수 없습니다.
            </Text>
            <Text>알림 예정일</Text>
            <Text style={styles.notiContainer}>
              {dayjs(memo.due_date).format("YYYY-MM-DD HH:mm")}
            </Text>
            <Text>반복 여부</Text>
            <Text style={styles.notiContainer}>{REAPEATTYPE[memo.repeat]}</Text>
          </View>
        )}
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title="수정하기"
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
