import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import savedMessages from "../../data//savedMessages.json";
import toast from "react-hot-toast";
import MessageProfile from "../MessageProfile/MessageProfile";
import {
  useLazyGetUserByMobileNumberQuery,
  useSendFirstMessageMutation,
} from "../../redux/api/api";
import { useParams } from "react-router-dom";
import useApiAsyncMutation from "../../hooks/useApiAsyncMutation";

const StartConversation = () => {
  const { userMobileNumber } = useParams();

  const { user } = useSelector((state) => state.auth);
  const [getUserByMobileNumber] = useLazyGetUserByMobileNumberQuery();

  const [sendFirstMessage] = useApiAsyncMutation(useSendFirstMessageMutation);

  const [sender, setSender] = useState();

  useEffect(() => {
    getUserByMobileNumber(userMobileNumber)
      .then(({ data }) => {
        setSender(data?.data?.user);
      })
      .catch(
        (error) => console.log(error)
        // toast.error()
      );
  }, [userMobileNumber]);

  const updatedSavedMessage =
    savedMessages &&
    savedMessages.map((msg) => {
      msg.message = msg.message.replace("{{name}}", `${user?.fullName}`);
      return msg;
    });
  //
  const handleSendMessage = async (sendMessage) => {
    // toast.success(message);
    sendFirstMessage(`Sending first chitchat to ${sender?.fullName} ...`, {
      message: sendMessage,
      sendToUserId: sender?._id,
    });
  };

  return (
    <div className="h-full flex flex-col justify-between items-center w-full">
      <MessageProfile sender={sender} />
      <div className="w-full flex flex-col items-center justify-center p-2">
        <img
          src="/chitchat-logo.png"
          className="h-20 w-20 aspect-square mb-2"
        />
        <p className="text-gray-200 font-Poppins text-3xl font-semibold text-center">
          Hello, {user?.fullName} 🔥
        </p>
        <p className="text-gray-100 font-Poppins text-2xl font-semibold text-center">
          Select the first message to send ...
        </p>
      </div>
      <div className="w-full space-y-2 p-2">
        {updatedSavedMessage &&
          updatedSavedMessage.map((item) => (
            <div
              key={item.id}
              className="bg-blue-200 hover:bg-blue-400 py-2 px-3 rounded-sm select-none cursor-pointer"
              onClick={() => handleSendMessage(item.message)}
            >
              <p className="text-start font-Poppins text-sm text-black">
                {item.message}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartConversation;
