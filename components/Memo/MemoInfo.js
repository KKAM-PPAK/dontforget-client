import React from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";

export default function MemoInfo({ memo }) {
  return (
    <View>
      <Text>제목: {memo.description}</Text>
      <Text>
        예정일:
        {dayjs(memo.due_date).add(9, "hour").format("YYYY-MM-DD HH:mm")}
      </Text>
    </View>
  );
}
