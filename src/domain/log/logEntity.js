class LogEntity {
  constructor(userId, action, status = "success", timestamp = Date.now(), id) {
    this.id = id;
    this.userId = userId;
    this.action = action.toLowerCase();
    this.status = status;
    this.timestamp = timestamp;
  }

  validateAction() {
    if (!this.action) throw new Error("action is undefined");

    const allowedActions = ["login", "logout", "purchase"];
    if (!allowedActions.includes(this.action))
      throw new Error(
        ` invalid action provided {${this.action}} , provide on of the allowed actions ${allowedActions} `
      );
  }

  validateStatus() {
    if (!this.status) throw new Error("status is undefined");

    const allowedStatuses = ["success", "fail", "pending"];
    if (!allowedStatuses.includes(this.status))
      throw new Error(
        ` invalid action provided {${this.status}} , provide on of the allowed actions ${allowedStatuses} `
      );
  }

  validate() {
    this.validateAction();
    this.validateStatus();
    if (!this.userId) throw new Error("userId is undefined");
  }
}

module.exports = LogEntity;
