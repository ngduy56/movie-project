import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../store/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, 
  }),
});