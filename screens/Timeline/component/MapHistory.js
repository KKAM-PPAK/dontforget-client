import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import COLORS from "../../../commons/constants/COLORS";
import FONTS from "../../../commons/constants/FONTS";
import { BUTTON } from "../../../commons/constants/MESSAGE";
import Button from "../../../components/Button/Button";

export default function MapHistory({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialRegion, setInitialRegion] = useState();
  const coordinates = JSON.parse(item.polyline[0]);

  useEffect(() => {
    const { latitude, longitude } = coordinates[0];
    setInitialRegion({
      latitude,
      longitude,
      latitudeDelta: 0.07,
      longitudeDelta: 0.07,
    });
  }, []);

  return (
    <>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.mapview}>
            <Text>이동한 거리 : {item.distance / 1000} km</Text>
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              provider="google"
            >
              <Polyline
                coordinates={coordinates}
                strokeColor="blue"
                strokeWidth={5}
              />
            </MapView>
            <Button
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              title={BUTTON.CLOSE}
              onPress={() => setIsOpen(false)}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.date} onPress={() => setIsOpen(true)}>
        <Text style={styles.dateText}>{item.created_at}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mapview: {
    backgroundColor: COLORS.white,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.7,
  },
  map: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.5,
  },
  date: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
    elevation: 8,
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.blue,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontFamily: FONTS.gowun,
  },
  button: {
    width: 100,
    height: 30,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
