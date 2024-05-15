import React, { memo } from "react";
import user from "../../sampleData/user.data";

const Message = ({ messageData, participantsData }) => {
  const senderData = participantsData?.find(
    (option) => option._id === messageData?.senderId
  );
  // const receiverData = participantsData?.find(
  //   (option) => option._id === messageData?.receiverId
  // );

  const formateDateTime = (dateTimeString) => {
    const dateString = new Date(dateTimeString).toLocaleDateString();
    const timeString = new Date(dateTimeString).toLocaleTimeString();

    return `${dateString} ${timeString}`;
  };

  return (
    <div
      className={`chat ${
        senderData?._id === user?._id ? `chat-end pl-20` : `chat-start pr-20`
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="" src={senderData.avatar} />
        </div>
      </div>
      <div className="chat-bubble max-w-[500px] flex items-center">
        <p className="font-Poppins text-sm">{messageData?.message}</p>
      </div>
      <div className="chat-footer text-gray-300 font-Poppins text-xs mt-0.5">
        <p className={`${senderData?._id === user?._id ? `pr-0.5` : `pl-0.5`}`}>
          {formateDateTime(messageData?.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default memo(Message);
