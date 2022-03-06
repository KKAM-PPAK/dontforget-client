import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import Memo from "./Memo";

export default function MemoList({ date }) {
  const memoList = useSelector((state) => state.task.memoList);
  const [sameDateMemoList, setSameDateMemoList] = useState([]);

  useEffect(() => {
    const targetMemoList = memoList
      .filter(
        (memo) =>
          dayjs(memo.due_date).format("YYYY-MM-DD") ===
          dayjs(date.timestamp).format("YYYY-MM-DD"),
      )
      .sort((a, b) => b.due_date - a.due_date);

    setSameDateMemoList(targetMemoList);
  }, [date, memoList]);

  return (
    <View>
      <FlatList
        data={sameDateMemoList}
        keyExtractor={(memo) => String(memo._id)}
        renderItem={(memo) => <Memo memo={memo.item} />}
      />
    </View>
  );
}
