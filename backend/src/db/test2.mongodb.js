import { MONGODB_2_SHOW_NAME } from "../constants/dbNames.js";
import connectToDatabase from "./mongodb.js";

const mongoURI2 = process.env.MONGODB_2_URI;
const mongodbName2 = MONGODB_2_SHOW_NAME;

const Test2_MongoDb_Connection = await connectToDatabase(
  mongoURI2,
  mongodbName2
);

export default Test2_MongoDb_Connection;
