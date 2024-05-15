import express from "express";
import cookieParser from "cookie-parser";

const app = express();

import { createServer } from "http";
import { Server } from "socket.io";
import corsOptions from "./constants/corsOptions.js";

const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

// Socket config
import { NEW_MESSAGE } from "./constants/socketEvents.js";
import { v4 as uuid } from "uuid";
import { socketUserAuth } from "./middlewares/socketUserAuth.middleware.js";

const userSocketIDs = new Map();

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketUserAuth(err, socket, next)
  );
});

io.on("connection", (socket) => {
  console.log("User connected :", socket.id);
  const count = io.engine.clientsCount;
  console.log("Socket server is connected by :", count);

  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async (data) => {
    const messageForRealTime = {
      _id: uuid(),
      conversation: data.conversationId,
      sender: user,
      message: data.message,
      createdAt: Date.now(),
    };
    // console.log("New Message :", messageForRealTime)

    const messageForDb = {
      conversation: data.conversationId,
      sender: user._id,
      message: data.message,
    };
    // console.log("Message :", messageForDb)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected :", socket.id);
    console.log("Socket server is connected by :", count - 1);
  });
});

export { app, io, server };
