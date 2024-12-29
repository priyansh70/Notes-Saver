import React, { useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from "../utlis/formatDate";
import { NavLink } from "react-router-dom";
import ConfrimationPopup from "./ConfrimationPopup";
import { openModal } from "../redux/popupSlice";
import { useDispatch, useSelector } from "react-redux";

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.popup.open);

  return (
    <>
      <div
        key={note?._id}
        className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
      >
        {/* heading and Description */}
        <div className="md:w-[60%] flex flex-col space-y-3 ">
          <p className="text-xl md:text-3xl font-semibold truncate">
            {note?.title}
          </p>
          <p className="text-sm font-normal max-w-[80%] text-[#707070] truncate">
            {note?.content}
          </p>
        </div>
        {/* icons */}
        <div className="flex flex-col gap-y-4 sm:items-end">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <NavLink to={`/?noteId=${note?._id}`}>
              <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500">
                <PencilLine
                  className="text-black group-hover:text-blue-500"
                  size={20}
                />
              </button>
            </NavLink>
            <button
              className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
              onClick={() => dispatch(openModal(note?._id))}
            >
              <Trash2
                className="text-black group-hover:text-pink-500"
                size={20}
              />
            </button>
            <NavLink
              to={`/notes/${note?._id}`}
              target="_blank"
            >
              <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                <Eye
                  className="text-black group-hover:text-orange-500"
                  size={20}
                />
              </button>
            </NavLink>
            <button
              className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
              onClick={() => {
                navigator.clipboard.writeText(note?.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy
                className="text-black group-hover:text-green-500"
                size={20}
              />
            </button>
          </div>

          <div className="gap-x-2 flex ">
            <Calendar
              className="text-black"
              size={20}
            />
            {FormatDate(note?.createdAt)}
          </div>
        </div>
      </div>
      {open && <ConfrimationPopup />}
    </>
  );
};
export default Note;
