const { Kafka } = require("kafkajs");
const setupConsumer = require("./logConsumer");
// const setupProducer = require("./logProducerTest");

const kafka = new Kafka({
  clientId: "app",
  brokers: ["kafka:9092"],
});

setupConsumer(kafka);

module.exports = kafka;
