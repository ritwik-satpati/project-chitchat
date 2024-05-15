import React from "react";
import { IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setIsSearchUsersSidebar } from "../../redux/slices/misc.slice";
import { useNavigate } from "react-router-dom";

const SearchConversations = () => {
  // const dispatch = useDispatch();

  // const handleSearchUsersSidebarTrue = () => {
  //   dispatch(setIsSearchUsersSidebar(true));
  // };

  const navigate = useNavigate()
  
  const handleSearchUsersSidebarTrue = () => {
    navigate('/user')
  }

  return (
    <div className="flex items-center space-x-2 px-1 py-2">
      <input
        type="text"
        placeholder="Search Conversations ....."
        className="flex-grow appearance-none text-gray-100 font-Poppins bg-gray-800 p-2 rounded-xl focus:outline-none"
      />
      <button className="text-2xl bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-100 p-2 rounded-full">
        <IoSearch />
      </button>
      <button
        className="text-2xl bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-100 p-2 rounded-full"
        onClick={handleSearchUsersSidebarTrue}
      >
        <BiEdit />
      </button>
    </div>
  );
};

export default SearchConversations;
