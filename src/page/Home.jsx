import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToNotes, updateNotes } from "../redux/noteSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notesAPI } from "../services/api";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const textArea = useRef();
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const noteId = searchParams.get("noteId"); // Get noteId from the search params
  const notes = useSelector((state) => state.note.notes);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNote = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please login to create notes");
      navigate("/login");
      return;
    }

    let trimTitle = title.trim();
    let trimValue = value.trim();

    if (!trimTitle && !trimValue) {
      return toast.error("Title and Content Missing");
    } else if (!trimValue) {
      return toast.error("Content Missing");
    } else if (!trimTitle) {
      return toast.error("Title Missing");
    }

    try {
      if (noteId) {
        // Update existing note via API
        const response = await notesAPI.updateNote(noteId, {
          title: trimTitle,
          content: trimValue,
        });

        const updatedNote = {
          ...response.note,
          _id: response.note._id || noteId,
        };
        dispatch(updateNotes(updatedNote));
        toast.success("Note updated successfully!");
      } else {
        // Create new note via API
        const response = await notesAPI.createNote({
          title: trimTitle,
          content: trimValue,
        });

        const newNote = {
          ...response.note,
          _id: response.note._id,
          createdAt: response.note.createdAt || new Date().toISOString(),
        };
        dispatch(addToNotes(newNote));
      }

      setTitle("");
      setValue("");
      setSearchParams({});
      navigate("/notes");
    } catch (error) {
      toast.error(error.message || "Failed to save note");
    }
  };

  const resetNote = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (noteId) {
      const note = notes.find((p) => p._id === noteId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [noteId, notes]);

  function handleTabKey(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textArea.current.selectionStart;
      const end = textArea.current.selectionEnd;
      const tabCharacter = "    "; // Replace with '\t' if you want a single tab character

      // Update the value with the tab character
      textArea.current.value =
        textArea.current.value.substring(0, start) +
        tabCharacter +
        textArea.current.value.substring(end);

      // Move the cursor after the inserted tab character
      textArea.current.selectionStart = textArea.current.selectionEnd =
        start + tabCharacter.length;
    }
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center flex-nowrap">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              noteId ? "w-[75%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2 flex-grow`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700  whitespace-nowrap"
            onClick={createNote}
          >
            {noteId ? "Update Note" : "Create Note"}
          </button>

          {noteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetNote}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  if (!textArea.current.value.length)
                    return toast.error("Content is Empty!!");
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy
                  className="group-hover:text-sucess-500"
                  size={20}
                />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            ref={textArea}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => handleTabKey(e)}
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0 resize-none overflow-y-scroll"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
