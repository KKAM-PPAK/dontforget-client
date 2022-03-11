import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import getAccessToken from "../../commons/utils/getAccessToken";

const BASE_URL = BASE_URL_ANDROID_SIMULATOR;

export const addLocations = createAsyncThunk(
  "get/backgroundLocation",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const today = dayjs().format("YYYY-MM-DD");
      const backgroundLocation = await AsyncStorage.getItem(today);
      const data = JSON.parse(backgroundLocation);

      return { data, today };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addTimeline = createAsyncThunk(
  "post/timeline/:date",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const data = await AsyncStorage.getItem(yesterday);

      if (data) {
        const headers = await getAccessToken();
        await axios({
          method: "post",
          url: `${BASE_URL}/timeline/${yesterday}`,
          data: { timeline: data },
          headers,
        });
      }

      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getTimeline = createAsyncThunk(
  "get/timeline",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/timeline`,
        headers,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const timeLineSlices = createSlice({
  name: "timeLine",
  initialState: {
    coordinates: [],
    polyline: "",
  },
  reducers: {},
  extraReducers: {
    [addLocations.fulfilled]: (state, action) => {
      const { data, today } = action.payload;
      state.coordinates = data;
    },
    [getTimeline.fulfilled]: (state, action) => {
      state.polyline = action.payload;
    },
  },
});

export const { addCurrentLocation } = timeLineSlices.actions;
export default timeLineSlices.reducer;
