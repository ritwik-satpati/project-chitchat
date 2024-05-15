import React from "react";
import { useSelector } from "react-redux";

const SearchUsersContainerWelcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-full flex flex-col justify-center items-center w-full">
      <img src="/chitchat-logo.png" className="h-20 w-20 aspect-square mb-2" />
      <p className="text-gray-200 font-Poppins text-3xl font-semibold text-center">
        Hello, {user?.fullName} 🔥
      </p>
      <p className="text-gray-100 font-Poppins text-2xl font-semibold text-center">
        Search & Click user to start ChitChat
      </p>
    </div>
  );
};

export default SearchUsersContainerWelcome;
