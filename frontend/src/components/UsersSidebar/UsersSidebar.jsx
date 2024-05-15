import React, { useState } from "react";
import SearchUser from "../SearchUser/SearchUser.jsx";
import SearchedUsersList from "../SearchedUsersList/SearchedUsersList.jsx";
import Account from "../Account/Account.jsx";

const UsersSidebar = () => {
  const [usersSearchInputText, setUsersSearchInputText] = useState("");
  const [searchedUsersData, setSearchedUsersData] = useState([]);

  return (
    <div className="h-full flex flex-col justify-between w-full">
      <div>
        <SearchUser
          usersSearchInputText={usersSearchInputText}
          setUsersSearchInputText={setUsersSearchInputText}
          setSearchedUsersData={setSearchedUsersData}
        />
        {/* <div className="mx-1 border-t-2 border-gray-300"></div> */}
      </div>
      <div className="h-full px-2 mb-auto overflow-y-scroll scroll-smooth scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <SearchedUsersList
          usersSearchInputText={usersSearchInputText}
          searchedUsersData={searchedUsersData}
        />
      </div>
      <div>
        {/* <div className="mx-1 border-t-2 border-gray-300"></div> */}
        <Account />
      </div>
    </div>
  );
};

export default UsersSidebar;
