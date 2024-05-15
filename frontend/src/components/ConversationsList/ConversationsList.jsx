import React from "react";
import ConversationCard from "../ConversationCard/ConversationCard.jsx";
import { useConversationsQuery } from "../../redux/api/api.js";
import useApiErrors from "../../hooks/useApiErrors.jsx";
import { useNavigate } from "react-router-dom";

const ConversationsList = () => {
  const navigate = useNavigate();

  const handleSearchUsersSidebarTrue = () => {
    navigate("/user");
  };

  const {
    isLoading: isLoadingConversations,
    data: dataConversations,
    isError: isErrorConversations,
    error: errorConversations,
    refetch: refetchConversations,
  } = useConversationsQuery("");

  useApiErrors(isErrorConversations, errorConversations);

  const conversations = dataConversations?.data?.conversations;
  // const conversations = undefined;

  return (
    <>
      {conversations && conversations.length >= 1 ? (
        <div className="space-y-2">
          {conversations &&
            conversations.map((item) => (
              <ConversationCard key={item._id} data={item} />
            ))}
        </div>
      ) : (
        <div
          className="h-full w-full flex flex-col items-center justify-center space-x-1 select-none cursor-pointer"
          onClick={handleSearchUsersSidebarTrue}
        >
          <p className="w-full text-center font-Poppins text-gray-100">
            You did not start any ChitChat
          </p>
          <p className="w-full text-center font-Poppins text-gray-100">
            Click here to search & start ChitChatting
          </p>
        </div>
      )}
    </>
  );
};

export default ConversationsList;
