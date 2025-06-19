import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";
import popupReducer from "./popupSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    popup: popupReducer,
    auth: authReducer,
  },
});
