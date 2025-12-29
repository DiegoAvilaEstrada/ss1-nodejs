class ResponseSuccessDto {
  constructor(code = null, message = null, responseObject = null) {
    this.code = code;
    this.message = message;
    this.responseObject = responseObject;
  }

  setCode(code) {
    this.code = code;
  }

  setMessage(message) {
    this.message = message;
  }

  setResponseObject(responseObject) {
    this.responseObject = responseObject;
  }
}

module.exports = ResponseSuccessDto;

