import React from "react";
import WelcomeContainer from "../components/WelcomeContainer/WelcomeContainer.jsx";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] p-2 md:p-4 mx-auto my-auto">
      <div className="flex w-full lg:w-[1000px] h-full lg:h-[550px] rounded-lg shadow-md border-4 border-gray-100 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
        <div className="flex items-center justify-center w-full lg:w-[350px] h-full">
          <RegisterForm />
        </div>
        <div className="hidden lg:block border-l-4 border-gray-100"></div>
        <div className="hidden lg:block w-[650px]">
          <WelcomeContainer />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
