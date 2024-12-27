import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        // If the course is already in the Notes, do not modify the quantity
        toast.error("Note already exist");
        return;
      }
      // If the course is not in the Notes, add it to the Notes
      state.notes = [...state.notes, note];
      localStorage.setItem("notes", JSON.stringify(state.notes));

      // show toast
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
        // Update LocalStorage
        localStorage.setItem("notes", JSON.stringify(state.notes));

        // Toast
        toast.success("Note Updated Successfully!!");
      }
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;

      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        // If the course is found in the Notes, remove it
        state.notes.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes));
        // show toast
        toast.success("Note Delete Successfully!!");
      }
    },
    resetNote: (state) => {
      state.notes = [];
      // Update to localstorage
      localStorage.removeItem("notes");
      toast.success("Note Reset Successfully!!");
    },
  },
});

export const { addToNotes, removeFromNotes, updateNotes, resetNote } =
  noteSlice.actions;

export default noteSlice.reducer;
