import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../slices/userSlices";
import taskReducer from "../slices/taskSlices";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(logger),
});

export default store;
