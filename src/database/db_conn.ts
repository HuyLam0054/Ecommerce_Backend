import mongoose from "mongoose";
require("dotenv").config();

mongoose.set("strictQuery", false);
const db_url = process.env.db_url;

const dbConnect = async () => {
  try {
    if (!db_url) {
      throw new Error("Can not find Database");
    }

    const conn = await mongoose.connect(db_url);
    if (conn.connection.readyState === 1) {
      console.log("Success!");
    } else {
      console.log("connecting...");
    }
  } catch (error) {
    console.log("Fail!!!");
    throw new Error("Something went wrong!");
  }
};

export default dbConnect;
