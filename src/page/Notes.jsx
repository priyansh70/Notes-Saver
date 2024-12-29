import { CircleX } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"; // Import useState
import Note from "../components/Note";
import ConfrimationPopup from "../components/ConfrimationPopup";
import toast from "react-hot-toast";
import { openModal } from "../redux/popupSlice";

const Notes = () => {
  const notes = useSelector((state) => state.note.notes);
  const open = useSelector((state) => state.popup.open);

  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const dispatch = useDispatch();

  function handleOpenModal(id = null) {
    dispatch(openModal(id)); // Dispatch the action with the note ID (or null)
  }

  // Filter notes based on search term (by title or content)
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
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
            <div className="flex flex-row items-center justify-between mx-3 border  p-4  border-[rgba(128,121,121,0.3)]">
              <h2 className=" text-4xl font-bold">All Notes</h2>
              <button
                className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-red-500"
                onClick={() => {
                  if (!notes.length) {
                    toast.error("Notes not found!!");
                    return;
                  }
                  handleOpenModal();
                }}
              >
                <CircleX
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
          </div>
        </div>
        {open && <ConfrimationPopup />}
      </div>
    </>
  );
};

export default Notes;
