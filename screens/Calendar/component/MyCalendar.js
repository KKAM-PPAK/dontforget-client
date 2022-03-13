import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";

export default function MyCalendar({
  onDatePress,
  scheduledDate,
  setClickedDate,
}) {
  const [markedDate, setMarkedDate] = useState({});
  const taskExist = {
    key: "taskExist",
    color: COLORS.red,
    selectedDotColor: COLORS.blue,
  };

  function markingDate(scheduledDate) {
    const result = {};
    for (const date of scheduledDate) {
      if (!result[date]) {
        result[date] = { dots: [taskExist] };
      }
    }

    return result;
  }

  useEffect(() => {
    setMarkedDate(markingDate(scheduledDate));
  }, [scheduledDate]);

  return (
    <Calendar
      firstDay={0}
      enableSwipeMonths
      monthFormat="yyyy MMMM"
      markingType="multi-dot"
      markedDates={markedDate}
      theme={{
        textDayFontFamily: FONTS.gowun,
        textMonthFontFamily: FONTS.gowun,
        weekVerticalMargin: 5,
        todayTextColor: COLORS.red,
        calendarBackground: COLORS.white,
        textSectionTitleColor: COLORS.black,
        monthTextColor: COLORS.navy,
        selectedDayBackgroundColor: COLORS.blue,
        "stylesheet.calendar.header": {
          dayTextAtIndex0: {
            color: COLORS.red,
          },
          dayTextAtIndex6: {
            color: COLORS.blue,
          },
        },
      }}
      onDayPress={(day) => {
        onDatePress(true);
        setClickedDate(day);
      }}
      onMonthChange={(month) => {
        onDatePress(false);
        setClickedDate();
      }}
      renderArrow={(direction) =>
        direction === "right" ? (
          <MaterialIcons name="navigate-next" size={30} color={COLORS.green} />
        ) : (
          <MaterialIcons
            name="navigate-before"
            size={30}
            color={COLORS.green}
          />
        )
      }
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
    />
  );
}
