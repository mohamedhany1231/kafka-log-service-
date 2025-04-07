const kafka = require("./kafka.setup");
async function sendLog(log) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "user-activity-log",
    messages: [
      {
        value: JSON.stringify(log),
      },
    ],
  });
  await producer.disconnect();
  console.log("producer disconnected");
}

module.exports = sendLog;
