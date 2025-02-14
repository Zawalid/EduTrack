import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({ clientId: "edu-track-node", brokers: [process.env.KAFKA_BROKER || "localhost:9092"] });

// Producer
const producer = kafka.producer();

export const sendMessage = async ({ topic = "edu-track", messages }) => {
  await producer.connect();
  await producer.send({ topic, messages });
  await producer.disconnect();
};

// Consumer
const GROUP_ID = process.env.KAFKA_CONSUMER_GROUP_ID || "edu-track-node-consumer";
const consumer = kafka.consumer({ groupId: GROUP_ID });

export const consumeMessage = async ({ topic = "edu-track", action }) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = JSON.parse(message.value.toString());
      action ? action(value) : console.log(message, value);
    },
  });
};
