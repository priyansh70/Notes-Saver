import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes, resetNote } from "../redux/noteSlice";
import { closeModal } from "../redux/popupSlice";

const ConfrimationPopup = () => {
  const dispatch = useDispatch();

  // Access modal state from Redux
  const showModal = useSelector((state) => state.popup);

  const handleClose = () => {
    dispatch(closeModal()); // Dispatch the action to close the modal
  };

  const handleDelete = () => {
    if (!showModal.id) {
      dispatch(resetNote()); // Reset all notes if no ID is provided
    } else {
      dispatch(removeFromNotes(showModal.id)); // Remove the specific note
    }
    handleClose(); // Close modal after deleting
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
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimationPopup;
