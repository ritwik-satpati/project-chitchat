import React from "react";
import ConversationsList from "../ConversationsList/ConversationsList.jsx";
import Account from "../Account/Account.jsx";
import SearchConversations from "../SearchConversations/SearchConversations.jsx";

const ConversationsSidebar = () => {
  return (
    <div className="h-full flex flex-col justify-between w-full">
      <div>
        <SearchConversations />
        {/* <div className="mx-1 border-t-2 border-gray-300"></div> */}
      </div>
      <div className="h-full px-2 mb-auto overflow-y-scroll scroll-smooth scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <ConversationsList />
      </div>
      <div>
        {/* <div className="mx-1 border-t-2 border-gray-300"></div> */}
        <Account />
      </div>
    </div>
  );
};

export default ConversationsSidebar;
