import React from "react";
import user from "../../sampleData/user.data";

const MessageContainerWelcome = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center w-full">
      <img src="/chitchat-logo.png" className="h-20 w-20 aspect-square mb-2" />
      <p className="text-gray-100 font-Poppins text-2xl font-semibold text-center">
        Welcome to ChitChat
      </p>
      <p className="text-gray-200 font-Poppins text-3xl font-semibold text-center">
        {user.fullName} 😎
      </p>
    </div>
  );
};

export default MessageContainerWelcome;
