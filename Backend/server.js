const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors/corsOptions");

require("dotenv").config();
const connectDB = require("./config/db/dbConn");

const app = express();
const Port = process.env.PORT || 5000;

// 1) DB Connection
connectDB();

// 2) Adding Cors for some security
app.use(cors(corsOptions));

// 3) Parsing cookies sent with each request
app.use(cookieParser());

// 4) Make server accept json format in requestes
app.use(express.json());

// 5) Check connection of DB , then lestining to server.
mongoose.connection.once("open", () => {
  console.log("Connected to DB!");

  app.listen(
    (Port,
    () => {
      console.log(`App is running on port ${Port}!`);
    })
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
