import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export default function ScheduleDate({ date, setDate }) {
  const [mode, setMode] = useState("date");
  const [showPicker, setShowPicker] = useState(false);
  const [result, setResult] = useState("예약 없음");

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
    <View>
      <Text>{result}</Text>
      <Button title="날짜 설정" onPress={() => showMode("date")} />
      <Button title="시간 설정" onPress={() => showMode("time")} />
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
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
