import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button/Button";
import MyCalendar from "../components/Calendar/MyCalendar";

export default function CalendarScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.calendar}>
        <MyCalendar />
      </View>
      <View style={styles.buttonStyle}>
        <Button title="create" onPress={() => navigation.navigate("NewTask")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  calendar: {
    flex: 0.7,
  },
  buttonStyle: {
    flex: 0.3,
    marginBottom: 10,
  },
});
