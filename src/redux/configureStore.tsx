import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./user";

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
