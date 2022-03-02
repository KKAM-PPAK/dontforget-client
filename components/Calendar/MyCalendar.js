import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Agenda } from "react-native-calendars";

export default function MyCalendar() {
  return (
    <View style={styles.agendaContainer}>
      <Text>This is Calendar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
  },
});
