import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../slices/userSlices";
import taskReducer from "../slices/taskSlices";
import timeLineSlices from "../slices/timeLineSlices";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    timeLine: timeLineSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(logger),
});

export default store;
