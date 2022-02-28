import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  return (
    <View style={styles.screen}>
      <Calendar style={styles.calendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    justifyContent: "center",
  },
});
