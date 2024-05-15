import { MONGODB_1_SHOW_NAME } from "../constants/dbNames.js";
import connectToDatabase from "./mongodb.js";

const mongoURI1 = process.env.MONGODB_1_URI;
const mongodbName1 = MONGODB_1_SHOW_NAME;

const Test1_MongoDb_Connection = await connectToDatabase(
  mongoURI1,
  mongodbName1
);

export default Test1_MongoDb_Connection;
