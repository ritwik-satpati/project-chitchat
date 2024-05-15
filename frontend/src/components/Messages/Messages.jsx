import React from "react";
import Message from "../Message/Message.jsx";
import conversation from "../../sampleData/conversation.data.js";

const Messages = () => {
  return (
    <div className="space-x-1 p-1 overflow-y-scroll">
      {conversation &&
        conversation.messages &&
        conversation.messages.map((item) => (
          <Message
            key={item._id}
            messageData={item}
            participantsData={conversation.participants}
          />
        ))}
    </div>
  );
};

export default Messages;
