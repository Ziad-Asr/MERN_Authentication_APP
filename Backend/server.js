const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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

// 4) Make server (Backend) accept json format in requestes
app.use(express.json());

// 5) Allow acces of static files in the public folder (which holds assets and styles of the project)
app.use(express.static(path.join(__dirname, "public")));

// 6) Settingup routes
app.use("/", require("./routes/root"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ status: "failes", message: "404 Not Found!" });
  } else {
    res.type("txt").send("404 Not Found!");
  }
});

// 7) Check connection of DB , then lestining to server.
mongoose.connection.once("open", () => {
  console.log("Connected to DB!");

  app.listen(Port, () => {
    console.log(`App is running on port ${Port}!`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
