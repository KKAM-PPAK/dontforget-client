import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FONTS from "../../commons/constants/FONTS";
import COLORS from "../../commons/constants/COLORS";
import Button from "../../components/Button/Button";
import { getUserTasks } from "../../redux/slices/taskSlices";
import MyCalendar from "./component/MyCalendar";
import MemoList from "../Memo/component/MemoList";

const { width, height } = Dimensions.get("window");

export default function CalendarScreen({ navigation }) {
  const dispatch = useDispatch();
  const [onDateClick, setOnDateClick] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  const [scheduledDate, setScheduledDate] = useState([]);
  const taskList = useSelector((state) => state.task.taskList);

  useEffect(() => {
    (async () => {
      dispatch(getUserTasks());
    })();
  }, []);

  useEffect(() => {
    function checkScheduledMemo(taskList) {
      const list = taskList.map((task) =>
        task.memo.map((item) => item.did_date),
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
      <View style={styles.memoListContainer}>
        {clickedDate && <Text>{clickedDate.dateString}</Text>}
        {onDateClick ? (
          <MemoList date={clickedDate} />
        ) : (
          <Text style={styles.font}> 달력을 클릭하여 일정을 확인하세요 </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={<FontAwesome name="plus" size={20} color={COLORS.white} />}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("NewTask")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightgray,
  },
  font: {
    fontFamily: FONTS.gowun,
  },
  calendar: {
    flex: 1,
    width,
  },
  memoListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "3%",
    right: "5%",
  },
  buttonStyle: {
    backgroundColor: COLORS.blue,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 30,
    elevation: 8,
  },
});
