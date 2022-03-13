import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_ANDROID_SIMULATOR } from "@env";
import dayjs from "dayjs";
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

      return payload;
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
      const { data } = await axios({
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

      return payload;
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
    [createTask.fulfilled]: (state, action) => {
      const newTask = action.payload;
      state.taskList.push(newTask);
      const option = {
        identifier: newTask._id,
        body: newTask.memo[0].title,
        date: newTask.memo[0].due_date,
        repeatType: newTask.memo[0].repeat,
        channelId: "task",
      };

      triggerNotificationHandler(option);
    },
    [updateTask.fulfilled]: (state, action) => {
      const { taskId, title } = action.payload;
      const targetTaskIndex = state.taskList.findIndex(
        (task) => task._id === taskId,
      );
      state.taskList[targetTaskIndex].title = title;
    },
    [deleteTask.fulfilled]: (state, action) => {
      const taskId = action.payload;
      const targetTaskIndex = state.taskList.findIndex(
        (task) => task._id === taskId,
      );
      cancelScheduledNotification(taskId);
      state.taskList.splice(targetTaskIndex, 1);
    },
    [getUserTasks.fulfilled]: (state, action) => {
      state.taskList = action.payload;
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
      const { memoId, taskId } = action.payload;
      const targetTaskIndex = state.taskList.findIndex(
        (task) => task._id === taskId,
      );
      const memoIndex = state.taskList[targetTaskIndex].memo.findIndex(
        (memo) => memo._id === memoId,
      );
      state.taskList[targetTaskIndex].memo.splice(memoIndex, 1);
      if (memoIndex === state.taskList[targetTaskIndex].memo.length - 1) {
        cancelScheduledNotification(taskId);
      }
    },
    [updateMemo.fulfilled]: (state, action) => {
      const { memoInfo, taskId } = action.payload;
      if (dayjs(memoInfo.memo.due_date) > dayjs()) {
        const option = {
          identifier: taskId,
          body: memoInfo.memo.title,
          date: memoInfo.memo.due_date,
          repeatType: memoInfo.memo.repeat || "0",
          channelId: "task",
        };

        triggerNotificationHandler(option);
      }
    },
  },
});

export default taskSlices.reducer;
