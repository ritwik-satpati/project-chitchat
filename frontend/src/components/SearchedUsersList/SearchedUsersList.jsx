import React from "react";
import UserCard from "../UserCard/UserCard";

const SearchedUsersList = ({ usersSearchInputText, searchedUsersData }) => {
  const searchedUsers = searchedUsersData || null;

  return (
    <>
      {usersSearchInputText && usersSearchInputText.length >= 3 ? (
        searchedUsers && searchedUsers.length >= 1 ? (
          <div className="space-y-2">
            {searchedUsers &&
              searchedUsers.map((item) => (
                <UserCard key={item._id} user={item} />
              ))}
          </div>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center space-x-1 select-none">
            <p className="h-full w-full flex items-center justify-center text-center font-Poppins text-gray-100">
              No new user found. Either you already started a conversations,
              check your conversations. Or user does not exist ...
            </p>
          </div>
        )
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center space-x-1 select-none">
          <p className="h-full w-full flex items-center justify-center text-center font-Poppins text-gray-100">
            Type Name or Mobile Number in searchbox atleast 3 digits
          </p>
        </div>
      )}
    </>
  );
};

export default SearchedUsersList;
