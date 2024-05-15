import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeContainer = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col justify-center items-center w-full p-2">
      <img src="/chitchat-logo.png" className="h-20 w-20 aspect-square mb-2" />
      <p className="text-gray-100 font-Poppins text-3xl font-semibold text-center">
        {/* Welcome to ChitChat */}
        ChitChat
      </p>
      <p className="text-gray-100 font-Poppins text-md text-center">
        Version 1.0
      </p>
      <div className="mt-4">
        <p className="text-gray-100 font-Poppins text-sm text-center hover:underline">
          <a href="https://github.com/ritwik-satpati" target="blank">
            Designed & Developed by Ritwik Satpati
          </a>
        </p>
        <p className="text-gray-100 font-Poppins text-sm text-center hover:underline">
          <a href="https://www.linkedin.com/in/Ritwik-Satpati/" target="blank">
            &copy; 2024 Ritwik Satpati. All Rights Reserved
          </a>
        </p>
      </div>
      <div className="lg:hidden w-full flex items-center justify-evenly space-x-2 mt-10 sm:px-[100px] md:px-[150px]">
        <button
          className="px-2 py-2 w-[130px] border-b-2 border-gray-300 hover:rounded-sm text-gray-300 hover:bg-gray-300 hover:text-gray-800 font-Poppins text-xl font-semibold text-center"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="px-2 py-2 w-[130px] border-b-2 border-gray-300 hover:rounded-sm text-gray-300 hover:bg-gray-300 hover:text-gray-800 font-Poppins text-xl font-semibold text-center "
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default WelcomeContainer;
