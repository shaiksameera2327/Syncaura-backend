require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const socketHandler = require("./src/config/socket");

connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

socketHandler(io);

server.listen(5000, () =>
  console.log("Channel Chat Service running on port 5000")
);
