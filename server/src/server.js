const express = require("express");
const initSocketService = require("./services/socket");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const { startRabbitConsumer } = require("./services/rabbitMQ");
const userRoute = require("./routes/user");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
require("dotenv").config();
app.use("/api/user", userRoute);

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
