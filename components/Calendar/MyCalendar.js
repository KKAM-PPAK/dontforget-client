import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../commons/constants/COLORS";

export default function MyCalendar({
  onDatePress,
  scheduledDate,
  setClickedDate,
}) {
  const [markedDate, setMarkedDate] = useState({});
  const taskExist = {
    key: "taskExist",
    color: COLORS.red,
    selectedDotColor: "blue",
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
        "stylesheet.calendar.header": {
          dayTextAtIndex0: {
            color: COLORS.red,
          },
          dayTextAtIndex6: {
            color: COLORS.green,
          },
        },
      }}
      onDayPress={(day) => {
        onDatePress(true);
        setClickedDate(day);
      }}
      onMonthChange={(month) => {
        onDatePress(false);
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
