import React, { useEffect, useState } from "react";
import { TbEditOff } from "react-icons/tb";
import { useLazySearchUsersQuery } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchUser = ({
  usersSearchInputText,
  setUsersSearchInputText,
  setSearchedUsersData,
}) => {
  const navigate = useNavigate();

  const [searchUsers] = useLazySearchUsersQuery();

  const handleSearchUsersSidebarFalse = () => {
    navigate("/");
  };

  useEffect(() => {
    if (usersSearchInputText.length >= 3) {
      const timeOut = setTimeout(() => {
        searchUsers(usersSearchInputText)
          .then(
            // ({data}) => console.log(data.data.users)
            ({ data }) => {
              setSearchedUsersData(data?.data?.users);
            }
          )
          .catch(
            (error) => console.log(error)
            // toast.error()
          );
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [usersSearchInputText]);

  return (
    <div className="flex items-center space-x-2 px-1 py-2">
      <input
        type="text"
        placeholder="Search Users ....."
        value={usersSearchInputText}
        className="flex-grow appearance-none text-gray-100 font-Poppins bg-gray-800 p-2 rounded-xl focus:outline-none"
        onChange={(e) => setUsersSearchInputText(e.target.value)}
      />
      {/* <button className="text-2xl bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-100 p-2 rounded-full">
        <IoSearch />
      </button> */}
      <button
        className="text-2xl bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-100 p-2 rounded-full"
        onClick={handleSearchUsersSidebarFalse}
      >
        <TbEditOff />
      </button>
    </div>
  );
};

export default SearchUser;
