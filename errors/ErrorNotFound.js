const { STATUS_NOT_FOUND } = require('./constants');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
  }
}

module.exports = { ErrorNotFound };
