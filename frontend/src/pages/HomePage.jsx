import React from "react";
import ConversationsSidebar from "../components/ConversationsSidebar/ConversationsSidebar";
import MessageContainerWelcome from "../components/MessageContainerWelcome/MessageContainerWelcome.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] p-2 md:p-4 mx-auto my-auto">
      <div className="flex w-full lg:w-[1000px] h-full lg:h-[550px] rounded-lg shadow-md border-4 border-gray-100 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
        <div className="h-full flex flex-col justify-between w-full lg:w-[350px]">
          <ConversationsSidebar />
        </div>
        <div className="hidden lg:block border-l-4 border-gray-100"></div>
        <div className="hidden lg:block w-[650px]">
          <MessageContainerWelcome />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
