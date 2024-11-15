import express, { Application } from "express";
import db_connect from "./database/db_conn";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app: Application = express();
app.use(cookieParser());

const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db_connect();

app.listen(port, () => {
  console.log("Server running on the port: " + port);
});
