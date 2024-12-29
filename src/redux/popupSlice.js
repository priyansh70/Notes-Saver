import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  id: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.id = action.payload || null;
    },
    closeModal: (state) => {
      state.open = false;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = popupSlice.actions;

export default popupSlice.reducer;
