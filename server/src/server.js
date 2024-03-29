const express = require("express");
const initSocketService = require("./services/socket");
var cors = require("cors");
const { startRabbitConsumer } = require("./services/rabbitMQ");

const app = express();
app.use(cors());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("");
});
app.get("/health", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startRabbitConsumer();

const socketService = initSocketService();
socketService.initListeners();

const io = socketService.io;
io.attach(server);
