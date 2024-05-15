import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// const mongoURI1 = process.env.MONGODB_URI_1;
// const mongoURI2 = process.env.MONGODB_URI_2;
// const mongodbName1 = process.env.MONGODB_NAME_1;
// const mongodbName2 = process.env.MONGODB_NAME_2;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import connectToDatabase from "./db/mongodb.js";
// import Test1_MongoDb_Connection from "./db/test1.mongodb.js";
// import Test2_MongoDb_Connection from "./db/test2.mongodb.js";

const app = express();

import { createServer } from "http";
import { Server } from "socket.io";
import corsOptions from "./constants/corsOptions.js";

const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

// routes import
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

// routes declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/conversation", conversationRoutes);

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

server.listen(PORT, async () => {
  // await connectToDatabase(mongoURI1, mongodbName1);
  // await connectToDatabase(mongoURI2, mongodbName2);
  // Test1_MongoDb_Connection
  // Test2_MongoDb_Connection
  console.log(`Server is running on PORT: ${PORT}`);
});

// Seeders (if needed)
// import { createUserByFaker } from "./seeders/user.seeder.js";
// createUserByFaker(100)
