import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../slices/userSlices";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
