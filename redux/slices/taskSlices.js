import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import getAccessToken from "../../commons/utils/getAccessToken";

const BASE_URL = BASE_URL_ANDROID_SIMULATOR;

export const createTask = createAsyncThunk(
  "post/task/new",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
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

export const updateTask = createAsyncThunk(
  "put/task/:taskId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { taskId, title } = payload;
      const { data } = await axios({
        method: "put",
        url: `${BASE_URL}/task/${taskId}`,
        data: { task: title },
        headers,
      });

      dispatch(getUserTasks());

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "delete/task/:taskId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const taskId = payload;
      const { data } = await axios({
        method: "delete",
        url: `${BASE_URL}/task/${taskId}`,
        headers,
      });
      dispatch(getUserTasks());

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createMemo = createAsyncThunk(
  "post/task/:task_id/new",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { memo, task } = payload;
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "post",
        url: `${BASE_URL}/task/${task._id}/new`,
        data: { memo },
        headers,
      });
      dispatch(getUserTasks());

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateMemo = createAsyncThunk(
  "put/task/:taskId/:memoId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { memoInfo, memoId, taskId } = payload;
      const headers = await getAccessToken();
      const { data } = await axios({
        method: "put",
        url: `${BASE_URL}/task/${taskId}/${memoId}`,
        data: { memoInfo },
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

export const removeMemo = createAsyncThunk(
  "delete/task/:taskId/:memoId",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const headers = await getAccessToken();
      const { memoId, taskId } = payload;
      const { data } = await axios({
        method: "delete",
        url: `${BASE_URL}/task/${taskId}/${memoId}`,
        headers,
      });
      dispatch(getUserTasks());

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
    [createMemo.fulfilled]: (state, action) => {},
  },
});

export default taskSlices.reducer;
