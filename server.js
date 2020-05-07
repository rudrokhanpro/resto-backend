const express = require("express");

const server = express();

// MongoDB connection
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://localhost:27017";
mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "resto",
});

mongoose.connection.on("error", () =>
  console.log("Connection failed  to MongoDB server"),
);

mongoose.connection.once("open", () =>
  console.log("Connected to MongoDB server"),
);

// Middlewares and plugins
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");

server.use(morgan("tiny"));
server.use(cors());
server.use(express.json());
server.use(compression());

// Root route
server.get("/", (req, res) =>
  res.status(200).json({ message: "Hello Express" }),
);

// Router
const v1_router = require("./v1/router");

server.use(v1_router);

module.exports = server;
