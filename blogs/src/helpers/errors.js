class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class GetItemByIDError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  ValidationError,
  GetItemByIDError,
};
