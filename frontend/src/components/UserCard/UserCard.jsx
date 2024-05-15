import React, { memo } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const params = useParams();
  const userMobileNumber = params.userNumber;

  const handleUserCardClicked = () => {
    const mobileNumber = (user?.mobileNumber).replace("+", "");
    const path = `/user/${mobileNumber}`;
    navigate(path);
    toast.success(user?.fullName);
  };

  return (
    <div
      className={`${
        userMobileNumber === user?.mobileNumber
          ? `bg-blue-500 hover:bg-blue-600`
          : `bg-blue-100 hover:bg-blue-200`
      } w-full flex justify-between space-x-2 h-12 rounded-md p-1 cursor-pointer`}
      onClick={handleUserCardClicked}
    >
      <div className="flex justify-center items-center space-x-2">
        <div className="relative h-10 w-10 rounded-full bg-gray-400 avatar">
          <img src={user?.avatar} className="max-h-10 aspect-square" />
          {user?.isOnline && (
            <div className="absolute h-2 w-2 bg-green-500 rounded-full top-0 right-0"></div>
          )}
        </div>
        <div className="flex flex-col items-start justify-between">
          <p className="font-Poppins font-medium text-md text-gray-900 line-clamp-1 overflow-hidden">
            {user?.fullName}
          </p>
          <p className="font-Poppins text-xs text-gray-900 line-clamp-1 overflow-hidden">
            {user?.mobileNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(UserCard);
