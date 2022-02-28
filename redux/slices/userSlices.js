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
      await AsyncStorage.clear();
      const { data } = await axios.post(`${BASE_URL}/auth/signIn`, {
        idToken: payload,
      });

      await AsyncStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.respose.data);
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  "get/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { data } = await axios.get(`${BASE_URL}/auth/user`, {
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
  reducers: {},
  extraReducers: {
    [userSignIn.fulfilled]: (state, action) => {
      const { name, uid, email } = action.payload;
      state.name = name;
      state.uid = uid;
      state.email = email;
      state.loading = false;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const { name, uid, email } = action.payload;
      state.name = name;
      state.uid = uid;
      state.email = email;
      state.loading = false;
    },
  },
});

export default userSlices.reducer;
