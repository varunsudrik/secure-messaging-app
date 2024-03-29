const { Server } = require("socket.io");
const Redis = require("ioredis");
const { PrismaClient } = require("@prisma/client");
const { produceMessageMQ } = require("./rabbitMQ");
const prisma = new PrismaClient({
  log: ["query"],
}); // const prismaClient = require("./prisma");
const pub = new Redis({
  host: process.env.Redis_Host,
  port: process.env.Redis_Port,
  username: process.env.Redis_User,
  password: process.env.Redis_Pass,
});

const sub = new Redis({
  host: process.env.Redis_Host,
  port: process.env.Redis_Port,
  username: process.env.Redis_User,
  password: process.env.Redis_Pass,
});

function initSocketService() {
  console.log("Socket service running");
  const io = new Server({
    cors: {
      allowedHeaders: ["*"],
      origin: "*",
    },
  });
  sub.subscribe("MESSAGES");

  function initListeners() {
    console.log("Socket Listening");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async ({ message, image }) => {
        console.log("New Message Rec.", message);

        await pub.publish("MESSAGES", JSON.stringify({ message, image }));
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        const parsedMessage = JSON.parse(message);
        const text = parsedMessage.message;
        const image = parsedMessage.image;
        // console.log("new message from redis:", text);

        io.emit("message", message);
        // await prisma.message.create({
        //   data: {
        //     text: text,
        //   },
        // });

        await produceMessageMQ(message);
        console.log("Message Produced to RabbitMQ");
      }
    });
  }

  return {
    initListeners,
    io,
  };
}

module.exports = initSocketService;
