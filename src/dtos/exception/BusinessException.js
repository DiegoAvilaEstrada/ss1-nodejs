class BusinessException extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
    this.name = 'BusinessException';
  }
}

module.exports = BusinessException;

