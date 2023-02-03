class MyNodejsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends MyNodejsError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class GetItemByIDError extends MyNodejsError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends MyNodejsError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  MyNodejsError,
  ValidationError,
  GetItemByIDError,
  NotAuthorizedError,
};
