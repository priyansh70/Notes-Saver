import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToNotes, updateNotes } from "../redux/noteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const noteId = searchParams.get("noteId"); // Get noteId from the search params
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();

  const createNote = () => {
    // console.log(title.length);
    let trimTitle = title.trim();
    let trimValue = value.trim();

    if (!trimTitle && !trimValue) {
      return toast.error("Both Missing");
    } else if (!trimValue) {
      return toast.error("Content Missing");
    } else if (!trimTitle) {
      return toast.error("Title Missing");
    }
    const note = {
      title: trimTitle,
      content: trimValue,
      _id: noteId || crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    if (noteId) {
      // If noteId is present, update the note
      dispatch(updateNotes(note));
    } else {
      dispatch(addToNotes(note));
    }

    setTitle("");
    setValue("");

    // Remove the noteId from the URL after creating/updating a note
    setSearchParams({});
  };

  const resetNote = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
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

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // Dynamic width based on whether noteId is present
            className={`${
              noteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createNote}
          >
            {noteId ? "Update Note" : "Create My Note"}
          </button>

          {noteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0"
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
