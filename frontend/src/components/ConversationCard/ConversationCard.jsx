import React, { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConversationCard = ({ data }) => {
  const navigate = useNavigate();

  const params = useParams();
  const conversationId = params.conversationId;

  const handleOpenConversation = () => {
    const path = `/chat/${data._id}`;
    navigate(path);
  };

  return (
    <div
      className={`${
        conversationId === data._id
          ? `bg-blue-500 hover:bg-blue-600`
          : `bg-blue-100 hover:bg-blue-200`
      } w-full flex justify-between space-x-2 h-12 rounded-md p-1 cursor-pointer`}
      onClick={handleOpenConversation}
    >
      <div className="flex justify-center items-center space-x-2">
        <div className="relative h-10 w-10 rounded-full bg-gray-400 avatar">
          <img
            src={data?.otherParticipant?.avatar}
            className="max-h-10 aspect-square"
          />
          {data?.otherParticipant?.isOnline && (
            <div className="absolute h-2 w-2 bg-green-500 rounded-full top-0 right-0"></div>
          )}
        </div>
        <div className="flex flex-col items-start justify-between">
          <p className="font-Poppins font-medium text-md text-gray-900 line-clamp-1 overflow-hidden">
            {data?.otherParticipant?.fullName}
          </p>
          <p className="font-Poppins text-xs text-gray-900 line-clamp-1 overflow-hidden">
            {data?.otherParticipant?.mobileNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ConversationCard);
