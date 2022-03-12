import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import getAccessToken from "../../commons/utils/getAccessToken";

const BASE_URL = BASE_URL_ANDROID_SIMULATOR;

export const userSignIn = createAsyncThunk(
  "post/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${BASE_URL}/auth/signIn`,
        data: { idToken: payload },
      });

      await AsyncStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  "get/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/auth/user`,
        headers,
      });

      await AsyncStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlices = createSlice({
  name: "user",
  initialState: {
    name: "",
    uid: "",
    email: "",
  },
  reducers: {
    initUserInfo: (state, action) => {
      state.name = "";
      state.uid = "";
      state.email = "";
    },
  },
  extraReducers: {
    [userSignIn.fulfilled]: (state, action) => {
      const { name, uid, email } = action.payload;
      state.name = name;
      state.uid = uid;
      state.email = email;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const { name, uid, email } = action.payload;
      state.name = name;
      state.uid = uid;
      state.email = email;
    },
  },
});

export const { initUserInfo } = userSlices.actions;
export default userSlices.reducer;
