import React from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  return (
    <div className="relative flex items-center space-x-2 px-1 pb-2">
      <textarea
        placeholder="Type a message ..."
        className="resize-none h-11 w-full appearance-none text-gray-100 font-Poppins bg-gray-800 p-2 pr-8 rounded-lg focus:outline-none overflow-y-scroll"
      />
      <button className="absolute flex items-center justify-center right-2 bottom-3 text-xl bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-100 p-2 rounded-lg">
        <IoSend />
      </button>
    </div>
  );
};

export default MessageInput;
