import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUserApi } from "../../routes/auth.routes.js";
import { axiosConfigJson } from "../../libs/axiosConfig.js";
import { useDispatch } from "react-redux";
import {
  loginUserFail,
  loginUserRequest,
  loginUserSuccess,
} from "../../redux/slices/auth.slice.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirectTo");
  const referralCode = new URLSearchParams(location.search).get("referralCode");

  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (phoneNumber && password) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [countryCode, phoneNumber, password]);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      loginUserRequest();
      console.log(loginUserApi);
      const { data } = await axios.post(
        loginUserApi,
        {
          mobileNumber: countryCode + phoneNumber,
          password: password,
        },
        axiosConfigJson
      );
      dispatch(loginUserSuccess(data.data.user));

      toast.success(data.message);
      // navigate(redirectPath || "/");
    } catch (error) {
      dispatch(loginUserFail());
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const handleRegister = () => {
    let queryParams = "";
    if (redirectPath) {
      queryParams = `?redirectTo=${redirectPath}`;
      if (referralCode) {
        queryParams += `&referralCode=${referralCode}`;
      }
    } else if (referralCode) {
      queryParams = `?referralCode=${referralCode}`;
    }
    navigate(`/register${queryParams}`);
  };

  return (
    <div className="w-full max-h-full flex items-start justify-center overflow-y-scroll">
      <div className="py-6 px-8 md:px-12 lg:px-8 w-full">
        <h1 className="w-full text-2xl font-semibold text-center text-gray-100 font-Poppins">
          Login to your account
        </h1>
        <form className="w-full mt-6 space-y-3" onSubmit={handleLogin}>
          <div className="w-full flex flex-col space-y-4">
            <div className="w-full space-y-1">
              <p className="font-Poppins text-gray-100 text-lg">
                Phone Number *
              </p>
              <div className="flex justify-start items-center w-full">
                <div className="">
                  <select
                    className="appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-300 p-2 rounded-l-md focus:outline-none"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                  >
                    <option
                      value="+1"
                      className="bg-gray-600 text-gray-300 font-Roboto"
                    >
                      +1
                    </option>
                    <option
                      value="+91"
                      className="bg-gray-600 text-gray-300 font-Roboto"
                    >
                      +91
                    </option>
                    {/* Add more country codes as needed */}
                  </select>
                </div>
                <div className="flex flex-1">
                  <input
                    type="tel"
                    placeholder="9876543210"
                    className="w-full text-gray-100 font-Poppins appearance-none bg-transparent border-t-2 border-r-2 border-b-2 border-gray-300 p-2 rounded-r-md focus:outline-none"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-full space-y-1">
              <p className="font-Poppins text-gray-100 text-lg">Password *</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-100 p-2 rounded-md pr-10 focus:outline-none "
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent text-gray-100 text-xl focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="w-full">
                <div className="font-Poppins text-md text-right text-gray-100 cursor-pointer">
                  Forget Password
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 w-full">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full text-white text-lg font-Poppins py-2 px-4 rounded-md focus:outline-none ${
                canSubmit
                  ? "bg-blue-600 hover:bg-blue-600 focus:bg-blue-600 cursor-pointer"
                  : "cursor-not-allowed bg-gray-500"
              }`}
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-full mt-2">
          <div
            className="font-Poppins text-lg text-gray-300 cursor-pointer"
            onClick={handleRegister}
          >
            Don't have an account ?{" "}
            <span className="text-gray-100">Register</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
