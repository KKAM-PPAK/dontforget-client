import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  useEffect(async () => {
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.calendar}>
        <MyCalendar
          onDatePress={setOnDateClick}
          scheduledDate={scheduledDate}
          setClickedDate={setClickedDate}
        />
      </View>
      {onDateClick && (
        <View style={styles.memoListContainer}>
          <MemoList date={clickedDate} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="+"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate("NewTask")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  calendar: {
    flex: 0.5,
    backgroundColor: "yellow",
    elevation: 5,
  },
  memoListContainer: {
    flex: 0.5,
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: COLORS.navy,
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
