import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import COLORS from "../../../commons/constants/COLORS";
import Button from "../../../components/Button/Button";
import FONTS from "../../../commons/constants/FONTS";
import { BUTTON, INFO } from "../../../commons/constants/MESSAGE";

export default function ScheduleDate({ type, date, setDate }) {
  const [mode, setMode] = useState("date");
  const [showPicker, setShowPicker] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    const result = dayjs(date).format("YYYY.MM.DD HH:mm");
    setResult(result);
  }, []);

  function showMode(currentMode) {
    setShowPicker(true);
    setMode(currentMode);
  }

  function changeSchedule(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);

    setResult(dayjs(currentDate).format("YYYY.MM.DD HH:mm"));
  }

  return (
    <View style={styles.dateTimePick}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {type === "due" ? (
          <Text style={styles.text}>
            {INFO.DUE_DATE} : {result && result.split(" ")[0]}
          </Text>
        ) : (
          <Text style={styles.text}>
            {INFO.DID_DATE} : {result && result.split(" ")[0]}
          </Text>
        )}
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.SET_DATE}
          onPress={() => showMode("date")}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {type === "due" ? (
          <Text style={styles.text}>
            {INFO.DUE_DATE} : {result && result.split(" ")[1]}
          </Text>
        ) : (
          <Text style={styles.text}>
            {INFO.DID_DATE} : {result && result.split(" ")[1]}
          </Text>
        )}
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title={BUTTON.SET_TIME}
          onPress={() => showMode("time")}
        />
      </View>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInSeconds={32400}
          timeZoneOffsetInMinutes={540}
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={changeSchedule}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateTimePick: {
    flex: 0.5,
    justifyContent: "space-evenly",
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  text: {
    fontFamily: FONTS.gowun,
    fontSize: 15,
  },
  button: {
    width: "50%",
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  buttonText: {
    fontFamily: FONTS.gowun,
    textAlign: "center",
  },
});
