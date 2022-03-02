import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CreateButton from "../components/Button/CreateButton";
import MyCalendar from "../components/Calendar/MyCalendar";

export default function CalendarScreen() {
  return (
    <View style={styles.screen}>
      <MyCalendar />
      <CreateButton />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
