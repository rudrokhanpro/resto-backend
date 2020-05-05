const express = require("express");

const server = express();

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

module.exports = server;
