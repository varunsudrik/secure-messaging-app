const amqp = require("amqplib");
const { PrismaClient } = require("@prisma/client");
const { encrypt } = require("./crypto");
const prisma = new PrismaClient({
  log: ["query"],
});

let channel = null;
let key = process.env.Crypto_Key || "Itsmykey";

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RabbitMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("MESSAGES");
  console.log("Connected to RabbitMQ");
}

async function produceMessageMQ(message, image = null) {
  if (!channel) {
    await connectRabbitMQ();
  }

  const messageObj = { text: message, image: image };
  const messageBuffer = Buffer.from(JSON.stringify(messageObj));

  await channel.sendToQueue("MESSAGES", messageBuffer);
  return true;
}

async function startRabbitConsumer() {
  console.log("Consumer is running");
  if (!channel) {
    await connectRabbitMQ();
  }

  channel.consume(
    "MESSAGES",
    async (message) => {
      if (!message) return;
      // console.log(`New Message Recv..`);
      try {
        const messageObj = JSON.parse(message.content.toString());
        const text = JSON.parse(messageObj.text).message.text;
        // const image = JSON.parse(messageObj);
        // console.log("Text222222:", text);
        let encodedMessage = encrypt(text, key);
        // console.log("encodedMessage", encodedMessage);

        // if (image) {
        //   console.log("Image:", image);
        // }

        await prisma.message.create({
          data: {
            text: encodedMessage,
          },
        });
      } catch (err) {
        console.log("Something is wrong", err);
      }
    },
    {
      noAck: true,
    }
  );
}

module.exports.createProducer = connectRabbitMQ;
module.exports.produceMessageMQ = produceMessageMQ;
module.exports.startRabbitConsumer = startRabbitConsumer;
