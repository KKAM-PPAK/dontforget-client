import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/Input/InputText";
import ScheduleDate from "../../Task/component/ScheduleDate";
import { createMemo } from "../../../redux/slices/taskSlices";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";

export default function AddMemo({ visible, setVisible, task }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date());
  const [didDate, setDidDate] = useState(new Date());
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedOption, setSelectedOption] = useState();

  async function handleAddMemoButton() {
    if (dayjs(didDate) > dayjs()) {
      Alert.alert("Error!", "실행일을 지금 이전으로 지정해주세요");

      return;
    }

    if (dayjs(dueDate) < dayjs()) {
      Alert.alert("Error!", "오늘 이후로 알림일을 설정해주세요.");

      return;
    }

    Alert.alert("깜빡!", "새로운 메모를 생성하시나요?", [
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
      const info = {
        task,
        memo: {
          title,
          description,
          due_date: dueDate,
          did_date: didDate,
          repeat: selectedOption,
        },
      };

      dispatch(createMemo(info));
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.memoBackground}>
        <View style={styles.createMemo}>
          <InputText
            title="title"
            inputStyle={styles.titleContainer}
            multiline={false}
            item={title}
            onChangeText={setTitle}
          />
          <InputText
            title="description"
            inputStyle={styles.descriptionContainer}
            multiline
            item={description}
            onChangeText={setDescription}
          />
          <ScheduleDate type="did" date={didDate} setDate={setDidDate} />
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
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title="생성하기"
            onPress={handleAddMemoButton}
          />
        </View>
      </View>
    </Modal>
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
    height: "60%",
    borderRadius: 15,
    justifyContent: "space-evenly",
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.blue,
  },
  picker: {
    elevation: 4,
    backgroundColor: COLORS.lightgray,
  },
  button: {
    height: "8%",
    borderRadius: 15,
    backgroundColor: COLORS.navy,
  },
  buttonText: {
    flex: 1,
    fontFamily: FONTS.gowun,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
  titleContainer: {
    fontFamily: FONTS.gowun,
    height: 100,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  descriptionContainer: {
    fontFamily: FONTS.gowun,
    height: 200,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
});
