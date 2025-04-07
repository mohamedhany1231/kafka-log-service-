const LogEntity = require("../../domain/log/logEntity");
const LogRepository = require("../../infrastructure/repositories/logRepository");

class LogService {
  constructor() {
    this.logRepository = new LogRepository();
  }

  async saveLogToDb(logData) {
    try {
      const { userId, timestamp, action, status } = logData;
      const log = new LogEntity(userId, action, status, timestamp);

      log.validate();
      return await this.logRepository.create({
        userId,
        timestamp,
        action,
        status,
      });
    } catch (err) {
      // TODO:  error management
      console.error(err.message);
    }
  }

  async getLogs(query) {
    const { page, limit } = query;
    delete query.page;
    delete query.limit;
    return await this.logRepository.find(query, { page, limit });
  }
}

module.exports = LogService;
