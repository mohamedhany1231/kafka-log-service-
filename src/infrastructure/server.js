require("./kafka/kafka.setup.js");

const bodyParser = require("body-parser");

const LogService = require("../application/services/LogService.js");
const logService = new LogService();
const express = require("express");
const mongoose = require("mongoose");
const sendLog = require("./kafka/logProducer.js");
const LogEntity = require("../domain/log/logEntity.js");

const mongo_host = "mongo";
const mongo_user = "root";
const mongo_pass = "example";
const mongo_port = 27017;

mongoose
  .connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:${mongo_port}`)
  .then(() => {
    console.log(" ✅ connected to db");
  })
  .catch(() => {
    console.log("❌ failed connected to db ");
  });
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello" });
});

app.post("/login", async (req, res, next) => {
  await sendLog(new LogEntity(req.body?.userId, "login", "success"));
  res.status(200).json({ message: "logged in" });
});

app.get("/logs", async (req, res, next) => {
  const logs = await logService.getLogs(req.query);
  res.status(200).json({ logs: logs });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on 3000");
});
