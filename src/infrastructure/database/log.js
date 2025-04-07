const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now() },
  //   TODO: reference  user model when created
  userId: { type: String, required: true },
  action: {
    type: String,
    required: true,
    enum: ["login", "logout", "purchase"],
  },
  status: {
    type: String,
    required: true,
    enum: ["success", "fail", "pending"],
  },
});

logSchema.index({ userId: 1 });
logSchema.index({ action: 1 });
logSchema.index({ timestamp: -1 });

const LogModel = mongoose.model("Log", logSchema);

module.exports = LogModel;
