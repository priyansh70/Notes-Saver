import {} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromNotes, resetNote } from "../redux/noteSlice";

const Note = () => {
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({ open: false, id: null }); // Object state
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  function openModal(id) {
    if (id) {
      setShowModal({ open: true, id }); // Open modal with note ID
    } else setShowModal({ open: true, id: null }); // Open modal with note ID
  }

  function closeModal() {
    setShowModal({ open: false, id: null }); // Reset modal state
  }

  const handleDelete = () => {
    if (!showModal.id) {
      dispatch(resetNote());
    } else dispatch(removeFromNotes(showModal.id));
    closeModal(); // Close modal after deleting
  };

  // Filter notes based on search term (by title or content)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 relative">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            type="search"
            placeholder="Search note here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Notes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <div className="flex flex-row items-center justify-between mx-3 border  p-4       border-[rgba(128,121,121,0.3)]">
            <h2 className=" text-4xl font-bold">All Notes</h2>
            <button
              className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-red-500"
              onClick={() => openModal()}
            >
              <Trash2
                className="text-black group-hover:text-pink-500"
                size={20}
              />
            </button>
          </div>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Note
                  note={note}
                  key={note?._id}
                />
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
          {/* Confirmation Modal */}
          {showModal.open && (
            <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to delete this note?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={closeModal}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;