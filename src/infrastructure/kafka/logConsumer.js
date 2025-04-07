const LogService = require("../../application/services/LogService");
async function setupConsumer(kafka) {
  const logService = new LogService();

  const consumer = kafka.consumer({ groupId: "group" });
  await consumer.connect();

  console.log("✅  consumer connected ");

  await consumer.subscribe({ topic: "user-activity-log", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, message, partition }) => {
      console.log("✅  message received ");
      const data = JSON.parse(message.value.toString());
      const log = await logService.saveLogToDb(data);

      if (log) console.log("✅  log saved to db  ✅");
    },
  });
}

module.exports = setupConsumer;
