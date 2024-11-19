import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dbConnect from "./database/db_conn";

require("dotenv").config();

const app: Application = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
// initRoutes(app);

app.listen(port, () => {
  console.log("Server running on the port: " + port);
});
