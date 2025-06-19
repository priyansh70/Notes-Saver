import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes, resetNote } from "../redux/noteSlice";
import { closeModal } from "../redux/popupSlice";
import { notesAPI } from "../services/api";
import toast from "react-hot-toast";

const ConfrimationPopup = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Access modal state from Redux
  const showModal = useSelector((state) => state.popup);
  const notes = useSelector((state) => state.note.notes);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      if (!showModal.id) {
        // Delete all notes
        await Promise.all(notes.map(note => notesAPI.deleteNote(note._id)));
        dispatch(resetNote());
      } else {
        // Delete specific note
        await notesAPI.deleteNote(showModal.id);
        dispatch(removeFromNotes(showModal.id));
      }

      if (onConfirm) {
        onConfirm(); // Refresh notes list
      }

      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete {showModal.id ? "this" : "all"} note?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleClose}
            disabled={loading}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimationPopup;
