import React, { useEffect, useState } from "react";
import MessageProfile from "../MessageProfile/MessageProfile.jsx";
import Messages from "../Messages/Messages.jsx";
import MessageInput from "../MessageInput/MessageInput.jsx";
import { useParams } from "react-router-dom";
import { useLazyGetUserByConversationIdQuery } from "../../redux/api/api.js";

const MessageContainer = () => {
  const { conversationId } = useParams();

  const [getUserByConversationIdQuery] = useLazyGetUserByConversationIdQuery();

  const [senderData, setSenderData] = useState();

  useEffect(() => {
    getUserByConversationIdQuery(conversationId)
      .then(({ data }) => {
        setSenderData(data?.data?.user);
      })
      .catch(
        (error) => console.log(error)
        // toast.error()
      );
  }, [conversationId]);

  return (
    <div className="h-full flex flex-col justify-between w-full">
      <MessageProfile sender={senderData} />
      <div className="flex flex-col justify-end w-full mt-auto overflow-hidden">
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
