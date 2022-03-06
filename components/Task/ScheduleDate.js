import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export default function ScheduleDate({ date, setDate }) {
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
    <View>
      <Text>예정일 : {result && result.split(" ")[0]}</Text>
      <Button title="날짜 설정" onPress={() => showMode("date")} />
      <Text>예정 시간 : {result && result.split(" ")[1]}</Text>
      <Button title="시간 설정" onPress={() => showMode("time")} />
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
