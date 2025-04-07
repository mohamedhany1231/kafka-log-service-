const Log = require("../database/log");

class LogRepository {
  async create(logData) {
    return await Log.create(logData);
  }

  async getById(id) {
    return await Log.findById(id);
  }

  async find(query = {}, pagination = {}) {
    const limit = pagination.limit || 10;
    const page = pagination.page || 1;
    const skip = limit * (page - 1) || 0;

    return await Log.find(query).limit(limit).skip(skip);
  }
}

module.exports = LogRepository;
