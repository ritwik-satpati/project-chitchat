import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { registerUserApi } from "../../routes/auth.routes";
import { axiosConfigJson } from "../../libs/axiosConfig";
import { useDispatch } from "react-redux";
import {
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
} from "../../redux/slices/auth.slice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirectTo");
  const referralCode = new URLSearchParams(location.search).get("referralCode");

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [referral, setReferral] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (
      name &&
      countryCode &&
      phoneNumber &&
      password &&
      confirmPassword &&
      isPasswordMatched
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }

    if (referralCode) {
      setReferral(referralCode);
    }
  }, [
    name,
    countryCode,
    phoneNumber,
    password,
    confirmPassword,
    isPasswordMatched,
    referralCode,
  ]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword === e.target.value || !confirmPassword) {
      setIsPasswordMatched(true);
    } else {
      setIsPasswordMatched(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value || !password) {
      setIsPasswordMatched(true);
    } else {
      setIsPasswordMatched(false);
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleReferralChange = (e) => {
    if (!referralCode) {
      setReferral(e.target.value);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      registerUserRequest();
      const { data } = await axios.post(
        registerUserApi,
        {
          fullName: name,
          mobileNumber: countryCode + phoneNumber,
          password,
          gender,
        },
        axiosConfigJson
      );
      dispatch(registerUserSuccess(data.data.user));

      toast.success(data.message);
      // navigate(redirectPath || "/");
    } catch (error) {
      dispatch(registerUserFail());
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    // console.log("Form submitted!");
    navigate(redirectPath || "/");
  };

  const handleLogin = () => {
    let queryParams = "";
    if (redirectPath) {
      queryParams = `?redirectTo=${redirectPath}`;
      if (referralCode) {
        queryParams += `&referralCode=${referralCode}`;
      }
    } else if (referralCode) {
      queryParams = `?referralCode=${referralCode}`;
    }
    navigate(`/login${queryParams}`);
  };

  return (
    <div className="w-full max-h-full flex items-start justify-center overflow-y-scroll">
      <div className="py-6 px-8 md:px-12 lg:px-8 w-full">
        <h1 className="w-full text-2xl font-semibold text-center text-gray-100 font-Poppins">
          Register as a new user
        </h1>
        <form className="w-full mt-6 space-y-3" onSubmit={handleRegister}>
          <div className="w-full flex flex-col space-y-4">
            <div className="w-full space-y-1">
              <p className="font-Poppins text-gray-100 text-lg">Name *</p>
              <input
                type="text"
                placeholder="Ritwik Satpati"
                className="w-full appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                value={name}
                onChange={handleNameChange}
              />
            </div>
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
            </div>
            <div className="w-full space-y-1">
              <div className="w-full flex justify-between items-end">
                <p className="font-Poppins text-gray-100 text-lg">
                  Confirm Password *
                </p>
                {isPasswordMatched && (
                  <div className="w-max text-right font-Roboto text-green-400 text-sm">
                    Password is matched
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-100 p-2 rounded-md pr-10 focus:outline-none "
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent text-gray-100 text-xl focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="w-full space-y-1 hidden">
              <p className="font-Poppins text-gray-100 text-lg">Gender</p>
              <select
                className="w-full appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                value={gender}
                onChange={handleGenderChange}
              >
                <option
                  value=""
                  className="bg-gray-600 text-gray-300 font-Roboto"
                >
                  Select Gender
                </option>
                <option
                  value="male"
                  className="bg-gray-600 text-gray-300 font-Roboto"
                >
                  Male
                </option>
                <option
                  value="female"
                  className="bg-gray-600 text-gray-300 font-Roboto"
                >
                  Female
                </option>
                <option
                  value="other"
                  className="bg-gray-600 text-gray-300 font-Roboto"
                >
                  Other
                </option>
                <option
                  value=""
                  className="bg-gray-600 text-gray-300 font-Roboto"
                >
                  Rather not say
                </option>
              </select>
            </div>
            <div className="w-full space-y-1">
              <p className="font-Poppins text-gray-100 text-lg">
                Referral Code
              </p>
              <input
                type="text"
                placeholder="XXXXXX"
                disabled={referralCode ? true : false}
                className="w-full appearance-none text-gray-100 font-Poppins bg-transparent border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                value={referral}
                onChange={handleReferralChange}
              />
            </div>
          </div>
          <div className="pt-2 w-full">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full text-white text-lg font-Poppins py-2 px-4 rounded-md focus:outline-none ${
                canSubmit
                  ? "bg-blue-600 hover:bg-blue-600 focus:bg-blue-600 cursor-pointer"
                  : "cursor-not-allowed bg-gray-500"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="w-full mt-2">
          <div
            className="font-Poppins text-lg text-gray-300 cursor-pointer"
            onClick={handleLogin}
          >
            Already have an account ?{" "}
            <span className="text-gray-100">Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
