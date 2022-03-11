import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import getAccessToken from "../../commons/utils/getAccessToken";
import {
  cancelScheduledNotification,
  triggerNotificationHandler,
} from "../../commons/utils/localNotification";

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
      await axios({
        method: "delete",
        url: `${BASE_URL}/task/${taskId}`,
        headers,
      });
      dispatch(getUserTasks());

      return payload;
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
      await axios({
        method: "post",
        url: `${BASE_URL}/task/${task._id}/new`,
        data: { memo },
        headers,
      });

      dispatch(getUserTasks());

      return { memo, task };
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
      await axios({
        method: "put",
        url: `${BASE_URL}/task/${taskId}/${memoId}`,
        data: { memoInfo },
        headers,
      });

      dispatch(getUserTasks());
      return payload;
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
      await axios({
        method: "delete",
        url: `${BASE_URL}/task/${taskId}/${memoId}`,
        headers,
      });
      dispatch(getUserTasks());

      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const taskSlices = createSlice({
  name: "task",
  initialState: {
    taskList: [],
    memoList: [],
  },
  reducers: {},
  extraReducers: {
    [createTask.fulfilled]: (state, action) => {
      const newTask = action.payload;
      const option = {
        identifier: newTask._id,
        body: newTask.memo[0].title,
        date: newTask.memo[0].due_date,
        repeatType: newTask.memo[0].repeat,
        channelId: "task",
      };

      triggerNotificationHandler(option);
    },
    [getUserTasks.fulfilled]: (state, action) => {
      state.taskList = action.payload;
      state.memoList = action.payload.map((task) => task.memo).flat();
    },
    [createMemo.fulfilled]: (state, action) => {
      const { memo, task } = action.payload;
      const option = {
        identifier: task._id,
        body: memo.title,
        date: memo.due_date,
        repeatType: memo.repeat || "0",
        channelId: "task",
      };

      triggerNotificationHandler(option);
    },
    [removeMemo.fulfilled]: (state, action) => {
      const taskId = action.payload;

      cancelScheduledNotification(taskId);
    },
    [updateMemo.fulfilled]: (state, action) => {
      const { memoInfo, taskId } = action.payload;
      const option = {
        identifier: taskId,
        body: memoInfo.memo.title,
        date: memoInfo.memo.due_date,
        repeatType: memoInfo.memo.repeat || "0",
        channelId: "task",
      };

      triggerNotificationHandler(option);
    },
    [deleteTask.fulfilled]: (state, action) => {
      const identifier = action.payload;

      cancelScheduledNotification(identifier);
    },
  },
});

export default taskSlices.reducer;
