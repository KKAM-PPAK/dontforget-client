import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../commons/constants/COLORS";
import Button from "../components/Button/Button";
import MyCalendar from "../components/Calendar/MyCalendar";
import MemoList from "../components/Memo/MemoList";
import { getUserTasks } from "../redux/slices/taskSlices";

export default function CalendarScreen({ navigation }) {
  const dispatch = useDispatch();
  const [onDateClick, setOnDateClick] = useState(false);
  const [clickedDate, setClickedDate] = useState({});
  const [scheduledDate, setScheduledDate] = useState([]);
  const taskList = useSelector((state) => state.task.taskList);

  useEffect(() => {
    dispatch(getUserTasks());
  }, []);

  useEffect(() => {
    function checkScheduledMemo(taskList) {
      const list = taskList.map((task) =>
        task.memo.map((item) => item.due_date),
      );
      const dateList = list
        .flat()
        .map((time) => dayjs(time).add(9, "hour").toISOString().split("T")[0]);

      return dateList;
    }

    setScheduledDate(checkScheduledMemo(taskList));
  }, [taskList]);

  return (
    <View style={styles.screen}>
      <View style={styles.calendar}>
        <MyCalendar
          onDatePress={setOnDateClick}
          scheduledDate={scheduledDate}
          setClickedDate={setClickedDate}
        />
      </View>
      {onDateClick && <MemoList date={clickedDate} />}
      <View style={styles.buttonContainer}>
        <Button
          title="+"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate("NewTask")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.ivory,
  },
  calendar: {
    backgroundColor: "blue",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  buttonStyle: {
    backgroundColor: COLORS.navy,
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
});
