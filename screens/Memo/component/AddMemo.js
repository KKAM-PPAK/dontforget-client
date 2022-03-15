import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/Input/InputText";
import ScheduleDate from "../../Task/component/ScheduleDate";
import { createMemo } from "../../../redux/slices/taskSlices";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";
import REPEATTYPE from "../../../commons/constants/REPEATTYPE";
import {
  BUTTON,
  ERROR,
  INFO,
  MESSAGE,
} from "../../../commons/constants/MESSAGE";

export default function AddMemo({ visible, setVisible, task }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState(new Date());
  const [didDate, setDidDate] = useState(new Date());
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedOption, setSelectedOption] = useState("0");

  async function handleAddMemoButton() {
    if (dayjs(didDate) > dayjs()) {
      Alert.alert(ERROR.ERROR, ERROR.DID_DATE_ERROR);

      return;
    }

    if (dayjs(dueDate) < dayjs() && selectedOption !== "0") {
      Alert.alert(ERROR.ERROR, ERROR.DUE_DATE_ERROR);

      return;
    }

    Alert.alert("깜빡!", MESSAGE.CREATE_NEW_MEMO, [
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
            title={INFO.TITLE}
            inputStyle={styles.titleContainer}
            multiline={false}
            item={title}
            onChangeText={setTitle}
          />
          <InputText
            title={INFO.DESCRIPTION}
            inputStyle={styles.descriptionContainer}
            multiline
            item={description}
            onChangeText={setDescription}
          />
          <ScheduleDate type="did" date={didDate} setDate={setDidDate} />
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
          {selectedOption !== "0" ? (
            <ScheduleDate type="due" date={dueDate} setDate={setdueDate} />
          ) : (
            <Text> 반복 설정을 켜면 알림일을 지정할 수 있습니다 </Text>
          )}
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title={BUTTON.CREATE}
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
