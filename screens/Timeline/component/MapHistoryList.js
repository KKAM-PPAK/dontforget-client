import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapHistory from "./MapHistory";
import InputText from "../../../components/Input/InputText";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";

export default function MapHistoryList() {
  const dispatch = useDispatch();
  const timeline = useSelector((state) => state.timeLine.polyline);
  const [keyword, setKeyword] = useState("");
  const [filteredLine, setFilteredLine] = useState();

  useEffect(() => {
    setFilteredLine(timeline);
  }, [timeline]);

  function searchFilter(text) {
    if (text) {
      const filteredDate = timeline.filter((line) => {
        const lineData = `${line.created_at.split("-")[0]} ${
          line.created_at.split("-")[1]
        } ${line.created_at.split("-")[2]}`;
        return lineData.indexOf(text) > -1;
      });

      setFilteredLine(filteredDate);
      setKeyword(text);
    } else {
      setFilteredLine(timeline);
      setKeyword(text);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <InputText
          inputStyle={styles.titleContainer}
          title="search"
          multiline={false}
          item={keyword}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <View style={styles.historyList}>
        <FlatList
          contentContainerStyle={styles.timelineContainer}
          data={filteredLine}
          keyExtractor={(polyline) => String(polyline._id)}
          renderItem={(polyline) => <MapHistory item={polyline.item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    width: "90%",
  },
  titleContainer: {
    flex: 1,
    fontFamily: FONTS.gowun,
    height: 80,
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  historyList: {
    position: "absolute",
    marginTop: 110,
    width: "90%",
    height: "70%",
    borderRadius: 15,
    elevation: 3,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  timelineContainer: {
    height: 500,
    alignItems: "center",
  },
});
