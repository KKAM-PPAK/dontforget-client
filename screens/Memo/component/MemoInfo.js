import React from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import REPEATTYPE from "../../../commons/constants/REPEATTYPE";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";
import { INFO } from "../../../commons/constants/MESSAGE";

export default function MemoInfo({ memo }) {
  return (
    <View style={styles.memoContainer}>
      <Text style={styles.title}>{INFO.TITLE}</Text>
      <Text style={styles.titleContainer}>{memo.title}</Text>
      <Text style={styles.title}>{INFO.DESCRIPTION}</Text>
      <Text style={styles.descriptionContainer}>{memo.description}</Text>
      <Text style={styles.title}>{INFO.DID_DATE}</Text>
      <Text style={styles.notiContainer}>
        {dayjs(memo.did_date).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text style={styles.title}>{INFO.DUE_DATE}</Text>
      <Text style={styles.notiContainer}>
        {dayjs(memo.due_date).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text style={styles.title}>{INFO.REPEAT}</Text>
      <Text style={styles.notiContainer}>{REPEATTYPE[memo.repeat]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  memoContainer: {
    width: "100%",
    backgroundColor: COLORS.lightgreen,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: FONTS.gowun,
  },
  titleContainer: {
    fontFamily: FONTS.gowun,
    marginVertical: 5,
    textAlignVertical: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  descriptionContainer: {
    fontFamily: FONTS.gowun,
    marginVertical: 5,
    textAlignVertical: "center",
    height: 100,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  notiContainer: {
    fontFamily: FONTS.gowun,
    marginVertical: 5,
    textAlignVertical: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
});
