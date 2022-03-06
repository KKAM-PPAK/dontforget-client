import React from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";
import REPEATTYPE from "../../commons/constants/REPEATTYPE";

export default function MemoInfo({ memo }) {
  return (
    <View>
      <Text>제목: {memo.description}</Text>
      <Text>
        예정일:
        {dayjs(memo.due_date).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text>반복: {REPEATTYPE[memo.repeat]}</Text>
    </View>
  );
}
