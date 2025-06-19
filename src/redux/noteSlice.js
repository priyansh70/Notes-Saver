import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        toast.error("Note already exist");
        return;
      }
      state.notes = [...state.notes, note];
      toast.success("Note Added Successfully!!");
    },

    updateNotes: (state, action) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex(
        (item) => item._id === updatedNote._id
      );

      if (index >= 0) {
        state.notes = state.notes.map((note, i) =>
          i === index ? updatedNote : note
        );
        toast.success("Note Updated Successfully!!");
      }
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        state.notes.splice(index, 1);
        toast.success("Note Delete Successfully!!");
      }
    },
    resetNote: (state) => {
      state.notes = [];
      state.loading = false;
      state.error = null;
      toast.success("All notes cleared!");
    },
  },
});

export const {
  setLoading,
  setError,
  setNotes,
  addToNotes,
  removeFromNotes,
  updateNotes,
  resetNote
} = noteSlice.actions;

export default noteSlice.reducer;
