import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPostiion } from "../../../commons/utils/location";
import { addLocations } from "../../../redux/slices/timeLineSlices";
import Button from "../../../components/Button/Button";

export default function CurrentMap({ isOpen, setIsOpen, history }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const { coordinates } = useSelector((state) => state.timeLine);

  useEffect(() => {
    (async () => {
      const locationData = await getCurrentPostiion();
      setLocation(locationData);
    })();
  }, []);

  useEffect(() => {
    dispatch(addLocations());
  }, [dispatch, history]);

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.screen}>
        <MapView
          initialRegion={location}
          style={styles.map}
          provider="google"
          showsUserLocation
          userLocationUpdateInterval={10000}
          followsUserLocation
          showsMyLocationButton
        >
          <Polyline
            coordinates={coordinates}
            strokeColor="blue"
            strokeWidth={5}
          />
        </MapView>
        <Button title="close" onPress={() => setIsOpen(false)} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 0.9,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
