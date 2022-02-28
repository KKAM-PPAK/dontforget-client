import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAccessToken() {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export default getAccessToken;
