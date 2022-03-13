import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import CurrentMap from "./component/CurrentMap";
import { addLocations, getTimeline } from "../../redux/slices/timeLineSlices";
import MapHistoryList from "./component/MapHistoryList";
import COLORS from "../../commons/constants/COLORS";
import Loading from "../../components/Apploading/Loading";
import FONTS from "../../commons/constants/FONTS";
import { INFO } from "../../commons/constants/MESSAGE";

export default function TimelineScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showCurrentMap, setShowCurrentMap] = useState(false);
  const [history, setHistory] = useState();
  const { coordinates } = useSelector((state) => state.timeLine);

  useEffect(() => {
    setHistory(coordinates);
  }, []);

  useEffect(async () => {
    await dispatch(getTimeline());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dispatch(addLocations());
  }, [dispatch, showCurrentMap]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.historyContainer}>
        <KeyboardAvoidingView>
          <View style={styles.history}>
            <MapHistoryList />
          </View>
        </KeyboardAvoidingView>
      </View>
      <Button
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        title={INFO.CURR_LOC}
        onPress={() => setShowCurrentMap(true)}
      />
      <CurrentMap
        history={history}
        isOpen={showCurrentMap}
        setIsOpen={setShowCurrentMap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  historyContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.lightgray,
  },
  history: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.9,
    backgroundColor: COLORS.lightgray,
  },
  button: {
    position: "absolute",
    bottom: "1%",
    height: "8%",
    width: "30%",
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 15,
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    flex: 1,
    fontFamily: FONTS.gowun,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
});
