import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.db_url ?? "");
    if (conn.connection.readyState === 1)
      console.log("DB connection is successfully!");
    else console.log("DB connecting");
  } catch (error) {
    console.log("DB connection is failed");
    throw new Error("Error");
  }
};

export default dbConnect;
