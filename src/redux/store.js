import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";
import popupReducer from "./popupSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    popup: popupReducer,
  },
});
