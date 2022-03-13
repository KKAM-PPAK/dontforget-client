import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import FONTS from "../../../commons/constants/FONTS";
import { MESSAGE } from "../../../commons/constants/MESSAGE";
import Memo from "./Memo";

export default function MemoList({ date }) {
  const taskList = useSelector((state) => state.task.taskList);
  const [sameDateMemoList, setSameDateMemoList] = useState([]);

  useEffect(() => {
    const targetMemoList = taskList
      .map((task) => task.memo)
      .flat()
      .filter(
        (memo) =>
          dayjs(memo.did_date).format("YYYY-MM-DD") ===
          dayjs(date.timestamp).format("YYYY-MM-DD"),
      )
      .sort((a, b) => b.did_date - a.did_date);
    setSameDateMemoList(targetMemoList);
  }, [date, taskList]);

  return (
    <View style={styles.memoListContainer}>
      {sameDateMemoList.length ? (
        <FlatList
          contentContainerStyle={styles.memoList}
          data={sameDateMemoList}
          keyExtractor={(memo) => String(memo._id)}
          renderItem={(memo) => <Memo memo={memo.item} />}
        />
      ) : (
        <Text style={styles.empty}>{MESSAGE.EMPTY_MEMO}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  memoListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  memoList: {
    width: 300,
    marginVertical: 5,
    alignItems: "center",
  },
  empty: {
    fontFamily: FONTS.gowun,
    textAlign: "center",
  },
});
