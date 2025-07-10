import { CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Note from "../components/Note";
import ConfrimationPopup from "../components/ConfrimationPopup";
import toast from "react-hot-toast";
import { openModal } from "../redux/popupSlice";
import { setLoading, setError, setNotes, resetNote } from "../redux/noteSlice";
import { notesAPI } from "../services/api";

const Notes = () => {
  const { notes, loading, error } = useSelector((state) => state.note);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const open = useSelector((state) => state.popup.open);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Fetch notes when component mounts or when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  const fetchNotes = async () => {
    try {
      dispatch(setLoading(true));
      const response = await notesAPI.getAllNotes();
      dispatch(setNotes(response.data));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message || "Failed to fetch notes");
    }
  };

  function handleOpenModal(id = null) {
    dispatch(openModal(id));
  }

  const handleResetAllNotes = () => {
    if (!notes.length) {
      toast.error("Notes not found!!");
      return;
    }
    handleOpenModal(); // Open modal for confirmation
  };

  // Filter notes based on search term (by title or content)
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 flex items-center justify-center">
        <div className="text-2xl">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* All Notes */}
          <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
            <div className="flex flex-row items-center justify-between mx-3 border  p-4  border-[rgba(128,121,121,0.3)]">
              <h2 className=" text-4xl font-bold">All Notes</h2>
              <button
                className="p-2 rounded-[0.2rem] border hover:bg-red-500 group border-red-500"
                onClick={handleResetAllNotes}
                title="Delete all notes"
              >
                <CircleX
                  className="text-red-500 group-hover:text-white"
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
                    onDelete={fetchNotes}
                  />
                ))
              ) : (
                <div className="text-2xl text-center w-full text-gray-500">
                  {searchTerm
                    ? "No notes match your search"
                    : "No notes found. Create your first note!"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && <ConfrimationPopup onConfirm={fetchNotes} />}
    </>
  );
};

export default Notes;
