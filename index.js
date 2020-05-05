const server = require("./server");
const dotenv = require("dotenv");

// Load Environment variables
dotenv.config();

const PORT = process.env.PORT || 1452;

server.listen(PORT, (err) => {
  if (err) {
    console.log("Error while starting the server", err);
  } else {
    console.log("Listening on port " + PORT);
  }
});
