import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { logoutUserApi } from "../../routes/auth.routes";
import { axiosConfig } from "../../libs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserFail,
  logoutUserRequest,
  logoutUserSuccess,
} from "../../redux/slices/auth.slice";

const Account = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogoutIconClicked, setIsLogoutIconClicked] = useState(false);

  const handleLogoutIconClicked = () => {
    setIsLogoutIconClicked(true);
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutUserRequest());

      const { data } = await axios.post(logoutUserApi, {}, axiosConfig);
      dispatch(logoutUserSuccess());

      toast.success(data.message);
      setIsLogoutIconClicked(false);
      // navigate("/login");
    } catch (error) {
      dispatch(logoutUserFail());
      // console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handleCancelLogout = () => {
    setIsLogoutIconClicked(false);
    toast.success("Logout Cancelled!");
  };

  return (
    <>
      <div className="flex items-center space-x-2 px-2 py-2">
        <div className="w-full flex justify-between space-x-2 bg-teal-300 h-16 rounded-md p-1">
          <div className="flex justify-center items-center space-x-2">
            <div className="h-14 w-14 rounded-full bg-gray-600">
              <img src={user?.avatar} className="h-14 aspect-square" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="font-Poppins font-medium text-xl text-gray-900 line-clamp-1 overflow-hidden">
                {user?.fullName}
              </p>
              <p className="font-Poppins text-sm text-gray-900 line-clamp-1 overflow-hidden">
                {user?.mobileNumber}
              </p>
            </div>
          </div>
          <button
            className="text-2xl text-gray-700 hover:text-gray-900 p-2"
            onClick={handleLogoutIconClicked}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
      {isLogoutIconClicked && (
        <Dialog
          isOpen={isLogoutIconClicked}
          isColourReverse={true}
          title="Confirm Logout"
          message="Are you want to logout ?"
          submitText="Yes"
          handleSubmit={handleLogout}
          closeText="No"
          handleClose={handleCancelLogout}
        />
      )}
    </>
  );
};

export default Account;
