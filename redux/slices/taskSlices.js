import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import getAccessToken from "../../commons/utils/getAccessToken";

const BASE_URL = BASE_URL_ANDROID_SIMULATOR;

export const createTask = createAsyncThunk(
  "post/task/new",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("%%%%%%payload%%%%%%", payload);
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "post",
        url: `${BASE_URL}/task/new`,
        data: { task: payload },
        headers,
      });
      dispatch(getUserTasks());

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserTasks = createAsyncThunk(
  "get/task/main",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/task/main`,
        headers,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const taskSlices = createSlice({
  name: "task",
  initialState: {
    taskList: [],
  },
  reducers: {},
  extraReducers: {
    [createTask.fulfilled]: (state, action) => {},
    [getUserTasks.fulfilled]: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export default taskSlices.reducer;
