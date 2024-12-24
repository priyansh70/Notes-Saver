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
      state.notes.push(note);

      // Update to localstorage
      localStorage.setItem("notes", JSON.stringify(state.notes));
      // show toast
      toast.success("Note added");
    },

    updateNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        // If the course is found in the Notes, update it
        state.notes[index] = note;
        // Update to localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes));
        // show toast
        toast.success("Note updated");
      }
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;

      console.log(noteId);
      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        // If the course is found in the Notes, remove it
        state.notes.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes));
        // show toast
        toast.success("Note deleted");
      }
    },
    resetNote: (state) => {
      state.notes = [];
      // Update to localstorage
      localStorage.removeItem("notes");
    },
  },
});

export const { addToNotes, removeFromNotes, updateNotes } = noteSlice.actions;

export default noteSlice.reducer;
