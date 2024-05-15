import React from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import conversations from "../../sampleData/conversations.data.js";

const MessageProfile = ({ sender }) => {
  const navigate = useNavigate();
  const params = useParams();

  const conversationId = params.conversationId;
  const data = conversations.find((option) => option._id === conversationId);

  let isOnline = true;

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="h-20 w-full bg-indigo-500 rounded-t-sm lg:rounded-tl-none lg:rounded-tr-sm flex justify-between items-center space-x-2 p-2">
      <div className="flex items-center justify-start space-x-2 pl-1">
        <div className="relative h-12 w-12 rounded-full bg-gray-400 avatar">
          <img
            src={sender?.avatar || data?.sender?.avatar}
            className="max-h-12 aspect-square"
          />
          {data?.sender?.isOnline && (
            <div className="absolute h-2 w-2 bg-green-500 rounded-full top-0 right-0"></div>
          )}
        </div>
        <div>
          <p className="font-Poppins font-medium text-md text-gray-100 line-clamp-1 overflow-hidden">
            {sender?.fullName || data?.sender?.fullName}
          </p>
          <p className="font-Poppins text-sm text-gray-300 line-clamp-1 overflow-hidden">
            {sender?.mobileNumber || data?.sender?.mobileNumber}
          </p>
        </div>
      </div>
      <button
        className="lg:hidden text-2xl text-gray-300 hover:text-gray-900"
        onClick={handleBackToHome}
      >
        <MdCancel />
      </button>
    </div>
  );
};

export default MessageProfile;
